from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .core_functions import runGemini
from .core_functions import getTOSLinks
from .core_functions import parsePageText

# Create your views here.

from django.http import JsonResponse
from datetime import datetime
from django.views.decorators.http import require_http_methods

import json

@csrf_exempt
@require_http_methods(["POST"])
def run_script(request):
    # Example script logic
    # output = runGemini(TOS, privacy_policy)
    # return JsonResponse(output)
    data = json.loads(request.body)
    # return JsonResponse({"url": data.get("url")}, status=200)
    currentURL = data.get("url")
    tos_links = getTOSLinks("url")
    combinedPolicy = "";
    
    for link in tos_links:
        combinedPolicy += parsePageText(tos_links)
        combinedPolicy += "\n"
    
    result = runGemini(combinedPolicy)
    return JsonResponse({"result": result}, status=200)

# Hu: called by api_app.views.py