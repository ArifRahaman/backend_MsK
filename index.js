from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import uuid

app = FastAPI(title="Random Todo API")

# In-memory database
todos = {}

# --- Pydantic Models ---
class TodoCreate(BaseModel):
    title: str
    description: str | None = None

class TodoUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    completed: bool | None = None

class Todo(TodoCreate):
    id: str
    completed: bool = False

#

@app.get("/")
def root():
    return {"message": "Welcome to Random Todo API 🚀"}

# 1. Create a Todo (Your existing code)
@app.post("/todos", response_model=Todo)
def create_todo(todo: TodoCreate):
    todo_id = str(uuid.uuid4())
    # Note: If you are using Pydantic v2, .model_dump() is preferred over .dict()
    new_todo = Todo(id=todo_id, **todo.dict())
    todos[todo_id] = new_todo
    return new_todo

# 2. Read All Todos
@app.get("/todos", response_model=List[Todo])
def get_all_todos():
    """Retrieve all todos in the database."""
    return list(todos.values())

# 3. Read a Single Todo
@app.get("/todos/{todo_id}", response_model=Todo)
def get_todo(todo_id: str):
    """Retrieve a specific todo by its ID."""
    if todo_id not in todos:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todos[todo_id]

# 4. Update a Todo
@app.put("/todos/{todo_id}", response_model=Todo)
def update_todo(todo_id: str, todo_update: TodoUpdate):
    """Update fields on an existing todo (e.g., mark as completed)."""
    if todo_id not in todos:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    existing_todo = todos[todo_id]
    
    # exclude_unset=True ensures we only update fields the user actually sent
    update_data = todo_update.dict(exclude_unset=True) 
    
    for key, value in update_data.items():
        setattr(existing_todo, key, value)
        
    todos[todo_id] = existing_todo
    return existing_todo

# 5. Delete a Todo
@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: str):
    """Delete a todo from the database."""
    if todo_id not in todos:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    del todos[todo_id]
    return {"message": f"Todo {todo_id} deleted successfully"}
