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



/* INSERT INTO "Cartes" (nom, signification, image)
VALUES 
    ('Jugement', E'La signification traditionnelle du Jugement se concentre sur le moment où nous réfléchissons et nous évaluons nous-mêmes et nos actions. C''est grâce à l''introspection que nous pouvons avoir une compréhension plus claire et objective de notre situation actuelle et de ce que nous devons faire pour grandir en tant qu''êtres humains. La carte du Jugement apparaissant dans un tirage signifie que vous approchez de ce moment important de votre vie où vous devez commencer à vous évaluer.\r\n\r\nVoir cette carte peut également indiquer que vous êtes dans une période d''éveil, provoquée par l''introspection. Vous avez maintenant une idée plus claire de ce que vous devez changer et de la façon dont vous devez être vous-même et vos besoins. Cela peut impliquer de petits changements dans votre quotidien ou des changements majeurs qui vous affecteront non seulement vous, mais aussi vos proches.\r\n\r\nLa carte du Jugement nous rappelle que nous serons tous confrontés à des choix qui auront un impact considérable sur notre vie entière. Elle évoque des moments où des actions ont changé le cours de votre vie pour de bon. Il y a peut-être eu un moment où il n''y a plus de retour en arrière possible. Les conséquences de ces actions finiront par vous rattraper, et cette carte semble indiquer que le moment est venu. Vous devrez peut-être tourner la page sur le passé afin de pouvoir avancer dans vos projets de nouvelle vie.\r\n\r\nSource: Labyrinthos', 
    'https://res.cloudinary.com/dv1fzsswi/image/upload/v1741886439/Jugement_onmftm.jpg'),

    ('Justice', E'Les décisions que vous prenez aujourd''hui ont des effets à long terme dans tous les domaines, tant pour vous que pour les autres. Il y aura toujours un moment où vous serez jugé. La carte de tarot Justice qui apparaît dans une lecture signale qu''un jugement sera fait équitablement et en conséquence. Les décisions que vous avez prises dans le passé seront soigneusement pesées avec équité. Vos sentiments à l''égard de cette carte peuvent varier en fonction de votre situation.\r\n\r\nSi vous avez été lésé, l''apparition de cette carte peut vous soulager. En revanche, si vos actions ont causé de la peine à d''autres personnes, cette carte sert d''avertissement. Son apparition représente une chance pour vous de changer vos actions maintenant pour un meilleur avenir. Lorsqu''un tirage de tarot montre la figure de la justice, il est temps de rendre compte de vos actes.\r\n\r\nUne autre signification de la carte de la Justice est la vérité. La vérité doit arriver, et elle ne peut pas être trouvée dans les bouches et les ragots des autres. Au contraire, elle est basée sur des faits. Apprenez la vérité sur les autres et sur vous-même, parlez et connaissez la vérité avant de porter un jugement. Lors d''une lecture, lorsque vous voyez la carte de tarot Justice, vous devez être juste dans toutes vos actions. En suivant la bonne procédure pour apprendre la vérité, vous comprendrez quelles sont vos tâches.\r\n\r\nUne autre signification de la carte de Justice lors d''une lecture est de symboliser que l''attention est nécessaire. Il peut s''agir de votre vie, de votre carrière ou simplement d''une décision importante que vous devez prendre. Si vous avez des doutes sur quelque chose, il est temps de trouver une solution une fois pour toutes.\r\n\r\nSource: Labyrinthos', 
    'https://res.cloudinary.com/dv1fzsswi/image/upload/v1741886439/Justice_lksls0.jpg'),

    ('Lune', E'D''une part, la carte de la Lune peut symboliser le fait que votre imagination prend le dessus. Dans l''obscurité de la nuit, vous empruntez un chemin dont vous n''êtes pas sûr, car un danger pourrait se cacher dans ses profondeurs. La lumière de la lune peut vous apporter clarté et compréhension et vous devriez laisser votre intuition vous guider dans cette obscurité.\r\n\r\nVous devez être conscient des situations qui provoquent la peur et l''anxiété dans votre esprit, que ce soit maintenant ou dans le futur. Il vous avertit de ne pas permettre aux perturbations intérieures et aux illusions et de prendre le meilleur de vous-même. Ces souvenirs profonds et ces peurs doivent être abandonnés, et les énergies négatives doivent être libérées et transformées en quelque chose de constructif.\r\n\r\nUne autre lecture de la carte de la Lune est l''existence de l''illusion. Il faut découvrir une vérité cachée, car ce que vous voyez actuellement n''est peut-être qu''un tour de passe-passe. Vous devez rechercher les forces cachées qui doivent être démêlées.\r\n\r\nSource: Labyrinthos', 
    'https://res.cloudinary.com/dv1fzsswi/image/upload/v1741886439/Lune_slc9af.jpg'),

    ('Bateleur', E'Le Bateleur est la représentation de la volonté pure. Grâce au pouvoir des éléments et des combinaisons, il prend le potentiel inné du Fou et le façonne pour qu''il devienne réalité grâce au pouvoir du désir. Rappelez-vous que vous êtes puissant, créez votre monde intérieur et l''extérieur suivra.\r\n\r\nLorsque vous obtenez le Bateleur dans votre tirage, cela peut signifier qu''il est temps d''exploiter votre plein potentiel sans hésitation. Il peut s''agir d''un nouveau travail, d''une nouvelle entreprise, d''un nouvel amour ou d''autre chose. Cela montre qu''il est temps de passer à l''action et que tout signe de retenue signifierait que vous ratez l''occasion de devenir la meilleure version de vous-même. Certains choix devront être faits et ils peuvent entraîner de grands changements. Exploitez une partie du pouvoir du Bateleur pour créer le monde que vous désirez le plus.\r\n\r\nSource: Labyrinthos', 
    'https://res.cloudinary.com/dv1fzsswi/image/upload/v1741886438/Bateleur_mwxvtm.jpg');
 */