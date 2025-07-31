export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = await new Promise((resolve) => {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => resolve(JSON.parse(body)));
    });

    const HF_API_URL = "https://huggingface.co/spaces/cliffmckinn/KaRheon-Backend/proxy";

    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [message] })
    });

    const data = await response.json();
    const reply = data.data?.[0] || "No response.";

    res.status(200).json({ reply });
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
