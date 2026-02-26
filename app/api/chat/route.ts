export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // 使用 OpenRouter 的标准调用方式
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemini-2.0-flash-001",
        "messages": [
          { "role": "user", "content": message }
        ]
      })
    });

    const data = await response.json();
    
    // 检查 OpenRouter 是否返回了错误
    if (data.error) {
      return Response.json({ text: `OpenRouter报错: ${data.error.message}` }, { status: 500 });
    }

    return Response.json({ text: data.choices[0].message.content });
  } catch (e) {
    return Response.json({ text: "网络连接失败，请检查配置" }, { status: 500 });
  }
}
