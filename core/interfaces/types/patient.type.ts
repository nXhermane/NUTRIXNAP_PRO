import { PatientEntity } from "@/core/interfaces";

export type CreatePatientType = Omit<PatientEntity, "id" | "unique_id">;
export type UpdatePatientType = { id: number } & Partial<
    Omit<PatientEntity, "id" | "unique_id">
>;
