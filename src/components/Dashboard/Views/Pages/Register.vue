<template>
  <div>
    <nav class="navbar navbar-transparent navbar-absolute">
      <div class="container">
        <div class="navbar-header">
          <button type="button"
                  class="navbar-toggle navbar-toggle-black"
                  @click="toggleNavbar"
                  data-toggle="collapse"
                  data-target="#navigation-example-2">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar "></span>
            <span class="icon-bar "></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav navbar-right">
            <li>
              <router-link to="/login" class="btn">
                Looking to login?
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="wrapper wrapper-full-page">
      <div class="register-page">
        <!--   you can change the color of the filter page using: data-color="blue | azure | green | orange | red | purple" -->
        <div class="content">
          <div class="container">
            <div class="row">
              <div class="col-md-8 col-md-offset-2">
                <div class="header-text">
                  <hr>
                </div>
              </div>
              <div class="col-md-4 col-md-offset-2">
                <div class="media">
                  <div class="media-left">
                    <div class="icon icon-danger">
                      <i class="ti ti-user"></i>
                    </div>
                  </div>
                  <div class="media-body">
                    <h5>Free Account</h5>
                    Here you can write a feature description for your dashboard, let the users know what is the value that you give them.
                  </div>
                </div>
                <div class="media">
                  <div class="media-left">
                    <div class="icon icon-warning">
                      <i class="ti-bar-chart-alt"></i>
                    </div>
                  </div>
                  <div class="media-body">
                    <h5>Awesome Performances</h5>
                    Here you can write a feature description for your dashboard, let the users know what is the value that you give them.
                  </div>
                </div>
                <div class="media">
                  <div class="media-left">
                    <div class="icon icon-info">
                      <i class="ti-headphone"></i>
                    </div>
                  </div>
                  <div class="media-body">
                    <h5>Global Support</h5>
                    Here you can write a feature description for your dashboard, let the users know what is the value that you give them.
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <form method="#" action="#">
                  <div class="card card-plain">
                    <div class="content">
                      <div class="form-group">
                        <input type="email" placeholder="Your Username" class="form-control" v-model="userFields.username">  
                      </div>
                      <div class="form-group">
                        <input type="password" placeholder="Password" class="form-control" v-model="userFields.password">
                      </div>
                      <div class="form-group">
                        <input type="email" placeholder="Enter Email" class="form-control" v-model="userFields.email">
                      </div>
                          <div class="form-group">
                        <input type="email" placeholder="Enter Firstname" class="form-control" v-model="userFields.firstname">
                      </div>
                      <div class="form-group">
                        <input type="email" placeholder="Enter Lastname" class="form-control" v-model="userFields.lastname">
                      </div>
                    </div>
                    <div class="footer text-center">
                      <button type="button" class="btn btn-fill btn-danger btn-wd" @click="registerUserModal()">Create Free Account</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="collapse navbar-collapse off-canvas-sidebar">
      <ul class="nav nav-mobile-menu">
        <li>
          <router-link to="/login">
            Looking to login?
          </router-link>
        </li>
        <li>
          <router-link to="/admin">
            Dashboard
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>

import axios from 'axios'
import swal from 'sweetalert2'


  export default {
    data(){
      return{
        userFields:{
          username:'',
          email:'',
          password:'',
          firstname:'',
          lastname:''
        }
      }
    },
    methods: {
      toggleNavbar () {
        document.body.classList.toggle('nav-open')
      },
      closeMenu () {
        document.body.classList.remove('nav-open')
        document.body.classList.remove('off-canvas-sidebar')
      },
      async registerUserModal(){
        if(await this.registerUser()){
         swal({
          type: 'warning',
          html: 'Something went wrong',
          confirmButtonClass: 'btn btn-success btn-fill',
          buttonsStyling: false,
        })

        }else{
        swal({
          type: 'success',
          html: 'Registration Success',
          confirmButtonClass: 'btn btn-success btn-fill',
          buttonsStyling: false,
        }).then(()=>{
          this.$router.push('/login')
        })
        }
      },
      async registerUser(){

        const data = {
                "query":"mutation($input:register!) { Register( input:$input ) { token,expiry,data { Firstname,Lastname,ID,Email,Language } ,errors {Message,Path} } }",
                      "variables":{
                        "input":{
                          "username":this.userFields.username,
                          "password":this.userFields.password,
                          "email":this.userFields.email,
                          "firstname":this.userFields.firstname,
                          "lastname":this.userFields.lastname
                        }
                    }
                 }
          return await axios.post(this.post_url,JSON.stringify(data),this.post_config).then((response) => {
            if(response.data.errors){
              return true
            }else{
              return false
            }
            }).catch((err) => {
             console.log(err);
            });

      }
    },
    beforeDestroy () {
      this.closeMenu()
    }
  }
</script>
<style>
</style>
