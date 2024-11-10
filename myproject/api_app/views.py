from django.shortcuts import render

# Create your views here.

from django.http import JsonResponse
from datetime import datetime
from django.views.decorators.http import require_http_methods

@require_http_methods(["POST"])
def run_script(request):
    # Example script logic
    output = {"current_time": datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
    return JsonResponse(output)

# Hu: called by api_app.views.py