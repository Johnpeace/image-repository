import { format } from "util";
import { Storage } from "@google-cloud/storage";

import catchAsyncError from "../utils/catch-async-error";

export const uploadOne = () =>
  catchAsyncError(async (req, res, next) => {
    const storage = new Storage();
    const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

    console.log(bucket);

    if (!req.file) return next();

    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on("error", (err) => {
      next(err);
    });

    blobStream.on("finish", () => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );

      res.status(200).json({
        status: "success",
        data: publicUrl,
      });
    });

    blobStream.end(req.file.buffer);
  });
