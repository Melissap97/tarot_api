import express from "express" ;
import { getAllUsers } from "../controllers/userController" ;
const router = express .Router ();

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