import { Request, Response } from "express";
import Utilisateurs from "../models/Utilisateurs.model";


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
        const { id } = req.params;

        // Fetch the user by ID
        const utilisateur = await Utilisateurs.findByPk(id);

        if (!utilisateur) {
             res.status(404).json({ message: "Utilisateur non trouvé" });
             return;
        }

        // Toggle the 'premium' status
        utilisateur.premium = !utilisateur.premium;

        // Save the changes
        await utilisateur.save();

        res.status(200).json({ 
            message: "Status d'utilisateur modifié avec succès", 
            utilisateur 
        });

    } catch (error) {
        console.error("Erreur lors de la modification :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}
