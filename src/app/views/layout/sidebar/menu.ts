import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true
  },
  {
    label: 'Dashboard',
    icon: 'grid',
    link: '/dashboard'
  },
  {
    label: 'User Management',
    icon: 'users',
    link: '/user'
  },
  {
    label: 'Create A Game',
    icon: 'edit-3',
    link: '/game'
  },
  {
    label: 'Create Bulk Games',
    icon: 'edit-3',
    link: '/bulk-game/create'
  },
  {
    label: 'Admin Playlist',
    icon: 'bookmark',
    link: '/playlist'
  },
 
  {
    label: 'Games Created',
    icon: "play-circle",
    link: '/game/created'
  },
  {
    label: 'User Playlist',
    icon: 'bookmark',
    link: '/user/playlist'
  },
  {
    label: 'Subjects',
    icon: 'file-text',
    link: '/subjects'
  },
  {
    label: 'Game Template',
    icon: 'folder-minus',
    link: '/game-template'
  },
  {
    label: 'Flagged Games',
    icon: 'flag',
    link: '/flagged-game'
  },
  {
    label: 'Consent Log',
    icon: 'shield',
    link: '/consent'
  },
  {
    label: 'Social Sharing Tracking',
    icon: 'folder',
    link: '/social'
  },
  {
    label: 'Privacy Policy',
    icon: 'alert-circle',
    link: '/privacy'
  },
  {
    label: 'Terms & Conditions',
    icon: 'book-open',
    link: '/terms'
  },
  {
    label: 'Manual Verification',
    icon: 'user',
    link: '/manual-verification'
  },
  // {
  //   label: 'Web Apps'
  //   isTitle: true
  // },
  // {
  //   label: 'Email',
  //   icon: 'mail',
  //   subItems: [
  //     {
  //       label: 'Inbox',
  //       link: '/apps/email/inbox',
  //     },
  //     {
  //       label: 'Read',
  //       link: '/apps/email/read'
  //     },
  //     {
  //       label: 'Compose',
  //       link: '/apps/email/compose'
  //     },
  //   ]
  // },
  // {
  //   label: 'Chat',
  //   icon: 'message-square',
  //   link: '/apps/chat',
  // },
  // {
  //   label: 'Calendar',
  //   icon: 'calendar',
  //   link: '/apps/calendar',
  //   badge: {
  //     variant: 'primary',
  //     text: 'New',
  //   }
  // },
  // {
  //   label: 'Components',
  //   isTitle: true
  // },
  // {
  //   label: 'UI Kit',
  //   icon: 'feather',
  //   subItems: [
  //     {
  //       label: 'Alerts',
  //       link: '/ui-components/alerts',
  //     },
  //     {
  //       label: 'Badges',
  //       link: '/ui-components/badges',
  //     },
  //     {
  //       label: 'Breadcrumbs',
  //       link: '/ui-components/breadcrumbs',
  //     },
  //     {
  //       label: 'Buttons',
  //       link: '/ui-components/buttons',
  //     },
  //     {
  //       label: 'Button group',
  //       link: '/ui-components/button-group',
  //     },
  //     {
  //       label: 'Cards',
  //       link: '/ui-components/cards',
  //     },
  //     {
  //       label: 'Carousel',
  //       link: '/ui-components/carousel',
  //     },
  //     {
  //       label: 'Collapse',
  //       link: '/ui-components/collapse',
  //     },
  //     {
  //       label: 'Datepicker',
  //       link: '/ui-components/datepicker',
  //     },
  //     {
  //       label: 'Dropdowns',
  //       link: '/ui-components/dropdowns',
  //     },
  //     {
  //       label: 'List group',
  //       link: '/ui-components/list-group',
  //     },
  //     {
  //       label: 'Media object',
  //       link: '/ui-components/media-object',
  //     },
  //     {
  //       label: 'Modal',
  //       link: '/ui-components/modal',
  //     },
  //     {
  //       label: 'Navs',
  //       link: '/ui-components/navs',
  //     },
  //     {
  //       label: 'Navbar',
  //       link: '/ui-components/navbar',
  //     },
  //     {
  //       label: 'Pagination',
  //       link: '/ui-components/pagination',
  //     },
  //     {
  //       label: 'Popovers',
  //       link: '/ui-components/popovers',
  //     },
  //     {
  //       label: 'Progress',
  //       link: '/ui-components/progress',
  //     },
  //     {
  //       label: 'Rating',
  //       link: '/ui-components/rating',
  //     },
  //     {
  //       label: 'Scrollbar',
  //       link: '/ui-components/scrollbar',
  //     },
  //     {
  //       label: 'Spinners',
  //       link: '/ui-components/spinners',
  //     },
  //     {
  //       label: 'Timepicker',
  //       link: '/ui-components/timepicker',
  //     },
  //     {
  //       label: 'Tooltips',
  //       link: '/ui-components/tooltips',
  //     },
  //     {
  //       label: 'Typeadhed',
  //       link: '/ui-components/typeahead',
  //     },
  //   ]
  // },
  // {
  //   label: 'Advanced UI',
  //   icon: 'anchor',
  //   subItems: [
  //     {
  //       label: 'Cropper',
  //       link: '/advanced-ui/cropper',
  //     },
  //     {
  //       label: 'Owl carousel',
  //       link: '/advanced-ui/owl-carousel',
  //     },
  //     {
  //       label: 'Sweet alert',
  //       link: '/advanced-ui/sweet-alert',
  //     },
  //   ]
  // },
  // {
  //   label: 'Forms',
  //   icon: 'file-text',
  //   subItems: [
  //     {
  //       label: 'Basic elements',
  //       link: '/form-elements/basic-elements'
  //     },
  //     {
  //       label: 'Advanced elements',
  //       subItems: [
  //         {
  //           label: 'Form validation',
  //           link: '/advanced-form-elements/form-validation'
  //         },
  //         {
  //           label: 'Input mask',
  //           link: '/advanced-form-elements/input-mask'
  //         },
  //         {
  //           label: 'Ng-select',
  //           link: '/advanced-form-elements/ng-select'
  //         },
  //         {
  //           label: 'Ngx-chips',
  //           link: '/advanced-form-elements/ngx-chips'
  //         },
  //         {
  //           label: 'Ngx-color-picker',
  //           link: '/advanced-form-elements/ngx-color-picker'
  //         },
  //         {
  //           label: 'Ngx-dropzone',
  //           link: '/advanced-form-elements/ngx-dropzone-wrapper'
  //         },
  //       ]
  //     },
  //     {
  //       label: 'Editors',
  //       link: '/form-elements/editors'
  //     },
  //     {
  //       label: 'Wizard',
  //       link: '/form-elements/wizard'
  //     },
  //   ]
  // },
  // {
  //   label: 'Charts & graphs',
  //   icon: 'pie-chart',
  //   subItems: [
  //     {
  //       label: 'ApexCharts',
  //       link: '/charts-graphs/apexcharts',
  //     },
  //     {
  //       label: 'ChartJs',
  //       link: '/charts-graphs/chartjs',
  //     },
  //   ]
  // },
  // {
  //   label: 'Tables',
  //   icon: 'layout',
  //   subItems: [
  //     {
  //       label: 'Basic tables',
  //       link: '/tables/basic-table',
  //     },
  //     {
  //       label: 'Data table',
  //       link: '/tables/data-table',
  //     },
  //     {
  //       label: 'Ngx-datatable',
  //       link: '/tables/ngx-datatable'
  //     }
  //   ]
  // },
  // {
  //   label: 'Icons',
  //   icon: 'smile',
  //   subItems: [
  //     {
  //       label: 'Feather icons',
  //       link: '/icons/feather-icons',
  //     },
  //     {
  //       label: 'Flag icons',
  //       link: '/icons/flag-icons',
  //     },
  //     {
  //       label: 'Mdi icons',
  //       link: '/icons/mdi-icons',
  //     }
  //   ]
  // },
  // {
  //   label: 'Pages',
  //   isTitle: true
  // },
  // {
  //   label: 'Special pages',
  //   icon: 'book',
  //   subItems: [
  //     {
  //       label: 'Blank page',
  //       link: '/general/blank-page',
  //     },
  //     {
  //       label: 'Faq',
  //       link: '/general/faq',
  //     },
  //     {
  //       label: 'Invoice',
  //       link: '/general/invoice',
  //     },
  //     {
  //       label: 'Profile',
  //       link: '/general/profile',
  //     },
  //     {
  //       label: 'Pricing',
  //       link: '/general/pricing',
  //     },
  //     {
  //       label: 'Timeline',
  //       link: '/general/timeline',
  //     }
  //   ]
  // },
  // {
  //   label: 'Authentication',
  //   icon: 'unlock',
  //   subItems: [
  //     {
  //       label: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       label: 'Register',
  //       link: '/auth/register',
  //     },
  //   ]
  // },
  // {
  //   label: 'Error',
  //   icon: 'cloud-off',
  //   subItems: [
  //     {
  //       label: '404',
  //       link: '/error/404',
  //     },
  //     {
  //       label: '500',
  //       link: '/error/500',
  //     },
  //   ]
  // },
];
