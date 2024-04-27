import { Form } from "@remix-run/react";

export default function PromptPage() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>poesie</h1>
      <Form action="/submit" method="POST">
        <input
          name="topic"
          type="text"
          defaultValue="sakura grove"
          aria-label="Topic"
          placeholder="sakura grove"
        />
      </Form>
    </div>
  );
}
