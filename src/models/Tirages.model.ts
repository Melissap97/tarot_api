import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Utilisateurs from "./Utilisateurs.model";
import Cartes from "./Cartes.model";
import CartesPremium from "./CartesPremium.model";

interface TiragesAttributes {
    id?: number;
    utilisateur_id?: string | null;
    carte_id?: number | null;
    carte_nom?: string | null;
    carte_signification?: string | null;
    carte_image?: string | null;
    carte_premium_id?: number | null;
    carte_premium_nom?: string | null;
    carte_premium_signification?: string | null;
    carte_premium_image?: string | null;
    createdAt?: Date;
}

class Tirages extends Model<TiragesAttributes> implements TiragesAttributes {
    public id!: number;
    public utilisateur_id?: string | null;
    public carte_id?: number | null;
    public carte_nom?: string | null;
    public carte_signification?: string | null;
    public carte_image?: string | null;
    public carte_premium_id?: number | null;
    public carte_premium_nom?: string | null;
    public carte_premium_signification?: string | null;
    public carte_premium_image?: string | null;
    public readonly createdAt!: Date;
}

Tirages.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        utilisateur_id: {
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: Utilisateurs,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        carte_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Cartes,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        carte_nom: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        carte_signification: {
            type: DataTypes.STRING(5000),
            allowNull: true,
        },
        carte_image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        carte_premium_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: CartesPremium,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        carte_premium_nom: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        carte_premium_signification: {
            type: DataTypes.STRING(5000),
            allowNull: true,
        },
        carte_premium_image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "Tirages",
        timestamps: true,
        createdAt: "createdAt",
        updatedAt: false, // Disable updatedAt
    }
);

// Define proper associations
Tirages.belongsTo(Utilisateurs, { foreignKey: "utilisateur_id" });
Utilisateurs.hasMany(Tirages, { foreignKey: "utilisateur_id" });

Tirages.belongsTo(Cartes, { foreignKey: "carte_id" });
Cartes.hasMany(Tirages, { foreignKey: "carte_id" });

Tirages.belongsTo(CartesPremium, { foreignKey: "carte_premium_id" });
CartesPremium.hasMany(Tirages, { foreignKey: "carte_premium_id" });

export default Tirages;
