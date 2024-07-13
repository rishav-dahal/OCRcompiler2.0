from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate
from .models import OCRProcess, CodeSnippet, Guest ,User
from .serializers import OCRProcessSerializer, UserSerializer ,UserLoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from werkzeug.utils import secure_filename
import os
from django.conf import settings
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from .services.methods import allowed_file
from .services.ocr import run_ocr
from .services.code_formatter import format_code

UPLOAD_FOLDER = "Images"


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class OCRProcessCreateView(generics.CreateAPIView):
    queryset = OCRProcess.objects.all()
    serializer_class = OCRProcessSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            ocr_process = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        email= serializer.data.get('email')
        password = serializer.data.get('password')
        user = authenticate(email=email,password=password)
        if user is not None:
            token = get_tokens_for_user(user)
            return Response({'token':token,'msg':'Login Successful'}, status.HTTP_201_CREATED)
        return Response({'msg':'Login Failed'}, status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        tokens = get_tokens_for_user(user)
        return Response({'tokens': tokens, 'msg': 'User registration success'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([AllowAny])
def upload_image(request):
    if 'image' not in request.data:
        return Response({'msg': 'No image in the request'}, status=status.HTTP_400_BAD_REQUEST)

    image = request.data['image']
    
    if image.name == '':
        return Response({'msg': 'No selected file'}, status=status.HTTP_400_BAD_REQUEST)
    
    if image and allowed_file(image.name):
        filename = secure_filename(image.name)
        file_path = os.path.join(settings.MEDIA_ROOT, filename)
        path = default_storage.save(file_path, ContentFile(image.read()))
        
        # Perform OCR on the uploaded image
        processed_text = run_ocr(path)
        
        # Determine the language and format the code accordingly
        formatted_code,language = format_code(processed_text)

        if not formatted_code:
            formatted_code = processed_text
        # Save the OCR process and code snippet
        snippet = CodeSnippet.objects.create(
            text_content=processed_text,
            formatted_code=formatted_code,
            language=language
        )

        ocr_process = OCRProcess.objects.create(
            original_image=path,
            processed_text=processed_text,
            snippet=snippet
        )

        serializer = OCRProcessSerializer(ocr_process)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response({'msg': 'Image upload failed. Invalid file format.'}, status=status.HTTP_400_BAD_REQUEST)