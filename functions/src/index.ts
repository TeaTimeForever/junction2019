import * as functions from 'firebase-functions';
import * as  admin from 'firebase-admin';
import { UserChallenge } from './user';
import { DocumentData } from '@google-cloud/firestore';

admin.initializeApp();
const db = admin.firestore();

export const getChallenge = functions.https.onRequest(async (request, response) => {
  const uid = request.param('uid');
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Content-Type', 'application/json');

  const userSn = await db.doc(`users/${uid}`).get();
  if (!userSn.exists) {
    response.statusCode = 404;
    response.send();
  } else {
    const userChallengesSn = await db.collection(`users/${uid}/challenges`).get();

    const alreadyChanllenged: string[] = [];
    if (!userChallengesSn.empty) {
      userChallengesSn.docs.forEach(userChSn => {
        alreadyChanllenged.push(userChSn.id);
      });
    }

    let res: DocumentData | null = null;
    const allChallengesSn = (await db.collection(`gettingToNo/general/challenges`).get()).docs;
    allChallengesSn.forEach(async challengeSn => {
      if (!alreadyChanllenged.includes(challengeSn.id) && !res) {
        res = challengeSn.data();
        userSn.ref.set({activeChallenge: challengeSn.id});
      }
    });

    if (!res) {
      userChallengesSn.forEach(userChSn => {
        if (!res) {
          const userCh = userChSn.data() as UserChallenge;
          if (userCh.status === 'accepted') {
            console.log('not implemented yet')
          }
        }
      });
    }

    response.send(JSON.stringify(res));
  }
 });
