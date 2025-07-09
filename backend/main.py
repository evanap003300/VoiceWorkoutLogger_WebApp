from fastapi import FastAPI
app = FastAPI()

def main():
    return {"message": "Hello World"}

@app.get("/")
def read_root():
    return {"message": "Hello World"}

if __name__ == "__main__":
    main()
