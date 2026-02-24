import uvicorn
from fastapi import FastAPI, Request, BackgroundTasks

# 1. Initialize the FastAPI application
app = FastAPI(
    title="GitHub Webhook API",
    description="An automated documentation generator service.",
    version="1.0.0"
)


# Useful for testing if your server is running or for load balancers
@app.get("/")
async def root():
    return {
        "status": "online", 
        "message": "DocuGenius Webhook Server is running!"
    }


@app.post("/webhook/github")
async def github_webhook(request: Request, background_tasks: BackgroundTasks):
    try:
        payload = await request.json()
        
        # Quick validation
        repo_name = payload.get("repository", {}).get("full_name", "Unknown Repo")
        
        # TODO: Insert the file filtering and background task logic here
        
        return {
            "status": "processing", 
            "repository": repo_name,
            "message": "Webhook payload received successfully."
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}


if __name__ == "__main__":
    print("Starting development server...")
    # 'index:app' refers to the filename (index.py) and the FastAPI instance (app)
    uvicorn.run("index:app", host="0.0.0.0", port=8000, reload=True)
