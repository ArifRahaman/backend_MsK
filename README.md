# Random Todo API

Welcome to the Random Todo API, a simple and efficient backend service for managing todo tasks. This API allows you to create, retrieve, update, and delete todos using RESTful endpoints.

## Features

- **Create a Todo**: Add new todo tasks with a unique identifier.
- **List Todos**: Retrieve a list of all existing todos.
- **Get a Todo**: Fetch details of a specific todo by ID.
- **Update a Todo**: Modify the details of an existing todo.
- **Delete a Todo**: Remove a todo from the list.

## Tech Stack

- **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python 3.7+.
- **Pydantic**: Data validation and settings management using Python type annotations.
- **UUID**: For generating unique identifiers for each todo.

## Installation Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/ArifRahaman/backend_MsK.git
   cd backend_MsK
   ```

2. Set up a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the requirements:
   ```bash
   pip install fastapi uvicorn
   ```

4. Run the application:
   ```bash
   uvicorn index:app --reload
   ```

## Usage Guide

Once the application is running, you can access the API using an HTTP client like `curl` or Postman.

### Example Requests

- **Create a Todo**:
  ```bash
  curl -X POST "http://127.0.0.1:8000/todos" -H "Content-Type: application/json" -d '{"title": "Buy groceries", "description": "Milk, Bread, Butter"}'
  ```

- **List Todos**:
  ```bash
  curl -X GET "http://127.0.0.1:8000/todos"
  ```

- **Get a Todo**:
  ```bash
  curl -X GET "http://127.0.0.1:8000/todos/{todo_id}"
  ```

- **Update a Todo**:
  ```bash
  curl -X PUT "http://127.0.0.1:8000/todos/{todo_id}" -H "Content-Type: application/json" -d '{"title": "Buy groceries", "description": "Milk, Bread, Eggs"}'
  ```

- **Delete a Todo**:
  ```bash
  curl -X DELETE "http://127.0.0.1:8000/todos/{todo_id}"
  ```

## API Reference

### Endpoints

- `GET /`: Welcome message.
- `POST /todos`: Create a new todo. Requires a JSON body with `title` and optional `description`.
- `GET /todos`: List all todos.
- `GET /todos/{todo_id}`: Retrieve a specific todo by its ID.
- `PUT /todos/{todo_id}`: Update a specific todo. Requires a JSON body with `title` and optional `description`.
- `DELETE /todos/{todo_id}`: Delete a specific todo by its ID.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---
> 🤖 *Last automated update: 2026-02-23 09:40:04*