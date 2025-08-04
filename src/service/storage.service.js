// SDK initialization

import ImageKit from "imagekit";

const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL
});

// URL generation
// var imageURL = imagekit.url({
//     path : "/default-image.jpg",
//     transformation : [{
//         "height" : "300",
//         "width" : "400"
//     }]
// });

// Upload function internally uses the ImageKit.io javascript SDK
const uploadImage = async (file, fileName) => {
  const response=await imagekit.upload({
    file: file,
    fileName: fileName,
    folder:"CaptionGenerator"
  });
  return response;
};
export default uploadImage;
