from django.urls import path
from . import views

url_patterns = [
    path('data/', views.datagathering.as_view(), name='data'),
]