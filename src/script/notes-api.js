// src/script/notes-api.js

const BASE_URL = "https://notes-api.dicoding.dev/v2";

const getNotes = async () => {
  const response = await fetch(`${BASE_URL}/notes`);
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    throw new Error(responseJson.message);
  }

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

  return responseJson.message;
};

export { getNotes, createNote, deleteNote };
