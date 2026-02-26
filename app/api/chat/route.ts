import { GoogleGenerativeAI } from "@google/generative-ai";
export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(message);
    return Response.json({ text: result.response.text() });
  } catch (e) {
    return Response.json({ text: "出错了，请检查 API Key" }, { status: 500 });
  }
}
