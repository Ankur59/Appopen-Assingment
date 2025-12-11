const secret = skjdfsdf5151

const handleLogin = (req, res) => {
    const { email } = req.body

    const accessToken = jwt.sign({
        email: email,
    },
        secret,
        {
            expiresIn: "25s", // expires in 24 hours
        })


    const refreshToken = jwt.sign({
        email: email,
    },
        secret,
        {
            expiresIn: "10m", // expires in 24 hours
        })

    res.cookie("")
}