<template>
  <div class="row q-col-gutter-sm">
    <div class="col-12 col-sm-6">
      <q-input outlined autofocus
       :label="$tr('qdownload.layout.form.fullName')"
       bottom-slots
       v-model="form.fullName"
       :error="$v.form.fullName.$error"
      >
        <template v-slot:error>
          {{ $tr('qdownload.layout.errors.fullName') }}
        </template>
      </q-input>
    </div>
    <div class="col-12 col-sm-6">
      <q-input outlined type="email"
         :label="$tr('qdownload.layout.form.email')"
         bottom-slots
         v-model="form.email"
         :error="$v.form.email.$error"
      >
        <template v-slot:error>
          {{ $tr('qdownload.layout.errors.email') }}
        </template>
      </q-input>
    </div>
    <div class="col-12 col-sm-6">
      <q-input outlined
         :label="$tr('qdownload.layout.form.phone')"
         bottom-slots
         v-model="form.phone"
         :maxlength="14"
         @input="forceSet('phone',mask(form.phone))"
         clearable
         :error="$v.form.phone.$error"
      >
        <template v-slot:error>
          {{ $tr('qdownload.layout.errors.phone') }}
        </template>
      </q-input>
    </div>
    <div class="col-12 col-sm-6">
      <q-input outlined type="textarea"
               :label="$tr('qdownload.layout.form.comment')"
               bottom-slots
               v-model="form.comment"
               :error="$v.form.comment.$error"
               rows="2"
      >
        <template v-slot:error>
          {{ $tr('qdownload.layout.errors.comment') }}
        </template>
      </q-input>
    </div>
    <div class="col-12 col-sm-6">
      <q-field borderless :error="$v.form.captcha.$error">
        <captcha v-model="form.captcha" :checkbox="true" />
        <template v-slot:error>
          {{ $tr('qdownload.layout.errors.captcha') }}
        </template>
      </q-field>
    </div>
    <div class="col-12 col-sm-6 text-right">
      <q-btn color="primary" :label="$tr('qdownload.layout.form.sendButton')" @click="sendSubscriptorData" />
    </div>
    <div class="col-12">
      <inner-loading :visible="loading"/>
    </div>
  </div>
</template>

<script>
  import {required, email} from 'vuelidate/lib/validators';
  import captcha from '@imagina/qsite/_components/master/captcha'
  export default {
    name: "widget-form",
    components:{
      captcha
    },
    props:{
      download:{
        required: true,
      }
    },
    validations: {
      form: {
        fullName: {required},
        phone: {required},
        email: {required, email},
        comment: {required},
        captcha: {required},
      }
    },
    data(){
      return {
        form: {
          fullName: null,
          phone: null,
          email: null,
          captcha: null,
        },
        loading: false,
      }
    },
    methods:{
      sendSubscriptorData(){
        this.$v.$touch();
        if (this.$v.$error) {
          this.$alert.error({message: 'Por favor revisa de nuevo los campos.', pos: 'bottom'});
        }else{
          this.loading = true
          let form = this.$clone(this.form)
          form.captcha = this.form.captcha.token
          this.$crud.update('apiRoutes.qdownload.sendSubscription',this.download.id,form).then(response =>{
            this.$alert.success({message: this.$tr('qdownload.layout.subscription.successful')})
            this.loading = false
            this.$router.push({name: 'qdownload.master'})
          }).catch(error=>{
            this.$alert.error({message: this.$tr('qdownload.layout.subscription.error')})
            this.loading = false
          })
        }
      },
      forceSet(field, value) {
        this.$nextTick(() => {
          this.form[field] = value
        })
      },
      /*mask value with format phone US*/
      mask(data) {
        return this.$helper.maskPhone(data)
      },
    },
    mounted(){

    }
  }
</script>

<style scoped>

</style>
