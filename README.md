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
    ```

## Usage Guide

1.  **Start the server:**
    Once you have installed the dependencies and configured your `.env` file, you can start the server using:
    ```bash
    node index.js
    ```
    or, if defined in `package.json`:
    ```bash
    npm start
    ```
    The server will typically run on the port specified in your `.env` file (e.g., `http://localhost:8000`).

2.  **Interact with the API:**
    This backend is designed to be consumed by a frontend application. It exposes an API endpoint for image uploads.
    For example, a connected frontend (like `https://frontend-msk.vercel.app`) would send `multipart/form-data` requests to the `/upload` endpoint, containing the `original` and `mask` image files.

## Environment Variables

The project uses environment variables for sensitive data and configuration. Create a `.env` file in the root directory of the project with the following variables:

*   `PORT`: The port number on which the Express server will listen (e.g., `8000`).
*   `MONGO_URI`: Your MongoDB connection string. This typically includes your username, password, cluster address, and database name.
    *   Example: `mongodb+srv://your_user:your_password@your_cluster.mongodb.net/your_database?retryWrites=true&w=majority`
*   `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name, found in your Cloudinary dashboard.
*   `CLOUDINARY_API_KEY`: Your Cloudinary API Key.
*   `CLOUDINARY_API_SECRET`: Your Cloudinary API Secret.

## API Reference

### `POST /upload`

*   **Description**: Uploads an original image and a mask image to Cloudinary, then saves their respective URLs and other metadata to MongoDB.
*   **Request Method**: `POST`
*   **Request URL**: `/upload`
*   **Content-Type**: `multipart/form-data`
*   **Request Body (Form Data)**:
    *   `original`: (**File**) The original image file to be uploaded.
    *   `mask`: (**File**) The mask image file corresponding to the original image.
*   **Success Response (200 OK)**:
    ```json
    {
        "originalImageUrl": "https://res.cloudinary.com/your_cloud_name/image/upload/v.../image_mask_tool/original_image_id.png",
        "maskImageUrl": "https://res.cloudinary.com/your_cloud_name/image/upload/v.../image_mask_tool/mask_image_id.png",
        "message": "Images uploaded successfully"
    }
    ```
*   **Error Responses**:
    *   `400 Bad Request`: If required files are missing or validation fails.
        ```json
        {
            "error": "Both original and mask images are required."
        }
        ```
    *   `500 Internal Server Error`: For server-side issues (e.g., Cloudinary upload failure, MongoDB save error).
        ```json
        {
            "error": "Failed to upload images or save to database."
        }
        ```

## Contributing

Contributions are welcome! If you have suggestions for improvements, bug fixes, or new features, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

## License

This project is open-sourced under the MIT License. See the `LICENSE` file for more details (if available in the repository, otherwise a placeholder).