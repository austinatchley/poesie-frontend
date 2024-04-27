import { useActionData } from "@remix-run/react";
import { json, ActionFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.topic, "Missing topic param");

  const formData = await request.formData();

  const poem = await getPoem(formData.get("topic"));
  if (!poem) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ poem: poem });
};

function getPoem(topic: string): string {
  return `poem for topic: ${topic}`; // TODO: Integrate with backend API
}

export default function Submit() {
  const { poem } = useActionData<typeof action>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <p>{poem}</p>
    </div>
  );
}
