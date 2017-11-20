from itertools import dropwhile, chain

from operator import mul, attrgetter, __not__

from apps.betbase.managers import BetManager

from apps.common.exception import JSONException
from apps.lookup.models import LKUPEventType
from django.db.models.query import EmptyQuerySet, REPR_OUTPUT_SIZE
# from ..recommend_engine.config import LC_WEIGHTS, LC_SORT_ORDERS
# from ..recommend_engine.engine import SimilarRecommendationEngine
from django.db.models import Q, CharField, Max
from rest_framework.authentication import SessionAuthentication
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import detail_route, list_route
from rest_framework.permissions import AllowAny
import datetime
from dateutil.relativedelta import relativedelta
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from .models import Bet, BetEvent, BetCategory
from .serializers import BetSerializer, BetEventSerializer, BetCategorySerializer

from apps.common.pagination import BasePagination
from apps.common.mangers.response import construct_response
from apps.common.constants import ERR_GENERAL, ERR_INVALID_PARAMETER, ERR_OBJ_NOT_EXIST, CODE_SUCCESS, ERR_NO_REQUEST_USER
from django.core.cache import cache

class Temp():
    pass

class BetCategoryViewSet(ModelViewSet):
    serializer_class = BetCategorySerializer
    queryset = BetCategory.objects.all() 
    permission_classes = [AllowAny]

    def get_queryset(self):
        return self.queryset

class BetViewSet(ModelViewSet):
    """
    API endpoint that allows Bet to be viewed or edited.
    """
    queryset = Bet.objects.all() 
    serializer_class = BetSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return self.queryset

class BetEventViewSet(ModelViewSet):
    queryset = BetEvent.objects.all()
    serializer_class = BetEventSerializer
    pagination_class = BasePagination
    permission_classes = [AllowAny]

    def get_queryset(self):
        return self.queryset





def cmp(a, b):
    return (a > b) - (a < b)

