from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate
from .models import OCRProcess, CodeSnippet, Guest ,User
from .serializers import OCRProcessSerializer, UserSerializer ,UserLoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken

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
    return serializer.errors, status.HTTP_400_BAD_REQUEST

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
