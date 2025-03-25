import {Request, Response} from "express";
import { NextFunction } from 'express';
import { verifyToken } from '../Utils/JWTUtils';
import Cartes from "../models/Cartes.model";
import CartesPremium from "../models/CartesPremium.model";
import { Sequelize } from "sequelize";
import Utilisateurs from "../models/Utilisateurs.model";




/*export async function isPremium(req: CustomRequest, res: Response, next: NextFunction) {
    const cookie = req.headers.cookie;
    if (!cookie) {
        res.status(401).json({ message: "Cookie manquant" });
        return;
    }

    const token = cookie.split("=")[1];
    if (!token) {
        res.status(401).json({ message: "Non autorisé, token manquant, veuillez vous connecter" });
        return;
    }

    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === "string") {
        res.status(403).json({ message: "Pas de token ou token invalide" });
        return;
    }

    req.user = {
        utilisateur_id: decoded.id, // Ensure the correct user ID is stored
        isPremium: decoded.isPremium ?? false, // Default to false if missing
    };

    try {
        let randomCard;
        if (req.user.isPremium === true) {
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

        req.selectedCard = randomCard; // Attach the selected card to the request
        next();
    } catch (error) {
        console.error("Erreur lors de la sélection de la carte:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
} */

    
    export async function isPremium(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const cookie = req.headers.cookie;
            if (!cookie) {
                res.status(401).json({ message: "Cookie manquant" });
                return;
            }
    
            const token = cookie.split("=")[1];
            if (!token) {
                res.status(401).json({ message: "Non autorisé, token manquant" });
                return;
            }
    
            const decoded = verifyToken(token);
            if (!decoded || typeof decoded === "string") {
                res.status(403).json({ message: "Token invalide" });
                return;
            }
    
            // Fetch user from the database
            const utilisateur = await Utilisateurs.findOne({ where: { id: decoded.id } });
            if (!utilisateur) {
                res.status(404).json({ message: "Utilisateur introuvable" });
                return;
            }
    
            const isPremium = utilisateur.premium;
    
            // Fetch a random card depending on the user's premium status
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
    
            // Attach the selected card to the request
            (req as any).selectedCard = randomCard;
            next(); // Continue to the next middleware or route handler
    
        } catch (error) {
            console.error("Erreur lors de la sélection de la carte:", error);
            res.status(500).json({ message: "Erreur serveur" });
        }
    }