<template>
  <div>
    <nav class="navbar navbar-transparent navbar-absolute">
      <div class="container">
      </div>
    </nav>
    <div class="wrapper wrapper-full-page">
      <div class="full-page login-page" data-color=""  data-image="{}">
        <div class="content">
        <div class="container">
           <div class="row">
              <div class="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
                  <div class="card" data-background="color" data-color="blue">
                    <div class="card-header">
                      <h2 class="card-title text-center">Login</h2>
                    </div>
                    <div class="card-content">
                     <div class="form-group">
                        <label>Username</label>
                        <input type="text"
                             name="username"
                             v-validate="modelValidations.username"
                             v-model="model.username"
                             v-on:keyup="keyDown"
                             class="form-control input-no-border"
                             placeholder="username" 
                            >
                      <small class="text-danger" v-show="username.invalid">
                        {{ getError('username') }}
                      </small>
                   </div>
                     <div class="form-group">
                        <label>Password</label>

                    <input type="password"
                           name="password"
                           id="password"
                           v-on:keyup="keyDown"
                           v-validate="modelValidations.password"
                           v-model="model.password"
                            placeholder="password" 
                           class="form-control input-no-border">
                    <small class="text-danger" v-show="password.invalid">
                      {{ getError('password') }}
                    </small>
                  </div>
                    </div>
                    <div class="card-footer text-center">
                          <button @click="checkToken()" type="" class="btn btn-fill":disabled="errors.any()">Login
                     </button>
                    </div>
                  </div>
              </div>
            </div>
        </div>
        </div>
        <div class="full-page-background" :style="{backgroundImage:' url('+loginBgConfig+')'}"></div>
      </div>
    </div>
  </div>
</template>
<script>

  import Router from 'vue-router'
  import {mapFields} from 'vee-validate'
  import axios from 'axios'
  import swal from 'sweetalert2'



  export default {
    computed: {
      ...mapFields(['username', 'password'])
    },
    data () {
      return {
        ModalOnKeyPress: false,

        loginClick:{
          falseResponse:0,
          trueResponse:0,
          Click:0
        },
        keyPress:{
          Press:0,
          falseResponse:0,
          trueResponse:0
        },
        loginBgConfig:'',
        model: {
          username: '',
          password: ''
        },
        modelValidations: {
          username: {
            required: true
          },
          password: {
            required: true,
            min: 5
          }
        }
      }
    },
    methods: {
      async keyDown(event){   
        if(this.model.password == '' ){
           this.validate()
        }else{
            if(event.key == "Enter"){
             // console.log(this.keyPress.Press)
             if(this.keyPress.Press > 0){
              return false
             }else{
              this.keyPress.Press++
                if(await this.login()){
              this.keyPress.trueResponse++
                if(await this.validate_session()){
              // console.log("Press",  this.keyPress.Press)
              // console.log("trueResponse",  this.keyPress.trueResponse)
              setTimeout(() => {
                      if(this.keyPress.Press ==   this.keyPress.trueResponse){
                         this.$router.push('/')
                         this.showSwal('success')
                         this.keyPress.Press = 0
                         this.keyPress.trueResponse = 0
                      }
                }, 100);
            }
            }else{
            this.keyPress.falseResponse++
                setTimeout(() => {
                      if(this.keyPress.Press ==  this.keyPress.falseResponse){
                        this.model.password = ''    
                        this.validate()
                        this.showSwal('wrong')
                         this.keyPress.Press = 0
                         this.keyPress.falseResponse = 0
                      }
                }, 100);
             }
           }
         }
      }

      },
      async checkToken(){
        if(this.loginClick.Click > 0){
          // console.log()
            return false
         }else{
           this.loginClick.Click++
           // console.log(this.loginClick.Click)
           if(await this.login()){
            this.loginClick.trueResponse++
            if(await this.validate_session()){
              setTimeout(() => {
                      if(this.loginClick.Click ==   this.loginClick.trueResponse){
                         this.$router.push('/')
                         this.showSwal('success')
                         this.loginClick.Click = 0
                         this.loginClick.trueResponse = 0
                      }
                }, 100);
            }
          }else{
              this.loginClick.falseResponse++
              // console.log("here false")
              setTimeout(() => {
                  if(this.loginClick.Click == this.loginClick.falseResponse){
                  this.showSwal('wrong')
                  this.model.password = ''
                  document.getElementById("password").focus()
                  this.validate()
                  this.loginClick.Click = 0
                   this.loginClick.falseResponse = 0
                  }
              }, 100);
            }
         }
      },
      async login() {
            if(this.model.username != "" && this.model.password != "" || this.model.username != "" && this.model.password != 'undefined') {
                 const data = {
                  "query":"mutation($input:Credentials!) { AdminLogin( input:$input ) { token,exp,data { Firstname,Lastname,id,Email,Language }}}",
                  "variables":{
                       "input":{
                        "username":this.model.username,
                         "password":this.model.password
                      }
                  }
                }
                const config ={
                  "headers":{
                    "Content-Type":"application/json"
                  }
                }
                var thisToken = ""
                return await axios.post(this.post_url,JSON.stringify(data),this.post_config).then((response) => {
                  thisToken = response.data.AdminLogin.token;
                 if(thisToken){
                  window.localStorage.setItem("session",thisToken);
                  window.localStorage.setItem("lang","en");
                  return true
                  }else{
                    return false
                  }
                 }).catch(err =>{
                   console.log(err.response)
                 });                              
         }
      },
      toggleNavbar () {
        document.body.classList.toggle('nav-open')
      },
      closeMenu () {
        document.body.classList.remove('nav-open')
        document.body.classList.remove('off-canvas-sidebar')
      },
      navigate(){
       this.$router.push('/')
      },
      //vee validate
      getError (fieldName) {
      return this.errors.first(fieldName)
      },
      validate () {
        this.$validator.validateAll().then(isValid => {
          this.$emit('on-submit', this.registerForm, isValid)
        })
      },

      showSwal (type) {
        this.ModalOnKeyPress = true
        if (type === 'wrong') {
          swal({
            title: `Login Failed`,
            text: `Invalid username or password`,

            buttonsStyling: false,
            type: 'warning',
            confirmButtonClass: 'btn btn-success btn-fill'
          })
        }else if(type === 'success') {
          swal({
            title: `Login Success`,
            text: `Welcome to our Admin Panel`,
            buttonsStyling: false,
            type: 'success',
            confirmButtonClass: 'btn btn-success btn-fill'
          })
         }
       
      }
    },//method
    beforeDestroy () {
      this.closeMenu()
    },
    mounted(){
        if(this.validate_session() == true){
            this.$router.push('/')
          }else if(this.validate_session() == -1){
          }else{
          }
          this.loginBgConfig = process.env.LOGIN_BG
    }  
  };
</script>
<style>
.full-page:after{
  background: none !important; 
}
.form-control:{
  height: 19px !important;
}
</style>
