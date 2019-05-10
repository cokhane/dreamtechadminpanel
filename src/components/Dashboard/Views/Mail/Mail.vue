<template>
  <div class="mail">
     <div class="row">
        <div class="card"  style="box-shadow:none">

          <!-- TITLE | NAV -->
          <div class="card-header">
            <div class="row">
              <div class="col-md-4">
                <h2 class="card-title">{{setMailLanguageFields.mailingList}}</h2></div>
              <div class="col-md-4"></div>
              <div class="col-md-4">
                <button class="btn btn-sm" style="float:right;margin-right: 10px;" @click="refreshData()">{{setMailLanguageFields.refresh}}</button>
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
                    </select>
                  </div>
                  <!-- SEARCH SELECT -->
                  <div v-if="!searchableFields.switchSelect"> 
                    <div class="col-md-5" >
                      <div class="input-group">
                        <input type="text" class="form-control" placeholder="Please Input" autofocus="true" v-model="searchableFields.data" v-on:keyup="keyDown">
                        <span class="input-group-addon"><i class="ti-search"></i></span>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <button class="btn" @click="searchData()">{{setMailLanguageFields.submit}}</button>
                      <button class="btn" @click="resetFields()">{{setMailLanguageFields.reset}}</button>
                    </div>
                  </div>
                  <!-- SEARCH SELECT -->

                  <!-- SEARCH DATE -->
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
                           <button class="btn" @click="searchableFieldsDateCombine()">{{setMailLanguageFields.submit}}</button>
                           <button class="btn" @click="resetDateFields()">{{setMailLanguageFields.reset}}</button>
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
                  <th ><span @click="sortData('created')" style="cursor:pointer">{{setMailLanguageFields.dateCreated}} <i style="" :class="(sortableFields.icon.created) ? 'ti-angle-double-up':'ti-angle-double-down'" style="position: relative;top:2px; left: 5px;"></i></span></th>
                  <th ><span  @click="sortData('email')"  style="cursor:pointer">{{setMailLanguageFields.email }} <i style="" :class="(sortableFields.icon.email) ? 'ti-angle-double-up':'ti-angle-double-down'" style="position: relative;top:2px; left: 5px;"></i></span></th>
                  <th>Status</th>
              </tr>
              </thead>
              <!-- SORT TABLE -->

              <!-- TABLE BODY -->
              <tbody>
                <tr v-for="(items,index) in getMailFields.data">
                  <td>
                    {{convertDate(items.created)}}
                  </td>
                  <td>
                    {{items.email}}
                  </td>
                  <td>
                    {{convertMailStatus(items.isDeleted)}}
                  </td>
                </tr>
              </tbody>
              <!-- TABLE BODY -->
            </table>
            <!-- LOADER  -->
            <div  v-if="!getMailFields.status">
              <div class="row" style="text-align: center;">
                <i class="fa fa-spinner fa-spin" style="font-size:24px"></i>
              </div>
            </div>
            <!-- LOADER  -->

            <!-- NO DATA -->
            <div  v-if="getMailFields.dataStatus">
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
                  <select class="form-control" @change="getMail()" v-model="paginationFields.pageLimit">
                    <option v-for="(items,index) in paginationFields.selectFields.array">{{items}}</option>
                  </select>
                </div>
              </div>
           </div>
          <!-- PAGINATION -->

          </div>   
          </div>
        </div>   
      <!-- Card -->
    </div>
  </div>
</div>
</template>
<script>

import axios from 'axios'
import swal from 'sweetalert2'
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'
import {DatePicker, TimeSelect, Slider, Tag, Input, Button, Select, Option} from 'element-ui'
import Vue from 'vue'
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'
import PPagination from 'src/components/UIComponents/Pagination.vue'


export default {
  components:{
   'sweet-modal':SweetModal,
   'sweet-modal-tab': SweetModalTab,
   [DatePicker.name]: DatePicker,
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
        created:true,
        email:true,
      },
      sort:{
        field:'asc' 
      },
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
      getMailLanguageFields:{
          data:''
      },
      setMailLanguageFields:{
        add:'',
        dateCreated:'',
        email:'',
        mail:'',
        mailingList:'',
        pleaseInput:'',
        refresh:'',
        reset:'',
        showingOfEntries:'',
        status:'',
        submit:'',
        of:'',
      },
      getMailFields:{
       data:'',
       status:false,
       dataStatus:true
      }
    }
  },
  computed: {
  ...mapGetters([
    'viewLanguageCode',
    ])
  },
  methods:{
    //CRUD
      getMail(){
          const data = {
            "query":"query($limit:Limit,$sort:sort,$search:search){MailingList(limit:$limit,sort:$sort,search:$search){ data{email,userID,created,isDeleted},success,message{path,message},page{ items,pageNo,totalPages },sortableFields,searchableFields}}",
            "variables":{
              "limit":{
                "to":this.paginationFields.pageLimit, // work
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
        console.log("getMail() ", response)

        this.getMailFields.data = response.data.MailingList.data
        this.paginationFields.pageTotal = response.data.MailingList.page.items
        this.getMailFields.dataStatus = (this.getMailFields.data.length === 0)? true:false
        this.getMailFields.status = true
        this.setPagination()
        this.setPaginationSelect()

    //         this.getMailFields.data = response.data.users.data
    // this.paginationFields.pageTotal = response.data.users.page.items
    // this.getMailFields.dataStatus = (this.getMailFields.data.length === 0)? true:false
    // this.getMailFields.status = true
    // this.setPagination()
    // this.setPaginationSelect()

        }).catch((err) => {
          console.log(err);
        });
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

      //SEARCH
keyDown(event){
  if(event.key == 'Enter'){
    this.getMailFields.status = false
    this.getMail()
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
this.getMailFields.status = false
this.getMail()  
},

searchableFieldsDateCombine(){
var dateCombine = this.convertDate(this.searchableFields.datePicker.from) +"00:00:00"+ "_" + this.convertDate(this.searchableFields.datePicker.to) +"23:59:59"
this.searchableFields.data = dateCombine
// console.log("date combine: ",dateCombine)
this.getMailFields.status = false
this.getMail()
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
    // this.paginationFields.pageTotal = 1
    // this.paginationFields.pageLimit = 5
    // this.paginationFields.pageNumber = 1
    // this.paginationFields.pageNumberTotal = 1
    // this.paginationFields.pageShowingFrom = 1
    // this.paginationFields.pageShowingTo = 1
    // this.paginationFields.pageMinus = 1 
    // this.paginationFields.selectFields.array = []
    // this.searchableFields.fieldsToSearch = 'created'
    // this.searchableFields.data = ''
    // this.searchableFields.switchSelect = true
    // this.searchableFields.datePicker.to = new Date() 
    // this.searchableFields.datePicker.from = new Date()
    // this.sortableFields.fieldsToSort = 'created'
    // this.sortableFields.icon.username = true
    // this.sortableFields.icon.email = true
    // this.sortableFields.icon.created = true
    // this.sortableFields.icon.firstname = true
    // this.sortableFields.icon.lastname = true
    // this.sortableFields.sort.field = 'asc'
    // this.getMailFields.status = false
    // this.getMail()
  },




      //SORT

      sortData(items){
      this.sortableFields.fieldsToSort = items
      switch (this.sortableFields.fieldsToSort) {
         case 'created':
              if(this.sortableFields.icon.dateCreated){
                this.sortableFields.icon.dateCreated = false
                this.sortableFields.sort.field = 'desc'
                this.getMail()
              }else{
                this.sortableFields.icon.dateCreated = true
                this.sortableFields.sort.field = 'asc'
                this.getMail()
              }
            break;
            case 'email':
              if(this.sortableFields.icon.email){
                this.sortableFields.icon.email = false
                this.sortableFields.sort.field = 'desc'
                this.getMail()
              }else{
                this.sortableFields.icon.email = true
                this.sortableFields.sort.field = 'asc'
                this.getMail()
              }
            break;
        case 'isDeleted':
                if(this.sortableFields.icon.isDeleted){
                this.sortableFields.icon.isDeleted = false
                this.sortableFields.sort.field = 'desc'
                this.getMail()
              }else{
                this.sortableFields.icon.isDeleted = true
                this.sortableFields.sort.field = 'asc'
                this.getMail()
              }
            break;
        default:
            break;
        }
      },

      convertMailStatus(items){
        if(items == null){
          return "SUBSCRIBE"
        }else{
          return "UNSUBSCRIBE"
        }
      },

      getMailLanguage(){
        const data = {
         "query":"query($input:view_languages_fields,$limit:Limit,$sort:sort,$search:search){view_languages(input:$input,limit:$limit,sort:$sort,search:$search){ data { id,keyword,description,date }, success,message, { path,message }, page { items,pageNo,totalPages } sortableFields,searchableFields } }",
      "variables":{
          "input":{
              "code":this.viewLanguageCode || "en",
              "set_name":"mail module"
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
      // console.log("getTokenSettingsLanguage: ",response)
      this.getMailLanguageFields.data = response.data.view_languages.data
      this.setDefaultLanguage()

      }).catch((err) => {

      }); 

    },

    setDefaultLanguage(){
      this.setMailLanguageFields.add = "Add"
      this.setMailLanguageFields.dateCreated = "Date Created"
      this.setMailLanguageFields.email = "Email"
      this.setMailLanguageFields.mail = "Mail"
      this.setMailLanguageFields.mailingList = "Mailing List"
      this.setMailLanguageFields.pleaseInput = "Please Input"
      this.setMailLanguageFields.refresh = "Refresh"
      this.setMailLanguageFields.reset = "Reset"
      this.setMailLanguageFields.showingOfEntries = "Showing of Entries"
      this.setMailLanguageFields.status = "Status"
      this.setMailLanguageFields.submit = "Submit"
      this.setMailLanguage()
    },

    setMailLanguage(){
       const languageKeys = Object.keys(this.setMailLanguageFields)
       for(var i = 0; i < languageKeys.length; i++){
        for(var j = 0; j < this.getMailLanguageFields.data.length; j++){
          if(this.setMailLanguageFields[languageKeys[i]] == this.getMailLanguageFields.data[j].keyword){
              this.setMailLanguageFields[languageKeys[i]] =  this.getMailLanguageFields.data[j].description
          }
        }
      }
    }

  },
// METHOD
  
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
    this.getMailFields.status = false
    this.getMail()
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
    this.getMailFields.status = false
    this.getMail()
  }
},

'searchableFields.fieldsToSearch': function (newValue, oldValue) {
  if(oldValue != newValue){
    this.searchableFields.data = ''
    this.getMail()
  }
},
},

mounted(){
  this.getMail()
  this.getMailLanguage()
}
}
</script>
<style>
</style>
