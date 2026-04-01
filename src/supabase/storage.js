import { supabase } from './client';

/**
 * Upload a file to Supabase Storage.
 * @param {File} file - The file object to upload.
 * @param {string} path - Storage path, e.g. "events/my-image.jpg"
 * @param {function} onProgress - Supabase doesn't support progress in simple upload, but we'll adapt the API.
 * @returns {Promise<string>} Public URL of the uploaded file.
 */
export async function uploadFile(file, path, onProgress) {
  // Supabase storage needs a bucket name as the first part of the path
  const parts = path.split('/');
  const bucket = parts[0];
  const filePath = parts.slice(1).join('/');

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, { cacheControl: '3600', upsert: true });

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return publicUrl;
}

/**
 * Delete a file from Supabase Storage.
 */
export async function deleteFile(url) {
  // Extract bucket and path from URL
  // Example: https://...supabase.co/storage/v1/object/public/bucket/path/to/file.jpg
  try {
    const urlObj = new URL(url);
    const parts = urlObj.pathname.split('/object/public/')[1].split('/');
    const bucket = parts[0];
    const filePath = parts.slice(1).join('/');
    
    const { error } = await supabase.storage.from(bucket).remove([filePath]);
    if (error) throw error;
  } catch (err) {
    console.error("Error deleting file from Supabase:", err);
  }
}
