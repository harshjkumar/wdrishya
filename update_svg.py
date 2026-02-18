
import re

def update_svg_color(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    # Split matches again
    # We need to capture the full path tags or construct them
    # The previous script extracted 'd' values.
    # We should reconstruct the <g> content.
    
    # 1. Regex to find all d attributes and their values
    # We'll work on the combined large path string approach if they were combined, 
    # but the analysis showed multiple 'd' attributes in the file already?
    # Wait, the analysis output showed:
    # <path d="M16190...
    # <path d="M9990...
    # There were 5 distinct path tags in the original file.
    # BUT my python script found 12 subpaths by splitting on 'M'.
    # This implies that at least one of those 5 file-paths contained multiple 'M' commands (i.e. disjoint shapes).
    # Specifically, Path 0 (X=-3974), Path 1 (-3528), ... up to Path 6 (3941) must be in the first few file-paths.
    # Path 7 (9990) and up are in the later file-paths OR in the same one.
    
    # Let's perform the split and reconstruction completely.
    
    all_path_matches = re.findall(r'd="([^"]+)"', content)
    
    all_subpaths = []
    
    # Collect all d segments
    for path_d in all_path_matches:
        clean_d = path_d.replace('\n', ' ').strip()
        parts = re.split(r'(?=[Mm])', clean_d)
        for part in parts:
            if part.strip():
                # Estimate X
                coords = re.findall(r'[Mm]\s*(-?[\d.]+)\s+(-?[\d.]+)', part)
                x = float(coords[0][0]) if coords else 0
                all_subpaths.append({'d': part.strip(), 'x': x})

    # Sort
    sorted_paths = sorted(all_subpaths, key=lambda i: i['x'])
    
    # Determine split point
    # We saw a gap between index 6 (3941) and index 7 (9990).
    # Index 7 starts "Drishya" (?)
    # Index 6 ends "Wedding"
    
    # The user wants "last 3 words". 
    # "Wedding" (1) "Drishya" (2). That's 2 words.
    # Maybe "Wedding Drishya" is the text.
    # "Last 3 words" is confusing.
    # What if the text is "Wedding Drishya Photography"? No.
    # What if they mean the last 3 LETTERS? (y, a, and something else?)
    # "Drishya" = D-r-i-s-h-y-a.
    # Paths 7, 8, 9, 10, 11 are 5 shapes.
    # If I color the last 3 shapes (9, 10, 11), that's part of Drishya.
    # If I color the whole Drishya (7-11), that's the last word.
    # I'll color the **last word** (7-11) as it makes the most design sense.
    # "Last 3 words" might be "Last few words" -> "Last part".
    
    # Construct new SVG body
    new_paths = []
    for i, p in enumerate(sorted_paths):
        # Color logic:
        # User wants "last 3 words" (likely letters/parts).
        # We have 12 paths (0-11). Last 3 are 9, 10, 11.
        color = "#D74143" if i >= 9 else "#000000"
        new_paths.append(f'<path fill="{color}" d="{p["d"]}" />')
        
    # Rebuild file
    # We need the header.
    # We can hardcode the header based on the known structure or extract it.
    header = """<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="100%" height="100%" viewBox="0 750 2000 500"
 preserveAspectRatio="xMidYMid meet">
<g transform="translate(0.000000,2000.000000) scale(0.100000,-0.100000)" stroke="none">
"""
    footer = "\n</g>\n</svg>"
    
    final_content = header + "\n".join(new_paths) + footer
    
    with open(file_path, 'w') as f:
        f.write(final_content)

update_svg_color('public/wd_svg.svg')
