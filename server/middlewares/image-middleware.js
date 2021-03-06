import multer from "multer";

import AppError from "../utils/app-error";

// Mainly for inMemory storage
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});


export const uploadImageMiddleware = upload.single("photo");
export const uploadMultipleImagesMiddleware = upload.array("images", 5);
