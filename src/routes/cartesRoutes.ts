import express from "express" ;
import { getAllCartes, getAllCartesPremium } from "../controllers/cartesController";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware";
const router = express .Router ();

/**
 * @swagger
 * /cartes:
 *   get:
 *     summary: Récupérer toutes les cartes
 *     description: Renvoie la liste de toutes les cartes disponibles.
 *     tags:
 *       - Cartes
 *     responses:
 *       200:
 *         description: Liste des cartes récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Erreur serveur
 */
router.get("/cartes", verifyTokenMiddleware, getAllCartes);

/**
 * @swagger
 * /cartes/premium:
 *   get:
 *     summary: Récupérer toutes les cartes premium
 *     description: Renvoie la liste de toutes les cartes premium disponibles.
 *     tags:
 *       - Cartes
 *     responses:
 *       200:
 *         description: Liste des cartes premium récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Erreur serveur
 */
router.get("/premium",verifyTokenMiddleware, getAllCartesPremium); //ajouter middleware isPremium
export default router ;