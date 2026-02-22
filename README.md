# Random Todo API Backend Service

This repository hosts a simple, in-memory RESTful API for managing todo items. Built with FastAPI, this service provides standard CRUD (Create, Read, Update, Delete) operations, allowing users to efficiently manage their tasks. It's designed for simplicity and ease of use, making it an excellent starting point for learning FastAPI or as a backend for a quick todo application.

## Features

* **Todo Management (CRUD)**: Full support for creating, retrieving, updating, and deleting todo items.
* **RESTful API**: Exposes clear and intuitive endpoints following REST principles for task management.
* **In-Memory Storage**: Todo items are stored in a dictionary within the application's memory, providing a non-persistent data store ideal for demonstration or temporary use cases.
* **FastAPI Framework**: Leverages the high performance and developer-friendly features of FastAPI for rapid API development.
* **Pydantic Models**: Ensures robust data validation and serialization for incoming requests and outgoing responses, maintaining data integrity.
* **Unique ID Generation**: Automatically assigns unique identifiers (UUIDs) to each todo item upon creation.
* **Interactive API Documentation**: FastAPI automatically generates interactive API documentation (Swagger UI / ReDoc) for easy exploration and testing of endpoints.

## Tech Stack

* **Python**: The core programming language used for the backend logic.
* **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.
* **Uvicorn**: An ASGI server, essential for running the FastAPI application.
* **Pydantic**: Used for data validation and settings management, ensuring type safety and clear data structures.
* **`uuid`**: Python's built-in module for generating universally unique identifiers.

## Installation Instructions

Follow these steps to set up and run the Todo API backend service locally:

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
    Create a `requirements.txt` file in the root of your project with the following content:
    ```
    fastapi
    uvicorn
    pydantic
    ```
    Then, install the dependencies using pip:
    ```bash
    pip install -r requirements.txt
    ```

## Usage Guide

To run the application and interact with the API:

1. **Start the API server:**
    Navigate to the project's root directory in your terminal and run the following command:
    ```bash
    uvicorn index:app --reload
    ```
    This command starts the Uvicorn server, running your FastAPI application (`app` object from `index.js`). The `--reload` flag enables auto-reloading on code changes, which is useful for development.

## API Reference

### Endpoints

- **GET /**: Returns a welcome message.
- **POST /todos**: Create a new todo item.
  - Request body: `{"title": "string", "description": "string (optional)"}`
  - Response: `{"id": "string", "title": "string", "description": "string", "completed": false}`
- **GET /todos**: Retrieve a list of all todo items.
  - Response: `[{"id": "string", "title": "string", "description": "string", "completed": false}, ...]`
- **GET /todos/{todo_id}**: Retrieve a specific todo item by its ID.
  - Response: `{"id": "string", "title": "string", "description": "string", "completed": false}`
- **PUT /todos/{todo_id}**: Update an existing todo item.
  - Request body: `{"title": "string", "description": "string (optional)"}`
  - Response: `{"id": "string", "title": "string", "description": "string", "completed": false}`
- **DELETE /todos/{todo_id}**: Delete a specific todo item by its ID.
  - Response: `{"message": "Todo deleted successfully"}`

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. Ensure your code adheres to the existing style and include tests for any new features.

## License

This project is open source and available under the MIT License.

---
> 🤖 *Last automated update: 2026-02-22 20:24:48*