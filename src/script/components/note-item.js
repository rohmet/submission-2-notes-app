class NoteItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _note = {
    id: null,
    title: null,
    body: null,
  };

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  // Method ini akan dipanggil ketika properti 'note' di-set
  set note(value) {
    this._note = value;
    this.render();
  }

  get note() {
    return this._note;
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        background-color: #ffffff;
        overflow: hidden;
      }

      .note-card {
        padding: 1.5rem;
      }

      .note-card__title {
        font-weight: bold;
        font-size: 1.2em;
        margin-top: 0;
        margin-bottom: 0.5rem;
        color: #083261ff;
      }

      .note-card__body {
        font-size: 1em;
        margin-top: 0;
        color: #333;
      }

      .delete-button {
        padding: 0.5rem 1rem;
        background-color: #dc3545;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9em;
        margin-top: 1rem;
        transition: background-color 0.2s;
      }

      .delete-button:hover {
        background-color: #c82333;
      }
    `;
  }

  render() {
    this._shadowRoot.innerHTML = "";
    this._updateStyle();
    this._shadowRoot.appendChild(this._style);

    this._shadowRoot.innerHTML += `
      <div class="note-card">
        <h3 class="note-card__title">${this._note.title}</h3>
        <p class="note-card__body">${this._note.body}</p>

        <button type="button" class="delete-button">Hapus</button>
      </div>
    `;

    this._shadowRoot
      .querySelector(".delete-button")
      .addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("note-deleted", {
            detail: { noteId: this._note.id },
            bubbles: true,
            composed: true,
          })
        );
      });
  }
}

customElements.define("note-item", NoteItem);
