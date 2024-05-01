import { IFoodManager } from "./interfaces/FoodManager";
import {
    ISearchEngine,
    Paginated,
    AggregateID,
    Mapper,
    SearchEngineResult
} from "@shared";
import { FoodRepository } from "./../infrastructure";
import {
    FoodResponseType,
    FoodPersistenceType
} from "./../infrastructure/repositories/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class FoodManager implements IFoodManager {
    private _defaultLimit = 500;
    private readonly searchItemStoreKey = "foodSearchEngine";
    private activeTime = 4 * 60 * 1000;
    private timeOutId;
    private isReset: boolean = false;
    constructor(
        private repo: FoodRepository,
        private mapper: Mapper<Food, FoodPersistenceType, FoodResponseType>,
        private searchEngine: ISearchEngine<FoodResponseType>
    ) {
        this.initSearchEngine();
    }

    private async initSearchEngine() {
        const response =
            await this.getSearchEngineDataFromStoreAndReconstruct();
        if (response) {
            let countPage = 0;
            let isFinish = false;
            while (!isFinish) {
                const foodsBloc = await this.getAllFood({
                    paginated: {
                        page: countPage * this._defaultLimit,
                        pageSize: this._defaultLimit
                    }
                });
                for (const doc of foodsBloc) {
                    this.searchEngine.addDoc(doc);
                }
                if (foodsBloc.length === 0) isFinish = true;
                countPage++;
            }
        }
        this.setTimmer();
    }

    async getFoodById(foodId: AggregateID): Promise<FoodResponseType> {
        try {
            const food = await this.repo.getFoodById(foodId);
            return this.mapper.toResponse(food);
        } catch (e: any) {
            console.log(
                `Une erreur s'est produite lors de la récuperation de food avec l'ID${foodId} :${e}`
            );
            return null as FoodResponseType;
        }
    }

    async getAllFood(params: {
        foodOrigin?: string;
        paginated?: Paginated;
    }): Promise<FoodResponseType[]> {
        try {
            const foods = await this.repo.getAllFood(
                params?.foodOrigin,
                params?.paginated
            );
            return foods.map((food: Food) => this.mapper.toResponse(food));
        } catch (e: any) {
            console.log(
                `Une erreur s'est produite lors de la récuperation des Aliments:${e}`
            );
            return [] as FoodResponseType[];
        }
    }

    async getFoodByFoodGroup(params: {
        foodGroupId: string;
        paginated?: Paginated;
    }): Promise<FoodResponseType[]> {
        try {
            const foods = await this.repo.getFoodByFoodGroupId(
                params.foodGroupId,
                params.paginated
            );
            return foods.map((food: Food) => this.mapper.toResponse(food));
        } catch (e) {
            console.log(
                `Une erreur s'est produite lors de la récuperation des Aliments :${e}`
            );
            return [] as FoodResponseType[];
        }
    }

    async search(
        foodName: string
    ): Promise<SearchEngineResult<FoodResponseType>[]> {
        this.clearTimmer();
        if (this.isReset) {
            await this.initSearchEngine();
        }
        const results = this.searchEngine.search(foodName);
        return results;
    }

    async storeSearchEngineDataAndReset() {
        try {
            if (this.isReset) return;
            await AsyncStorage.setItem(
                this.searchItemStoreKey,
                this.searchEngine.toJSON()
            );
            this.searchEngine.reset();
            this.isReset = true;
        } catch (e) {
            console.log(
                `Erreur lors du storckage des donnees du search engine ${this.constructor.name}.${this.storeSearchEngineDataAndReset.name}`
            );
        }
    }
    async getSearchEngineDataFromStoreAndReconstruct(): Promise<boolean> {
        try {
            const value = await AsyncStorage.getItem(this.searchItemStoreKey);
            if (value !== null) {
                this.searchEngine.reconstruct(value);
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.log(
                `Erreur lors de la recupération des donnees du search engine ${this.constructor.name}.${this.getSearchEngineDataFromStoreAndReconstruct.name}`
            );
            return false;
        }
    }

    setTimmer() {
        this.timeOutId = setTimeout(async () => {
            await this.storeSearchEngineDataAndReset();
        }, this.activeTime);
    }
    clearTimmer() {
        clearTimeout(this.timeOutId);
    }
}
