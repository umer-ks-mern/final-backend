import { Router } from "express";
import { upload } from "../middleware/file.js";
import multer from "multer";

const fileRouter = Router();

fileRouter.post("/upload", (req, res) => {
  const { productId } = req.body;
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).send("Multer error.");
    } else if (err) {
      // Handle other errors
      console.error("Error uploading image:", err);
      return res.status(500).send("Internal server error.");
    }
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const imagePath = req.file.path;

    // Send a response with both a message and the imagePath
    res
      .status(200)
      .send(`File uploaded successfully. Image path: ${imagePath}`);
  });
});

export default fileRouter;
