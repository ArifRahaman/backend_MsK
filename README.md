# Ensemble RAG (3-Model Consensus) Backend Service

This repository hosts a robust backend service for a Retrieval Augmented Generation (RAG) system, engineered to ingest and process various document types using an ensemble of three AI models. It facilitates the secure upload, text extraction, and background processing of documents, making the content available for advanced querying and generation tasks through its integrated RAG logic.

## Features

*   **Document Ingestion**: Supports secure upload and processing of multiple document types, including PDF, TXT, Markdown, and JSON files.
*   **Intelligent Text Extraction**: Implements a dedicated helper to efficiently extract textual content from uploaded documents, handling different file formats robustly.
*   **Ensemble RAG Logic**: Integrates a sophisticated 3-model consensus RAG system (defined in `rag_logic.py`) for enhanced information retrieval and generation, leveraging multiple perspectives for improved accuracy and reliability.
*   **Asynchronous Processing**: Utilizes FastAPI's `BackgroundTasks` to handle computationally intensive text extraction and ingestion processes asynchronously, ensuring the API remains responsive.
*   **File Management**: Organizes uploaded files into a dedicated `uploads/` directory for temporary storage before processing, with robust error handling and cleanup mechanisms.
*   **Environment Variable Management**: Employs `python-dotenv` for secure and flexible management of sensitive configurations and API keys, separating them from the codebase.
*   **Structured Logging**: Incorporates comprehensive logging to monitor application behavior, track file processing, and aid in debugging.

## Tech Stack

*   **Python**: The core programming language for the backend.
*   **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.
*   **pypdf**: A pure-python PDF library capable of splitting, merging, cropping, and transforming PDF pages, and extracting text.
*   **python-dotenv**: A module that loads environment variables from a `.env` file into `os.environ`.
*   **Uvicorn**: An ASGI server, used to run FastAPI applications.
*   **`rag_logic.py`**: (External module) Houses the custom 3-model ensemble RAG implementation, responsible for embedding, retrieval, and generation based on ingested documents. This module is imported and utilized by `index.js` but its internal details are not provided in this context.

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
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3.  **Install dependencies:**
    The project relies on a `requirements.txt` file for its dependencies.
    ```bash
    pip install -r requirements.txt
    ```
    *If `requirements.txt` is not yet available in the repository, you can create one manually with the following core dependencies, then run the install command:*
    ```
    fastapi
    uvicorn
    python-dotenv
    pypdf
    ```
    *Note: The `rag_logic.py` module may have additional dependencies (e.g., for NLP models, vector databases, or API clients) not listed here. You may need to install them separately if they are not included in a comprehensive `requirements.txt`.*

4.  **Create a `.env` file:**
    In the root directory of the project, create a file named `.env` and configure your environment variables. Refer to the [Environment Variables](#environment-variables) section for detailed information.

    Example `.env` structure:
    ```ini
    # Server configuration
    PORT=8000
    HOST="0.0.0.0"

    # RAG specific configurations (adjust based on your rag_logic.py implementation)
    # Example: If your RAG system uses OpenAI
    # OPENAI_API_KEY="your_openai_api_key"
    # VECTOR_DB_URI="your_vector_database_connection_string"
    # MODEL_NAME="gpt-4o" # Or other model identifiers
    # UPLOAD_DIRECTORY="uploads" # Optional, code defaults to 'uploads' if not set
    ```

5.  **Start the server:**
    ```bash
    uvicorn index:app --host 0.0.0.0 --port 8000 --reload
    ```
    The `--reload` flag is useful for development as it automatically restarts the server on code changes. For production, consider removing `--reload` for better performance and stability.

    The API will be accessible at `http://127.0.0.1:8000` (or the specified host/port).
    You can access the interactive API documentation (Swagger UI) at `http://127.0.0.1:8000/docs`.

## Usage Guide

This service primarily provides an API endpoint for ingesting documents into the RAG system.

### Ingesting Documents

To add new documents for processing by the RAG system, send a `POST` request to the `/ingest-document` endpoint. The service will handle the file upload, extract text, and schedule the document for background processing through the ensemble RAG logic.

#### Example using `curl`:

```bash
curl -X POST "http://127.0.0.1:8000/ingest-document" \
     -H "accept: application/json" \
     -H "Content-Type: multipart/form-data" \
     -F "file=@/path/to/your/document.pdf;type=application/pdf"
```

Replace `/path/to/your/document.pdf` with the actual file path of your document. The API supports `pdf`, `txt`, `md`, and `json` file formats.

#### Expected Response:

A successful ingestion request will return a confirmation message indicating that the document has been received and scheduled for processing.

```json
{
  "message": "Document uploaded and scheduled for ingestion.",
  "filename": "your_document.pdf"
}
```

The actual ingestion process (text extraction, feeding data to the RAG logic) runs as a background task. You should monitor the server logs for detailed status updates and any potential errors during this background operation.

*Further usage (e.g., querying the RAG system, retrieving generated responses) would typically involve additional API endpoints not detailed in the provided `index.js` excerpt. These would likely be implemented within or alongside the `rag_logic.py` module.*

## Environment Variables

The project uses `python-dotenv` to load environment variables from a `.env` file. Create this file in the root directory of your project to configure various aspects of the application.

*   **`PORT`**: (Optional) Specifies the port on which the FastAPI server will listen for incoming requests. Defaults to `8000` if not explicitly set.
*   **`HOST`**: (Optional) Defines the host address for the FastAPI server. Defaults to `0.0.0.0`, making the server accessible from any network interface. Use `127.0.0.1` to restrict access to the local machine only.
*   **`UPLOAD_DIR`**: (Optional) The directory where uploaded documents are temporarily stored before processing. The current `index.js` hardcodes this to `uploads/`, but including it here provides a clear configuration point if it were to be made dynamic.

**RAG-specific variables (dependent on `rag_logic.py`):**

Your `rag_logic.py` module will almost certainly require additional environment variables for its configuration. These might include API keys for external Language Models (LLMs), connection strings for vector databases, or paths to locally stored models. Examples of such variables often include:

*   **`OPENAI_API_KEY`**: API key for integrating with OpenAI services.
*   **`HF_TOKEN`**: Hugging Face API token for accessing models from the Hugging Face Hub.
*   **`VECTOR_DB_CONNECTION_STRING`**: Connection details for your chosen vector database (e.g., Pinecone, Weaviate, ChromaDB, Milvus).
*   **`EMBEDDING_MODEL_NAME`**: Identifier or path for the embedding model used in the RAG pipeline.
*   **`GENERATION_MODEL_NAME`**: Identifier or path for the generative model used to produce responses.

## API Reference

The primary API endpoint for interacting with the document ingestion service is described below. For full details and interactive testing, refer to the automatically generated OpenAPI documentation available at `/docs` when the server is running.

### `POST /ingest-document`

Uploads a document file to the backend service for text extraction and subsequent ingestion into the ensemble RAG system.

*   **Method**: `POST`
*   **URL**: `/ingest-document`
*   **Request Body**: `multipart/form-data`
    *   **`file`** (File, Required): The document file to be uploaded. Supported formats include `.pdf`, `.txt`, `.md`, and `.json`.
*   **Responses**:
    *   **`200 OK`**: Document successfully uploaded and scheduled for background processing.
        ```json
        {
          "message": "Document uploaded and scheduled for ingestion.",
          "filename": "example.pdf"
        }
        ```
    *   **`400 Bad Request`**: Indicates an issue with the request, such as no file being provided or an unsupported file type.
    *   **`500 Internal Server Error`**: Signifies a server-side error during file handling, text extraction, or background task scheduling.

## Contributing

Contributions to this project are welcome! If you'd like to contribute, please follow these guidelines:

1.  **Fork the repository:** Start by forking the `ArifRahaman/backend_MsK` repository to your GitHub account.
2.  **Create a new branch:** For each feature or bug fix, create a dedicated branch from `main`:
    ```bash
    git checkout -b feature/your-feature-name
    ```
    (e.g., `feature/add-new-file-type` or `bugfix/fix-pdf-parsing`)
3.  **Make your changes:** Implement your feature or fix the bug.
4.  **Commit your changes:** Write clear and concise commit messages.
    ```bash
    git commit -m 'feat: Add support for DOCX file type'
    ```
5.  **Push to the branch:** Upload your local branch to your forked repository:
    ```bash
    git push origin feature/your-feature-name
    ```
6.  **Open a Pull Request (PR):** Navigate to the original repository on GitHub and open a pull request from your new branch to the `main` branch. Provide a detailed description of your changes.

Please ensure your code adheres to existing style guidelines, includes appropriate tests, and passes all existing checks before submitting a PR.

## License

This project is licensed under the MIT License. A copy of the license can be found in the `LICENSE` file within this repository.