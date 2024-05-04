import { ValueObject } from "./../ValueObject";
import { Guard } from "./../../core";
import {
    ArgumentNotProvidedException,
    InvalidArgumentFormatError,
    ArgumentOutOfRangeException,
    ArgumentInvalidException
} from "../../exceptions";
export class Birthday extends ValueObject<string> {
    constructor(date: string) {
        super({ value: date });
    }

    protected validate(props: { value: string }): void {
        if (Guard.isEmpty(props.value)) {
            throw new ArgumentNotProvidedException(
                "La date de naissance ne peut pas être vide."
            );
        }
        // Tableau des expressions régulières pour les formats de date supportés
        const dateFormatsRegex = [
            /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
            /^\d{2}\/\d{2}\/\d{4}$/, // DD/MM/YYYY
            /^\d{2}\/\d{2}\/\d{4}$/ // MM/DD/YYYY
        ];

        let validFormat = false;
        for (const regex of dateFormatsRegex) {
            if (regex.test(props.value)) {
                validFormat = true;
                break;
            }
        }

        if (!validFormat) {
            throw new InvalidArgumentFormatError(
                "Format de date de naissance invalide. Utilisez le format YYYY-MM-DD, DD/MM/YYYY ou MM/DD/YYYY."
            );
        }

        // Valider l'année, le mois et le jour en fonction du format détecté
        const parts = props.value.split(/[\/-]/);
        let year, month, day;

        if (parts[0].length === 4) {
            year = parseInt(parts[0]);
            month = parseInt(parts[1]);
            day = parseInt(parts[2]);
        } else if (parts[2].length === 4) {
            year = parseInt(parts[2]);
            month = parseInt(parts[0]);
            day = parseInt(parts[1]);
        } else {
            throw new InvalidArgumentFormatError(
                "Format de date de naissance invalide. Assurez-vous que l'année est au format YYYY."
            );
        }

        // Valider l'année, le mois et le jour individuellement
        if (isNaN(year) || isNaN(month) || isNaN(day)) {
            throw new ArgumentInvalidException(
                "Date de naissance invalide. Assurez-vous que l'année, le mois et le jour sont des nombres valides."
            );
        }

        if (month < 1 || month > 12) {
            throw new ArgumentOutOfRangeException(
                "Mois de date de naissance invalide. Utilisez des valeurs entre 1 et 12."
            );
        }

        const daysInMonth = new Date(year, month, 0).getDate();
        if (day < 1 || day > daysInMonth) {
            throw new ArgumentOutOfRangeException(
                "Jour de date de naissance invalide. Assurez-vous que le jour est valide pour le mois donné."
            );
        }
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

    public isLeapYear(): boolean {
        const year = parseInt(this.props.value.substring(0, 4));
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    public isBirthdayToday(): boolean {
        const today = new Date();
        const birthDate = new Date(this.props.value);

        return (
            today.getMonth() === birthDate.getMonth() &&
            today.getDate() === birthDate.getDate()
        );
    }

    public isBefore(birthday: Birthday): boolean {
        const thisDate = new Date(this.props.value);
        const otherDate = new Date(birthday.props.value);

        return thisDate < otherDate;
    }

    public isAfter(birthday: Birthday): boolean {
        const thisDate = new Date(this.props.value);
        const otherDate = new Date(birthday.props.value);

        return thisDate > otherDate;
    }

    get birthday(): string {
        return this.props.value;
    }
}
