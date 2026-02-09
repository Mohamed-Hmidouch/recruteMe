import { Job } from './job.model';

export interface Favorite {
  id?: number;
  userId: number;
  jobId: number;
  title: string;
  company: string;
  location: string;
  url: string;
  job?: Job;
}