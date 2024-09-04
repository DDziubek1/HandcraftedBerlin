import fs from 'fs';
import cloudinary from 'cloudinary';
import {unlink} from 'fs/promises';
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const cloudinaryUpload = async (req, res, next) => {
  try {
    const { files } = req;
    const images = [];
    for (const file of files) {
      const result = await cloudinary.v2.uploader.upload(file.path);
      images.push(result.secure_url);
     /* await unlink(file.path, (err, data) => {
        if (err) {
          throw err;
        }
      });*/
    }
    req.images = images;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send('something went wrong');
  }
};