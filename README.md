# Random Todo API

Welcome to the Random Todo API, a simple and efficient API for managing your todo tasks. Built with FastAPI, this project allows users to create, retrieve, update, and delete todo items seamlessly.

## Features

- **Create Todo**: Add new tasks with a title and optional description.
- **Retrieve Todo**: Fetch a specific todo item using its unique ID.
- **Update Todo**: Modify the title or description of an existing todo.
- **Delete Todo**: Remove a todo item from the list.

## Tech Stack

- **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python 3.6+.
- **Pydantic**: Data validation and settings management using Python type annotations.
- **UUID**: Generate unique identifiers for todo items.

## Installation Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ArifRahaman/backend_MsK.git
   cd backend_MsK
   ```

2. **Install dependencies**:
   Ensure you have Python 3.6+ installed, then run:
   ```bash
   pip install fastapi pydantic uvicorn
   ```

3. **Run the application**:
   Start the FastAPI server using Uvicorn:
   ```bash
   uvicorn index:app --reload
   ```

## Usage Guide

Once the application is running, you can interact with the API using tools like curl or Postman.

### Examples

- **Create a Todo**:
  ```bash
  curl -X POST "http://localhost:8000/todos" -H "Content-Type: application/json" -d '{"title": "Buy groceries", "description": "Milk, Bread, Eggs"}'
  ```

- **Get a Todo**:
  ```bash
  curl -X GET "http://localhost:8000/todos/{todo_id}"
  ```

- **Update a Todo**:
  ```bash
  curl -X PUT "http://localhost:8000/todos/{todo_id}" -H "Content-Type: application/json" -d '{"title": "Buy groceries", "description": "Milk, Bread, Eggs, Cheese"}'
  ```

- **Delete a Todo**:
  ```bash
  curl -X DELETE "http://localhost:8000/todos/{todo_id}"
  ```

## API Reference

### Endpoints

- **GET /**:
  - **Description**: Welcome message.
  - **Response**: `{ "message": "Welcome to Random Todo API 🚀" }`

- **POST /todos**:
  - **Description**: Create a new todo.
  - **Request Body**: 
    - `title`: string (required)
    - `description`: string (optional)
  - **Response**: JSON object of the created todo.

- **GET /todos/{todo_id}**:
  - **Description**: Retrieve a todo by its ID.
  - **Response**: JSON object of the todo.

- **PUT /todos/{todo_id}**:
  - **Description**: Update a todo's title and description.
  - **Request Body**: 
    - `title`: string (required)
    - `description`: string (optional)
  - **Response**: JSON object of the updated todo.

- **DELETE /todos/{todo_id}**:
  - **Description**: Delete a todo by its ID.
  - **Response**: Status code 204 if successful.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

---
> 🤖 *Last automated update: 2026-02-24 10:20:46*