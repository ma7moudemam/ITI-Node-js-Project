const jwt = require("jsonwebtoken");



module.exports = (request, response, next) => {

    let token, decode;
    try {
        token = request.get("Authorization").split(" ")[1];
        decode = jwt.verify(token, process.env.SECRET_KEY);
    } catch (e) {
        e.message = "No Authorized";
        e.status = 403;
        next(e);
    }
    if (decode !== undefined) {
        request.role = decode.role;
        next();
    }
}