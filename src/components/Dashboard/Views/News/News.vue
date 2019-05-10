<template>
  <div class="news">
  <div class="row">
      <div class="col-md-12">
    <div class="card" >  
     <ul class="nav nav-tabs">
        <li class="active">
         <router-link to="/news/management" >{{setNewsLanguageFields.newsManagement}}</router-link>
        </li>
        <li >
          <router-link to="/news/category" >{{setNewsLanguageFields.newsCategory}}</router-link>
        </li>
      </ul>
    <div class="tab-content">
    <div class="row">
      <div class="col-md-12">
        <div class="card" style="box-shadow:none" >
         <div class="card-header">
          <div class="row">
            <div class="col-md-4">
               <h2 class="card-title">{{setNewsLanguageFields.newsManagement}}</h2>
            </div>
            <div class="col-md-4">
            </div>
            <div class="col-md-4">
              <button class="btn btn-sm" style="float:right;margin-right: 10px;" @click="refreshData()">{{setNewsLanguageFields.refresh}}</button>
              <button class="btn btn-sm" style="float:right;margin-right: 5px;" @click="openAddNewsModal()">{{setNewsLanguageFields.addNews}}</button>
            </div>
          </div>
          <!-- ROW -->
          </div>
          <!-- SEARCH -->
          <div class="row">
            <div class="card-header">
              <div class="form-group">
                <div class="col-xs-2"> 
                 <label style="margin-top: 10px;float:right">Search By</label>
               </div>
                <div class="col-md-2">
                  <select class="form-control" @change="pageLoadingState()" v-model="searchableFields.fieldsToSearch" >
                    <option value="created">date created</option>
                    <option value="publishDate">date publish</option>
                    <option value="headline">title</option>
                    <option>author</option>
                    <option>category</option>
                    <option>tags</option>
                  </select>
                </div>
                <!--  -->
                <div v-if="searchableFields.switchSelect2">
                  <div class="col-md-5" v-if="!searchableFields.switchSelect">
                    <div class="input-group" >
                       <input type="text" class="form-control" placeholder="Please Input"  autofocus="true" v-model="searchableFields.data" v-on:keyup="keyDown">
                       <span class="input-group-addon"><i class="ti-search"></i></span>
                    </div>
                  </div>
                  <div class="col-md-6"  v-if="searchableFields.switchSelect">
                     <div class="form-group" >
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
                               :picker-options="pickerOptions2">
                              </el-date-picker>
                          </div>
                        </li>
                        <li>
                         <button class="btn" @click="searchableFieldsDateCombine()">{{setNewsLanguageFields.submit}}</button>
                         <button class="btn" @click="resetFields()">{{setNewsLanguageFields.reset}}</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-md-3" v-if="!searchableFields.switchSelect">
                    <button class="btn" @click="pageLoadingState()">{{setNewsLanguageFields.submit}}</button>
                    <button class="btn" @click="resetFields()">{{setNewsLanguageFields.reset}}</button>
                  </div>
                </div>
                <div v-if="!searchableFields.switchSelect2">
                  <div class="col-md-8">
                    <label>{{setNewsLanguageFields.tags}}:</label>
                     <el-tag
                      :key="tag"
                      v-for="tag in tags.dynamicTags"
                      type="primary"
                      :closable="true"
                      :close-transition="false"
                      @close="handleClose(tag)" >
                    {{tag}}
                    </el-tag>
                    <input type="text" placeholder="Press Enter" class="form-control" style="display:inline-block;width:120px" 
                     v-model="tags.inputValue"
                     ref="saveTagInput"
                     size="mini"
                     @keyup.enter="handleInputConfirm"/>
                       <button class="btn" @click="searchGetTagsInput()">{{setNewsLanguageFields.submit}}</button>
                    <button class="btn" @click="resetFields()">{{setNewsLanguageFields.reset}}</button>
                  </div>
                </div>
              </div>
              </div>
          </div>
          <!-- SEARCH -->
          <hr style="margin-top: 12px;">
          <!-- ROW -->
          <div style="padding:10px;margin:10px"  class="table-responsive">
           <table class="table table-striped table-bordered ">
            <thead class="">
              <tr>
                <th >
                  <span @click="sortData('created')"  style="cursor:pointer">{{setNewsLanguageFields.dateCreated}}<i style="" :class="(sortableFields.icon.created) ? 'ti-angle-double-up':'ti-angle-double-down'" style="position: relative;top:2px; left: 5px;"></i>
                  </span>
                </th>
            
                <th ><span @click="sortData('author')"  style="cursor:pointer">{{setNewsLanguageFields.author}}<i style="" :class="(sortableFields.icon.author) ? 'ti-angle-double-up':'ti-angle-double-down'" style="position: relative;top:2px; left: 5px;"></i></span>
                </th>
                <th ><span @click="sortData('headline')"  style="cursor:pointer">{{setNewsLanguageFields.title}}<i style="" :class="(sortableFields.icon.headline) ? 'ti-angle-double-up':'ti-angle-double-down'" style="position: relative;top:2px; left: 5px;"></i></span>
                </th>
                 <th class="col-md-1" style="width:10%"><span @click="sortData('category')"  style="cursor:pointer">{{setNewsLanguageFields.category}}<i style="" :class="(sortableFields.icon.category) ? 'ti-angle-double-up':'ti-angle-double-down'" style="position: relative;top:2px; left: 5px;"></i></span>
                </th>
                <th class="col-md-2">{{setNewsLanguageFields.tags}}</th>
                <th> {{setNewsLanguageFields.status}}</th>

                <th>
                  <span @click="sortData('publishDate')"  style="cursor:pointer">{{setNewsLanguageFields.datePublish}}<i style="" :class="(sortableFields.icon.publishDate) ? 'ti-angle-double-up':'ti-angle-double-down'" style="position: relative;top:2px; left: 5px;"></i>
                  </span>
                </th>
            
               <th>{{setNewsLanguageFields.action}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(items,index) in getNewsFields.data" v-if="getNewsFields.status">
                <td>
                  {{convertDate(items.created)}}  
                </td>
                <td >
                  {{items.author}}
                </td>
                <td>
                  {{convertTitle( items.headline)}}
                </td>
                  <td>
                  {{convertCategory(items.category)}}
                 </td>
                 <td>  
                  <div v-for="(items,index) in items.tags">
                    <div style="padding:3px 2px; background-color:rgba(0,0,0,.1); float:left; margin:2px; font-size:10px; border:1px solid black">{{items}}</div>
                  </div>
                </td>
                 <td>
                  {{items.status}}
                  </td>
                  <td>
                  {{convertDate2(items.publishdate)}}  
                </td>
                <td style="width:18%">
                  <button class="btn btn-sm" @click="openPreviewModal(items)">{{setNewsLanguageFields.view}}</button>
                  <button class="btn btn-sm" @click="openEditNewsModal(items)">{{setNewsLanguageFields.edit}}</button>
                  <button class="btn btn-sm" @click="deleteNewsModal(items)">{{setNewsLanguageFields.delete}}</button>
                  <button class="btn btn-sm" @click="unpublishNewsModal(items)"  v-if="items.status" >{{setNewsLanguageFields.unpublish}}</button>
                  <button class="btn btn-sm" @click="publishNewsModal(items)"  v-if="!items.status" >{{setNewsLanguageFields.publish}}</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div  v-if="!getNewsFields.status">
           <div class="row" style="text-align: center;">
            <i class="fa fa-spinner fa-spin" style="font-size:24px"></i>
           </div>
          </div>

         <div  v-if="getNewsFields.dataStatus">
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
              <select class="form-control" @change="getNews()" v-model="paginationFields.pageLimit">
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
  </div>
  </div>
    <!-- Modal -->
    <sweet-modal  ref="previewModal" modal-theme="light" width="60%" >
    <div class="row">
      <div class="col-md-11">
        <div>
          <h1>{{previewNewsFields.headline}}</h1>
        </div>
        <hr>
        <div>
          <h6><i class="ti-palette"></i> {{previewNewsFields.author}}  <i style="margin-left:20px" class="ti-calendar"></i> {{convertDate(previewNewsFields.publishDate)}}</h6>
        </div>
        <div>
           <img :src="previewNewsFields.headlineImage" width="90%">
        </div>
        <hr>
        <div>
          <div  v-html="previewNewsFields.content" class="text-center" ></div>
        </div>
        <hr>
        <div v-for="(items,index) in previewNewsFields.tags">
          <ul class="list-inline">
            <li style="padding:5px 3px;  float:left; margin-left:10px; font-size:10px;">{{items}}</li>
          </ul>        
        </div>
      </div>
    </div>
   </sweet-modal>

  <sweet-modal ref="addNewsModal" width="50%"  modal-theme="light" blocking hide-close-button>
    <div class="card" style="box-shadow:none">
      <div class="card-header">
        <h4 class="title">Add News</h4>
      </div>
      <div class="card-content">
        <form>
           <div class="row">
            <div class="col-md-6">
              <fg-input type="text" label="Title" placeholder="Title" v-model="addNewsFields.headline">
              </fg-input>
            </div>
            <div class="col-md-6">
              <fg-input type="text" label="Author" placeholder="Author" v-model="addNewsFields.author">
              </fg-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
             <div class="form-group">
              <label>Tags</label><br>
              <input type="text"  v-model="addNewsFields.tags" class="form-control" placeholder="Tags">
              </div>
            </div>
              <div class="col-md-6">
              <label>Category</label><br>
               <select class="form-control" v-model="addNewsFields.category">
                  <option v-for="(items,index) in getCategoryFields.data">{{items.name}}</option>
                </select>
            </div>
          </div>


          <div class="row">  
            <div class="col-md-3"></div>
            <div class="col-md-3">
            <select class="form-control" @change="addNewsImageUploadSwitchSelect()" v-model="addNewsFields.switchSelect.switch">
              <option>Image File</option>
              <option>Source File</option>
            </select>
            </div>

            <div class="col-md-6">
              <div class=" form-group" style="margin-top:7px" v-if="addNewsFields.switchSelect.status">
                <input type="file" id="file" accept="image/*" @change="imageUploader()">
              </div>
            </div>

             <div class="col-md-4" v-if="!addNewsFields.switchSelect.status">
              <div class=" form-group" >
                <input type="text" class="form-control" placeholder="Insert Link" v-model="addNewsFields.headlineImage">
              </div>
            </div>
          </div>
      
          <div class="row" style="margin-top:15px">
               <div class="col-md-12">
               <vue-editor name="Content" v-model="addNewsFields.content"></vue-editor>
            </div>
          </div>
        </form>
      </div>
    <div  style="float:right">
     <button class="btn " :disabled="errors.any()" @click="addNewsModal()">Save</button>
     <button class="btn" :disabled="errors.any()" @click="addNewsModalClose()">Cancel</button>
    </div>
  </div>
  </sweet-modal>

   <sweet-modal ref="editNewsModal" width="50%" modal-theme="light" blocking hide-close-button>
    <div class="card" style="box-shadow:none">
      <div class="card-header">
        <h4 class="title">Edit News</h4>
      </div>
      <div class="card-content">
        <form>
           <div class="row">
            <div class="col-md-6">
              <fg-input type="text" label="Title" placeholder="Title" v-model="editNewsFields.headline">
              </fg-input>
            </div>
            <div class="col-md-6">
              <fg-input type="text" label="Author" placeholder="Author" v-model="editNewsFields.author">
              </fg-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
             <div class="form-group">
              <label>Tags</label><br>
              <input type="text"  v-model="editNewsFields.tags" class="form-control" placeholder="Tags">
              </div>
            </div>
              <div class="col-md-6">
              <label>Category</label><br>
               <select class="form-control" v-model="editNewsFields.category">
                  <option v-for="(items,index) in getCategoryFields.data">{{items.name}}</option>
                </select>
            </div>
          </div>


          <div class="row">  
            <div class="col-md-3"></div>
            <div class="col-md-3">
            <select class="form-control" @change="editNewsImageUploadSwitchSelect()" v-model="editNewsFields.switchSelect.switch">
              <option>Image File</option>
              <option>Source File</option>
            </select>
            </div>

            <div class="col-md-6">
              <div class=" form-group" style="margin-top:7px" v-if="editNewsFields.switchSelect.status">
                 <input type="file" id="file2" accept="image/*" @change="imageUploaderEdit()">
              </div>
            </div>

             <div class="col-md-4" v-if="!editNewsFields.switchSelect.status">
              <div class=" form-group" >
                <input type="text" class="form-control" placeholder="Insert Link" v-model="editNewsFields.headlineImage">
              </div>
            </div>
          </div>



          <div class="row" style="margin-top:10px">
                   <div class=" form-group">
                 <button class="btn btn-sm btn-wd" @click="openPreviewEditPhotoModal()">Image Preview</button>
              </div>
            
          </div>
      
          <div class="row">
               <div class="col-md-12">
               <vue-editor name="Content" v-validate="Text" v-model="editNewsFields.content"></vue-editor>
            </div>
          </div>
        </form>
      </div>
    <div  style="float:right">
     <button class="btn btn btn-fill  btn-info" :disabled="errors.any()" @click="editNewsModal()">Save</button>
     <button class="btn" :disabled="errors.any()" @click="editNewsModalClose()">Cancel</button>
    </div>
  </div>
  </sweet-modal>

  <sweet-modal ref="previewEditPhotoModal" width="50%" modal-theme="light">
        <div>
           <img :src="editNewsFields.headlineImagePreview" width="90%">
        </div>
  </sweet-modal>

 <sweet-modal  ref="publishNewsModal"  modal-theme="light" width="50%" blocking>
    <div class="card" style="margin-top: 30px; box-shadow:none">
      <div class="card-header" style="text-align: left;">
          <h4 class="card-title" style="margin-bottom: 20px"> Publish News</h4>
      </div>
      <div class="card-content">
      <div class="form-group">
       <textarea rows="5" class="form-control border-input"
        placeholder="Enter Description" v-model="publishNewsModal.description">    
        </textarea>
        </div>
      </div>
      </div>
    <div  style="float:right">
    <button class="btn btn-md btn-fill btn-primary" @click="publishNewsModal()">Save</button>
    </div>
  </sweet-modal>

  </div>
  <!-- News -->
</template>
<script>

import { VueEditor } from 'vue2-editor'
import {DatePicker, TimeSelect, Slider, Tag, Input, Button, Select, Option} from 'element-ui'
import {mapFields} from 'vee-validate'
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'
import ImageCompressor from 'image-compressor.js';

Vue.use(VueTabs)

import VueBase64FileUpload from 'vue-base64-file-upload';
import Datepicker from 'vuejs-datepicker';
import axios from 'axios';
import VueTabs from 'vue-nav-tabs'
import Vue from 'vue'
import swal from 'sweetalert2'
import PPagination from 'src/components/UIComponents/Pagination.vue'

import {mapActions} from 'vuex';
import {mapGetters} from 'vuex'


export default {
computed: {
  ...mapFields(['Title', 'Image','Text','Date','Tags','Author']),
  ...mapGetters([
  'viewLanguageCode',
  'viewNavPanel'
  ])
},
components: {
  'date-picker': Datepicker,
  'vue-editor' :VueEditor,
  'sweet-modal':SweetModal,
  'sweet-modal-tab': SweetModalTab,
  [DatePicker.name]: DatePicker,
  [Tag.name]: Tag,
  VueBase64FileUpload,
  PPagination

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
      publishDate:true,
      author:true,
      headline:true,
      category:true,
    },
    sort:{
      field:'asc' 
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

  getNewsLanguageFields:{
    data:'',
    array:[]
   },
  setNewsLanguageFields:{
    addNews:'',
    author:'',
    category:'',
    dateCreated:'',
    datePublish:'',
    delete:'',
    edit:'',
    newsCategory:'',
    newsManagement:'',
    action:'',
    publish:'',
    refresh:'',
    reset:'',
    status:'',
    submit:'',
    tags:'',
    title:'',
    unpublish:'',
    view:''
   },
  validationFields:{
    addNewsFields:{
      headline:false,
      author:false,
      tags:false,
      headlineImage:false,
      content:false
    },
    emptyFields:0,
    fieldsUnChanged:0
  },

  tags: {
    dynamicTags: [],
    inputVisible: false,
    inputValue: ''
  },

  imageToConvert:{
    data:''
  },
  addNewsFields: {
    id:'',
    author:'',
    headlineImage:'',
    content:'<p></p>',
    category: '',
    headline:'',
    tags:[],
    switchSelect:{
      status:true,
      switch:'Image File'
    }

  }, 
   editNewsFields: {
    id:'',
    author:'',
    headlineImage:'',
    headlineImagePreview:'',
    content:'',
    category: '',
    headline:'',
    tags:[],
    switchSelect:{
      status:true,
      switch:'Image File'
    }
  }, 
   editNewsFieldsCheckChanges: {
    id:'',
    author:'',
    headlineImage:'',
    headlineImagePreview:'',
    content:'',
    category: '',
    headline:'',
    tags:[],

  }, 
  previewNewsFields: {
    id:'',
    author:'',
    content:'',
    headlineImage:'',
    headlineImagePreview:'',
    headline:'',
    created:'',
    tags:[]
  },

  unpublishNewsFields:{
    id:'',
  },
  publishNewsFields:{
    id:'',
    description:''
  },
  deleteNewsFields: {
    array:[],
  },
  getNewsFields:{
    data:'',
    status:false,
    page:'',
    dataStatus:''
  },  
  getCategoryFields:{
    data:''
  },
  customImageMaxSize: 3,
  datePicker: '',
  checkBox:{
    array:[],
    selectAll:false
  },
  myVar:null,
 
  pickerOptions1: {
    shortcuts: [{
      text: 'Today',
      onClick (picker) {
        picker.$emit('pick', new Date())
      }
    },{
      text: 'Yesterday',
      onClick (picker) {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      picker.$emit('pick', date)
      }
    },{
      text: 'A week ago',
      onClick (picker) {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', date)
      }
    }]
  },

  pickerOptions2: {
    shortcuts: [{
      text: 'Today',
      onClick (picker) {
        picker.$emit('pick', new Date())
      }
    },{
      text: 'Yesterday',
      onClick (picker) {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      picker.$emit('pick', date)
      }
    },{
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
methods:{


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
  //SORT
  sortData(items){
    this.sortableFields.fieldsToSort = items
    switch (this.sortableFields.fieldsToSort) {
       case 'created':
       if(this.sortableFields.icon.created){
          // console.log("here")
          this.sortableFields.icon.created = false
          this.sortableFields.sort.field = 'desc'
          this.getNewsFields.status = false
          this.getNews()
        }else{
          // console.log("here false")
          this.sortableFields.icon.created = true
          this.sortableFields.sort.field = 'asc'
          this.getNewsFields.status = false
          this.getNews()
        }
      break;
      case 'publishDate':
        if(this.sortableFields.icon.publishDate){
          this.sortableFields.icon.publishDate = false
          this.sortableFields.sort.field = 'desc'
          this.getNewsFields.status = false
          this.getNews()
        }else{
          this.sortableFields.icon.publishDate = true
          this.sortableFields.sort.field = 'asc'
          this.getNewsFields.status = false
          this.getNews()
        }
      break;
      case 'author':
          if(this.sortableFields.icon.author){
          this.sortableFields.icon.author = false
          this.sortableFields.sort.field = 'desc'
          this.getNewsFields.status = false
          this.getNews()
        }else{
          this.sortableFields.icon.author = true
          this.sortableFields.sort.field = 'asc'
          this.getNewsFields.status = false
          this.getNews()
        }
      break;
      case 'headline':
          if(this.sortableFields.icon.headline){
          this.sortableFields.icon.headline = false
          this.sortableFields.sort.field = 'desc'
          this.getNewsFields.status = false
          this.getNews()
        }else{
          this.sortableFields.icon.headline = true
          this.sortableFields.sort.field = 'asc'
          this.getNewsFields.status = false
          this.getNews()
        }
      break;
       case 'category':
          if(this.sortableFields.icon.category){
          this.sortableFields.icon.category = false
          this.sortableFields.sort.field = 'desc'
          this.getNewsFields.data = false
          this.getNews()
        }else{
          this.sortableFields.icon.category = true
          this.sortableFields.sort.field = 'asc'
          this.getNewsFields.data = false
          this.getNews()
        }
      break;
      default:
      break;
      }
  },

  //CONVERT
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
  return month + "/"+ day + "/"+ year + " ";
  },

  convertDate2(date_var){
  if(date_var == null){
    return 'unpublish'
  }
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

  convertDateForSearchData(date_var){
  var dateToString = date_var.toString()
  var tagSplit =  dateToString.split(" ")

  var d = new Date(date_var),
  month = '' + (d.getMonth() + 1),
  day = '' + d.getDate(),
  year = d.getFullYear(),
  time = d.getTime(),
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
  return year + "-"+ month + "-"+ day + " " + tagSplit[4] ;

  },

  convertTitle(items){
    var str  = items
    var strsplit = str.split(' ')
    if(strsplit.length == 1){
      return strsplit[0]
    }else{
      var combinestr = strsplit[0] + " " + strsplit[1] + " " + strsplit[2] 
      return combinestr
    }
  },  
  convertCategory(items){
    if(items == null){
      return 'NO CATEGORY '
    }else{
      return items
    }
  },

  //RESET DEFAULT

  clearAddNewsFieldsData(){
    this.addNewsFields.headline = ''
    if(this.addNewsFields.switchSelect.switch == 'Image File'){
    document.getElementById('file').value = ""
    }else{
      console.log(this.addNewsFields.switchSelect.switch)
    }
    this.addNewsFields.headlineImage = ''
    this.addNewsFields.author = ''
    this.addNewsFields.content = '<p></p>'
    this.addNewsFields.publishDate = this.newDate
    this.addNewsFields.tags = []
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
  this.searchableFields.switchSelect2 = true
  this.searchableFields.datePicker.to = new Date() 
  this.searchableFields.datePicker.from = new Date()

  this.sortableFields.fieldsToSort = 'created'
  this.sortableFields.icon.created = true
  this.sortableFields.icon.publishDate = true
  this.sortableFields.icon.author = true
  this.sortableFields.icon.headline = true
  this.sortableFields.icon.category = true
  this.sortableFields.sort.field = 'asc'

  this.getNewsFields.status = false

  this.getNews()

  },
  selectAllCheckBox(){
    this.checkBox.array = []
    if(!this.checkBox.selectAll){
        for(let i in this.newsArray){
        this.checkBox.array.push(this.newsArray[i].id)
      }
    }
  },
 
  //CRUD 
  async publishNews(){
  const data = {
    "query":"mutation($input:publishNews!){PublishNews(input:$input){success,message{path,message}}}",
    "variables":{
      "input":{
        "id":this.publishNewsFields.id,
       "description":"NO DATA"
      }
    }
  }
  return await axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
  // console.log("pulished news: ",response);
  if(response.data.PublishNews.errors){
    return true
  }else{
    return false
  }


   }).catch((err) => {
   console.log(err);
  });
  },

  async unpublishNews(items){
  const data = {
    "query":"mutation($input:unpublishNews!){UnpublishNews(input:$input){success,message{path,message}}}",
    "variables":{
      "input":{
        "id":this.unpublishNewsFields.id
      }
    }
  }
  axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
  // console.log("unpublish news: ",response);
  if(response){
    return true
  }else{
    return false
  }

   }).catch((err) => {
    console.log(err);
  });
  },

  async getNews(){
    const data = {
  "query":"query($limit:Limit,$sort:sort,$search:search){News(limit:$limit,sort:$sort,search:$search){ data { id,author,headline,headlineimage,content,status,tags,publishdate,category,created},success,message{path,message} page { items,pageNo,totalPages } sortableFields,searchableFields }}",
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
  // console.log("getNews: ", response)
  this.getNewsFields.data = response.data.News.data
  this.paginationFields.pageTotal = response.data.News.page.items

  if(response.data.News.data){
    this.getNewsFields.status = true
  }

  if(this.getNewsFields.data.length == 0){
      this.getNewsFields.dataStatus = true
    }else{
      this.getNewsFields.dataStatus = false
    }

  this.setPagination()
  this.setPaginationSelect()

  }).catch((err) => {
    console.log(err);
  });
  },

  async deleteNews(){
  const data = {

  "query":"mutation($input:[String!]!){DeleteNews(input:$input){success,message{path,message}}}",
    "variables":{
      "input":this.deleteNewsFields.array
    }
  }
  return await axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
  // console.log("delete news: ",response)
  if(response.data.errors.length > 0){
    return true
  }else{
    return false
  }
  }).catch(err =>{
   });   
  },

  async addNews(){
    const data = {
   "query":"mutation($input:newsInput!){CreateNews(input:$input){success,message{path,message}}}",
    "variables":{
      "input":{
      "author":this.addNewsFields.author,
      "headline":this.addNewsFields.headline,
      "headlineImage": this.addNewsFields.headlineImage,
      "content":this.addNewsFields.content,
      "tags":this.getTagsSplit(this.addNewsFields.tags),
      "category":this.addNewsFields.category
      }
    }



  }
    return await axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
    console.log("add news: ",response)
    if(!response.data.CreateNews.success){
      return true
    }else{
      false
    }
    }).catch((err) => {
    });
  },  

  async editNews(){
    const data = {
    "query":"mutation($input:newsInput!){EditNews(input:$input){message,errors{Path,Message}}}",
    "variables":{
      "input":{
      "id":this.editNewsFields.id,
      "author":this.editNewsFields.author,
      "headline":this.editNewsFields.headline,
      "headlineImage":this.checkEditImagePreview(this.editNewsFields.headlineImage),
      "content":this.editNewsFields.content,
      "tags":this.editNewsFields.tags,
      "category":this.editNewsFields.category
      }
    }
  }

  console.log(this.editNewsFields.headlineImage)
  return await axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
  // console.log("editnews: ",response)
  if(response.data.EditNews.errors){
    return true
  }else{
    false
  }
  }).catch((err) => {
  });
  }, 

  checkEditImagePreview(items){
    if(items == ' '){
      // console.log(this.editNewsFields.headlineImagePreview)
      return this.editNewsFields.headlineImagePreview
    }else{
      return  this.editNewsFields.headlineImage
    }
  },

  getCategory(){
  const data = {
        "query":"query($limit:Limit,$sort:sort,$search:search){NewsCategory(limit:$limit,sort:$sort,search:$search){data{id,name,description,created},success,message {path,message}page { items,pageNo,totalPages } sortableFields,searchableFields}}",
      "variables":{
        "limit":{
            "to":100,
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
  }
  axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
  // console.log("getCategory: ", response)
  this.getCategoryFields.data = response.data.NewsCategory.data

  }).catch((err) => {
  });
  },



  //LOADER SWITCH SELECT
  addNewsImageUploadSwitchSelect(){
    // if(this.addNewsFields.switchSelect2)
    if(this.addNewsFields.switchSelect.switch == 'Source File'){
      this.addNewsFields.headlineImage = ''
      this.addNewsFields.switchSelect.status = false
    }else{
      this.addNewsFields.headlineImage = ''
      this.addNewsFields.switchSelect.status = true

    }
  },

  editNewsImageUploadSwitchSelect(){
    // if(this.addNewsFields.switchSelect2)
    if(this.editNewsFields.switchSelect.switch == 'Source File'){
      this.editNewsFields.headlineImage = ''
      this.editNewsFields.switchSelect.status = false
    }else{
      this.editNewsFields.headlineImage = ''
      this.editNewsFields.switchSelect.status = true

    }
  },

  pageLoadingState(){
    if(this.searchableFields.fieldsToSearch == 'tags'){
        this.searchableFields.switchSelect2 = false
    }else{
        this.searchableFields.switchSelect2 = true
      if(this.searchableFields.fieldsToSearch == 'created'  || this.searchableFields.fieldsToSearch == 'publishDate'){
        this.searchableFields.switchSelect = true
      }else{
        this.searchableFields.switchSelect = false
      }
    }
    this.getNewsFields.status = false
    this.getNews() // search trigger

  },

  handleClose (tag) {
    this.tags.dynamicTags.splice(this.tags.dynamicTags.indexOf(tag), 1)
  },
  handleInputConfirm () {
    let inputValue = this.tags.inputValue
    if (inputValue) {
      this.tags.dynamicTags.push(inputValue)
    }
    this.tags.inputVisible = false
    this.tags.inputValue = ''
  },

  resetFields(){
    this.tags.inputValue = ''
    this.tags.dynamicTags = []
    this.searchableFields.data = ''
    this.searchableFields.datePicker.to = new Date()
    this.searchableFields.datePicker.from = new Date()

    this.getNews()
  },


  //SEARCH METHODS
  searchableFieldsDateCombine(){
    var dateCombine = this.convertDate(this.searchableFields.datePicker.from) +"00:00:00"+ "_" + this.convertDate(this.searchableFields.datePicker.to) + "23:59:59"
    this.searchableFields.data = dateCombine
    this.getNewsFields.status = false
    this.getNews()

  },

  searchGetTagsInput(){
    this.searchableFields.data =  JSON.stringify(this.tags.dynamicTags) 
    // console.log(this.searchableFields.data)
    this.getNewsFields.status = false
    this.getNews()
  },

  keyDown(event){
    if(event.key == 'Enter'){
      this.getNewsFields.status = false
      this.getNews()
    }
  },

  //IMAGE UPLOADER

  async imageUploader(){
  let file = document.getElementById('file').files[0]
  if (!file) {
    // console.log("error")
  }
    let resulta = new ImageCompressor()
    const result = await resulta.compress(file,{quality:.6})
    var reader = new FileReader();
    reader.readAsDataURL(result); 

    console.log("file: ",file.size)
    if(file.size > 125790){
    swal({
    title: `File To Large`,
    buttonsStyling: false,
    type: 'warning',
    confirmButtonClass: 'btn btn-success btn-fill'
    }).then(()=>{
      document.getElementById('file').value = ""
    })
    }else{
    reader.onloadend = () => {
      this.addNewsFields.headlineImage =  reader.result;    
    }

    console.log("string: ",this.addNewsFields.headlineImage)


    }

  },

  async imageUploaderEdit(){
  let file = document.getElementById('file2').files[0]
  if (!file) {
    // console.log("error")
  }
    let resulta = new ImageCompressor()
    const result = await resulta.compress(file,{quality:.6})
    var reader = new FileReader();
    reader.readAsDataURL(result); 
  // let resultBase64 = ""
    reader.onloadend = () => {
      this.editNewsFields.headlineImage =  reader.result;    
    }
  },

  //IMAGE CHECK
  async checkSourceResponse(items){

  return await axios.get(items).then((response) => {
  // console.log("checkSourceResponse: ", response)
  if(response.status == 200){
    return false
  }else{
    return true
  }
  }).catch((err) => {
    return true
  });
  
  },

  // MODAL
  async addNewsModal(){
    if(this.checkAddNewsValidation()){
    if(!this.addNewsFields.switchSelect.status){
      if(await this.checkSourceResponse(this.addNewsFields.headlineImage)){
      swal({
        title: `Invalid Src File`,
        buttonsStyling: false,
        type: 'warning',
        confirmButtonClass: 'btn btn-success btn-fill'
        })
      }else{
         if(await this.addNews()){
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
          this.clearAddNewsFieldsData()
          this.checkLeaveAddNewsValidation = () =>{
            return false;
          }
          this.getNews()
          this.$refs.addNewsModal.close()
          },()=>{
          this.clearAddNewsFieldsData()
          this.checkLeaveAddNewsValidation = () =>{
            return false;
          }
          this.getNews()
          this.$refs.addNewsModal.close()
          })
        }
      }
    }else{
    if(await this.addNews()){
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
        this.clearAddNewsFieldsData()
        this.checkLeaveAddNewsValidation = () =>{
          return false;
        }
        this.getNews()
        this.$refs.addNewsModal.close()
        },()=>{
        this.clearAddNewsFieldsData()
        this.checkLeaveAddNewsValidation = () =>{
          return false;
        }
        this.getNews()
        this.$refs.addNewsModal.close()
        })
     }
    }

    }else{
      swal({
        title: 'Empty Field!',
        type: 'warning',
        confirmButtonClass: 'btn btn-success btn-fill',
        buttonsStyling: false
      })
    }
  },

  async editNewsModal(items){
   if(this.checkEditNewsValidation()){
      if(await this.editNews()){
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
          this.getNewsFields.status = false
          if(this.editNewsFields.switchSelect.switch == 'Image File'){
           document.getElementById('file2').value = ''
           }
           this.checkLeaveEditNewsValidation = () =>{
           return false;
          }
          this.getNews()
          this.$refs.editNewsModal.close()
          },()=>{
            this.getNewsFields.status = false
          if(this.editNewsFields.switchSelect.switch == 'Image File'){
           document.getElementById('file2').value = ''
           }
           this.checkLeaveEditNewsValidation = () =>{
           return false;
          }
          this.getNews()
          this.$refs.editNewsModal.close()
          })
         }
     }else{
      swal({
        title: 'Empty Field!',
        type: 'warning',
        confirmButtonClass: 'btn btn-success btn-fill',
        buttonsStyling: false
      })
    }
  },
  async deleteNewsModal(items){
    this.deleteNewsFields.array.push(items.id)
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
    if(await this.deleteNews())
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
       this.getNewsFields.status = false
        this.getNews()
      },()=>{
         this.getNewsFields.status = false
        this.getNews()
      })
      }
    }, function (dismiss) {
      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
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

  async publishNewsModal(items){
  this.publishNewsFields.id = items.id
  if(await this.publishNews()){
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
      this.getNewsFields.status = false
      this.publishNewsFields.description = " "
      this.$refs.publishNewsModal.close()
      this.getNews()
      },() =>{
      this.getNewsFields.status = false
      this.publishNewsFields.description = " "
      this.$refs.publishNewsModal.close()
      this.getNews()
      })
     }
  },

  async unpublishNewsModal(items){
    this.unpublishNewsFields.id = items.id
  if(await this.unpublishNews()){
    swal({
      title: `Something Went Wrong`,
      buttonsStyling: false,
      type: 'warning',
      confirmButtonClass: 'btn btn-success btn-fill'
      })
    }else{
       this.getNewsFields.status = false
       swal({
        title: `Success`,
        buttonsStyling: false,
        type: 'success',
        confirmButtonClass: 'btn btn-success btn-fill'
    }).then(()=>{
      this.getNewsFields.status = false
      this.getNews()
      },()=>{
      this.getNewsFields.status = false
      this.getNews()
      })
     }
  },

  //OPEN MODAL
  openAddNewsModal(){
    this.addNewsFields.category = this.getCategoryFields.data[0].name
    console.log(this.addNewsFields.category)
    this.$refs.addNewsModal.open()
  },
  openEditNewsModal(items){
   this.$refs.editNewsModal.open()

   this.editNewsFields.id = items.id
   this.editNewsFields.author = items.author
   this.editNewsFields.headline = items.headline
   this.editNewsFields.content = items.content
   this.editNewsFields.headlineImage = ' '
   this.editNewsFields.headlineImagePreview = items.headlineimage
   this.editNewsFields.tags = items.tags
   this.editNewsFields.category = items.category

   this.editNewsFieldsCheckChanges.id = items.id
   this.editNewsFieldsCheckChanges.author = items.author
   this.editNewsFieldsCheckChanges.headline = items.headline
   this.editNewsFieldsCheckChanges.content = items.content
   this.editNewsFieldsCheckChanges.tags = items.tags
   this.editNewsFieldsCheckChanges.category = items.category

  },
  openPreviewModal(items){
   this.$refs.previewModal.open()
   this.previewNewsFields.author = items.author
   this.previewNewsFields.headline = items.headline
   this.previewNewsFields.content = items.content
   this.previewNewsFields.headlineImage = items.headlineimage
   this.previewNewsFields.tags = items.tags
   this.previewNewsFields.publishDate = items.created
  },

  openPreviewEditPhotoModal(){
   this.$refs.previewEditPhotoModal.open()
  },



  //CLOSE MODAL
  addNewsModalClose(){
    if(this.checkLeaveAddNewsValidation()){
      swal({
      title: 'Are you sure?',
      text:'Files will be unsaved!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      confirmButtonClass: 'btn btn-success btn-fill',
      cancelButtonClass: 'btn btn-danger btn-fill',
      buttonsStyling: false
    }).then(async () => {
      this.clearAddNewsFieldsData()
      this.$refs.addNewsModal.close()
    }, function (dismiss) {
      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      if (dismiss === 'cancel') {
        swal({
          title: 'Cancelled',
          type: 'error',
          confirmButtonClass: 'btn btn-info btn-fill',
          buttonsStyling: false
        })
      }
    })
    }else{
    this.$refs.addNewsModal.close()
    }
  },

  editNewsModalClose(){
    if(this.checkLeaveEditNewsValidation()){
      swal({
      title: 'Are you sure?',
      text:'Files will be unsaved!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      confirmButtonClass: 'btn btn-success btn-fill',
      cancelButtonClass: 'btn btn-danger btn-fill',
      buttonsStyling: false
    }).then(async () => {
      this.$refs.editNewsModal.close()
    }, function (dismiss) {
      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      if (dismiss === 'cancel') {
        swal({
          title: 'Cancelled',
          type: 'error',
          confirmButtonClass: 'btn btn-info btn-fill',
          buttonsStyling: false
        })
      }
    })
    }else{
    this.$refs.editNewsModal.close()
    }
  },

  //VALIDATION
  checkLeaveAddNewsValidation(){
    if(!this.isEmptyOrSpaces(this.addNewsFields.headline )){
      // console.log("true fom headline")
      this.validationFields.emptyFields = 0
      return true 
    }else{    
      this.validationFields.emptyFields++
      if(!this.isEmptyOrSpaces(this.addNewsFields.author)){
        // console.log("true fom author")
         this.validationFields.emptyFields = 0

        return true
      }else{
        this.validationFields.emptyFields++ 
        if(!this.isEmptyOrSpaces(this.addNewsFields.tags)){
          // console.log("true fom author")
          this.validationFields.emptyFields = 0
          return true
          }else{
            this.validationFields.emptyFields++ 
            if(!this.isEmptyOrSpaces(this.addNewsFields.headlineImage)){
             this.validationFields.emptyFields = 0
             return true
            }else{
            this.validationFields.emptyFields++ 
            if(!this.checkContentEditor(this.addNewsFields.content)){
              this.validationFields.emptyFields = 0
              return true
              }else{
                this.validationFields.emptyFields++ 
                return false
              }
            }
          }
       }
    }
    // console.log("empty fields: ",this.validationFields.emptyFields)
    if(this.validationFields.emptyFields == 5){
      this.validationFields.emptyFields = 0
      // console.log("all fields empty")
      return false
    }else{
      this.validationFields.emptyFields = 0
      return true
    }
  },
  checkLeaveEditNewsValidation(){
    //returns true if fields are changed
    if(this.editNewsFields.headline != this.editNewsFieldsCheckChanges.headline){
      // console.log("true fom headline")
      this.validationFields.fieldsUnChanged = 0
      return true 
    }else{    
      this.validationFields.fieldsUnChanged++
      if(this.editNewsFields.author != this.editNewsFieldsCheckChanges.author){
        // console.log("true fom author")
         this.validationFields.fieldsUnChanged = 0
        return true
      }else{
        this.validationFields.fieldsUnChanged++ 
        //substitute as error
        if(this.editNewsFields.tags.length == 0 && this.editNewsFieldsCheckChanges.tags.length == 0){
          return false
        }

        if(this.editNewsFields.tags != this.editNewsFieldsCheckChanges.tags){
          this.validationFields.fieldsUnChanged = 0
          return true
          }else{
            this.validationFields.fieldsUnChanged++ 
            if(this.editNewsFields.headlineImage != ' '){
            console.log(this.editNewsFields.headlineImage)
             this.validationFields.fieldsUnChanged = 0
             return true
            }else{
            this.validationFields.fieldsUnChanged++ 
            if(this.editNewsFields.content != this.editNewsFieldsCheckChanges.content){
              this.validationFields.fieldsUnChanged = 0
              return true
              }else{
                this.validationFields.fieldsUnChanged++ 
                //should return false fieldsUnChanged 
              }
            }
          }
       }
    }

    if(this.validationFields.fieldsUnChanged == 5){
      this.validationFields.fieldsUnChanged = 0
      // console.log("no changes made")
      return false
    }else{
      this.validationFields.fieldsUnChanged = 0
    }
  },

  checkAddNewsValidation(){
    if(this.isEmptyOrSpaces(this.addNewsFields.headline)){
      // console.log("return from title")
      return false
    } else if(this.isEmptyOrSpaces(this.addNewsFields.author)){
      // console.log("return from author")
      return false
    }else if(this.isEmptyOrSpaces(this.addNewsFields.tags)){
      // console.log("return from tags")
      return false
    }else if(this.isEmptyOrSpaces(this.addNewsFields.headlineImage) ){
      // console.log("return from headlineImage")
      return false
    }else if(this.checkContentEditor(this.addNewsFields.content)){
      // console.log("found component")
      return false
    }else{
      return true
    }
  },

   checkEditNewsValidation(){
    if(this.isEmptyOrSpaces(this.editNewsFields.headline)){
      // console.log("return from title")
      return false
    } else if(this.isEmptyOrSpaces(this.editNewsFields.author)){
      // console.log("return from author")
      return false
    }else if(this.isEmptyOrSpaces(this.editNewsFields.tags)){
      // console.log("return from tags")
      return false
    }else if(this.checkContentEditor(this.editNewsFields.content)){
      // console.log("found component")
      return false
    }else{
      return true
    }
  },

  checkContentEditor(items){
    var tagSplit = items.split("")
    var tagSplitArray = []
    var notSpaceCount = 0
    tagSplitArray = tagSplit
    for(var i = 0; i < tagSplitArray.length; i++){
      if(tagSplitArray[i] != " "){
        notSpaceCount++
      }
  }
    if(notSpaceCount <= 7){
    //no input only space
    return true
    }else{
    // console.log(notSpaceCount)
      return false
    }
    notSpaceCount = 0
  },

  isEmptyOrSpaces(str){
    var pattern =/^ *$/
    return pattern.test(str);  
  }, 

  //REFRESH VALIDATION
  async unloadAdd($event) {
    if (this.checkLeaveAddNewsValidation()) {
    var confirmationMessage = "\o/";
    $event.returnValue = confirmationMessage; 
    return true
    }else{
     return false
    }
    return confirmationMessage;             
  },

  async unloadEdit($event) {
    if (this.checkLeaveEditNewsValidation()) {
    var confirmationMessage = "\o/";
    $event.returnValue = confirmationMessage; 
    return true
    }else{
     return false
    }
    return confirmationMessage;             
  },
  
  getTagsSplit(items){
    if(this.addNewsFields.tags.indexOf(' ') !== -1){
    var tagSplit = this.addNewsFields.tags.split(" ");

    // console.log("tags split: ",tagSplit)
    return tagSplit
    }else{
     return this.addNewsFields.tags
    }
  },


  async clearAllData(){
    this.addNewsFields.headline = ''
    this.addNewsFields.headlineImage = ''
    this.addNewsFields.author = ''
    this.addNewsFields.content = '<p></p>'
    this.addNewsFields.publishDate = this.newDate
    this.addNewsFields.tags = []
    document.getElementById("titleInvalid").style.opacity = "0";
    document.getElementById("textInvalid").style.opacity = "0";
    document.getElementById("authorInvalid").style.opacity = "0";
    document.getElementById("imageInvalid").style.opacity = "0";
    return true
  },

  // SET LANGUAGE
  getNewsLanguage(){
        const data = {
         "query":"query($input:view_languages_fields,$limit:Limit,$sort:sort,$search:search){view_languages(input:$input,limit:$limit,sort:$sort,search:$search){ data { id,keyword,description,date }, success,message, { path,message }, page { items,pageNo,totalPages } sortableFields,searchableFields } }",
      "variables":{
          "input":{
              "code":this.viewLanguageCode || "en",
              "set_name":"news module"
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
    // console.log("getNewsLanguage: ",response)
    this.getNewsLanguageFields.data = response.data.view_languages.data
    //set input first to default language
    this.setDefaultLanguage()
    }).catch((err) => {
    }); 

  },

  setDefaultLanguage(){
    this.setNewsLanguageFields.addNews = 'Add News'
    this.setNewsLanguageFields.author = 'Author'
    this.setNewsLanguageFields.category = 'Category'
    this.setNewsLanguageFields.dateCreated = 'Date Created'
    this.setNewsLanguageFields.datePublish = 'Date Publish'
    this.setNewsLanguageFields.delete = 'Delete'
    this.setNewsLanguageFields.edit = 'Edit'
    this.setNewsLanguageFields.newsCategory = 'News Category'
    this.setNewsLanguageFields.newsManagement = 'News Management'
    this.setNewsLanguageFields.action = 'Action'
    this.setNewsLanguageFields.publish = 'Publish'
    this.setNewsLanguageFields.refresh = 'Refresh'
    this.setNewsLanguageFields.reset = 'Reset'
    this.setNewsLanguageFields.status = 'Status'
    this.setNewsLanguageFields.submit = 'Submit'
    this.setNewsLanguageFields.tags = 'Tags'
    this.setNewsLanguageFields.title = 'Title'
    this.setNewsLanguageFields.unpublish = 'Unpublish'
    this.setNewsLanguageFields.view = 'View'
    this.setNewsLanguage()

  },
  setNewsLanguage(){
   const languageKeys = Object.keys(this.setNewsLanguageFields)
   for(var i = 0; i < languageKeys.length; i++){
      for(var j = 0; j < this.getNewsLanguageFields.data.length; j++){
        if(this.setNewsLanguageFields[languageKeys[i]] == this.getNewsLanguageFields.data[j].keyword){
            this.setNewsLanguageFields[languageKeys[i]] =  this.getNewsLanguageFields.data[j].description
        }
      }
     }
   },



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

  beforeRouteLeave (to, from, next) {
  if(this.checkLeaveAddNewsValidation() || this.checkLeaveEditNewsValidation()){
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
      if(answer){
        next()
      }else{
       next(false)
      }
    }else{
      next()
    }
  },

  beforeMount() {
    window.addEventListener('beforeunload', this.unloadAdd)
    window.addEventListener('beforeunload', this.unloadEdit)
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.unloadAdd)
    window.removeEventListener('beforeunload', this.unloadEdit)
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
        this.getNewsFields.status = false
        this.getNews()
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
      this.getNewsFields.status = false
      this.getNews()
    }
   },

  'viewLanguageCode': function (newValue, oldValue) {
    if(oldValue != newValue){
      this.getNewsLanguage()
    }
  },
  'searchableFields.fieldsToSearch': function (newValue, oldValue) {
    if(oldValue != newValue){
      this.searchableFields.data = ''
      this.tags.dynamicTags = []
      this.tags.inputValue = ''
      this.getNews()
    }
  },
 },
mounted(){
    this.getCategory()
    this.getNews();
    this.getNewsLanguage()
  }
};
</script>
<style scoped>

</style>

