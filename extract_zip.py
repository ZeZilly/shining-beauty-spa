import os
import zipfile
import glob

os.chdir('/workspace/user_input_files')

# Find the zip file
zip_files = glob.glob("*.zip")
target_file = [f for f in zip_files if "Kurulumu" in f][0]
print(f"Found file: {target_file}")

# Extract it
with zipfile.ZipFile(target_file, 'r') as zip_ref:
    zip_ref.extractall('kurulum_proje')
    print("Extracted successfully!")
    print("\nContents:")
    for name in zip_ref.namelist():
        print(f"  {name}")
