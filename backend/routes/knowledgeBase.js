const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');
const pdfParse = require("pdf-parse");
const mammoth = require('mammoth');

// ========================= Multer Setup =========================
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024, // 10MB default
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['txt', 'pdf', 'docx'];
    const fileExt = path.extname(file.originalname).toLowerCase().substring(1);

    if (allowedTypes.includes(fileExt)) {
      cb(null, true);
    } else {
      cb(new Error(`File type .${fileExt} not allowed. Allowed: ${allowedTypes.join(', ')}`));
    }
  }
});

// ========================= Memory Storage =========================
const knowledgeBaseStorage = new Map();

function getKnowledgeBase(id) {
  return knowledgeBaseStorage.get(id);
}

// ========================= Upload Route =========================
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const file = req.file;
    const fileExt = path.extname(file.originalname).toLowerCase();
    const fileId = uuidv4();

    console.log(`📤 Uploading file: ${file.originalname}`);
    console.log(`   - Size: ${file.size}`);
    console.log(`   - Ext: ${fileExt}`);

    let content = '';

    // -------------------- TXT --------------------
    if (fileExt === '.txt') {
      content = file.buffer.toString('utf8');
    }

    // -------------------- PDF --------------------
    else if (fileExt === '.pdf') {
      console.log(`📄 Parsing PDF: ${file.originalname}`);

      try {
        const pdfData = await pdfParse(file.buffer);
        content = pdfData.text || "";

        console.log(`📄 PDF parsed (${content.length} chars)`);
      } catch (err) {
        console.error("❌ PDF parse failed:", err);
        return res.status(400).json({
          success: false,
          error: "Failed to parse PDF. Ensure it's a text-based PDF.",
        });
      }
    }

    // -------------------- DOCX --------------------
    else if (fileExt === '.docx') {
      const result = await mammoth.extractRawText({ buffer: file.buffer });

      content = result.value;
      if (result.messages?.length) {
        console.log("⚠️ DOCX Warnings:", result.messages);
      }

      console.log(`📝 DOCX parsed (${content.length} chars)`);
    }

    // -------------------- Invalid --------------------
    else {
      return res.status(400).json({
        success: false,
        error: `Unsupported file type: ${fileExt}`,
      });
    }

    // -------------------- Validation --------------------
    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'File is empty or cannot be parsed',
      });
    }

    if (content.length > 50000) {
      return res.status(400).json({
        success: false,
        error: 'File too large (max 50,000 characters)',
      });
    }

    // -------------------- Store File --------------------
    knowledgeBaseStorage.set(fileId, {
      id: fileId,
      name: file.originalname,
      content,
      size: content.length,
      uploadedAt: new Date().toISOString(),
      type: "uploaded",
    });

    console.log(`📚 Saved KB: ${file.originalname}`);

    return res.json({
      success: true,
      knowledgeBaseId: fileId,
      fileName: file.originalname,
      contentLength: content.length,
    });

  } catch (error) {
    console.error("❌ Upload error:", error);

    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'File too large (max 10MB)',
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Upload failed',
      message: error.message,
    });
  }
});

// ========================= Get File =========================
router.get('/:knowledgeBaseId', (req, res) => {
  try {
    const kb = knowledgeBaseStorage.get(req.params.knowledgeBaseId);

    if (!kb) {
      return res.status(404).json({ error: 'Knowledge base not found' });
    }

    return res.json({ success: true, knowledgeBase: kb });

  } catch (error) {
    console.error('Get KB error:', error);
    res.status(500).json({ error: 'Failed to retrieve KB' });
  }
});

// ========================= Delete File =========================
router.delete('/:knowledgeBaseId', (req, res) => {
  try {
    const kb = knowledgeBaseStorage.get(req.params.knowledgeBaseId);

    if (!kb) {
      return res.status(404).json({ error: 'Knowledge base not found' });
    }

    knowledgeBaseStorage.delete(req.params.knowledgeBaseId);

    return res.json({
      success: true,
      message: 'Knowledge base deleted',
    });

  } catch (error) {
    console.error('Delete KB error:', error);
    res.status(500).json({ error: 'Failed to delete KB' });
  }
});

// ========================= List All =========================
router.get('/', (req, res) => {
  try {
    const list = Array.from(knowledgeBaseStorage.values()).map(kb => ({
      id: kb.id,
      name: kb.name,
      size: kb.size,
      uploadedAt: kb.uploadedAt,
      type: kb.type,
    }));

    return res.json({
      success: true,
      count: list.length,
      knowledgeBases: list,
    });

  } catch (error) {
    console.error('List KB error:', error);
    res.status(500).json({ error: 'Failed to list KBs' });
  }
});

// ========================= Default Knowledge Base =========================
router.get('/default/content', (req, res) => {
  try {
    const defaultKnowledgeBase = `PERSONA:
You are a professional legal interviewer...
(keep your long text here)
`;

    return res.json({
      success: true,
      content: defaultKnowledgeBase,
    });

  } catch (error) {
    console.error("Default KB error:", error);
    res.status(500).json({ error: 'Failed to load default KB' });
  }
});

module.exports = router;
module.exports.getKnowledgeBase = getKnowledgeBase;
