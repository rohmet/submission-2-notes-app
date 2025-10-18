import { getNotes, createNote, deleteNote } from "../notes-api.js";

const main = () => {
  const noteListElement = document.querySelector("note-list");
  const loadingIndicator = noteListElement.querySelector(".loading-indicator");

  const noteFormElement = document.querySelector("note-form");

  // Fungsi untuk menampilkan loading
  const showLoading = () => {
    loadingIndicator.style.display = "block";
  };

  // Fungsi untuk menyembunyikan loading
  const hideLoading = () => {
    loadingIndicator.style.display = "none";
  };

  // Fungsi Membersihkan list tanpa menghapus loader
  const clearNoteList = () => {
    const itemsToRemove = noteListElement.querySelectorAll("note-item, p");
    itemsToRemove.forEach((item) => item.remove());
  };

  // Fungsi untuk merender catatan
  const renderNotes = (notes) => {
    clearNoteList();

    if (notes.length === 0) {
      noteListElement.insertAdjacentHTML(
        "beforeend",
        "<p>Tidak ada catatan untuk ditampilkan.</p>"
      );
      return;
    }

    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement("note-item");
      noteItemElement.note = note;

      noteItemElement.addEventListener("note-deleted", onNoteDeleted);

      return noteItemElement;
    });

    noteListElement.append(...noteItemElements);
  };

  // Fungsi untuk mengambil dan menampilkan catatan dari API
  const showNotes = async () => {
    showLoading();
    try {
      const notes = await getNotes();
      renderNotes(notes);
    } catch (error) {
      clearNoteList();
      noteListElement.insertAdjacentHTML(
        "beforeend",
        `<p>Gagal memuat catatan: ${error.message}</p>`
      );
    } finally {
      hideLoading();
    }
  };

  // fungsi handler untuk 'note-added'
  const onNoteAdded = async (event) => {
    const { title, body } = event.detail;

    showLoading();
    try {
      await createNote(title, body);
      showNotes();

      showNotes();
    } catch (error) {
      alert(`Gagal menambahkan catatan: ${error.message}`);
    } finally {
      hideLoading();
    }
  };

  // fungsi handler untuk 'note-deleted'
  const onNoteDeleted = async (event) => {
    const { noteId } = event.detail;

    const isConfirmed = confirm(
      "Apakah Anda yakin ingin menghapus catatan ini?"
    );
    if (!isConfirmed) {
      return;
    }

    showLoading();
    try {
      await deleteNote(noteId);

      showNotes();
    } catch (error) {
      alert(`Gagal menghapus catatan: ${error.message}`);
    } finally {
      hideLoading();
    }
  };

  noteFormElement.addEventListener("note-added", onNoteAdded);
  showNotes();
};

export default main;
