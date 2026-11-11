"""Builds the Round 1 ZIP of the Skill package, then reads it back. Not part of the Skill package.

Usage: py -I dossier/tools/build-zip.py dossier/incident-dossier dossier/dist/incident-dossier.zip

Every entry sits under the package folder name, uses forward slashes and is a Markdown file.
Entries are sorted and share one fixed timestamp, so the same files always give the same ZIP.
Nothing is written if a check fails.
"""

import hashlib
import os
import sys
import zipfile
from pathlib import Path

MAX_FILE = 1024 * 1024
MAX_TOTAL = 10 * 1024 * 1024
MAX_FILES = 100
STAMP = (2026, 11, 10, 0, 0, 0)


def fail(msg):
    print(f"\nPROBLEMS:\n- {msg}")
    sys.exit(1)


def main():
    if len(sys.argv) != 3:
        print("usage: py -I dossier/tools/build-zip.py <package folder> <output zip>")
        sys.exit(2)
    pkg = Path(sys.argv[1]).resolve()
    out = Path(sys.argv[2]).resolve()
    if not (pkg / "SKILL.md").is_file():
        fail(f"no SKILL.md in {sys.argv[1]}")
    if out.is_relative_to(pkg):
        fail("the output ZIP must sit outside the package folder")

    # os.walk lists hidden files too, which is the point.
    files = []
    for root, dirs, names in os.walk(pkg):
        dirs.sort()
        for n in sorted(names):
            files.append(Path(root) / n)

    problems = []
    entries = []
    total = 0
    for f in files:
        rel = f.relative_to(pkg).as_posix()
        data = f.read_bytes()
        total += len(data)
        if any(part.startswith(".") for part in rel.split("/")):
            problems.append(f"hidden file: {rel}")
        if not rel.endswith(".md"):
            problems.append(f"not markdown: {rel}")
        if len(data) > MAX_FILE:
            problems.append(f"over 1 MB: {rel}")
        if data.startswith(b"\xef\xbb\xbf"):
            problems.append(f"BOM: {rel}")
        if b"\r" in data:
            problems.append(f"CR line ending: {rel}")
        try:
            data.decode("utf-8")
        except UnicodeDecodeError:
            problems.append(f"not UTF-8: {rel}")
        entries.append((f"{pkg.name}/{rel}", data))
    if len(entries) > MAX_FILES:
        problems.append(f"{len(entries)} files, over {MAX_FILES}")
    if total > MAX_TOTAL:
        problems.append(f"{total} bytes uncompressed, over 10 MB")
    if problems:
        fail("\n- ".join(problems))

    out.parent.mkdir(parents=True, exist_ok=True)
    tmp = out.with_name(out.name + ".tmp")
    with zipfile.ZipFile(tmp, "w") as z:
        for name, data in entries:
            info = zipfile.ZipInfo(name, date_time=STAMP)
            info.create_system = 3
            info.external_attr = 0o100644 << 16
            info.compress_type = zipfile.ZIP_DEFLATED
            z.writestr(info, data, compresslevel=9)

    # Read it back before it replaces any earlier ZIP.
    with zipfile.ZipFile(tmp) as z:
        if z.testzip() is not None:
            fail("CRC check failed")
        infos = z.infolist()
        if [i.filename for i in infos] != [n for n, _ in entries]:
            fail("entry names differ from the package files")
        for i, (name, data) in zip(infos, entries):
            if "\\" in i.filename or i.is_dir() or z.read(i) != data:
                fail(f"entry does not match its source: {name}")
    os.replace(tmp, out)

    size = out.stat().st_size
    digest = hashlib.sha256(out.read_bytes()).hexdigest()
    if size > MAX_TOTAL:
        fail(f"ZIP is {size} bytes, over 10 MB")

    print(f"zip      {sys.argv[2]}")
    print(f"size     {size} bytes")
    print(f"sha256   {digest}")
    print(f"files    {len(infos)}, all .md, {total} bytes uncompressed")
    print("\n   bytes  packed  entry")
    for i in infos:
        print(f"{i.file_size:8} {i.compress_size:7}  {i.filename}")
    print("\ntree")
    shown = set()
    for i in infos:
        parts = i.filename.split("/")
        for depth in range(len(parts) - 1):
            folder = "/".join(parts[: depth + 1])
            if folder not in shown:
                shown.add(folder)
                print(f"{'  ' * depth}{parts[depth]}/")
        print(f"{'  ' * (len(parts) - 1)}{parts[-1]}")
    print("\nno zip problems")


if __name__ == "__main__":
    main()
