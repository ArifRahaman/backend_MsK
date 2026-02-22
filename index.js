import os
import shutil
import logging
from pathlib import Path
from fastapi import FastAPI, UploadFile, File, BackgroundTasks, HTTPException
from pypdf import PdfReader
from dotenv import load_dotenv

# Import the Ensemble Logic we just created
import rag_logic

# --- SETUP ---
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("Ensemble_App")

load_dotenv()

app = FastAPI(title="Ensemble RAG (3-Model Consensus)")

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# --- HELPER: SMART TEXT EXTRACTOR ---
def extract_text_from_file(file_path: Path) -> str:
    """
    Reads text from PDF or TXT files.
    """
    try:
        # 1. Handle PDF
        if file_path.suffix.lower() == ".pdf":
            reader = PdfReader(str(file_path))
            text = ""
            for page in reader.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
            return text
            
        # 2. Handle Text Files
        elif file_path.suffix.lower() in [".txt", ".md", ".json"]:
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                return f.read()
                
        # 3. Skip others
        else:
            logger.warning(f"Unsupported file type: {file_path.name}")
            return ""

    except Exception as e:
        logger.error(f"Failed to extract text from {file_path.name}: {e}")
        return ""

# --- BACKGROUND TASK: INGESTION ---
def ingest_file_task(file_path: str):
    """
    Extracts text and feeds it to the 3-Model Ensemble Logic.
    """
    path_obj = Path(file_path)
    text = extract_text_from_file(path_obj)
    
    if text.strip():
        # This function (in rag_logic.py) splits the text for Basic, Hierarchical, and Rerank
        rag_logic.process_file_for_all_models(file_path, text)
        logger.info(f"Successfully indexed {path_obj.name} across all models.")
    else:
        logger.warning(f"Skipping {path_obj.name} (No text found).")

# --- STARTUP EVENT ---
@app.on_event("startup")
async def startup_event():
    """
    1. Tries to load the saved DB (Fast).
    2. If missing, re-scans the uploads folder (Slow).
    """
    logger.info("Server starting...")
    
    # Try to load the saved "brain" from disk
    if rag_logic.load_db():
        logger.info("Ensemble DB loaded from disk! Ready to chat.")
        return

    # If no DB found, re-process files
    logger.info("No DB found. Checking uploads folder...")
    files = [f for f in UPLOAD_DIR.iterdir() if f.is_file()]
    
    if not files:
        logger.info("No files found. System is empty.")
        return

    logger.info(f"Found {len(files)} files. Re-indexing now...")
    for f in files:
        ingest_file_task(str(f))
    logger.info("Startup complete. All files indexed.")

# --- ENDPOINTS ---

@app.post("/upload")
async def upload_file(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...)
):
    try:
        # Save file to disk
        file_path = UPLOAD_DIR / file.filename
        with open(file_path, "wb") as f:
            shutil.copyfileobj(file.file, f)
        
        # Trigger ingestion in background
        background_tasks.add_task(ingest_file_task, str(file_path))
        
        return {"message": f"File {file.filename} uploaded. Indexing in background..."}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {e}")

@app.get("/chat")
def chat(query: str):
    """
    Runs the 'Tournament' between Basic, Hierarchical, and Rerank models.
    Returns the final consensus answer.
    """
    if not query:
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    
    # Call the consensus engine
    final_answer = rag_logic.get_ensemble_answer(query)
    
    return {
        "strategy": "Ensemble Consensus (Basic + Hierarchical + Rerank)",
        "answer": final_answer
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
