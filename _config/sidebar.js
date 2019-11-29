const pages = config('pages') // Get Pages from config

//Blog
export default [
  {
    title: 'qdownload.sidebar.adminGroup',
    icon: 'fas fa-download',
    children: [
      pages.qdownload.downloads, // downloads setup
      pages.qdownload.categories, // categories setup
      pages.qdownload.suscriptors, // subscriptors setup
    ]
  },
]
