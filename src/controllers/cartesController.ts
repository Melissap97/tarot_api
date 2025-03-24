import { Request, Response } from "express";
import Cartes from "../models/Cartes.model";
import CartesPremium from "../models/CartesPremium.model";

export async function getAllCartes(req: Request, res: Response) {
    try {
        const cartes = await Cartes.findAll();
        res.send(cartes);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export async function getCarte(carte_id: number) {
    
        const carte = await Cartes.findOne({where: { id: carte_id}});
        if (!carte) {
            throw new Error("Carte introuvable");
        }
        return carte;
}

export async function getAllCartesPremium(req: Request, res: Response) {
    try {
        const cartesPremium = await CartesPremium.findAll();
        res.send(cartesPremium);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export async function getCartePremium(carte_premium_id: number) {
    
    const cartePremium = await CartesPremium.findOne({where: { id: carte_premium_id}});
    if (!cartePremium) {
        throw new Error("Carte introuvable");
    }
    return cartePremium;
}


