import express from "express" ;
import { createUser, getAllUsers } from "../controllers/userController" ;
const router = express .Router ();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided fields (nom, password, email, premium).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - password
 *               - email
 *               - premium
 *             properties:
 *               nom:
 *                 type: string
 *                 description: The name of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *               premium:
 *                 type: string
 *                 description: The premium of the user.
 *     responses:
 *       200:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique ID of the user.
 *                 nom:
 *                   type: string
 *                   description: The name of the user.
 *                 email:
 *                   type: string
 *                   description: The email of the user.
 *       500:
 *         description: Internal server error
 */
router.post("/", createUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Fetch all the users from the database
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   signification:
 *                     type: string
 *                   image:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.get("/", getAllUsers);



export default router ;