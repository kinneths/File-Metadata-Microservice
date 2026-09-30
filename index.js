const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();

// Configure Multer storage (memory storage keeps uploaded files in memory as a Buffer)
const upload = multer({ storage: multer.memoryStorage() });

// Middleware setup
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Serve HTML home page
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// POST /api/fileanalyse - Handle file upload and return metadata
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload a file' });
  }

  const { originalname, mimetype, size } = req.file;

  res.json({
    name: originalname,
    type: mimetype,
    size: size
  });
});

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});