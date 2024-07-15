from rest_framework import serializers  
from .models import OCRProcess, CodeSnippet, User
from .services.code_formatter import format_code
from django.db import transaction

class CodeSnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodeSnippet
        fields = ['id','formatted_code', 'language', 'created_at']

class OCRProcessSerializer(serializers.ModelSerializer):
    snippet = CodeSnippetSerializer(read_only=True)
    original_image = serializers.CharField(write_only=True)

    class Meta:
        model = OCRProcess
        fields = ['id', 'snippet', 'original_image', 'ocr_text', 'created_at']

    def create(self, validated_data):
        original_image_path = validated_data.pop('original_image')
        ocr_text = validated_data.pop('ocr_text')

        formatted_code, language = format_code(ocr_text)

        if not formatted_code:
            formatted_code = ocr_text
        
        try:
            with transaction.atomic():
                snippet = CodeSnippet.objects.create(
                    formatted_code=formatted_code,
                    language=language
                )
                print("Rishav")
                ocr_process = OCRProcess.objects.create(
                    snippet=snippet,
                    original_image=original_image_path,
                    ocr_text=ocr_text
                )
        except Exception as e:
            raise serializers.ValidationError(str(e))

        return ocr_process

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'created_at','first_name','last_name')


class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=3)
    class Meta:
        model = User
        fields = ["email", "password"]