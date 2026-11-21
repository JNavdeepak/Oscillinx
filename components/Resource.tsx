import Command from "./Command";
import { Terms, Privacy } from "./Policies";
import models from "./models.json";
const titles: Record<string, string> = {
  docs: "Getting started",
  models: "Model library",
  cli: "Command line",
  privacy: "Privacy policy",
  terms: "Terms of use",
};
export default function Resource({ slug }: { slug: string }) {
  return (
    <main id="content" className="wrap section doc">
      <a className="label" href="/#resources">
        OSCILLINX /{" "}
        {["terms", "privacy"].includes(slug) ? "Legal" : "Resources"}
      </a>
      <h1>{titles[slug]}</h1>
      {slug === "docs" && (
        <>
          <p className="intro">
            Set up your device, load a model, and try a conversation with the
            network disconnected.
          </p>
          <section>
            <h2>Desktop setup</h2>
            <p>
              Get the Windows installer from <a href="/#downloads">Downloads</a>
              . Install and start Ollama, then download a model compatible with
              your hardware. Start Oscillinx and select the matching local
              model. Visit the <a href="/cli/">command line guide</a> for
              runtime checks.
            </p>
          </section>
          <section>
            <h2>Mobile setup</h2>
            <p>
              Install the Android app, open its model library, and choose a GGUF
              model that fits your available storage and memory. Finish
              downloading the file, load it, and select offline mode before
              disconnecting.
            </p>
          </section>
          <section>
            <h2>Try your first prompt</h2>
            <p>
              Ask “Give me three ideas for a weekend project.” If the model
              fails to load, free up memory or choose a smaller file. For an
              on-device session, keep offline mode selected.
            </p>
          </section>
        </>
      )}
      {slug === "models" && (
        <>
          <p className="intro">
            These GGUF files come from the mobile app’s catalog. File sizes
            describe storage. Loading a model also needs working memory for the
            weights and conversation context.
          </p>
          {models.map((m) => (
            <div key={m.name} className="model-row">
              <div>
                <b>{m.name}</b>
                <span>GGUF · Q4_K_M · {m.size}</span>
              </div>
              <a href={m.url}>Download model</a>
            </div>
          ))}
        </>
      )}
      {slug === "cli" && (
        <>
          <p className="intro">
            The desktop app connects to Ollama on your machine. With Ollama
            installed, run these commands in a terminal.
          </p>
          {[
            [
              "Start the runtime",
              "Start the local service if it is not already running.",
              "ollama serve",
            ],
            [
              "Inspect local models",
              "List the models already stored on your computer.",
              "ollama list",
            ],
            [
              "See loaded models",
              "Check which models are currently loaded in memory.",
              "ollama ps",
            ],
          ].map(([title, body, cmd]) => (
            <section key={cmd}>
              <h2>{title}</h2>
              <p>{body}</p>
              <Command text={cmd} />
            </section>
          ))}
        </>
      )}
      {slug === "terms" && <Terms />}
      {slug === "privacy" && <Privacy />}
    </main>
  );
}
