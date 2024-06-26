const multer = require("multer");
const { google } = require("googleapis");
const stream = require("stream");

// Configure Google Drive authentication
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
  scopes: ["https://www.googleapis.com/auth/drive.file"],
});

// Create a Google Drive client
const drive = google.drive({ version: "v3", auth });

// Configure multer storage
const storage = multer.memoryStorage();

// Custom file upload handler
const uploadToGoogleDrive = async (req, file, cb) => {
  try {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);

    // Upload file to Google Drive
    const fileMetadata = {
      name: `${Date.now()}-${file.originalname}`,
      mimeType: file.mimetype,
    };
    const media = {
      mimeType: file.mimetype,
      body: bufferStream,
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });

    // Return the Google Drive file ID
    cb(null, response.data.id);
  } catch (error) {
    cb(error, null);
  }
};

// Configure multer upload
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    uploadToGoogleDrive(req, file, (err, id) => {
      if (err) return cb(err);
      req.fileId = id; // Save file ID to request object for later use
      cb(null, true);
    });
  },
});

module.exports = upload;
