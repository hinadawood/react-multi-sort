# ReactJS Table Sorting task Assignment#

## Task outline ##
To build a table with multi column sort function

## Important Note ##
- "Shift key + click" to select a column for sorting.
Example - After holding the SHIFT key down and clicking on the score, city and name in order, ‘score’ is primary sort(1), ‘city’ secondary sort(2) and ‘name’ third(3)"


## Checklist ##
- Vanilla javascript sort API is used to implement sorting algorithm
- Components are placed in `frontend/components/AssignmentTable` folder
- Tests are placed in `frontend/test` folder
- Only libraries specified in `package.json` is used to complete the task and no new dependencies have been added
- Coding Style guidelines provided have been followed


## Usage
Run `npm install && npm start` will:
- Compile the code into dev version
- Start the dev web server

The root directory of the running application is at `frontend-dist`, relative to this README.

You can open `http://127.0.0.1:3333/` in browser.

## Unit testing
Run `npm test` for unit testing the code. There are 12 passing testcases

## Files Modified
- frontend/components/AssignmentTable/*.js
- frontend/components/Dashboard/Dashboard.js
- frontend/index.js
- frontend/test/AssignmentTable.test.js
- frontend/test/AssignmentTableAction.test.js
- frontend/styles/common.css
