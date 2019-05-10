import { ITag } from './tag';

export interface ICertificate {
    id: number;
    name: string,
    description: string,
    durationInDays: number,
    price: number,
    dateOfModification: string,
    dateOfCreation: string,
    tags: ITag[];
  }
  
  