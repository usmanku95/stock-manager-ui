//ServerRoutes

export const BaseApiUrl = 'http://localhost:8836/api/';
export const ImageBaseURl = 'http://localhost:8836/uploadimage'; /// For LOCAL host

export const ERROR_MSG_ACCOUNT_EXISTS = `
An account with this E-Mail address already exists.
`;
export const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';
export const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
};
export const modalMapStyles = [
    {
      featureType: "landscape.natural",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "on"
        },
        {
          color: "#e0efef"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "on"
        },
        {
          hue: "#1900ff"
        },
        {
          color: "#c0e8e8"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          lightness: 100
        },
        {
          visibility: "simplified"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          visibility: "on"
        },
        {
          lightness: 700
        }
      ]
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [
        {
          color: "#7dcdcd"
        }
      ]
    }
  ];
export const googleMapKey='AIzaSyDM3PbVBH_MmcTa0wDKN3nTk8M4NL6RfXg';
export const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
};
export const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    role: []
};
export const ROLE_INITIAL_STATE = {
    username: '',
    error: null,
    role: []
};
export const options = [
    { value: 'ADMINISTRATOR', label: 'ADMINISTRATOR' },
    { value: 'RIDER_MANAGER', label: 'RIDER_MANAGER' },
    { value: 'PARTNER_MANAGER', label: 'PARTNER_MANAGER' },
    { value: 'APP_USERS_MANAGER', label: 'APP_USERS_MANAGER' },
    { value: 'FUNDS_MANAGER', label: 'FUNDS_MANAGER' }
];
export const DELIVERY_OPTIONS = [
    { value: 'Cash_on_Delivery', label: 'Cash_on_Delivery' },
    { value: 'Online', label: 'Online' },
];
export const STATUS_OPTIONS = [
  { value: true, label: 'Online' },
    { value: false, label: 'OnRide' },
];
export const PAYMENT_METHOD = [
    { value: 'Cash', label: 'Cash' },
    { value: 'Online', label: 'Online' },
];
export const PARTNER_TYPE = [
    { value: 'Restaurant', label: 'Restaurant' },
];
export const LICENSE_OPTIONS = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
];
export const allowedActionsoptions = [
    { value: 'CREATE_RIDES', label: 'CREATE_RIDES' },
    { value: 'MANAGE_RIDES', label: 'MANAGE_RIDES' },
    { value: 'MANAGE_PARTNER', label: 'MANAGE_PARTNER' },
    { value: 'MANAGE_RIDERS', label: 'MANAGE_RIDERS' },
    { value: 'MANAGE_APP_USERS', label: 'MANAGE_APP_USERS' },
    { value: 'MANAGE_USER_ACTIVITY', label: 'MANAGE_USER_ACTIVITY' },
    { value: 'MANAGE_ORDER_LOGS', label: 'MANAGE_ORDER_LOGS' },
    { value: 'MANAGE_FUNDS', label: 'MANAGE_FUNDS' } 
];
export const ADMIN = 'ADMIN';
export const googleMapUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyDM3PbVBH_MmcTa0wDKN3nTk8M4NL6RfXg&libraries=places";

export var actionCodeSettings = {
    url: 'https://www.google.com/?email=',
    iOS: {
        bundleId: 'com.example.ios'
    },
    android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12'
    },
    handleCodeInApp: true
};
