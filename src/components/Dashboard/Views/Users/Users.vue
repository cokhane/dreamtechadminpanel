<template>
  <div class="user-management">
    <!-- ROW 4 -->
    <div class="row">
        <!-- CARD 7 -->
        <div class="card">
          <!-- TITLE | NAV -->
          <div class="card-header">
            <div class="row">
              <div class="col-md-4">
                <h2 class="card-title">{{setUserLanguageFields.userManagement}}</h2></div>
              <div class="col-md-4"></div>
              <div class="col-md-4">
                <button class="btn btn-sm" style="float:right;margin-right: 10px;" @click="refreshData()">{{setUserLanguageFields.refresh}}</button>
                <button class="btn btn-sm" style="float:right;margin-right: 5px;" @click="openAddUserModal()">{{setUserLanguageFields.addUser}}</button>
              </div>
            </div>
          </div>
          <!-- TITLE | NAV -->

          <!-- SEARCH -->
          <div class="row" style="margin-top:15px">
            <div class="card-header">
                <div class="form-group">
                  <div class="col-xs-2"> 
                    <label style="margin-top: 10px;float:right">Search By</label>
                  </div>
                  <!-- SEARCH SELECT -->
                  <div class="col-md-2">
                    <select class="form-control" @change="pageLoadingState()" v-model="searchableFields.fieldsToSearch">
                      <option value="created">date created</option>
                      <option >email</option>
                      <option >firstname</option>
                      <option >lastname</option>
                    </select>
                  </div>
                  <!-- SEARCH SELECT -->

                  <!-- SEARCH SWITCH -->
                  <div v-if="!searchableFields.switchSelect"> 
                    <div class="col-md-5" >
                      <div class="input-group">
                        <input type="text" class="form-control" placeholder="Please Input" autofocus="true" v-model="searchableFields.data" v-on:keyup="keyDown">
                        <span class="input-group-addon"><i class="ti-search"></i></span>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <button class="btn" @click="searchData()">{{setUserLanguageFields.submit}}</button>
                      <button class="btn" @click="resetFields()">{{setUserLanguageFields.reset}}</button>
                    </div>
                  </div>
                  <!-- SEARCH SWITCH -->

                  <!-- SEARCH DATE -->
                  <div v-if="searchableFields.switchSelect">
                   <div class="col-xs-6">
                      <div class="form-group">
                        <ul class="list-inline">
                          <li>
                            <div>
                              <label> From:</label>    
                                <el-date-picker v-model="searchableFields.datePicker.from" type="date" placeholder="Pick a day"
                                 :picker-options="pickerOptions1">
                                </el-date-picker>
                            </div>
                          </li>
                          <li>
                            <div>
                              <label> to:</label>
                                <el-date-picker  v-model="searchableFields.datePicker.to" type="date" placeholder="Pick a day"
                                 :picker-options="pickerOptions1">
                                </el-date-picker>
                            </div>
                          </li>
                          <li>
                           <button class="btn" @click="searchableFieldsDateCombine()">{{setUserLanguageFields.submit}}</button>
                           <button class="btn" @click="resetDateFields()">{{setUserLanguageFields.reset}}</button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <!-- SEARCH DATE -->
                </div>
              </div>
            </div>
            <!-- SEARCH -->
            <hr style="margin-top: 12px;">
            <div style="padding:10px;margin:10px" class="table-responsive">
              <table class="table table-striped table-bordered table-hover">
              <!-- SORT TABLE -->
              <thead>
                <tr>
                  <th>
                    <span @click="sortData('created')" style="cursor:pointer">{{setUserLanguageFields.dateCreated}}<i style="" :class="(sortableFields.icon.created) ? 'ti-angle-double-up':'ti-angle-double-down'" style="position: relative;top: 2px; left: 5px;"></i></span>
                  </th>
                  <th>
                    <span @click="sortData('firstname')" style="cursor:pointer">{{setUserLanguageFields.firstname}}<i style="" :class="(sortableFields.icon.firstname) ? 'ti-angle-double-up':'ti-angle-double-down'" style="position: relative;top:2px; left: 5px;"></i></span>
                  </th>
                  <th>
                    <span @click="sortData('lastname')" style="cursor:pointer">{{setUserLanguageFields.lastname}}<i style="" :class="(sortableFields.icon.lastname) ? 'ti-angle-double-up':'ti-angle-double-down'" style="position: relative;top:2px; left: 5px;"></i></span>
                  </th>
                  <th>
                    <span @click="sortData('email')" style="cursor:pointer">{{setUserLanguageFields.email}}<i style="" :class="(sortableFields.icon.email) ? 'ti-angle-double-up':'ti-angle-double-down'" style="position: relative;top: 2px; left: 5px;"></i></span>
                  </th>
                  <th>Roles</th>
                  <th>Status</th>
                  <th>{{setUserLanguageFields.language}}</th>
                  <th>{{setUserLanguageFields.action}}</th>
                </tr>
              </thead>
              <!-- SORT TABLE -->

              <!-- TABLE BODY -->
              <tbody>
                <tr v-for="(items,index) in getUserFields.data" v-if="getUserFields.status">
                  <td>{{convertDate(items.Created)}}</td>
                  <td >{{items.Firstname}}</td><td>{{items.Lastname}}</td>
                  <td>{{items.Email}}</td>
                  <td>{{convertRoles(items.Roles)}}</td>
                  <td>{{convertDisabled(items.isDisabled)}} </td>
                  <td>{{items.Language}}</td>
                  <td>
                    <button class="btn btn-sm" @click="openPreviewModal(items)">{{setUserLanguageFields.view}}</button>
                    <button class="btn btn-sm" @click="openAddRolesModal(items)">{{setUserLanguageFields.edit}}</button>
                    <button class="btn btn-sm" @click="disableUserModal()">Disable</button>
                  </td>
                </tr>
              </tbody>
              <!-- TABLE BODY -->
            </table>

            <!-- LOADER  -->
            <div  v-if="!getUserFields.status">
              <div class="row" style="text-align: center;">
                <i class="fa fa-spinner fa-spin" style="font-size:24px"></i>
              </div>
            </div>
            <!-- LOADER  -->


            <!-- NO DATA -->
            <div  v-if="getUserFields.dataStatus">
              <div class="row" style="text-align: center;">
                <h1>NO DATA FOUND</h1>
              </div>
            </div>
            <!-- NO DATA -->

            <!-- PAGINATION -->
            <div class="row">
              <div class="col-md-3">
                <p>Showing {{paginationFields.pageShowingFrom}} to {{paginationFields.pageShowingTo}} of {{paginationFields.pageTotal}} entries</p>        
                <p-pagination type="default" :page-count="paginationFields.pageNumberTotal" v-model="paginationFields.pageNumber"></p-pagination>
              </div>
              <div class="col-md-2"  style="float:right; margin-top:45px">
                <div class="form-group">
                  <select class="form-control" @change="getUser()" v-model="paginationFields.pageLimit">
                    <option v-for="(items,index) in paginationFields.selectFields.array">{{items}}</option>
                  </select>
                </div>
              </div>
            </div>
          <!-- PAGINATION -->
          </div>   
        </div>
        <!-- CARD 7 -->
    </div>
    <!-- ROW 4 -->
    <sweet-modal  ref="addUserModal"  modal-theme="light" blocking>
      <div class="form-horizontal">
        <div class=" card-content">
          <div class="row">
            <form method="#" action="#">
              <div class="card card-plain">
                <div class="card-header" style="margin-bottom: 20px;margin-left:30px">
                  <h2 class="title">Add User</h2>
                  <hr>
                </div>
                <div class="content">
                   <div class="form-group">
                      <label class="col-sm-3 control-label" style="margin-top:-5px">Email</label>
                      <div class="col-sm-9">
                        <input type="email" name="Title" class="form-control" placeholder="Email"  v-model="addUserFields.email">
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-sm-3 control-label" style="margin-top:-5px">Password</label>
                      <div class="col-sm-9">
                        <input type="password" name="Title" class="form-control" placeholder="Password"  v-model="addUserFields.password">
                    </div>
                    </div>
                    <div class="form-group">
                      <label class="col-sm-3 control-label" style="margin-top:-5px">Firstname</label>
                      <div class="col-sm-9">
                        <input type="text" name="Title" class="form-control" placeholder="Firstname"  v-model="addUserFields.firstname">
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-sm-3 control-label" style="margin-top:-5px">Lastname</label>
                      <div class="col-sm-9">
                        <input type="text" name="Title" class="form-control" placeholder="Lastname"  v-model="addUserFields.lastname">
                      </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="footer">
        <button style="float:right" class="btn btn-info btn-fill" @click="addUserModal()">Save</button>
      </div>
    </sweet-modal>
    <sweet-modal ref="previewUserModal"width="70%" style="margin-left:120px"  modal-theme="light" >
      <div class="card" style="box-shadow:none">
        <div class="card-header">
          <h4 class="title">View User Profile</h4>
        </div>
        <div class="card-content">
          <form>
            <div class="row">
              <div class="col-md-4">
               <fg-input type="email"label="Email" placeholder="Email" v-model="viewUserFields.email"disabled></fg-input>
              </div>
              <div class="col-md-4">
                <fg-input type="text" label="Created" placeholder="Created" v-model="viewUserFields.created" disabled></fg-input>
              </div>
               <div class="col-md-4">
                <fg-input type="text"label="Language"placeholder="Language"v-model="viewUserFields.language" disabled></fg-input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <fg-input type="text"label="First Name" v-model="viewUserFields.firstname" disabled></fg-input>
              </div>
              <div class="col-md-4">
                <fg-input type="text" label="Last Name" placeholder="Last Name"  v-model="viewUserFields.lastname" disabled></fg-input>
              </div>
              <div class="col-md-4">
                <fg-input type="text"label="Birthdate" placeholder="Birthdate" v-model="viewUserFields.birthdate"disabled></fg-input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <fg-input type="text" label="City" placeholder="City"  v-model="viewUserFields.address.city" disabled></fg-input>
              </div>
              <div class="col-md-4">
                <fg-input type="text" label="Country"placeholder="Country" v-model="viewUserFields.address.country" disabled></fg-input>
              </div>
              <div class="col-md-4">
                <fg-input type="text" label="Street" placeholder="Street" v-model="viewUserFields.address.street"disabled></fg-input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <fg-input type="text" label="State" placeholder="State" v-model="viewUserFields.address.state"disabled></fg-input>
              </div>
              <div class="col-md-4">
                <label>Status</label>
                <div class="form-group">
                  <input type="text" class="form-control"  placeholder="Status" v-model="viewUserFields.status" disabled>
                </div>
              </div>
              <div class="col-md-4">
                <fg-input type="text" label="UserID" placeholder="User ID" v-model="viewUserFields.userid" disabled></fg-input>
              </div>
            </div>
          </form>
        </div>
      </div>
    </sweet-modal>
    <sweet-modal  ref="addRolesModal"  modal-theme="light"  style="margin-left: 120px;" blocking>
      <div class="row" style="margin-left: 49px">
        <div class="card" style="box-shadow:none">
          <div class="card-header">
            <h4 class="card-title"> {{addUserRolesFields.items.Email}}</h4>
            <hr>
            <div v-for="(items,index) in getRolesFields.data">
              <ul class="list-inline">
                <li>
                  {{items.Name}} : <input type="checkbox" :id="items.Name" :value="items.Name" v-model="addUserRolesFields.array">
                </li>
              </ul>
            </div>
            <hr>
            <div class="card-footer">
              <button class="btn btn-fill btn-primary" style="float:right" @click="addUserRolesModal()">Save</button>
            </div>
          </div>
        </div>
      </div>
  </sweet-modal>
  </div>
</template>
<script>
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'
import swal from 'sweetalert2'
import Vue from 'vue'
import axios from 'axios'
import {Table, TableColumn} from 'element-ui'
import PSwitch from 'src/components/UIComponents/Switch.vue'
import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
import ElFormItem from 'element-ui/packages/form/src/form-item'
import {DatePicker, TimeSelect, Slider, Tag, Input, Button, Select, Option} from 'element-ui'
import PPagination from 'src/components/UIComponents/Pagination.vue'
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'
Vue.use(Table)
Vue.use(TableColumn)
export default {
components: {
StatsCard,
ElFormItem,
[DatePicker.name]: DatePicker, 
'sweet-modal':SweetModal,
'sweet-modal-tab': SweetModalTab,
PPagination
},
data() {
  return {
    paginationFields:{
      pageTotal:1,
      pageLimit:5,
      pageNumber:1,
      pageNumberTotal:1,
      pageShowingFrom:1,
      pageShowingTo:1,
      pageMinus:1,
      selectFields:{
        array:[]
      }
    },
    searchableFields:{
      fieldsToSearch:'created',
      data:'',
      switchSelect:true,
      datePicker:{
        to: new Date(),
        from: new Date()
      }
    },
    sortableFields:{
        fieldsToSort: 'created', 
      icon:{
        username:true,
        email:true,
        created:true,
        firstname:true,
        lastname:true
      },
      sort:{
        field:'asc' 
      },
    },
    setUserLanguageFields:{
      action:'',
      addUser:'',
      dateCreated:'',
      edit:'',
      email:'',
      firstname:'',
      lastname:'',
      language:'',
      pleaseInput:'',
      refresh:'',
      reset:'',
      showingOfEntries:'',
      submit:'',
      userManagement:'',
      username:'',
      users:'',
      view:'',
      of:'',
    },
    getUserLanguageFields:{
      data:''
    },
    viewUserFields:{
      address:{
        city:'',
        country:'',
        state:'',
        street:''
      },
      username:'',
      email:'',
      birthdate:'',
      firstname:'',
      lastname:'',
      status:'',
      userid:'',
      created:'',
      language:'',
      roles:'',
    },
    getRolesFields:{
      data:{}
    },
    addUserRolesFields:{
      items:{},
      array:[]
    },
    getUserFields: {
      data: '',
      status:false,
      dataStatus: false
    },
    addUserFields:{
      password:'',
      email:'',
      firstname:'',
      lastname:'',
      responseMessage:''
    },
    disableUserFields:{
      id:''
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
    }
  }
},
/*  
       />____
[#####[]____ DATA
       \>                     
*/
computed: {
  ...mapGetters([
    'viewLanguageCode',
  ])
},
/*  
       />____
[#####[]____ COMPUTED
       \>                     
*/
methods: {
  //CRUD
  getRolesPermission(){
    const data = {
       "query":"query{ roles { data{ RoleID,Name,Description,Read,Update,Create,Delete,View,Created },page { items,pageNo,totalPages } ,sortableFields } }"
    }
    axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
    // console.log("getRolesPermission(): ",response)
    this.getRolesFields.data = response.data.roles.data
    }).catch((err) => {
    });
  },
  async getUser(){
    // console.log(this.searchableFields.data)
    const data = {
      "query":"query($limit:Limit,$sort:sort,$search:search){ users(limit:$limit,sort:$sort,search:$search) { data { UserID,Username,Firstname,Lastname,Address { Country,City,Street,State } ,Email,Roles,Birthdate,Language,Status,Created,isDisabled }, page { items,pageNo,totalPages } success,message{path,message},sortableFields,searchableFields } }",
      "variables":{
      "limit":{
        "to":this.paginationFields.pageLimit, 
        "page":this.paginationFields.pageNumber 
      },
      "sort":{
        "field":this.sortableFields.fieldsToSort,
        "by":this.sortableFields.sort.field
      },
      "search":{
        "by":this.searchableFields.fieldsToSearch,
        "text":this.searchableFields.data
       }
      }
    }
    return await axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
    console.log("getUser(): ",response)
    this.getUserFields.data = response.data.users.data
    this.paginationFields.pageTotal = response.data.users.page.items
    this.getUserFields.dataStatus = (this.getUserFields.data.length === 0)? true:false
    this.getUserFields.status = true
    this.setPagination()
    this.setPaginationSelect()

    }).catch((err) => {
    });
  },
    async addUser(){
    const data = {
      "query":"mutation($input:register!) { NewUser( input:$input ) { token,exp,data { Firstname,Lastname,id,Email,Language } ,errors {Message,Path} } }",
      "variables":{
        "input":{
          "username":this.addUserFields.email,
          "password":this.addUserFields.password,
          "email":this.addUserFields.email,
          "firstname":this.addUserFields.firstname,
          "lastname":this.addUserFields.lastname
        }
      }
     }
    return await axios.post(this.post_url,JSON.stringify(data),this.post_config).then((response) => {
    console.log("addUser() :", response)

    if(!response.data.success){
      if(response.data.NewUser.errors[0].Message == "Already exists."){
        this.addUserFields.responseMessage = "Email Already Exist!"
      }
      return true
    }else{
      return false
    }
      }).catch((err) => {
    });
  },
  async addUserRoles(){
    const data = {
      "query":"mutation($input:UserRolesFields!) { UpdateUserRole( input:$input ) { success,message { Path,Message } } }",
      "variables":{
        "input":{
          "roles":this.addUserRolesFields.array,
          "userID":this.addUserRolesFields.items.UserID  
        }
      }
    }
    return await axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
    // console.log("addUserRoles()",response)
    if(response.data.UpdateUserRole.errors.length > 0){
      return true
    }else{
      return false
    }
    }).catch((err) => {
    });
  },
  disableUser(){
  const data = {
      "query":"mutation($usersID:[String!]!) { DeleteUser( usersID:$usersID) { success,errors { Path,Message } } }",
      "variables":{
        "usersID":["a5badefa454da24485e889e4f0"]
      }
    }
    axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
    console.log("disableUser()",response)
    }).catch((err) => {
    });
  },

  
  //SORT
  sortData(items){
  this.sortableFields.fieldsToSort = items
  switch (this.sortableFields.fieldsToSort) {
    case 'firstname':
       if(this.sortableFields.icon.firstname){
          this.sortableFields.icon.firstname = false
          this.sortableFields.sort.field = 'desc'
          this.getUserFields.status = false
          this.getUser()
        }else{
          this.sortableFields.icon.firstname = true
          this.sortableFields.sort.field = 'asc'
          this.getUserFields.status = false
          this.getUser()
        }
        break;
    case 'lastname':
         if(this.sortableFields.icon.lastname){
            this.sortableFields.icon.lastname = false
            this.sortableFields.sort.field = 'desc'
            this.getUserFields.status = false
            this.getUser()
          }else{
            this.sortableFields.icon.lastname = true
            this.sortableFields.sort.field = 'asc'
            this.getUserFields.status = false
            this.getUser()
          }
        break;
    case 'email':
          if(this.sortableFields.icon.email){
            this.sortableFields.icon.email = false
            this.sortableFields.sort.field = 'desc'
            this.getUserFields.status = false
            this.getUser()
          }else{
            this.sortableFields.icon.email = true
            this.sortableFields.sort.field = 'asc'
            this.getUserFields.status = false
            this.getUser()
          }
        break;
    case 'created':
            if(this.sortableFields.icon.created){
            this.sortableFields.icon.created = false
            this.sortableFields.sort.field = 'desc'
            this.getUserFields.status = false
            this.getUser()
          }else{
            this.sortableFields.icon.created = true
            this.sortableFields.sort.field = 'asc'
            this.getUserFields.status = false
            this.getUser()
          }
        break;
    default:
        break;
  }
},

//MODAL
 async addUserModal(){
  if(this.checkUserAddValidation()){
    if(this.checkProperEmail(this.addUserFields.email)){
     swal({
      type: 'warning',
      html: 'Invalid Email!',
      confirmButtonClass: 'btn btn-success btn-fill',
      buttonsStyling: false,
     })
    }else{
      if(await this.addUser()){
         swal({
          type: 'warning',
          html: this.addUserFields.responseMessage,
          confirmButtonClass: 'btn btn-success btn-fill',
          buttonsStyling: false,
        })
        }else{
       swal({
          type: 'success',
          html: 'Registration Success',
          confirmButtonClass: 'btn btn-success btn-fill',
          buttonsStyling: false,
        }).then( () => {
          this.addUserFields.password = ''
          this.addUserFields.email = ''
          this.addUserFields.firstname = ''
          this.addUserFields.lastname = ''
          this.$refs.addUserModal.close()
          this.getUser()
        }, () => {
          this.addUserFields.password = ''
          this.addUserFields.email = ''
          this.addUserFields.firstname = ''
          this.addUserFields.lastname = ''
          this.$refs.addUserModal.close()
          this.getUser()
        })
      }
    }
  }else{
    swal({
      type: 'warning',
      html: 'Empty Field!',
      confirmButtonClass: 'btn btn-success btn-fill',
      buttonsStyling: false,
    })
   }
  },
  async addUserRolesModal (type) {
    if(await  this.addUserRoles()){
      swal({
        title: 'Something went wrong!',
        text: 'Your imaginary file has been edited.',
        type: 'warning',
        confirmButtonClass: 'btn btn-success btn-fill',
        buttonsStyling: false
      })
    }else{
      this.getUser()
      swal({
        title: 'Filed edited!',
        text: 'Your imaginary file has been edited.',
        type: 'success',
        confirmButtonClass: 'btn btn-success btn-fill',
        buttonsStyling: false
      }).then(()=>{
        this.$refs.addRolesModal.close()
      },()=>{
        this.$refs.addRolesModal.close()

      })
    }
  }, 
  disableUserModal(){
    this.addUserRolesFields.array.push(items.id)
    swal({
      title: 'Are you sure?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      confirmButtonClass: 'btn btn-success btn-fill',
      cancelButtonClass: 'btn btn-danger btn-fill',
      buttonsStyling: false
    }).then(async () => {
    if(await this.disableUser())
    {
      swal({
        title: 'Something went wrong!',
        type: 'warning',
        confirmButtonClass: 'btn btn-success btn-fill',
        buttonsStyling: false
      })
    }else{
     swal({
        title: 'News Deleted!',
        type: 'success',
        confirmButtonClass: 'btn btn-success btn-fill',
        buttonsStyling: false
      }).then(()=>{
       this.getUserFields.status = false
        this.getNews()
      },()=>{
        this.getUserFields.status = false
        this.getNews()
      })
      }
    }, function (dismiss) {
      if (dismiss === 'cancel') {
        swal({
          title: 'Cancelled',
          type: 'error',
          confirmButtonClass: 'btn btn-info btn-fill',
          buttonsStyling: false
        })
      }
    })
  },

  checkIfGoogleRegistered(items){
    if(items == null){
      return 'Registered By Google'
    }else{
      return items
    }
  },

  //OPEN MODAL
  openAddUserModal(){
    this.$refs.addUserModal.open()
  },
  openPreviewModal(items){
    this.$refs.previewUserModal.open()
    this.viewUserFields.username = this.convertMissingData(items.Username)
    this.viewUserFields.birthdate = this.convertMissingData(items.Birthdate)
    this.viewUserFields.email = this.convertMissingData(items.Email)
    this.viewUserFields.language = this.convertMissingData(items.Language)
    this.viewUserFields.firstname = this.convertMissingData(items.Firstname)
    this.viewUserFields.lastname = this.convertMissingData(items.Lastname)
    this.viewUserFields.status = this.convertMissingData(items.Status)
    this.viewUserFields.userid = this.convertMissingData(items.UserID)
    this.viewUserFields.created = this.convertMissingData(items.Created)
    this.viewUserFields.address.city = this.convertMissingData(items.Address.City)
    this.viewUserFields.address.country = this.convertMissingData(items.Address.Country)
    this.viewUserFields.address.state = this.convertMissingData(items.Address.State)
    this.viewUserFields.address.street = this.convertMissingData(items.Address.Street)

  },
  openAddRolesModal(items){
    this.$refs.addRolesModal.open()
    this.addUserRolesFields.array = [] //set to 0 to reset shit
    this.addUserRolesFields.items = items
    this.pushAddUserRolesFields(items.Roles)
    console.log(items.Roles)
  },


  pushAddUserRolesFields(items){
    for(var i = 0; i < items.length; i++){
      this.addUserRolesFields.array.push(items[i])
    }
  },

  //SEARCH
  keyDown(event){
    if(event.key == 'Enter'){
      this.getUserFields.status = false
      this.getUser()
    }
  },

  pageLoadingState(){
  if(this.searchableFields.fieldsToSearch == 'created'){
    this.searchableFields.switchSelect = true
  }else{
    this.searchableFields.switchSelect = false
  }
  },

  searchData(){
  this.getUserFields.status = false
  this.getUser()  
  },

  searchableFieldsDateCombine(){
  var dateCombine = this.convertDate(this.searchableFields.datePicker.from) +"00:00:00"+ "_" + this.convertDate(this.searchableFields.datePicker.to) +"23:59:59"
  this.searchableFields.data = dateCombine
  // console.log("date combine: ",dateCombine)
  this.getUserFields.status = false
  this.getUser()
  },

//PAGINATION
  setPaginationSelect(){
    var selectData = 0
    this.paginationFields.selectFields.array = []
    for(var i = 0; i < this.paginationFields.pageTotal;i++){
      if(selectData+5 < this.paginationFields.pageTotal){
         selectData = selectData + 5
         this.paginationFields.selectFields.array.push(selectData)
      }
    }
  },
  setPagination(){
    if(this.paginationFields.pageNumber == 1){
    this.paginationFields.pageShowingFrom = 1
    this.paginationFields.pageShowingTo = this.paginationFields.pageLimit
    this.paginationFields.pageMinus = this.paginationFields.pageShowingTo - this.paginationFields.pageShowingFrom
    }
    if(this.paginationFields.pageTotal%this.paginationFields.pageLimit != 0 ){
    this.paginationFields.pageNumberTotal =  this.paginationFields.pageTotal / this.paginationFields.pageLimit 
    this.paginationFields.pageNumberTotal =  Math.floor(this.paginationFields.pageNumberTotal) + 1
    }else{
     this.paginationFields.pageNumberTotal =  this.paginationFields.pageTotal / this.paginationFields.pageLimit 
     this.paginationFields.pageNumberTotal =  Math.floor(this.paginationFields.pageNumberTotal)
    }
  },

  //RESET
  resetFields(){
    this.searchableFields.data = ''
  },
  resetDateFields(){
    this.searchableFields.datePicker.to = new Date()
    this.searchableFields.datePicker.from = new Date()
  },
  refreshData(){
    this.paginationFields.pageTotal = 1
    this.paginationFields.pageLimit = 5
    this.paginationFields.pageNumber = 1
    this.paginationFields.pageNumberTotal = 1
    this.paginationFields.pageShowingFrom = 1
    this.paginationFields.pageShowingTo = 1
    this.paginationFields.pageMinus = 1 
    this.paginationFields.selectFields.array = []
    this.searchableFields.fieldsToSearch = 'created'
    this.searchableFields.data = ''
    this.searchableFields.switchSelect = true
    this.searchableFields.datePicker.to = new Date() 
    this.searchableFields.datePicker.from = new Date()
    this.sortableFields.fieldsToSort = 'created'
    this.sortableFields.icon.username = true
    this.sortableFields.icon.email = true
    this.sortableFields.icon.created = true
    this.sortableFields.icon.firstname = true
    this.sortableFields.icon.lastname = true
    this.sortableFields.sort.field = 'asc'
    this.getUserFields.status = false
    this.getUser()
  },


  //CONVERTER
  convertDisabled(items){
  if(items == null){
    return "DISABLED"
  }else{
    return this.convertDate(items)
  }
  },
  convertRoles(items){
  var total = " "
  if(items.length == 0){
    return "NO ROLES"
  }else{
    if(items.length > 1){
      for(var i=0;i < items.length;i++){
        total = total + items[i] + " " + " | "
      }
    }else{
       for(var i=0;i < items.length;i++){
        total = total + items[i] + " "
      }
    }
    return total
  }
  },
  convertMissingData(items){
  if(items == null){
    return 'NO DATA'
  }else{
    return items
  }
  },

  convertDate(date_var){
  if(date_var == null){
    return false
  }else{
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
    }
     else {
      thisDay = "Sun"
    }
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return month + "/"+ day + "/"+ year + " ";
      }
   },

  //VALIDATION

  checkUserAddValidation(){
  if(this.isEmptyOrSpaces(this.addUserFields.password)){
      // console.log("return from password")
      return false
    }else if(this.isEmptyOrSpaces(this.addUserFields.email)){
      // console.log("return from email")
      return false
    }else if(this.isEmptyOrSpaces(this.addUserFields.firstname)){
      // console.log("return from firstname")
      return false
    }
    else if(this.isEmptyOrSpaces(this.addUserFields.lastname)){
      // console.log("return from lastname")
      return false
    }
    else{
      return true
    }
  },

  isEmptyOrSpaces(str){
  var pattern =/^ *$/
  //return false for true
  return pattern.test(str);  
  }, 

  checkProperEmail(items){
    // console.log(items)
   //return false for true
    var countEmailString = 0
    for(var i = 0; i < items.length; i++){
      if(items[i] == '@'){
        countEmailString++
      }
    }
    if(countEmailString == 1){
      return false
    }else{
      return true
    }
  },


  //LANGUAGE 

  getUserLanguage(){
        const data = {
         "query":"query($input:view_languages_fields,$limit:Limit,$sort:sort,$search:search){view_languages(input:$input,limit:$limit,sort:$sort,search:$search){ data { id,keyword,description,date }, success,message, { path,message }, page { items,pageNo,totalPages } sortableFields,searchableFields } }",
      "variables":{
          "input":{
              "code":this.viewLanguageCode || "en",
              "set_name":"user module"
          },
           "limit":{
                "to":1000,
                "page":1
            },
          "sort":{
              "field":"",
            "by":""
          },
          "search":{
              "by":"",
              "text":""
          }
      }
    };
  axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
  // console.log("getUserLanguage(): ",response)
  this.getUserLanguageFields.data = response.data.view_languages.data

  this.setDefaultLanguage()
  }).catch((err) => {
  }); 
  },

  setDefaultLanguage(){

  this.setUserLanguageFields.action = "Action"
  this.setUserLanguageFields.addUser = "Add User"
  this.setUserLanguageFields.dateCreated = "Date Created"
  this.setUserLanguageFields.edit = "Edit"
  this.setUserLanguageFields.email = "Email"
  this.setUserLanguageFields.firstname = "Firstname"
  this.setUserLanguageFields.lastname = "Lastname"
  this.setUserLanguageFields.language = "Language"
  this.setUserLanguageFields.pleaseInput = "Please Input"
  this.setUserLanguageFields.refresh = "Refresh"
  this.setUserLanguageFields.reset = "Reset"
  this.setUserLanguageFields.showingOfEntries = "Showing of entries"
  this.setUserLanguageFields.submit = "Submit"
  this.setUserLanguageFields.userManagement = "User Management"
  this.setUserLanguageFields.username = "Username"
  this.setUserLanguageFields.users = "Users"
  this.setUserLanguageFields.view = "View"
  this.setUserLanguageFields.of = "of"

  this.setUserLanguage()
  },

  setUserLanguage(){
    const languageKeys = Object.keys(this.setUserLanguageFields)
    for(var i = 0; i < languageKeys.length; i++){
      for(var j = 0; j < this.getUserLanguageFields.data.length; j++){
        if(this.setUserLanguageFields[languageKeys[i]] == this.getUserLanguageFields.data[j].keyword){
            this.setUserLanguageFields[languageKeys[i]] =  this.getUserLanguageFields.data[j].description
        }
      }
     }
    }
  },//methods

  watch: {
  'paginationFields.pageNumber': function (newValue, oldValue) {
    if(oldValue != newValue){
     this.paginationFields.pageShowingFrom = 1
     this.paginationFields.pageShowingTo = this.paginationFields.pageLimit
     this.paginationFields.pageMinus = this.paginationFields.pageShowingTo - this.paginationFields.pageShowingFrom
     this.paginationFields.pageShowingTo = this.paginationFields.pageLimit * this.paginationFields.pageNumber
      this.paginationFields.pageShowingFrom = this.paginationFields.pageShowingTo - this.paginationFields.pageMinus
      if(this.paginationFields.pageShowingTo > this.paginationFields.pageTotal){
        this.paginationFields.pageShowingTo = this.paginationFields.pageTotal
      }
      this.getUserFields.status = false
      this.getUser()
    }
  },
  'paginationFields.pageLimit': function (newValue, oldValue) {
    if(oldValue != newValue){
      this.paginationFields.pageNumber = 1
      this.paginationFields.pageShowingFrom = 1
      this.paginationFields.pageShowingTo = this.paginationFields.pageLimit
      this.paginationFields.pageMinus = this.paginationFields.pageShowingTo - this.paginationFields.pageShowingFrom
      this.paginationFields.pageShowingTo = this.paginationFields.pageLimit * this.paginationFields.pageNumber
      this.paginationFields.pageShowingFrom = this.paginationFields.pageShowingTo - this.paginationFields.pageMinus
      if(this.paginationFields.pageShowingTo > this.paginationFields.pageTotal){
        this.paginationFields.pageShowingTo = this.paginationFields.pageTotal
      }
      this.getUserFields.status = false
      this.getUser()
    }
  },

  'searchableFields.fieldsToSearch': function (newValue, oldValue) {
    if(oldValue != newValue){
      this.searchableFields.data = ''
      this.getUser()
    }
  },
  'viewLanguageCode': function (newValue, oldValue) {
    if(oldValue != newValue){
      this.getUserLanguage()
    }
  },

},
mounted(){
  this.getUser()
  this.getRolesPermission()
  this.getUserLanguage()
}
};
</script>
<style>
</style>

  