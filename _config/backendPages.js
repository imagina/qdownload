export default {
  downloads: {
    permission: 'idownload.downloads.manage',
    activated: true,
    authenticated: true,
    path: '/download/downloads/index',
    name: 'qdownload.admin.downloads',
    page: () => import('@imagina/qdownload/_pages/admin/downloads/index'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qdownload.sidebar.adminDownloads',
    icon: 'fas fa-download',
  },
  categories: {
    permission: 'idownload.categories.manage',
    activated: true,
    authenticated: true,
    path: '/download/categories/index',
    name: 'qdownload.admin.categories',
    page: () => import('@imagina/qdownload/_pages/admin/categories/index'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qdownload.sidebar.adminCategories',
    icon: 'fas fa-layer-group'
  },
  suscriptors: {
    permission: 'idownload.suscriptors.manage',
    activated: true,
    authenticated: true,
    path: '/download/suscriptors/index',
    name: 'qdownload.admin.suscriptors',
    page: () => import('@imagina/qdownload/_pages/admin/subscriptors/index'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qdownload.sidebar.adminSuscriptors',
    icon: 'fas fa-layer-group'
  },

}
