const moment = require('moment'); // Importing a date-time library like Moment.js

/**
 * Generates a current timestamp in MySQL format.
 * @returns {string} The current timestamp in MySQL format (YYYY-MM-DD HH:MM:SS)
 */
function getCurrentMySQLTimestamp() {
  // Return the current timestamp in MySQL format
  return moment().format('YYYY-MM-DD HH:mm:ss');
}

module.exports = {
  getCurrentMySQLTimestamp, // Export the function for use in other modules
};
