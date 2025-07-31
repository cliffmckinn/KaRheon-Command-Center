export default async function handler(req, res) { if (req.method === 'POST') {
const { message } = await new Promise((resolve) => { let body = '';
req.on('data', chunk => body += chunk); req.on('end', () => resolve(JSON.parse(body)));
});
const TOGETHER_API_KEY = "YOUR_TOGETHER_API_KEY_HERE";
const response = await fetch("https://api.together.xyz/inference", { method: "POST",
headers: {
"Authorization": `Bearer ${29518f3d26151500b0b22ca4198c16dd44feb619ba69c5610d250213f230c8d3}`,
"Content-Type": "application/json" },
body: JSON.stringify({
model: "mistralai/Mistral-7B-Instruct-v0.2", prompt: message,
max_tokens: 256,
temperature: 0.7,
}), });
const data = await response.json();
const reply = data.output?.choices?.[0]?.text || "No response.";
res.status(200).json({ reply }); } else {
res.status(405).send("Method Not Allowed"); }
}
