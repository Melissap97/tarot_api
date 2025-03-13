import { Request, Response } from "express";
import Utilisateurs from "../models/Utilisateurs.model";


export async function register(req: Request, res: Response) {
    try {
    // Validation des champs
    const { nom, password, email } = req.body;
    const utilisateur = await Utilisateurs.create({ nom, password,email});
    res.json(utilisateur);
    } catch (err: any) {
    // Gestion des erreurs
    res.status(500).json({ message: 'Erreur interne', error: err.message });
    }
}
