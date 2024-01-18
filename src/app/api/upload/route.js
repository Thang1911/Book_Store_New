import cloudinary from "cloudinary";
import uniqid from "uniqid";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const data = await req.formData();
  if (data.get("file")) {
    const file = data.get("file");

    try {
      // Tải file lên Cloudinary
      const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`; // Thay thế YOUR_CLOUD_NAME
      const cloudinaryUploadPreset = "book_store"; // Thay thế YOUR_UPLOAD_PRESET

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", cloudinaryUploadPreset);

      const response = await fetch(cloudinaryUploadUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        const link = result.secure_url;

        // Trả về URL
       return new Response(
         JSON.stringify({ link }), // Use JSON.stringify to convert the object to a JSON string
         {
           status: 200,
           headers: { "Content-Type": "application/json" }, // Set the Content-Type header to indicate JSON
         }
       );
      } else {
        console.error("Cloudinary upload error:", response.statusText);
        return new Response("Error uploading to Cloudinary", {
          status: 500,
          headers: { "Content-Type": "text/plain" },
        });
      }
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return new Response("Error uploading to Cloudinary", {
        status: 500,
        headers: { "Content-Type": "text/plain" },
      });
    }
  }

  return new Response(true, {
    headers: { "Content-Type": "application/json" },
  });
}
