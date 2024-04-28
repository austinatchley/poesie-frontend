import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "poesie" },
    { name: "description", content: "welcome to poesie" },
  ];
};

export default function Index() {
  return (
    <div>
      <h1>poesie</h1>
      <ul>
        <li>
          <a href="/prompt">Generate a poem</a>
        </li>
        <br></br>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
