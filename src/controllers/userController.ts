import { Request, Response } from "express";
import Utilisateurs from "../models/Utilisateurs.model";
import { CustomRequest } from "../middlewares/isPremium"; 
import { getUserIdFromPayload } from "../Utils/JWTUtils";


export async function getAllUsers(req: Request, res: Response) {
    try {
        const utilisateurs = await Utilisateurs.findAll();
        res.send(utilisateurs);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}



export async function modifyStatus(req: Request, res: Response): Promise<void> {
    try {
        
        const user = getUserIdFromPayload(req.headers.payload as string);
                if (!user) {
                    res.status(404).json({ message: "Utilisateur introuvable" });
                    return
                }

        // Fetch the user by ID
        const utilisateur = await Utilisateurs.findByPk(user);

        if (!utilisateur) {
            res.status(404).json({ message: "Utilisateur non trouvé." });
            return;
        }

        // Toggle the 'premium' status
        utilisateur.premium = !utilisateur.premium;

        // Save the changes
        await utilisateur.save();

        res.status(200).json({ 
            message: "Statut d'utilisateur modifié avec succès", 
            utilisateur 
        });

    } catch (error) {
        console.error("Erreur lors de la modification :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}
