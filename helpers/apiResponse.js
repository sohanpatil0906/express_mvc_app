exports.successResponse = (res, msg) => {
    return res.status(200).json({ status: 1, msg: msg });
}

exports.successResponseWithData = (res, msg, data) => {
    return res.status(200).json({ status: 1, msg: msg, data });
}

exports.errorResponse = (res, msg) => {
    return res.status(500).json({ status: 0, msg: msg });
}

exports.errorResponseWithData = (res, msg, data) => {
    return res.status(500).json({ status: 0, msg: msg, data });
}

exports.validationErrorResponse = (res, msg, data) => {
    return res.status(403).json({ status: 2, msg: msg, data });
}

exports.unauthorizedResponse = (res, msg) => {
    return res.status(403).json({ status: 9, msg: "Unauthorized Request Access Blocked" });
}