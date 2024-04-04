export default interface UserEntity {
    name: string;
    email: string;
    firstname?: string;
    lastname?: string;
    gender?: "M" | "F" | "O";
    country?: string;
    tel?: string;
    profil_img?: string;
    birthday?: string;
    profession?: string;
    id?: number;
    password?: string;
    unique_id?:string
}
