import { CDate } from "./Date";
export class Birthday extends CDate {
    constructor(date: string) {
        super(date);
    }
    get age(): number {
        const today = new Date();
        const birthDate = new Date(this.props.value);

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }

        return age;
    }

    public isBirthdayToday(): boolean {
        return super.isDateToday();
    }

    get birthday(): string {
        return super.date;
    }
}
