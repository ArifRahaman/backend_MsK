# Random Todo API

Welcome to the Random Todo API! This project provides a simple backend service for managing todo items. Developed using FastAPI, it allows users to create and manage todo tasks effectively.

## Features

- **Create New Todo**: Add new todo items with a title and optional description.
- **Welcome Message**: A root endpoint that returns a welcome message.

## Tech Stack

- **Python**: The programming language used for development.
- **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python 3.6+.
- **Pydantic**: For data validation and settings management using Python type annotations.

## Installation Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/ArifRahaman/backend_MsK.git
   cd backend_MsK
   ```

2. Install the required packages:

   ```bash
   pip install fastapi pydantic uvicorn
   ```

3. Run the application:

   ```bash
   uvicorn index:app --reload
   ```

## Usage Guide

Once the server is running, you can interact with it using HTTP requests. Below are some examples:

### Welcome Message

- **Endpoint**: `GET /`
- **Description**: Returns a welcome message.

**Example Request**:

```bash
curl -X GET "http://127.0.0.1:8000/"
```

**Example Response**:

```json
{
  "message": "Welcome to Random Todo API 🚀"
}
```

### Create a Todo

- **Endpoint**: `POST /todos`
- **Description**: Create a new todo item.

**Example Request**:

```bash
curl -X POST "http://127.0.0.1:8000/todos" -H "Content-Type: application/json" -d '{"title": "Buy groceries", "description": "Milk, Bread, Cheese"}'
```

**Example Response**:

```json
{
  "id": "unique-todo-id",
  "title": "Buy groceries",
  "description": "Milk, Bread, Cheese",
  "completed": false
}
```

## Environment Variables

No environment variables are required for this project.

## API Reference

### GET /

- **Description**: Returns a welcome message.
- **Response**: JSON object with a welcome message.

### POST /todos

- **Description**: Create a new todo item.
- **Request Body**: JSON object with the following fields:
  - `title`: (string) The title of the todo item.
  - `description`: (string, optional) A description of the todo item.
- **Response**: JSON object representing the created todo item.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any features or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---
> 🤖 *Last automated update: 2026-02-24 16:07:35*