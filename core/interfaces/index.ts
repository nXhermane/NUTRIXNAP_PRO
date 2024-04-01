/**
 * @interface db  import
 */
import IDatabase from "./db/db";
/**
 * @interface Repository import
 */
import IUserRepository from "./repositories/UserRepository";
import IPatientRepository from "./repositories/PatientRepository";
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
/**
 * @Types OtherTypes import
 */
import { SearchPatientOptions } from "./types";
export {
    // @dn
    IDatabase,
    // @Repository
    IUserRepository,
    IPatientRepository,
    // @Service
    IUserService,
    IPatientService,
    // @Entities
    UserEntity,
    PatientEntity,
    // @Types
    SearchPatientOptions
};
