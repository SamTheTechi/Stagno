from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from decode import decode_message
from encode import encode_message
import io


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/encode/")
async def encode(image: UploadFile = File(...), text: str = Form(...)):
    """
    Encodes a message into an image.
    """
    image_data = await image.read()
    input_image = Image.open(io.BytesIO(image_data))

    encoded_image = encode_message(input_image, text)

    byte_io = io.BytesIO()
    encoded_image.save(byte_io, "PNG")
    byte_io.seek(0)

    return StreamingResponse(byte_io, media_type="image/png")


@app.post("/decode/")
async def decode(image: UploadFile = File(...)):
    """
    Decodes a message from an image.
    """
    image_data = await image.read()
    input_image = Image.open(io.BytesIO(image_data))

    decoded_text = decode_message(input_image)

    return {"decoded_text": decoded_text}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
