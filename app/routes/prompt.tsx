import { Form, useActionData } from "@remix-run/react";
import { json, ActionFunctionArgs } from "@remix-run/node";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const topic = formData.get("topic")?.toString();
  if (!topic) {
    throw new Response("Not Found", { status: 404 });
  }

  const poem = await getPoem(topic);
  if (!poem) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ poem: poem });
};

function getPoem(topic: string): string {
  return `poem for topic: ${topic}`; // TODO: Integrate with backend API
}

export default function PromptPage() {
  const actionData = useActionData<typeof action>();
  const poem = actionData?.poem;

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>poesie</h1>

      <div>
        {poem ? (
          <div>{poem}</div>
        ) : (
          <div>Enter a topic to generate a poem for</div>
        )}

        <Form action="/prompt" method="POST">
          <input
            name="topic"
            type="text"
            defaultValue="sakura grove"
            aria-label="Topic"
            placeholder="sakura grove"
          />
        </Form>
      </div>
    </div>
  );
}
