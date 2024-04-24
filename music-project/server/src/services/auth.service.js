const { compare, jwtSign} = require('../utils/encryption');
const { userDB } = require('../data/data')

const login = (username, password) => {
  const currentUser = userDB.find(user => user.username === username);

  if (!currentUser) {
    return {
      success: false,
      messgae: 'EMAIL NOT FOUND!'
    }
  }

  if (!compare(password, currentUser.password)) {
    return {
      success: false,
      messgae: 'INCORRECT PASSWORD!'
    }
  }

  const accessToken = jwtSign(currentUser);

  return {
    success: true,
    id: currentUser.id,
    username: currentUser.username,
    playType: currentUser.playType,
    accessToken
  }
}

module.exports = { login };