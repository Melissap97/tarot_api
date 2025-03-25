import { Request, Response } from "express";
import Tirages from '../models/Tirages.model';
import Utilisateurs from "../models/Utilisateurs.model";
import { getUserIdFromPayload, verifyToken } from "../Utils/JWTUtils";



/*export async function createTirage(req: Request, res: Response) {
    try {
        const { utilisateur_id, carte_id, carte_nom, carte_signification, carte_image, carte_premium_id, carte_premium_nom, carte_premium_signification, carte_premium_image } = req.body;

        //Recherche de l'id depuis le payload
        const user = getUserIdFromPayload(req.headers.payload as string);
        if (!user) {
            throw new Error("Utilisateur introuvable");
        } 
        // Création du tirage
        const tirage = await Tirages.create({
            id: 0,
            utilisateur_id: user, // Assuming 'user' contains the utilisateur_id
            carte_id,
            carte_nom,
            carte_signification,
            carte_image,
            carte_premium_id,
            carte_premium_nom,
            carte_premium_signification,
            carte_premium_image
        });

        res.status(200).send({ message: "Tirage créé avec succès",tirage})

    } catch (error) {
        console.error("Erreur lors de la création du tirage:", error);
        throw error;
    }

    if (!randomCard) {
        res.status(404).json({ message: "Aucune carte trouvée" });
        return;
    }
}*/



export async function createTirage(req: Request, res: Response): Promise<void> {
    try {
        // Extract user ID from token
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

        // Ensure a card has been selected in middleware
        if (!(req as any).selectedCard) {
            res.status(500).json({ message: "Erreur: aucune carte sélectionnée" });
            return;
        }

        const cardData = (req as any).selectedCard;

        // Prepare the tirageData with correct attributes
        let tirageData: any = {
            utilisateur_id: utilisateur.id,
        };

        if (isPremium) {
            tirageData = {
                ...tirageData,
                carte_premium_id: cardData.id,
                carte_premium_nom: cardData.nom,
                carte_premium_signification: cardData.signification,
                carte_premium_image: cardData.image,
            };
        } else {
            tirageData = {
                ...tirageData,
                carte_id: cardData.id,
                carte_nom: cardData.nom,
                carte_signification: cardData.signification,
                carte_image: cardData.image,
            };
        }

        // Create the tirage record in the database
        const tirage = await Tirages.create(tirageData);

        res.status(200).json({ message: "Tirage réussi !", tirage });
        return;

    } catch (error) {
        console.error("Erreur lors de la création du tirage:", error);
        res.status(500).json({ message: "Erreur serveur" });
        return;
    }
}


export async function getTirageParUser(req: Request, res: Response) {
    try {

        //Recherche de l'id depuis le payload

        const user = getUserIdFromPayload(req.headers.payload as string);
        if (!user) {
            res.status(404).json({ message: "Utilisateur introuvable" });
            return
        }

        // Affichage du tirage
        const tirage = await Tirages.findAll({ where: { utilisateur_id: user } });

        const utilisateur = await Utilisateurs.findOne({ where: { id: user } });
        if (!utilisateur) {
            res.status(404).json({ message: "Utilisateur introuvable" });
            return;
        }
        res.status(200).send({ message: `Tirages de ${utilisateur.nom}`, tirage })
    } catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}



export async function deleteTirage(req: Request, res: Response) {
    try {
        const userId = getUserIdFromPayload(req.headers.payload as string);
        if (!userId) {
            res.status(404).json({ message: "Utilisateur introuvable" });
            return;
        }

        const tirage = await Tirages.findOne({ where: { utilisateur_id: userId } });
        if (!tirage) {
            res.status(404).json({ message: "Tirage introuvable" });
            return;
        }

        await tirage.destroy();
        res.json({ message: "Tirage supprimé avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}