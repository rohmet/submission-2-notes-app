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

const createNote = async (title, body) => {
  const response = await fetch(`${BASE_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    throw new Error(responseJson.message);
  }

  // Kembalikan data catatan baru yang dibuat
  return responseJson.data;
};

const deleteNote = async (noteId) => {
  const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
    method: "DELETE",
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    throw new Error(responseJson.message);
  }

  // Jika berhasil, kembalikan pesan sukses
  return responseJson.message;
};

export { getNotes, createNote, deleteNote };
