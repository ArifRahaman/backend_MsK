# Random Todo API

Welcome to the Random Todo API, a simple yet efficient backend service for managing todo tasks. This API allows users to create, retrieve, update, and manage todo items in a straightforward manner.

## Features

- **Create a Todo**: Add new todo items with a title and optional description.
- **Read All Todos**: Retrieve a list of all todos.
- **Read a Single Todo**: Fetch details of a specific todo using its ID.
- **Update a Todo**: Modify existing todo details such as title, description, and completion status.

## Tech Stack

- **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python 3.7+.
- **Pydantic**: Data validation and settings management using Python type annotations.

## Installation Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/ArifRahaman/backend_MsK.git
   cd backend_MsK
   ```

2. Install the required dependencies:
   ```bash
   pip install fastapi uvicorn pydantic
   ```

## Usage Guide

To start the FastAPI server, run the following command:

```bash
uvicorn index:app --reload
```

Once the server is running, you can interact with the API using any HTTP client or tool like `curl`, `Postman`, etc.

### Examples

- **Create a Todo**:
  ```bash
  curl -X POST "http://127.0.0.1:8000/todos" -H "Content-Type: application/json" -d '{"title": "Sample Todo", "description": "This is a sample todo item"}'
  ```

- **Retrieve All Todos**:
  ```bash
  curl "http://127.0.0.1:8000/todos"
  ```

- **Retrieve a Specific Todo**:
  ```bash
  curl "http://127.0.0.1:8000/todos/{todo_id}"
  ```

- **Update a Todo**:
  ```bash
  curl -X PUT "http://127.0.0.1:8000/todos/{todo_id}" -H "Content-Type: application/json" -d '{"completed": true}'
  ```

## Environment Variables

There are no specific environment variables required for this project.

## API Reference

- **GET /**: Welcome message.
- **POST /todos**: Create a new todo.
  - Request Body:
    - `title`: str (required)
    - `description`: str (optional)
- **GET /todos**: Retrieve all todos.
- **GET /todos/{todo_id}**: Retrieve a specific todo by ID.
- **PUT /todos/{todo_id}**: Update an existing todo.
  - Request Body:
    - `title`: str (optional)
    - `description`: str (optional)
    - `completed`: bool (optional)

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.

---
> 🤖 *Last automated update: 2026-02-24 16:09:58*