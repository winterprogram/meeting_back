let apiresponse = (err, message, status, data) => {
    let response = {
        error: err,
        message: message,
        status: status,
        data: data
    }
    return response
}

module.exports = {
    apiresponse: apiresponse
}