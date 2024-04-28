import { Form, useActionData } from "@remix-run/react";
import { json, ActionFunctionArgs } from "@remix-run/node";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const topic = formData.get("topic")?.toString();
  if (!topic) {
    console.error(`Could not get topic from formData=${formData}`);
    return json({ poem: "Poem failed to generate. Please try again" });
  }

  const poem = await getPoem(topic);
  if (!poem) {
    console.error(`Could not get poem for topic=${topic}`);
    return json({ poem: "Poem failed to generate. Please try again" });
  }

  return json({ poem: poem });
};

async function getPoem(topic: string): Promise<string> {
  const encodedTopic = encodeURIComponent(topic); // Sanitizes and encodes the user input to be included as a URL param
  const url = new URL(`http://localhost:8080/generate?topic=${encodedTopic}`);

  const response = await fetch(url);
  const responseJson = await response.json();

  return responseJson["poem"] ?? null;
}

export default function PromptPage() {
  const actionData = useActionData<typeof action>();
  const poem = actionData?.poem;

  return (
    <div className="prompt-page">
      <h1>poesie</h1>

      <img src="sakura.jpg" alt="A sakura tree" />

      <div className="prompt-container">
        <div className="poem">
          {poem ? <p>{poem}</p> : <p>Enter a topic to generate a poem</p>}
        </div>

        <Form className="prompt-form" action="/prompt" method="POST">
          <input
            className="prompt-input"
            name="topic"
            type="text"
            defaultValue=""
            aria-label="Topic"
            placeholder="Type a topic for your generated poem..."
          />
        </Form>
      </div>
    </div>
  );
}
