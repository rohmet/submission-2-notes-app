class NoteForm extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
      /* CSS untuk form akan kita tulis di sini */
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = "";
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div>
        <h2>Buat Catatan Baru</h2>
        <form>
          <input type="text" id="title" placeholder="Judul Catatan..." required>
          <textarea id="body" rows="5" placeholder="Isi catatanmu di sini..." required></textarea>
          <button type="submit">Simpan</button>
        </form>
      </div>
    `;
  }
}

customElements.define("note-form", NoteForm);
