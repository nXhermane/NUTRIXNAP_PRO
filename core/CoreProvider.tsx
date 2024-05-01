import React, { createContext, useState, useEffect, useMemo } from "react";
import { View, Text } from "react-native";
import { UserService, PatientService, FoodDiaryService } from "./services";
import {
    UserRepository,
    PatientRepository,
    FoodDiaryRepository
} from "./repositories";
import {
    IUserService,
    IPatientService,
    UserEntity,
    PatientEntity,
    IUserRepository,
    IPatientRepository,
    IFoodDiaryRepository,
    IFoodDiaryService,
    UpdateFoodDiaryDto,
    FoodId,
    FoodQuantity
} from "@/core/interfaces";
import "./FoodsAndRecipesDatabase";

import { FoodDiaryMapper } from "@/core/mappers";
import * as SQLite from "expo-sqlite/next";

export interface CoreInterface {
    userS: IUserService;
    user: Omit<UserEntity, "password"> | null;
    setUser: (user: UserEntity) => void;
    patientS: IPatientService;
    foodDiaryS: IFoodDiaryService;
}
import { FoodAndRecipe, IFoodAndRecipe } from "./FoodsAndRecipesDatabase";

export const CoreContext = createContext<CoreInterface>({} as CoreInterface);

export const CoreProvider: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const [currentUser, setCurrentUser] = useState<UserEntity | null>(null);
    const [foodAndRecipeApp, setFoodAndRecipeApp] =
        useState<IFoodAndRecipe | null>(null);
    const userRepository: IUserRepository = useMemo(
        () => new UserRepository(),
        []
    );
    const patientRepository: IPatientRepository = useMemo(
        () => new PatientRepository(),
        []
    );
    const userService: IUserService = useMemo(
        () => new UserService(userRepository),
        [userRepository]
    );
    const patientService: IPatientService = useMemo(
        () => new PatientService(patientRepository),
        []
    );

    const foodDiaryRepository: IFoodDiaryRepository = useMemo(
        () => new FoodDiaryRepository(),
        []
    );
    const foodDiaryService: IFoodDiaryService = useMemo(
        () => new FoodDiaryService(foodDiaryRepository, new FoodDiaryMapper()),
        []
    );

    const core: CoreInterface = useMemo(
        () => ({
            userS: userService,
            patientS: patientService,
            foodDiaryS: foodDiaryService,
            user: currentUser,
            setUser: (user: UserEntity) => {
                setCurrentUser(user);
            },
            foodAndRecipe: foodAndRecipeApp
        }),
        [
            currentUser,
            userService,
            patientService,
            foodDiaryService,
            foodAndRecipeApp
        ]
    );

    useEffect(() => {
        async function init() {
            const user = await userService.getUser();
            setCurrentUser(user ? user : null);
            const app = await FoodAndRecipe.getInstance();
            setFoodAndRecipeApp(app);
        }

        init();
    }, [userService]);

    return <CoreContext.Provider value={core}>{children}</CoreContext.Provider>;
};
