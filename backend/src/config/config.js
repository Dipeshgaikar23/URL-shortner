// JWT options for token signing
export const jwtOptions = {
    expiresIn: '5m' // 5 minutes
};

// Cookie options for when sending the token in a cookie
export const cookieOptions = {
    httpOnly: true, // Note: it's "httpOnly" not "httponly" (camelCase)
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 5 // 5 mins
};