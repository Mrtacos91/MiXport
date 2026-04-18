const BASE_PATH = "/api/storage";
const STORAGE_URL =
  process.env.NEXT_PUBLIC_STORAGE_URL || "http://localhost:3001";

export const storageService = {
  getUploadUrl: async (fileName: string, contentType: string) => {
    const response = await fetch(`${STORAGE_URL}${BASE_PATH}/presigned-url`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName, contentType }),
    });
    return response.json() as Promise<{ url: string; key: string }>;
  },

  getFileUrl: (key: string) => `${STORAGE_URL}${BASE_PATH}/files/${key}`,
};
