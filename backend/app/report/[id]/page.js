async function getData(id) {
  const res = await fetch(`http://localhost:3001/api/report/${id}`);
  return res.json();
}

function generateSteps(logs) {
  let steps = [];

  logs.forEach((l) => {
    if (l.type === "click") {
      steps.push(`Clicked ${l.text}`);
    }

    if (l.type === "network" && l.status >= 400) {
      steps.push(`API failed ${l.url}`);
    }

    if (l.type === "console") {
      steps.push(`Error: ${l.message}`);
    }
  });

  return steps;
}

export default async function Page({ params }) {
  const data = await getData(params.id);

  if (data.error) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Bug Report</h2>
        <p>{data.error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Bug Report</h2>

      <img src={data.screenshot} width="400" alt="Screenshot" />

      <pre>{JSON.stringify(data.logs, null, 2)}</pre>

      <h3>Steps</h3>
      <ul>
        {generateSteps(data.logs).map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>
  );
}
