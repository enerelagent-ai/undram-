const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId
);

let firebaseClientPromise;

// Firebase is optional and intentionally lazy-loaded so its SDK is not part of
// the storefront's initial execution path when static catalog data is enough.
export function getFirebaseClient() {
  if (!isFirebaseConfigured) return Promise.resolve(null);

  if (!firebaseClientPromise) {
    firebaseClientPromise = Promise.all([
      import("firebase/app"),
      import("firebase/firestore"),
    ]).then(([appModule, firestoreModule]) => {
      const app = appModule.getApps().length
        ? appModule.getApp()
        : appModule.initializeApp(firebaseConfig);

      return {
        db: firestoreModule.getFirestore(app),
        ...firestoreModule,
      };
    });
  }

  return firebaseClientPromise;
}
