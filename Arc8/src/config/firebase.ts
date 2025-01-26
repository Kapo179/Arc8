import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Persistence is currently memory-only. To enable persistent auth state,
// we need to properly configure AsyncStorage with Firebase Auth.
// See: https://firebase.google.com/docs/auth/web/persistence

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth; 