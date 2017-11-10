import boto
import mimetypes
import json
from django.http import HttpResponse
from django.conf import settings


conn = boto.connect_s3(settings.AWS_KEY, settings.AWS_SECRET)

def sign_s3_upload(request):
    object_name = request.GET['objectName']
    content_type = mimetypes.guess_type(object_name)[0]

    signed_url = conn.generate_url(
        300,
        "PUT",
        settings.AWS_BUCKET,
        object_name,
        headers = {'Content-Type': content_type, 'x-amz-acl':'public-read'})

    return HttpResponse(json.dumps({'signedUrl': signed_url}))
