<template></template>
<script>
  export default {
    data() {
      return {
        crudId: this.$uid()
      }
    },
    computed: {
      crudData() {
        return {
          crudId: this.crudId,
          apiRoute: 'apiRoutes.qdownload.suscriptors',
          permission: 'idownload.suscriptors',
          read: {
            columns: [
              {
                name: 'id', label: this.$tr('ui.form.id'),
                field: 'id',
                sortable: true,
              },
              {
                name: 'fullName', label: this.$tr('ui.form.name'),
                field: 'fullName',
                align: 'center',
                sortable: true,
              },
              {
                name: 'email', label: this.$tr('ui.form.email'),
                field: 'email',
                align: 'center',
                sortable: true,
              },
              {
                name: 'phone', label: this.$tr('ui.form.phone'),
                align: 'center', field: 'phone', sortable: true,
              },
              {
                name: 'download', label: this.$tr('qdownload.layout.file'),
                align: 'center', field: 'download', sortable: false,
                format: val => ((val && val.title) ? val.title : '-')
              },
              {
                name: 'createdAt', label: this.$tr('ui.form.createdAt'), field: 'createdAt',
                format: val => val ? this.$trd(val) : '-',
                align: 'left', sortable: true
              },
            ],
            requestParams: {include: 'download'}
          },
        }
      },
      //Crud info
      crudInfo() {
        return this.$store.state.qcrudComponent.component[this.crudId] || {}
      }
    },
  }
</script>
