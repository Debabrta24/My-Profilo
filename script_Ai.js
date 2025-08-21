const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

// Dynamic proxy: pass ?url=https://example.com
app.get("/proxy", async (req, res) => {
  try {
    const targetUrl = req.query.url;

    if (!targetUrl) {
      return res.status(400).send("❌ Please provide ?url=https://example.com");
    }

    // Fetch target site
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });

    if (!response.ok) {
      return res.status(response.status).send(`❌ Failed to fetch: ${response.statusText}`);
    }

    let html = await response.text();

    // Fix relative paths by injecting <base>
    html = html.replace(
      /<head>/i,
      `<head><base href="${targetUrl}">`
    );

    res.setHeader("Content-Type", "text/html");
    res.send(html);
  } catch (err) {
    console.error("Proxy Error:", err);
    res.status(500).send("⚠️ Error fetching site: " + err.message);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Proxy running at http://localhost:${PORT}`);
  console.log(`👉 Try: http://localhost:${PORT}/proxy?url=https://wikipedia.org`);
});
