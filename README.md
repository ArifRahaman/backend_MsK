# Random Todo API

Welcome to the Random Todo API! This API allows users to manage a list of todos with functionalities to create, read, update, and delete todo items. It's built with FastAPI, providing a simple and efficient way to manage tasks.

## Features

- **Create Todos:** Add new todo items with a title and optional description.
- **List Todos:** Retrieve a list of all current todo items.
- **Get Todo:** Retrieve a specific todo item by its ID.
- **Update Todo:** Modify the title or description of an existing todo item.
- **Delete Todo:** Remove a todo item from the list.

## Tech Stack

- **FastAPI:** A modern, fast web framework for building APIs with Python 3.6+.
- **Pydantic:** Data validation and settings management using Python type annotations.

## Installation Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ArifRahaman/backend_MsK.git
   cd backend_MsK
   ```

2. **Create a virtual environment and activate it:**

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install the dependencies:**

   ```bash
   pip install fastapi uvicorn pydantic
   ```

4. **Run the application:**

   ```bash
   uvicorn index:app --reload
   ```

## Usage Guide

Once the server is running, you can interact with the API using HTTP requests. Below are some examples using `curl`:

- **Create a Todo:**

  ```bash
  curl -X POST "http://127.0.0.1:8000/todos" -H "Content-Type: application/json" -d '{"title": "Sample Todo", "description": "This is a sample todo item."}'
  ```

- **List Todos:**

  ```bash
  curl -X GET "http://127.0.0.1:8000/todos"
  ```

- **Get a Specific Todo:**

  ```bash
  curl -X GET "http://127.0.0.1:8000/todos/{todo_id}"
  ```

- **Update a Todo:**

  ```bash
  curl -X PUT "http://127.0.0.1:8000/todos/{todo_id}" -H "Content-Type: application/json" -d '{"title": "Updated Todo", "description": "Updated description."}'
  ```

- **Delete a Todo:**

  ```bash
  curl -X DELETE "http://127.0.0.1:8000/todos/{todo_id}"
  ```

## API Reference

### Endpoints

- `GET /`: Returns a welcome message.
- `POST /todos`: Creates a new todo.
- `GET /todos`: Lists all todos.
- `GET /todos/{todo_id}`: Retrieves a specific todo by ID.
- `PUT /todos/{todo_id}`: Updates an existing todo.
- `DELETE /todos/{todo_id}`: Deletes a todo.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is open-source and available under the MIT License.

---
> 🤖 *Last automated update: 2026-02-23 16:29:19*