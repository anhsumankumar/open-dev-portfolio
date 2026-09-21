import { supabase } from "../lib/supabase";

export const storageService = {
  async uploadImage(file, path) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('project-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  },

  async deleteImage(url) {
    // Extract the path from the URL
    if (!url) return;
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/project-images/');
      if (pathParts.length > 1) {
        const filePath = pathParts[1];
        const { error } = await supabase.storage
          .from('project-images')
          .remove([filePath]);
        if (error) console.error("Error deleting image:", error);
      }
    } catch (e) {
      console.error("Invalid URL format for deletion", e);
    }
  }
};
