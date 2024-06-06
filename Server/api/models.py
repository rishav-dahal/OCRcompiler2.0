from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

from django.contrib.auth.models import BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)
    

class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = CustomUserManager()

    def __str__(self):
        return self.email
    
class Guest(models.Model):
    session_id = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.session_id

class CodeSnippet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    guest = models.ForeignKey(Guest, on_delete=models.CASCADE, null=True, blank=True)
    text_content = models.TextField()
    formatted_code = models.TextField()
    language = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Snippet {self.id} by {self.user or self.guest}"

class OCRProcess(models.Model):
    snippet = models.OneToOneField(CodeSnippet, on_delete=models.CASCADE)
    original_image = models.ImageField(upload_to='ocr_images/')
    processed_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"OCR Process for Snippet {self.snippet.id}"
    

# class Image_upload(models.Model):
#     image = models.ImageField(upload_to='images/')
#     name = models.CharField(max_length=100)
#     description = models.TextField()
#     uploaded_at = models.DateTimeField(auto_now_add=True)
#     user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='images') 