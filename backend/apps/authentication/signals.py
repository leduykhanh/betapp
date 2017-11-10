
from allauth.account.signals import email_confirmed
from django.dispatch import receiver
from allauth.account.adapter import get_adapter
from django.contrib.auth.models import User


@receiver(email_confirmed)
def user_email_confirmed(request, email_address,**kwargs):
    user = User.objects.get(email=email_address.email)
    if user:
        ctx = {
            "user": user
        }
        adapter = get_adapter(request)
        adapter.send_mail("account/email/holding",email_address.email,ctx)
        adapter.send_mail('account/email/admin_new_signup','xiaoguo.pok@goldenequatorconsulting.com',
                          {
                              "USER_NAME" : user.first_name + ' ' + user.last_name,
                              "USER_CONTACT": user.afsuser.mobile,
                              "USER_EMAIL": user.email,
                              "USER_TYPE": user.afsuser.get_company_type(),
                              "COMPANY_NAME": user.afsuser.company.name,
                              "UEN": user.afsuser.company.uen,
                              "VERIFY_LINK": "http://" + request.get_host() + "/private/admin/pending"
                          }
                          )
