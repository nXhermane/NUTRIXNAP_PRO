export default interface PatientEntity {
   name: string;
   email: string;
   gender: "M" | "F" | "O";
   country: string;
   tel: string;
   profil_img: string;
   birthday: string;
   id: number;
   occupancy: string;
   consultationLocation: string;
   createdAt: string;
   updatedAt: string;
   unique_id: string;
}
