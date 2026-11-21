export function Terms() {
  return (
    <>
      <p>Last updated · January 1, 2026</p>
      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By downloading, installing, or using Oscillinx ("the Software"), you
          agree to be bound by these Terms. If you do not agree, do not use the
          Software.
        </p>
      </section>

      <section>
        <h2>2. Permitted Use</h2>
        <p>
          You are granted a revocable, non-exclusive, non-transferable, limited
          license to download, install, and use the Software strictly in
          accordance with these Terms.
        </p>
        <ul>
          <li>You may use the Software for personal or commercial purposes.</li>
          <li>You are responsible for the content you generate.</li>
          <li>
            You must comply with the licenses of any third-party models (e.g.,
            Llama 3 Community License) you load into the Software.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Restrictions</h2>
        <p>You agree not to, and you will not permit others to:</p>
        <ul>
          <li>Reverse engineer, decompile, or disassemble the Software.</li>
          <li>
            Use the Software to generate illegal content or content that
            promotes harm.
          </li>
          <li>Redistribute the binary without explicit permission.</li>
        </ul>
      </section>

      <section>
        <h2>4. Disclaimer of Warranties</h2>
        <p>
          The Software is provided "AS IS", without warranty of any kind. The
          output of Large Language Models (LLMs) can be unpredictable and
          inaccurate. Oscillinx Inc. is not responsible for any actions taken
          based on generated output.
        </p>
      </section>

      <section>
        <p>Oscillinx Inc. // San Francisco, CA</p>
      </section>
    </>
  );
}
export function Privacy() {
  return (
    <>
      <p>Effective date · January 1, 2026</p>
      <p className="intro">
        Offline and online modes have different data flows. Using an online
        provider sends your prompt to that provider.
      </p>
      <section>
        <h2>1. The Zero-Data Philosophy</h2>
        <p>
          Oscillinx is architected on a fundamental premise:{" "}
          <strong>We do not want your data.</strong> Our software runs entirely
          on your local hardware ("Edge Intelligence"). Once the application
          binary and model weights are downloaded to your device, no data leaves
          your machine.
        </p>
      </section>

      <section>
        <h2>2. Local Inference</h2>
        <p>
          All processing, token generation, and context embedding input occurs
          in your local RAM/VRAM. We do not maintain servers to process your
          prompts. There is no "cloud" component to our inference engine.
        </p>
      </section>

      <section>
        <h2>3. Telemetry & Analytics</h2>
        <p>
          Oscillinx contains <strong>zero analytics trackers</strong>. We do not
          track:
        </p>
        <ul>
          <li>IP Addresses</li>
          <li>Device Identifiers</li>
          <li>Usage Patterns</li>
          <li>Prompt Contents</li>
        </ul>
        <p>
          The only network requests the application makes are to check for
          software updates (which can be disabled) and to download models
          explicitly selected by you.
        </p>
      </section>

      <section>
        <h2>4. Model Weights</h2>
        <p>
          Models downloaded through our library are cryptographically signed to
          ensure integrity. We do not modify models to include surveillance
          capabilities.
        </p>
      </section>

      <section>
        <p>
          Contact:{" "}
          <a href="mailto:official.oscillinx@gmail.com">
            official.oscillinx@gmail.com
          </a>
        </p>
      </section>
    </>
  );
}
