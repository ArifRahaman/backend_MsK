# Backend for Image Masking Tool (MsK)

A robust Node.js Express backend designed to handle image uploads for an image masking application. It leverages Cloudinary for efficient cloud storage of images and MongoDB for persistent storage of image metadata, including original and masked image URLs.

## Features

*   **Secure Image Uploads**: Supports concurrent uploads of an original image and its corresponding mask image using Multer.
*   **Cloudinary Integration**: Seamlessly uploads image files to Cloudinary, providing public URLs for easy access and management.
*   **MongoDB Persistence**: Stores image metadata (original and mask image URLs, upload timestamps) in a MongoDB database using Mongoose.
*   **CORS Configuration**: Securely configured to allow requests from a specific frontend origin (`https://frontend-msk.vercel.app`) to prevent cross-origin issues.
*   **Environment Variable Management**: Utilizes `dotenv` for secure handling of sensitive API keys and database credentials.
*   **Scalable API**: Built with Express.js, providing a clear and extensible API structure.

## Tech Stack

*   **Backend Framework**: Node.js, Express.js
*   **Database**: MongoDB (via Mongoose ODM)
*   **Cloud Storage**: Cloudinary
*   **File Upload Middleware**: Multer, Multer-storage-cloudinary
*   **CORS**: `cors`
*   **Environment Variables**: `dotenv`
*   **Development Tooling**: `nodemon`

## Installation Instructions

Follow these steps to get the project up and running on your local machine.

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/arifrahaman/backend_MsK.git
    cd backend_MsK
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**:
    Create a `.env` file in the root directory of the project and populate it with your credentials:

    ```env
    MONGO_URI=<Your_MongoDB_Connection_String>
    CLOUDINARY_CLOUD_NAME=<Your_Cloudinary_Cloud_Name>
    CLOUDINARY_API_KEY=<Your_Cloudinary_API_Key>
    CLOUDINARY_API_SECRET=<Your_Cloudinary_API_Secret>
    # The PORT variable is optional; the server typically defaults to port 3000.
    # PORT=3000
    ```
    *Note*: The frontend origin for CORS is currently hardcoded in `index.js` to `https://frontend-msk.vercel.app`. If you need to allow other origins (e.g., for local development), you will need to modify the `corsOptions.origin` in `index.js` or introduce an environment variable for it.

## Usage Guide

### Starting the Server

1.  **For Development (with Nodemon)**:
    If `nodemon` is installed (as a dependency in `package.json`), you can use it for automatic server restarts during development:
    ```bash
    nodemon index.js
    ```

2.  **For Production**:
    ```bash
    node index.js
    ```

The server will start and typically listen on port `3000` (or the port specified in your `.env` file if configured). You will see "MongoDB connected" in your console if the database connection is successful.

### Example API Interaction

The primary API endpoint handles image uploads. You can test it using tools like Postman, Insomnia, or by integrating it with a frontend application.

## API Reference

### `POST /upload`

*   **Description**: Uploads an original image and a corresponding mask image. Both images are stored on Cloudinary, and their public URLs, along with an image ID, are saved to MongoDB.
*   **Method**: `POST`
*   **URL**: `/upload`
*   **Request Body**: `multipart/form-data`
    *   `original`: (File) The original image file (e.g., a `.jpeg` or `.png` file).
    *   `mask`: (File) The mask image file (e.g., a `.jpeg` or `.png` file).
*   **Success Response**: `200 OK`
    ```json
    {
      "message": "Images uploaded successfully",
      "originalImageUrl": "https://res.cloudinary.com/<your_cloud_name>/image/upload/v.../image_mask_tool/original_image.png",
      "maskImageUrl": "https://res.cloudinary.com/<your_cloud_name>/image/upload/v.../image_mask_tool/mask_image.png",
      "imageId": "65b2d8e4f1a2b3c4d5e6f7g8"
    }
    ```
*   **Error Response**: `500 Internal Server Error`
    ```json
    {
      "message": "Failed to upload images: <error_details>"
    }
    ```

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes and commit them (`git commit -m 'Add new feature'`).
4.  Push to the branch (`git push origin feature/your-feature-name`).
5.  Open a Pull Request.

Please ensure your code adheres to good practices and includes appropriate tests if applicable.

## License

This project is licensed under the ISC License. See the `LICENSE` file for details (or assume standard ISC if no file is present and `package.json` states ISC).