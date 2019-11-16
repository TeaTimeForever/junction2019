import { Timestamp } from '@google-cloud/firestore';

export interface User {
  activeChallenge: string;
}

export interface UserChallenge {
  status: 'accepted' | 'rejected' | 'done';
  started_at: Timestamp;
  finished_at: Timestamp;
}

export interface Challenge {
  imgUrl: string;
  question: string;
  id: string;
}
