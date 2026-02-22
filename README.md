# Ensemble RAG (3-Model Consensus) Backend Service

This repository hosts the backend service for an Ensemble RAG (Retrieval Augmented Generation) system. It is specifically designed for processing and ingesting various document types (PDF, TXT, MD, JSON) to facilitate a 3-Model Consensus approach for robust information retrieval and knowledge synthesis. The service allows users to securely upload documents, extracts their text content, and seamlessly integrates this content into a RAG pipeline for advanced querying.

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
*   **`rag_logic`**: (Custom module) The core logic implementation for the 3-Model Ensemble RAG system, responsible for processing extracted text and integrating it into the retrieval augmented generation pipeline.

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
    This project uses `pip` to manage its dependencies. It's recommended to create a `requirements.txt` file.

    Create a `requirements.txt` file in the root of the project with the following content:
    ```
    fastapi
    uvicorn
    python-dotenv
    pypdf
    ```
    Then install them:
    ```bash
    pip install -r requirements.txt
    ```
    *(Note: The `rag_logic` module is assumed to be part of this project or provided separately, and any external dependencies it has should also be added to `requirements.txt` if applicable.)*

4.  **Create a `.env` file:**
    In the root directory of the project, create a file named `.env` and configure your environment variables. Refer to the [Environment Variables](#environment-variables) section for detailed information.

## Usage Guide

### Starting the Backend Service

To start the FastAPI application using Uvicorn, navigate to the project's root directory in your activated virtual environment and run:

```bash
uvicorn index:app --host 0.0.0.0 --port 8000 --reload
```

*   `index:app`: Specifies that the FastAPI application instance named `app` is found within the `index.py` file.
*   `--host 0.0.0.0`: Makes the server accessible from any IP address (useful for Docker or network access). For local-only access, you can use `127.0.0.1` or `localhost`.
*   `--port 8000`: Runs the server on port 8000.
*   `--reload`: Enables auto-reloading of the server on code changes during development.

Once the server is running, you can access the API documentation at `http://localhost:8000/docs` (Swagger UI) or `http://localhost:8000/redoc` (ReDoc).

### Uploading Documents for Ingestion

You can upload documents to the `/uploadfile/` endpoint using tools like `curl` or any HTTP client library.

**Example using `curl` (Linux/macOS):**

To upload a PDF file:
```bash
curl -X POST "http://localhost:8000/uploadfile/" \
     -H "accept: application/json" \
     -H "Content-Type: multipart/form-data" \
     -F "file=@/path/to/your/document.pdf;type=application/pdf"
```

To upload a TXT file:
```bash
curl -X POST "http://localhost:8000/uploadfile/" \
     -H "accept: application/json" \
     -H "Content-Type: multipart/form-data" \
     -F "file=@/path/to/your/document.txt;type=text/plain"
```

Replace `/path/to/your/document.pdf` or `/path/to/your/document.txt` with the actual path to your file.

**Expected Response:**

Upon successful upload and initiation of the background ingestion task, you will receive a JSON response:

```json
{
  "message": "File uploaded successfully and ingestion initiated."
}
```

The server will then process the file in the background, extracting text and feeding it to the `rag_logic` module. You can monitor the server logs for progress and any potential issues.

## Environment Variables

The project uses `python-dotenv` to manage environment variables from a `.env` file. These variables are crucial for configuring various aspects of the application, especially for the `rag_logic` module, which might require API keys, model identifiers, or connection strings.

Create a file named `.env` in the root directory of your project (e.g., `backend_MsK/.env`).

**Example `.env` structure (add variables as required by `rag_logic`):**

```env
# Example environment variables (adjust based on actual needs of rag_logic)
# OPENAI_API_KEY="your_openai_api_key_here"
# HUGGINGFACE_API_TOKEN="your_huggingface_token_here"
# VECTOR_DB_URL="your_vector_database_connection_string"
# MODEL_NAME_1="model-a"
# MODEL_NAME_2="model-b"
# MODEL_NAME_3="model-c"
```
*Note: The specific environment variables required will depend on the implementation details of the `rag_logic` module, which is not fully exposed in these excerpts. Consult the `rag_logic` module's documentation or source code for exact requirements.*

## API Reference

### `POST /uploadfile/`

Uploads a document for text extraction and subsequent ingestion into the Ensemble RAG pipeline.

*   **URL**: `/uploadfile/`
*   **Method**: `POST`
*   **Headers**:
    *   `Content-Type: multipart/form-data`
*   **Parameters**:
    *   `file`: (`UploadFile`, **required**) The document to be uploaded. Supported types include PDF, TXT, MD, and JSON.
*   **Responses**:
    *   **`200 OK`**:
        ```json
        {
          "message": "File uploaded successfully and ingestion initiated."
        }
        ```
        *Description*: Indicates that the file was received and a background task for text extraction and RAG ingestion has been successfully started.
    *   **`400 Bad Request`**:
        *Description*: Returned if the uploaded file is malformed, or if other client-side validation errors occur (e.g., if FastAPI's internal validation fails before custom logic is applied).
    *   **`500 Internal Server Error`**:
        *Description*: Returned if an unexpected server-side error occurs during file handling, text extraction, or the RAG ingestion process. (While the current implementation logs warnings for unsupported file types, a production-ready API might explicitly raise a `HTTPException` for such cases, resulting in a 400 response.)

## Contributing

We welcome contributions to enhance this Ensemble RAG backend service! If you're interested in improving the project, please follow these steps:

1.  **Fork the repository.**
2.  **Create a new branch** for your feature or bug fix: `git checkout -b feature/your-feature-name` or `bugfix/issue-description`.
3.  **Make your changes**, ensuring that your code adheres to existing style and quality guidelines.
4.  **Write clear, concise commit messages.**
5.  **Push your branch** to your forked repository.
6.  **Open a Pull Request** to the `main` branch of the original repository, describing your changes in detail.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.