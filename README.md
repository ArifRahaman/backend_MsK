# Image Masking Backend Service

This repository houses the backend service for an image masking application. It is engineered to handle the secure upload, storage, and management of original and masked images. Utilizing robust cloud services, it ensures efficient asset handling and provides a clear API for integration with client applications.

## Features

*   **Image Uploads**: Securely handles the upload of two distinct image files—an original image and its corresponding mask image—in a single request.
*   **Cloudinary Integration**: Leverages Cloudinary for highly efficient, scalable, and secure cloud storage of all uploaded image files. Images are stored in a dedicated folder (`image_mask_tool`) and support `jpeg` and `png` formats.
*   **MongoDB Persistence**: Stores essential image metadata, including the Cloudinary URLs for both the original and masked images, in a MongoDB database using Mongoose for structured data management. Each record also includes an `uploadedAt` timestamp.
*   **CORS Configuration**: Securely configured using the `cors` middleware to accept requests exclusively from a specified frontend application origin, enhancing security and controlling access.
*   **Robust API Endpoint**: Provides a clear and simple `POST /upload` API endpoint designed specifically for handling the multi-file image upload operation.
*   **Environment Variable Management**: Utilizes `dotenv` to manage sensitive configurations and credentials, keeping them out of the codebase and making deployment flexible.

## Tech Stack

*   **Node.js**: JavaScript runtime environment.
*   **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
*   **MongoDB**: NoSQL database for flexible and scalable data storage.
*   **Mongoose**: MongoDB object data modeling (ODM) for Node.js, providing a schema-based solution for application data.
*   **Cloudinary**: Cloud-based image and video management service for storing and delivering media.
*   **Multer**: Node.js middleware for handling `multipart/form-data`, primarily used for parsing and processing file uploads.
*   **Multer Storage Cloudinary**: A Multer storage engine that directly uploads files to Cloudinary, streamlining the upload process.
*   **dotenv**: Module to load environment variables from a `.env` file, ensuring sensitive configurations are kept secure and separate from the codebase.
*   **CORS**: Node.js middleware for providing a Connect/Express middleware that can be used to enable Cross-Origin Resource Sharing with fine-grained control over allowed origins.
*   **Nodemon**: (Development dependency) A utility that monitors for any changes in your source and automatically restarts your server, ideal for speeding up development workflows.

## Installation Instructions

Follow these steps to set up and run the backend service locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ArifRahaman/backend_MsK.git
    cd backend_MsK
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file:**
    In the root directory of the project, create a file named `.env` and configure your environment variables. Refer to the [Environment Variables](#environment-variables) section for detailed information.

    Example `.env` structure:
    ```ini
    PORT=5000
    MONGO_URI="mongodb+srv://<user>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority"
    CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
    CLOUDINARY_API_KEY="your_cloudinary_api_key"
    CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
    FRONTEND_ORIGIN="https://frontend-msk.vercel.app" # Or your specific frontend URL, e.g., http://localhost:3000
    ```

4.  **Start the server:**
    *   For **development** (with automatic restarts on file changes):
        ```bash
        npm run dev
        # or
        nodemon index.js
        ```
    *   For **production**:
        ```bash
        npm start
        # or
        node index.js
        ```

    You should see "MongoDB connected" in your console, and the server will be listening on the specified `PORT`.

## Usage Guide

This backend service primarily exposes an API endpoint for uploading images. A client application (e.g., a web frontend) can send `multipart/form-data` requests to this endpoint.

### Uploading Images

To upload an original image and its corresponding mask image, send a `POST` request to the `/upload` endpoint with `Content-Type: multipart/form-data`. The request body must contain two file fields: `original` and `mask`.

#### Example using `curl`

You can test the upload functionality using `curl` from your terminal. Replace `path/to/original.jpg` and `path/to/mask.png` with the actual paths to your image files.

```bash
curl -X POST \
  http://localhost:5000/upload \
  -H 'Content-Type: multipart/form-data' \
  -F 'original=@/path/to/original.jpg' \
  -F 'mask=@/path/to/mask.png'
```

#### Example using JavaScript (Frontend Application)

This is a conceptual example for how a frontend application might use the API.

```javascript
const uploadImages = async (originalFile, maskFile) => {
  const formData = new FormData();
  formData.append('original', originalFile);
  formData.append('mask', maskFile);

  try {
    const response = await fetch('http://localhost:5000/upload', { // Replace with your backend URL
      method: 'POST',
      body: formData,
      // No need to set Content-Type header for FormData, fetch does it automatically
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to upload images');
    }

    const data = await response.json();
    console.log('Images uploaded successfully:', data);
    return data;
  } catch (error) {
    console.error('Upload error:', error.message);
    throw error;
  }
};

// Example usage (assuming you have file objects from an input field)
// const originalImageFile = document.querySelector('#originalFileInput').files[0];
// const maskImageFile = document.querySelector('#maskFileInput').files[0];
// if (originalImageFile && maskImageFile) {
//   uploadImages(originalImageFile, maskImageFile);
// }
```

## Environment Variables

The project uses a `.env` file to manage environment-specific configurations. Make sure to create this file in the root directory and populate it with the following variables:

*   **`PORT`**: The port number on which the Express server will run.
    *   _Example:_ `PORT=5000`
*   **`MONGO_URI`**: Your MongoDB connection string. This includes credentials and the database name.
    *   _Example:_ `MONGO_URI="mongodb+srv://user:password@cluster-url/dbname?retryWrites=true&w=majority"`
*   **`CLOUDINARY_CLOUD_NAME`**: Your Cloudinary cloud name.
    *   _Example:_ `CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"`
*   **`CLOUDINARY_API_KEY`**: Your Cloudinary API key.
    *   _Example:_ `CLOUDINARY_API_KEY="your_cloudinary_api_key"`
*   **`CLOUDINARY_API_SECRET`**: Your Cloudinary API secret.
    *   _Example:_ `CLOUDINARY_API_SECRET="your_cloudinary_api_secret"`
*   **`FRONTEND_ORIGIN`**: The URL of your frontend application that is allowed to make requests to this backend. This is crucial for CORS security.
    *   _Example:_ `FRONTEND_ORIGIN="https://frontend-msk.vercel.app"` or `http://localhost:3000` for local development.

## API Reference

### Upload Images

**Endpoint**: `/upload`
**Method**: `POST`
**Description**: Uploads an original image and a corresponding mask image to Cloudinary and stores their URLs in MongoDB.
**Content-Type**: `multipart/form-data`

#### Request Body

The request body must be `multipart/form-data` and contain two file fields:

*   **`original`**: The original image file.
*   **`mask`**: The mask image file.

#### Success Response

**Status**: `200 OK`
**Body**:
```json
{
  "message": "Images uploaded successfully",
  "originalImageUrl": "https://res.cloudinary.com/.../original_image.jpeg",
  "maskImageUrl": "https://res.cloudinary.com/.../mask_image.png",
  "imageId": "65e6d7a4c7b8e9f0g1h2i3j4" // MongoDB _id of the saved record
}
```

#### Error Response

**Status**: `500 Internal Server Error`
**Body**:
```json
{
  "message": "Error uploading images",
  "error": "Details about the error (e.g., database error, upload failure)"
}
```

## Contributing

Contributions are welcome! If you have suggestions for improvements, new features, or bug fixes, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

Please ensure your code adheres to the existing style and includes relevant documentation updates.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.