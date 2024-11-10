# api_app/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('run-script/', views.run_script, name='run_script'),
]
# used by urls.py in myproject.