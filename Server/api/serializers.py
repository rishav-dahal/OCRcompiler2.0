from rest_framework import serializers
from .models import OCRProcess, CodeSnippet, User
# from .ocr import run

class CodeSnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodeSnippet
        fields = ['id', 'text_content', 'formatted_code', 'language', 'created_at']

class OCRProcessSerializer(serializers.ModelSerializer):
    snippet = CodeSnippetSerializer(read_only=True)
    original_image = serializers.ImageField(write_only=True)

    class Meta:
        model = OCRProcess
        fields = ['id', 'snippet', 'original_image', 'processed_text', 'created_at']

    def create(self, validated_data):
        original_image = validated_data.pop('original_image')
        # processed_text = run(original_image)
        formatted_code = "Formatted code from OCR"  # Replace with actual code formatting

        snippet = CodeSnippet.objects.create(
            # text_content=processed_text,
            formatted_code=formatted_code,
            language="python"  # Determine the language as needed
        )

        ocr_process = OCRProcess.objects.create(
            snippet=snippet,
            original_image=original_image,
            # processed_text=processed_text
        )

        return ocr_process

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'created_at','first_name','last_name')


class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=3)
    class Meta:
        model = User
        fields = ["email", "password", "first_name", "last_name"]