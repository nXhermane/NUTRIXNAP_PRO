
export type OnbordingDataType = {
    id: number;
    title: string;
    body: string;
    imgPath: string;
};
const data: OnbordingDataType[] = [
    {
        id: 0,
        title: "Bienvenue",
        body: "NutriPro, l'application qui vous simplifie la vie diététicien.L'application qui vous aide à conseiller vos clients sur leur alimentation et leur santé.",
        imgPath: require("./../assets/images/logoWithName.webp")
    },
    {
        id: 1,
        title: "Consultations",
        body: "Enregistrez et analysez les données de vos patients sans connexion Internet.",
        imgPath: require("./../assets/images/nutritionnistEzplain.webp")
    },
    {
        id: 2,
        title: "Plans alimentaires",
        body: "Créez des plans alimentaires personnalisés et adaptés aux besoins de vos patients.",
        imgPath: require("./../assets/images/dietPlan.webp")
    },
    {
        id: 3,
        title: "Suivi",
        body: "Restez en contact avec vos patients et envoyez-leur des conseils et des listes de courses.",
        imgPath: require("./../assets/images/follow.webp")
    },
    {
        id: 4,
        title: "Commencer",
        body: "Prêt à commencer ? Inscrivez-vous ou connectez-vous pour profiter de NutriPro.",
        imgPath: require("./../assets/images/nutrGraphFood.webp")
    }
];
export default data;
