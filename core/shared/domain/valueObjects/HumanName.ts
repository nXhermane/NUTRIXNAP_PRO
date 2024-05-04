import { ValueObject } from "./../ValueObject";
import { Guard } from "./../../core";
import { ArgumentNotProvidedException } from "./../../exceptions";
export class HumanName extends ValueObject<string> {
    constructor(nom: string) {
        super({ value: nom });
    }

    protected validate(props: { value: string }): void {
        if (Guard.isEmpty(props.value)) {
            throw new Error("Le nom ne peut pas être vide.");
        }
        // Valider d'autres règles métier si nécessaire
    }

    get lastName(): string {
        const parts = this.props.value.trim().split(" ");
        return parts[parts.length - 1];
    }

    get firstName(): string {
        return this.props.value.trim().split(" ")[0];
    }

    get fullName(): string {
        return this.props.value;
    }

    toString(): string {
        return this.props.value;
    }
}
