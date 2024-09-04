import multer from "multer";
import { extname } from "path";

const allowedMimeTypes = ["image/png", "image/jpeg"];

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("File Type Not Allowed"));
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const filename = `${file.fieldname}-${new Date().getTime()}${extname(
      file.originalname
    )}`;
    cb(null, filename);
  },
});

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5000000,
  },
});