
interface GeneratedPoemProps {
    title: string;
    haiku: string;
    prose: string;
}

export default function GeneratedPoem({ title, haiku, prose }: GeneratedPoemProps) {
    return (<div className="generated-poem-container">
        <div className="poem-title"><h2>{title}</h2></div>
        <br></br>
        <pre className="poem-text">
            <code><div className="haiku">{haiku}</div></code>
        </pre>

        <br></br>
        <div className="prose"><p>{prose}</p></div>
    </div>);
}