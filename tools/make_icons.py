"""Genera le icone dell'estensione (icons/iconNN.png). Uso: python3 tools/make_icons.py"""
from PIL import Image, ImageDraw, ImageFont
import os

FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
OUT = os.path.join(os.path.dirname(__file__), "..", "icons")
S = 1024  # disegno in alta risoluzione, poi ridimensionato


def master():
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    # sfondo: gradiente blu -> viola con angoli arrotondati
    grad = Image.new("RGBA", (S, S))
    gp = grad.load()
    for y in range(S):
        for x in range(S):
            t = (x + y) / (2 * S)
            gp[x, y] = (int(37 + t * 90), int(99 - t * 20), int(235 - t * 20), 255)
    mask = Image.new("L", (S, S), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, S - 1, S - 1), radius=S // 5, fill=255)
    img.paste(grad, (0, 0), mask)
    d = ImageDraw.Draw(img)
    big = ImageFont.truetype(FONT, 700)
    small = ImageFont.truetype(FONT, 420)
    d.text((95, 560), "A", font=big, fill="white", anchor="ls")
    d.text((560, 700), "a", font=small, fill=(255, 255, 255, 170), anchor="ls")
    # freccia sottile "a -> A" implicita: barra di sottolineatura
    d.rounded_rectangle((110, 780, 520, 830), radius=25, fill=(255, 255, 255, 230))
    return img


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    m = master()
    for n in (16, 32, 48, 128):
        m.resize((n, n), Image.LANCZOS).save(os.path.join(OUT, f"icon{n}.png"))
    # promo tile Web Store 440x280
    tile = Image.new("RGB", (440, 280), (37, 99, 235))
    ic = m.resize((160, 160), Image.LANCZOS)
    tile.paste(ic, (40, 60), ic)
    d = ImageDraw.Draw(tile)
    d.text((225, 110), "Universal", font=ImageFont.truetype(FONT, 34), fill="white", anchor="ls")
    d.text((225, 152), "Auto Capitalize", font=ImageFont.truetype(FONT, 34), fill="white", anchor="ls")
    tile.save(os.path.join(OUT, "..", "store", "promo-small-440x280.png"))
