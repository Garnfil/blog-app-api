import express from 'express';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import serviceAccount from '../serviceAccountKey.json' assert { type: "json" };

const app = express();

const firebase = initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();
const auth = getAuth();

auth.createUser({
    email: 'user@example.com',
    emailVerified: false,
    phoneNumber: '+11234567890',
    password: 'secretPassword',
    displayName: 'John Doe',
    photoURL: 'http://www.example.com/12345678/photo.png',
    disabled: false,
  })
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully created new user:', userRecord.uid);
  })
  .catch((error) => {
    console.log('Error creating new user:', error);
  });

const COLLECTION = "posts";

// const docRef = db.collection('users').doc().set({
//       first: 'Ada',
//       last: 'Lovelace',
//       born: 1815
//     });

// await docRef.set({
//   first: 'Ada',
//   last: 'Lovelace',
//   born: 1815
// });

app.listen(3000);
