from django.urls import path
from .views import OCRProcessCreateView, signup, user_profile
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # path('ocr-process/', OCRProcessCreateView.as_view(), name='ocr-process-create'),
    # path('image/'),
    path('signup/', signup, name='signup'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', user_profile, name='profile'),
    
]
