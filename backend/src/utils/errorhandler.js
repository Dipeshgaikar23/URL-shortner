
const errorHandler = (err, req, res, next) => {
    // Default values
    const statusCode = err.statusCode || 500
    const status = err.status || 'error'

    console.error(`🔥 Error: ${err.message}`)

    res.status(statusCode).json({
        status,
        message: err.message || 'Internal Server Error',
    })
}

export default errorHandler
