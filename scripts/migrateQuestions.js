var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert('./junction2019-41c43-firebase-adminsdk-24y80-12084536a6.json'),
  databaseURL: "https://junction2019.firebaseio.com"
});

const data = require("./upbeat-data.json");
const collectionKey = "challenges"; //name of the collection

const firestore = admin.firestore();

if (data && (typeof data === "object")) {
  data.forEach(doc => {
    if(doc.fields.object_repr) {
       firestore.collection('gettingToNo/general/challenges')
       .add({
         question: doc.fields.object_repr,
         imgUrl: 'https://d3ursa3zzwkanm.cloudfront.net/assets/custom_domains/procter_gamble/pg_challenge_step_5-4d8cc984e7cd82bc87c0b0767437cc290e87b3d617f2c8d2ff0edd79f1947e25.png'
       }).then((res) => {
          console.log("Finished: " + doc.fields.object_repr);
      }).catch((error) => {
         console.error("Error writing document: ", error);
      });
    }
  console.log();
});
}