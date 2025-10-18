// Hapus import yang tidak perlu seperti 'notes', 'saveData', 'Utils'
import { getNotes, createNote } from "../notes-api.js";

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

  // Fungsi untuk merender catatan
  const renderNotes = (notes) => {
    // Kosongkan note-list dari elemen sebelumnya
    noteListElement.innerHTML = "";

    // Jika tidak ada catatan, tampilkan pesan
    if (notes.length === 0) {
      noteListElement.innerHTML = "<p>Tidak ada catatan untuk ditampilkan.</p>";
      return;
    }

    // Buat elemen <note-item> untuk setiap catatan
    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement("note-item");
      noteItemElement.note = note;
      return noteItemElement;
    });

    noteListElement.append(...noteItemElements);
  };

  // Fungsi untuk mengambil dan menampilkan catatan dari API
  const showNotes = async () => {
    showLoading();
    try {
      // Panggil fungsi getNotes dari notes-api.js
      const notes = await getNotes();
      renderNotes(notes);
    } catch (error) {
      // Tampilkan pesan error jika fetch gagal
      noteListElement.innerHTML = `<p>Gagal memuat catatan: ${error.message}</p>`;
    } finally {
      hideLoading();
    }
  };

  // 3. Buat fungsi handler untuk 'note-added'
  const onNoteAdded = async (event) => {
    const { title, body } = event.detail;

    // Tampilkan loading saat mengirim data
    showLoading();
    try {
      // Kirim catatan baru ke API
      await createNote(title, body);

      // Jika berhasil, panggil showNotes() untuk me-refresh daftar
      showNotes();
    } catch (error) {
      // Tampilkan error jika gagal
      alert(`Gagal menambahkan catatan: ${error.message}`);
    } finally {
      // Sembunyikan loading baik berhasil maupun gagal
      // (showNotes() sudah punya hideLoading, tapi ini untuk jaga-jaga jika showNotes gagal)
      hideLoading();
    }
  };

  // 4. Tambahkan event listener kembali
  noteFormElement.addEventListener("note-added", onNoteAdded);

  // Panggil showNotes saat halaman pertama kali dimuat
  showNotes();

  // Kita akan menangani form submission di langkah berikutnya
  // Untuk sementara, kita bisa beri komentar atau hapus kode event listener form
  // const noteFormElement = document.querySelector('note-form');
  // noteFormElement.addEventListener('note-added', onNoteAdded);
};

export default main;
