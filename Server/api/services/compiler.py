import subprocess
from rest_framework.response import Response
import re
import os

def compile_code(request):
    code = request.data.get('code')
    language = request.data.get('language')
    input_data = request.data.get('input', '')
    if language == 'python':
        return compile_python(code, input_data)
    elif language == 'cpp':
        return compile_cpp(code, input_data)
    elif language == 'c':
        return compile_c(code, input_data)
    elif language == 'java':
        return compile_java(code, input_data)
    elif language == 'javascript':
        return compile_javascript(code, input_data)
    else:
        return Response({'error': 'Unsupported language'}, status=400)

def compile_python(code, input_data):
    try:
        # If input data is bytes, convert it to string
        if isinstance(input_data, bytes):
            input_data = input_data.decode()

        result = subprocess.run(
            ['python', '-c', code], 
            input=input_data, 
            capture_output=True, 
            text=True
        )

        # Get the last line of the output
        output_lines = result.stdout.strip().split('\n')
        if len(output_lines) > 1:
            final_output = output_lines[-1]  # Get the last line which should be the result
        else:
            final_output = result.stdout.strip()

        return Response({'output': final_output})
    except Exception as e:
        return Response({'error': str(e)})

def compile_c(code, input_data):
    try:
        file_name = 'temp.c'
        with open(file_name, 'w') as f:
            f.write(code)
        
        compile_result = subprocess.run(['gcc', 'temp.c', '-o', 'temp.out'], capture_output=True, text=True)
        if compile_result.returncode != 0:
            return Response({'error': compile_result.stderr})
        
        run_result = subprocess.run(['./temp.out'], input=input_data, capture_output=True, text=True)
        
        os.remove(file_name)
        os.remove('temp.out')
        
        return Response({'output': run_result.stdout.strip()})
    except Exception as e:
        return Response({'error': str(e)})

import subprocess
from rest_framework.response import Response

def compile_cpp(code, input_data):
    try:
        file_name = 'temp.cpp'
        with open(file_name, 'w') as f:
            f.write(code)

        compile_result = subprocess.run(['g++', 'temp.cpp', '-o', 'temp.out'], capture_output=True, text=True)
        if compile_result.returncode != 0:
            return Response({'error': compile_result.stderr})
        
        run_result = subprocess.run(['./temp.out'], input=input_data, capture_output=True, text=True)
        
        os.remove(file_name)
        os.remove('temp.out')
        return Response({'output': run_result.stdout.strip()})
    except Exception as e:
        return Response({'error': str(e)})

def compile_java(code, input_data):
    try:

        class_name_match = re.search(r'public\s+class\s+(\w+)', code)
        if not class_name_match:
            return Response({'error': 'No public class found in the code.'})
        
        class_name = class_name_match.group(1)
        file_name = f"{class_name}.java"
        
        with open(file_name, 'w') as f:
            f.write(code)
        
        compile_result = subprocess.run(['javac', file_name], capture_output=True, text=True)
        if compile_result.returncode != 0:
            return Response({'error': compile_result.stderr})
        
        run_result = subprocess.run(['java', class_name], input=input_data, capture_output=True, text=True)

        os.remove(file_name)
        os.remove(f"{class_name}.class")
        
        return Response({'output': run_result.stdout.strip()})
    except Exception as e:
        return Response({'error': str(e)})

def compile_javascript(code, input_data):
    try:
        file_name = 'temp.js'
        with open(file_name, 'w') as f:
            f.write(code)
        
        run_result = subprocess.run(['node', 'temp.js'], input=input_data, capture_output=True, text=True)
        
        os.remove(file_name)
        
        return Response({'output': run_result.stdout.strip()})
    except Exception as e:
        return Response({'error': str(e)})
