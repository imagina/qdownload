const moduleName = 'idownload';
const moduleVersion = 'v1';
const urlBase = `/${moduleName}/${moduleVersion}`


export default {
  urlBase : urlBase,
  version: moduleVersion,
  categories: `${urlBase}/categories`,
  downloads: `${urlBase}/downloads`,
  suscriptors: `${urlBase}/suscriptors`,
  sendSubscription: `${urlBase}/downloads/send-subscription`,
}
