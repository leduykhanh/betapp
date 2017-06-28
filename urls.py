from django.contrib.auth import views as auth_views
from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic.base import TemplateView
from apps.upload.views import sign_s3_upload
urlpatterns = [
    url(r'^', include('django.contrib.auth.urls')),
    url(r'^api/admin/', include('apps.afs_admin.urls')),
    url(r'^admin2143/', include(admin.site.urls)),
    url(r'^api/auth/', include('apps.authentication.urls')),
    url(r'^api/', include('apps.events.urls')),
    url(r'^api/', include('apps.news.urls')),
    url(r'^api/', include('apps.user.urls')),
    url(r'^api/', include('apps.lookup.urls')),
    url(r'^api/', include('apps.company.urls')),
    url(r'^api/', include('apps.notifications.urls')),
    url(r'^upload/s3/sign/', sign_s3_upload,name="s3-sign"),
    url(r'^rest/auth/reset/', TemplateView.as_view(template_name='public/index.html')),
    url(r'^verify', TemplateView.as_view(template_name='public/index.html'),name='verify'),
    url(r'^', TemplateView.as_view(template_name='public/index.html'), name='home')

]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# urlpatterns += staticfiles_urlpatterns()
