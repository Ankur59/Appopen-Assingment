const jwt = require("jsonwebtoken")
const secret = "ajshjdfhsjd7663"
const handleLogin = (req, res) => {
    console.log("getting")
    const { email } = req.body;

    const accessToken = jwt.sign(
        { email },
        secret,
        { expiresIn: "25s" }
    );

    const refreshToken = jwt.sign(
        { email },
        secret,
        { expiresIn: "1m" }
    );


    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 1 * 60 * 1000
    });

    res.status(200).json({
        accessToken
    });
};


const handleRefresh = (req, res) => {
    console.log(req.cookies)
    const token = req.cookies.refreshToken;

    if (!token) {
        return res.status(401).send("logout");
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: false,
                sameSite: "strict"
            }).status(401).send("logout");
        }

        const newAccessToken = jwt.sign(
            { email: decoded.email },
            secret,
            { expiresIn: "20s" }
        );

        return res.status(200).json({ accessToken: newAccessToken });
    });
};




module.exports = { handleLogin, handleRefresh }