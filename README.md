# Random Todo API

Welcome to the Random Todo API, a simple and efficient API for managing your todo tasks. This API allows you to create, update, delete, and retrieve todo items with ease.

## Features

- Create a new todo item
- Retrieve a specific todo item by ID
- Update an existing todo item
- Delete a todo item
- Simple and intuitive interface

## Tech Stack

- **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python 3.7+.
- **Python**: Programming language used for the backend logic.
- **UUID**: Used for generating unique identifiers for todo items.
- **Pydantic**: Data validation and settings management using Python type annotations.

## Installation Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ArifRahaman/backend_MsK.git
   cd backend_MsK
   ```

2. **Install dependencies**:
   Make sure you have Python and pip installed, then run:
   ```bash
   pip install fastapi uvicorn
   ```

## Usage Guide

To start the FastAPI server, run the following command:
```bash
uvicorn index:app --reload
```
The server will start and you can interact with it using the endpoints described below.

## API Reference

### GET /

- **Description**: Welcome endpoint
- **Response**:
  ```json
  {
    "message": "Welcome to Random Todo API 🚀"
  }
  ```

### POST /todos

- **Description**: Create a new todo item
- **Request Body**:
  ```json
  {
    "title": "string",
    "description": "string"
  }
  ```
- **Response**:
  ```json
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "completed": false
  }
  ```

### GET /todos/{todo_id}

- **Description**: Retrieve a todo by its ID
- **Response**:
  ```json
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "completed": false
  }
  ```

### PUT /todos/{todo_id}

- **Description**: Update an existing todo item
- **Request Body**:
  ```json
  {
    "title": "string",
    "description": "string"
  }
  ```
- **Response**:
  ```json
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "completed": false
  }
  ```

### DELETE /todos/{todo_id}

- **Description**: Delete a todo by its ID
- **Response**: `204 No Content` on successful deletion

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or feature requests.

## License

This project is open source and available under the [MIT License](LICENSE).

---
> 🤖 *Last automated update: 2026-02-23 23:47:17*