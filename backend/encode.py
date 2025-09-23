from PIL import Image


def encode_message(image: Image.Image, secret_message: str) -> Image.Image:
    encoded = image.copy()
    width, height = image.size
    index = 0

    secret_message += "<<<END>>>"
    binary_message = ''.join([format(ord(i), "08b") for i in secret_message])

    for row in range(height):
        for col in range(width):
            if index < len(binary_message):
                r, g, b = image.getpixel((col, row))

                # Modify the LSB of red channel
                r = (r & ~1) | int(binary_message[index])
                index += 1

                encoded.putpixel((col, row), (r, g, b))
            else:
                break

    return encoded
