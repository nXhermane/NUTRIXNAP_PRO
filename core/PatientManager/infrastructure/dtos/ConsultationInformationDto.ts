import { BaseEntityProps } from '@shared';

export interface ConsultationInformationDto extends BaseEntityProps {
   consultationMotive: string;
   expectations: string;
   clinicalObjective: string;
   otherInformation: string;
}
