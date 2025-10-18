class FootNote extends HTMLElement {
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
        background-color: #083261ff;
        color: white;
        width: 100%;
        margin-top: 2rem;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 100;
      }

      div {
        max-width: 1200px;
        margin: 0 auto;
        padding: 1.5rem;
        text-align: center;
      }

      p {
        margin: 0;
        font-size: 0.9rem;
        font-weight: 300; /* Teks dibuat lebih ringan */
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
    const currentYear = new Date().getFullYear();

    this._shadowRoot.innerHTML += `      
      <div>
        <p>&copy; ${currentYear} - Harahman Abd Arib</p>
      </div>
    `;
  }
}

customElements.define("foot-note", FootNote);
