__author__ = 'Pok'
from config.settings.base import *
WEBPACK_DEV_SERVER = True
DEBUG = True
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'formatters': {
        'verbose': {
            'format': '%(levelname)s %(asctime)s %(module)s %(process)d %(thread)d %(message)s',
        },
        'simple': {
            'format': '%(levelname)s %(message)s',
        },
    },
    'handlers': {
        'mail_admins': {
            'level': 'DEBUG',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        },
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'loggers': {

        'allauth': {
            # 'handlers': ['mail_admins'],
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
        'apps.profile': {
            # 'handlers': ['mail_admins'],
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
    }
}

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'afs',
        'USER': 'afs_user',
        'PASSWORD': 'afs1234',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}
AWS_BUCKET = "asia-fund-space-test"