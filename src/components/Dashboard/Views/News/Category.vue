<template>
  <div class="edit-news">
    <div class="card">
     <ul class="nav nav-tabs">
        <li >
         <router-link to="/news/management" >{{setCategoryLanguageFields.newsManagement}}</router-link>
        </li>
        <li  class="active">
          <router-link to="/news/category" > {{setCategoryLanguageFields.newsCategories}}</router-link>
        </li>
      </ul>
    <div class="tab-content">
    <div class="row">
      <div class="col-md-12">
        <div class="card"  style="box-shadow:none">
         <div class="card-header">
          <div class="row">
            <div class="col-md-4">
               <h2 class="card-title">{{setCategoryLanguageFields.newsCategories}}</h2>
            </div>
            <div class="col-md-4">
            </div>
            <div class="col-md-4">
              <button class="btn btn-sm" style="float:right;margin-right: 10px;" @click="refreshData()">{{setCategoryLanguageFields.refresh}}</button>
              <button class="btn btn-sm" style="float:right;margin-right: 5px;" @click="openAddCategoryModal()">{{setCategoryLanguageFields.addCategories}}</button>
            </div>
          </div>
          <!-- ROW -->
          </div>
          <!-- SEARCH -->
          <div class="row" style="margin-top:15px">
                <div class="card-header">
                  <div class="form-group">
                      <div class="col-xs-2"> 
                            <label style="margin-top: 10px;float:right">Search By</label>
                        <div>
                         </div>
                      </div>
                      <div class="col-md-2" >
                         <select class="form-control" @change="pageLoadingState()" v-model="searchableFields.fieldsToSearch">
                          <option value="created">date created</option>
                          <option >name</option>
                        </select>
                      </div>

                      <div v-if="!searchableFields.switchSelect"> 
                       <div class="col-md-5" >
                        <div class="input-group">
                           <input type="text" class="form-control" placeholder="Please Input" autofocus="true" v-model="searchableFields.data" v-on:keyup="keyDown">
                           <span class="input-group-addon"><i class="ti-search"></i></span>
                        </div>
                      </div>
                      <div class="col-md-3">
                         <button class="btn" @click="searchData()">{{setCategoryLanguageFields.submit}}</button>
                          <button class="btn" @click="resetFields()">{{setCategoryLanguageFields.reset}}</button>
                      </div>
                      </div>

                      <div v-if="searchableFields.switchSelect">
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
                             <button class="btn" @click="searchableFieldsDateCombine()">{{setCategoryLanguageFields.submit}}</button>
                             <button class="btn" @click="resetDateFields()">{{setCategoryLanguageFields.reset}}</button>
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
          <div style="padding:10px;margin:10px; margin-left:10px:width:100%" class="table-responsive">
           <table class="table table-striped table-bordered table-hover">
            <thead class="">
              <tr >
                <th><span @click="sortData('created')"   style="cursor:pointer">{{setCategoryLanguageFields.dateCreated}}<i style="" :class="(sortableFields.icon.created) ? 'ti-angle-double-up':'ti-angle-double-down'" style="position: relative;top:2px; left: 5px;"></i></span></th>
                 <th><span @click="sortData('name')"   style="cursor:pointer">{{setCategoryLanguageFields.categoryName}}<i style="" :class="(sortableFields.icon.name) ? 'ti-angle-double-up':'ti-angle-double-down'" style="position: relative;top:2px; left: 5px;"></i></span></th>
                <th>{{setCategoryLanguageFields.categoryDescription}}</th>
               <th style="width: 30%;" >{{setCategoryLanguageFields.action}}</th>
              </tr>
            </thead>
            <tbody v-if="getCategoryFields.status">
              <tr v-for="(items,index) in getCategoryFields.data">
                <td>
                  {{convertDate(items.created)}}
                </td>
                <td>
                  {{items.name}}
                </td>
                <td>
                  {{items.description}}
                </td>
                <td>
                  <button class="btn btn-sm" @click="openPreviewCategoryModal(items)">{{setCategoryLanguageFields.view }}</button>
                  <button class="btn btn-sm" @click="openEditCategoryModal(items)">{{setCategoryLanguageFields.edit }}</button>
                  <button class="btn btn-sm" @click="deleteCategoryModal(items)">{{setCategoryLanguageFields.delete}}</button>
                </td>
              </tr>
            </tbody>
          </table>

            <div  v-if="!getCategoryFields.status">
              <div class="row" style="text-align: center;">
                <i class="fa fa-spinner fa-spin" style="font-size:24px"></i>
              </div>
            </div>
           <div  v-if="getCategoryFields.dataStatus">
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
     </div>
    </div>


   <sweet-modal  ref="addCategoryModal"  modal-theme="light" width="50%" blocking>
    <div class="card" style="margin-top: 30px; box-shadow:none">
      <div class="card-header" style="text-align: left;">
          <h4 class="card-title" style="margin-bottom: 20px">Add Category</h4>
        <div class="form-group">
          <input id="addRolesModal" type="text" placeholder="Enter Keyword..." class="form-control" v-model="addCategoryFields.name" autofocus required="">
        </div>
      </div>
      <div class="card-content">
      <div class="form-group">
       <textarea rows="5" class="form-control border-input"
        placeholder="Enter Description" v-model="addCategoryFields.description">    
        </textarea>
        </div>
      </div>
        <div class="card-footer">
        </div>
      </div>
    <div  style="float:right">
    <button class="btn btn-md btn-fill btn-primary" @click="addCategoryModal()">Save</button>
    </div>
  </sweet-modal>


   <sweet-modal  ref="editCategoryModal"  modal-theme="light" width="50%" blocking>
    <div class="card" style="margin-top: 30px; box-shadow:none">
      <div class="card-header" style="text-align: left;">
          <h4 class="card-title" style="margin-bottom: 20px"> Edit Category</h4>
        <div class="form-group">
          <input  type="text" placeholder="Enter Keyword..." class="form-control" v-model="editCategoryFields.name" autofocus required="">
        </div>
      </div>
      <div class="card-content">
      <div class="form-group">
       <textarea rows="5" class="form-control border-input"
        placeholder="Enter Description" v-model="editCategoryFields.description">    
        </textarea>
        </div>
      </div>
        <div class="card-footer">
        </div>
      </div>
    <div  style="float:right">
    <button class="btn btn-md btn-fill btn-primary" @click="editCategoryModal()">Save</button>
    </div>
  </sweet-modal>

  <sweet-modal  ref="previewCategoryModal"  modal-theme="light" width="50%" blocking>
    <div class="card"  style="box-shadow:none">
      <div class="card-headear"> 
        <title> 
          <h4>Preview Category Child</h4> 
        </title>
      </div>
      <div class="card-content">
        <div>
          <h2> 
             {{previewCategoryFields.name}}
          </h2>
        </div>
        <hr>
        <div>
          <div v-for="(items,index) in previewCategoryFields.array" v-if="previewCategoryFields.status">
            <div style="border:1px solid black;padding:5px;margin-bottom:5px"> 
              <div>
                <span> <strong> Author:</strong>  </span> {{items.author}}
              </div>
              <div >
               <strong> Title:</strong> {{items.author}}
                {{items.title}}
              </div>
            </div>
          </div>
          <div v-if="!previewCategoryFields.status">
             <strong> NO CHILD UNDER THIS CATEGORY</strong>
          </div>
        </div>

      </div>
    </div>
  </sweet-modal>


  </div>
</template>
<script>
import { VueEditor } from 'vue2-editor'
import {DatePicker, TimeSelect, Slider, Tag, Input, Button, Select, Option} from 'element-ui'
import {mapFields} from 'vee-validate'
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'

Vue.use(VueTabs)

import VueBase64FileUpload from 'vue-base64-file-upload';
import Datepicker from 'vuejs-datepicker';
import axios from 'axios';
import VueTabs from 'vue-nav-tabs'
import Vue from 'vue'
import swal from 'sweetalert2'
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'
import PPagination from 'src/components/UIComponents/Pagination.vue'


export default {
  name: 'newsfeed',
  computed: {
    ...mapFields(['Title', 'Image','Text','Date','Tags','Author'])
  },
  components: {
    'date-picker': Datepicker,
     [DatePicker.name]: DatePicker,
    'vue-editor' :VueEditor,
    'sweet-modal':SweetModal,
    'sweet-modal-tab': SweetModalTab,
     PPagination,
     VueBase64FileUpload
   },
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
    sortableFields:{
      fieldsToSort: 'created', 
      icon:{
        created:true,
        name:true,
      },
      sort:{
        field:'desc' 
      },
    },

    searchableFields:{
      fieldsToSearch:'created',
      data:'',
      switchSelect:true,
      switchSelect2:true,
      datePicker:{
        to:new Date(),
        from:new Date(),
      }
    },  
    getCategoryLanguageFields:{
      data:''
    },
    setCategoryLanguageFields:{
      action:'',
      addCategories:'',
      categoryDescription:'',
      categoryName:'',
      dateCreated:'',
      delete:'',
      edit:'',
      newsCategories:'',
      newsManagement:'',
      pleaseInput:'',
      refresh:'',
      reset:'',
      showingOfEntries:'',
      submit:'',
      view:'',
      of:'',
    },
    refreshValidation:{
      notEqualFields: 0
    },

    addCategoryFields:{
      name:'',
      description:''
    },
    editCategoryFields:{
      id:'',
      name:'',
      description:''
    },
    deleteCategoryFields:{
      array:[]
    },
    previewCategoryFields:{
      array:[],
      name:'',
      status:true
    },
    getCategoryFields:{
      data:'',
      status: true,
      dataStatus:false
    },
    getNewsFields:{
      data:'',
      status:false,
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
  methods:{

  //PAGINATION

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
      this.sortableFields.icon.created = true
      this.sortableFields.icon.name = true
      this.sortableFields.sort.field = 'asc'

      this.getCategoryFields.status = false

      this.getCategory()

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
  this.getCategoryFields.status = false
  this.getCategory()  
  },

  searchableFieldsDateCombine(){
  var dateCombine = this.convertDate(this.searchableFields.datePicker.from) +" 00:00:00"+ "_" + this.convertDate(this.searchableFields.datePicker.to) +" 23:59:59"
  this.searchableFields.data = dateCombine
  // console.log("date combine: ",dateCombine)
  this.getCategoryFields.status = false
  this.getCategory()
  },

  keyDown(event){
    if(event.key == 'Enter'){
      this.getUserFields.status = false
      this.getUser()
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

  //CRUD
  getCategory(){

    console.log("tosearch: ",this.searchableFields.fieldsToSearch)
    console.log("data: ",this.searchableFields.data)

  const data = {
        "query":"query($limit:Limit,$sort:sort,$search:search){NewsCategory(limit:$limit,sort:$sort,search:$search){data{id,name,description,created},success,message {path,message}page { items,pageNo,totalPages } sortableFields,searchableFields}}",
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
  axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
  console.log("getCategory: ", response)

  this.getCategoryFields.data = response.data.NewsCategory.data
  this.paginationFields.pageTotal = response.data.NewsCategory.page.items
  this.getCategoryFields.status = true
  this.setPagination()
  this.setPaginationSelect()

  if(this.getCategoryFields.data.length == 0){
    this.getCategoryFields.dataStatus = true
  }else{
    this.getCategoryFields.dataStatus = false
  }


  }).catch((err) => {
    // console.log(err);
  });
  },
    async getNews(){
    const data = {
    "query":"query($limit:Limit,$sort:sort,$search:search){News(limit:$limit,sort:$sort,search:$search){ data { id,author,headline,headlineimage,content,status,tags,publishdate,category,created } page { items,pageNo,totalPages } sortableFields,searchableFields }}",
    "variables":{
      "limit":{
        "to":"20",
        "page":"1"
      },
      "sort":{
        "field":this.sortableFields.fieldsToSort,
      "by":this.sortableFields.sort.field
      },
      "search":{
        "by":"",
        "text":""
      }
    }
  }
  return await axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
  // console.log("getnews: ",response)
  this.getNewsFields.data = response.data.News.data
  this.getNewsFields.page = response.data.News.page
  if(response.data.News.data){
    this.getNewsFields.status = true
  }
  }).catch((err) => {
    console.log(err);
  });
  },

  async addCategory(){
  const data = {
    "query":"mutation($input:newsCategoryInput!){CreateNewsCategory(input:$input){success,message {path,message}}}",
    "variables":{
      "input":{
        "name":this.addCategoryFields.name,
        "description":this.addCategoryFields.description
      }
    }
  }
  return await axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
  // console.log("addCategory: ", response)
  if(response.data.CreateNewsCategory.errors){
    return true
  }else{
    return false
  }

  }).catch((err) => {
    console.log(err);
  });
  },

   async editCategory(){
    const data = {
      "query":"mutation($input:newsCategoryInput!){UpdateNewsCategory(input:$input){success,message {path,message}}}",
      "variables":{
        "input":{
          "id":this.editCategoryFields.id,
          "name":this.editCategoryFields.name,
          "description":this.editCategoryFields.description
        }
      }
    }
    return await axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
    // console.log("editCategory: ", response)
    if(response.data.CreateNewsCategory.errors){
      return true
    }else{
      return false

    }

    }).catch((err) => {
      console.log(err);
    });
    },

    async deleteCategory(){
    const data = {
         "query":"mutation($input:[String!]!){DeleteNewsCategory(input:$input){success,message {path,message}}}",
      "variables":{
        "input": this.deleteCategoryFields.array
      }
    }
    return await axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
    // console.log("deleteCategory: ", response)
    if(response.data.DeleteNewsCategory.errors){
      return true
    }else{
      return false

    }

    }).catch((err) => {
      console.log(err);
    });
    },


    //MODAL 
    async addCategoryModal(){
    if(this.checkAddCategoryValidation()){
            if(await this.addCategory()){
      swal({
        title: `Something Went Wrong`,
        buttonsStyling: false,
        type: 'warning',
        confirmButtonClass: 'btn btn-success btn-fill'
        })
      }else{
         swal({
          title: `Success`,
          buttonsStyling: false,
          type: 'success',
          confirmButtonClass: 'btn btn-success btn-fill'
      }).then(()=>{
        this.getCategoryFields.status = false
        this.addCategoryFields.name = " "
        this.addCategoryFields.description = " "
        this.getCategory()
        this.$refs.addCategoryModal.close()
        },()=>{
          this.getCategoryFields.status = false
          this.addCategoryFields.name = " "
          this.addCategoryFields.description = " "
          this.getCategory()
          this.$refs.addCategoryModal.close()
        })
       }
    }else{
        swal({
        title: `Empty Field`,
        buttonsStyling: false,
        type: 'warning',
        confirmButtonClass: 'btn btn-success btn-fill'
        })
    }

    },

    async editCategoryModal(){
    if(await this.editCategory()){
      swal({
        title: `Something Went Wrong`,
        buttonsStyling: false,
        type: 'warning',
        confirmButtonClass: 'btn btn-success btn-fill'
        })
      }else{
         swal({
          title: `Success`,
          buttonsStyling: false,
          type: 'success',
          confirmButtonClass: 'btn btn-success btn-fill'
      }).then(()=>{
        this.getCategoryFields.status = false
        this.getCategory()
        this.$refs.editCategoryModal.close()
        },()=>{
          this.getCategoryFields.status = false
          this.getCategory()
          this.$refs.editCategoryModal.close()
        })
       }
    },

     async deleteCategoryModal(items){
     this.deleteCategoryFields.array.push(items.id)
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
      if(await this.deleteCategory())
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
        this.getCategoryFields.status = false
        this.getCategory()
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

    //OPEN MODAL
    openAddCategoryModal(){
      this.$refs.addCategoryModal.open()
    },

    openAddCategoryModal(){
      this.$refs.addCategoryModal.open()
    },

    openEditCategoryModal(items){
      this.editCategoryFields.id = items.id
      this.editCategoryFields.name = items.name
      this.editCategoryFields.description = items.description
      this.$refs.editCategoryModal.open()
    },

    openPreviewCategoryModal(items){
      this.previewCategoryFields.array = []
      console.log(items)
      var countChild = 0
      // console.log(this.getNewsFields.data)
      for(var i = 0; i < this.getNewsFields.data.length; i++){
        // console.log(this.getNewsFields.data[i].category)
        if(items.name == this.getNewsFields.data[i].category){
          countChild++
          this.previewCategoryFields.array.push({
            "title":this.getNewsFields.data[i].headline,
            "author":this.getNewsFields.data[i].author
          })
        }
      }

      if(countChild == 0){
        this.previewCategoryFields.status = false
      }else{
        this.previewCategoryFields.status = true
      }
      this.previewCategoryFields.name = items.name
      this.$refs.previewCategoryModal.open()

    },

    //SORT
    sortData(items){
    this.sortableFields.fieldsToSort = items
    switch (this.sortableFields.fieldsToSort) {
      case 'name':
         if(this.sortableFields.icon.name){
            this.sortableFields.icon.name = false
            this.sortableFields.sort.field = 'desc'
            this.getCategoryFields.status = false
            this.getCategory()
          }else{
            this.sortableFields.icon.name = true
            this.sortableFields.sort.field = 'asc'
            this.getCategoryFields.status = false
            this.getCategory()
          }
          break;
      case 'created':
              if(this.sortableFields.icon.created){
              this.sortableFields.icon.created = false
              this.sortableFields.sort.field = 'desc'
              this.getCategoryFields.status = false
              this.getCategory()
            }else{
              this.sortableFields.icon.created = true
              this.sortableFields.sort.field = 'asc'
              this.getCategoryFields.status = false
              this.getCategory()
            }
          break;
      default:
          break;
      }
  },




    //VALIDATION
    checkAddCategoryValidation(){
    if(this.isEmptyOrSpaces(this.addCategoryFields.name)){
      // console.log("return from name")
      return false
    } else if(this.isEmptyOrSpaces(this.addCategoryFields.description)){
      // console.log("return from description")
      return false
    }else{
      return true
    }
  },

    isEmptyOrSpaces(str){
    var pattern =/^ *$/
    return pattern.test(str);  
    }, 
    
    //LANGUAGE
    getCategoryLanguage(){
    const data = {
         "query":"query($input:view_languages_fields,$limit:Limit,$sort:sort,$search:search){view_languages(input:$input,limit:$limit,sort:$sort,search:$search){ data { id,keyword,description,date }, success,message, { path,message }, page { items,pageNo,totalPages } sortableFields,searchableFields } }",
      "variables":{
          "input":{
              "code":this.viewLanguageCode || "en",
              "set_name":"news category module"
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
      this.getCategoryLanguageFields.data = response.data.view_languages.data
      // console.log("getCategoryLanguage: ",this.getCategoryLanguageFields.data)
      this.setDefaultLanguage()

      }).catch((err) => {

      }); 

    },

    setDefaultLanguage(){
      this.setCategoryLanguageFields.action = 'Action'
      this.setCategoryLanguageFields.addCategories = 'Add Categories'
      this.setCategoryLanguageFields.categoryDescription = 'Category Description'
      this.setCategoryLanguageFields.categoryName = 'Category Name'
      this.setCategoryLanguageFields.dateCreated = 'Date Created'
      this.setCategoryLanguageFields.delete = 'Delete'
      this.setCategoryLanguageFields.edit = 'Edit'
      this.setCategoryLanguageFields.newsCategories = 'News Categories'
      this.setCategoryLanguageFields.newsManagement = 'News Management'
      this.setCategoryLanguageFields.pleaseInput = 'Please Input'
      this.setCategoryLanguageFields.refresh = 'Refresh'
      this.setCategoryLanguageFields.reset = 'Reset'
      this.setCategoryLanguageFields.showingOfEntries = 'Showing of Entries'
      this.setCategoryLanguageFields.submit = 'Submit'
      this.setCategoryLanguageFields.view = 'View'
      this.setCategoryLanguage()
    },

    setCategoryLanguage(){
         const languageKeys = Object.keys(this.setCategoryLanguageFields)
         for(var i = 0; i < languageKeys.length; i++){
            for(var j = 0; j < this.getCategoryLanguageFields.data.length; j++){
              if(this.setCategoryLanguageFields[languageKeys[i]] == this.getCategoryLanguageFields.data[j].keyword){
                  this.setCategoryLanguageFields[languageKeys[i]] =  this.getCategoryLanguageFields.data[j].description
              }
            }
        }
      }

  },
  /*
  .-=-=-.
 /       \
|         |
| )     ( |
\/ .\ /. \/
(    ^    )
 |.     .|
 ||xxxxx||
 '-._._.-' - METHODS
  
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
        this.getCategoryFields.status = false
        this.getCategory()
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
      this.getCategoryFields.status = false
      this.getCategory()
    }
   },
   'searchableFields.fieldsToSearch': function (newValue, oldValue) {
    if(oldValue != newValue){
      this.searchableFields.data = ''
      this.getCategory()
    }
  },
     'viewLanguageCode': function (newValue, oldValue) {
      if(oldValue != newValue){
        this.getCategoryLanguage()
      }
   },

 },
  mounted(){
    this.getNews();
    this.getCategory()
    this.getCategoryLanguage()
  }
};
</script>
<style scoped>
  @media(max-width: 1200px) {
    .edit-news{
      /*display: none*/
    }
  }
  .el-input__inner{
    background-color: #F3F2EE !important;
  }
</style>

