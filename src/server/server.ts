import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { uploadImageToGithub } from './uploadImage';

const app = express();
const upload = multer();

app.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }
    const imageUrl = await uploadImageToGithub(req.file.buffer, req.file.originalname);
    res.json({ imageUrl });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).send('Image upload failed');
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
