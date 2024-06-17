import { CreatePatientError } from "./CreatePatientError";
import { CreatePatientRequest } from "./CreatePatientRequest";
import { CreatePatientResponse } from "./CreatePatientResponse";
import { PatientFactory, CreatePatientProps } from "./../../../../domain";
import { UseCase, TransactionManager, FileManager, Image } from "@shared";
import { PatientRepository, PatientRepositoryError } from "./../../../../infrastructure";

export class CreatePatientUseCase implements UseCase<CreatePatientRequest, CreatePatientResponse> {
   constructor(
      private patientRepo: PatientRepository,
      private patientFactory: PatientFactory,
      private transactionManager: TransactionManager,
      private fileManager: FileManager,
   ) {}

   async execute(request: CreatePatientRequest): Promise<CreatePatientResponse> {
      try {
         const patient = this.patientFactory.create({
            ...request,
         });
         if (patient.isFailure) throw new CreatePatientError(`Create Patient Failed`);
         const images = await Promise.all(
            patient.val.getImage().map(
               async (img: Image) =>
                  await this.fileManager.save({
                     file: img,
                     dirname: patient.val.id + "_" + patient.val.name,
                  }),
            ),
         );
         patient.val.images = images as Image[];
         await this.transactionManager.transaction<void>(async (context: any) => {
            await this.patientRepo.save(patient.val, context);
         });
         return {
            patientId: patient.val.id,
         } as CreatePatientResponse;
      } catch (e: any) {
         if (e instanceof PatientRepositoryError) throw new CreatePatientError(e.message, e as Error, e.metadata);
         throw new CreatePatientError(`Unexpected error: ${e?.constructor.name}`, e as Error, request);
      }
   }
}
