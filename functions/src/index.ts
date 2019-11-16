import * as functions from 'firebase-functions';
import * as  admin from 'firebase-admin';
import { UserChallenge, Challenge } from './user';
import { DocumentData } from '@google-cloud/firestore';

admin.initializeApp();
const db = admin.firestore();

export const getChallenge = functions.https.onRequest(async (request, response) => {
  const uid = request.param('uid');
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Content-Type', 'application/json');

  const userSn = await db.doc(`users/${uid}`).get();
  if (!userSn.exists) {
    response.status(404).send('User not found');
  } else {
    const doneChallenges = (await db.collection(`users/${uid}/challenges`).where('status', '==', 'accepted').get())
      .docs.map(snapshot => snapshot.id);

    const allChallengesSn = (await db.collection(`gettingToNo/general/challenges`).get()).docs;

    const nextChallengeDoc = allChallengesSn.sort(() => Math.random() - 0.5).find(doc => !doneChallenges.includes(doc.id))
    
    const responseToSend: Challenge = !nextChallengeDoc ? 
      {
        imgUrl: 'hello', // TODO: Add a success image here
        question: `Congrats - You've finished all the challenges in this training. Choose the next training in the app`
      } :
      ((): Challenge => {
        const {imgUrl, question} = nextChallengeDoc.data();
        return {
          imgUrl,
          question
        };
      })()

    response.send(responseToSend);
  }
 });
