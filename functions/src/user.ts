import { firestore } from 'firebase/app';

export interface User {
  activeChallenge: string;
}

export interface UserChallenge {
  status: 'accepted' | 'rejected' | 'done';
  started_at: firestore.Timestamp;
  finished_at: firestore.Timestamp;
}

export interface Challenge {
  imgUrl: string;
  question: string;
  id: string;
}
