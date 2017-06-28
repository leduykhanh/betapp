import six
from allauth_djrill.tasks import send_mandrill_template_mail

DJRILL_TEMPLATE_MAP = {
    "event/create": "event_creation",
    "event/invite": "email_invitation_to_event",
    "event/invite/cancel": "email_event_invitation_cancelled",
    "event/invite/accept_late": "event_host_accepted_request_after_rsvp_date",
    "event/invite/reject_late": "event_host_rejected_request_after_rsvp_date",
    "news/create": "news_creation",
    'account/email/welcome': 'email_confirmation_welcome',
    "event/edit": "email_event_updated",
    "event/remove": "email_event_cancelled",
    "connect/invitation":"email_invitation_to_connect",
    'event/rsvp/late': 'event_invitee_accept_after_rsvp_date',
    'event/invite/connect': 'email_invitation_to_connect_and_join_event'
}

def send_mail(template_prefix, email, context):
    # Allow for overriding with '' or None
    if template_prefix in DJRILL_TEMPLATE_MAP and DJRILL_TEMPLATE_MAP[template_prefix]:
        mandrill_template = DJRILL_TEMPLATE_MAP[template_prefix]
        merge_vars = {}
        for key, value in six.iteritems(context):
            if key == 'current_site':
                # This will always be in the context, but we don't want to pass it along
                continue
            if key == 'user':
                value = value.get_full_name()
            elif isinstance(value, (int, str)):
                pass
            else:
                raise TypeError('Unknown object in allauth email context %s: %s' % (key, value))
            merge_vars[key] = value
        try:
            send_mandrill_template_mail.apply_async(kwargs={
                'template_name': mandrill_template,
                'to': email,
                'global_merge_vars': merge_vars,
            })
        except:
            pass #Email may not exist