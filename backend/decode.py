from PIL import Image


def decode_message(image: Image.Image) -> str:
    width, height = image.size
    binary_message = ""

    for row in range(height):
        for col in range(width):
            r, g, b = image.getpixel((col, row))
            binary_message += str(r & 1)

    # Split into bytes (8 bits)
    all_bytes = [binary_message[i:i+8] for i in range(0, len(binary_message), 8)]
    decoded = ""
    for byte in all_bytes:
        try:
            decoded += chr(int(byte, 2))
            if decoded.endswith("<<<END>>>"):
                print(decoded.replace("<<<END>>>", ""))
                return decoded.replace("<<<END>>>", "")
        except ValueError:
            pass

    return decoded
