import React, { createContext, useState, useEffect, useMemo } from "react";
import { View, Text } from "react-native";
import { UserService, PatientService } from "./services";
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
    IFoodDiaryRepository
} from "@/core/interfaces";
import * as SQLite from "expo-sqlite/next";
import Database from "@/core/db/db.config";

export interface CoreInterface {
    userS: IUserService;
    user: Omit<UserEntity, "password"> | null;
    setUser: (user: UserEntity) => void;
    patientS: IPatientService;
}

export const CoreContext = createContext<CoreInterface>({} as CoreInterface);

export const CoreProvider: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const [currentUser, setCurrentUser] = useState<UserEntity | null>(null);

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

    const core: CoreInterface = useMemo(
        () => ({
            userS: userService,
            patientS: patientService,
            user: currentUser,
            setUser: (user: UserEntity) => {
                setCurrentUser(user);
            }
        }),
        [currentUser, userService, patientService]
    );

    useEffect(() => {
        async function init() {
            const user = await userService.getUser();

            setCurrentUser(user ? user : null);
        }
        init();
    }, [userService]);

    return <CoreContext.Provider value={core}>{children}</CoreContext.Provider>;
};
