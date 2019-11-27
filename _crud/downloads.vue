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
          apiRoute: 'apiRoutes.qdownload.downloads',
          permission: 'idownload.downloads',
          create: {
            title: this.$tr('qdownload.layout.newDownload'),
          },
          read: {
            columns: [
              {
                name: 'id', label: this.$tr('ui.form.id'),
                field: 'id',
                sortable: true,
              },
              {
                name: 'title', label: this.$tr('ui.form.title'),
                field: 'title',
                align: 'center',
                sortable: true,
              },
              {
                name: 'slug', label: this.$tr('ui.form.slug'),
                field: 'slug',
                align: 'center',
                sortable: true,
              },
              {
                name: 'category', label: this.$tr('ui.form.category'),
                align: 'center', field: 'category', sortable: true,
                format: val => ((val && val.title) ? val.title : '-')
              },
              {
                name: 'createdAt', label: this.$tr('ui.form.createdAt'), field: 'createdAt',
                format: val => val ? this.$trd(val) : '-',
                align: 'left', sortable: true
              },
              {
                name: 'actions', label: this.$tr('ui.form.actions'), align: 'center'
              },
            ],
            requestParams: {include: 'category'}
          },
          update: {
            title: this.$tr('qdownload.layout.updateDownload'),
            requestParams: {include: 'category'}
          },
          delete: true,
          formLeft: {
            id: {value: ''},
            title: {
              value: '',
              type: 'input',
              isTranslatable: true,
              props: {
                label: `${this.$tr('ui.form.title')}*`,
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              },
            },
            slug: {
              value: '',
              type: 'input',
              isTranslatable: true,
              props: {
                label: `${this.$tr('ui.form.slug')}*`,
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              },
            },
            description: {
              value: '',
              type: 'html',
              isTranslatable: true,
              props: {
                label: `${this.$tr('ui.form.description')}*`,
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              }
            },
          },
          formRight: {
            categoryId: {
              value: null,
              type: 'crud',
              props: {
                crudType: 'select',
                crudData: import('@imagina/qdownload/_crud/categories'),
                crudProps: {
                  label: `${this.$tr('ui.form.category')}*`,
                  rules: [
                    val => !!val || this.$tr('ui.message.fieldRequired')
                  ],
                },
              },
            },
            status: {
              value: '2',
              type: 'select',
              props: {
                label: this.$tr('ui.form.status'),
                options: [
                  {label: this.$tr('ui.form.publish'), value: '2'},
                  {label: this.$tr('ui.form.noPublish'), value: '3'},
                  {label: this.$tr('ui.form.draft'), value: '0'},
                  {label: this.$tr('ui.form.pending'), value: '1'}
                ]
              },
            },
            mediasSingle: {
              value: {},
              type: 'media',
              props: {
                label: this.$tr('qdownload.layout.file'),
                zone: 'downloadfile',
                entity: "Modules\\Idownload\\Entities\\Download",
                enitityId: null
              }
            }
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
