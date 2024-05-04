import {
    INVALID_FOOD_CODE_ERROR,
    INVALID_FOOD_NAME_ERROR,
    INVALID_FOOD_ORIGIN_ERROR,
    MINIMUM_NUTRIENTS_ERROR,
    DUPLICATE_NUTRIENTS_ERROR,
    FOOD_UPDATE_RESTRICTED_ERROR
} from "./../constants";

import {
    Quantity as FoodQuantity,
    IQuantity as IFoodQuantity
} from "./../value-objects/Quantity";
import { FoodGroup, IFoodGroup } from "./../entities/FoodGroup";
import { Nutrient, INutrient } from "./../entities/Nutrient";
import {
    AggregateRoot,
    CreateEntityProps,
    BaseEntityProps,
    EmptyStringError,
    DuplicateValueError,
    AuthValueError
} from "@shared";

export interface IFood {
    foodCode: string;
    foodName: string;
    foodOrigin: string;
    foodSource: string;
    foodQuantity: FoodQuantity;
    foodGroup: FoodGroup;
    foodNameTranslate?: {
        inFrench?: string;
        inEnglish?: string;
    };

    foodNutrients: Nutrient[];
}

export class Food extends AggregateRoot<IFood> {
    constructor(createFoodProps: CreateEntityProps<IFood>) {
        super(createFoodProps);
        this.validate();
    }
    get foodCode(): string {
        return this.props.foodCode;
    }
    get foodName(): string {
        return this.props.foodName;
    }
    get foodOrigin(): string {
        return this.props.foodOrigin;
    }
    get foodSource(): string {
        return this.props.foodSource;
    }
    get foodQuantity(): IFoodQuantity {
        return this.props.foodQuantity.unpack();
    }
    get foodGroup(): IFoodGroup & BaseEntityProps {
        return this.props.foodGroup.getProps();
    }
    get foodNutrients(): (INutrient & BaseEntityProps)[] {
        return this.props.foodNutrients.map((nutrient: Nutrient) =>
            nutrient.getProps()
        );
    }
    get foodNameF(): string {
        return this.props?.foodNameTranslate?.inFrench ?? this.props.foodName;
    }
    get foodNameE(): string {
        return this.props?.foodNameTranslate?.inEnglish ?? this.props.foodName;
    }
    set foodNameF(value: string) {
        this.verifyIfFoodCanBeUpdate();
        this.props.foodNameTranslate = {
            ...this.props.foodNameTranslate,
            inFrench: value
        };
    }
    set foodNameE(value: string) {
        this.verifyIfFoodCanBeUpdate();
        this.props.foodNameTranslate = {
            ...this.props.foodNameTranslate,
            inEnglish: value
        };
    }
    addNutrientsToFood(createNutrientProps: CreateEntityProps<INutrient>) {
        this.verifyIfFoodCanBeUpdate();
        const nutrient = new Nutrient(createNutrientProps);
        nutrient.validate();
        const existingNutrientIndex = this.findExistingNutrientIndex(nutrient);
        if (existingNutrientIndex !== -1) {
            this.props.foodNutrients[existingNutrientIndex] = nutrient;
        } else {
            this.props.foodNutrients.push(nutrient);
        }

        if (!this.validateNutrientIsUnique(this.props.foodNutrients)) {
            throw new DuplicateValueError(DUPLICATE_NUTRIENTS_ERROR);
        }
    }
    validate(): void {
        if (this.props.foodCode.trim() === "" || !this.props.foodCode) {
            throw new EmptyStringError(INVALID_FOOD_CODE_ERROR);
        }
        if (this.props.foodName.trim() === "" || !this.props.foodName) {
            throw new EmptyStringError(INVALID_FOOD_NAME_ERROR);
        }
        if (this.props.foodOrigin.trim() === "" || !this.props.foodOrigin) {
            throw new EmptyStringError(INVALID_FOOD_ORIGIN_ERROR);
        }
        this.props.foodGroup.validate();

        // TODO: je dois reactiver cela plus tart quand les données seront prestes
        // if (this.props.foodNutrients.length < 5) {
        //             throw new Error(MINIMUM_NUTRIENTS_ERROR);
        //         }
        if (!this.validateNutrientIsUnique(this.props.foodNutrients)) {
            throw new DuplicateValueError(DUPLICATE_NUTRIENTS_ERROR);
        }
    }
    private validateNutrientIsUnique(foodNutrients: Nutrient[]): boolean {
        const nutrientSetArray = new Set();
        for (const nutrient of foodNutrients) {
            nutrient.validate();
            const key = JSON.stringify(
                nutrient.nutrientCode + nutrient.nutrientINFOODSTagName
            );
            if (nutrientSetArray.has(key)) {
                return false;
            }
            nutrientSetArray.add(key);
        }
        return true;
    }
    /**
     * @Note : L'aliment du systeme ne peut pas etre modifier sauf ceux ajouter par l'utilisateur lui meme
     *
     */

    private verifyIfFoodCanBeUpdate() {
        if (this.props.foodOrigin.trim() != "me")
            throw new AuthValueError(FOOD_UPDATE_RESTRICTED_ERROR);
    }

    private findExistingNutrientIndex(newNutrient: Nutrient): number {
        return this.props.foodNutrients.findIndex(nutrient => {
            return nutrient.equals(newNutrient);
        });
    }
}
