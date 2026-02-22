from azure.identity import ClientSecretCredential
from openai import AzureOpenAI
##
# ---------- Azure AD / Entra ID Credentials ----------
AZURE_TENANT_ID = ""
AZURE_CLIENT_ID = ""
AZURE_CLIENT_SECRET = ""


# ---------- Azure OpenAI Resource Info ----------
AZURE_OPENAI_ENDPOINT = "/"
AZURE_OPENAI_API_VERSION = ""
AZURE_OPENAI_EMBEDDING_DEPLOYMENT = ""  # e.g., text-embedding-3-large
AZURE_OPENAI_CHATGPT_DEPLOYMENT = "" ;

# ---------- Get AAD Token ----------
credential = ClientSecretCredential(
    tenant_id=AZURE_TENANT_ID,
    client_id=AZURE_CLIENT_ID,
    client_secret=AZURE_CLIENT_SECRET
)

# Azure OpenAI token scope
token = credential.get_token("https://cognitiveservices.azure.com/.default")

# ---------- Initialize Azure OpenAI Client ----------
client = AzureOpenAI(
    azure_endpoint=AZURE_OPENAI_ENDPOINT,
    api_version=AZURE_OPENAI_API_VERSION,
    azure_ad_token=token.token  # <<--- IMPORTANT
)

# ---------- Test Embeddings ----------
text = "Testing Azure OpenAI embeddings via AAD token."

try:
    resp = client.embeddings.create(
        model=AZURE_OPENAI_EMBEDDING_DEPLOYMENT,
        input=text
    )
    
    embedding = resp.data[0].embedding
    print("Embedding size:", len(embedding))
    print("Sample:", embedding[:10])

except Exception as e:
    print("❌ Error:", e)


# ---------- Test ChatCompletion ----------
try:
    response = client.chat.completions.create(
        model=AZURE_OPENAI_CHATGPT_DEPLOYMENT,
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Say a one-line greeting!"}
        ],
        max_tokens=50
    )
    
    # FIX → use .content instead of ["content"]
    print("Chat Response:")
    print(response.choices[0].message.content)

except Exception as e:
    print("❌ Error:", e) 
