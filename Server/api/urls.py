from django.urls import path
from .views import OCRProcessCreateView, signup, user_profile , upload_image,login
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # path('ocr-process/', OCRProcessCreateView.as_view(), name='ocr-process-create'),
    path('upload/', upload_image, name='upload_image'),
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', user_profile, name='profile'),
    
]
