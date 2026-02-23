# Random Todo API

Welcome to the Random Todo API! This API allows users to manage a list of todos with various endpoints for creating, retrieving, updating, and deleting tasks.

## Features

- **Create Todo**: Add new todos with a title and an optional description.
- **Retrieve Todo**: Get details of a specific todo by ID.
- **Update Todo**: Modify the title and description of an existing todo.
- **Delete Todo**: Remove a todo by ID.

## Tech Stack

- **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python 3.6+.
- **Pydantic**: Data validation and settings management using Python type annotations.
- **UUID**: Used for generating unique identifiers for todos.

## Installation Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/ArifRahaman/backend_MsK.git
   cd backend_MsK
   ```

2. Install dependencies:
   ```bash
   pip install fastapi uvicorn pydantic
   ```

3. Run the application:
   ```bash
   uvicorn index:app --reload
   ```

## Usage Guide

Once the application is running, it can be accessed at `http://127.0.0.1:8000`.

### Examples

- **Welcome Message**: Access the root endpoint to get a welcome message.
  ```bash
  curl http://127.0.0.1:8000/
  ```

- **Create a Todo**:
  ```bash
  curl -X POST "http://127.0.0.1:8000/todos" -H "Content-Type: application/json" -d '{"title": "Sample Task", "description": "This is a sample todo item"}'
  ```

- **Get a Todo**:
  ```bash
  curl http://127.0.0.1:8000/todos/{todo_id}
  ```

- **Update a Todo**:
  ```bash
  curl -X PUT "http://127.0.0.1:8000/todos/{todo_id}" -H "Content-Type: application/json" -d '{"title": "Updated Task", "description": "Updated description"}'
  ```

- **Delete a Todo**:
  ```bash
  curl -X DELETE "http://127.0.0.1:8000/todos/{todo_id}"
  ```

## API Reference

### Endpoints

- **GET /**: Returns a welcome message.
- **POST /todos**: Creates a new todo item. Requires JSON body with `title` and optional `description`.
- **GET /todos/{todo_id}**: Retrieves a todo item by ID.
- **PUT /todos/{todo_id}**: Updates a todo item by ID. Requires JSON body with `title` and optional `description`.
- **DELETE /todos/{todo_id}**: Deletes a todo item by ID.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with any changes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---
> 🤖 *Last automated update: 2026-02-23 23:31:50*