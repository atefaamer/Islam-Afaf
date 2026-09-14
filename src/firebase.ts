import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// ---------------------------------------------------------------------------
// Replace these with your own Firebase project's config values.
// See README.md -> "ربط Firebase" for step-by-step instructions.
// ---------------------------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyAqY-Pj36Me4jiIl7h9K8YPFHw763elHHA",
  authDomain: "wedding-ba4ce.firebaseapp.com",
  projectId: "wedding-ba4ce",
  storageBucket: "wedding-ba4ce.firebasestorage.app",
  messagingSenderId: "800376724628",
  appId: "1:800376724628:web:7cb43064faf3aab1916881",
  measurementId: "G-QGQEEB64YT"
};

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)

/**
 * Ensures the visitor has an anonymous auth session before they can
 * write to Firestore (required by the security rules in firestore.rules).
 * Skipped if someone is already signed in (e.g. the groom, see below).
 */
export function ensureAnonymousAuth(): Promise<User> {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe()
        if (user) {
          resolve(user)
        } else {
          signInAnonymously(auth)
            .then((cred) => resolve(cred.user))
            .catch(reject)
        }
      },
      reject
    )
  })
}

/**
 * Real sign-in for the groom only, using a normal Firebase email/password
 * account (separate from the anonymous accounts every guest gets). This is
 * what lets Firestore's security rules tell "the groom" apart from "a guest"
 * — see firestore.rules, which checks request.auth.token.email.
 */
export function signInGroom(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password)
}

export function signOutGroom() {
  return signOut(auth)
}
