# Ensemble RAG (3-Model Consensus) Backend Service

This repository hosts the backend service for an Ensemble RAG (Retrieval Augmented Generation) system, designed for processing and ingesting various document types (PDF, TXT, MD, JSON). It facilitates a 3-Model Consensus approach for robust information retrieval. The service allows users to upload documents, extracts their text content, and integrates this content into a RAG pipeline for advanced querying and knowledge synthesis.

## Features

*   **Document Ingestion**: Supports secure upload of various document types including PDF, TXT, Markdown, and JSON files.
*   **Intelligent Text Extraction**: Utilizes `pypdf` for robust text extraction from PDF files and standard file reading for other text-based formats.
*   **Background Processing**: Leverages FastAPI's `BackgroundTasks` to handle computationally intensive text extraction and RAG ingestion processes asynchronously, ensuring a responsive API.
*   **Ensemble RAG Integration**: Designed to integrate with a "3-Model Consensus" RAG logic (via `rag_logic` module), enabling sophisticated information retrieval.
*   **RESTful API**: Provides a dedicated `POST` endpoint for handling file uploads and initiating the ingestion process.
*   **Environment Variable Management**: Utilizes `dotenv` to manage sensitive configuration details, enhancing security and deployment flexibility.
*   **Structured Logging**: Incorporates `logging` for server activity, file processing, and error handling, aiding in development and debugging.

## Tech Stack

*   **Python**: The core programming language.
*   **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.
*   **Uvicorn**: An ASGI server, used to run the FastAPI application.
*   **`pypdf`**: A pure-Python PDF library capable of splitting, merging, cropping, and transforming PDF pages, and extracting text.
*   **`python-dotenv`**: A zero-dependency module that loads environment variables from a `.env` file into `os.environ`.
*   **`logging`**: Python's built-in module for emitting log messages.
*   **`pathlib`**: Python's object-oriented filesystem paths.
*   **`rag_logic`**: (Assumed custom module) The core logic for the 3-Model Ensemble RAG system.

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
    This project uses `pip` to manage its dependencies.
    ```bash
    pip install -r requirements.txt
    ```
    (Note: If `requirements.txt` is not present, you can create one with `pip freeze > requirements.txt` after manually installing the dependencies, or install them directly: `pip install fastapi uvicorn python-dotenv pypdf`)

4.  **Create a `.env` file:**
    In the root directory of the project, create a file named `.env` and configure your environment variables. Refer to the [Environment Variables](#environment-variables) section for detailed information.

    Example `.env` structure:
    ```ini
    PORT=8000
    # Add any other environment variables required by rag_logic, e.g.,
    # OPENAI_API_KEY=your_openai_api_key
    # HUGGINGFACE_API_TOKEN=your_hf_token
    ```

## Usage Guide

To start the FastAPI application and begin ingesting documents:

1.  **Ensure virtual environment is active** and dependencies are installed (as per installation steps).
2.  **Run the application** using Uvicorn:
    ```bash
    uvicorn index:app --host 0.0.0.0 --port $PORT --reload
    ```
    (Replace `$PORT` with your desired port, or ensure it's set in your `.env` file and accessible in your shell.)

    The server will typically run on `http://127.0.0.1:8000` (or the port specified in your `.env`).

3.  **Access the API Documentation**:
    Once the server is running, you can access the interactive API documentation (Swagger UI) at `http://127.0.0.1:8000/docs` (or your chosen host/port). This interface allows you to test the endpoints directly.

## Environment Variables

This project uses environment variables to manage configuration settings. Create a `.env` file in the root directory of the project and populate it with the following variables:

*   **`PORT`**:
    *   **Description**: The port number on which the FastAPI server will listen.
    *   **Example**: `PORT=8000`
*   **`UPLOAD_DIR`** (Internal):
    *   **Description**: The directory where uploaded files are temporarily stored before processing. This is typically managed internally by the application.
*   **`LLM_API_KEY_MODEL_1`** (Hypothetical):
    *   **Description**: API key for the first LLM model used in the 3-Model Consensus RAG.
    *   **Example**: `LLM_API_KEY_MODEL_1=sk-xxxxxxxxxxxxxxxxxxxxxxxxx`
*   **`LLM_API_KEY_MODEL_2`** (Hypothetical):
    *   **Description**: API key for the second LLM model.
*   **`LLM_API_KEY_MODEL_3`** (Hypothetical):
    *   **Description**: API key for the third LLM model.

(Note: The exact environment variables required for `rag_logic` are not exposed in the provided `index.js` excerpt, but are common for RAG systems interacting with external LLMs.)

## API Reference

The backend exposes a RESTful API for document ingestion.

### `POST /uploadfile/`

Uploads a single file for text extraction and ingestion into the RAG system. The ingestion process runs as a background task.

*   **Endpoint**: `/uploadfile/`
*   **Method**: `POST`
*   **Request Body**: `multipart/form-data`
    *   `file`: The document file to upload (e.g., PDF, TXT, MD, JSON).

#### Example Request (using `curl`):

```bash
curl -X 'POST' \
  'http://127.0.0.1:8000/uploadfile/' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@/path/to/your/document.pdf;type=application/pdf'
```

#### Example Response (Success):

```json
{
  "message": "File uploaded and ingestion initiated."
}
```

#### Error Responses:

*   **`422 Unprocessable Entity`**: If the file input is missing or malformed.

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'feat: Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.