async function logout(request, response){
    try {
        const cookieOptions = {
            http: true,
            secure : true,
            expires: new Date(0)
        }

        return response.cookie('token','' ,cookieOptions).status(200).json({
            message : "session out",
            secure : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error: true
        })
    }
}

module.exports = logout