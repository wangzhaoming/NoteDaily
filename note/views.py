from django.shortcuts import render_to_response
from django.template import RequestContext
from bson import ObjectId

from note.models import *


def index(request):
    users = User.objects
    params = {"users" : users}
    return render_to_response('index.html', params, context_instance=RequestContext(request))

def notebooks(request):
    uid = request.POST["uid"]
    notebooks = Notebook.objects(uid=ObjectId(uid))
    params = {"notebooks" : notebooks}
    return render_to_response('notebooks.html', params, context_instance=RequestContext(request))

