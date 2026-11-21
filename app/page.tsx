import Instrument from "../components/Instrument";
import Architecture from "../components/Architecture";
import { Icon } from "../components/Frame";
import { windows } from "../components/Release";
import AndroidDownload from "../components/AndroidDownload";
function Label({ children }: { children: React.ReactNode }) {
  return <div className="label">{children}</div>;
}
export default function Home() {
  return (
    <main id="content">
      <section id="overview" className="hero wrap">
        <div className="hero-copy">
          <Label>Offline-first artificial intelligence</Label>
          <h1>
            Intelligence <br />
            beyond
            <br />
            <em>connectivity.</em>
          </h1>
          <p>
            Run language models on your own hardware. A private workspace for
            thinking, writing, and building offline.
          </p>
          <div className="actions">
            <a className="btn" href="#downloads">
              <Icon kind="down" />
              Get Oscillinx
            </a>
            <a className="btn ghost" href="#architecture">
              Explore architecture
            </a>
          </div>
        </div>
        <Instrument />
      </section>
      <div className="rail">
        <div className="wrap rail-inner">
          <span className="tech">RUNTIME STACK</span>
          <b>llama.cpp</b>
          <b>llama.rn</b>
          <b>GGUF</b>
          <b>React Native</b>
          <b>TypeScript</b>
        </div>
      </div>
      <section className="wrap section" id="features">
        <Label>System capabilities</Label>
        <h2>
          Intelligence without
          <br />
          the <em>dependency.</em>
        </h2>
        <div className="bento">
          <article className="feature primary-feature">
            <div className="circuit" aria-hidden="true">
              <i />
              <i />
              <i />
              <b>LOCAL</b>
            </div>
            <div>
              <h3>True offline architecture</h3>
              <p>
                Download a compatible model once. Keep writing, exploring, and
                generating when the connection drops.
              </p>
            </div>
          </article>
          <article className="feature">
            <div className="mini-symbol" aria-hidden="true">⌘</div>
            <h3>Local processing</h3>
            <p>
              In offline mode, the runtime processes prompts on your device. You
              choose when to use online services.
            </p>
          </article>
          <article className="feature">
            <div className="mini-symbol" aria-hidden="true">≋</div>
            <h3>Choose your model</h3>
            <p>
              Match model size and quantization to your device’s memory
              and the work at hand.
            </p>
            <a className="text-link" href="/models/">
              Browse model library
            </a>
          </article>
        </div>
      </section>
      <section className="band" id="architecture">
        <div className="wrap section">
          <Label>Architecture</Label>
          <h2>
            From prompt to reply.
            <br />
            <em>Locally.</em>
          </h2>
          <Architecture />
        </div>
      </section>
      <section className="wrap section product" id="desktop">
        <div>
          <Label>Desktop environment</Label>
          <h2>
            Your local AI
            <br />
            <em>command center.</em>
          </h2>
          <p>
            Organize conversations, switch models, and work with a local Ollama
            runtime from a dedicated desktop interface.
          </p>
          <a className="btn ghost" href="#downloads">
            Desktop download
          </a>
        </div>
        <figure className="screen">
          <img
            loading="lazy"
            src="/assets/desktop.png"
            width="1024"
            height="565"
            alt="OSCILLINX desktop app with chat history, model selector, and message composer"
          />
          <figcaption className="tech">OSCILLINX DESKTOP</figcaption>
        </figure>
      </section>
      <section className="band" id="mobile">
        <div className="wrap section product mobile-product">
          <div className="phone-stage">
            <div
              className="phone"
              aria-label="Illustrative mobile chat preview"
            >
              <div className="ear" />
              <span className="tech">OFFLINE MODE</span>
              <strong>OSCILLINX</strong>
              <div className="bubble">Can I use this on a flight?</div>
              <p>
                Yes. Load your model before boarding and keep working in
                airplane mode.
              </p>
              <div className="phone-foot">Ask anything…</div>
            </div>
          </div>
          <div>
            <Label>Mobile environment</Label>
            <h2>
              Intelligence
              <br />
              <em>anywhere.</em>
            </h2>
            <p>
              Bring a compatible GGUF model onto your phone. The mobile runtime
              uses llama.rn and llama.cpp to generate responses locally.
            </p>
            <a className="btn ghost" href="#downloads">
              Mobile download
            </a>
          </div>
        </div>
      </section>
      <section className="wrap section" id="resources">
        <Label>Resources</Label>
        <h2>
          Inside the <em>runtime.</em>
        </h2>
        <div className="resources">
          {[
            [
              "/docs/",
              "Getting started",
              "Install the app and prepare your first offline session.",
            ],
            [
              "/models/",
              "Model library",
              "Explore model files, sizes, and memory considerations.",
            ],
            [
              "/cli/",
              "Command line",
              "Work with the desktop runtime from your terminal.",
            ],
          ].map(([url, title, desc]) => (
            <a href={url} key={url}>
              <strong>{title}</strong>
              <span>{desc}</span>
            </a>
          ))}
        </div>
      </section>
      <section id="downloads" className="download-band">
        <div className="wrap download">
          <div>
            <Label>Downloads</Label>
            <h2>
              Go <em>local.</em>
            </h2>
          </div>
          <div className="downloads">
            <div className="download-item">
              <a className="btn" href={windows} download>
                <Icon kind="down" />
                Windows installer
              </a>
            </div>
            <AndroidDownload />
            <span className="tech">
              macOS and iOS downloads are unavailable.
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
