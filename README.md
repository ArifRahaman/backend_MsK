# Ensemble RAG (3-Model Consensus) Backend Service

This repository hosts the backend service for an Ensemble RAG (Retrieval Augmented Generation) system, designed for processing and ingesting various document types (PDF, TXT, MD, JSON). It facilitates a 3-Model Consensus approach for robust information retrieval. The service allows users to upload documents, extracts their text content, and integrates this content into a RAG pipeline for advanced querying and knowledge synthesis.

## Features

*   **Document Ingestion**: Supports secure upload of various document types including PDF, TXT, Markdown, and JSON files via a dedicated `/uploadfile/` endpoint.
*   **Intelligent Text Extraction**: Utilizes `pypdf` for robust text extraction from PDF files and standard file reading for other text-based formats (TXT, MD, JSON).
*   **Background Processing**: Leverages FastAPI's `BackgroundTasks` to handle computationally intensive text extraction and RAG ingestion processes asynchronously, ensuring a responsive API.
*   **Ensemble RAG Integration**: Designed to integrate with a "3-Model Consensus" RAG logic (via a custom `rag_logic` module), enabling sophisticated information retrieval and knowledge synthesis.
*   **RESTful API**: Provides a dedicated `POST` endpoint (`/uploadfile/`) for handling file uploads and initiating the ingestion process.
*   **Temporary File Storage**: Uploaded files are temporarily stored in a designated `uploads` directory before processing.
*   **Environment Variable Management**: Utilizes `python-dotenv` to manage sensitive configuration details, enhancing security and deployment flexibility.
*   **Structured Logging**: Incorporates Python's built-in `logging` module for comprehensive server activity, file processing, and error handling, aiding in development and debugging.

## Tech Stack

*   **Python**: The core programming language for the backend logic.
*   **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.
*   **Uvicorn**: An ASGI server, used to run the FastAPI application.
*   **`pypdf`**: A pure-Python PDF library capable of splitting, merging, cropping, and transforming PDF pages, and specifically used here for efficient text extraction.
*   **`python-dotenv`**: A zero-dependency module that loads environment variables from a `.env` file into `os.environ`.
*   **`logging`**: Python's built-in module for emitting log messages throughout the application.
*   **`pathlib`**: Python's object-oriented filesystem paths module, used for handling file paths efficiently.
*   **`rag_logic`**: (Assumed custom module) The core logic implementation for the 3-Model Ensemble RAG system, responsible for processing extracted text and integrating it into the retrieval augmented generation pipeline.

## Installation Instructions

Follow these steps to set up and run the backend service locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ArifRahaman/backend_MsK.git
    cd backend_MsK
    ```

2.  **Create a virtual environment (recommended):**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3.  **Install dependencies:**
    This project uses `pip` to manage its dependencies. It is recommended to create a `requirements.txt` file if not already present.

    If `requirements.txt` exists:
    ```bash
    pip install -r requirements.txt
    ```

    If `requirements.txt` is missing, you can install the dependencies manually and then generate the file:
    ```bash
    pip install fastapi uvicorn python-dotenv pypdf
    pip freeze > requirements.txt # Optional: to create a requirements file
    ```

4.  **Create a `.env` file:**
    In the root directory of the project, create a file named `.env` and configure your environment variables. Refer to the [Environment Variables](#environment-variables) section for detailed information.

    Example `.env` structure:
    ```ini
    PORT=8000
    # Add any other environment variables required by rag_logic, e.g.,
    # OPENAI_API_KEY=your_openai_api_key
    # HUGGINGFACE_API_TOKEN=your_hf_token
    # RAG_MODEL_PATH=/path/to/your/model
    ```

## Usage Guide

### 1. Start the Backend Service

Navigate to the project's root directory and run the FastAPI application using Uvicorn:

```bash
uvicorn index:app --host 0.0.0.0 --port ${PORT:-8000} --reload
```
The `--reload` flag is useful for development as it automatically reloads the server on code changes. For production, you might omit it.
The `PORT` variable will be loaded from your `.env` file, defaulting to `8000` if not specified.

The application will be accessible at `http://localhost:${PORT}` (e.g., `http://localhost:8000`).

### 2. Upload Documents

You can upload documents using the `/uploadfile/` API endpoint.

#### Example using `curl`:

To upload a PDF file named `document.pdf`:

```bash
curl -X POST "http://localhost:8000/uploadfile/" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@/path/to/your/document.pdf;type=application/pdf"
```

To upload a text file named `notes.txt`:

```bash
curl -X POST "http://localhost:8000/uploadfile/" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@/path/to/your/notes.txt;type=text/plain"
```

#### Example using Python `requests`:

```python
import requests

# Assuming the backend is running on port 8000
BASE_URL = "http://localhost:8000"

def upload_document(file_path):
    try:
        with open(file_path, "rb") as f:
            files = {"file": (f.name, f, "application/octet-stream")}
            response = requests.post(f"{BASE_URL}/uploadfile/", files=files)
            response.raise_for_status()  # Raise an exception for HTTP errors
            print(f"Successfully uploaded {file_path}: {response.json()}")
    except requests.exceptions.RequestException as e:
        print(f"Error uploading {file_path}: {e}")

# Example usage:
upload_document("path/to/your/document.pdf")
upload_document("path/to/your/example.md")
```

Upon successful upload, the server will respond with a message indicating that the file has been queued for ingestion. The text extraction and RAG ingestion will then proceed in the background.

## Environment Variables

This project uses `python-dotenv` to load configuration from a `.env` file. Create a `.env` file in the root directory of your project.

*   **`PORT`**: The port number on which the FastAPI application will run.
    *   Example: `PORT=8000`

*   **RAG-specific variables**: Your `rag_logic` module might require additional environment variables, such as API keys for external services or paths to models. These should also be defined in your `.env` file.
    *   Example:
        ```ini
        OPENAI_API_KEY=sk-your_openai_api_key_here
        HUGGINGFACE_API_TOKEN=hf_your_huggingface_token_here
        EMBEDDING_MODEL_NAME=sentence-transformers/all-MiniLM-L6-v2
        ```
    Consult the documentation or source code of your `rag_logic` module for a complete list of required variables.

## API Reference

The backend service exposes a single primary endpoint for document ingestion.

### `POST /uploadfile/`

Uploads a document for text extraction and subsequent ingestion into the Ensemble RAG pipeline.

*   **Method**: `POST`
*   **URL**: `/uploadfile/`
*   **Request Body**: `multipart/form-data`
    *   **`file`** (`File`): The document file to be uploaded. Supported types include PDF, TXT, MD, and JSON.
*   **Responses**:
    *   **`200 OK`**:
        ```json
        {
          "message": "File 'document.pdf' uploaded successfully and queued for ingestion."
        }
        ```
        Returned when the file is successfully received and the background ingestion task is initiated.
    *   **`400 Bad Request`**:
        ```json
        {
          "detail": "No file uploaded."
        }
        ```
        Returned if no file is provided in the request.
    *   **`500 Internal Server Error`**:
        ```json
        {
          "detail": "Failed to upload or process file: [error description]"
        }
        ```
        Returned if there's an error during file saving or during the initial queuing of the background task.

## Contributing

Contributions are welcome! If you find a bug, have a feature request, or want to contribute code, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes and ensure they adhere to the project's coding style.
4.  Write clear, concise commit messages.
5.  Push your branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request with a detailed description of your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.