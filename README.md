# Random Todo API

Welcome to the Random Todo API! This project is a simple FastAPI application that allows users to create and manage todo items. Whether you're building a productivity app or just experimenting with APIs, this project provides a basic foundation for handling todo tasks.

## Features

- **Create Todo**: Add new todo items with a title and optional description.
- **Retrieve Todo**: Fetch details of a specific todo item using its unique ID.
- **Welcome Message**: Access a root endpoint that welcomes you to the API.

## Tech Stack

- **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python.
- **Python**: The programming language used for developing this application.
- **UUID**: Utilized for generating unique identifiers for todo items.
- **Pydantic**: Used for data validation and settings management.

## Installation Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ArifRahaman/backend_MsK.git
   cd backend_MsK
   ```

2. **Install dependencies**:
   Ensure you have Python and pip installed. Then run:
   ```bash
   pip install fastapi uvicorn pydantic
   ```

3. **Run the application**:
   Use Uvicorn to serve the FastAPI application:
   ```bash
   uvicorn index:app --reload
   ```

## Usage Guide

To interact with the Random Todo API, follow these examples:

- **Welcome Message**: 
  - Endpoint: `GET /`
  - Example: Open a browser and navigate to `http://127.0.0.1:8000/` to see the welcome message.

- **Create Todo**:
  - Endpoint: `POST /todos`
  - Example:
    ```json
    {
      "title": "Buy groceries",
      "description": "Milk, Bread, Eggs"
    }
    ```
  - Use a tool like Postman or `curl` to send a POST request with the above JSON payload to `http://127.0.0.1:8000/todos`.

- **Get Todo**:
  - Endpoint: `GET /todos/{todo_id}`
  - Example: Replace `{todo_id}` with the actual ID of the todo you want to retrieve. Send a GET request to `http://127.0.0.1:8000/todos/{todo_id}`.

## API Reference

### Endpoints

- **Root Endpoint**
  - `GET /`
  - **Response**: `{ "message": "Welcome to Random Todo API 🚀" }`

- **Create Todo**
  - `POST /todos`
  - **Request Body**: 
    - `title`: `str` (required)
    - `description`: `str` (optional)
  - **Response**: Todo object with `id`, `title`, `description`, and `completed` status.

- **Get Todo**
  - `GET /todos/{todo_id}`
  - **Path Parameter**: `todo_id`: `str` (required)
  - **Response**: Todo object

## Contributing

Contributions are welcome! If you have ideas for improvements or additional features, feel free to fork the repository and submit a pull request. Make sure to follow the project's coding guidelines.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---
> 🤖 *Last automated update: 2026-02-24 16:07:09*