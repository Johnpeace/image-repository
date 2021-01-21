import admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
});

export async function verifyToken(token) {
    return await admin.auth().verifyIdToken(token);
}