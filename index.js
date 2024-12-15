const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "image_mask_tool", // Folder in Cloudinary
    allowed_formats: ["jpeg", "png"],
  },
});

const upload = multer({ storage });

// MongoDB Schema and Model
const ImageSchema = new mongoose.Schema({
  originalImageUrl: String,
  maskImageUrl: String,
  uploadedAt: { type: Date, default: Date.now },
});

const ImageModel = mongoose.model("Image", ImageSchema);

// Routes
// Upload images
app.post("/upload", upload.fields([{ name: "original" }, { name: "mask" }]), async (req, res) => {
  try {
    const originalImage = req.files["original"][0].path;
    const maskImage = req.files["mask"][0].path;

    const newImage = new ImageModel({
      originalImageUrl: originalImage,
      maskImageUrl: maskImage,
    });

    await newImage.save();
    res.status(201).json({ message: "Images uploaded successfully", data: newImage });
  } catch (error) {
    res.status(500).json({ message: "Error uploading images", error });
  }
});

// Retrieve images
app.get("/images", async (req, res) => {
  try {
    const images = await ImageModel.find().sort({ uploadedAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving images", error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
