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
    This project uses `pip` to manage its dependencies. Create a `requirements.txt` file in the root of the project with the following content:
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

To start the FastAPI backend service and begin ingesting documents:

1.  **Ensure virtual environment is active:**
    ```bash
    source venv/bin/activate
    ```

2.  **Start the FastAPI application:**
    Assuming your main application file containing the FastAPI instance (e.g., the content provided in `index.js`) is named `main.py` in your project root, run Uvicorn:
    ```bash
    uvicorn main:app --reload --port 8000
    ```
    The `--reload` flag enables auto-reloading on code changes, and `--port 8000` sets the server port. The service will typically be accessible at `http://127.0.0.1:8000`.

3.  **Upload Documents:**
    You can interact with the API using tools like `curl`, Postman, or a Python script.

    **Example using `curl` to upload a PDF file:**
    ```bash
    curl -X POST "http://127.0.0.1:8000/uploadfile/" \
         -H "accept: application/json" \
         -H "Content-Type: multipart/form-data" \
         -F "file=@/path/to/your/document.pdf;type=application/pdf"
    ```
    Replace `/path/to/your/document.pdf` with the actual path to the file you want to upload. The `type` parameter should match the MIME type of your file (e.g., `text/plain` for TXT, `application/json` for JSON, `text/markdown` for MD).

    **Example using Python `requests`:**
    ```python
    import requests

    file_path = "/path/to/your/document.txt"
    with open(file_path, "rb") as f:
        files = {"file": (file_path.split('/')[-1], f, "text/plain")}
        response = requests.post("http://127.0.0.1:8000/uploadfile/", files=files)

    print(response.json())
    ```

Upon successful upload, the file will be temporarily stored in the `uploads` directory, its text content will be extracted in a background task, and then ingested into the 3-Model Ensemble RAG system.

## Environment Variables

This project uses `python-dotenv` to load environment variables from a `.env` file for sensitive configurations. While the provided `index.js` excerpt only shows `load_dotenv()`, indicating that environment variables are *loaded*, it does not explicitly *use* any specific variables.

If the `rag_logic` module or other parts of the application require specific configurations (e.g., API keys for external services, database connection strings, RAG model parameters), they would typically be defined in your `.env` file.

**Example `.env` file structure (hypothetical):**

```dotenv
# .env
RAG_API_KEY="your_rag_service_api_key_here"
DATABASE_URL="sqlite:///./sql_app.db"
LOG_LEVEL="INFO"
```
Please consult the `rag_logic` module or other parts of the codebase for the exact environment variables expected.

## API Reference

The backend service provides a RESTful API for document ingestion.

### Endpoint: `POST /uploadfile/`

Uploads a document for text extraction and ingestion into the Ensemble RAG pipeline.

*   **URL**: `/uploadfile/`
*   **Method**: `POST`
*   **Request Body**:
    *   `file` (multipart/form-data): The document file to be uploaded. Supports PDF, TXT, MD, and JSON formats.
*   **Response**:
    *   **200 OK**:
        ```json
        {
          "message": "File uploaded and ingestion started in background",
          "filename": "your_document.pdf"
        }
        ```
    *   **400 Bad Request**:
        If the file type is unsupported or no file is provided.
        ```json
        {
          "detail": "No file uploaded or unsupported file type."
        }
        ```
    *   **500 Internal Server Error**:
        If an unexpected server error occurs during processing.
        ```json
        {
          "detail": "An error occurred during file processing."
        }
        ```

## Contributing

We welcome contributions to the Ensemble RAG Backend Service! If you'd like to contribute, please follow these steps:

1.  **Fork the repository.**
2.  **Create a new branch** for your feature or bug fix: `git checkout -b feature/your-feature-name` or `bugfix/fix-bug-name`.
3.  **Implement your changes.**
4.  **Write tests** for your changes (if applicable).
5.  **Ensure your code adheres to the project's coding standards.**
6.  **Commit your changes** with a clear and concise message.
7.  **Push your branch** to your forked repository.
8.  **Open a Pull Request** to the `main` branch of the original repository.

Please make sure to describe your changes clearly in the pull request and reference any relevant issues.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.