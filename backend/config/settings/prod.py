from config.settings.base import *
WEBPACK_DEV_SERVER = False
DEBUG = False

LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
        'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'formatters': {
        'standard': {
            'format': '%(asctime)s [%(levelname)s] %(name)s: %(message)s'
        },
    },
    'handlers': {
        'default': {
            'level':'DEBUG',
            'class':'logging.handlers.RotatingFileHandler',
            'filename': '/var/log/django/afs.log',
            'maxBytes': 1024*1024*50, # 5 MB
            'backupCount': 5,
            'formatter':'standard',
        },
        'request_handler': {
            'level':'DEBUG',
            'class':'logging.handlers.RotatingFileHandler',
            'filename': '/var/log/django/django_request.log',
            'maxBytes': 1024*1024*50, # 5 MB
            'backupCount': 5,
            'formatter':'standard',
        },
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        }
    },
    'root': {
        'handlers': ['default'],
        'level': 'DEBUG',
        'propagate': True
    },
    'loggers': {
        'django.request': {
            'handlers': ['request_handler'],
            'level': 'DEBUG',
            'propagate': True
        },
        '': {
            'handlers': ['default'],
            'level': 'DEBUG',
            'propagate': True
        }
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
AWS_BUCKET = "asia-fund-space"