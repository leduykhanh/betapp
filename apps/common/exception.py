from rest_framework.views import exception_handler
from rest_framework.exceptions import APIException,ValidationError
from django.http import HttpResponse
import json
import logging
logger = logging.getLogger(__name__)

from . import constants
class Error(Exception):
    pass


class InvalidParameter(Error):
    pass


class JSONException(APIException):
    def __init__(self, message, errors):
        super(JSONException, self).__init__(message)
        self.errors = errors

class NonFieldException(JSONException):
    pass


class FieldException(APIException):
    def __init__(self, field_name,error):
        super(FieldException, self).__init__(error)
        self.field_name = field_name
    def error_json(self):
        return {
            self.field_name: self.error
        }


def json_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    # Now add the HTTP status code to the response.
    if isinstance(exc, NonFieldException):
        error_dict = {}
        error_dict["non_field_errors"] = exc.errors
        error_dict["exception"] = True
        response = HttpResponse(json.dumps(error_dict), content_type="application/json", status=400)
    elif isinstance(exc,JSONException):
        error_dict = exc.errors
        # error_dict["exception"] = True
        response = HttpResponse(json.dumps(error_dict),content_type="application/json",status=400)

    elif not isinstance(exc,ValidationError):
        response = HttpResponse(json.dumps({"error": constants.ERR_GENERAL,"exception":True}), content_type="application/json",
                                status=500)
    else:
        pass
    logger.debug(exc)
    return response