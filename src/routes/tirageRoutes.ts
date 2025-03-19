import express from "express" ;
import { createTirage, deleteTirage, getTirageParUser } from "../controllers/tirageController" ;
const router = express .Router ();

/**
 * @swagger
 * /tirage/create:
 *   post:
 *     summary: Create a new tirage (draw)
 *     tags: [Tirage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carte_id:
 *                 type: integer
 *                 description: The ID of the card for the tirage
 *                 example: 123
 *               carte_premium_id:
 *                 type: integer
 *                 description: The ID of the premium card (optional)
 *                 example: 456
 *     responses:
 *       200:
 *         description: Tirage created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tirage créé avec succès
 *                 tirage:
 *                   type: object
 *                   properties:
 *                     utilisateur_id:
 *                       type: integer
 *                       example: 1
 *                     carte_id:
 *                       type: integer
 *                       example: 123
 *                     carte_premium_id:
 *                       type: integer
 *                       example: 456
 *       404:
 *         description: Utilisateur introuvable
 *       500:
 *         description: Erreur interne du serveur
 */
router.post("/create/:carte_id/:carte_premium_id?", createTirage)

/**
 * @swagger
 * /tirages:
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
router.get("/:id", getTirageParUser);

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
 router.delete("/:id", deleteTirage);

export default router ;