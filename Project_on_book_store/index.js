const axios = require("axios");
const fs = require("fs");

const TOKEN = "8252823839:AAHJ57P0HVsbV7h0nMBru0FCn3aOaKqU_zc";
const API_URL = `https://api.telegram.org/bot${TOKEN}`;

async function getFileLink(fileId) {
  try {
    const res = await axios.get(`${API_URL}/getFile?file_id=${fileId}`);
    if (res.data.ok) {
      const filePath = res.data.result.file_path;
      const rawUrl = `https://api.telegram.org/file/bot${TOKEN}/${filePath}`;

      // If PDF/DOC → wrap in Google Docs Viewer
      if (filePath.endsWith(".pdf") || filePath.endsWith(".doc") || filePath.endsWith(".docx")) {
        return `https://docs.google.com/viewer?url=${encodeURIComponent(rawUrl)}&embedded=true`;
      }

      // If image → return direct link
      if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg") || filePath.endsWith(".png")) {
        return rawUrl;
      }

      // Otherwise just return raw
      return rawUrl;
    }
  } catch (err) {
    console.error("Error fetching file link:", err.message);
  }
  return null;
}

async function fetchUpdates() {
  try {
    const res = await axios.get(`${API_URL}/getUpdates`);
    const updates = res.data.result;

    let files = [];

    for (const update of updates) {
      if (update.message) {
        // 📂 Documents
        if (update.message.document) {
          const doc = update.message.document;
          const fileUrl = await getFileLink(doc.file_id);
          files.push({
            type: "document",
            file_name: doc.file_name,
            file_id: doc.file_id,
            view_url: fileUrl
          });
        }

        // 🖼 Photos
        if (update.message.photo) {
          const photos = update.message.photo;
          const bestPhoto = photos[photos.length - 1];
          const fileUrl = await getFileLink(bestPhoto.file_id);
          files.push({
            type: "photo",
            file_id: bestPhoto.file_id,
            view_url: fileUrl
          });
        }
      }
    }

    fs.writeFileSync("files.json", JSON.stringify(files, null, 2));
    console.log("✅ files.json created with working photo + PDF view links!");
  } catch (err) {+
    console.error("❌ Error:", err.message);
  }
}

fetchUpdates();
