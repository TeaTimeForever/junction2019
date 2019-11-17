import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
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
        question: `Congrats - You've finished all the challenges in this training. Choose the next training in the app`,
        id: 'congrats'
      } :
      ((): Challenge => {
        const {imgUrl, question} = nextChallengeDoc.data();
        return {
          imgUrl,
          question,
          id: nextChallengeDoc.id
        };
      })();

    response.send(responseToSend);

    // Add this challenge to the list of users challenges that the has seen/started
    if (typeof nextChallengeDoc !== 'undefined') {
      await db.doc(`users/${uid}/challenges/${nextChallengeDoc.id}`).set({
        status: 'offered',
      } as UserChallenge);
    }
  }
});

export const buttonPressed = functions.https.onRequest(async (request, response) => {
  const uid = '17';
  const challengeId = request.query.challengeId;
  const btnId = request.query.button;

  const challengeDoc = db.doc(`users/${uid}/challenges/${challengeId}`);

  if (btnId === '2') {
    // Accepted | Done
    // First get the status of the task
    const doc = await challengeDoc.get();
    const data = doc.data() as UserChallenge;

    if (data.status === 'offered') {
      // Accept
      await challengeDoc.update({
        status: 'accepted',
        started_at: admin.firestore.FieldValue.serverTimestamp()
      } as UserChallenge);
    } else if (data.status === 'accepted') {
      // DONE!
      await challengeDoc.update({
        status: 'done',
        finished_at: admin.firestore.FieldValue.serverTimestamp()
      } as UserChallenge);
    }
  } else if (btnId === '1') {
    // Rejected
    await challengeDoc.update({
      status: 'rejected'
    });
  }
});
