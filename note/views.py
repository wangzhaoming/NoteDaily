from django.shortcuts import *
from django.template import RequestContext
from functools import wraps
from bson import ObjectId

from note.models import *


def authentication(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        if "uid" in request.session:
            return func(request, *args, **kwargs)
        else:
            return redirect("/")
    return wrapper

def index(request):
    if "uid" in request.session:
        return redirect("/notebooks/")
    return render_to_response('index.html', context_instance=RequestContext(request))

@authentication
def notebooks(request):
    uid = request.session["uid"]
    notebooks = Notebook.objects(uid=ObjectId(uid))
    params = {"notebooks" : notebooks}
    return render_to_response('notebooks.html', params, context_instance=RequestContext(request))

def login(request):
    u = request.POST["name"]
    p = request.POST["password"]

    users = User.objects(name=u)

    if users and len(users) == 1 and p == users[0].password:
        request.session["uid"] = str(users[0].id)
        request.session["uname"] = users[0].name
        return redirect("/notebooks/")

    params = {"LOGIN_ERR" : "Login failed!"}
    return render_to_response('index.html', params, context_instance=RequestContext(request))

def logout(request):
    del request.session["uid"]
    del request.session["uname"]
    return redirect("/")

def register(request):
    u = request.POST["name"]
    p = request.POST["password"]
    user = User(name=u, password=p)
    try:
        user.save()
        user = User.objects(name=u).first()
        request.session["uid"] = str(user.id)
        request.session["uname"] = user.name
        return redirect("/notebooks/")
    except:
        params = {"REGISTER_ERR" : "Username exists!"}
        return render_to_response('index.html', params, context_instance=RequestContext(request))
