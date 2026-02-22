# Ensemble RAG (3-Model Consensus) Backend Service

This repository hosts the backend service for an Ensemble RAG (Retrieval Augmented Generation) system. It is specifically designed for processing and ingesting various document types (PDF, TXT, MD, JSON) to facilitate a 3-Model Consensus approach for robust information retrieval and knowledge synthesis. The service allows users to securely upload documents, extracts their text content, and seamlessly integrates this content into a RAG pipeline for advanced querying.

## Features

- **Document Ingestion**: Supports secure upload of various document types including PDF, TXT, Markdown, and JSON files via a dedicated `/uploadfile/` endpoint.
- **Intelligent Text Extraction**: Utilizes `pypdf` for robust text extraction from PDF files and standard file reading for other text-based formats (TXT, MD, JSON).
- **Background Processing**: Leverages FastAPI's `BackgroundTasks` to handle computationally intensive text extraction and RAG ingestion processes asynchronously, ensuring a responsive API.
- **Ensemble RAG Integration**: Designed to integrate with a "3-Model Consensus" RAG logic (via a custom `rag_logic` module), enabling sophisticated information retrieval and knowledge synthesis.
- **RESTful API**: Provides a dedicated `POST` endpoint (`/uploadfile/`) for handling file uploads and initiating the ingestion process.
- **Temporary File Storage**: Uploaded files are temporarily stored in a designated `uploads` directory before processing.
- **Environment Variable Management**: Utilizes `python-dotenv` to manage sensitive configuration details, enhancing security and deployment flexibility.
- **Structured Logging**: Incorporates Python's built-in `logging` module for comprehensive server activity, file processing, and error handling, aiding in development and debugging.

## Tech Stack

- **Python**: The core programming language for the backend logic.
- **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.
- **Uvicorn**: An ASGI server, used to run the FastAPI application.
- **`pypdf`**: A pure-Python PDF library capable of splitting, merging, cropping, and transforming PDF pages, and specifically used here for efficient text extraction.
- **`python-dotenv`**: A zero-dependency module that loads environment variables from a `.env` file into `os.environ`.
- **`logging`**: Python's built-in module for emitting log messages throughout the application.
- **`pathlib`**: Python's object-oriented filesystem paths module, used for handling file paths efficiently.
- **`rag_logic`**: (Custom module) The core logic implementation for the 3-Model Ensemble RAG system, responsible for processing extracted text and integrating it into the retrieval augmented generation pipeline.

## Installation Instructions

Follow these steps to set up and run the backend service locally:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/ArifRahaman/backend_MsK.git
    cd backend_MsK
    ```

2. **Create a virtual environment (recommended):**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. **Install dependencies:**
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

4. **Create a `.env` file:**
    In the root directory of the project, create a file named `.env` and configure your environment variables.

## Usage Guide

To run the application, use the following command:
```bash
uvicorn index:app --reload
```

This will start the FastAPI server on `http://127.0.0.1:8000`. You can access the API documentation at `http://127.0.0.1:8000/docs`.

## Environment Variables

Create a `.env` file in the root directory to manage environment-specific configurations and sensitive information. Example configurations might include API keys or database connection strings.

## API Reference

Here are the main API endpoints provided by this service:

- **GET /**: Returns a welcome message.
- **POST /todos**: Creates a new to-do item.
- **GET /todos**: Retrieves a list of all to-do items.
- **GET /todos/{todo_id}**: Retrieves a specific to-do item by ID.
- **PUT /todos/{todo_id}**: Updates a specific to-do item by ID.
- **DELETE /todos/{todo_id}**: Deletes a specific to-do item by ID.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue for any bugs or improvements. Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/YourFeature`).
6. Open a Pull Request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---
> 🤖 *Last automated update: 2026-02-22 20:14:55*