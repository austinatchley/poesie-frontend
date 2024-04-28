import { Form, useActionData } from "@remix-run/react";
import { json, ActionFunctionArgs } from "@remix-run/node";
import GeneratedPoem from "~/components/generated_poem";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const topic = formData.get("topic")?.toString();
  if (!topic) {
    console.error(`Could not get topic from formData=${formData}`);
    return json({
      error: `Failed to generate a poem on the topic of "${topic}". Please try again`,
    });
  }

  const poemResponse = await getPoemResponse(topic);
  if (!poemResponse) {
    console.error(`Could not get poem for topic=${topic}`);
    return json({
      error: `Failed to generate a poem on the topic of "${topic}". Please try again`,
    });
  }

  return json({ title: poemResponse.title, haiku: poemResponse.haiku, prose: poemResponse.prose });
};

async function getPoemResponse(topic: string): Promise<any> {
  const encodedTopic = encodeURIComponent(topic); // Sanitizes and encodes the user input to be included as a URL param
  const url = new URL(`http://localhost:8080/generate/text?topic=${encodedTopic}`);

  const response = await fetch(url);
  const responseJson = await response.json();
  console.log(responseJson);

  return responseJson;
}

export default function PromptPage() {
  const actionData = useActionData<typeof action>();
  if (actionData && "error" in actionData) {
    throw new Error(actionData.error);
  }

  const generatedTitle = actionData?.title;
  const generatedHaiku = actionData?.haiku;
  const generatedProse = actionData?.prose;


  return (
    <div className="prompt-page-container">
      <header className="nav-bar-container">
        <div className="title-bar">
          <div className="logo-container">
            <img src="sakura.jpg" alt="A sakura tree" className="sakura" />
          </div>
          <div className="title">
            <h1>poesie</h1>
          </div>
        </div>
      </header>

      <div className="prompt-container">
        {actionData ?
          <GeneratedPoem title={generatedTitle} haiku={generatedHaiku} prose={generatedProse} /> :
          <p>Enter a topic to generate a poem</p>}

        <Form className="prompt-form" action="/prompt" method="POST">
          <input
            className="prompt-input"
            name="topic"
            type="text"
            defaultValue=""
            aria-label="Topic"
            placeholder="Type a topic for your generated poem..."
          />

          <button type="submit" className="prompt-button">Submit</button>
        </Form>
      </div>
    </div>
  );
}
