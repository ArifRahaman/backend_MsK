# Image Masking Backend Service

This repository houses the backend service for an image masking application. It handles the secure upload of original and masked images to Cloudinary, stores their metadata (image URLs) in MongoDB, and provides a robust API for managing these image assets.

## Features

*   **Image Uploads**: Securely upload original and corresponding mask images.
*   **Cloudinary Integration**: Utilizes Cloudinary for efficient, scalable, and secure cloud storage of image files.
*   **MongoDB Persistence**: Stores image metadata, including Cloudinary URLs, in a MongoDB database using Mongoose.
*   **CORS Configuration**: Securely configured to allow requests from a specific frontend application, ensuring controlled access.
*   **API Endpoints**: Provides a clear and simple API for handling image upload operations.

## Tech Stack

*   **Node.js**: JavaScript runtime environment.
*   **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
*   **MongoDB**: NoSQL database for flexible and scalable data storage.
*   **Mongoose**: MongoDB object data modeling (ODM) for Node.js, providing a schema-based solution for application data.
*   **Cloudinary**: Cloud-based image and video management service for storing and delivering media.
*   **Multer**: Node.js middleware for handling `multipart/form-data`, primarily used for uploading files.
*   **Multer Storage Cloudinary**: A Multer storage engine for directly uploading files to Cloudinary.
*   **dotenv**: Module to load environment variables from a `.env` file, keeping sensitive configurations out of the codebase.
*   **CORS**: Node.js middleware for providing a Connect/Express middleware that can be used to enable Cross-Origin Resource Sharing.
*   **Nodemon**: (Development dependency) A utility that monitors for any changes in your source and automatically restarts your server, ideal for development workflows.

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
    In the root directory of the project, create a file named `.env` and configure your environment variables (see the Environment Variables section for details).

    Example `.env`:
    ```ini
    PORT=5000
    MONGO_URI="mongodb+srv://<user>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority"
    CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
    CLOUDINARY_API_KEY="your_cloudinary_api_key"
    CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
    FRONTEND_ORIGIN="https://frontend-msk.vercel.app" # Or your specific frontend URL
    ```

4.  **Start the server:**
    *   For **development** (with automatic restarts on file changes):
        ```bash
        nodemon index.js
        ```
    *   For **production**:
        ```bash
        node index.js
        ```

## Usage Guide

Once the server is running, you can interact with its API endpoints.

### Starting the Server

The server will listen on the port specified in your `.env` file (e.g., `5000`). If `PORT` is not specified, it typically defaults to `5000`.

You should see a message similar to "MongoDB connected" in your console, indicating a successful database connection.

### Example: Uploading Images

To upload an original image and its corresponding mask image, send a `POST` request to the `/upload` endpoint. The request must use `multipart/form-data` as its `Content-Type`.

**Endpoint:** `POST /upload`

**Request Body (multipart/form-data fields):**
*   `original`: The original image file.
*   `mask`: The mask image file.

**Example using `curl`:**
```bash
curl -X POST \
  -H "Content-Type: multipart/form-data" \
  -F "original=@/path/to/your/original_image.png" \
  -F "mask=@/path/to/your/mask_image.png" \
  http://localhost:5000/upload # Adjust port if different
```
Replace `/path/to/your/original_image.png` and `/path/to/your/mask_image.png` with the actual file paths on your system.

**Example Success Response (JSON):**
```json
{
  "message": "Images uploaded successfully!",
  "originalImageUrl": "https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/image_mask_tool/original_image.png",
  "maskImageUrl": "https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/image_mask_tool/mask_image.png",
  "imageId": "65f0e3f7c2a7e7b8d4e5f6a1"
}
```

## Environment Variables

This project uses `dotenv` to load environment variables. Create a `.env` file in the root directory of the project and populate it with the following required variables:

*   **`PORT`**: (Optional) The port number on which the Express server will listen. If not specified, the server will default to port `5000`.
*   **`MONGO_URI`**: The full connection string for your MongoDB database. This typically includes authentication credentials and the database name.
    *   Example: `mongodb+srv://yourUser:yourPassword@yourcluster.mongodb.net/yourDatabase?retryWrites=true&w=majority`
*   **`CLOUDINARY_CLOUD_NAME`**: Your unique Cloudinary cloud name, found in your Cloudinary dashboard.
*   **`CLOUDINARY_API_KEY`**: Your Cloudinary API Key, also found in your Cloudinary dashboard.
*   **`CLOUDINARY_API_SECRET`**: Your Cloudinary API Secret, a sensitive credential that should be kept private.
*   **`FRONTEND_ORIGIN`**: (Note: This is currently hardcoded in `index.js` to `https://frontend-msk.vercel.app`). For better flexibility and deployability, it's recommended to update `index.js` to read this value from `process.env.FRONTEND_ORIGIN` instead of being hardcoded. This variable should contain the exact URL of your frontend application to enable CORS.

## API Reference

**Base URL**: `http://localhost:<PORT>` (Replace `<PORT>` with the port your server is running on, e.g., `5000`).

---

### `POST /upload`

Uploads an original image and its corresponding mask image to Cloudinary. Upon successful upload, the Cloudinary URLs for both images are saved to a MongoDB database.

*   **URL**: `/upload`
*   **Method**: `POST`
*   **Content-Type**: `multipart/form-data`
*   **Request Body**:
    *   `original` (File, Required): The primary image file to be uploaded.
    *   `mask` (File, Required): The mask image file associated with the original image.
*   **Success Response**:
    *   **Code**: `200 OK`
    *   **Content**:
        ```json
        {
          "message": "Images uploaded successfully!",
          "originalImageUrl": "string", // Cloudinary URL of the uploaded original image
          "maskImageUrl": "string",     // Cloudinary URL of the uploaded mask image
          "imageId": "string"           // The MongoDB `_id` of the document storing the image metadata
        }
        ```
*   **Error Responses**:
    *   **Code**: `400 Bad Request`
        *   **Condition**: One or both of the required file fields (`original`, `mask`) are missing from the request.
        *   **Content**: `{ "message": "Original or mask image not provided!" }` (or similar error message)
    *   **Code**: `500 Internal Server Error`
        *   **Condition**: An unexpected error occurred on the server, such as issues with Cloudinary upload, MongoDB connection, or database saving.
        *   **Content**: `{ "message": "Error uploading images", "error": "Details of the error" }`

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these guidelines:

1.  **Fork** the repository.
2.  **Create a new branch** for your feature or bug fix: `git checkout -b feature/your-feature-name` or `git checkout -b bugfix/issue-description`.
3.  **Make your changes** and ensure they adhere to the existing code style.
4.  **Commit your changes** with a clear and descriptive commit message: `git commit -m 'feat: Add new feature for X'` or `fix: Resolve Y issue'`.
5.  **Push to the branch**: `git push origin feature/your-feature-name`.
6.  **Open a Pull Request** to the `main` branch of this repository.

Please ensure your pull requests are focused on a single feature or bug fix and include relevant documentation or tests if applicable.

## License

This project is licensed under the ISC License. See the `LICENSE` file (if present, or derived from `package.json`) for full details.