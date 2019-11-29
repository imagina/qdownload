<template>
   <div id="indexBlog1" class="relative-position">
      <!-- BANNER -->
      <div id="bannerIblog" v-if="category">
         <div class="q-container">
            <!--BreadCrum-->
            <q-breadcrumbs active-color="primary" color="light" align="right">
               <!-- Separator -->
               <q-icon name="fas fa-angle-right" slot="separator" slot-scope="props"/>
               <!-- Route Home -->
               <q-breadcrumbs-el label="Inicio" :to="{name : 'app.home'}" icon="home"/>
               <q-breadcrumbs-el label="Descargas" :to="{name : 'qdownload.master'}" icon="fas fa-download"/>
               <!-- To category -->
               <q-breadcrumbs-el :label="category.title"/>
            </q-breadcrumbs>
            <!--Title-->
            <h1 class="q-ma-none text-h5 bg-white q-pa-lg title-container text-uppercase text-grey-9">
               <label>{{category.title}}</label>
            </h1>
         </div>
      </div>
      <!-- Contend -->
      <div class="q-container relative-position">
         <div class="contentDescription q-col-gutter-md row q-py-lg q-px-sm" v-if="category && downloads">
            <div class="col-12 col-md-4 col-lg-3" :key="key"
                 v-for="(download,key) in downloads">
               <q-card inline style="width: 100%" flat>
                  <!--Date-->
                  <q-card-actions class="q-px-sm q-pb-md">
                     <p class="q-mb-none">
                        {{ $trd(download.createdAt) }}
                     </p>
                  </q-card-actions>
                  <q-separator class="q-ml-sm"/>
                  <q-card-section class="q-pa-sm">
                     <router-link
                             :to="{name: 'qdownload.show',params:{category: download.category.slug, slugDownload: download.slug}}">
                        <h2 class="q-ma-none text-primary text-h6 text-weight-bold">
                           {{download.title}}
                        </h2>
                     </router-link>
                  </q-card-section>
                  <q-card-section class="q-pa-none">
                     <p class="q-pa-sm text-justify">
                        {{download.description.substr(0,150)}}...
                     </p>
                  </q-card-section>
               </q-card>
            </div>
            <div class="col-12">
               <q-pagination boundary-links :max-pages="3" direction-links v-if="downloads.length > 0" v-model="page" :max="metas.page.lastPage" @input="getData" />
            </div>
         </div>
         <!--Not results-->
         <not-results v-else/>
         <inner-loading :visible="loading"/>
      </div>
   </div>
</template>

<script>
   export default {
      methods:{
         async getData(){
            this.loading = true
            let category = this.$route.params.category
            await this.$store.dispatch('qcrudMaster/SHOW', {
               indexName: `qdownload-categories-${category}`,
               criteria: category,
               apiRoute: 'apiRoutes.qdownload.categories',
               requestParams: {refresh: true, params: {filter: {field: 'slug'}}}
            })
            this.category = this.$store.state.qcrudMaster.show[`qdownload-categories-${category}`].data
            await this.$store.dispatch('qcrudMaster/INDEX', {
               indexName: `qdownload-downloads-${category}`,
               apiRoute: 'apiRoutes.qdownload.downloads',
               requestParams: {refresh: true, params: {
                     include: 'category',
                     filter: {category: this.category.id},
                     page: this.page, take: 12
                  }}
            })
            this.downloads = this.$store.state.qcrudMaster.index[`qdownload-downloads-${category}`].data
            this.metas = this.$store.state.qcrudMaster.index[`qdownload-downloads-${category}`].meta
            this.loading = false
         }
      },
      mounted(){
         this.getData()
      },
      meta() {
         let routetitle = this.$route.params.category || 'descargas'
         let siteName = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-name')
         let siteDescription = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-description')
         let iconHref = this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::favicon').path
         //Set category data
         let category = this.category
         if (category) {
            routetitle = category.title
            siteDescription = category.metaDescription
         }
         return {
            title: `${routetitle.charAt(0).toUpperCase() + routetitle.slice(1)} | ${siteName}`,
            meta: {
               description: {name: 'description', content: (siteDescription || siteName)},
            },
         }
      },
      data() {
         return {
            category: {},
            downloads: [],
            page: 1,
            metas: {},
            loading: false
         }
      },
   }
</script>

<style lang="stylus">
   #indexBlog1
      .q-card
         .img
            background-size cover
            background-position center
            background-repeat no-repeat
            height 230px
            width 100%

         .q-separator
            background $secondary
            height 5px
            width 30%

      #bannerIblog
         background-color $grey-4
         padding 5px

         .title-container
            border-top-right-radius 50px
            width max-content

            label
               font-weight bold !important
               border-bottom: 5px solid $secondary
</style>



