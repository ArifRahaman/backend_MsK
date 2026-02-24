# Random Todo API

Welcome to the Random Todo API, a simple RESTful API built with FastAPI for managing todo tasks. The API allows you to create, read, update, and delete todo items.

## Features

- **Create Todo**: Add new todo items with a title and optional description.
- **Read Todos**: Retrieve a specific todo item by its ID.
- **Update Todo**: Modify the title and description of an existing todo item.
- **Delete Todo**: Remove a todo item by its ID.

## Tech Stack

- **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python 3.7+.
- **Pydantic**: Data validation and settings management using Python type annotations.
- **UUID**: For generating unique identifiers for todo items.

## Installation Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ArifRahaman/backend_MsK.git
   cd backend_MsK
   ```

2. **Install dependencies**:
   Ensure you have Python 3.7+ installed, then run:
   ```bash
   pip install fastapi uvicorn pydantic
   ```

## Usage Guide

1. **Run the server**:
   Use Uvicorn to start the FastAPI server:
   ```bash
   uvicorn index:app --reload
   ```

2. **Access the API**:
   Open your browser or API client and navigate to `http://127.0.0.1:8000` to view the API documentation and test endpoints.

## API Reference

### Get Welcome Message

- **Endpoint**: `/`
- **Method**: GET
- **Response**:
  ```json
  {
    "message": "Welcome to Random Todo API 🚀"
  }
  ```

### Create Todo

- **Endpoint**: `/todos`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "title": "Your todo title",
    "description": "Optional description"
  }
  ```
- **Response**:
  ```json
  {
    "id": "Unique ID",
    "title": "Your todo title",
    "description": "Optional description",
    "completed": false
  }
  ```

### Get Todo

- **Endpoint**: `/todos/{todo_id}`
- **Method**: GET
- **Response**:
  ```json
  {
    "id": "Unique ID",
    "title": "Existing todo title",
    "description": "Existing description",
    "completed": false
  }
  ```

### Update Todo

- **Endpoint**: `/todos/{todo_id}`
- **Method**: PUT
- **Request Body**:
  ```json
  {
    "title": "Updated title",
    "description": "Updated description"
  }
  ```
- **Response**:
  ```json
  {
    "id": "Unique ID",
    "title": "Updated title",
    "description": "Updated description",
    "completed": false
  }
  ```

### Delete Todo

- **Endpoint**: `/todos/{todo_id}`
- **Method**: DELETE
- **Response**: `204 No Content` on successful deletion

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---
> 🤖 *Last automated update: 2026-02-24 16:06:23*