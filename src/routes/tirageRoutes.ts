import express from "express" ;
import { createTirage, deleteTirage, getTirageParUser } from "../controllers/tirageController" ;
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware";
import { isPremium } from "../middlewares/isPremium";
const router = express .Router ();

/**
 * @swagger
 * components:
 *   schemas:
 *     Tirage:
 *       type: object
 *       required:
 *         - utilisateur_id
 *         - carte_id
 *         - carte_nom
 *         - carte_signification
 *         - carte_image
 *       properties:
 *         utilisateur_id:
 *           type: string
 *           description: ID of the user who created the tirage
 *         carte_id:
 *           type: string
 *           description: ID of the card
 *         carte_nom:
 *           type: string
 *           description: Name of the card
 *         carte_signification:
 *           type: string
 *           description: Meaning of the card
 *         carte_image:
 *           type: string
 *           description: Image URL of the card
 *         carte_premium_id:
 *           type: string
 *           description: ID of the premium card (if any)
 *         carte_premium_nom:
 *           type: string
 *           description: Name of the premium card (if any)
 *         carte_premium_signification:
 *           type: string
 *           description: Meaning of the premium card (if any)
 *         carte_premium_image:
 *           type: string
 *           description: Image URL of the premium card (if any)
 *
 * /tirages:
 *   post:
 *     summary: Create a new tirage (card draw)
 *     description: Allows a user to draw a card (either regular or premium).
 *     operationId: createTirage
 *     tags:
 *       - Tirage
 *     security:
 *       - bearerAuth: []  # Assuming token-based authentication (JWT)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tirage'
 *     responses:
 *       200:
 *         description: Tirage successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tirage créé avec succès
 *                 tirage:
 *                   $ref: '#/components/schemas/Tirage'
 *       400:
 *         description: Utilisateur introuvable
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur introuvable"
 *       404:
 *         description: Carte introuvable
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Aucune carte trouvée"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur serveur"
 */
router.post("/nouveauTirage/",verifyTokenMiddleware, isPremium, createTirage)

/**
 * @swagger
 * /tirages/{id}:
 *   get:
 *     summary: Récupérer les tirages de l'utilisateur connecté
 *     description: Renvoie la liste des tirages effectués par l'utilisateur dont l'ID est extrait du payload.
 *     tags:
 *       - Tirages
 *     responses:
 *       200:
 *         description: Liste des tirages de l'utilisateur connecté
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 tirage:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get("/:id",verifyTokenMiddleware, getTirageParUser);

/**
 * @swagger
 * /tirages/{id}:
 *   delete:
 *     summary: Supprimer un tirage
 *     description: Supprime un tirage appartenant à l'utilisateur connecté.
 *     tags:
 *       - Tirages
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du tirage à supprimer
 *     responses:
 *       200:
 *         description: Tirage supprimé avec succès
 *       404:
 *         description: Tirage ou utilisateur introuvable
 *       500:
 *         description: Erreur serveur
 */
 router.delete("/:id",verifyTokenMiddleware, deleteTirage);

export default router ;