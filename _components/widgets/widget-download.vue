<template>
  <div id="postBlogComponent" v-if="categories">
    <div class="text-h6 text-center text-uppercase">
      Categorías de Descargas
    </div>

    <div class="full-width q-px-md">
      <!--Not results-->
      <not-result v-if="!categories"/>
      <!--List-->
      <q-list class="q-pa-none" v-else bordered separator>
        <q-item :key="key" clickable v-for="(category, key) in categories"
                :to="{name: 'qdownload.index', params : {category : category.slug}}">
          <q-item-section>
            <label>{{category.title}}</label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return{
        categories : this.$store.state.qcrudMaster.index['qdownload-categories'].data
      }
    },
    mounted(){
      this.getData()
    },
    methods:{
      async getData() {
        this.loading = true
        await this.$store.dispatch('qcrudMaster/INDEX', {
          indexName: 'qdownload-categories',
          apiRoute: 'apiRoutes.qdownload.categories',
          requestParams: {refresh: true, params: {include: 'children'}}
        })
        this.loading = false
      },
    }
  }
</script>
<style lang="stylus">
</style>
