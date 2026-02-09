export type ApplicationStatus = 'en_attente' | 'Accepté' | 'Refusé';

export interface Application {
  id?: number;
  userId: number;
  offerId: number;
  apiSource: string;
  title: string;
  company: string;
  location: string;
  url: string;
  status: ApplicationStatus;
  notes: string;
  dateAdded: Date | string;
}
