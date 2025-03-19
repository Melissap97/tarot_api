import { Request, Response } from "express";
import Tirages from '../models/Tirages.model';
import Utilisateurs from "../models/Utilisateurs.model";
import { getUserIdFromPayload } from "../Utils/JWTUtils";


export async function createTirage(req: Request, res: Response) {
    try {
        const { utilisateur_id, carte_id, carte_premium_id } = req.body;

        //Recherche de l'id depuis le payload

        const user = getUserIdFromPayload(req.headers.payload as string);
        if (!user) {
            throw new Error("Utilisateur introuvable");
        }

        // Création du tirage
        const tirage = await Tirages.create({
            utilisateur_id,
            carte_id,
            carte_premium_id: carte_premium_id || null,
        });

        res.status(200).send({ message: "Tirage créé avec succès",tirage})

    } catch (error) {
        console.error("Erreur lors de la création du tirage:", error);
        throw error;
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

        res.status(200).send({ message: `tirages de ${user}`, tirage})
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