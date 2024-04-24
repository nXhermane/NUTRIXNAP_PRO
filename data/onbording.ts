export type OnbordingDataType = {
  id: number;
  title: string;
  body: string;
  imgPath: string;
};

const welcomeImagePath = require("./../assets/images/logoWithName.webp");
const consultationImagePath = require("./../assets/images/nutritionnistEzplain.webp");
const dietPlanImagePath = require("./../assets/images/dietPlan.webp");
const followImagePath = require("./../assets/images/follow.webp");
const startImagePath = require("./../assets/images/nutrGraphFood.webp");

const data: OnbordingDataType[] = [
  {
    id: 0,
    title: "Bienvenue",
    body: "NutriPro, l'application qui vous simplifie la vie diététicien.L'application qui vous aide à conseiller vos clients sur leur alimentation et leur santé.",
    imgPath: welcomeImagePath,
  },
  {
    id: 1,
    title: "Consultations",
    body: "Enregistrez et analysez les données de vos patients sans connexion Internet.",
    imgPath: consultationImagePath,
  },
  {
    id: 2,
    title: "Plans alimentaires",
    body: "Créez des plans alimentaires personnalisés et adaptés aux besoins de vos patients.",
    imgPath: dietPlanImagePath,
  },
  {
    id: 3,
    title: "Suivi",
    body: "Restez en contact avec vos patients et envoyez-
