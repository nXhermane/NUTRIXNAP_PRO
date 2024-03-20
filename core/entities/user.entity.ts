export default class UserEntity {
    private _id: number;
    private _password?: string;

    constructor(
        public name: string,
        public email: string,
        public firstname: string,
        public lastname: string,
        public sexe: "M" | "F" | "O",
        public country: string,
        public tel: string,
        public birthday: string,
        public profession: string,
        public profil_img: string
    ) {
      this._id=0
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get password(): string | undefined {
        return this._password;
    }

    set password(value: string | undefined) {
        this._password = value;
    }

    fullName(): string {
        return `${this.firstname} ${this.lastname}`;
    }
}
