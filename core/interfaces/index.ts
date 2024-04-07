/**
 * @interface db  import
 */
import IDatabase from "./db/db";
/**
 * @interface Repository import
 */
import IUserRepository from "./repositories/UserRepository";
import IPatientRepository from "./repositories/PatientRepository";
import IFoodDiaryRepository from "./repositories/FoodDiaryRepository"
/**
 * @interface Services import
 */
import IUserService from "./services/UserService";
import IPatientService from "./services/PatientService";
/**
 * @interface Entities import
 */
import UserEntity from "./entities/UserEntity";
import PatientEntity from "./entities/PatientEntity";
import FoodDiaryEntity from "./entities/FoodDiaryEntity";
/**
 * @Types OtherTypes import
 */
import { SearchPatientOptions } from "./types";

/**
 * @Types import couche specific type
 */
import { CreateUserType, UpdateUserType } from "./types/user.type";
import { CreatePatientType, UpdatePatientType } from "./types/patient.type";
import {
    UpdateFoodDiaryType,
    CreateFoodDiaryType
} from "./types/foodDiary.type";


/**
 * @Export all core types and interfaces
 */

export {
    // @dn
    IDatabase,
    // @Repository
    IUserRepository,
    IPatientRepository,
    IFoodDiaryRepository,
    // @Service
    IUserService,
    IPatientService,
    // @Entities
    UserEntity,
    PatientEntity,
    FoodDiaryEntity,
    // @Types
    SearchPatientOptions,
    // @Types Specific
    CreateUserType,
    UpdateUserType,
    CreatePatientType,
    UpdatePatientType,
    UpdateFoodDiaryType,
    CreateFoodDiaryType
};
