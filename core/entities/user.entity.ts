type User = Omit<UserEntity, "_id" | "_password">;



export default class UserEntity {
    private _id: number;
    private _password?: string;

    constructor(
        public name: string,
        public email: string,
        public firstname?: string,
        public lastname?: string,
        public gender?: "M" | "F" | "O",
        public country?: string,
        public tel?: string,
        public profil_img?: string,
        public birthday?: string,
        public profession?: string
    ) {
        this._id = 0;
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
    public static create(user: User): UserEntity {
        const newUser = new UserEntity(user.name, user.email);
        Object.keys(user).forEach((key: any) => {
            newUser[key] = user[key];
        });
        return newUser;
    }
}
