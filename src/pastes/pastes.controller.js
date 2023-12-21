const pastes = require("../data/pastes-data")

function list(req, res) {
  res.json({ data: pastes });
}

function pasteExists(req, res, next) {
  const { pasteId } = req.params;
  const foundPaste = paste.find((paste) => paste.id === Number(pasteId));
  if (foundPaste) {
    return next();
  }
  next({
    status: 404,
    message: `Paste id not found ${pasteId}`,
  });
}

function read(req, res, next) {
  const { pasteId } = req.params;
  const foundPaste = pastes.find((paste) => paste.id === Number(pasteId));
  res.json({ data: foundPaste });
}

// New middleware function to validate the request body
function bodyDataHas(porpertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[porpertyName]) {
      return next();
    }
    next({ status: 400, message: `Must include a ${porpertyName}` });
  };
}

function exposurePropertyIsValid(req, res, next) {
  const { data: { exposure } = {} } = req.body;
  const validExposure = ["private", "public"];

  if (validExposure.includes(exposure)) {
    return next();
  }
  next({
    status: 400,
    message: `Value of the 'exposure' property must be one of ${validExposure}. Received: ${exposure}`,
  });
}

function syntaxPropertyIsValid(req, res, next) {
  const { data: { syntax } = {} } = req.body;
  const validSyntax = ["None", "Javascript", "Python", "Ruby", "Perl", "C", "Scheme"];
  if (validSyntax.includes(syntax)) {
    return next();
  }
  next({
    status: 400,
    message: `Value of the 'syntax' property must be one of ${validSyntax}. Recieved: ${syntax}`,
  })
}

function expirationIsValidNumber(req, res, next) {
  const { data: { expiration } = {} } = req.body;
  if (expiration <= 0 || !Number.isInteger(expiration)) {
    return next({
      status: 400,
      message: `Expiration requires a valid number`
    });
  }
  next();
}

let lastPasteId = pastes.reduce((maxId, paste) => Math.max(maxId, paste.id), 0);


function create(req, res) {
  const { data: { name, syntax, exposure, expiration, text, user_id } = {} } = req.body;

  const newPaste = {
    id: ++lastPasteId,
    name,
    syntax,
    exposure,
    expiration,
    text,
    user_id
  };
  pastes.push(newPaste);
  res.status(201).json({ data: newPaste });
}

module.exports = {
  create: [
    bodyDataHas("name"),
    bodyDataHas("syntax"),
    bodyDataHas("exposure"),
    bodyDataHas("expiration"),
    bodyDataHas("text"),
    bodyDataHas("user_id"),
    exposurePropertyIsValid,
    syntaxPropertyIsValid,
    expirationIsValidNumber,
    create
  ],
  list,
  read: [pasteExists, read],
};
