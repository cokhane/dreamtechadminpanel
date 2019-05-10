<template>
  <div class="languages">
    <!-- ROW -->
    <div class="row">
      <!-- CARD -->
      <div class="card">
        <!-- TITLE | NAV -->
        <div class="card-header">
          <div class="row">
            <div class="col-md-4">
              <h2 class="card-title">{{setLanguageFields.languageFolder}}</h2></div>
            <div class="col-md-4"></div>
            <div class="col-md-4">
              <button class="btn btn-sm" style="float:right;margin-right: 10px;" @click="refreshData()">{{setLanguageFields.refresh}}</button>
              <button class="btn btn-sm" style="float:right;margin-right: 5px;" @click="openAddFolderModal()">{{setLanguageFields.addFolder}}</button>
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
              <div class="col-md-2" >
                 <select class="form-control" @change="pageLoadingState()" v-model="searchableFields.fieldsToSearch">
                  <option >name</option>
                </select>
              </div>
              <!-- SEARCH SELECT -->

              <!-- SEARCH INPUT -->
              <div v-if="searchableFields.switchSelect"> 
                <div class="col-md-5" >
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="Please Input" autofocus="true" v-model="searchableFields.data" v-on:keyup="keyDown">
                    <span class="input-group-addon"><i class="ti-search"></i></span>
                  </div>
                </div>
                <div class="col-md-3">
                  <button class="btn" @click="searchData()">{{setLanguageFields.submit}}</button>
                  <button class="btn" @click="resetFields()">{{setLanguageFields.reset}}</button>
                </div>
              </div>
              <!-- SEARCH INPUT -->

              <!-- SEARCH DATE -->
              <div v-if="!searchableFields.switchSelect">
                <div class="col-md-6">
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
                       <button class="btn" @click="searchableFieldsDateCombine()">{{setLanguageFields.submit}}</button>
                       <button class="btn" @click="resetDateFields()">{{setLanguageFields.reset}}</button>
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
                <th>Date Created</th>
                <th>Folder Name</th>
                <th>{{setLanguageFields.action}}</th>
              </tr>
            </thead>
            <!-- SORT TABLE -->

            <!-- TABLE BODY -->
            <tbody>
              <tr v-for="(items,index) in getFolderFields.data" v-if="getFolderFields.status">
                <td>
                  NO DATA
                </td>
                <td>
                  {{items}}
                </td>
                <td>
                <router-link :to="{ name: 'Keyword Page', params: { setname: items }}">
                  <button class="btn btn-sm" >{{setLanguageFields.view}}</button>
                </router-link>
                  <button class="btn btn-sm" @click="openEditFolderModal(items)">{{setLanguageFields.edit}}</button>
                  <button class="btn btn-sm" @click="deleteFolderModal(items)">{{setLanguageFields.delete}}</button>
                </td>
              </tr>
            </tbody>
            <!-- TABLE BODY -->
          </table>
            <!-- LOADER  -->
            <div  v-if="!getFolderFields.status">
              <div class="row" style="text-align: center;">
                <i class="fa fa-spinner fa-spin" style="font-size:24px"></i>
              </div>
            </div>
            <!-- LOADER  -->

            <!-- NO DATA -->
            <div  v-if="getFolderFields.dataStatus">
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
                  <select class="form-control" @change="getFolder()" v-model="paginationFields.pageLimit">
                    <option v-for="(items,index) in paginationFields.selectFields.array">{{items}}</option>
                  </select>
                </div>
              </div>
            </div>
        
          <!-- PAGINATION -->
        </div>   
      </div> 
      <!-- CARD -->
    </div>
    <!-- ROW -->
    <sweet-modal  ref="addFolderModal"  modal-theme="light" >
      <div class="card" style="box-shadow:none">
        <div class="card-header" style="text-align: left;">
          <h4 class="card-title" style="margin-bottom: 20px">Add Folder</h4>
          <div class="form-group">
            <input id="addFolderModal" type="text" placeholder="Enter Keyword..." class="form-control" v-model="addFolderFields.name">
          </div>
         </div>
        </div>
        <div  style="float:right">
       <button class="btn btn-md btn-fill btn-primary" @click="addFolderModal()">Save</button>
      </div>
    </sweet-modal>
    <sweet-modal  ref="editFolderModal"  modal-theme="light"  hide-close-button>
      <div class="card" style="box-shadow:none">
        <div class="card-header" style="text-align: left;">
          <h4 class="card-title" style="margin-bottom: 20px">Edit Folder Name</h4>
          <div class="form-group">
            <input type="text" placeholder="Enter Keyword..." class="form-control"   v-model="editFolderFields.name">
          </div>
         </div>
        </div>
        <div  style="float:right">
       <button class="btn btn-md btn-fill btn-primary" @click="editFolderModal()">Save</button>
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
  /*  
       />____
[#####[]____ COMPONENTS
       \>                     
  */
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
      fieldsToSearch:'name',
      data:'',
      switchSelect:true,
      datePicker:{
        to: new Date(),
        from: new Date()
      }
    },
    sortableFields:{
        fieldsToSort: 'name', 
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
    getLanguageFields:{
      data: '',
    },
    setLanguageFields:{
      action:'',
      addFolder:'',
      delete:'',
      edit:'',
      languageFolder:'',
      languages:'',
      pleaseInput:'',
      refresh:'',
      reset:'',
      showingOfEntries:'',
      submit:'',
      userId:'',
      view:'',
      of:''
    },
    getFolderFields:{
      data:'',
      status:false,
      dataStatus: false
    },
    deleteFolderFields:{
      name:''
    },
    addFolderFields:{
      name:''
    },
    editFolderFields:{
      name:''
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
  getFolder(){
    console.log(this.paginationFields.pageLimit)
    console.log(this.paginationFields.pageNumber)
    const data ={  
    "query":"query($limit:Limit,$sort:sort,$search:search){view_language_sets(limit:$limit,sort:$sort,search:$search){ data,success,message{path,message},page { items,pageNo,totalPages }, sortableFields,searchableFields } }",
    "variables":{
        "limit":{
          "to":this.paginationFields.pageLimit, 
          "page":this.paginationFields.pageNumber
        },
        "sort":{
          "field":"name",
          "by":"desc"
        },
        "search":{
          "by":"",
          "text":""
        }
      }
    }
    axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
    console.log("getFolder: ",response)
    this.getFolderFields.data = response.data.view_language_sets.data
    this.paginationFields.pageTotal = response.data.view_language_sets.page.items
    this.getFolderFields.dataStatus = (this.getFolderFields.data.length === 0)? true:false
    this.getFolderFields.status = true
    this.setPagination()
    this.setPaginationSelect()
    }).catch((err) => {
    });
  },
  async addFolder(){
    const data = {
    "query":"mutation($set_name:String!){save_language_set_name(set_name:$set_name){success,message{path,message}}}",
      "variables":{
        "set_name":this.addFolderFields.name
      }
    }
    return await axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
    // console.log("addFolder: ",response)
    if(!response.data.save_language_set_name.success){
      return true;
    }else{
      return false;
    }
    }).catch((err) => {
      //
    });
  },

  async deleteFolder(){
    const data = {  
    "query":"mutation($set_name:String!){delete_language_set_name(set_name:$set_name){success,message{path,message}}}",
      "variables":{
        "set_name": this.deleteFolderFields.name
      }
    }
    return await axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
    // console.log("deleteFolder: ",response)
    if(response.data.delete_language_set_name.success){
      return true
    }else{
      return false
    }
    }).catch((err) => {
      //
    });
  },
  async editFolder(){
    const data = {  
      "query":"mutation($setname_old:String!,$setname_new:String!){update_language_set_name(setname_old:$setname_old,setname_new:$setname_new){success,message{path,message}}}",
      "variables":{
        "setname_old":this.addFolderFields.name,
        "setname_new":this.editFolderFields.name
      }
    }
    return await axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
    console.log("editFolder: ",response)
    if(!response.data.update_language_set_name.success){
      return true
    }else{
      return false
    }
    }).catch((err) => {
    //
    });
  },
  //MODAL
  async deleteFolderModal(items) {
    this.deleteFolderFields.name = items
    swal({
      title: 'Are you sure?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      confirmButtonClass: 'btn btn-success btn-fill',
      cancelButtonClass: 'btn btn-danger btn-fill',
      buttonsStyling: false
    }).then(async() => {
      if(await this.deleteFolder()){
        swal({
          title: 'Success!',
          type: 'success',
          confirmButtonClass: 'btn btn-success btn-fill',
          buttonsStyling: false
        }).then(()=>{
          this.getFolderFields.status = false
          this.getFolder()
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

  async addFolderModal() { 
    if(this.addFolderFields.name === ''){
    swal({
      type: 'warning',
      html: 'Error',
      confirmButtonClass: 'btn btn-success btn-fill',
      buttonsStyling: false,
    });
    }else{
      if(await this.addFolder()){
        swal({
          type: 'warning',
          html: 'Error',
          confirmButtonClass: 'btn btn-success btn-fill',
          buttonsStyling: false,
        });
      }else{
        swal({
          type: 'success',
          html: 'Success',
          confirmButtonClass: 'btn btn-success btn-fill',
          buttonsStyling: false,
        }).then(()=>{
          this.addFolderFields.name = ''
          this.getFolderFields.status = false
          this.getFolder()
          this.$refs.addFolderModal.close()
        },()=>{
          this.addFolderFields.name = ''
          this.getFolderFields.status = false
          this.getFolder()
          this.$refs.addFolderModal.close()
        });
     
      }
    }
  },

  async editFolderModal () { 
    if(this.addFolderFields.name == this.editFolderFields.name){
      swal({
        type: 'warning',
        html: 'Error',
        confirmButtonClass: 'btn btn-success btn-fill',
        buttonsStyling: false,
      })
    }else if(this.editFolderFields.name == ''){
      swal({
        type: 'warning',
        html: 'Error',
        confirmButtonClass: 'btn btn-success btn-fill',
        buttonsStyling: false,
      })
    }else{
      if(await this.editFolder()){
      swal({
        type: 'warning',
        html: 'Error',
        confirmButtonClass: 'btn btn-success btn-fill',
        buttonsStyling: false,
      })
    }else{
      swal({
          type: 'success',
          html: 'Success',
          confirmButtonClass: 'btn btn-success btn-fill',
          buttonsStyling: false,
        }).then(()=>{
          this.$refs.editFolderModal.close()
          this.getFolder()
        },()=>{
          this.$refs.editFolderModal.close()
          this.getFolder()
        })
      }
    }
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
  //SEARCH
  pageLoadingState(){
    if(this.searchableFields.fieldsToSearch == 'created'){
      this.searchableFields.switchSelect = true
    }else{
      this.searchableFields.switchSelect = false
    }
  },
  searchData(){
  this.getFolderFields.status = false
  this.getFolder()  
  },
  searchableFieldsDateCombine(){
  var dateCombine = this.convertDate(this.searchableFields.datePicker.from) +" 00:00:00"+ "_" + this.convertDate(this.searchableFields.datePicker.to) +" 23:59:59"
  this.searchableFields.data = dateCombine
  // console.log("date combine: ",dateCombine)
  this.getFolderFields.status = false
  this.getFolder()
  },
  keyDown(event){
    if(event.getFolderFields == 'Enter'){
      this.getUserFields.status = false
      this.getFolder()
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
    this.getFolderFields.status = false
    this.getFolder()
  },

  

  getLanguage(){
      const data = {
         "query":"query($input:view_languages_fields,$limit:Limit,$sort:sort,$search:search){view_languages(input:$input,limit:$limit,sort:$sort,search:$search){ data { id,keyword,description,date }, success,message, { path,message }, page { items,pageNo,totalPages } sortableFields,searchableFields } }",
      "variables":{
          "input":{
              "code":this.viewLanguageCode,
              "set_name":"languages module"
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

    this.getLanguageFields.data = response.data.view_languages.data

    this.setDefaultLanguage()

    }).catch((err) => {

    }); 
  },

  setDefaultLanguage(){
    this.setLanguageFields.action = "Action"
    this.setLanguageFields.addFolder = "Add Folder"
    this.setLanguageFields.delete = "Delete"
    this.setLanguageFields.edit = "Edit"
    this.setLanguageFields.languageFolder = "Language Folder"
    this.setLanguageFields.languages = "Languages"
    this.setLanguageFields.pleaseInput = "Please Input"
    this.setLanguageFields.refresh = "Refresh"
    this.setLanguageFields.reset = "Reset"
    this.setLanguageFields.showingOfEntries = "Showing of entries"
    this.setLanguageFields.userId = "User ID"
    this.setLanguageFields.submit = "Submit"
    this.setLanguageFields.view = "View"
    this.setLanguageFields.of = "of"

    this.setLanguage()
  },

  setLanguage(){
   const languageKeys = Object.keys(this.setLanguageFields)
    for(var i = 0; i < languageKeys.length; i++){
        for(var j = 0; j < this.getLanguageFields.data.length; j++){
          if(this.setLanguageFields[languageKeys[i]] == this.getLanguageFields.data[j].keyword){
            this.setLanguageFields[languageKeys[i]] =  this.getLanguageFields.data[j].description
          }
        }
      }
    },

  //OPEN MODAL
  openAddFolderModal(){
    this.$refs.addFolderModal.open()

  },

  openEditFolderModal(items){
    this.addFolderFields.name = items
    this.editFolderFields.name = items
    this.$refs.editFolderModal.open()
  },

},
/*  
      />____
[#####[]____ METHODS
      \>                     
*/
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
      this.getFolderFields.status = false
      this.getFolder()
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
      this.getFolderFields.status = false
      this.getFolder()
  }
 },
 'searchableFields.fieldsToSearch': function (newValue, oldValue) {
  if(oldValue != newValue){
    this.searchableFields.data = ''
    this.getFolder()
  }
},
'viewLanguageCode': function (newValue, oldValue) {
  if(oldValue != newValue){
    this.getLanguage()
  }
 },
},
/*  
      />____
[#####[]____ WATCHER
      \>                     
*/
mounted(){
this.getFolder()
this.getLanguage()
},

/*  
      />____
[#####[]____ MOUNTED
      \>                     
*/
};
</script>
<style>
.h4Move{
transition: all .2s ease-in-out;
cursor:pointer;
}
.h4Move:hover { 
transform: scale(.98);
color:red;
}
.select-stlye{

}
</style>
