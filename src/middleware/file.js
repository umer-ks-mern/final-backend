import multer from "multer";

import { fileURLToPath } from "url";
import path from "path";

// Get the directory path of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: (req, file, callBackFunc) => {
    const destinationPath = path.join(__dirname, "../../public/images/");
    callBackFunc(null, destinationPath);
  },
  filename: (req, file, callBackFunc) => {
    callBackFunc(null, file.originalname);
  },
});

export const upload = multer({ storage });
