import { Component, Injectable, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { UserService } from 'src/app/services/user/user.service';
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}
interface UpdateUserResponse {
  success: boolean;
  message?: string; // Optional property if your API returns a message
}


@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
      : '';
  }
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ]
})
export class UserComponent implements OnInit {
  modalReference: NgbModalRef;
  basicModalCloseResult: string;
  items: any;
  page: any = 0;
  filterObj: any = { p: 0, limit: 50 };
  
  userSearch = {
    keyword: "",
    bannedUser: "none",
    subscription: "none",
    isPro:"none"
  }
  userExport = {
    endDate: "none",
    startDate: "none"
  }
  copyArr: any;
  exportType: string = '';
  data: any;
  hoveredDate: NgbDate | null = null;
isPro = false
  fromDate: any;
  toDate: any;
  maxDate: { year: number; month: number; day: number; };
  startDate: string;
  EndDate: string;
  shortList ={
  shortKeyword: "",
  shortType: ""
}
selectedUser: any = {};

countryCodes = [
  { name: 'Afghanistan', code: '93' },
  { name: 'Albania', code: '355' },
  { name: 'Algeria', code: '213' },
  { name: 'Andorra', code: '376' },
  { name: 'Angola', code: '244' },
  { name: 'Argentina', code: '54' },
  { name: 'Armenia', code: '374' },
  { name: 'Australia', code: '61' },
  { name: 'Austria', code: '43' },
  { name: 'Azerbaijan', code: '994' },
  { name: 'Bahamas', code: '242' },
  { name: 'Bahrain', code: '973' },
  { name: 'Bangladesh', code: '880' },
  { name: 'Barbados', code: '1' },
  { name: 'Belarus', code: '375' },
  { name: 'Belgium', code: '32' },
  { name: 'Belize', code: '501' },
  { name: 'Benin', code: '229' },
  { name: 'Bhutan', code: '975' },
  { name: 'Bolivia', code: '591' },
  { name: 'Bosnia and Herzegovina', code: '387' },
  { name: 'Botswana', code: '267' },
  { name: 'Brazil', code: '55' },
  { name: 'Brunei', code: '673' },
  { name: 'Bulgaria', code: '359' },
  { name: 'Burkina Faso', code: '226' },
  { name: 'Burundi', code: '257' },
  { name: 'Cabo Verde', code: '238' },
  { name: 'Cambodia', code: '855' },
  { name: 'Cameroon', code: '237' },
  { name: 'Canada', code: '1' },
  { name: 'Central African Republic', code: '236' },
  { name: 'Chad', code: '235' },
  { name: 'Chile', code: '56' },
  { name: 'China', code: '86' },
  { name: 'Colombia', code: '57' },
  { name: 'Comoros', code: '269' },
  { name: 'Congo (Congo-Brazzaville)', code: '242' },
  { name: 'Costa Rica', code: '506' },
  { name: 'Croatia', code: '385' },
  { name: 'Cuba', code: '53' },
  { name: 'Cyprus', code: '357' },
  { name: 'Czechia (Czech Republic)', code: '420' },
  { name: 'Democratic Republic of the Congo', code: '243' },
  { name: 'Denmark', code: '45' },
  { name: 'Djibouti', code: '253' },
  { name: 'Dominica', code: '1' },
  { name: 'Dominican Republic', code: '1' },
  { name: 'Ecuador', code: '593' },
  { name: 'Egypt', code: '20' },
  { name: 'El Salvador', code: '503' },
  { name: 'Equatorial Guinea', code: '240' },
  { name: 'Eritrea', code: '291' },
  { name: 'Estonia', code: '372' },
  { name: 'Eswatini (fmr. "Swaziland")', code: '268' },
  { name: 'Ethiopia', code: '251' },
  { name: 'Fiji', code: '679' },
  { name: 'Finland', code: '358' },
  { name: 'France', code: '33' },
  { name: 'Gabon', code: '241' },
  { name: 'Gambia', code: '220' },
  { name: 'Georgia', code: '995' },
  { name: 'Germany', code: '49' },
  { name: 'Ghana', code: '233' },
  { name: 'Greece', code: '30' },
  { name: 'Grenada', code: '1' },
  { name: 'Guatemala', code: '502' },
  { name: 'Guinea', code: '224' },
  { name: 'Guinea-Bissau', code: '245' },
  { name: 'Guyana', code: '592' },
  { name: 'Haiti', code: '509' },
  { name: 'Honduras', code: '504' },
  { name: 'Hungary', code: '36' },
  { name: 'Iceland', code: '354' },
  { name: 'India', code: '91' },
  { name: 'Indonesia', code: '62' },
  { name: 'Iran', code: '98' },
  { name: 'Iraq', code: '964' },
  { name: 'Ireland', code: '353' },
  { name: 'Israel', code: '972' },
  { name: 'Italy', code: '39' },
  { name: 'Jamaica', code: '1' },
  { name: 'Japan', code: '81' },
  { name: 'Jordan', code: '962' },
  { name: 'Kazakhstan', code: '7' },
  { name: 'Kenya', code: '254' },
  { name: 'Kiribati', code: '686' },
  { name: 'Kuwait', code: '965' },
  { name: 'Kyrgyzstan', code: '996' },
  { name: 'Laos', code: '856' },
  { name: 'Latvia', code: '371' },
  { name: 'Lebanon', code: '961' },
  { name: 'Lesotho', code: '266' },
  { name: 'Liberia', code: '231' },
  { name: 'Libya', code: '218' },
  { name: 'Liechtenstein', code: '423' },
  { name: 'Lithuania', code: '370' },
  { name: 'Luxembourg', code: '352' },
  { name: 'Madagascar', code: '261' },
  { name: 'Malawi', code: '265' },
  { name: 'Malaysia', code: '60' },
  { name: 'Maldives', code: '960' },
  { name: 'Mali', code: '223' },
  { name: 'Malta', code: '356' },
  { name: 'Marshall Islands', code: '692' },
  { name: 'Mauritania', code: '222' },
  { name: 'Mauritius', code: '230' },
  { name: 'Mexico', code: '52' },
  { name: 'Micronesia', code: '691' },
  { name: 'Moldova', code: '373' },
  { name: 'Monaco', code: '377' },
  { name: 'Mongolia', code: '976' },
  { name: 'Montenegro', code: '382' },
  { name: 'Morocco', code: '212' },
  { name: 'Mozambique', code: '258' },
  { name: 'Myanmar (formerly Burma)', code: '95' },
  { name: 'Namibia', code: '264' },
  { name: 'Nauru', code: '674' },
  { name: 'Nepal', code: '977' },
  { name: 'Netherlands', code: '31' },
  { name: 'New Zealand', code: '64' },
  { name: 'Nicaragua', code: '505' },
  { name: 'Niger', code: '227' },
  { name: 'Nigeria', code: '234' },
  { name: 'North Korea', code: '850' },
  { name: 'North Macedonia', code: '389' },
  { name: 'Norway', code: '47' },
  { name: 'Oman', code: '968' },
  { name: 'Pakistan', code: '92' },
  { name: 'Palau', code: '680' },
  { name: 'Palestine State', code: '970' },
  { name: 'Panama', code: '507' },
  { name: 'Papua New Guinea', code: '675' },
  { name: 'Paraguay', code: '595' },
  { name: 'Peru', code: '51' },
  { name: 'Philippines', code: '63' },
  { name: 'Poland', code: '48' },
  { name: 'Portugal', code: '351' },
  { name: 'Qatar', code: '974' },
  { name: 'Romania', code: '40' },
  { name: 'Russia', code: '7' },
  { name: 'Rwanda', code: '250' },
  { name: 'Saint Kitts and Nevis', code: '1' },
  { name: 'Saint Lucia', code: '1' },
  { name: 'Saint Vincent and the Grenadines', code: '1' },
  { name: 'Samoa', code: '685' },
  { name: 'San Marino', code: '378' },
  { name: 'Sao Tome and Principe', code: '239' },
  { name: 'Saudi Arabia', code: '966' },
  { name: 'Senegal', code: '221' },
  { name: 'Serbia', code: '381' },
  { name: 'Seychelles', code: '248' },
  { name: 'Sierra Leone', code: '232' },
  { name: 'Singapore', code: '65' },
  { name: 'Slovakia', code: '421' },
  { name: 'Slovenia', code: '386' },
  { name: 'Solomon Islands', code: '677' },
  { name: 'Somalia', code: '252' },
  { name: 'South Africa', code: '27' },
  { name: 'South Korea', code: '82' },
  { name: 'South Sudan', code: '211' },
  { name: 'Spain', code: '34' },
  { name: 'Sri Lanka', code: '94' },
  { name: 'Sudan', code: '249' },
  { name: 'Suriname', code: '597' },
  { name: 'Sweden', code: '46' },
  { name: 'Switzerland', code: '41' },
  { name: 'Syria', code: '963' },
  { name: 'Taiwan', code: '886' },
  { name: 'Tajikistan', code: '992' },
  { name: 'Tanzania', code: '255' },
  { name: 'Thailand', code: '66' },
  { name: 'Timor-Leste', code: '670' },
  { name: 'Togo', code: '228' },
  { name: 'Tonga', code: '676' },
  { name: 'Trinidad and Tobago', code: '1' },
  { name: 'Tunisia', code: '216' },
  { name: 'Turkey', code: '90' },
  { name: 'Turkmenistan', code: '993' },
  { name: 'Tuvalu', code: '688' },
  { name: 'Uganda', code: '256' },
  { name: 'Ukraine', code: '380' },
  { name: 'United Arab Emirates', code: '971' },
  { name: 'United Kingdom', code: '44' },
  { name: 'United States', code: '1' },
  { name: 'Uruguay', code: '598' },
  { name: 'Uzbekistan', code: '998' },
  { name: 'Vanuatu', code: '678' },
  { name: 'Vatican City', code: '379' },
  { name: 'Venezuela', code: '58' },
  { name: 'Vietnam', code: '84' },
  { name: 'Yemen', code: '967' },
  { name: 'Zambia', code: '260' },
  { name: 'Zimbabwe', code: '263' }
];


// countryCodes = [
//   { name: 'AF', code: '93' }, // Afghanistan
//   { name: 'AL', code: '355' }, // Albania
//   { name: 'DZ', code: '213' }, // Algeria
//   { name: 'AD', code: '376' }, // Andorra
//   { name: 'AO', code: '244' }, // Angola
//   { name: 'AR', code: '54' },  // Argentina
//   { name: 'AM', code: '374' }, // Armenia
//   { name: 'AU', code: '61' },  // Australia
//   { name: 'AT', code: '43' },  // Austria
//   { name: 'AZ', code: '994' }, // Azerbaijan
//   { name: 'BS', code: '242' }, // Bahamas
//   { name: 'BH', code: '973' }, // Bahrain
//   { name: 'BD', code: '880' }, // Bangladesh
//   { name: 'BB', code: '1' },   // Barbados
//   { name: 'BY', code: '375' }, // Belarus
//   { name: 'BE', code: '32' },  // Belgium
//   { name: 'BZ', code: '501' }, // Belize
//   { name: 'BJ', code: '229' }, // Benin
//   { name: 'BT', code: '975' }, // Bhutan
//   { name: 'BO', code: '591' }, // Bolivia
//   { name: 'BA', code: '387' }, // Bosnia and Herzegovina
//   { name: 'BW', code: '267' }, // Botswana
//   { name: 'BR', code: '55' },  // Brazil
//   { name: 'BN', code: '673' }, // Brunei
//   { name: 'BG', code: '359' }, // Bulgaria
//   { name: 'BF', code: '226' }, // Burkina Faso
//   { name: 'BI', code: '257' }, // Burundi
//   { name: 'CV', code: '238' }, // Cabo Verde
//   { name: 'KH', code: '855' }, // Cambodia
//   { name: 'CM', code: '237' }, // Cameroon
//   { name: 'CA', code: '1' },   // Canada
//   { name: 'CF', code: '236' }, // Central African Republic
//   { name: 'TD', code: '235' }, // Chad
//   { name: 'CL', code: '56' },  // Chile
//   { name: 'CN', code: '86' },  // China
//   { name: 'CO', code: '57' },  // Colombia
//   { name: 'KM', code: '269' }, // Comoros
//   { name: 'CG', code: '242' }, // Congo (Congo-Brazzaville)
//   { name: 'CR', code: '506' }, // Costa Rica
//   { name: 'HR', code: '385' }, // Croatia
//   { name: 'CU', code: '53' },  // Cuba
//   { name: 'CY', code: '357' }, // Cyprus
//   { name: 'CZ', code: '420' }, // Czechia (Czech Republic)
//   { name: 'CD', code: '243' }, // Democratic Republic of the Congo
//   { name: 'DK', code: '45' },  // Denmark
//   { name: 'DJ', code: '253' }, // Djibouti
//   { name: 'DM', code: '1' },   // Dominica
//   { name: 'DO', code: '1' },   // Dominican Republic
//   { name: 'EC', code: '593' }, // Ecuador
//   { name: 'EG', code: '20' },  // Egypt
//   { name: 'SV', code: '503' }, // El Salvador
//   { name: 'GQ', code: '240' }, // Equatorial Guinea
//   { name: 'ER', code: '291' }, // Eritrea
//   { name: 'EE', code: '372' }, // Estonia
//   { name: 'SZ', code: '268' }, // Eswatini (fmr. "Swaziland")
//   { name: 'ET', code: '251' }, // Ethiopia
//   { name: 'FJ', code: '679' }, // Fiji
//   { name: 'FI', code: '358' }, // Finland
//   { name: 'FR', code: '33' },  // France
//   { name: 'GA', code: '241' }, // Gabon
//   { name: 'GM', code: '220' }, // Gambia
//   { name: 'GE', code: '995' }, // Georgia
//   { name: 'DE', code: '49' },  // Germany
//   { name: 'GH', code: '233' }, // Ghana
//   { name: 'GR', code: '30' },  // Greece
//   { name: 'GD', code: '1' },   // Grenada
//   { name: 'GT', code: '502' }, // Guatemala
//   { name: 'GN', code: '224' }, // Guinea
//   { name: 'GW', code: '245' }, // Guinea-Bissau
//   { name: 'GY', code: '592' }, // Guyana
//   { name: 'HT', code: '509' }, // Haiti
//   { name: 'HN', code: '504' }, // Honduras
//   { name: 'HU', code: '36' },  // Hungary
//   { name: 'IS', code: '354' }, // Iceland
//   { name: 'IN', code: '91' },  // India
//   { name: 'ID', code: '62' },  // Indonesia
//   { name: 'IR', code: '98' },  // Iran
//   { name: 'IQ', code: '964' }, // Iraq
//   { name: 'IE', code: '353' }, // Ireland
//   { name: 'IL', code: '972' }, // Israel
//   { name: 'IT', code: '39' },  // Italy
//   { name: 'JM', code: '1' },   // Jamaica
//   { name: 'JP', code: '81' },  // Japan
//   { name: 'JO', code: '962' }, // Jordan
//   { name: 'KZ', code: '7' },   // Kazakhstan
//   { name: 'KE', code: '254' }, // Kenya
//   { name: 'KI', code: '686' }, // Kiribati
//   { name: 'KW', code: '965' }, // Kuwait
//   { name: 'KG', code: '996' }, // Kyrgyzstan
//   { name: 'LA', code: '856' }, // Laos
//   { name: 'LV', code: '371' }, // Latvia
//   { name: 'LB', code: '961' }, // Lebanon
//   { name: 'LS', code: '266' }, // Lesotho
//   { name: 'LR', code: '231' }, // Liberia
//   { name: 'LY', code: '218' }, // Libya
//   { name: 'LI', code: '423' }, // Liechtenstein
//   { name: 'LT', code: '370' }, // Lithuania
//   { name: 'LU', code: '352' }, // Luxembourg
//   { name: 'MG', code: '261' }, // Madagascar
//   { name: 'MW', code: '265' }, // Malawi
//   { name: 'MY', code: '60' },  // Malaysia
//   { name: 'MV', code: '960' }, // Maldives
//   { name: 'ML', code: '223' }, // Mali
//   { name: 'MT', code: '356' }, // Malta
//   { name: 'MH', code: '692' }, // Marshall Islands
//   { name: 'MR', code: '222' }, // Mauritania
//   { name: 'MU', code: '230' }, // Mauritius
//   { name: 'MX', code: '52' },  // Mexico
//   { name: 'FM', code: '691' }, // Micronesia
//   { name: 'MD', code: '373' }, // Moldova
//   { name: 'MC', code: '377' }, // Monaco
//   { name: 'MN', code: '976' }, // Mongolia
//   { name: 'ME', code: '382' }, // Montenegro
//   { name: 'MA', code: '212' }, // Morocco
//   { name: 'MZ', code: '258' }, // Mozambique
//   { name: 'MM', code: '95' },  // Myanmar (formerly Burma)
//   { name: 'NA', code: '264' }, // Namibia
//   { name: 'NR', code: '674' }, // Nauru
//   { name: 'NP', code: '977' }, // Nepal
//   { name: 'NL', code: '31' },  // Netherlands
//   { name: 'NZ', code: '64' },  // New Zealand
//   { name: 'NI', code: '505' }, // Nicaragua
//   { name: 'NE', code: '227' }, // Niger
//   { name: 'NG', code: '234' }, // Nigeria
//   { name: 'KP', code: '850' }, // North Korea
//   { name: 'MK', code: '389' }, // North Macedonia
//   { name: 'NO', code: '47' },  // Norway
//   { name: 'OM', code: '968' }, // Oman
//   { name: 'PK', code: '92' },  // Pakistan
//   { name: 'PW', code: '680' }, // Palau
//   { name: 'PS', code: '970' }, // Palestine State
//   { name: 'PA', code: '507' }, // Panama
//   { name: 'PG', code: '675' }, // Papua New Guinea
//   { name: 'PY', code: '595' }, // Paraguay
//   { name: 'PE', code: '51' },  // Peru
//   { name: 'PH', code: '63' },  // Philippines
//   { name: 'PL', code: '48' },  // Poland
//   { name: 'PT', code: '351' }, // Portugal
//   { name: 'QA', code: '974' }, // Qatar
//   { name: 'RO', code: '40' },  // Romania
//   { name: 'RU', code: '7' },   // Russia
//   { name: 'RW', code: '250' }, // Rwanda
//   { name: 'KN', code: '1' },   // Saint Kitts and Nevis
//   { name: 'LC', code: '1' },   // Saint Lucia
//   { name: 'VC', code: '1' },   // Saint Vincent and the Grenadines
//   { name: 'WS', code: '685' }, // Samoa
//   { name: 'SM', code: '378' }, // San Marino
//   { name: 'ST', code: '239' }, // Sao Tome and Principe
//   { name: 'SA', code: '966' }, // Saudi Arabia
//   { name: 'SN', code: '221' }, // Senegal
//   { name: 'RS', code: '381' }, // Serbia
//   { name: 'SC', code: '248' }, // Seychelles
//   { name: 'SL', code: '232' }, // Sierra Leone
//   { name: 'SG', code: '65' },  // Singapore
//   { name: 'SK', code: '421' }, // Slovakia
//   { name: 'SI', code: '386' }, // Slovenia
//   { name: 'SB', code: '677' }, // Solomon Islands
//   { name: 'SO', code: '252' }, // Somalia
//   { name: 'ZA', code: '27' },  // South Africa
//   { name: 'KR', code: '82' },  // South Korea
//   { name: 'SS', code: '211' }, // South Sudan
//   { name: 'ES', code: '34' },  // Spain
//   { name: 'LK', code: '94' },  // Sri Lanka
//   { name: 'SD', code: '249' }, // Sudan
//   { name: 'SR', code: '597' }, // Suriname
//   { name: 'SE', code: '46' },  // Sweden
//   { name: 'CH', code: '41' },  // Switzerland
//   { name: 'SY', code: '963' }, // Syria
//   { name: 'TW', code: '886' }, // Taiwan
//   { name: 'TJ', code: '992' }, // Tajikistan
//   { name: 'TZ', code: '255' }, // Tanzania
//   { name: 'TH', code: '66' },  // Thailand
//   { name: 'TL', code: '670' }, // Timor-Leste
//   { name: 'TG', code: '228' }, // Togo
//   { name: 'TO', code: '676' }, // Tonga
//   { name: 'TT', code: '1' },   // Trinidad and Tobago
//   { name: 'TN', code: '216' }, // Tunisia
//   { name: 'TR', code: '90' },  // Turkey
//   { name: 'TM', code: '993' }, // Turkmenistan
//   { name: 'TV', code: '688' }, // Tuvalu
//   { name: 'UG', code: '256' }, // Uganda
//   { name: 'UA', code: '380' }, // Ukraine
//   { name: 'AE', code: '971' }, // United Arab Emirates
//   { name: 'GB', code: '44' },  // United Kingdom
//   { name: 'US', code: '1' },   // United States
//   { name: 'UY', code: '598' }, // Uruguay
//   { name: 'UZ', code: '998' }, // Uzbekistan
//   { name: 'VU', code: '678' }, // Vanuatu
//   { name: 'VA', code: '379' }, // Vatican City
//   { name: 'VE', code: '58' },  // Venezuela
//   { name: 'VN', code: '84' },  // Vietnam
//   { name: 'YE', code: '967' }, // Yemen
//   { name: 'ZM', code: '260' }, // Zambia
//   { name: 'ZW', code: '263' }  // Zimbabwe
// ];

selectedCountryCode: string;
dropdownOpen = false;

@ViewChild('basicModal') basicModal: TemplateRef<any>; // Reference to the edit modal template
  @ViewChild('basicModal4') basicModal4: TemplateRef<any>; 

  constructor(private modalService: NgbModal, public formatter: NgbDateParserFormatter, private calendar: NgbCalendar, private toastr: ToastrService, private api: UserService, private router: Router, private spinner: NgxSpinnerService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.maxDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() }
    console.log(this.fromDate)
  }

  currentDate: NgbDateStruct;

  ngOnInit(): void {
    this.searchUserList();
    this.currentDate = this.calendar.getToday();
  }
  // User listing
  // pagination
  pageChangeEvent(event: any) {
    this.page = event - 1;
    this.filterObj.p = event;
    this.searchUserList()
  }

  // route to view user
  viewUser(id: any) {
    this.router.navigate(['/user/view/', id]);
  }

  // Model

  openVerticalCenteredModal(content) {
    this.modalService.open(content, { size: 'sm' }).result.then((result) => {
      console.log("Modal closed" + result);

    }).catch((res) => { });
  }

  // Serch User Data
  searchlistPage() {
    this.page = 0
    this.filterObj.p = 1
    this.searchUserList();
  }
  ascending(){
    this.shortList.shortKeyword = "asc";
    this.shortList.shortType = "totalGamesCreated"
    this.searchUserList();
  }
  ascending2(){
    this.shortList.shortKeyword = "desc";
    this.shortList.shortType = "totalGamesCreated"
    this.searchUserList();
  }
  ascending3(){
    this.shortList.shortKeyword = "asc";
    this.shortList.shortType = "totalGamesPlayed"
    this.searchUserList();
  }
  ascending4(){
    this.shortList.shortKeyword = "desc";
    this.shortList.shortType = "totalGamesPlayed"
    this.searchUserList();
  }
  searchUserList() {
    this.spinner.show();
    this.api.searchUser(this.userSearch.bannedUser, this.userSearch.keyword, this.page,
       this.userSearch.subscription,this.shortList.shortKeyword,this.shortList.shortType).subscribe((data: any) => {
      this.items = data.data;
      this.copyArr = data.totalRecords
      console.log(this.copyArr)
      this.spinner.hide();
    });
    // Call the API
  }
  // reset data
  reSetForm() {
    this.userSearch.bannedUser = "none";
    this.userSearch.keyword = "";
    this.userSearch.subscription = "none";
    this.page = 0
    this.filterObj.p = 1

    this.searchUserList();


  }

  // Banned User
  blockUser(userId: any) {
    this.api.blockUser(userId).subscribe(data => {
      this.toastr.success('Data update successfull', `Success`, {
        timeOut: 3000,
        progressBar: true,
        closeButton: true,
        easeTime: 300,
        extendedTimeOut: 1000,
      });
      this.searchUserList()
    });
  }
  proUser(userId: any) {
    this.spinner.show()
    this.api.makeProUser(userId).subscribe(data => {
      this.toastr.success('Data update successfull', `Success`
      );
      this.spinner.hide()
      this.searchUserList()
    });
  }

  // export csv file
  export() {
    if (this.exportType != 'customDate') {
      this.fromDate = this.userExport.startDate
      this.toDate = this.userExport.endDate
      console.log(this.userExport.startDate)
      this.api.userListCsv(this.toDate, this.exportType, this.fromDate,this.userSearch.keyword,this.userSearch.bannedUser,this.userSearch.subscription,this.shortList.shortKeyword,this.shortList.shortType).subscribe(data => {

        const file = data;
        const url = window.URL.createObjectURL(
          new Blob([data as BlobPart], { type: 'application/user.xlsx' })
        );
        var link = document.createElement('a');
        document.body.appendChild(link);
        link.setAttribute('style', 'display: none');
        link.href = url;
        link.download = `User.xlsx`;
        link.click();

      },error =>{
        this.toastr.error('There is no data to export.',`Error`)
      });
      this.searchUserList()
    }
   
    if(this.exportType === 'customeFilter'){
      this.api.userListCsv(this.toDate, this.exportType, this.fromDate,this.userSearch.keyword,this.userSearch.bannedUser,this.userSearch.subscription,this.shortList.shortKeyword,this.shortList.shortType).subscribe(data => {

        const file = data;
        const url = window.URL.createObjectURL(
          new Blob([data as BlobPart], { type: 'application/user.csv' })
        );
        var link = document.createElement('a');
        document.body.appendChild(link);
        link.setAttribute('style', 'display: none');
        link.href = url;
        link.download = `User.csv`;
        link.click();
        this.toastr.success("File downloaded successfully", `Success`)
      },error =>{
        this.toastr.error('There is no data to export.',`Error`)
        
      });
      this.searchUserList()

    }
    else {
      const body = { keyword: this.exportType };
      console.log(body)
      const checkdate = this.userExport.startDate.split('-');
      if (checkdate[0].length === 1) {
        checkdate[0] = '0' + checkdate[0]
      }
      if (checkdate[1].length === 1) {
        checkdate[1] = '0' + checkdate[1]
      }

      const eDate = this.userExport.endDate.split('-')
      if (eDate[0].length === 1) {
        eDate[0] = '0' + eDate[0]
      }
      if (eDate[1].length === 1) {
        eDate[1] = '0' + eDate[1]
      }

      this.fromDate = checkdate[2] + '-' + checkdate[1] + '-' + checkdate[0]
      this.toDate = eDate[2] + '-' + eDate[1] + '-' + eDate[0]

      this.api.userListCsv(this.toDate, this.exportType, this.fromDate,this.userSearch.keyword,this.userSearch.bannedUser,this.userSearch.subscription,this.shortList.shortKeyword,this.shortList.shortType).subscribe(data => {

        const file = data;
        const url = window.URL.createObjectURL(
          new Blob([data as BlobPart], { type: 'application/user.csv' })
        );
        var link = document.createElement('a');
        document.body.appendChild(link);
        link.setAttribute('style', 'display: none');
        link.href = url;
        link.download = `User.csv`;
        link.click();
        this.toastr.success("File downloaded successfully", `Success`)
      },error =>{
        this.toastr.error('There is no data to export.',`Error`)
      });
      this.searchUserList()

    }

  }


  openBasicModal(content) {
    this.modalReference = this.modalService.open(content)
   
    this.modalReference.result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => {});
  }



  openBasicModal3(content) {
    this.modalReference = this.modalService.open(content)
    this.modalReference.result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => {});
  }


   // Open the modal and set the selected user
   openEditModal(user: any) {
    this.selectedUser = { 
      id: user.id,
      email: user.email,
      phoneNo: user.mobileNo, // Make sure this matches your data structure
      // add other properties as needed
    }; 
    this.selectedCountryCode = user.countryCode;
    console.log( "country",this.selectedCountryCode)
    this.modalReference = this.modalService.open(this.basicModal);
  }
  // Method to update user details
  updateUser(modal: NgbModalRef) {
    const payload = {
      email: this.selectedUser.email,
      id: this.selectedUser.id,
      phoneNo: this.selectedUser.phoneNo ,// This should now be populated
      countryCode: this.selectedCountryCode 
    };
    
    this.api.updateEmailAndPhone(payload).subscribe((response: UpdateUserResponse) => {
      this.toastr.success('User details updated successfully', 'Success');
      this.searchUserList(); // Refresh the user list
      modal.close(); // Close the modal
      this.openSuccessPopup(); // Open success popup
    }, error => {
      this.toastr.error('An error occurred while updating user details', 'Error');
    });
  }
  

  // Method to open the success popup
  openSuccessPopup() {
    this.modalReference = this.modalService.open(this.basicModal4);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
}

selectCountry(code: string, name: string) {
    this.selectedCountryCode = code;
    this.dropdownOpen = false; // Close dropdown after selection
}
  

}
