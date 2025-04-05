import { Request, Response } from "express";
import Utilisateurs from "../models/Utilisateurs.model";
import { validateSchema } from "../Utils/JoiUtils";
import { loginSchema, registerSchema } from "../JoiValidators/authValidators";
import { hashPassword, verifyPassword } from "../Utils/PWDUtils";
import { generateToken } from "../Utils/JWTUtils";

export async function register(req:Request, res:Response){
    try{
        const { nom, password, email } = validateSchema(req, registerSchema);
        //Erreur si les champs sont vides
        if(!nom || !password || !email ){
            res.status(400).send('Le champs nom, password et email sont incomplets.');
            return 
        }
        //Génération du mdp hashé
        const hashedPassword = await hashPassword(password);
        const utilisateur = await Utilisateurs.create({ nom, hashedPassword,email});
        utilisateur.hashedPassword = '';
        res.json(utilisateur);
    } catch(err:any){
        if(err.code===11000){
            res.status(400).json({message: 'Cet email ou nom est déjà utilisé'});
            return 
        }
        res.status(500).json({message: 'Erreur interne', error: err.message});
    }
}

export async function login(req:Request, res:Response){
    try {
        const { nom, email, password } = validateSchema(req, loginSchema);
        //Recherche de l'utilisateur par son nom
        const user= await Utilisateurs.findOne({where:{nom}});

         //Erreur si nom pas trouvé
        if(!nom){
            res.status(404).json({message: 'Nom d\'utilisateur introuvable'});
            return 
        }
        if(!user){
            res.status(404).json({message: 'Utilisateur introuvable'});
            return 
        }
        
        if(!email){
            res.status(404).json({message: 'Email introuvable'});
            return 
        }
        //Vérification du mot de passe hashé selon l'utilisateur
        const isPasswordValid= await verifyPassword(password,user.hashedPassword);
        
        
        if(!isPasswordValid){
            res.status(401).json({message: 'Mot de passe incorrect'});
            return 
        }
        const token = generateToken({id:user.id, isPremium: user.premium});

        res.cookie("jwt", token, {httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production"});
        res.status(200).json({message: 'Connexion réussie', token});

    }catch(error:any){
        res.status(500).json({message: error.message});
    }
}