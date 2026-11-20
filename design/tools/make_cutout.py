"""
Turn AI-generated mascot images on a flat MAGENTA (#FF00FF) background into
clean transparent cutouts (PNG + WebP), ready for the website animations.

Why magenta: the mascot is black (tank top), lime (logo, wristbands),
brown/orange (fur) and cream (muzzle). Magenta is in none of them, so the key
never eats the outfit (the old cutouts lost the black tank top because they
were keyed from a black background).

Usage (from the gymyardhq-web folder):
    python design/tools/make_cutout.py <input file or folder> [--out assets/cutouts] [--height 1400]

Needs: Python 3 with Pillow and NumPy (`pip install pillow numpy`).
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

KEY = np.array([255.0, 0.0, 255.0])
EXTS = {".png", ".jpg", ".jpeg", ".webp"}


def key_out(img: Image.Image) -> Image.Image:
    rgb = np.asarray(img.convert("RGB"), dtype=np.float32)
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]

    # "Magenta-ness": high when red AND blue are both well above green.
    m = np.minimum(r, b) - g
    lo, hi = 60.0, 190.0
    alpha = 1.0 - np.clip((m - lo) / (hi - lo), 0.0, 1.0)
    alpha[alpha < 0.04] = 0.0

    # Un-mix the magenta from semi-transparent edge pixels: C = a*F + (1-a)*K.
    a = alpha[..., None]
    safe = np.maximum(a, 0.05)
    fg = (rgb - (1.0 - a) * KEY) / safe
    fg = np.where(a > 0.05, fg, rgb)

    # Choke: drop the faintest fringe pixels a little.
    alpha = np.clip((alpha - 0.08) / 0.92, 0.0, 1.0)

    # Despill inside a band around the silhouette edge (a few px deep), so
    # pink/purple fringe disappears while real colours (e.g. the mouth) stay.
    hard = Image.fromarray(((alpha < 0.99) * 255).astype(np.uint8))
    band = np.asarray(hard.filter(ImageFilter.MaxFilter(7))) > 0
    spill = np.clip(np.minimum(fg[..., 0], fg[..., 2]) - fg[..., 1], 0, None)
    fg[..., 0] = np.where(band, fg[..., 0] - spill, fg[..., 0])
    fg[..., 2] = np.where(band, fg[..., 2] - spill, fg[..., 2])

    out = np.dstack([np.clip(fg, 0, 255), alpha * 255.0]).astype(np.uint8)
    return Image.fromarray(out, "RGBA")


def background_looks_magenta(img: Image.Image) -> bool:
    rgb = np.asarray(img.convert("RGB"), dtype=np.int16)
    h, w = rgb.shape[:2]
    s = max(4, min(h, w) // 40)
    corners = [rgb[:s, :s], rgb[:s, -s:], rgb[-s:, :s], rgb[-s:, -s:]]
    for c in corners:
        mean = c.reshape(-1, 3).mean(axis=0)
        if not (mean[0] > 180 and mean[2] > 180 and mean[1] < 90):
            return False
    return True


def process(path: Path, out_dir: Path, height: int) -> None:
    src = Image.open(path)
    if not background_looks_magenta(src):
        print(f"  ! {path.name}: corners are not magenta - regenerate on a flat #FF00FF background. Skipped.")
        return
    cut = key_out(src)
    bbox = cut.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox()
    if not bbox:
        print(f"  ! {path.name}: nothing left after keying. Skipped.")
        return
    cut = cut.crop(bbox)
    pad = round(max(cut.size) * 0.02)
    canvas = Image.new("RGBA", (cut.width + 2 * pad, cut.height + 2 * pad), (0, 0, 0, 0))
    canvas.alpha_composite(cut, (pad, pad))
    if canvas.height > height:
        canvas = canvas.resize((round(canvas.width * height / canvas.height), height), Image.LANCZOS)

    name = path.stem.lower().replace(" ", "-")
    out_dir.mkdir(parents=True, exist_ok=True)
    canvas.save(out_dir / f"{name}.png", optimize=True)
    canvas.save(out_dir / f"{name}.webp", "WEBP", quality=88, method=6, exact=True)
    print(f"  OK {path.name} -> {name}.png / .webp  {canvas.size[0]}x{canvas.size[1]}")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("input", type=Path, help="image file or folder of images")
    ap.add_argument("--out", type=Path, default=Path("assets/cutouts"), help="output folder")
    ap.add_argument("--height", type=int, default=1400, help="max output height in px")
    args = ap.parse_args()

    files = [args.input] if args.input.is_file() else sorted(p for p in args.input.iterdir() if p.suffix.lower() in EXTS)
    if not files:
        print("No images found.")
        return 1
    for f in files:
        process(f, args.out, args.height)
    return 0


if __name__ == "__main__":
    sys.exit(main())
