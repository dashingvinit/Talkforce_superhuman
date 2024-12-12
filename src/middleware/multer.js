const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`Created upload directory: ${uploadDir}`);
}

// Define storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save all files in the uploads directory
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now(); // Add timestamp to ensure unique filenames
    const fileExt = path.extname(file.originalname);
    cb(null, `file_${timestamp}${fileExt}`); // Simple filename format
  },
});

// File filter to allow only CSV files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'text/csv') {
    cb(null, true);
  } else {
    cb(new Error('Only CSV files are allowed!'), false);
  }
};

// Multer configuration
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB file size limit
  },
});

// Middleware for handling file uploads
const uploadMiddleware = (req, res, next) => {
  try {
    const singleUpload = upload.single('file');
    singleUpload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // Multer-specific errors
        console.log(err);
        return res.status(400).json({
          success: false,
          message: `Multer error: ${err.message}`,
        });
      } else if (err) {
        // Custom or other errors
        console.log(err);
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      // Proceed if file is successfully uploaded
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded',
        });
      }

      next();
    });
  } catch (error) {
    console.log(error);
    next(error); // Forward the error to the global error handler
  }
};

module.exports = uploadMiddleware;
