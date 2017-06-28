from django.conf import settings


def global_settings(request):
    return {
        'WEBPACK_DEV_SERVER': settings.WEBPACK_DEV_SERVER
    }
