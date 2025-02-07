from django.urls import path
from .views import upload_image, signup, login, user_profile, download_snippet, delete_code_snippet, compiler_service, logout_view
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# This is URls part
urlpatterns = [
    path('upload/', upload_image, name='upload_image'),
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', user_profile, name='profile'),
    path('code_snippet/<int:snippet_id>/', download_snippet, name='download_snippet'),
    path('code_snippet/<int:pk>/delete/', delete_code_snippet, name='code_snippet_delete'),
    path('compile/', compiler_service, name='compiler_Service'),
    path('logout/', logout_view, name='logout'),
]
