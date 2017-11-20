from django.contrib.auth import views as auth_views
from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic.base import TemplateView
from apps.upload.views import sign_s3_upload
from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='Pastebin API')

urlpatterns = [
    url(r'^', include('django.contrib.auth.urls')),
    url(r'^admin1701/', include(admin.site.urls)),
    url(r'^api/auth/', include('apps.authentication.urls')),
    url(r'^api/', include('apps.lookup.urls')),
    url(r'^api/', include('apps.betbase.urls')),
    url(r'^explorer', schema_view)
    # url(r'^upload/s3/sign/', sign_s3_upload,name="s3-sign"),
    # url(r'^rest/auth/reset/', TemplateView.as_view(template_name='public/index.html')),
    # url(r'^verify', TemplateView.as_view(template_name='public/index.html'),name='verify'),
    # url(r'^', TemplateView.as_view(template_name='public/index.html'), name='home')

]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# urlpatterns += staticfiles_urlpatterns()
