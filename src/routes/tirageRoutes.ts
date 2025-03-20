import express from "express" ;
import { createTirage, deleteTirage, getTirageParUser } from "../controllers/tirageController" ;
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware";
import { isPremium } from "../middlewares/isPremium";
const router = express .Router ();

/**
 * @swagger
 * /tirages/nouveauTirage/:
 *   post:
 *     summary: Effectue un tirage de carte de tarot
 *     description: Permet à un utilisateur authentifié d'effectuer un tirage aléatoire d'une carte de tarot (premium ou non).
 *     tags:
 *       - Tirages
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Tirage réussi, retourne la carte sélectionnée.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tirage réussi !"
 *                 tirage:
 *                   type: object
 *                   properties:
 *                     utilisateur_id:
 *                       type: integer
 *                       example: 5
 *                     carte_id:
 *                       type: integer
 *                       example: 12
 *                     carte_nom:
 *                       type: string
 *                       example: "Le Pendu"
 *                     carte_signification:
 *                       type: string
 *                       example: "Changement de perspective"
 *                     carte_image: 
 *                       type: string
 *                       example: "pendu.png"
 *       401:
 *         description: L'utilisateur n'est pas authentifié.
 *       403:
 *         description: Le token est invalide ou expiré.
 *       500:
 *         description: Erreur serveur.
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