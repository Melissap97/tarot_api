import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_KEY: string | undefined = process.env.JWT_KEY;

export function generateToken(payload: object): string {

    if (!JWT_KEY) {
        throw new Error("JWT_JWT non présente dans les variables d'environnement")
    }

    return jwt.sign(payload, JWT_KEY, { expiresIn: '10000h' })
}

export function verifyToken(token: string): string | JwtPayload | null {
    if (!JWT_KEY) {
        throw new Error("JWT_KEY non présente dans les variables d'environnement")
    }
    try {
        return jwt.verify(token, JWT_KEY)
    } catch (err: any) {
        return null;
    }
}

export function getUserIdFromPayload(payloadJson: string): string | null {
    const payload = JSON.parse(payloadJson) || null;
    return payload.id || null
}