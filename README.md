# VoiceOwl

A minimal Node.js + Express + MongoDB application for uploading and transcribing audio files, with a simple frontend UI.

## 📌 Features
- Mocks transcription for demonstration purposes
- Saves transcription data (URL, transcription text, timestamp) to MongoDB
- Bootstrap 5 UI to test uploads and view transcription history

---

## 🛠 Tech Stack
- Node.js – Backend runtime
- Express.js – Web server framework
- EJS – Templating engine for dynamic views
- MongoDB – NoSQL database
- Mongoose – MongoDB object modeling
- Bootstrap 5 – Frontend styling
- dotenv – Environment variable management

---

## 📂 Project Structure
.
├── app.js # Main server entry point
├── datacontroller/
│ └── controller.js # API routes & logic
├── public/ # Static assets (CSS, JS, images)
├── views/ # EJS templates
├── .env # Environment variables
├── package.json
└── README.md

---

## ⚙️ Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/voiceowl.git
cd voiceowl
Install dependencies
npm install
Create a .env file
PORT=3000
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
Run the server
npm start
or with auto-reload during development:
nodemon app.js
🌐 API Endpoints
POST /transcription
Accepts an audio URL, mocks transcription, and saves it to MongoDB.
{
  "audioUrl": "https://example.com/sample.mp3"
}
Response:
{
  "_id": "mongodb_document_id"
}
GET /transcriptions
Fetches all stored transcriptions sorted by creation date.
🎨 Frontend UI
Accessible at http://localhost:3000
Allows:
Entering Input text for URL
Submitting transcription request
Viewing all transcriptions in a list