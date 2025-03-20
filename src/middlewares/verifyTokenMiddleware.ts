import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../Utils/JWTUtils';
dotenv.config();

//Récupération de la clé secrète
const JWT_KEY = process.env.JWT_KEY;

export function verifyTokenMiddleware(req: Request, res: Response, next: NextFunction): void {
    //Vérification de la clé secrète et gestion d'erreur
    if (JWT_KEY === undefined) {
        throw new Error("JWT_KEY non présente dans les variables d'environnement. Veuillez vous connecter.")
    }
    //Récupération du cookie dans le header
    const cookie = req.headers.cookie;
    //Gestion d'erreur
    if (!cookie) {
        res.status(401).json({ message: "Access denies. Cookie missing" });
        return;
    }
     // Récupération du token dans le cookie après "="
    const token = cookie.split('=')[1];
    console.log(token);
    //Gestion d'erreur
    if (!token) {
        res.status(401).json({ message: 'Access Denied. Token Missing.' })
        return;
    }
    try {
        //Vérification du token
        const decoded = verifyToken(token);
        //Décodage du token en JSON en payload
        req.headers.payload = JSON.stringify(decoded);
        //Gestion d'erreur
        if (!decoded) {
            res.status(403).send({ message: 'Token invalide ou expiré' })
            return
        }
        next();
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}