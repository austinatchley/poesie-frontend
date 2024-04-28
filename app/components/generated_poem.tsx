
interface GeneratedPoemProps {
    title: string;
    haiku: string;
    prose: string;
}

export default function GeneratedPoem({ title, haiku, prose }: GeneratedPoemProps) {
    return (<div>
        <h2>{title}</h2>
        <br></br>
        <p>{haiku}</p>
        <br></br>
        <p>{prose}</p>
        </div>);
}