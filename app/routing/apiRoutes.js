// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of 'data' sources.
// These data sources hold arrays of information on all possible employees
// ===============================================================================

const employees = require('../data/employees');

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users 'visit' a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get('/api/employees', function(req, res) {
    res.json(employees);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // ---------------------------------------------------------------------------

  app.post('/api/employees', function(req, res) {
    // Note the code here. Our 'server' will respond to a user's survey result
    // Then compare those results against every user in the employees data.
    // It will then calculate the difference between each of the numbers and the user's numbers.
    // It will then choose the user with the least differences as the 'best employee match.'
    // In the case of multiple users with the same result it will choose the first match.
    // After the test, it will push the user to the employees data.

    // We will use this object to hold the 'best match'. We will constantly update it as we
    // loop through all of the options
    const bestMatch = {
      name: '',
      photo: '',
      employeeDifference: Infinity
    };

    // Here we take the result of the user's survey POST and parse it.
    const userData = req.body;
    const userScores = userData.scores;

    // This variable will calculate the difference between the user's scores and the scores of
    // each user in the employees data
    let totalDifference;

    // Here we loop through all the employee possibilities in the employees data.
    for (let i = 0; i < employees.length; i++) {
      const currentEmployee = employees[i];
      totalDifference = 0;

      // We then loop through all the scores of each employee
      for (let j = 0; j < currentEmployee.scores.length; j++) {
        const currentEmployeeScore = currentEmployee.scores[j];
        const currentUserScore = userScores[j];

        // We calculate the difference between the scores and sum them into the totalDifference
        totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentEmployeeScore));
      }

      // If the sum of differences is less then the differences of the current 'best match'
      if (totalDifference <= bestMatch.employeeDifference) {
        // Reset the bestMatch to be the new employee.
        bestMatch.name = currentEmployee.name;
        bestMatch.photo = currentEmployee.photo;
        bestMatch.employeeDifference = totalDifference;
      }
    }

    // Finally save the user's data to the employees data (this has to happen AFTER the check. otherwise,
    // the employees data will always return that the user is the user's best match).
    employees.push(userData);

    // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page
    res.json(bestMatch);
  });
};
