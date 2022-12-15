// type validFileExtension = "png" | "jpg" | "jpeg";
type validMimeType = "image/png" | "image/jpg" | "image/jpeg";

const validMimeTypes: validMimeType[] = [
  "image/png",
  "image/jpg",
  "image/jpeg",
];

export const saveImageToStorage = {
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes: validMimeType[] = validMimeTypes;
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
  },
};
