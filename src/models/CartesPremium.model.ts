import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";


interface CartesPremiumAttributes {
    id: number;
    nom: string;
    signification: string;
    image: string, 
}

class CartesPremium extends Model<CartesPremiumAttributes>
    implements CartesPremiumAttributes {
    public id!: number;
    public nom!: string;
    public signification!: string;
    public image!: string; 
}

CartesPremium.init(
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
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "CartesPremium",
        timestamps: false,

    }
);

export default CartesPremium;
