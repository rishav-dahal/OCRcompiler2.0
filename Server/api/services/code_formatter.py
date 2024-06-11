import black
import subprocess

def format_python_code(code):
    try:
        formatted_code = black.format_str(code, mode=black.Mode())
        return formatted_code
    except Exception as e:
        return None

def format_cpp_code(code):
    try:
        formatted_code = subprocess.run(['clang-format'], input=code.encode(), capture_output=True, text=True).stdout
        return formatted_code
    except Exception as e:
        return None

def format_java_code(code):
    # NOT FOUND
    return code

def format_javascript_code(code):
    try:
        formatted_code = subprocess.run(['prettier', '--stdin-filepath', 'file.js'], input=code.encode(), capture_output=True, text=True).stdout
        return formatted_code
    except Exception as e:
        return None

def format_html_code(code):
    try:
        formatted_code = subprocess.run(['prettier', '--stdin-filepath', 'file.html'], input=code.encode(), capture_output=True, text=True).stdout
        return formatted_code
    except Exception as e:
        return None

def format_c_code(code):
    try:
        formatted_code = subprocess.run(['clang-format'], input=code.encode(), capture_output=True, text=True).stdout
        return formatted_code
    except Exception as e:
        return None
    
def format_code(processed_text):
    if 'def' in processed_text or 'import' in processed_text:
        language = 'python'
        formatted_code = format_python_code(processed_text)
    elif '#include' in processed_text or 'int main' in processed_text:
        language = 'c'
        formatted_code = format_c_code(processed_text)
    elif 'class' in processed_text and 'public static void main' in processed_text:
        language = 'java'
        formatted_code = format_java_code(processed_text)
    elif 'function' in processed_text or 'console.log' in processed_text:
        language = 'javascript'
        formatted_code = format_javascript_code(processed_text)
    elif '<html>' in processed_text or '<body>' in processed_text:
        language = 'html'
        formatted_code = format_html_code(processed_text)
    else:
        language = 'unknown'
        formatted_code = processed_text

    return formatted_code, language

# def format_code(code, language):
#     if language == 'python':
#         return format_python_code(code)
#     elif language == 'cpp':
#         return format_cpp_code(code)
#     return code 