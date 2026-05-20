/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import multer from 'multer';

const app = express();
const PORT = 3000;

// Enable JSON and text input
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup temporary upload storage folder on the server
const UPLOAD_DIR = path.join('/tmp', 'cloudport-uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Multer Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    // Keep exact file name, but make it unique with timestamp to prevent collisions
    const fileId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    cb(null, `${fileId}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 250 * 1024 * 1024 } // 250 megabytes file limit
});

// Memory stores for rooms, files, and WebRTC signals
interface CloudFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  roomId: string; // The specific code or room
  downloadUrl: string;
}

// Active files database in memory
const fileDatabase = new Map<string, CloudFile>();

// WebRTC signal queues per room
const roomSignals = new Map<string, { type: 'offer' | 'answer' | 'candidate', data: any }[]>();

// API Endpoints:

// 1. Health-check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uploadDirExists: fs.existsSync(UPLOAD_DIR) });
});

// 2. Upload file
app.post('/api/upload', upload.single('file'), (req: Request, res: Response): void => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'لم يتم استلام أي ملف' });
      return;
    }

    const roomId = (req.body.roomId || 'global').trim().toLowerCase();
    const fileId = req.file.filename;

    const newFile: CloudFile = {
      id: fileId,
      name: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype || 'application/octet-stream',
      uploadedAt: new Date().toLocaleTimeString('ar-EG', { hour12: false }),
      roomId,
      downloadUrl: `/api/download/${fileId}`
    };

    fileDatabase.set(fileId, newFile);

    console.log(`[CloudPort] File uploaded successfully: ${newFile.name} (Room: ${roomId})`);
    res.json({ success: true, file: newFile });
  } catch (error: any) {
    console.error('Upload Error:', error);
    res.status(500).json({ error: error.message || 'فشل رفع الملف في السحابة' });
  }
});

// 3. List files in a room
app.get('/api/rooms/:roomId/files', (req: Request, res: Response) => {
  const roomId = req.params.roomId.trim().toLowerCase();
  const files: CloudFile[] = [];

  fileDatabase.forEach((file) => {
    if (file.roomId === roomId) {
      const filePath = path.join(UPLOAD_DIR, file.id);
      if (fs.existsSync(filePath)) {
        files.push(file);
      } else {
        // Clean up from memory database if deleted on disk
        fileDatabase.delete(file.id);
      }
    }
  });

  res.json({ files });
});

// 4. Download file
app.get('/api/download/:fileId', (req: Request, res: Response): void => {
  const fileId = req.params.fileId;
  const fileMeta = fileDatabase.get(fileId);

  if (!fileMeta) {
    res.status(404).json({ error: 'الملف غير موجود في خادم النقل السحابي' });
    return;
  }

  const filePath = path.join(UPLOAD_DIR, fileId);
  if (!fs.existsSync(filePath)) {
    res.status(404).json({ error: 'عفوًا، تم إزالة هذا الملف مؤقتًا من مساحة الخادم' });
    return;
  }

  console.log(`[CloudPort] Downloading: ${fileMeta.name}`);
  res.setHeader('Content-Type', fileMeta.type);
  res.download(filePath, fileMeta.name);
});

// 5. Delete details
app.delete('/api/files/:fileId', (req: Request, res: Response) => {
  const fileId = req.params.fileId;
  const fileMeta = fileDatabase.get(fileId);

  if (fileMeta) {
    const filePath = path.join(UPLOAD_DIR, fileId);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {}
    }
    fileDatabase.delete(fileId);
  }
  res.json({ success: true });
});

// 6. WebRTC signaling (Direct Peer link endpoints)
app.post('/api/rooms/:roomId/signal', (req: Request, res: Response) => {
  const roomId = req.params.roomId.trim().toLowerCase();
  const { type, data } = req.body;

  if (!roomSignals.has(roomId)) {
    roomSignals.set(roomId, []);
  }

  const list = roomSignals.get(roomId)!;
  list.push({ type, data });
  
  // Cap at 30 signals to prevent leakage
  if (list.length > 30) {
    list.shift();
  }

  res.json({ success: true });
});

app.get('/api/rooms/:roomId/signals', (req: Request, res: Response) => {
  const roomId = req.params.roomId.trim().toLowerCase();
  const signals = roomSignals.get(roomId) || [];
  res.json({ signals });
});

app.delete('/api/rooms/:roomId/signals', (req: Request, res: Response) => {
  const roomId = req.params.roomId.trim().toLowerCase();
  roomSignals.set(roomId, []);
  res.json({ success: true });
});


// Start server and handle Vite bundles in dev vs production:
async function main() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production serving of built assets
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[CloudPort Quantum Portal Engine] running on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error('Fatal Server Boot Error:', err);
});
