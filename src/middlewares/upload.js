import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "pdf_uploads",
        upload_preset: "pdf_public_upload",
        resource_type: "auto",
        format: async (req, file) => "pdf", 
        public_id: (req, res) => {
            const title = req.body.title;
            if (!title) {
                return "Student_Submession";
            } else {
                return title;
            }
        }
    }
});

export const upload = multer({ storage });