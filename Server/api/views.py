from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate
from .serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
from werkzeug.utils import secure_filename
import os
from django.conf import settings
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from .services.methods import allowed_file
from .services.ocr import run_ocr


UPLOAD_FOLDER = "Images"


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        email= serializer.validated_data.get('email')
        password = serializer.validated_data.get('password')
        user = authenticate(email=email,password=password)
        if user is not None:
            tokens = get_tokens_for_user(user)
            return Response({'tokens':tokens,'msg':'Login Successful'}, status.HTTP_200_OK)
        return Response({'errors':{'non_field_errors':['Email of password is not valid']}}, status.HTTP_404_NOT_FOUND)
    return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    serializer = RegistrationSerializer(data=request.data)
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
        file_path = os.path.join(settings.MEDIA_ROOT,'uploads', filename)
        path = default_storage.save(file_path, ContentFile(image.read()))
        
        ocr_text = run_ocr(path)
        data = {
            'original_image': path,
            'ocr_text': ocr_text
        }
        serializer = OCRProcessSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    return Response({'msg': 'Image upload failed. Invalid file format.'}, status=status.HTTP_400_BAD_REQUEST)