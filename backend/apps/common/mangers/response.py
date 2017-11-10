from django.contrib.auth.models import AnonymousUser
from rest_framework.response import Response
from ..constants import CODE_SUCCESS, ERR_NO_REQUEST_USER


def construct_response(code, data=None):
    if code == CODE_SUCCESS:
        response = {'result': CODE_SUCCESS}
        if data:
            response['data'] = data
        return Response(response)
    else:
        return Response({'exception': True, 'non_field_errors':data},status=400)


def require_login(func):
    def func_wrapper(self, request, **kwargs):
        if request.user is None or isinstance(request.user, AnonymousUser):
            return Response({'result': 'failed', 'err_code': ERR_NO_REQUEST_USER}, status=400)

        return func(self, request, **kwargs)
    return func_wrapper
