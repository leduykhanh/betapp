from django.core.management.base import BaseCommand
from django.db import transaction
from ...models import LKUPIndustry, LKUPCountry, LKUPAccountType, LKUPEventType, LKUPRegion, LKUPManagementRole, LKUPSubIndustry, LKUPLanguage


class Command(BaseCommand):
    ACCOUNT_TYPE = [
        ('FUND MGR', 'FUND MANAGERS', 'FM'),
        ('LISTED COY', 'LISTED COMPANY', 'LC'),
        ('ADMIN', 'ADMIN', 'AM')
    ]

    EVENT_TYPE = [
        ('SEMINARS', 'Seminars', 'SMN','PUBLIC'),
        ('CONFERENCE', 'Conference', 'CONF','PUBLIC'),
        ('ROADSHOW', 'Roadshow', 'RDS','PUBLIC'),
        ('PLANT VISIT', 'Plant Visit', 'PLTV','PUBLIC'),
        ('IR BRIEFING', 'IR Briefings', 'IRB', 'PUBLIC'),
        ('MEETING', 'Meeting', 'MTNG','PRIVATE'),
        ('ONE ONE ONE', 'One on one', 'OOO','PRIVATE')
    ]

    INDUSTRY = [
        ('CONG', 'Conglomerate'),
        ('CNSG', 'Consumer Goods'),
        ('INDU', 'Industrial'),
        ('FINA', 'Finance'),
        ('HLCR', 'Health Care'),
        ('BMAT', 'Basic Materials'),
        ('OIL', 'Oil'),
        ('CSMS', 'Consumer Service'),
        ('ENER', 'Energy'),
        ('TECH', 'Technology')
    ]
    SUB_INDUSTRY = (
        # - Industrial
        ("INDU", "CNM", "Construction & Materials"),
        ("INDU", "AND", "Aerospace & Defense"),
        ("INDU", "GEI", "General Industrials"),
        ("INDU", "EEE", "Electronic & Electrical  Equipment"),
        ("INDU", "INE", "Industrial Engineering"),
        ("INDU", "INT", "Industrial Transportation"),
        ("INDU", "SUS", "Support Services"),
        # - Health Care
        ('HLCR', "HCES", "Health Care Equipment & Service"),
        ('HLCR', "PBLS", "Pharmaceuticals, Biotechnology & Life  Sciences"),
        # - Energy
        ('ENER', "OGP", "Oil & Gas Producers"),
        ('ENER', "OESD", "Oil Equipment, Services & Distribution"),
        ('ENER', "ALE", "Alternative Energy"),
        # - Consumer Goods
        ('CNSG', "AUP", "Automobiles & Parts"),
        ('CNSG', "FOB", "Food & Beverage"),
        ('CNSG', "PHG", "Personal & Household Goods"),
        # - Finance
        ('FINA', "BNK", "Banks"),
        ('FINA', "FIS", "Financial Services"),
        ('FINA', "INS", "Insurance"),
        ('FINA', "RER", "Real Estate & REITS"),
        # - Basic Materials"),
        ('BMAT', "CHEM", "Chemicals"),
        ('BMAT', "PNP", "Forestry & Paper"),
        ('BMAT', "MNP", "Mining & Processing"),
            # - Technology
        ('TECH',"SNCS", "Software & Computer  Service"),
        ('TECH', "THNE", "Technology Hardware & Equipment"),
            # - Consumer Service
        ('CSMS', "RET", "Retail"),
        ('CSMS', "MED", "Media"),
        ('CSMS', "TNL", "Travel & Leisure"),
    )

    COUNTRY = [
        ('Afghanistan', 'AF'), ('Åland Islands', 'AX'), ('Albania', 'AL'), ('Algeria', 'DZ'), ('American Samoa', 'AS'),
        ('Andorra', 'AD'), ('Angola', 'AO'), ('Anguilla', 'AI'), ('Antarctica', 'AQ'), ('Antigua and Barbuda', 'AG'),
        ('Argentina', 'AR'), ('Armenia', 'AM'), ('Aruba', 'AW'), ('Australia', 'AU'), ('Austria', 'AT'),
        ('Azerbaijan', 'AZ'), ('Bahamas', 'BS'), ('Bahrain', 'BH'), ('Bangladesh', 'BD'), ('Barbados', 'BB'),
        ('Belarus', 'BY'), ('Belgium', 'BE'), ('Belize', 'BZ'), ('Benin', 'BJ'), ('Bermuda', 'BM'), ('Bhutan', 'BT'),
        ('Bolivia', 'BO'), ('Bosnia and Herzegovina', 'BA'), ('Botswana', 'BW'), ('Bouvet Island', 'BV'),
        ('Brazil', 'BR'), ('British Indian Ocean Territory', 'IO'), ('Brunei Darussalam', 'BN'), ('Bulgaria', 'BG'),
        ('Burkina Faso', 'BF'), ('Burundi', 'BI'), ('Cambodia', 'KH'), ('Cameroon', 'CM'), ('Canada', 'CA'),
        ('Cape Verde', 'CV'), ('Cayman Islands', 'KY'), ('Central African Republic', 'CF'), ('Chad', 'TD'),
        ('Chile', 'CL'), ('China', 'CN'), ('Christmas Island', 'CX'), ('Cocos (Keeling) Islands', 'CC'),
        ('Colombia', 'CO'), ('Comoros', 'KM'), ('Congo', 'CG'), ('Congo, The Democratic Republic of The', 'CD'),
        ('Cook Islands', 'CK'), ('Costa Rica', 'CR'), ('Cote D\'ivoire', 'CI'), ('Croatia', 'HR'), ('Cuba', 'CU'),
        ('Cyprus', 'CY'), ('Czech Republic', 'CZ'), ('Denmark', 'DK'), ('Djibouti', 'DJ'), ('Dominica', 'DM'),
        ('Dominican Republic', 'DO'), ('Ecuador', 'EC'), ('Egypt', 'EG'), ('El Salvador', 'SV'),
        ('Equatorial Guinea', 'GQ'), ('Eritrea', 'ER'), ('Estonia', 'EE'), ('Ethiopia', 'ET'),
        ('Falkland Islands (Malvinas)', 'FK'), ('Faroe Islands', 'FO'), ('Fiji', 'FJ'), ('Finland', 'FI'),
        ('France', 'FR'), ('French Guiana', 'GF'), ('French Polynesia', 'PF'), ('French Southern Territories', 'TF'),
        ('Gabon', 'GA'), ('Gambia', 'GM'), ('Georgia', 'GE'), ('Germany', 'DE'), ('Ghana', 'GH'), ('Gibraltar', 'GI'),
        ('Greece', 'GR'), ('Greenland', 'GL'), ('Grenada', 'GD'), ('Guadeloupe', 'GP'), ('Guam', 'GU'),
        ('Guatemala', 'GT'), ('Guernsey', 'GG'), ('Guinea', 'GN'), ('Guinea-bissau', 'GW'), ('Guyana', 'GY'),
        ('Haiti', 'HT'), ('Heard Island and Mcdonald Islands', 'HM'), ('Holy See (Vatican City State)', 'VA'),
        ('Honduras', 'HN'), ('Hong Kong', 'HK'), ('Hungary', 'HU'), ('Iceland', 'IS'), ('India', 'IN'),
        ('Indonesia', 'ID'), ('Iran, Islamic Republic of', 'IR'), ('Iraq', 'IQ'), ('Ireland', 'IE'),
        ('Isle of Man', 'IM'), ('Israel', 'IL'), ('Italy', 'IT'), ('Jamaica', 'JM'), ('Japan', 'JP'), ('Jersey', 'JE'),
        ('Jordan', 'JO'), ('Kazakhstan', 'KZ'), ('Kenya', 'KE'), ('Kiribati', 'KI'),
        ('Korea, Democratic People\'s Republic of', 'KP'), ('Korea, Republic of', 'KR'), ('Kuwait', 'KW'),
        ('Kyrgyzstan', 'KG'), ('Lao People\'s Democratic Republic', 'LA'), ('Latvia', 'LV'), ('Lebanon', 'LB'),
        ('Lesotho', 'LS'), ('Liberia', 'LR'), ('Libyan Arab Jamahiriya', 'LY'), ('Liechtenstein', 'LI'),
        ('Lithuania', 'LT'), ('Luxembourg', 'LU'), ('Macao', 'MO'),
        ('Macedonia, The Former Yugoslav Republic of', 'MK'), ('Madagascar', 'MG'), ('Malawi', 'MW'),
        ('Malaysia', 'MY'), ('Maldives', 'MV'), ('Mali', 'ML'), ('Malta', 'MT'), ('Marshall Islands', 'MH'),
        ('Martinique', 'MQ'), ('Mauritania', 'MR'), ('Mauritius', 'MU'), ('Mayotte', 'YT'), ('Mexico', 'MX'),
        ('Micronesia, Federated States of', 'FM'), ('Moldova, Republic of', 'MD'), ('Monaco', 'MC'), ('Mongolia', 'MN'),
        ('Montenegro', 'ME'), ('Montserrat', 'MS'), ('Morocco', 'MA'), ('Mozambique', 'MZ'), ('Myanmar', 'MM'),
        ('Namibia', 'NA'), ('Nauru', 'NR'), ('Nepal', 'NP'), ('Netherlands', 'NL'), ('Netherlands Antilles', 'AN'),
        ('New Caledonia', 'NC'), ('New Zealand', 'NZ'), ('Nicaragua', 'NI'), ('Niger', 'NE'), ('Nigeria', 'NG'),
        ('Niue', 'NU'), ('Norfolk Island', 'NF'), ('Northern Mariana Islands', 'MP'), ('Norway', 'NO'), ('Oman', 'OM'),
        ('Pakistan', 'PK'), ('Palau', 'PW'), ('Palestinian Territory, Occupied', 'PS'), ('Panama', 'PA'),
        ('Papua New Guinea', 'PG'), ('Paraguay', 'PY'), ('Peru', 'PE'), ('Philippines', 'PH'), ('Pitcairn', 'PN'),
        ('Poland', 'PL'), ('Portugal', 'PT'), ('Puerto Rico', 'PR'), ('Qatar', 'QA'), ('Reunion', 'RE'),
        ('Romania', 'RO'), ('Russian Federation', 'RU'), ('Rwanda', 'RW'), ('Saint Helena', 'SH'),
        ('Saint Kitts and Nevis', 'KN'), ('Saint Lucia', 'LC'), ('Saint Pierre and Miquelon', 'PM'),
        ('Saint Vincent and The Grenadines', 'VC'), ('Samoa', 'WS'), ('San Marino', 'SM'),
        ('Sao Tome and Principe', 'ST'), ('Saudi Arabia', 'SA'), ('Senegal', 'SN'), ('Serbia', 'RS'),
        ('Seychelles', 'SC'), ('Sierra Leone', 'SL'), ('Singapore', 'SG'), ('Slovakia', 'SK'), ('Slovenia', 'SI'),
        ('Solomon Islands', 'SB'), ('Somalia', 'SO'), ('South Africa', 'ZA'),
        ('South Georgia and The South Sandwich Islands', 'GS'), ('Spain', 'ES'), ('Sri Lanka', 'LK'), ('Sudan', 'SD'),
        ('Suriname', 'SR'), ('Svalbard and Jan Mayen', 'SJ'), ('Swaziland', 'SZ'), ('Sweden', 'SE'),
        ('Switzerland', 'CH'), ('Syrian Arab Republic', 'SY'), ('Taiwan, Province of China', 'TW'),
        ('Tajikistan', 'TJ'), ('Tanzania, United Republic of', 'TZ'), ('Thailand', 'TH'), ('Timor-leste', 'TL'),
        ('Togo', 'TG'), ('Tokelau', 'TK'), ('Tonga', 'TO'), ('Trinidad and Tobago', 'TT'), ('Tunisia', 'TN'),
        ('Turkey', 'TR'), ('Turkmenistan', 'TM'), ('Turks and Caicos Islands', 'TC'), ('Tuvalu', 'TV'),
        ('Uganda', 'UG'), ('Ukraine', 'UA'), ('United Arab Emirates', 'AE'), ('United Kingdom', 'GB'),
        ('United States', 'US'), ('United States Minor Outlying Islands', 'UM'), ('Uruguay', 'UY'),
        ('Uzbekistan', 'UZ'), ('Vanuatu', 'VU'), ('Venezuela', 'VE'), ('Viet Nam', 'VN'),
        ('Virgin Islands, British', 'VG'), ('Virgin Islands, U.S.', 'VI'), ('Wallis and Futuna', 'WF'),
        ('Western Sahara', 'EH'), ('Yemen', 'YE'), ('Zambia', 'ZM'), ('Zimbabwe', 'ZW')
    ],

    REGION = [
        ('Global', 'Global', "GLBL"),
        ('East Asia', 'East Asia (China, Hong Kong SAR, Japan, South Korea, Taiwan)', 'ESTA'),
        ('South-East Asia', 'South-East Asia (Thailand, Vietnam, Malaysia, Brunei, Indonesia, Philippines, Singapore, Myanmmar)', 'SHEA'),
        ('South Asia', 'South Asia (Bangladesh, India, Pakistan, Sri Lanka)', 'STHA'),
        ('Australia / New Zealand', 'Australia / New Zealand', 'AUNZ'),
        ('US', 'US', 'US'),
        ('Europe', 'Europe', 'EU'),
        ('Middle East', 'Middle East', 'MDET'),
        ('Africa', 'Africa', 'AFC'),
        ('Others', 'Others', 'OTH')
    ]
    MGMT_ROLES = (
        ("CEO", "Chief Executive Officer"),
        ("COO", "Chief Operating Officer"),
        ("CFO", "Chief Finance Officer")
    )
    LANGUAGES = (
        {"language": "Afar", "code": "aa"},
        {"language": "Abkhazian", "code": "ab"},
        {"language": "Afrikaans", "code": "af"},
        {"language": "Akan", "code": "ak"},
        {"language": "Albanian", "code": "sq"},
        {"language": "Amharic", "code": "am"},
        {"language": "Aragonese", "code": "an"},
        {"language": "Arabic", "code": "ar"},
        {"language": "Armenian", "code": "hy"},
        {"language": "Assamese", "code": "as"},
        {"language": "Avar", "code": "av"},
        {"language": "Aymara", "code": "ay"},
        {"language": "Azerbaijani", "code": "az"},
        {"language": "Bambara", "code": "bm"},
        {"language": "Bashkir", "code": "ba"},
        {"language": "Basque", "code": "eu"},
        {"language": "Belarusian", "code": "be"},
        {"language": "Bengali", "code": "bn"},
        {"language": "Bihari", "code": "bh"},
        {"language": "Bislama", "code": "bi"},
        {"language": "Bosnian", "code": "bs"},
        {"language": "Breton", "code": "br"},
        {"language": "Bulgarian", "code": "bg"},
        {"language": "Burmese", "code": "my"},
        {"language": "Cambodian", "code": "km"},
        {"language": "Catalan", "code": "ca"},
        {"language": "Chechen", "code": "ce"},
        {"language": "Chamorro", "code": "ch"},
        {"language": "Chichewa", "code": "ny"},
        {"language": "Chinese", "code": "zh"},
        {"language": "Cornish", "code": "kw"},
        {"language": "Corsican", "code": "co"},
        {"language": "Cree", "code": "cr"},
        {"language": "Croatian", "code": "hr"},
        {"language": "Czech", "code": "cs"},
        {"language": "Chuvash", "code": "cv"},
        {"language": "Danish", "code": "da"},
        {"language": "Divehi", "code": "dv"},
        {"language": "Dutch", "code": "nl"},
        {"language": "Dzongkha", "code": "dz"},
        {"language": "Ewe", "code": "ee"},
        {"language": "English", "code": "en"},
        {"language": "Esperanto", "code": "eo"},
        {"language": "Estonian", "code": "et"},
        {"language": "Finnish", "code": "fi"},
        {"language": "Fijian", "code": "fj"},
        {"language": "Faroese", "code": "fo"},
        {"language": "French", "code": "fr"},
        {"language": "Ganda", "code": "lg"},
        {"language": "German", "code": "de"},
        {"language": "Greek", "code": "el"},
        {"language": "Greenlandic", "code": "kl"},
        {"language": "Galician", "code": "gl"},
        {"language": "Guarani", "code": "gn"},
        {"language": "Gujarati", "code": "gu"},
        {"language": "Haitian", "code": "ht"},
        {"language": "Hausa", "code": "ha"},
        {"language": "Hebrew", "code": "he"},
        {"language": "Herero", "code": "hz"},
        {"language": "Hindi", "code": "hi"},
        {"language": "Hiri Motu", "code": "ho"},
        {"language": "Hungarian", "code": "hu"},
        {"language": "Icelandic", "code": "is"},
        {"language": "Ido", "code": "io"},
        {"language": "Igbo", "code": "ig"},
        {"language": "Interlingua", "code": "ia"},
        {"language": "Indonesian", "code": "id"},
        {"language": "Interlingue", "code": "ie"},
        {"language": "Inuktitut", "code": "iu"},
        {"language": "Inupiak", "code": "ik"},
        {"language": "Irish", "code": "ga"},
        {"language": "Italian", "code": "it"},
        {"language": "Japanese", "code": "ja"},
        {"language": "Javanese", "code": "jv"},
        {"language": "Kannada", "code": "kn"},
        {"language": "Kanuri", "code": "kr"},
        {"language": "Kashmiri", "code": "ks"},
        {"language": "Kazakh", "code": "kk"},
        {"language": "Kikuyu", "code": "ki"},
        {"language": "Kirghiz", "code": "ky"},
        {"language": "Kirundi", "code": "rn"},
        {"language": "Komi", "code": "kv"},
        {"language": "Kongo", "code": "kg"},
        {"language": "Korean", "code": "ko"},
        {"language": "Kuanyama", "code": "kj"},
        {"language": "Kurdish", "code": "ku"},
        {"language": "Laotian", "code": "lo"},
        {"language": "Latin", "code": "la"},
        {"language": "Latvian", "code": "lv"},
        {"language": "Limburgian", "code": "li"},
        {"language": "Lingala", "code": "ln"},
        {"language": "Lithuanian", "code": "lt"},
        {"language": "Luxembourgish", "code": "lb"},
        {"language": "Macedonian", "code": "mk"},
        {"language": "Malagasy", "code": "mg"},
        {"language": "Malayalam", "code": "ml"},
        {"language": "Malay", "code": "ms"},
        {"language": "Maltese", "code": "mt"},
        {"language": "Marathi", "code": "mr"},
        {"language": "Marshallese", "code": "mh"},
        {"language": "Manx", "code": "gv"},
        {"language": "Maori", "code": "mi"},
        {"language": "Moldovan", "code": "mo"},
        {"language": "Mongolian", "code": "mn"},
        {"language": "Nauruan", "code": "na"},
        {"language": "Navajo", "code": "nv"},
        {"language": "Ndonga", "code": "ng"},
        {"language": "Nepali", "code": "ne"},
        {"language": "North Ndebele", "code": "nd"},
        {"language": "Norwegian Nynorsk", "code": "nn"},
        {"language": "Norwegian", "code": "no"},

        {"language": "Occitan", "code": "oc"},
        {"language": "Ojibwa", "code": "oj"},
        {"language": "Oromo", "code": "om"},
        {"language": "Oriya", "code": "or"},
        {"language": "Ossetian", "code": "os"},
        {"language": "Pali", "code": "pi"},
        {"language": "Pashto", "code": "ps"},
        {"language": "Persian", "code": "fa"},
        {"language": "Peul", "code": "ff"},
        {"language": "Polish", "code": "pl"},
        {"language": "Portuguese", "code": "pt"},
        {"language": "Punjabi", "code": "pa"},
        {"language": "Quechua", "code": "qu"},
        {"language": "Raeto Romance", "code": "rm"},
        {"language": "Romanian", "code": "ro"},
        {"language": "Russian", "code": "ru"},
        {"language": "Rwandi", "code": "rw"},
        {"language": "Samoan", "code": "sm"},
        {"language": "Sango", "code": "sg"},
        {"language": "Sanskrit", "code": "sa"},
        {"language": "Sardinian", "code": "sc"},
        {"language": "Scottish Gaelic", "code": "gd"},
        {"language": "Serbian", "code": "sr"},
        {"language": "Serbo-Croatian", "code": "sh"},
        {"language": "Shona", "code": "sn"},
        {"language": "Sichuan Yi", "code": "ii"},
        {"language": "Sindhi", "code": "sd"},
        {"language": "Sinhalese", "code": "si"},
        {"language": "Slovak", "code": "sk"},
        {"language": "Slovenian", "code": "sl"},
        {"language": "Somalia", "code": "so"},
        {"language": "South Ndebele", "code": "nr"},
        {"language": "Southern Sotho", "code": "st"},
        {"language": "Spanish", "code": "es"},
        {"language": "Sundanese", "code": "su"},
        {"language": "Swahili", "code": "sw"},
        {"language": "Swati", "code": "ss"},
        {"language": "Swedish", "code": "sv"},
        {"language": "Tagalog", "code": "tl"},
        {"language": "Tahitian", "code": "ty"},
        {"language": "Tamil", "code": "ta"},
        {"language": "Tajik", "code": "tg"},
        {"language": "Tatar", "code": "tt"},
        {"language": "Telugu", "code": "te"},
        {"language": "Thai", "code": "th"},
        {"language": "Tibetan", "code": "bo"},
        {"language": "Tigrinya", "code": "ti"},
        {"language": "Tonga", "code": "to"},
        {"language": "Tswana", "code": "tn"},
        {"language": "Tsonga", "code": "ts"},
        {"language": "Turkmen", "code": "tk"},
        {"language": "Turkish", "code": "tr"},
        {"language": "Twi", "code": "tw"},
        {"language": "Urdu", "code": "ur"},
        {"language": "Uyghur", "code": "ug"},
        {"language": "Venda", "code": "ve"},
        {"language": "Vietnamese", "code": "vi"},
        {"language": "Volapük", "code": "vo"},
        {"language": "Walloon", "code": "wa"},
        {"language": "Welsh", "code": "cy"},
        {"language": "West Frisian", "code": "fy"},
        {"language": "Wolof", "code": "wo"},
        {"language": "Xhosa", "code": "xh"},
        {"language": "Yiddish", "code": "yi"},
        {"language": "Yoruba", "code": "yo"},
        {"language": "Zhuang", "code": "za"},
        {"language": "Zulu", "code": "zu"}
    )

    @transaction.atomic
    def handle(self, *args, **options):
        from countries_plus.models import Country
        if LKUPIndustry.objects.all().count() == 0:
            for code, name in Command.INDUSTRY:
                LKUPIndustry.objects.create(code=code, name=name)
        if LKUPCountry.objects.all().count() == 0:
            for country in Country.objects.all():
                LKUPCountry.objects.create(name=country.name, iso=country.iso)
        if LKUPAccountType.objects.all().count() == 0:
            for name, description, code in Command.ACCOUNT_TYPE:
                LKUPAccountType.objects.create(name=name, description=description, code=code)
        if LKUPEventType.objects.all().count() == 0:
            for name, description, code, visibility in Command.EVENT_TYPE:
                LKUPEventType.objects.create(name=name, description=description, code=code,visibility=visibility)
        if LKUPRegion.objects.all().count() == 0:
            for name, description, code in Command.REGION:
                LKUPRegion.objects.create(name=name, description=description, code=code)

        if LKUPManagementRole.objects.all().count() == 0:
            for code, name in Command.MGMT_ROLES:
                LKUPManagementRole.objects.create(code=code, name=name)
        if LKUPSubIndustry.objects.all().count() == 0:
            for industry, code, name in Command.SUB_INDUSTRY:
                LKUPSubIndustry.objects.create(industry=LKUPIndustry.objects.get(code=industry),code=code, name=name)
        # if LKUPLanguage.objects.all().count() == 0:
        for item in Command.LANGUAGES:
            if not LKUPLanguage.objects.filter(code=item.get("code")):
                LKUPLanguage.objects.create(code=item.get("code"), name=item.get("language"))

