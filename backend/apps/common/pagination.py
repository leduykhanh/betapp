from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from .constants import DEFAULT_ITEM_PER_PAGE


class BasePagination(PageNumberPagination):
    page_size = DEFAULT_ITEM_PER_PAGE
    page_size_query_param = 'perpage'
    max_page_size = 50

    def get_paginated_response(self, data):
        return Response({
            'result': 'success',
            'data': data,
            'page': self.page.number,
            'pageSize': self.page_size,
            'count': self.page.paginator.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link()
        })
