let db = {};

export async function POST(req) {
  const body = await req.json();

  const id = Date.now().toString();

  db[id] = body;

  return Response.json({
    id,
    url: `http://localhost:3001/report/${id}`,
  });
}
