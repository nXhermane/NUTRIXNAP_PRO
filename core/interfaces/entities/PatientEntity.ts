import { v4 as uuidv4 } from 'uuid';

export default PatientEntity = class {
  constructor(
    readonly name: string;
    readonly email: string;
    readonly gender: 'M' | 'F' | 'O';
    readonly country: string;
    readonly tel: string;
    readonly profil_img: string;
    readonly birthday: string;
    readonly id?: number;
    readonly occupancy?: string;
    readonly consultationLocation?: string;
    readonly createdAt?: string;
    readonly updatedAt?: string;
  ) {
    this.unique_id = uuidv4();
  }

  unique_id: string;
};
