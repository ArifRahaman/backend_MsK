from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import uuid

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














        
    
   

