import notes from "../../data/notes.js";
import Utils from "../utils.js"; // Kita akan butuh Utils

const main = () => {
  const noteFormElement = document.querySelector("note-form");
  const noteListElement = document.querySelector("note-list");

  // Fungsi untuk merender semua catatan ke dalam <note-list>
  const renderNotes = () => {
    // 1. Kosongkan <note-list> terlebih dahulu
    Utils.emptyElement(noteListElement);

    // 2. Buat elemen <note-item> untuk setiap data catatan
    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement("note-item");
      noteItemElement.note = note; // Men-set properti 'note' pada note-item
      return noteItemElement;
    });

    // 3. Tambahkan semua elemen <note-item> ke dalam <note-list>
    noteListElement.append(...noteItemElements);
  };

  const onNoteAdded = (event) => {
    const { title, body } = event.detail;

    const newNote = {
      id: `notes-${Date.now()}`,
      title: title,
      body: body,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    notes.push(newNote);

    // 4. Panggil renderNotes() lagi untuk memperbarui tampilan
    renderNotes();
  };

  noteFormElement.addEventListener("note-added", onNoteAdded);

  // 5. Panggil renderNotes() saat aplikasi pertama kali dimuat
  renderNotes();
};

export default main;
