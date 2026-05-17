#!/usr/bin/env python3
"""Generate Nuriek favicon PNGs and ICO (letter n on paper — visible in Google Search)."""

from pathlib import Path
from typing import Optional, Tuple

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1] / "public"
PAPER = (247, 247, 244, 255)
INK = (17, 17, 17, 255)
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


def draw_icon(
    size: int,
    *,
    letter: Tuple[int, int, int, int] = INK,
    background: Optional[Tuple[int, int, int, int]] = PAPER,
) -> Image.Image:
    bg = background if background is not None else (0, 0, 0, 0)
    img = Image.new("RGBA", (size, size), bg)
    draw = ImageDraw.Draw(img)
    font_size = max(24, int(size * 0.76))
    font = load_font(font_size)
    text = "n"
    bbox = draw.textbbox((0, 0), text, font=font)
    width = bbox[2] - bbox[0]
    height = bbox[3] - bbox[1]
    x = (size - width) // 2 - bbox[0]
    y = (size - height) // 2 - bbox[1] + max(1, int(size * 0.05))
    draw.text((x, y), text, fill=letter, font=font)
    return img


def write_ico(path: Path, sizes: list[int]) -> None:
    images = [draw_icon(s).convert("RGBA") for s in sizes]
    images[0].save(
        path,
        format="ICO",
        sizes=[(s, s) for s in sizes],
        append_images=images[1:],
    )


def main() -> None:
    ROOT.mkdir(parents=True, exist_ok=True)
    draw_icon(48).save(ROOT / "favicon-48.png")
    draw_icon(192).save(ROOT / "favicon-192.png")
    draw_icon(180).save(ROOT / "apple-touch-icon.png")
    draw_icon(48, letter=(247, 247, 244, 255), background=(17, 17, 17, 255)).save(
        ROOT / "favicon-48-dark.png"
    )
    draw_icon(192, letter=(247, 247, 244, 255), background=(17, 17, 17, 255)).save(
        ROOT / "favicon-192-dark.png"
    )
    write_ico(ROOT / "favicon.ico", [16, 32, 48])
    print("Wrote favicon assets to", ROOT)


if __name__ == "__main__":
    main()
