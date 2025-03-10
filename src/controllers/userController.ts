import { Request, Response } from "express";
import Utilisateurs from "../models/Utilisateurs.model";


export async function createUser(req: Request, res: Response) {
    try {
    // Validation des champs
    const { nom, password, email, premium } = req.body;
    const utilisateur = await Utilisateurs.create({ nom, password,email, premium });
    res.json(utilisateur);
    } catch (err: any) {
    // Gestion des erreurs
    res.status(500).json({ message: 'Erreur interne', error: err.message });
    }
   }

export async function getAllUsers(req: Request, res: Response) {
    try {
        const utilisateurs = await Utilisateurs.findAll();
        res.send(utilisateurs);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}