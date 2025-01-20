import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";
import cors from 'cors';  // Import cors package
// Set up Express app
const app = express();
const port = 5000;


// Enable CORS for all routes
app.use(cors());
// Configure file upload using Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Ensure that the uploads folder exists
import fs from 'fs';
const uploadsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Set up the route for audio file upload and transcription
app.post('/api/transcribe', upload.single('audio'), (req, res) => {
  const audioFilePath = path.join(uploadsDir, req.file.filename);
  console.log(`Audio file path: ${audioFilePath}`);

  // Run the transcription script using the uploaded audio file path
  exec(`python transcribe.py "${audioFilePath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error}`);
      return res.status(500).send({ error: "Error processing the audio file" });
    }
    if (stderr) {
      console.error(`Python stderr: ${stderr}`);
    }
    console.log(stdout);
    res.send({ transcription: stdout });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
