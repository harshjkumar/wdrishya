
import re

def parse_svg_path(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    # Extract the main group transform content
    # Note: simple regex, assumes standard format as seen in previous steps
    # We want to find all 'd' attributes
    
    # Split all paths
    path_matches = re.findall(r'd="([^"]+)"', content)
    
    all_subpaths = []
    
    for path_d in path_matches:
        # Split by 'M' or 'm' to find subpaths
        # We need to keep the delimiter. 
        # A simple way is to replace 'M' with '|M' and split
        clean_d = path_d.replace('\n', ' ').strip()
        parts = re.split(r'(?=[Mm])', clean_d)
        for part in parts:
            if part.strip():
                # Find the first coordinate to estimate X position
                # M x y ...
                coords = re.findall(r'[Mm]\s*(-?[\d.]+)\s+(-?[\d.]+)', part)
                if coords:
                    start_x = float(coords[0][0])
                    all_subpaths.append({'d': part, 'x': start_x})
                else:
                    # try to find first number pair if M is disjoint
                    # rare case in this specific file structure but possible
                    pass

    # Sort subpaths by X coordinate (Left to Right)
    # The SVG has scale(0.1, -0.1), preserving X direction (positive X is right)
    # Y is flipped but X is normal.
    sorted_paths = sorted(all_subpaths, key=lambda i: i['x'])
    
    return sorted_paths

paths = parse_svg_path('public/wd_svg.svg')
print(f"Found {len(paths)} subpaths.")
for i, p in enumerate(paths):
    print(f"Path {i}: X={p['x']}")
