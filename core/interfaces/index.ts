// TYPE ALIASES
type Db = IDatabase;
type UserRepository = IUserRepository;
type PatientRepository = IPatientRepository;
type FoodDiaryRepository = IFoodDiaryRepository;
type UserService = IUserService;
type PatientService = IPatientService;
type FoodDiaryService = IFoodDiaryService;
type UserEntity = UserEntity;
type PatientEntity = PatientEntity;
type FoodDiaryEntity = FoodDiaryEntity;
type FoodDiaryDTO = FoodDiaryDTO;
type FoodDiaryMapper = IFoodDiaryMapper;
type SearchPatientOptions = SearchPatientOptions;
type CreateUserType = CreateUserType;
type UpdateUserType = UpdateUserType;
type CreatePatientType = CreatePatientType;
type UpdatePatientType = UpdatePatientType;
type UpdateFoodDiaryType = UpdateFoodDiaryType;
type CreateFoodDiaryType = CreateFoodDiaryType;
type UpdateFoodDiaryDto = UpdateFoodDiaryDto;
type FoodId = FoodId;
type FoodQuantity = FoodQuantity;

// IMPORTS
// Database
import Db from "./db/db";

// Repositories
import UserRepository from "./repositories/UserRepository";
import PatientRepository from "./repositories/PatientRepository";
import FoodDiaryRepository from "./repositories/FoodDiaryRepository";

// Services
import UserService from "./services/UserService";
import PatientService from "./services/PatientService";
import FoodDiaryService from "./services/FoodDiaryService";

// Entities
import UserEntity from "./entities/UserEntity";
import PatientEntity from "./entities/PatientEntity";
import FoodDiaryEntity from "./entities/FoodDiaryEntity";

// DTOs
import FoodDiaryDTO from "./dtos/foodDiaryDTO";

// Mappers
import FoodDiaryMapper from "./mappers/FoodDiaryMapper";

// Types
import { SearchPatientOptions } from "./types";
import { CreateUserType, UpdateUserType } from "./types/user.type";
import { CreatePatientType, UpdatePatientType } from "./types/patient.type";
import { UpdateFoodDiaryType, CreateFoodDiaryType, UpdateFoodDiaryDto, FoodId, FoodQuantity } from "./types/foodDiary.type";

// EXPORTS
export {
    Db,
    UserRepository,
    PatientRepository,
    FoodDiaryRepository,
    UserService,
    PatientService,
    FoodDiaryService,
    UserEntity,
    PatientEntity,
    FoodDiaryEntity,
    FoodDiaryDTO,
    FoodDiaryMapper,
    SearchPatientOptions,
    CreateUserType,
    UpdateUserType,
    CreatePatientType,
    UpdatePatientType,
    UpdateFoodDiaryType,
    CreateFoodDiaryType,
    UpdateF
