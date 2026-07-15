import { supabase } from './supabase';

/**
 * Uploads an image file to Supabase Storage and returns the public URL.
 * 
 * @param file The File object to upload
 * @param bucketName The name of the Supabase bucket (defaults to 'images')
 * @returns The public URL of the uploaded image
 */
export async function uploadImage(file: File, bucketName: string = 'images'): Promise<string> {
  try {
    // 1. Generate a unique file name to avoid collisions
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    // 2. Upload the file to the specified bucket
    const { data, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      throw uploadError;
    }

    // 3. Get the public URL for the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}
