import { Request, Response } from "express";
import Tirages from '../models/Tirages.model';

export async function getAllTirages(req: Request, res: Response) {
    try {
        const tirages = await Tirages.findAll();
        res.send(tirages);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

//créeer getTirageParUser

export async function deleteTirage(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const tirage = await Tirages.findByPk(id);
        if (!tirage) {
            res.status(404).json({ message: "Tirage non trouvé" });
            return
        }

        await tirage.destroy();
        res.json({ message: "Tirage supprimé avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}