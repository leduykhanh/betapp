import datetime
from dateutil.relativedelta import relativedelta
from ..exception import InvalidParameter


def get_start_and_end_of_month(year, month, blank=True):
    if year is None:
        if month is not None:
            raise InvalidParameter
        else:
            if blank:
                start_time = datetime.datetime.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
            else:
                raise InvalidParameter
    else:
        if month is None:
            raise InvalidParameter
        else:
            try:
                year_int = int(year)
            except:
                raise InvalidParameter
            try:
                month_int = int(month)
            except:
                raise InvalidParameter
            start_time = datetime.datetime(year_int, month_int, 1, 0, 0, 0, 0)
    end_time = start_time + relativedelta(months=1)
    return start_time, end_time
