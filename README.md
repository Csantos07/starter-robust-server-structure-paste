# Starter Code: Robust Server Structure

Next we need to do validations and error/middleware stuff/ oganizing controllers and routes

This server is intended to be run for some checkpoints in the Thinkful curriculum. If you have trouble getting the server to run, reach out for assistance.

## Installation

1. Clone this repository.
1. `cd` into the newly created directory.
1. Run `npm install`.
1. Run `npm run dev`. This command will spin up a server on port 5000 that will automatically restart when changes are made to source files.

When you navigate to `localhost:5000` initially, you should see a `Not found: /` message in the browser because none of the routes have been implemented yet.

## Description

This project contains the minimum setup code required to run an Express API. However, only the not found and error handlers are implemented at this point.

Follow the instructions in the checkpoint for implementing the API.

If you have trouble, reach out for assistance.

----

## Changelog
1.17.23
- updated to use http appropriate verbs
- created the post and create

10.26.23
- created a static db in data/pastes-data.js
- created two routes
 - /pastes (list)
 - /pastes/:id (specific paste)
