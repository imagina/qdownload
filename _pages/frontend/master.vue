<template>
  <div id="indexMasterDownload" class="relative-position">
    <!-- BANNER -->
    <div id="bannerIblog" v-if="downloads">
      <div class="q-container">
        <!--BreadCrum-->
        <q-breadcrumbs active-color="primary" color="light" align="right">
          <!-- Separator -->
          <q-icon name="fas fa-angle-right" slot="separator" slot-scope="props"/>
          <!-- Route Home -->
          <q-breadcrumbs-el label="Inicio" :to="{name : 'app.home'}" icon="home"/>
          <!-- To category -->
          <q-breadcrumbs-el label="Descargas" icon="fas fa-download"/>
        </q-breadcrumbs>
        <!--Title-->
        <h1 class="q-ma-none text-h5 bg-white q-pa-lg title-container text-uppercase text-grey-9">
          <label>Descargas</label>
        </h1>
      </div>
    </div>
    <!-- Contend -->
    <div class="q-container relative-position">
      <div class="row">
        <div class="col-12">
          <q-input outlined label="Buscar Descargas" v-model="search" @input="getData">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </div>
      <div class="contentDescription q-col-gutter-md row q-py-lg q-px-sm" v-if="downloads">
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
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        downloads: [],
        innerLoading: false,
        search: '',
        page: 1,
        metas: {},
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      async getData(){
        await this.$store.dispatch('qcrudMaster/INDEX', {
          indexName: `qdownload-downloads-index`,
          apiRoute: 'apiRoutes.qdownload.downloads',
          requestParams: {refresh: true, params: {
            include: 'category',
            filter: {search: this.search},
            page: this.page, take: 12
          }}
        })
        this.downloads = this.$store.state.qcrudMaster.index[`qdownload-downloads-index`].data
        this.metas = this.$store.state.qcrudMaster.index[`qdownload-downloads-index`].meta
      }
    }
  }
</script>

<style lang="stylus">
  #indexMasterDownload
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
