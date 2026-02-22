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

Run the FastAPI application using Uvicorn:
```bash
uvicorn index:app --reload
```

Once the server is running, you can interact with the API endpoints as described in the API Reference section.

## Environment Variables

The application uses environment variables for configuration. Ensure you have a `.env` file in the root directory with necessary configuration details, such as:

```
# Example environment variables
DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key
```

## API Reference

### Endpoints

- **GET /**: Welcome message.
  
  **Response**: 
  ```json
  {
    "message": "Welcome to Random Todo API 🚀"
  }
  ```

- **POST /todos**: Create a new todo item.
  
  **Request Body**:
  ```json
  {
    "title": "Sample Todo",
    "description": "This is a sample todo item"
  }
  ```

  **Response**:
  ```json
  {
    "id": "unique-id",
    "title": "Sample Todo",
    "description": "This is a sample todo item",
    "completed": false
  }
  ```

- **GET /todos**: List all todo items.

  **Response**:
  ```json
  [
    {
      "id": "unique-id",
      "title": "Sample Todo",
      "description": "This is a sample todo item",
      "completed": false
    }
  ]
  ```

- **GET /todos/{todo_id}**: Retrieve a specific todo item by ID.

  **Response**:
  ```json
  {
    "id": "unique-id",
    "title": "Sample Todo",
    "description": "This is a sample todo item",
    "completed": false
  }
  ```

- **PUT /todos/{todo_id}**: Update a specific todo item by ID.

  **Request Body**:
  ```json
  {
    "title": "Updated Todo",
    "description": "Updated description"
  }
  ```

  **Response**:
  ```json
  {
    "id": "unique-id",
    "title": "Updated Todo",
    "description": "Updated description",
    "completed": false
  }
  ```

- **DELETE /todos/{todo_id}**: Delete a specific todo item by ID.

  **Response**:
  ```json
  {
    "message": "Todo deleted successfully"
  }
  ```

## Contributing

Contributions are welcome! Please fork the repository and use a feature branch. Pull requests are warmly welcome.

1. Fork the repository.
2. Create your feature branch: `git checkout -b my-feature-branch`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-feature-branch`
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
> 🤖 *Last automated update: 2026-02-22 20:07:00*