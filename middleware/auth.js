const { validateToken } = require("../service/auth")


function checkForAuthCookie(cookieName) {
    return async (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];

        if (!tokenCookieValue) {
            return next();
        }
        try {
            const user =await validateToken(tokenCookieValue);

            // console.log(user);

            req.user = user
        } catch (error) { }
        return next();
    }
}

module.exports = { checkForAuthCookie }