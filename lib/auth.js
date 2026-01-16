import { jwtVerify, SignJWT } from 'jose'; // Use 'jose' for Edge runtime compatibility

export const getJwtSecretKey = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT Secret key is not matched');
    return new TextEncoder().encode(secret);
};

export async function verifyAuth(token) {
    try {
        const verified = await jwtVerify(token, getJwtSecretKey());
        return verified.payload;
    } catch (err) {
        throw new Error('Your token has expired.');
    }
}


