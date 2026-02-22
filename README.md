# MSK Backend Service for Image Management

This repository hosts the backend service for the MSK (Masking Service Kit) application. It is responsible for handling secure image uploads (original images and their corresponding mask images) to Cloudinary, and persisting the resulting image URLs and metadata in a MongoDB database. This service provides a robust API to facilitate image processing workflows for a connected frontend application.

## Features

* **Image Uploads**: Securely handles the upload of two distinct image files (original and mask) in a single request, leveraging `multer` for `multipart/form-data` processing.
* **Cloudinary Integration**: Seamlessly uploads both original and mask images to Cloudinary, a cloud-based media management service, ensuring efficient storage and delivery.
* **MongoDB Persistence**: Stores the Cloudinary URLs of the uploaded images, along with their upload timestamps, in a MongoDB database using Mongoose for easy retrieval and management.
* **RESTful API**: Provides a dedicated `POST` endpoint for handling image upload requests.
* **CORS Support**: Configured to allow cross-origin requests from specific frontend domains (e.g., `https://frontend-msk.vercel.app`), ensuring secure integration with the client application.
* **Environment Variable Management**: Utilizes `dotenv` to manage sensitive configuration details like database connection strings and Cloudinary API credentials, enhancing security and deployment flexibility.
* **Structured Logging**: Incorporates basic console logging for server status and MongoDB connection, aiding in development and debugging.

## Tech Stack

* **Node.js**: The JavaScript runtime environment.
* **Express.js**: A fast, unopinionated, minimalist web framework for Node.js, used for building the API.
* **Multer**: A Node.js middleware for handling `multipart/form-data`, primarily used for parsing file uploads.
* **Multer-Storage-Cloudinary**: A Multer storage engine that directly uploads files to Cloudinary.
* **Cloudinary**: A cloud-based image and video management service used for storing uploaded media.
* **Mongoose**: An elegant MongoDB object modeling tool designed to work in an asynchronous environment.
* **Dotenv**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`.
* **CORS**: A Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

## Installation Instructions

Follow these steps to set up and run the backend service locally:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/ArifRahaman/backend_MsK.git
    cd backend_MsK
    ```

2. **Install dependencies:**
    This project uses `npm` to manage its dependencies.
    ```bash
    npm install
    ```

3. **Create a `.env` file:**
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

1. **Start the server:**
    Once you have installed the dependencies and configured your `.env` file, you can start the server using:
    ```bash
    node index.js
    ```

## Environment Variables

The application requires the following environment variables to be set in a `.env` file:

- `PORT`: The port number on which the server will run.
- `MONGO_URI`: The connection string for the MongoDB database.
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name.
- `CLOUDINARY_API_KEY`: Your Cloudinary API key.
- `CLOUDINARY_API_SECRET`: Your Cloudinary API secret.

## API Reference

### POST /upload

Handles the upload of original and mask images.

#### Request

- **Headers**: `Content-Type: multipart/form-data`
- **Body**: 
  - `originalImage`: The original image file.
  - `maskImage`: The mask image file.

#### Response

- **Success**: `200 OK`
  - **Body**: JSON object containing the URLs of the uploaded images and metadata.
- **Error**: `4xx` or `5xx` status codes with error message.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any feature additions or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.