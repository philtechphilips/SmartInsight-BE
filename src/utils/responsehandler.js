export const errorResponse = async (req, res, data) => {
    let {status, statusCode, message, payload} = data;
    return res.status(statusCode).send({status, statusCode, message, payload});
}

export const successResponse = async (req, res, data) => {
    let {payload, statusCode, message, status, token} = data;
    if(token == undefined) token = null;
    return res.status(statusCode).send({payload, statusCode, message, status, token});
}