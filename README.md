# Random Todo API

Welcome to the Random Todo API! This API allows you to create, read, update, and delete todo items in a simple and efficient manner.

## Features

- **Create Todo Items**: Add new todo items with a title and optional description.
- **Read Todo Items**: Retrieve details of a specific todo item using its unique ID.
- **Update Todo Items**: Modify the title and description of existing todo items.
- **Delete Todo Items**: Remove todo items by their unique ID.

## Tech Stack

- **FastAPI**: A modern, fast (high-performance), web framework for building APIs with Python 3.6+.
- **Python**: The programming language used for developing this API.
- **UUID**: Utilized for generating unique identifiers for each todo item.

## Installation Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ArifRahaman/backend_MsK.git
   cd backend_MsK
   ```

2. **Install dependencies**:
   Ensure you have Python installed, then run:
   ```bash
   pip install fastapi pydantic
   ```

3. **Run the application**:
   You can run the FastAPI application using Uvicorn:
   ```bash
   uvicorn index:app --reload
   ```

## Usage Guide

After running the application, you can interact with the API using HTTP requests.

### Examples:

- **Welcome Message**:
  - **GET** `/`
  - Response: `{"message": "Welcome to Random Todo API 🚀"}`

- **Create a Todo**:
  - **POST** `/todos`
  - Request Body:
    ```json
    {
      "title": "Sample Todo",
      "description": "This is a sample todo item."
    }
    ```
  - Response: 
    ```json
    {
      "id": "unique-id",
      "title": "Sample Todo",
      "description": "This is a sample todo item.",
      "completed": false
    }
    ```

- **Get a Todo**:
  - **GET** `/todos/{todo_id}`
  - Response: 
    ```json
    {
      "id": "unique-id",
      "title": "Sample Todo",
      "description": "This is a sample todo item.",
      "completed": false
    }
    ```

- **Update a Todo**:
  - **PUT** `/todos/{todo_id}`
  - Request Body:
    ```json
    {
      "title": "Updated Title",
      "description": "Updated Description"
    }
    ```
  - Response: 
    ```json
    {
      "id": "unique-id",
      "title": "Updated Title",
      "description": "Updated Description",
      "completed": false
    }
    ```

- **Delete a Todo**:
  - **DELETE** `/todos/{todo_id}`
  - Response: Status code 204 (No Content)

## API Reference

### Endpoints

- **GET** `/`: Returns a welcome message.
- **POST** `/todos`: Creates a new todo item.
- **GET** `/todos/{todo_id}`: Retrieves a specific todo item by ID.
- **PUT** `/todos/{todo_id}`: Updates an existing todo item.
- **DELETE** `/todos/{todo_id}`: Deletes a todo item by ID.

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests for any enhancements or bug fixes. Ensure your code adheres to the project's coding standards.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---
> 🤖 *Last automated update: 2026-02-24 12:33:18*