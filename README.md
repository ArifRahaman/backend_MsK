# GitHub Webhook API

An automated documentation generator service.

## Features

- Initialize a FastAPI server for handling GitHub webhooks.
- Endpoint to check server status.
- Endpoint to process GitHub webhook payloads.

## Tech Stack

- Python
- FastAPI
- Uvicorn

## Installation Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/ArifRahaman/backend_MsK.git
   cd backend_MsK
   ```

2. **Create a virtual environment and activate it**

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install the dependencies**

   ```bash
   pip install fastapi uvicorn
   ```

## Usage Guide

1. **Running the Server**

   Start the FastAPI server using Uvicorn:

   ```bash
   uvicorn index:app --host 0.0.0.0 --port 8000 --reload
   ```

2. **Check Server Status**

   Access the root endpoint to verify the server is running:

   ```bash
   curl http://localhost:8000/
   ```

   Expected response:

   ```json
   {
     "status": "online",
     "message": "DocuGenius Webhook Server is running!"
   }
   ```

3. **Process GitHub Webhook**

   Send a POST request to the webhook endpoint:

   ```bash
   curl -X POST http://localhost:8000/webhook/github -H "Content-Type: application/json" -d '{"repository": {"full_name": "example/repo"}}'
   ```

   Expected response:

   ```json
   {
     "status": "processing",
     "repository": "example/repo",
     "message": "Webhook payload received successfully."
   }
   ```

## API Reference

### Endpoints

- `GET /`  
  Returns the status of the server.

- `POST /webhook/github`  
  Processes the incoming webhook payload from GitHub. Returns the status of processing and the repository name.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss improvements or bug fixes.

## License

This project is licensed under the MIT License.

---
> 🤖 *Last automated update: 2026-02-24 16:33:34*