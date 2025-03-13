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