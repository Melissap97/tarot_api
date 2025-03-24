import express from "express" ;
import { getAllUsers, modifyStatus } from "../controllers/userController" ;
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware";
const router = express .Router ();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     description: Retourne la liste de tous les utilisateurs enregistrés. Nécessite un token JWT valide.
 *     tags: 
 *       - Utilisateurs
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nom:
 *                     type: string
 *                   email:
 *                     type: string
 *                   premium:
 *                     type: boolean
 *       401:
 *         description: Accès refusé. Cookie ou token manquant.
 *       403:
 *         description: Token invalide ou expiré.
 *       500:
 *         description: Erreur serveur.
 */
router.get("/", verifyTokenMiddleware, getAllUsers);


/**
 * @swagger
 * /users/modify/{id}:
 *   put:
 *     summary: Modifier le statut premium d'un utilisateur
 *     description: Permet de basculer le statut premium d'un utilisateur (activer/désactiver). Requiert un token JWT.
 *     tags: 
 *       - Utilisateurs
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à modifier
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Statut de l'utilisateur modifié avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 utilisateur:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     premium:
 *                       type: boolean
 *       401:
 *         description: Accès refusé. Cookie ou token manquant.
 *       403:
 *         description: Token invalide ou expiré.
 *       404:
 *         description: Utilisateur non trouvé.
 *       500:
 *         description: Erreur serveur.
 */
router.put("/modify/:id", verifyTokenMiddleware, modifyStatus);


export default router ;