const bcrypt = require("bcryptjs");

const verifyPassword = async (inputPassword, storedHash) => {
  return await bcrypt.compare(inputPassword, storedHash);
};

module.exports = { verifyPassword };
