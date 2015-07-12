from django.db import models
from mongoengine import *

# Create your models here.
class User(Document):
    id = ObjectIdField(db_field="_id")
    name = StringField(required=True, unique=True)
    password = StringField(required=True)


class Notebook(Document):
    id = ObjectIdField(db_field="_id")
    uid = ObjectIdField(required=True)
    name = StringField(required=True, unique=True)
