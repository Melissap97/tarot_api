import {Request, Response} from "express";
import { NextFunction } from 'express';
import { verifyToken } from '../Utils/JWTUtils';
import Cartes from "../models/Cartes.model";
import CartesPremium from "../models/CartesPremium.model";
import { Sequelize } from "sequelize";
import Utilisateurs from "../models/Utilisateurs.model";

export async function isPremiumMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        let isPremium = false; // Defaut to false si pas de token
        let userId: number | null = null;

        const cookie = req.headers.cookie;
        if (cookie) {
            const token = cookie.split("=")[1];
            if (token) {
                const decoded = verifyToken(token);
                if (decoded && typeof decoded !== "string") {
                    userId = decoded.id;
                }
            }
        }
        // SI user ID est trouvé, cherche un user dans la base de donnée
        if (userId) {
            const utilisateur = await Utilisateurs.findOne({ where: { id: userId } });
            if (utilisateur) {
                isPremium = utilisateur.premium; 
            }
        }

        // Cherche une carte random dans la base de donnée par rapport au premium
        let randomCard;
        if (isPremium) {
            randomCard = await CartesPremium.findOne({
                order: [Sequelize.literal("RANDOM()")],
            });
        } else {
            randomCard = await Cartes.findOne({
                order: [Sequelize.literal("RANDOM()")],
            });
        }

        if (!randomCard) {
            res.status(404).json({ message: "Aucune carte trouvée" });
            return;
        }

        // Attache la selectedCard a la requete
        (req as any).selectedCard = randomCard;
        next(); 
    } catch (error) {
        console.error("Erreur lors de la sélection de la carte:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}