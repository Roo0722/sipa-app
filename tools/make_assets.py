"""Generates beep sounds and placeholder icons. Run: python tools/make_assets.py"""
import math, struct, wave, os
from PIL import Image, ImageDraw, ImageFont
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def tone(name, freqs, dur=0.18, vol=0.6, sr=22050):
    path = os.path.join(root, "assets", "sounds", name)
    frames = bytearray()
    for f in freqs:
        n = int(sr * dur)
        for i in range(n):
            env = min(1, i / (sr * 0.01)) * min(1, (n - i) / (sr * 0.03))
            frames += struct.pack("<h", int(32767 * vol * env * math.sin(2 * math.pi * f * i / sr)))
        frames += b"\x00\x00" * int(sr * 0.03)
    with wave.open(path, "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(bytes(frames))
tone("tick.wav", [880], 0.12)
tone("go.wav", [1320], 0.45)
tone("rest.wav", [520, 392], 0.2)
tone("done.wav", [660, 880, 1320], 0.18)
RED, GOLD, BG = (224, 54, 44), (252, 209, 22), (10, 10, 12)
def font(size):
    for p in ["/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"]:
        if os.path.exists(p): return ImageFont.truetype(p, size)
    return ImageFont.load_default()
def draw(size, bg, pad):
    im = Image.new("RGBA", (size, size), bg)
    d = ImageDraw.Draw(im)
    r = size * (0.5 - pad)
    c = size / 2
    d.ellipse([c - r, c - r, c + r, c + r], fill=RED + (255,), outline=GOLD + (255,), width=max(2, size // 40))
    t = "SIPA!"; f = font(int(size * 0.22))
    b = d.textbbox((0, 0), t, font=f)
    d.text((c - (b[2] - b[0]) / 2 - b[0], c - (b[3] - b[1]) / 2 - b[1]), t, font=f, fill=GOLD + (255,))
    return im
img = os.path.join(root, "assets", "images")
draw(1024, BG + (255,), 0.08).convert("RGB").save(os.path.join(img, "icon.png"))
draw(1024, (0, 0, 0, 0), 0.20).save(os.path.join(img, "adaptive-icon.png"))
draw(1024, (0, 0, 0, 0), 0.10).save(os.path.join(img, "splash-image.png"))
print("ok")
