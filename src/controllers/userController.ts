import { Request, Response } from "express";
import Utilisateur from "../models/Utilisateur.model";


export async function createUser(req: Request, res: Response) {
    try {
    // Validation des champs
    const { nom, password, email, status } = req.body;
    const utilisateur = await Utilisateur.create({ nom, password,email, status });
    res.json(utilisateur);
    } catch (err: any) {
    // Gestion des erreurs
    res.status(500).json({ message: 'Erreur interne', error: err.message });
    }
   }