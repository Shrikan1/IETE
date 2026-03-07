import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './config';

/**
 * Upload a file to Firebase Storage.
 * @param {File} file - The file object to upload.
 * @param {string} path - Storage path, e.g. "events/my-image.jpg"
 * @param {function} onProgress - Optional callback receiving 0-100 progress.
 * @returns {Promise<string>} Download URL of the uploaded file.
 */
export function uploadFile(file, path, onProgress) {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);
    const task = uploadBytesResumable(storageRef, file);

    task.on(
      'state_changed',
      (snap) => {
        if (onProgress) {
          onProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100));
        }
      },
      reject,
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        resolve(url);
      }
    );
  });
}

/**
 * Delete a file from Firebase Storage by its full gs:// or https URL.
 */
export async function deleteFile(url) {
  const fileRef = ref(storage, url);
  return deleteObject(fileRef);
}
