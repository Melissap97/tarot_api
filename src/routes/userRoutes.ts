import express from "express" ;
import { createUser } from "../controllers/userController" ;
const router = express .Router ();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Créer un utilisateur
 *     description: Ajoute un nouvel utilisateur avec son nom et son email.
 *     tags:
 *       - Utilisateurs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - email
 *             properties:
 *               nom:
 *                 type: string
 *                 example: "Dupont"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "dupont@example.com"
 *     responses:
 *       200:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nom:
 *                   type: string
 *                   example: "Dupont"
 *                 email:
 *                   type: string
 *                   example: "dupont@example.com"
 *       500:
 *         description: Erreur serveur
 */
router.post("/", createUser);

export default router ;