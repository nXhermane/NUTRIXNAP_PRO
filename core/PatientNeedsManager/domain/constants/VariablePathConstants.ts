import { AggregateID } from "@/core/shared";

export const invariablePath = {
   patientProfilPath: "patientProfil",
   patientProfilAnthropometricMeasurePath: (measureCode: string) => combinePath("anthropomethricMeasure", measureCode,"unpack()","value"),
   patientProfilBodyCompositionMeasurePath: (measureCode: string) => combinePath("bodyComposition", measureCode,"unpack()","value"),
   patientProfilMedicalAnalysesMeasurePath: (measureCode: string) => combinePath("medicalAnalyses", measureCode,"unpack()","value"),
   medicalConditonPath: (medicalConditionId: AggregateID) => combinePath("medicalCondition", medicalConditionId as string),
   medicalConditionOtherInformationsPath: (otherInfotmationName: string) => combinePath("otherInformation", otherInfotmationName),
};

export const combinePath = (...paths: string[]) => paths.map((path) => path.trim()).join(".");
