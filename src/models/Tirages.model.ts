import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Utilisateurs from "./Utilisateurs.model";
import Cartes from "./Cartes.model";
import CartesPremium from "./CartesPremium.model";


interface TiragesAttributes {
    id?: number;
    utilisateur_id?: number;
    carte_id: number;
    carte_premium_id: number | null;
}

class Tirages extends Model<TiragesAttributes>
    implements TiragesAttributes {
    public id!: number;
    public utilisateur_id!: number;
    public carte_id!: number;
    public carte_premium_id!: number | null;
    public readonly date!: Date;
}

Tirages.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        utilisateur_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Utilisateurs,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        carte_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Cartes,
                key: "id",
            },
            onDelete: "CASCADE",
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
    },
    {
        sequelize,
        tableName: "Tirages",
        timestamps: true, 
        createdAt: 'createdAt',
        updatedAt: false, // Désactive updatedAt
    }
);

Tirages.belongsTo(Utilisateurs, { foreignKey: "utilisateur_id" });
Utilisateurs.hasMany(Tirages, { foreignKey: "utilisateur_id" });

Tirages.belongsTo(Cartes, { foreignKey: "carte_id" }); 
Cartes.hasMany(Tirages, { foreignKey: "carte_id" }); 

Tirages.belongsTo(CartesPremium, { foreignKey: "carte_premium_id" }); 
CartesPremium.hasMany(Tirages, { foreignKey: "carte_premium_id" });

export default Tirages;

