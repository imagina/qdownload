<template>
   <div id="showIdownload" class="relative-position">
      <div id="bannerIdownload" v-if="download">
         <div class="q-container">
            <!--BreadCrum-->
            <q-breadcrumbs active-color="primary" color="light" align="right">
               <!-- Separator -->
               <q-icon name="fas fa-angle-right" slot="separator" slot-scope="props"/>
               <!-- Route Home -->
               <q-breadcrumbs-el label="Inicio" :to="{name : 'app.home'}" icon="home"/>
               <q-breadcrumbs-el label="Descargas" :to="{name : 'qdownload.master'}" icon="fas fa-download"/>
               <!-- To category -->
               <q-breadcrumbs-el :label="download.category.title"
                                 :to="{name : 'qdownload.index', params : {category: download.category.slug}}"/>
               <!-- To download -->
               <q-breadcrumbs-el :label="download.title"/>
            </q-breadcrumbs>
            <!--Title-->
            <h1 class="q-ma-none text-h5 bg-white q-pa-lg title-container text-uppercase text-grey-9">
               <label>{{download.title}}</label>
            </h1>
         </div>
      </div>

      <!--content-->
      <div class="q-container relative-position" v-if="download">
         <div class="row q-py-xl">
            <!--download-->
            <div class="download col-12 col-lg-8">
               <!--Description-->
               <div class="description q-px-sm" v-html="download.description"></div>
               <download-form :download="download" />
            </div>

            <!--Other downloads-->
            <div class="col-12 col-lg-4 desktop-only">
               <downloads-component/>
            </div>
            <inner-loading :visible="loading"/>
         </div>
      </div>
   </div>
</template>

<script>
   /*Component*/
   import downloadsComponent from '@imagina/qdownload/_components/widgets/widget-download'
   import downloadForm from '@imagina/qdownload/_components/widgets/widget-form'

   export default {
      preFetch({store, currentRoute, previousRoute, redirect, ssrContext}) {
         return new Promise(async resolve => {
            //Get data download
            let downloadslug = currentRoute.params.slugDownload || false
            await store.dispatch('qcrudMaster/SHOW', {
               indexName: `qdownload-downloads-${downloadslug}`,
               criteria: downloadslug,
               apiRoute: 'apiRoutes.qdownload.downloads',
               requestParams: {refresh: true, params: {include: 'category'}}
            })
            //Get list related downloads
            let categorySlug = currentRoute.params.category || false
            await store.dispatch('qcrudMaster/SHOW', {
               indexName: `qdownload-categories-${categorySlug}`,
               criteria: categorySlug,
               apiRoute: 'apiRoutes.qdownload.categories',
               requestParams: {refresh: true, params: {}}
            })
            resolve(true)
         })
      },
      meta() {
         let downloadslug = this.$route.params.slugDownload
         let routetitle = downloadslug || 'productos'
         let siteName = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-name')
         let siteDescription = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-description')
         //Set category data
         let download = this.$store.state.qcrudMaster.show[`qdownload-downloads-${downloadslug}`].data
         if (download) {
            routetitle = download.title
            siteDescription = download.summary
         }
         return {
            title: `${routetitle.charAt(0).toUpperCase() + routetitle.slice(1)} | ${siteName}`,
            meta: {
               description: {name: 'description', content: (siteDescription || siteName)},
            },
         }
      },
      components: {
         downloadsComponent,
         downloadForm,
      },
      watch: {
         '$route.params'() {
            this.getData()
         },
      },
      data() {
         return {
            loading: false
         }
      },
      computed: {
         download() {
            let downloadslug = this.$route.params.slugDownload
            let download = this.$store.state.qcrudMaster.show[`qdownload-downloads-${downloadslug}`]
            return download.data || false
         }
      },
      methods: {
         async getData() {
            this.loading = true
            let downloadslug = this.$clone(this.$route.params.slugDownload)
            await this.$store.dispatch('qcrudMaster/SHOW', {
               indexName: `qdownload-downloads-${downloadslug}`,
               criteria: downloadslug,
               apiRoute: 'apiRoutes.qdownload.downloads',
               requestParams: {refresh: true, params: {include: 'category'}}
            })
            this.loading = false
         },
      },
   }
</script>

<style lang="stylus">
   #showIdownload
      .download
         .title
            font-size 34px
            color $dark
            margin-top 0
            @media screen and (max-width: $breakpoint-md)
               font-size 24px
               text-align center

         .img
            height 400px
            width 100%
            position relative
            background-repeat no-repeat
            background-position center
            background-size cover

            span
               padding 5px
               position absolute
               top 0px
               left 20px
               line-height 1.5

               h4
                  margin 0

         .autor
            padding 15px 8px
            margin-bottom 25px
            border-top: 1px solid $grey-5
            border-bottom: 1px solid $grey-5

         .description
            margin 30px 0px

            p
               line-height 1.6
               text-align justify

      iframe
         width 100% !important

      #bannerIdownload
         background-color $grey-4
         padding 5px

         .title-container
            border-top-right-radius 50px
            width max-content

            label
               font-weight bold !important
               border-bottom: 5px solid $secondary
</style>


name: "show"
