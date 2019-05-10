<template>
  <div class="user-profile">
    <!-- ROW 4 -->
    <div class="row">
      <div class="col-md-10">
         <div class="card">
          <div class="card-header">
            <h4 class="title">Edit Profile</h4>
          </div>
          <div class="card-content">
            <form>
              <div class="row">
                <div class="col-md-6">
                  <fg-input type="text" label="Username" placeholder="Username" disabled="true"  v-model="viewUserProfilePageFields.username">
                  </fg-input>
                </div>
                <div class="col-md-6">
                  <fg-input type="email" label="Email" placeholder="Email" v-model="viewUserProfilePageFields.email">
                  </fg-input>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <fg-input type="password"  label="Password"  placeholder="password"  value="password">
                  </fg-input>
                  <button type="submit" class="btn btn-info btn-fill btn-xs" style="float:right" @click="openChangePasswordModal()">Change</button>
                </div>
                <div class="col-md-6">
                  <fg-input type="text"   label="First Name"  placeholder="First Name"   v-model="viewUserProfilePageFields.firstname">
                  </fg-input>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <fg-input type="text"label="Last Name" placeholder="Last Name" v-model="viewUserProfilePageFields.lastname">
                  </fg-input>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Birthdate</label> <br/>
                    <el-date-picker  type="date" placeholder="Pick a day" :picker-options="pickerOptions1"  v-model="viewUserProfilePageFields.birthdate">
                    </el-date-picker>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <fg-input type="text" label="City"  placeholder="City" v-model="viewUserProfilePageFields.address.city">
                  </fg-input>
                </div>
                <div class="col-md-6">
                  <fg-input type="text"  label="Country"  placeholder="Country" v-model="viewUserProfilePageFields.address.country">
                  </fg-input>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <fg-input type="text"   label="Street"  placeholder="Street"  v-model="viewUserProfilePageFields.address.street">
                  </fg-input>
                </div>
                <div class="col-md-6">
                  <fg-input type="text"   label="State"  placeholder="State"  v-model="viewUserProfilePageFields.address.state">
                  </fg-input>
                </div>
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-info btn-fill btn-wd" @click="updateUserProfileDataModal()">
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- ROW 4 -->

    <!-- SWEET MODAL -->
    <sweet-modal  ref="changePasswordModal"  modal-theme="light" blocking>
      <div class="row">
        <div class="col-md-4">
          <label>Old Password</label>
        </div>
          <div class="col-md-8" >
            <div class="input-group">
             <input :type="passwordChangeFields.switchInputType.oldPassword" class="form-control" placeholder="Please Input Old Password" v-model="passwordChangeFields.oldPassword">
             <span @click="switchEyePreviewOld()" style="cursor:pointer" class="input-group-addon btn-rotate">
              <i class="glyphicon glyphicon-eye-close" v-if="passwordChangeFields.eye.oldPassword"></i>
              <i class="ti-eye" v-if="!passwordChangeFields.eye.oldPassword"></i>
             </span>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <label>New Password</label>
        </div>
          <div class="col-md-8" >
            <div class="input-group">
             <input :type="passwordChangeFields.switchInputType.newPassword" class="form-control" placeholder="Please Input New Password"  v-model="passwordChangeFields.newPassword">
             <span @click="switchEyePreviewNew()" style="cursor:pointer" class="input-group-addon btn-rotate">
              <i class="glyphicon glyphicon-eye-close" v-if="passwordChangeFields.eye.newPassword"></i>
              <i class="ti-eye" v-if="!passwordChangeFields.eye.newPassword"></i>
             </span>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <label>Confirm Password</label>
        </div>
          <div class="col-md-8" >
            <div class="input-group">
             <input :type="passwordChangeFields.switchInputType.confirmPassword" class="form-control" placeholder="Please Confirm Password"  v-model="passwordChangeFields.confirmPassword">
             <span @click="switchEyePreviewConfirm()" style="cursor:pointer" class="input-group-addon btn-rotate">
              <i class="glyphicon glyphicon-eye-close" v-if="passwordChangeFields.eye.confirmPassword"></i>
              <i class="ti-eye" v-if="!passwordChangeFields.eye.confirmPassword"></i>
             </span>
          </div>
        </div>
      </div>
      <div  style="float:right">
       <button class="btn btn btn-fill  btn-info"  @click="changePasswordModal()">Save</button>
    </div>

  </sweet-modal>

  </div>
</template>
<script>

import jwtDecode from 'jwt-decode'; 
import Datepicker from 'vuejs-datepicker';
import {DatePicker, TimeSelect, Slider, Tag, Input, Button, Select, Option} from 'element-ui'
import axios from 'axios'
import swal from 'sweetalert2'
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'

export default {
  components:{
   [DatePicker.name]: DatePicker,
   'sweet-modal':SweetModal,
   'sweet-modal-tab': SweetModalTab,
  },
  data () {
    return {
      validation:{
        checkEmail:''
      },
      userProfilePageFields: {
        data :'',
      },

      viewUserProfilePageFields:{
        address:{
          city:'',
          country:'',
          state:'',
          street:''
        },
        birthdate:'',
        created:'',
        email:'',
        firstname:'',
        language:'',
        lastname:'',
        roles:'',
        userId:'',
        username:''
      },

      passwordChangeFields:{
        oldPassword:'',
        newPassword:'',
        confirmPassword:'', 
        switchInputType:{
          oldPassword:'password',
          newPassword:'password',
          confirmPassword:'password'
        },
        eye:{
          oldPassword:true,
          newPassword:true,
          confirmPassword:true
        }
      },

      pickerOptions1: {
        shortcuts: [{
         text: 'Today',
         onClick (picker) {
           picker.$emit('pick', new Date())
         }
        },
      {
        text: 'Yesterday',
        onClick (picker) {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24)
          picker.$emit('pick', date)
        }
      },
      {
      text: 'A week ago',
      onClick (picker) {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
          picker.$emit('pick', date)
        }
      }]
      },
    }
  },
  methods: {
    //CRUD
    getUserProfileData(){
      const data = {
         "query":"query{ Profile{UserID,Username,Email,Roles,Firstname,Lastname,Birthdate,Language,Created,Address { Country,City,Street,State } } }"
      }
      axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
      // console.log('getUserProfileData: ',response)
      this.userProfilePageFields.data = response.data.Profile
      this.setUserProfileDate()
      }).catch((err) => {
       console.log(err);
      });
    },

    async updateUserProfileData(){
      const data = {
          "query":"mutation($input:ProfileFields!,$password:String!) { SaveProfile( input:$input,password:$password ) { message,errors {Path,Message} } }",
          "variables":{
            "password":"myadmin",
            "input":{
              "birthdate": this.convertBirthdate(this.viewUserProfilePageFields.birthdate),
              "language": 'en',
              "firstname":this.viewUserProfilePageFields.firstname,
              "lastname":  this.viewUserProfilePageFields.lastname,
              "address" :{
                "street" : this.viewUserProfilePageFields.address.street,
                "country" : this.viewUserProfilePageFields.address.country,
                "city" :  this.viewUserProfilePageFields.address.city,
                "state" : this.viewUserProfilePageFields.address.state,
              }
            }
          }
      }

     return await axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
      // console.log("response: ",response)
      if(response.data.SaveProfile.errors)
      {
        return true
      }else{
        return false
      }
      });
    },

    async changePassword(){
      const data = {
        "query":"mutation($oldPassword:String!,$newPassword:String!) { SavePassword( oldPassword:$oldPassword,newPassword:$newPassword ){errors {Path,Message} }}",
        "variables":{
            "oldPassword": this.passwordChangeFields.oldPassword,
            "newPassword": this.passwordChangeFields.newPassword
        }
      }
      return await axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
      // console.log("changePassword: ", response)

      if(response.data.SavePassword.errors){
        return true
      }else{
        return false
      }
      }).catch((err) => {
        console.log(err);
      });
    },

    //MODAL
    async changePasswordModal(){
      if(this.passwordChangeFields.newPassword == this.passwordChangeFields.confirmPassword){
      
        if(await this.changePassword()){
         swal({
          text: 'Wrong Password!',
          type: 'warning',
          confirmButtonClass: 'btn btn-success btn-fill',
          buttonsStyling: false
         });
        }else{
          swal({
            text: 'File Edited!',
            type: 'success',
            confirmButtonClass: 'btn btn-success btn-fill',
            buttonsStyling: false
           }).then(()=>{
            this.passwordChangeFields.oldPassword = ''
            this.passwordChangeFields.confirmPassword = ''
            this.passwordChangeFields.newPassword = ''
            this.$refs.changePasswordModal.close()
           });
         }       
      }else{
       swal({
          text: 'Password Dont Match!',
          type: 'warning',
          confirmButtonClass: 'btn btn-success btn-fill',
          buttonsStyling: false
         });
      }
    },

    //SET
    setUserProfileDate(){
      this.viewUserProfilePageFields.address.city = this.userProfilePageFields.data.Address.City
      this.viewUserProfilePageFields.address.country = this.userProfilePageFields.data.Address.Country
      this.viewUserProfilePageFields.address.street = this.userProfilePageFields.data.Address.Street
      this.viewUserProfilePageFields.address.state = this.userProfilePageFields.data.Address.State
      this.viewUserProfilePageFields.birthdate = this.userProfilePageFields.data.Birthdate
      this.viewUserProfilePageFields.created = this.userProfilePageFields.data.Created
      this.viewUserProfilePageFields.email = this.userProfilePageFields.data.Email
      this.viewUserProfilePageFields.firstname = this.userProfilePageFields.data.Firstname
      this.viewUserProfilePageFields.language = this.userProfilePageFields.data.Language
      this.viewUserProfilePageFields.lastname = this.userProfilePageFields.data.Lastname
      this.viewUserProfilePageFields.roles = this.userProfilePageFields.data.Roles
      this.viewUserProfilePageFields.userId = this.userProfilePageFields.data.UserID
      this.viewUserProfilePageFields.username = this.userProfilePageFields.data.Username
    },

    //MODAL
    async updateUserProfileDataModal(){
    if(await this.updateUserProfileData()){
       swal({
        text: 'Error On Fields!',
        type: 'warning',
        confirmButtonClass: 'btn btn-success btn-fill',
        buttonsStyling: false
       });
      }else{
        swal({
          text: 'File Edited!',
          type: 'success',
          confirmButtonClass: 'btn btn-success btn-fill',
          buttonsStyling: false
         }).then(()=>{
           this.getUserProfileData()
         });
       }   
    },

    //OPEN MODAL
    openChangePasswordModal(){
      this.$refs.changePasswordModal.open()
    },

    //CONVERT
  convertBirthdate(date_var){
  var d = new Date(date_var),
  month = '' + (d.getMonth() + 1),
  day = '' + d.getDate(),
  year = d.getFullYear(),
  today = '' + d.getDay().toString();
  var thisDay = "";
  if(today == "1" ){
    thisDay = "Mon"
  }else if(today == "2"){
    thisDay = "Tue"
  }else if(today == "3"){
    thisDay = "Wed"
  }else if(today == "4"){
    thisDay = "Thur"
  }else if(today == "5"){
    thisDay = "Fri"
  }else if(today == "6"){
    thisDay = "Sat"
  }else{
    thisDay = "Sun"
  }
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return day + "-"+ month + "-"+ year;
  },
    //SWITCHER
  switchEyePreviewOld(){
      if(this.passwordChangeFields.switchInputType.oldPassword == 'password'){
        this.passwordChangeFields.switchInputType.oldPassword = 'text'
        this.passwordChangeFields.eye.oldPassword = false
      }else{
       this.passwordChangeFields.switchInputType.oldPassword = 'password'
        this.passwordChangeFields.eye.oldPassword = true
      }
   },
   switchEyePreviewNew(){

      if(this.passwordChangeFields.switchInputType.newPassword == 'password'){
        this.passwordChangeFields.switchInputType.newPassword = 'text'
        this.passwordChangeFields.eye.newPassword = false
      }else{
       this.passwordChangeFields.switchInputType.newPassword = 'password'
        this.passwordChangeFields.eye.newPassword = true
      }
   },
   switchEyePreviewConfirm(){
      if(this.passwordChangeFields.switchInputType.confirmPassword == 'password'){
        this.passwordChangeFields.switchInputType.confirmPassword = 'text'
        this.passwordChangeFields.eye.confirmPassword = false
      }else{
       this.passwordChangeFields.switchInputType.confirmPassword = 'password'
        this.passwordChangeFields.eye.confirmPassword = true
      }
   }

  },
  mounted(){
    this.getUserProfileData()
  }
};

</script>
<style>

</style>
