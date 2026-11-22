"""
Build the self-hosted web fonts in assets/fonts/ from the exact files Google
Fonts serves (the same source next/font/google used), trimmed to what the site
renders — without changing how any glyph looks.

Why: next/font/google ships every unicode-range face. The site's only character
outside Google's "latin" subset is the rupee sign (U+20B9), so every visitor
downloaded the full "latin-ext" file of Inter (83 KB) and Archivo (83 KB) for
one glyph. Archivo was also shipped with its whole width axis (62-125) although
the site only uses width 125 (`font-wide`).

What it writes (all SIL Open Font License 1.1; copyright/licence name records kept):
  inter-latin.woff2      Google's Inter latin file, byte-for-byte (wght 100-900)
  inter-rupee.woff2      U+20B9 only, cut from Google's Inter latin-ext file
  archivo-latin.woff2    Google's Archivo latin file pinned at wdth=125 (wght 100-900 kept)
  archivo-rupee.woff2    U+20B9 only, from Archivo latin-ext, pinned at wdth=125

wdth=125 is the axis maximum, so pinning applies the stored deltas at full
strength; `optimize=False` skips fontTools' IUP re-optimisation. Glyph shapes,
advances and metrics are unchanged; the only effect is that interpolated points
are stored as whole font units, which moves the antialiasing of a few edge
pixels (full-page screenshot diff on 2026-11-22: 0 px on most pages, at most a
few hundred edge pixels on a page — within screenshot noise, no layout change).
inter-latin.woff2 and both rupee files are glyph-exact.
app/layout.tsx declares the faces with Google's latin unicode-range + U+20B9;
any character outside that falls back exactly as before (the "Fallback"
faces in app/globals.css). `pnpm verify` fails if built pages contain a
character the fonts don't cover.

Usage (from the gymyardhq-web folder):
    python design/tools/build_fonts.py

Needs: Python 3 with fontTools and brotli (`pip install fonttools brotli`).
"""

from __future__ import annotations

import io
import re
import sys
import urllib.request
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

OUT = Path(__file__).resolve().parents[2] / "assets" / "fonts"
# Google picks the file build by user agent. This is the exact UA next/font/google sends
# (node_modules/next/dist/compiled/@next/font/dist/google/fetch-resource.js), so we get
# byte-identical files to what the site served before.
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
RUPEE = 0x20B9

FAMILIES = {
    "inter": {"query": "Inter:wght@100..900", "pin": None},
    "archivo": {"query": "Archivo:wdth,wght@62..125,100..900", "pin": {"wdth": 125}},
}


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as res:  # noqa: S310 — fixed https URLs only
        return res.read()


def subset_urls(query: str) -> dict[str, str]:
    css = fetch(f"https://fonts.googleapis.com/css2?family={query}&display=swap").decode()
    found = dict(re.findall(r"/\*\s*([a-z-]+)\s*\*/\s*@font-face\s*{[^}]*?url\((https://[^)]+\.woff2)\)", css))
    for need in ("latin", "latin-ext"):
        if need not in found:
            sys.exit(f"{query}: no '{need}' face in the Google CSS")
    return found


def load(data: bytes) -> TTFont:
    return TTFont(io.BytesIO(data))


def save(font: TTFont, name: str) -> None:
    font.flavor = "woff2"
    path = OUT / name
    font.save(path)
    print(f"  {name}: {path.stat().st_size / 1024:.1f} KB")


def rupee_only(font: TTFont) -> TTFont:
    opts = subset.Options()
    opts.layout_features = ["*"]
    opts.name_IDs = ["*"]
    opts.name_languages = ["*"]
    opts.name_legacy = True
    opts.notdef_outline = True
    opts.hinting = True
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=[RUPEE])
    sub.subset(font)
    return font


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for key, cfg in FAMILIES.items():
        print(key)
        urls = subset_urls(cfg["query"])
        latin_raw = fetch(urls["latin"])
        ext = load(fetch(urls["latin-ext"]))
        if RUPEE not in ext.getBestCmap():
            sys.exit(f"{key}: latin-ext has no U+20B9")

        if cfg["pin"]:
            latin = instancer.instantiateVariableFont(load(latin_raw), cfg["pin"], optimize=False)
            save(latin, f"{key}-latin.woff2")
            ext = instancer.instantiateVariableFont(ext, cfg["pin"], optimize=False)
        else:
            (OUT / f"{key}-latin.woff2").write_bytes(latin_raw)
            print(f"  {key}-latin.woff2: {len(latin_raw) / 1024:.1f} KB (unchanged)")
        save(rupee_only(ext), f"{key}-rupee.woff2")


if __name__ == "__main__":
    main()
