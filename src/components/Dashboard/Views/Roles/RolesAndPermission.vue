<template>
  <div class="roles-permission">
  <div class="row">
    <div class="col-md-12">
      <div class="card"  style="box-shadow:none">
          <div class="card-header">
            <div class="row">
              <div class="col-md-4">
                <h2 class="card-title">{{setRolesLanguageFields.rolesAndPermission}}</h2>
              </div>
              <div class="col-md-4"></div>
              <div class="col-md-4">
                <button class="btn btn-sm" style="float:right;margin-right: 10px;" @click="refreshData()">{{setRolesLanguageFields.refresh}}</button>
                <button class="btn btn-sm" style="float:right;margin-right: 5px;" @click="openAddRolesModal">{{setRolesLanguageFields.addRoles}}</button>
              </div>
            </div>
          </div>
          <!-- SEARCH -->
          <div class="row" style="margin-top:15px">
            <div class="card-header">
              <div class="form-group">
                  <div class="col-xs-2"> 
                    <label style="margin-top: 10px;float:right">Search By</label>
                  </div>
                  <div class="col-xs-2" >
                     <select class="form-control" @change="pageLoadingState()" v-model="searchableFields.fieldsToSearch">
                      <option value="created">date created</option>
                      <option >name</option>
                      <option >description</option>
                    </select>
                  </div>
                  <div v-if="!searchableFields.switchSelect"> 
                    <div class="col-xs-5" >
                      <div class="input-group">
                        <input type="text" class="form-control" placeholder="Please Input" autofocus="true" v-model="searchableFields.data" v-on:keyup="keyDown">
                        <span class="input-group-addon"><i class="ti-search"></i></span>
                      </div>
                    </div>
                    <div class="col-xs-3">
                      <button class="btn" @click="searchData()">{{setRolesLanguageFields.submit}}</button>
                      <button class="btn" @click="resetFields()">{{setRolesLanguageFields.reset}}</button>
                    </div>
                  </div>
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
                         <button class="btn" @click="searchableFieldsDateCombine()">{{setRolesLanguageFields.submit}}</button>
                         <button class="btn" @click="resetDateFields()">{{setRolesLanguageFields.reset}}</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr style="margin-top: 12px;">
          <!-- ROW -->
          <div style="padding:10px;margin:10px" class="table-responsive">
           <table class="table table-striped table-bordered table-hover">
            <thead class="">
              <tr> 
                <th><span @click="sortData('created')"   style="cursor:pointer">{{setRolesLanguageFields.dateCreated}}<i style="" :class="(sortableFields.icon.created) ? 'ti-angle-double-up':'ti-angle-double-down'" style="position: relative;top:2px; left: 5px;"></i></span></th>
                <th><span @click="sortData('name')"   style="cursor:pointer">{{setRolesLanguageFields.roleName}}<i style="" :class="(sortableFields.icon.name) ? 'ti-angle-double-up':'ti-angle-double-down'" style="position: relative;top:2px; left: 5px;"></i></span></th>
                <th>{{setRolesLanguageFields.description}}</th>
                <th>{{setRolesLanguageFields.action}}</th>
              </tr>
            </thead>
            <tbody  v-if="getRolesFields.status">
              <tr v-for='(items,index) in getRolesFields.data'>
                <td>
                  {{convertDate(items.Created)}}
                </td>
                <td>
                  {{items.Name}}
                </td>
                <td>
                  {{items.Description}}
                </td>
                <td>
                  <button class="btn btn-sm" @click="openEditRolesModal(items)">{{setRolesLanguageFields.edit}}</button>
                  <button class="btn btn-sm" @click="deleteRolesModal(items)">{{setRolesLanguageFields.delete}}</button>
                  <button class="btn btn-sm" @click="openSetPermissionModal(items)">{{setRolesLanguageFields.setPermission}}</button>

                </td>
              </tr>
            </tbody>
          </table>

            <div  v-if="!getRolesFields.status">
              <div class="row" style="text-align: center;">
                <i class="fa fa-spinner fa-spin" style="font-size:24px"></i>
              </div>
            </div>
           <div  v-if="getRolesFields.dataStatus">
            <div class="row" style="text-align: center;">
              <h1>NO DATA FOUND</h1>
            </div>
          </div>
      
           <!-- PAGINATION -->
          <div class="row">
            <div class="col-md-3">
             <p>Showing {{paginationFields.pageShowingFrom}} to {{paginationFields.pageShowingTo}} of {{paginationFields.pageTotal}} entries</p>        
            <p-pagination type="default" :page-count="paginationFields.pageNumberTotal" v-model="paginationFields.pageNumber"></p-pagination>
            </div>
            <div class="col-md-2"  style="float:right; margin-top:45px">
            <div class="form-group">
              <select class="form-control" @change="getCategory()" v-model="paginationFields.pageLimit">
                <option v-for="(items,index) in paginationFields.selectFields.array">{{items}}</option>
              </select>
              </div>
            </div>
          </div>
           <!-- PAGINATION -->
          </div>
        </div>   
      </div>
    </div>
    <sweet-modal  ref="setPermissionModal"  modal-theme="light" width="70%" style="margin-left:120px" blocking>
    <div class="row">
      <div class="col-md-11">
      <div class="row">
      <div class="col-md-12">
         <div>
        <div class="card">
        <div class="card-header">
          <h2 class="card-title">{{modalVariables.modalTitle}}</h2>
          <hr>
        </div>  
          <div style="padding:20px;margin:20px" class="table-responsive text-left">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Module Name</th>
                <th>Create</th>
                <th>Read</th>
                <th>Update</th>
                <th>Delete</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(items,index) in sideBarData">
                <td>
                 <i :class="items.icon"></i> {{items.name}}
                </td>
                <td>
                  <input id="items.name" type="checkbox" :value="items.name" v-model="checkBoxEditRoles.create">
                </td>
                 <td>
                  <input id="items.name" type="checkbox" :value="items.name" v-model="checkBoxEditRoles.read">
                </td>
                  <td>
                  <input id="items.name" type="checkbox" :value="items.name" v-model="checkBoxEditRoles.update">
                </td>
                <td>
                  <input id="items.name" type="checkbox" :value="items.name" v-model="checkBoxEditRoles.delete">
                </td>
                  <td>
                  <input id="items.name" type="checkbox" :value="items.name" v-model="checkBoxEditRoles.view">
                </td>
              </tr>
            </tbody>
          </table>
          </div>   
          </div> 
          <div class="card-footer text-right">
            <button class="btn btn-fill btn-wd" @click="setRolesModal()">Save</button>
          </div>
        </div>   <!--card-->
      </div>
    </div>
      </div> 
    </div>
  </sweet-modal>

  <sweet-modal  ref="addRolesModal"  modal-theme="light" width="50%" blocking>
    <div class="card" style="margin-top: 30px; box-shadow:none">
      <div class="card-header" style="text-align: left;">
          <h4 class="card-title" style="margin-bottom: 20px"> Add Roles</h4>
        <div class="form-group">
          <input id="addRolesModal" type="text" placeholder="Enter Keyword..." class="form-control" v-model="addRolesFields.name">
        </div>
      </div>
      <div class="card-content">
      <div class="form-group">
       <textarea rows="5" class="form-control border-input"
        placeholder="Enter Description" v-model="addRolesFields.description">    
        </textarea>
        </div>
      </div>
        <div class="card-footer">
        </div>
      </div>
    <div  style="float:right">
    <button class="btn btn-md btn-fill btn-primary" @click="addRolesModal()">Save</button>
    </div>
  </sweet-modal>

  <sweet-modal  ref="editRolesModal"  modal-theme="light" width="50%" blocking>
    <div class="card" style="margin-top: 30px; box-shadow:none">
      <div class="card-header" style="text-align: left;">
          <h4 class="card-title" style="margin-bottom: 20px">Edit Roles</h4>
        <div class="form-group">
          <input type="text" placeholder="Enter Keyword..." class="form-control a" v-model="editRolesFields.name" >
        </div>
      </div>
      <div class="card-content">
      <div class="form-group">
       <textarea rows="5" class="form-control border-input"
        placeholder="Enter Description" v-model="editRolesFields.description">    
        </textarea>
        </div>
      </div>
        <div class="card-footer">
        </div>
      </div>
    <div  style="float:right">
    <button class="btn btn-md btn-fill btn-primary" @click="editRolesModal()">Save</button>
    </div>
  </sweet-modal>
  </div>
</template>
<script>

import { SweetModal, SweetModalTab } from 'sweet-modal-vue'
import links from '../../../../sidebarLinks.js'
import swal from 'sweetalert2'
import axios from 'axios'
import PPagination from 'src/components/UIComponents/Pagination.vue'
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'
import Datepicker from 'vuejs-datepicker';
import {DatePicker, TimeSelect, Slider, Tag, Input, Button, Select, Option} from 'element-ui'



export default {
  components:{
  'sweet-modal':SweetModal,
  'sweet-modal-tab': SweetModalTab,
   PPagination,
  'date-picker': Datepicker,
  [DatePicker.name]: DatePicker,

  },
  props:  ['sidebarlinks'],
  data () {
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
          name:true,
          created:true,
        },
        sort:{
          field:'asc' 
        },
      },
      getRolesLanguageFields:{
        data:''
      },
      setRolesLanguageFields:{
        action:'',
        addRoles:'',
        dateCreated:'',
        delete:'',
        edit:'',
        pleaseInput:'',
        refresh:'',
        reset:'',
        description:'',
        roleName:'',
        rolesAndPermission:'',
        setPermission:'',
        showingOfEntries:'',
        submit:'',
        of:''
      },

      sideBarData:this.sidebarLinks,
      modalVariables :{
       modalTitle: '',
       modalID: '',
       modelItems : {}
      },
      addRolesFields:{
        name:'',
        description:''
      },
      deleteRolesFields:{
        id:'',
      },
      editRolesFields:{
        id:'',
        name:'',
        description:'',
        checkSameValue:{
         name:'',
         description:'',
        }
      },
      getRolesFields:{
        data:'',
        dataStatus:false,
        status:true,
      },
      checkBox:{
        selected:[],
        selectAll:false
      },
      checkBoxEditRoles:{
        create:[],
        view:[],
        read:[],
        update:[],
        delete:[], 
      },
      roles: {
        data: {}
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
  computed: {
    ...mapGetters([
      'viewLanguageCode',
     ])
  },
  methods: {


       //SORT
    sortData(items){
    this.sortableFields.fieldsToSort = items
    switch (this.sortableFields.fieldsToSort) {
      case 'name':
         if(this.sortableFields.icon.name){
            this.sortableFields.icon.name = false
            this.sortableFields.sort.field = 'desc'
            this.getRolesFields.status = false
            this.getRolesPermission()
          }else{
            this.sortableFields.icon.name = true
            this.sortableFields.sort.field = 'asc'
            this.getRolesFields.status = false
            this.getRolesPermission()
          }
          break;
      case 'created':
              if(this.sortableFields.icon.created){
              this.sortableFields.icon.created = false
              this.sortableFields.sort.field = 'desc'
              this.getRolesFields.status = false
              this.getRolesPermission()
            }else{
              this.sortableFields.icon.created = true
              this.sortableFields.sort.field = 'asc'
              this.getRolesFields.status = false
              this.getRolesPermission()
            }
          break;
      default:
          break;
      }
  },
    async setRoles(){
      if(this.checkBoxEditRoles.create.length <= 0 ){
      }else{
        for(var i = 0; i < this.checkBoxEditRoles.create.length; i++){
          if(this.checkBoxEditRoles.create[i] === "Roles And Permission"){
            this.checkBoxEditRoles.create[i] = "roles_permission"
          }else{
          var convertThisArray = this.checkBoxEditRoles.create[i].toLowerCase()
          this.checkBoxEditRoles.create[i] = convertThisArray
          }
        }
      }
      if(this.checkBoxEditRoles.read.length <= 0 ){
      }else{
        for(var i = 0; i < this.checkBoxEditRoles.read.length; i++){
          if(this.checkBoxEditRoles.read[i] === "Roles And Permission"){
            this.checkBoxEditRoles.read[i] = "roles_permission"
          }else{
          var convertThisArray = this.checkBoxEditRoles.read[i].toLowerCase()
          this.checkBoxEditRoles.read[i] = convertThisArray
          }
        }
      }
      if(this.checkBoxEditRoles.update.length <= 0 ){
      }else{
        for(var i = 0; i < this.checkBoxEditRoles.update.length; i++){
          if(this.checkBoxEditRoles.update[i] === "Roles And Permission"){
            this.checkBoxEditRoles.update[i] = "roles_permission"
          }else{
          var convertThisArray = this.checkBoxEditRoles.update[i].toLowerCase()
          this.checkBoxEditRoles.update[i] = convertThisArray
          }
        }
      }

      if(this.checkBoxEditRoles.delete.length <= 0 ){
      }else{
        for(var i = 0; i < this.checkBoxEditRoles.delete.length; i++){
          if(this.checkBoxEditRoles.delete[i] === "Roles And Permission"){
            this.checkBoxEditRoles.delete[i] = "roles_permission"
          }else{
          var convertThisArray = this.checkBoxEditRoles.delete[i].toLowerCase()
          this.checkBoxEditRoles.delete[i] = convertThisArray
          }
        }
      }

      if(this.checkBoxEditRoles.view.length <= 0 ){
      }else{
      for(var i = 0; i < this.checkBoxEditRoles.view.length; i++){
        if(this.checkBoxEditRoles.view[i] === "Roles And Permission"){
          this.checkBoxEditRoles.view[i] = "roles_permission"
        }else{
        var convertThisArray = this.checkBoxEditRoles.view[i].toLowerCase()
        this.checkBoxEditRoles.view[i] = convertThisArray
        }
       }
      }
      const data = {
      "query":"mutation($input:PermissionFields,$RoleID:String!) { UpdateRolePermission( input:$input,RoleID:$RoleID ) { success,message { path,message } } }",
    "variables":{
            "RoleID":this.modalVariables.modalID,
            "input":{
              "read":this.checkBoxEditRoles.read,
              "delete":this.checkBoxEditRoles.delete,
              "update":this.checkBoxEditRoles.update,
              "view":this.checkBoxEditRoles.view,
              "create":this.checkBoxEditRoles.create,
            }
          }
      }
     return await axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
      // console.log("setRoles: ",response)
      console.log(response.data.UpdateRolePermission.success)
      if(!response.data.UpdateRolePermission.success){
        return true
      }else{
        return false
      }

      }).catch((err) => {
         console.log(err);
        });
    },

    async editRoles(){
      const editRolesCompare = (data) => {
        if(data === "name"){
          if(this.editRolesFields.name === this.editRolesFields.checkSameValue.name){
           return true;  
          }  
        }
        if(data === "description"){
          if(this.editRolesFields.description === this.editRolesFields.checkSameValue.description){
           return true;  
          }  
        }
      }
      let data = {
    "query":"mutation($input:roleFields,$RoleID:String!) { UpdateRole( input:$input,RoleID:$RoleID ) { success,message { path,message } } }",
    "variables":{
        "RoleID":this.editRolesFields.id,
        "input":{
          "name":this.editRolesFields.name,
          "description":this.editRolesFields.description
        }
      }
    }
    if(editRolesCompare("name")){
      delete data.variables.input.name
    }

    if(editRolesCompare("description")){
      delete data.variables.input.description
    }
    return await axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
      // console.log("editRoles: ",response)
      if(!response.data.UpdateRole.success ){
        return true
      }else{
        return false
      }
      }).catch((err) => {
       console.log(err);
      });
    },

    async deleteRoles(){
    const data = {
    "query":"mutation($input:[String!]!) { DeleteRole ( input:$input ) { success,message { path,message } } }",
    "variables":{
        "input": this.deleteRolesFields.id
      }
    } 
      return await axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
      // console.log("deleteRoles: ",response)
      if(!response.data.DeleteRole.success){
        return true
      }else{
        return false
      }
      }).catch((err) => {
       console.log(err);
      });

    },
    async addRoles(){
      const data = {
        "query":"mutation($input:roleFields!) { NewRole( input:$input ) { success,message{ path,message } } }",
        "variables":{
          "input":{
            "name":this.addRolesFields.name,
            "description":this.addRolesFields.description
          }
        }
      }
      return await axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
      // console.log("addRoles: ",response)
      if(!response.data.NewRole.success){
        return true
      }else{
        return false
      }
      }).catch((err) => {
       console.log(err);
      });
    },

    async getRolesPermission(){
      const data = {
       "query":"query($limit:Limit,$sort:sort,$search:search){ roles(limit:$limit,sort:$sort,search:$search) { data{ RoleID,Name,Description,Read,Update,Create,Delete,View,Created },page { items,pageNo,totalPages } ,sortableFields,searchableFields,success,message{path,message} } }",
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
      console.log("getRolesPermission: ", response)
      this.getRolesFields.data = response.data.roles.data
      this.paginationFields.pageTotal = response.data.roles.page.items
      this.getRolesFields.status = true
      this.setPagination()
      this.setPaginationSelect()

      if(this.getRolesFields.data.length == 0){
        this.getRolesFields.dataStatus = true
      }else{
        this.getRolesFields.dataStatus = false

      }
      if(!response.data.roles.success){
        return true
      }else{
        return false
      }
      }).catch((err) => {
       console.log(err);
      });
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
    this.sortableFields.icon.name = true
    this.sortableFields.icon.created = true
    this.sortableFields.sort.field = 'asc'
    this.getRolesFields.status = false
    this.getRolesPermission()
  },


  //SEARCH
  pageLoadingState(){
    if(this.searchableFields.fieldsToSearch == 'created'){
      this.searchableFields.switchSelect = true
    }else{
      this.searchableFields.switchSelect = false
    }
  },

  searchData(){
  this.getRolesFields.status = false
  this.getRolesPermission()  
  },

  searchableFieldsDateCombine(){
  var dateCombine = this.convertDate(this.searchableFields.datePicker.from) +" 00:00:00"+ "_" + this.convertDate(this.searchableFields.datePicker.to) +" 23:59:59"
  this.searchableFields.data = dateCombine
  // console.log("date combine: ",dateCombine)
  this.getRolesFields.status = false
  this.getRolesPermission()
  },

  keyDown(event){
    if(event.getRolesFields == 'Enter'){
      this.getUserFields.status = false
      this.getRolesPermission()
    }
  },

  //CONVERTER
  convertDate(date_var){
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
    return month + "/"+ day + "/"+ year;
  },

  //OPEN MODAL
  openAddRolesModal(){
    this.$refs.addRolesModal.open()
  },

  openEditRolesModal(items){
    this.editRolesFields.id = items.RoleID
    this.editRolesFields.name = items.Name
    this.editRolesFields.description = items.Description

    this.editRolesFields.checkSameValue.name = items.Name
    this.editRolesFields.checkSameValue.description = items.Description

    this.$refs.editRolesModal.open()
  },

  openSetPermissionModal(items){
  this.$refs.setPermissionModal.open()
  this.modalVariables.modalTitle = items.Name
  this.modalVariables.modalID = items.RoleID
  this.modalVariables.modalItems = items
  this.checkBoxEditRoles.create = []
  this.checkBoxEditRoles.read = []
  this.checkBoxEditRoles.update = []
  this.checkBoxEditRoles.delete = []
  this.checkBoxEditRoles.view = []
  this.pushThisItemsInsideModal(items)
  },


  //MODAL
  setRolesModal (type) {
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
    if(await this.setRoles()){
       swal({
          title: 'Error',
          type: 'warning',
          confirmButtonClass: 'btn btn-success btn-fill',
          buttonsStyling: false
        })
    }else{
      if(await this.getRolesPermission()) {
         swal({
          title: 'Error',
          type: 'warning',
          confirmButtonClass: 'btn btn-success btn-fill',
          buttonsStyling: false
        })
      }else{
         this.getUpdatedItemsInPermission()
         this.pushThisItemsInsideModal(this.modalVariables.modalItems)       
     }
    swal({
      title: 'Sucess',
      type: 'success',
      confirmButtonClass: 'btn btn-success btn-fill',
      buttonsStyling: false
    });
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
  async addRolesModal() {
    if(this.checkAddRolesValidation()){
       if(await this.addRoles()){
    swal({
      title: 'Error',
      type: 'warning',
      confirmButtonClass: 'btn btn-success btn-fill',
      buttonsStyling: false
    })
  }else{
    swal({
      title: 'Success!',
      type: 'success',
      confirmButtonClass: 'btn btn-success btn-fill',
      buttonsStyling: false
      }).then(() => {
        this.addRolesFields.name = ''
        this.addRolesFields.description = ''
       this.getRolesPermission()
        this.$refs.addRolesModal.close()
      })
    }
    }else{
      swal({
      title: 'Empty Field',
      type: 'warning',
      confirmButtonClass: 'btn btn-success btn-fill',
      buttonsStyling: false
    })
  }



  }, 

  async editRolesModal(){
  if(this.checkEditRolesValidation()){
      if(await this.editRoles()){
          swal({
          title: 'Error',
          type: 'warning',
          confirmButtonClass: 'btn btn-success btn-fill',
          buttonsStyling: false
        })
        }else{
        swal({
          title: 'Success',
          type: 'success',
          confirmButtonClass: 'btn btn-success btn-fill',
          buttonsStyling: false 
          }).then(()=>{
          this.getRolesPermission()
          this.$refs.editRolesModal.close()
          })
        }
      // console.log('true')
  }else{
    swal({
    title: 'Empty Field',
    type: 'warning',
    confirmButtonClass: 'btn btn-success btn-fill',
    buttonsStyling: false
    })
  }

  },


    deleteRolesModal (items) {
    this.deleteRolesFields.id = items.RoleID
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
        if(await this.deleteRoles()){
          swal({
            title: 'Error',
            type: 'warning',
            confirmButtonClass: 'btn btn-success btn-fill',
            buttonsStyling: false
          })
        }else{
          swal({
            title: 'Success',
            type: 'success',
            confirmButtonClass: 'btn btn-success btn-fill',
            buttonsStyling: false
          }).then(() => {
            this.getRolesPermission()
          });
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


  //VALIDATION 
  checkAddRolesValidation(){
  if(this.isEmptyOrSpaces(this.addRolesFields.name)){
      // console.log("return from name")
      return false
    }else if(this.isEmptyOrSpaces(this.addRolesFields.description)){
      // console.log("return from description")
      return false
    }
    else{
      return true
    }
  },


  checkEditRolesValidation(){
  if(this.isEmptyOrSpaces(this.editRolesFields.name)){
      // console.log("return from name")
      return false
    }else if(this.isEmptyOrSpaces(this.editRolesFields.description)){
      // console.log("return from description")
      return false
    }
    else{
      return true
    }
  },


  isEmptyOrSpaces(str){
  console.log(str)
  var pattern =/^ *$/
  //return false for true
  return pattern.test(str);  
  }, 


  //RANDOM
  pushThisItemsInsideModal(items){
    if(items.Create.length <= 0){
    }else{
      for(var i = 0; i < items.Create.length; i++){
        if(items.Create[i] == "roles_permission"){
          this.checkBoxEditRoles.create.push("Roles And Permission")
        }else{
          var filterFirstLetters = items.Create[i].substring(0, 1);
          var filterRemainingLetters = items.Create[i].substring(1)
          var makeFirstLetterUpper = filterFirstLetters.toUpperCase()
          var finalWord = makeFirstLetterUpper + filterRemainingLetters
          this.checkBoxEditRoles.create.push(finalWord) 
        }
      }
    }

    if(items.Read.length <= 0){
    }else{
      for(var i = 0; i < items.Read.length; i++){
        if(items.Read[i] == "roles_permission"){
          this.checkBoxEditRoles.read.push("Roles And Permission")
        }else{
          var filterFirstLetters = items.Read[i].substring(0, 1);
          var filterRemainingLetters = items.Read[i].substring(1)
          var makeFirstLetterUpper = filterFirstLetters.toUpperCase()
          var finalWord = makeFirstLetterUpper + filterRemainingLetters
          this.checkBoxEditRoles.read.push(finalWord) 
        }
      }
    }

    if(items.Update.length <= 0){

    }else{
      for(var i = 0; i < items.Update.length; i++){
        if(items.Update[i] == "roles_permission"){
          this.checkBoxEditRoles.update.push("Roles And Permission")
        }else{
          var filterFirstLetters = items.Update[i].substring(0, 1);
          var filterRemainingLetters = items.Update[i].substring(1)
          var makeFirstLetterUpper = filterFirstLetters.toUpperCase()
          var finalWord = makeFirstLetterUpper + filterRemainingLetters
          this.checkBoxEditRoles.update.push(finalWord) 
        }
      }
    }

    if(items.Delete.length <= 0){

    }else{
      for(var i = 0; i < items.Delete.length; i++){
        if(items.Delete[i] == "roles_permission"){
          this.checkBoxEditRoles.delete.push("Roles And Permission")
        }else{
          var filterFirstLetters = items.Delete[i].substring(0, 1);
          var filterRemainingLetters = items.Delete[i].substring(1)
          var makeFirstLetterUpper = filterFirstLetters.toUpperCase()
          var finalWord = makeFirstLetterUpper + filterRemainingLetters
          this.checkBoxEditRoles.delete.push(finalWord) 
        }
      }
    }

    if(items.View.length <= 0){

    }else{
      for(var i = 0; i < items.View.length; i++){
        if(items.View[i] == "roles_permission"){
        }else{
          var filterFirstLetters = items.View[i].substring(0, 1);
          var filterRemainingLetters = items.View[i].substring(1)
          var makeFirstLetterUpper = filterFirstLetters.toUpperCase()
          var finalWord = makeFirstLetterUpper + filterRemainingLetters

          this.checkBoxEditRoles.view.push(finalWord) 
        }
      }
    }//view 
  },
  getUpdatedItemsInPermission(){
    // console.log("this old id: ", this.modalVariables.modalID)
    for(var i = 0; i < this.getRolesFields.data .length; i++){
        if(this.modalVariables.modalID == this.getRolesFields.data [i].RoleID){
          this.modalVariables.modalItems = this.getRolesFields.data [i]
        }
    }
  },

  setThisNavObject(props){
   this.sideBarData =  props
  },
  selectAllCheckBox(){
     this.checkBox.selected = []
      if(!this.checkBox.selectAll){
        for(let i in this.getRolesFields.data ){
          this.checkBox.selected.push(this.getRolesFields.data[i].RoleID)
        }
      }
    },
//LANGUAGE

  getRolesLanguage(){
    const data = {
        "query":"query($input:view_languages_fields,$limit:Limit,$sort:sort,$search:search){view_languages(input:$input,limit:$limit,sort:$sort,search:$search){ data { id,keyword,description,date }, success,message, { path,message }, page { items,pageNo,totalPages } sortableFields,searchableFields } }",
        "variables":{
            "input":{
                "code":this.viewLanguageCode,
                "set_name":"roles and permission module"
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
    // console.log("getRolesLanguage: ",response)
    this.getRolesLanguageFields.data = response.data.view_languages.data
    this.setDefaultLanguage()
    }).catch((err) => {

    }); 

  },

  setDefaultLanguage(){
      this.setRolesLanguageFields.action ="Action"
      this.setRolesLanguageFields.addRoles ="Add Roles"
      this.setRolesLanguageFields.dateCreated ="Date Created"
      this.setRolesLanguageFields.delete ="Delete"
      this.setRolesLanguageFields.description ="Description"
      this.setRolesLanguageFields.edit ="Edit"
      this.setRolesLanguageFields.pleaseInput ="  Please Input"
      this.setRolesLanguageFields.refresh ="Refresh"
      this.setRolesLanguageFields.reset ="Reset"
      this.setRolesLanguageFields.roleName ="Role Name"
      this.setRolesLanguageFields.rolesAndPermission ="Roles And Permission"
      this.setRolesLanguageFields.setPermission ="Set Permission"
      this.setRolesLanguageFields.showingOfEntries ="Showing of Entries"
      this.setRolesLanguageFields.submit ="Submit"
      this.setRolesLanguageFields.of ="of"

      this.setRolesLanguage() 
  },


setRolesLanguage(){
 const languageKeys = Object.keys(this.setRolesLanguageFields)
 for(var i = 0; i < languageKeys.length; i++){
    for(var j = 0; j < this.getRolesLanguageFields.data.length; j++){
      if(this.setRolesLanguageFields[languageKeys[i]] == this.getRolesLanguageFields.data[j].keyword){
          this.setRolesLanguageFields[languageKeys[i]] =  this.getRolesLanguageFields.data[j].description
      }
    }
  }
}

  },

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
        this.getRolesFields.status = false
        this.getRolesPermission()
      }
   },
   'paginationFields.pageLimit': function (newValue, oldValue) {
      // console.log("to: ",this.paginationFields.pageShowingTo)
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
        this.getRolesFields.status = false
        this.getRolesPermission()
    }
   },
   'searchableFields.fieldsToSearch': function (newValue, oldValue) {
    if(oldValue != newValue){
      this.searchableFields.data = ''
      this.getRolesPermission()
    }
  },
    'viewLanguageCode': function (newValue, oldValue) {
      if(oldValue != newValue){
        this.getRolesLanguage()
      }
     },
   },
  mounted(){
    this.getRolesPermission();
    this.setThisNavObject(JSON.parse(JSON.stringify(links)))
    this.getRolesLanguage()
  }
};
</script>
<style>
</style>
