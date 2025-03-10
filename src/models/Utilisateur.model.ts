import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

// Définition des attributs d'un utilisateur
interface UtilisateurAttributes {
    id?: number;
    nom: string;
    password: string,
    email: string;
    status: boolean;
    
}

class Utilisateur extends Model<UtilisateurAttributes>
    implements UtilisateurAttributes {
    public id!: number;
    public nom!: string;
    public password!: string;
    public email!: string;
    public status!: boolean;
    
}

Utilisateur.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "utilisateurs",
        timestamps: true, // Ajoute createdAt & updatedAt
    }
);

export default Utilisateur;
