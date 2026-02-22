# MSK Backend Service for Image Management

This repository hosts the backend service for the MSK (Masking Service Kit) application. It is responsible for handling secure image uploads (original images and their corresponding mask images) to Cloudinary, and persisting the resulting image URLs and metadata in a MongoDB database. This service provides a robust API to facilitate image processing workflows for a connected frontend application.

## Features

*   **Image Uploads**: Securely handles the upload of two distinct image files (original and mask) in a single request, leveraging `multer` for `multipart/form-data` processing.
*   **Cloudinary Integration**: Seamlessly uploads both original and mask images to Cloudinary, a cloud-based media management service, ensuring efficient storage and delivery.
*   **MongoDB Persistence**: Stores the Cloudinary URLs of the uploaded images, along with their upload timestamps, in a MongoDB database using Mongoose for easy retrieval and management.
*   **RESTful API**: Provides a dedicated `POST` endpoint for handling image upload requests.
*   **CORS Support**: Configured to allow cross-origin requests from specific frontend domains (e.g., `https://frontend-msk.vercel.app`), ensuring secure integration with the client application.
*   **Environment Variable Management**: Utilizes `dotenv` to manage sensitive configuration details like database connection strings and Cloudinary API credentials, enhancing security and deployment flexibility.
*   **Structured Logging**: Incorporates basic console logging for server status and MongoDB connection, aiding in development and debugging.

## Tech Stack

*   **Node.js**: The JavaScript runtime environment.
*   **Express.js**: A fast, unopinionated, minimalist web framework for Node.js, used for building the API.
*   **Multer**: A Node.js middleware for handling `multipart/form-data`, primarily used for parsing file uploads.
*   **Multer-Storage-Cloudinary**: A Multer storage engine that directly uploads files to Cloudinary.
*   **Cloudinary**: A cloud-based image and video management service used for storing uploaded media.
*   **Mongoose**: An elegant MongoDB object modeling tool designed to work in an asynchronous environment.
*   **Dotenv**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`.
*   **CORS**: A Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

## Installation Instructions

Follow these steps to set up and run the backend service locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ArifRahaman/backend_MsK.git
    cd backend_MsK
    ```

2.  **Install dependencies:**
    This project uses `npm` to manage its dependencies.
    ```bash
    npm install
    ```

3.  **Create a `.env` file:**
    In the root directory of the project, create a file named `.env` and configure your environment variables. Refer to the [Environment Variables](#environment-variables) section for detailed information.

    Example `.env` structure:
    ```ini
    PORT=8000
    MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    CORS_ORIGIN=https://frontend-msk.vercel.app
    ```

## Environment Variables

This project uses environment variables to manage sensitive information and configuration settings. Create a `.env` file in the root directory of the project and populate it with the following variables:

*   **`PORT`**:
    *   **Description**: The port number on which the Express server will listen.
    *   **Example**: `8000`
*   **`MONGO_URI`**:
    *   **Description**: The connection string for your MongoDB database. This typically includes credentials and database name.
    *   **Example**: `mongodb+srv://<user>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority`
*   **`CLOUDINARY_CLOUD_NAME`**:
    *   **Description**: Your Cloudinary cloud name, found in your Cloudinary dashboard.
    *   **Example**: `your_cloudinary_cloud_name`
*   **`CLOUDINARY_API_KEY`**:
    *   **Description**: Your Cloudinary API Key.
    *   **Example**: `your_cloudinary_api_key`
*   **`CLOUDINARY_API_SECRET`**:
    *   **Description**: Your Cloudinary API Secret. Keep this secure and do not expose it publicly.
    *   **Example**: `your_cloudinary_api_secret`
*   **`CORS_ORIGIN`**:
    *   **Description**: The allowed origin for Cross-Origin Resource Sharing (CORS) requests. This should be the URL of your frontend application.
    *   **Example**: `https://frontend-msk.vercel.app`

## Usage Guide

1.  **Start the server:**
    Once you have installed the dependencies and configured your `.env` file, you can start the server using:
    ```bash
    node index.js
    ```
    The server will typically start on the port specified in your `PORT` environment variable (e.g., `http://localhost:8000`). You will see console output indicating the server status and MongoDB connection.

2.  **Interact with the API:**
    The service exposes a `POST` endpoint for uploading images. You can test this endpoint using tools like `curl`, Postman, or Insomnia.

    **Endpoint:** `/api/upload`
    **Method:** `POST`
    **Content-Type:** `multipart/form-data`

    **Example `curl` command:**
    ```bash
    curl -X POST \
      -H "Content-Type: multipart/form-data" \
      -F "originalImage=@/path/to/your/original_image.jpg" \
      -F "maskImage=@/path/to/your/mask_image.png" \
      http://localhost:8000/api/upload
    ```
    *Replace `/path/to/your/original_image.jpg` and `/path/to/your/mask_image.png` with the actual paths to your image files.*

    **Expected JSON Response (on success):**
    ```json
    {
        "message": "Images uploaded successfully!",
        "originalImageUrl": "https://res.cloudinary.com/your_cloud_name/image/upload/v.../original_image.jpg",
        "maskImageUrl": "https://res.cloudinary.com/your_cloud_name/image/upload/v.../mask_image.png",
        "uploadedAt": "2023-10-27T10:30:00.000Z",
        "_id": "653b6e8a1a2b3c4d5e6f7a8b"
    }
    ```

## API Reference

The MSK Backend Service exposes the following RESTful API endpoint:

### `POST /api/upload`

Uploads an original image and a corresponding mask image to Cloudinary and saves their URLs and metadata to MongoDB.

*   **URL**: `/api/upload`
*   **Method**: `POST`
*   **Content-Type**: `multipart/form-data`

#### Request Body

The request body must be `multipart/form-data` and contain two file fields:

*   **`originalImage`** (File, Required): The main image file to be uploaded.
*   **`maskImage`** (File, Required): The mask image file corresponding to the `originalImage`.

#### Success Response

*   **Code**: `200 OK`
*   **Content**: A JSON object containing the Cloudinary URLs for both images, the upload timestamp, and the MongoDB document ID.

    ```json
    {
        "message": "Images uploaded successfully!",
        "originalImageUrl": "https://res.cloudinary.com/your_cloud_name/image/upload/v.../original_image.jpg",
        "maskImageUrl": "https://res.cloudinary.com/your_cloud_name/image/upload/v.../mask_image.png",
        "uploadedAt": "YYYY-MM-DDTHH:MM:SS.sssZ",
        "_id": "MONGODB_OBJECT_ID"
    }
    ```

#### Error Responses

*   **`400 Bad Request`**:
    *   If required files (`originalImage` or `maskImage`) are missing from the request.
    *   If an invalid file format is provided (though `multer` usually handles this at a lower level, custom validation might trigger this).
    *   Example: `{"error": "Both originalImage and maskImage are required."}`
*   **`500 Internal Server Error`**:
    *   If there's an issue with Cloudinary upload (e.g., incorrect credentials, service outage).
    *   If there's a database error (e.g., MongoDB connection issue, Mongoose validation failure).
    *   Example: `{"error": "Failed to upload images or save to database."}`

## Contributing

We welcome contributions to the MSK Backend Service! If you'd like to contribute, please follow these steps:

1.  **Fork the repository.**
2.  **Create a new branch** for your feature or bug fix: `git checkout -b feature/your-feature-name` or `bugfix/fix-something`.
3.  **Make your changes**, ensuring they adhere to the project's coding style and best practices.
4.  **Test your changes** thoroughly.
5.  **Commit your changes** with a clear and descriptive commit message: `git commit -m "feat: Add new feature for X"` or `fix: Resolve bug in Y`.
6.  **Push your branch** to your forked repository: `git push origin feature/your-feature-name`.
7.  **Open a Pull Request** to the `main` branch of the original repository. Provide a detailed description of your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.