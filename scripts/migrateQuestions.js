var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert('./junction2019-41c43-firebase-adminsdk-24y80-12084536a6.json'),
  databaseURL: "https://junction2019.firebaseio.com"
});

const data = require("./upbeat-data.json");
// const collectionKey = "challenges"; //name of the collection

const firestore = admin.firestore();

if (data && (typeof data === "object")) {
  data.forEach(doc => {
    console.log(doc);
     firestore.collection('gettingToNo/general/challenges')
     .add({
       question: doc.fields.challenge_text,
       imgUrl: doc.fields.image_url,
       title: doc.fields.short_text
     }).then((res) => {
        console.log("Finished: " + doc);
    }).catch((error) => {
       console.error("Error writing document: ", error);
    });
  console.log();
});
}