import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";


interface CartesAttributes {
    id?: number;
    nom: string;
    signification: string;
    image: string, 
}

class Cartes extends Model<CartesAttributes>
    implements CartesAttributes {
    public id!: number;
    public nom!: string;
    public signification!: string;
    public image!: string;
}

Cartes.init(
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
        signification: {
            type: DataTypes.STRING(5000), // 5000 caractères max
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "Cartes",
        timestamps: false,

    }
);

export default Cartes;


