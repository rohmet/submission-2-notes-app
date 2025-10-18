// src/script/notes-api.js

const BASE_URL = "https://notes-api.dicoding.dev/v2";

const getNotes = async () => {
  const response = await fetch(`${BASE_URL}/notes`);
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    // Jika status tidak success, lempar error
    throw new Error(responseJson.message);
  }

  // Jika berhasil, kembalikan data notes
  return responseJson.data;
};

// Ekspor fungsi agar bisa digunakan di file lain
export { getNotes };
