import os
import sys
import json
import re
import datetime
import shutil
from PIL import Image, ExifTags, ImageOps

SOURCE_DIR = 'Photos-1-001'
TARGET_DIR = 'photos'

os.makedirs(TARGET_DIR, exist_ok=True)

MONTHS_SK = [
    '', 'januára', 'februára', 'marca', 'apríla', 'mája', 'júna',
    'júla', 'augusta', 'septembra', 'októbra', 'novembra', 'decembra'
]
MONTHS_SK_NOMINATIVE = [
    '', 'Január', 'Február', 'Marec', 'Apríl', 'Máj', 'Jún',
    'Júl', 'August', 'September', 'Október', 'November', 'December'
]
DAYS_SK = [
    'Pondelok', 'Utorok', 'Streda', 'Štvrtok', 'Piatok', 'Sobota', 'Nedeľa'
]

FLOWER_TYPES = [
    'violet', 'lavender', 'orchid', 'rose', 'bellflower', 'crocus', 'lotus', 'peony'
]

files = sorted(os.listdir(SOURCE_DIR))
total_files = len(files)
print(f"Total files to process: {total_files}")

records = []

for idx, filename in enumerate(files):
    src_path = os.path.join(SOURCE_DIR, filename)
    dst_path = os.path.join(TARGET_DIR, filename)
    stat = os.stat(src_path)
    is_video = filename.lower().endswith(('.mp4', '.mov', '.avi'))
    
    dt = None
    has_exact_time = False
    source = 'unknown'
    
    # 1. EXIF for images
    if not is_video:
        try:
            with Image.open(src_path) as img:
                exif = img.getexif()
                if exif:
                    val = exif.get(0x9003) or exif.get(0x0132) or exif.get(0x9004)
                    if not val:
                        for ifd_id in (ExifTags.IFD.Exif,):
                            try:
                                ifd = exif.get_ifd(ifd_id)
                                val = ifd.get(0x9003) or ifd.get(0x9004) or ifd.get(0x0132)
                                if val: break
                            except Exception: pass
                    if val:
                        val_str = str(val).strip()
                        m_dt = re.match(r'(\d{4})[:\-](\d{2})[:\-](\d{2})\s+(\d{2}):(\d{2}):(\d{2})', val_str)
                        if m_dt:
                            dt = datetime.datetime(int(m_dt.group(1)), int(m_dt.group(2)), int(m_dt.group(3)),
                                                   int(m_dt.group(4)), int(m_dt.group(5)), int(m_dt.group(6)))
                            has_exact_time = True
                            source = 'exif'
        except Exception:
            pass

    # 2. WhatsApp unix timestamp: WA_1775239616751
    if not dt and 'WA_' in filename:
        m_wa = re.search(r'WA_(\d{10,13})', filename)
        if m_wa:
            ts_str = m_wa.group(1)
            ts = float(ts_str) / 1000.0 if len(ts_str) > 10 else float(ts_str)
            dt = datetime.datetime.fromtimestamp(ts)
            has_exact_time = True
            source = 'wa_timestamp'

    # 3. Filename patterns:
    if not dt:
        # Match YYYYMMDD_HHMMSS or YYYYMMDD-HHMMSS
        m_full = re.search(r'(202[0-9])([01][0-9])([0-3][0-9])[_\-](\d{2})(\d{2})(\d{2})', filename)
        if m_full:
            dt = datetime.datetime(int(m_full.group(1)), int(m_full.group(2)), int(m_full.group(3)),
                                   int(m_full.group(4)), int(m_full.group(5)), int(m_full.group(6)))
            has_exact_time = True
            source = 'filename_time'
        else:
            m_date = re.search(r'(202[0-9])([01][0-9])([0-3][0-9])', filename)
            if m_date:
                dt = datetime.datetime(int(m_date.group(1)), int(m_date.group(2)), int(m_date.group(3)), 12, 0, 0)
                has_exact_time = False
                source = 'filename_date'

    # 4. Fallback to file stat
    if not dt:
        dt = datetime.datetime.fromtimestamp(min(stat.st_mtime, stat.st_ctime))
        has_exact_time = True
        source = 'file_stat'

    # Slovak formatted date
    day_name = DAYS_SK[dt.weekday()]
    month_name = MONTHS_SK[dt.month]
    month_nominative = MONTHS_SK_NOMINATIVE[dt.month]
    year_str = str(dt.year)
    
    if has_exact_time:
        formatted_date = f"{dt.day}. {month_name} {year_str}, {dt.strftime('%H:%M')}"
        time_str = dt.strftime('%H:%M')
    else:
        formatted_date = f"{dt.day}. {month_name} {year_str}"
        time_str = ""

    short_date = f"{dt.day}. {month_name} {year_str}"
    month_year_key = f"{dt.year}-{dt.month:02d}"
    month_year_label = f"{month_nominative} {year_str}"

    # Process and copy/compress file to target directory
    if not os.path.exists(dst_path) or os.path.getsize(dst_path) == 0:
        if is_video:
            shutil.copy2(src_path, dst_path)
        else:
            try:
                with Image.open(src_path) as im:
                    # Auto rotate based on EXIF orientation
                    im = ImageOps.exif_transpose(im)
                    # Convert RGBA to RGB for JPEG if needed
                    if im.mode in ('RGBA', 'P', 'LA') and filename.lower().endswith(('.jpg', '.jpeg')):
                        im = im.convert('RGB')
                    
                    w, h = im.size
                    max_dim = max(w, h)
                    # If larger than 1600px, downscale nicely
                    if max_dim > 1600:
                        scale = 1600.0 / max_dim
                        new_w = int(w * scale)
                        new_h = int(h * scale)
                        im = im.resize((new_w, new_h), Image.Resampling.LANCZOS)
                        im.save(dst_path, quality=82, optimize=True)
                    elif stat.st_size > 500 * 1024 and filename.lower().endswith(('.jpg', '.jpeg')):
                        # Recompress large files that aren't over 1600px
                        im.save(dst_path, quality=82, optimize=True)
                    else:
                        shutil.copy2(src_path, dst_path)
            except Exception as e:
                print(f"Error optimizing {filename}: {e}, copying raw")
                shutil.copy2(src_path, dst_path)

    # Flower type rotation
    flower_type = FLOWER_TYPES[(idx * 7 + (dt.day * 3)) % len(FLOWER_TYPES)]

    records.append({
        'id': idx + 1,
        'filename': filename,
        'path': f'photos/{filename}',
        'is_video': is_video,
        'timestamp': int(dt.timestamp()),
        'iso_date': dt.strftime('%Y-%m-%d %H:%M:%S'),
        'formatted_date': formatted_date,
        'short_date': short_date,
        'day_name': day_name,
        'time': time_str,
        'has_exact_time': has_exact_time,
        'year': dt.year,
        'month': dt.month,
        'month_year_key': month_year_key,
        'month_year_label': month_year_label,
        'flower_type': flower_type
    })

    if (idx + 1) % 50 == 0 or (idx + 1) == total_files:
        print(f"Processed {idx + 1}/{total_files} files...")

# Sort records chronologically
records.sort(key=lambda x: x['timestamp'])

# Reassign sequential memory numbers chronologically
for i, r in enumerate(records):
    r['memory_number'] = i + 1

output_json_path = 'photos_data.json'
with open(output_json_path, 'w', encoding='utf-8') as f:
    json.dump(records, f, ensure_ascii=False, indent=2)

print(f"Successfully processed {len(records)} memories into {output_json_path} and {TARGET_DIR}/")
