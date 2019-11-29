export default {
  master: {
    permission: null,
    activated: true,
    authenticated: false,
    path: '/descargas',
    name: 'qdownload.master',
    page: () => import('@imagina/qdownload/_pages/frontend/master'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'Descargas',
    icon: 'fas fa-newspaper'
  },
  index: {
    permission: null,
    activated: true,
    authenticated: false,
    path: '/descargas/:category',
    name: 'qdownload.index',
    page: () => import('@imagina/qdownload/_pages/frontend/index'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'Categoría',
    icon: 'fas fa-newspaper'
  },
  show: {
    permission: null,
    activated: true,
    authenticated: false,
    path: '/descargas/:category/:slugDownload',
    name: 'qdownload.show',
    page: () => import('@imagina/qdownload/_pages/frontend/show'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'Descarga',
    icon: 'fas fa-layer-group',
  },
}
