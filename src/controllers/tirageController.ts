import { Request, Response } from "express";
import Tirages from '../models/Tirages.model';
import Utilisateurs from "../models/Utilisateurs.model";
import { getUserIdFromPayload } from "../Utils/JWTUtils";
import { CustomRequest } from "../middlewares/isPremium"; 
import { Sequelize } from "sequelize";
import Cartes from "../models/Cartes.model";
import CartesPremium from "../models/CartesPremium.model";
import { isPremium } from "../middlewares/isPremium";

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



export async function createTirage(req: CustomRequest, res: Response) {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Utilisateur non authentifié" });
            return;
        }

        if (!req.selectedCard) {
            res.status(500).json({ message: "Erreur: aucune carte sélectionnée" });
            return;
        }

        // Create a new tirage with the selected card
        const tirage = await Tirages.create({
            utilisateur_id: req.user.utilisateur_id,
            carte_id: req.selectedCard.id,
            carte_nom: req.selectedCard.nom,
            carte_signification: req.selectedCard.signification,
            carte_image: req.selectedCard.image,
        });

        res.status(200).json({message: "Tirage réussi !",tirage });
    } catch (error) {
        console.error(" Erreur lors de la création du tirage:", error);
        res.status(500).json({ message: "Erreur serveur" });
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