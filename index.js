from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import uuid
#
app = FastAPI(title="Random Todo API")


todos = {}

class TodoCreate(BaseModel):
    title: str
    description: str | None = None

class Todo(TodoCreate):
    id: str
    completed: bool = False


@app.get("/")
def root():
    return {"message": "Welcome to Random Todo API 🚀"}


@app.post("/todos", response_model=Todo)
def create_todo(todo: TodoCreate):
    todo_id = str(uuid.uuid4())
    new_todo = Todo(id=todo_id, **todo.dict())
    todos[todo_id] = new_todo
    return new_todo


@app.get("/todos", response_model=List[Todo])
def list_todos():
    return list(todos.values())


@app.get("/todos/{todo_id}", response_model=Todo)
def get_todo(todo_id: str):
    if todo_id not in todos:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todos[todo_id]


@app.put("/todos/{todo_id}", response_model=Todo)
def update_todo(todo_id: str, updated: TodoCreate):
    if todo_id not in todos:
        raise HTTPException(status_code=404, detail="Todo not found")
    todos[todo_id].title = updated.title
    todos[todo_id].description = updated.description
    return todos[todo_id]

#
@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: str):
    if todo_id not in todos:
        raise HTTPException(status_code=404, detail="Todo not found")
    del todos[todo_id]
    return {"message": "Todo deleted successfully"}

