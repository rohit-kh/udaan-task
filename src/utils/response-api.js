module.exports.success = (data = {}) => {
    return {
      status: true,
      data
    }
}

module.exports.error = (error = '') => {
    return {
      status: false,
      error
    }
}