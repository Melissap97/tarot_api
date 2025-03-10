import express from "express" ;
import { deleteTirage, getAllTirages } from "../controllers/tirageController" ;
const router = express .Router ();

/**
 * @swagger
 * /tirages:
 *   get:
 *     summary: Get all tirages
 *     description: Get all tirages.
 *     responses:
 *       200:
 *         description: List of all tirages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique ID of the tirage.
 *                   date:
 *                     type: string
 *                     description: The date of the tirage.
 *                   numbers:
 *                     type: string
 *                     description: The numbers of the tirage.
 *       500:
 *         description: Internal server error
 */

router.get("/", getAllTirages);

/**
 * @swagger
 * /tirages/{id}:
 *   delete:
 *     summary: Delete a tirage
 *     description: Delete a tirage by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the tirage to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tirage successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The message of the deletion.
 *       404:
 *         description: Tirage not found
 *       500:
 *         description: Internal server error
 */

 router.delete("/:id", deleteTirage);

export default router ;