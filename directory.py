import os

def list_files(directory):
    """List all files in a given directory"""
    for root, dirs, files in os.walk(directory):
        level = root.replace(directory, '').count(os.sep)
        indent = ' ' * 4 * (level)
        print(f"{indent}{os.path.basename(root)}/")
        sub_indent = ' ' * 4 * (level + 1)
        for f in files:
            print(f"{sub_indent}{f}")

if __name__ == "__main__":
    project_dir = os.path.dirname(os.path.abspath(__file__))
    list_files(project_dir)