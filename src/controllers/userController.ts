import { Request, Response } from "express";
import Utilisateur from "../models/Utilisateurs.model";


export async function createUser(req: Request, res: Response) {
    try {
    // Validation des champs
    const { nom, password, email, premium } = req.body;
    const utilisateur = await Utilisateur.create({ nom, password,email, premium });
    res.json(utilisateur);
    } catch (err: any) {
    // Gestion des erreurs
    res.status(500).json({ message: 'Erreur interne', error: err.message });
    }
   }