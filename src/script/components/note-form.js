class NoteForm extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  connectedCallback() {
    this.render();
    this._shadowRoot
      .querySelector("form")
      .addEventListener("submit", this.#onFormSubmit.bind(this));
  }

  disconnectedCallback() {
    this._shadowRoot
      .querySelector("form")
      .removeEventListener("submit", this.#onFormSubmit.bind(this));
  }

  #onFormSubmit(event) {
    // 1. Mencegah perilaku default form (reload halaman)
    event.preventDefault();

    // 2. Mengambil nilai dari input judul dan body
    const title = this._shadowRoot.querySelector("#title").value;
    const body = this._shadowRoot.querySelector("#body").value;

    // 3. Membuat Custom Event baru bernama 'note-added'
    const newNoteEvent = new CustomEvent("note-added", {
      detail: {
        title: title,
        body: body,
      },
      bubbles: true,
      composed: true,
    });

    // 4. Mengirimkan event tersebut dari elemen <note-form>
    this.dispatchEvent(newNoteEvent);

    // 5. Mengosongkan form setelah submit
    this._shadowRoot.querySelector("#title").value = "";
    this._shadowRoot.querySelector("#body").value = "";
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        padding: 1.5rem;
        background-color: white;
        margin-bottom: 2rem;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      h2 {
        margin: 0 0 1rem 0;
        color: #083261ff;
      }

      input, textarea {
        width: 100%;
        padding: 0.8rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-family: sans-serif;
        font-size: 1rem;
        box-sizing: border-box; /* Pastikan padding tidak menambah lebar */
      }

      input:focus, textarea:focus {
        outline: none;
        border-color: #083261ff;
      }

      button {
        padding: 0.8rem;
        background-color: #083261ff;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.2s;
        margin-bottom: 1rem;
      }

      button:hover {
        background-color: #0a4a91;
      }
    `;
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
          <button type="submit">Simpan Catatan</button>
        </form>
      </div>
    `;
  }
}

customElements.define("note-form", NoteForm);
