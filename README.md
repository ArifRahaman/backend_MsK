# GitHub Webhook API

An automated documentation generator service designed to process GitHub webhook payloads efficiently.

## Features

- FastAPI server for handling webhook requests.
- Endpoint to receive GitHub webhook payloads.
- Background task support for asynchronous processing.
- Quick validation of repository data from payloads.

## Tech Stack

- **Python**: FastAPI for building the API server.
- **Node.js**: Utilized for dependencies management with npm.
- **Uvicorn**: ASGI server for running FastAPI applications.
- **Dependencies**:
  - Cloudinary
  - Nodemon

## Installation Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/ArifRahaman/backend_MsK.git
   cd backend_MsK
   ```

2. Install Python dependencies (FastAPI and Uvicorn):
   ```bash
   pip install fastapi uvicorn
   ```

3. Install Node.js dependencies:
   ```bash
   npm install
   ```

## Usage Guide

To start the FastAPI server, run:
```bash
python index.js
```
The server will start on port 8000 and will be accessible at `http://0.0.0.0:8000`.

### Example Requests

- **GET /:** Check server status.
  ```bash
  curl http://0.0.0.0:8000/
  ```

- **POST /webhook/github:** Send a GitHub webhook payload.
  ```bash
  curl -X POST http://0.0.0.0:8000/webhook/github -d '{"repository": {"full_name": "example/repo"}}' -H "Content-Type: application/json"
  ```

## API Reference

### Endpoints

- **GET /**

  **Description**: Returns the status of the server.

  **Response**:
  ```json
  {
    "status": "online",
    "message": "DocuGenius Webhook Server is running!"
  }
  ```

- **POST /webhook/github**

  **Description**: Receives and processes GitHub webhook payloads.

  **Request Body**:
  ```json
  {
    "repository": {
      "full_name": "example/repo"
    }
  }
  ```

  **Response**:
  ```json
  {
    "status": "processing",
    "repository": "example/repo",
    "message": "Webhook payload received successfully."
  }
  ```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## License

This project is licensed under the ISC License.

---
> 🤖 *Last automated update: 2026-02-24 21:56:44*