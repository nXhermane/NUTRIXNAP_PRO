export enum PatientStatus {
  ACTIVE = 1,
  INACTIVE = 2,
  ALL = 0,
}

export enum PatientGender {
  MALE = "M",
  FEMALE = "F",
  OTHER = "O",
}

export enum PatientPeriod {
  THIS_WEEK = "thisWeek",
  THIS_MONTH = "thisMonth",
}

export type SearchPatientOptions = {
  status?: PatientStatus;
  gender?: PatientGender;
  periode?: PatientPeriod;
};
