#!/usr/bin/env python3
"""Generate transparent Nuriek favicon PNGs and ICO (letter n only)."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1] / "public"
FONT_CANDIDATES = [
    "/System/Library/Fonts/Supplemental/Georgia Bold.ttf",
    "/System/Library/Fonts/Supplemental/Georgia.ttf",
    "/Library/Fonts/Georgia Bold.ttf",
    "/Library/Fonts/Georgia.ttf",
    "/System/Library/Fonts/Supplemental/Times New Roman Bold.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf",
]


def load_font(size: int) -> ImageFont.FreeTypeFont:
    for path in FONT_CANDIDATES:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def draw_icon(size: int, fill: tuple[int, int, int, int]) -> Image.Image:
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    font_size = max(24, int(size * 0.78))
    font = load_font(font_size)
    text = "n"
    bbox = draw.textbbox((0, 0), text, font=font)
    width = bbox[2] - bbox[0]
    height = bbox[3] - bbox[1]
    x = (size - width) // 2 - bbox[0]
    y = (size - height) // 2 - bbox[1] + max(1, int(size * 0.06))
    draw.text((x, y), text, fill=fill, font=font)
    return img


def write_ico(path: Path, sizes: list[int]) -> None:
    images = [draw_icon(s, (17, 17, 17, 255)).convert("RGBA") for s in sizes]
    images[0].save(
        path,
        format="ICO",
        sizes=[(s, s) for s in sizes],
        append_images=images[1:],
    )


def main() -> None:
    ROOT.mkdir(parents=True, exist_ok=True)
    draw_icon(48, (17, 17, 17, 255)).save(ROOT / "favicon-48.png")
    draw_icon(192, (17, 17, 17, 255)).save(ROOT / "favicon-192.png")
    draw_icon(48, (247, 247, 244, 255)).save(ROOT / "favicon-48-dark.png")
    draw_icon(192, (247, 247, 244, 255)).save(ROOT / "favicon-192-dark.png")
    draw_icon(180, (17, 17, 17, 255)).save(ROOT / "apple-touch-icon.png")
    write_ico(ROOT / "favicon.ico", [16, 32, 48])
    print("Wrote favicon assets to", ROOT)


if __name__ == "__main__":
    main()
