import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

// Définition des attributs d'un Utilisateurs
interface UtilisateursAttributes {
    id?: number;
    nom: string;
    hashedPassword: string,
    email: string;
    premium?: boolean; //? signifie que l'attribut est optionnel
    admin?: boolean; 
    
}

class Utilisateurs extends Model<UtilisateursAttributes>
    implements UtilisateursAttributes {
    public id!: number;
    public nom!: string;
    public hashedPassword!: string;
    public email!: string;
    public premium!: boolean;
    
}

Utilisateurs.init(
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
        hashedPassword: {
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
        premium: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            
        },
    },
    {
        sequelize,
        tableName: "Utilisateurs",
        timestamps: false,
    }
);

export default Utilisateurs;
