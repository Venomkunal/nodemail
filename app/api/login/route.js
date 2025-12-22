export async function POST(req) {
  const { email, password } = await req.json();

  // SIMPLE CHECK (replace with DB later)
  if (
    email === "admin@shinewebtechcretions.online" &&
    password === "admin123"
  ) {
    return Response.json({ success: true });
  }

  return Response.json(
    { success: false },
    { status: 401 }
  );
}