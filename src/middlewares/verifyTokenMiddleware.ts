import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";
dotenv.config();

const JWT_KEY = process.env.JWT_KEY;

export function verifyTokenMiddleware(req: Request, res: Response, next: NextFunction): void {
    try {
        if (!JWT_KEY) {
            throw new Error("JWT_KEY non présente dans les variables d'environnement. Veuillez vous connecter.");
        }

        let token: string | undefined;

        // Check Authorization header (Bearer token)
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        // Check token dans cookies
        if (!token && req.headers.cookie) {
            const match = req.headers.cookie.match(/jwt=([^;]+)/);
            token = match ? match[1] : undefined;
        }
        if (!token) {
        res.status(401).json({ message: "Accès refusé. Token manquant." });
        return;
        }

        console.log(token);

        // Verify token
        const decoded = jwt.verify(token, JWT_KEY) as jwt.JwtPayload;

        if (!decoded) {
        res.status(403).json({ message: "Token invalide ou expiré." });
        return;
        }

        // Attache user payload dans la requete
        req.headers.payload = JSON.stringify(decoded);
        next();
    } catch (error: any) {
        console.error("Erreur d'authentification :", error);
        res.status(403).json({ message: "Accès refusé. Token invalide ou expiré." });
    }
}