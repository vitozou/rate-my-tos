from django.shortcuts import render

from .core_functions import runGemini

# Create your views here.

from django.http import JsonResponse
from datetime import datetime
from django.views.decorators.http import require_http_methods

@require_http_methods(["POST"])
def run_script(request, TOS, privacy_policy):
    # Example script logic
    output = runGemini(TOS, privacy_policy)
    return JsonResponse(output)

# Hu: called by api_app.views.py