# Random Todo API Backend Service

This repository hosts a simple, in-memory RESTful API for managing todo items. Built with FastAPI, this service provides standard CRUD (Create, Read, Update, Delete) operations, allowing users to efficiently manage their tasks. It's designed for simplicity and ease of use, making it an excellent starting point for learning FastAPI or as a backend for a quick todo application.

## Features

*   **Todo Management (CRUD)**: Full support for creating, retrieving, updating, and deleting todo items.
*   **RESTful API**: Exposes clear and intuitive endpoints following REST principles for task management.
*   **In-Memory Storage**: Todo items are stored in a dictionary within the application's memory, providing a non-persistent data store ideal for demonstration or temporary use cases.
*   **FastAPI Framework**: Leverages the high performance and developer-friendly features of FastAPI for rapid API development.
*   **Pydantic Models**: Ensures robust data validation and serialization for incoming requests and outgoing responses, maintaining data integrity.
*   **Unique ID Generation**: Automatically assigns unique identifiers (UUIDs) to each todo item upon creation.
*   **Interactive API Documentation**: FastAPI automatically generates interactive API documentation (Swagger UI / ReDoc) for easy exploration and testing of endpoints.

## Tech Stack

*   **Python**: The core programming language used for the backend logic.
*   **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.
*   **Uvicorn**: An ASGI server, essential for running the FastAPI application.
*   **Pydantic**: Used for data validation and settings management, ensuring type safety and clear data structures.
*   **`uuid`**: Python's built-in module for generating universally unique identifiers.

## Installation Instructions

Follow these steps to set up and run the Todo API backend service locally:

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
    Create a `requirements.txt` file in the root of your project with the following content:
    ```
    fastapi
    uvicorn
    pydantic # Although often a dependency of FastAPI, it's good practice to list explicitly if models are used
    ```
    Then, install the dependencies using pip:
    ```bash
    pip install -r requirements.txt
    ```

## Usage Guide

To run the application and interact with the API:

1.  **Start the API server:**
    Navigate to the project's root directory in your terminal and run the following command:
    ```bash
    uvicorn index:app --reload
    ```
    This command starts the Uvicorn server, running your FastAPI application (`app` object from `index.js`). The `--reload` flag enables auto-reloading on code changes, which is useful for development.

    You should see output indicating that the server is running, typically on `http://127.0.0.1:8000`.

2.  **Access API Documentation:**
    Once the server is running, you can access the interactive API documentation (Swagger UI) at:
    `http://127.0.0.1:8000/docs`

    Or ReDoc at:
    `http://127.0.0.1:8000/redoc`

3.  **Interact with the API (using curl examples):**

    *   **Get a welcome message:**
        ```bash
        curl http://127.0.0.1:8000/
        ```
        Expected Output:
        ```json
        {"message": "Welcome to Random Todo API 🚀"}
        ```

    *   **Create a new todo:**
        ```bash
        curl -X POST \
             -H "Content-Type: application/json" \
             -d '{"title": "Learn FastAPI", "description": "Dive deep into FastAPI documentation and examples."}' \
             http://127.0.0.1:8000/todos
        ```
        Expected Output (with a generated `id`):
        ```json
        {"title":"Learn FastAPI","description":"Dive deep into FastAPI documentation and examples.","id":"<some-uuid>","completed":false}
        ```
        *Note down the `id` from the response for subsequent operations.*

    *   **Create another todo:**
        ```bash
        curl -X POST \
             -H "Content-Type: application/json" \
             -d '{"title": "Build a simple app"}' \
             http://127.0.0.1:8000/todos
        ```

    *   **List all todos:**
        ```bash
        curl http://127.0.0.1:8000/todos
        ```
        Expected Output:
        ```json
        [
          {"title":"Learn FastAPI","description":"Dive deep into FastAPI documentation and examples.","id":"<first-uuid>","completed":false},
          {"title":"Build a simple app","description":null,"id":"<second-uuid>","completed":false}
        ]
        ```

    *   **Get a specific todo by ID:**
        (Replace `<todo_id>` with an actual ID from a created todo)
        ```bash
        curl http://127.0.0.1:8000/todos/<todo_id>
        ```
        Expected Output:
        ```json
        {"title":"Learn FastAPI","description":"Dive deep into FastAPI documentation and examples.","id":"<todo_id>","completed":false}
        ```

    *   **Update a todo by ID:**
        (Replace `<todo_id>` with an actual ID)
        ```bash
        curl -X PUT \
             -H "Content-Type: application/json" \
             -d '{"title": "Master FastAPI", "description": "Become an expert in building performant APIs with FastAPI."}' \
             http://127.0.0.1:8000/todos/<todo_id>
        ```
        Expected Output:
        ```json
        {"title":"Master FastAPI","description":"Become an expert in building performant APIs with FastAPI.","id":"<todo_id>","completed":false}
        ```

    *   **Delete a todo by ID:**
        (Replace `<todo_id>` with an actual ID)
        ```bash
        curl -X DELETE http://127.0.0.1:8000/todos/<todo_id>
        ```
        Expected Output:
        ```json
        {"message": "Todo deleted successfully"}
        ```

## Environment Variables

This project currently does not utilize any explicit environment variables configured via a `.env` file. All configurations are handled directly within the `index.js` file.

## API Reference

The following endpoints are available:

### `GET /`

*   **Description**: Returns a welcome message.
*   **Method**: `GET`
*   **Response**:
    *   `200 OK`:
        ```json
        {"message": "Welcome to Random Todo API 🚀"}
        ```

### `POST /todos`

*   **Description**: Creates a new todo item.
*   **Method**: `POST`
*   **Request Body (`application/json`)**:
    *   `title` (string, **required**): The title of the todo.
    *   `description` (string, optional): A longer description of the todo.
*   **Response**:
    *   `200 OK`: The newly created todo item, including its generated `id` and `completed` status.
        ```json
        {
          "title": "string",
          "description": "string | null",
          "id": "string (uuid)",
          "completed": false
        }
        ```

### `GET /todos`

*   **Description**: Retrieves a list of all existing todo items.
*   **Method**: `GET`
*   **Response**:
    *   `200 OK`: A list of todo items.
        ```json
        [
          {
            "title": "string",
            "description": "string | null",
            "id": "string (uuid)",
            "completed": false
          }
        ]
        ```

### `GET /todos/{todo_id}`

*   **Description**: Retrieves a single todo item by its unique ID.
*   **Method**: `GET`
*   **Path Parameters**:
    *   `todo_id` (string, **required**): The unique identifier of the todo item.
*   **Response**:
    *   `200 OK`: The requested todo item.
        ```json
        {
          "title": "string",
          "description": "string | null",
          "id": "string (uuid)",
          "completed": false
        }
        ```
    *   `404 Not Found`: If no todo with the given `todo_id` exists.
        ```json
        {"detail": "Todo not found"}
        ```

### `PUT /todos/{todo_id}`

*   **Description**: Updates an existing todo item identified by its ID.
*   **Method**: `PUT`
*   **Path Parameters**:
    *   `todo_id` (string, **required**): The unique identifier of the todo item to update.
*   **Request Body (`application/json`)**:
    *   `title` (string, **required**): The new title for the todo.
    *   `description` (string, optional): The new description for the todo.
*   **Response**:
    *   `200 OK`: The updated todo item.
        ```json
        {
          "title": "string",
          "description": "string | null",
          "id": "string (uuid)",
          "completed": false
        }
        ```
    *   `404 Not Found`: If no todo with the given `todo_id` exists.
        ```json
        {"detail": "Todo not found"}
        ```

### `DELETE /todos/{todo_id}`

*   **Description**: Deletes a todo item by its unique ID.
*   **Method**: `DELETE`
*   **Path Parameters**:
    *   `todo_id` (string, **required**): The unique identifier of the todo item to delete.
*   **Response**:
    *   `200 OK`: A confirmation message that the todo was deleted successfully.
        ```json
        {"message": "Todo deleted successfully"}
        ```
    *   `404 Not Found`: If no todo with the given `todo_id` exists.
        ```json
        {"detail": "Todo not found"}
        ```

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

Please ensure your code adheres to good practices and includes appropriate tests if applicable.

## License

This project is licensed under the MIT License. See the `LICENSE` file (if present) or refer to the repository for full details.