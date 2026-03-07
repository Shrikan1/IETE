import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';

// ──── Generic helpers ────────────────────────────────────────────────────────

export async function getCollection(col) {
  const snap = await getDocs(query(collection(db, col), orderBy('createdAt', 'desc')));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getDocument(col, id) {
  const snap = await getDoc(doc(db, col, id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function addDocument(col, data) {
  return addDoc(collection(db, col), { ...data, createdAt: serverTimestamp() });
}

export async function setDocument(col, id, data) {
  return setDoc(doc(db, col, id), { ...data, updatedAt: serverTimestamp() }, { merge: true });
}

export async function updateDocument(col, id, data) {
  return updateDoc(doc(db, col, id), { ...data, updatedAt: serverTimestamp() });
}

export async function deleteDocument(col, id) {
  return deleteDoc(doc(db, col, id));
}

// ──── Collection-specific wrappers ───────────────────────────────────────────

// Events  { title, date, description, imageURL, registerLink }
export const getEvents = () => getCollection('events');
export const addEvent = (data) => addDocument('events', data);
export const updateEvent = (id, data) => updateDocument('events', id, data);
export const deleteEvent = (id) => deleteDocument('events', id);

// Department Achievements  { title, description, imageURL, videoURL, year }
export const getAchievements = () => getCollection('departmentAchievements');
export const addAchievement = (data) => addDocument('departmentAchievements', data);
export const updateAchievement = (id, data) => updateDocument('departmentAchievements', id, data);
export const deleteAchievement = (id) => deleteDocument('departmentAchievements', id);

// Event Gallery  { eventName, year, images[] }
export const getGallery = () => getCollection('gallery');
export const addGalleryEntry = (data) => addDocument('gallery', data);
export const updateGalleryEntry = (id, data) => updateDocument('gallery', id, data);
export const deleteGalleryEntry = (id) => deleteDocument('gallery', id);

// Team  { name, position, email, linkedin, photoURL }
export const getTeam = () => getCollection('team');
export const addTeamMember = (data) => addDocument('team', data);
export const updateTeamMember = (id, data) => updateDocument('team', id, data);
export const deleteTeamMember = (id) => deleteDocument('team', id);
