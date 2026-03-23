let db = global.db || (global.db = {});

export async function GET(req, { params }) {
  const data = db[params.id];

  if (!data) {
    return Response.json({ error: "Not found" });
  }

  return Response.json(data);
}
