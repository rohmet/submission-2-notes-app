class AppBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
        :host {
        display: block;
        width: 100%;
        background-color: #083261ff;
        color: white;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        /* Properti 'margin-bottom' sebaiknya diatur oleh parent-nya,
          tapi kita bisa tambahkan di sini agar sesuai dengan desain Anda.
        */
        margin-bottom: 2rem;
      }

      div {
        padding: 1rem 0;
        text-align: center;
      }

      h1 {
        margin: 0;
        font-size: 1.7em; /* Disesuaikan agar mirip dengan header global */
      }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `      
      <div>
        <h1>Notes App</h1>
      </div>
    `;
  }
}

customElements.define("app-bar", AppBar);
