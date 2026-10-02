import os
import re

def process(directory):
    for root, dirs, files in os.walk(directory):
        if 'node_modules' in root or '.git' in root or '.next' in root or '3d-nova' in root:
            continue
        for file in files:
            if file.endswith(('.ts', '.tsx', '.json', '.md', '.mjs', '.css', '.js', '.jsx')):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                except UnicodeDecodeError:
                    continue
                
                new_content = content
                
                # Replace exact phrases first
                new_content = new_content.replace("Rêvera Studio", "Rêvera Studios")
                new_content = new_content.replace("Revera Studio", "Revera Studios")
                new_content = new_content.replace("revera-studio", "revera-studios")
                
                # Replace standalone word (case sensitive for Studio and studio)
                # We use \b to ensure it's a whole word, and (?<!s) to ensure it doesn't already end in 's'
                new_content = re.sub(r'\bStudio\b(?!s)', 'Studios', new_content)
                new_content = re.sub(r'\bstudio\b(?!s)', 'studios', new_content)
                
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated {filepath}")

process('.')
