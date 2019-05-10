<template>
  <div class="contacts">
      <div class="row">
      <div class="col-md-12">
        <div class="card"  style="box-shadow:none">
         <div class="card-header">
          <div class="row">
            <div class="col-md-4">
               <h2 class="card-title">{{setContactUsLanguageFields.contactUs}}</h2>
            </div>
            <div class="col-md-4">
            </div>
            <div class="col-md-4">
              <button class="btn btn-sm" style="float:right;margin-right: 10px;" @click="refreshData()">{{setContactUsLanguageFields.refresh}}</button>
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
                  </div>
                  <div class="col-md-2" >
                     <select class="form-control" @change="pageLoadingState()" v-model="searchableFields.fieldsToSearch">
                      <option value="created">date created</option>
                      <option >email</option>
                      <option >firstname</option>
                      <option >lastname</option>
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
                      <button class="btn" @click="searchData()">{{setContactUsLanguageFields.submit}}</button>
                      <button class="btn" @click="resetFields()">{{setContactUsLanguageFields.reset}}</button>
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
                         <button class="btn" @click="searchableFieldsDateCombine()">{{setContactUsLanguageFields.submit}}</button>
                         <button class="btn" @click="resetDateFields()">{{setContactUsLanguageFields.reset}}</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- SEARCH -->
          <hr style="margin-top: 12px;">
          <!-- ROW -->
          <div style="padding:10px;margin:10px" class="table-responsive">
           <table class="table table-striped table-bordered table-hover">
            <thead class="">
              <tr>
                 <th ><span style="cursor:pointer">Date Created <i style="" :class="(sortableFields.icon.dateCreated) ? 'ti-angle-double-up':'ti-angle-double-down'" style="position: relative;top:2px; left: 5px;"></i></span></th>
                 <th ><span  @click="sortData('email')"  style="cursor:pointer">{{setContactUsLanguageFields.reset}}<i style="" :class="(sortableFields.icon.email) ? 'ti-angle-double-up':'ti-angle-double-down'" style="position: relative;top:2px; left: 5px;"></i></span></th>
                 <th ><span  @click="sortData('fullname')"  style="cursor:pointer">{{setContactUsLanguageFields.fullName}} <i style="" :class="(sortableFields.icon.fullname) ? 'ti-angle-double-up':'ti-angle-double-down'" style="position: relative;top:2px; left: 5px;"></i></span></th>
                 <!-- <th >{{setContactUsLanguageFields.mobileNumber}}</th> -->
                 <th >{{setContactUsLanguageFields.message}}</th>
                <th >{{setContactUsLanguageFields.action}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(items,index) in getContactUsFields.data">
                <td>
                  {{convertCreated(items.created)}}
                </td>
                <td>
                  {{items.email}}
                </td>
                <td>
                  {{convertFullname(items.fullname)}}
                </td>
<!--                 <td >
                  {{items.mobilenumber}}
                </td> -->
                <td>
                  {{items.message}}
                </td>
                <td>
                  <button class="btn btn-sm" @click="openContactUsPreviewModal(items)">{{setContactUsLanguageFields.view}}</button>
                  <button class="btn btn-sm" @click="deleteContactUsModal(items)" >{{setContactUsLanguageFields.delete}}</button>
                </td>
              </tr>
            </tbody>
          </table>
          
            <!-- PAGINATION -->
<!--             <div class="row">
              <div class="col-md-3">
                <p>[Pagination Not Working]</p>
              <p-pagination type="default" :page-count="10" v-model="pagination.infoPagination" disabled></p-pagination>
              </div>
               <div class="col-md-2"  style="float:right; margin-top:45px">
                <div class="form-group">
                  <select class="form-control" @change="getMail()" v-model="sortableFields.limit.pageLimit" disabled="true">
                    <option>5</option>
                    <option>10</option>
                    <option>15</option>
                    <option>20</option>
                    <option>25</option>
                  </select>
                  </div>
               </div>
             </div> -->
            <!-- PAGINATION -->

          </div>   
      </div>
        <!-- Card -->
      </div>
      <!-- Column  -->
    </div>
    <!-- Row -->

    <!-- Modal -->
      <sweet-modal ref="contactUsPreviewModal"  modal-theme="light">
      <div class="card" style="box-shadow:none">
    <div class="card-header">
      <h4 class="title">View User Profile</h4>
    </div>
    <div class="card-content">
      <form>
          <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="Date Created" 
                      placeholder="Date Created" 
                      v-model="previewContactUsFields.dateCreated"
                      disabled>
            </fg-input>
          </div>
          <div class="col-md-6">
          <fg-input type="email"
                    label="Email"
                    placeholder="Email" 
                    v-model="previewContactUsFields.email"
                    disabled>
          </fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="Full Name" 
                      placeholder="Full Name" 
                      v-model="previewContactUsFields.fullname"
                      disabled>
            </fg-input>
          </div>
          <div class="col-md-6">
          <fg-input type="email"
                    label="Mobile Number"
                    placeholder="Mobile Number" 
                    v-model="previewContactUsFields.mobileNumber"
                    disabled>
          </fg-input>
          </div>
        </div>

        <div class="row">
            <div class="col-md-12">
              <label>Message</label>
             <div class="form-group">
               <textarea rows="5" class="form-control border-input"
               v-model="previewContactUsFields.message"
                placeholder="Enter Description" disabled>    
                </textarea>
              </div>
          </div>
        </div>   
      </form>
    </div>
  </div>
  </sweet-modal>
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

export default {
  components:{
   'sweet-modal':SweetModal,
   'sweet-modal-tab': SweetModalTab,
   [DatePicker.name]: DatePicker,
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
      getContactUsLanguageFields:{
        data:''
      },
      setContactUsLanguageFields:{
        action:'',
        contactUs:'',
        delete:'',
        email:'',

        fullName:'',
        message:'',
        mobileNumber:'',
        pleaseInput:'',
        refresh:'',
        reset:'',
        showingOfEntries:'',
        submit:'',
        view:'',
        of:'',
      },
      pagination:{
        infoPagination:1
      },
       sortableFields:{
          fieldsToSort: 'email', 
        icon:{
          dateCreated:true,
          email:true,
          fullname:true,
          message:true
        },
          sort:{
            field:'asc' 
        },
        limit:{
            pageLimit:'5',
            pageNumber:'1',
            lastIdNumber:''
        },
       },
       getContactUsFields:{
        data:'',
        page:''
       },
       deleteContactUsFields:{
        array:[]
       },
       previewContactUsFields:{
         dateCreated:'',
         email:'',
         fullname:'',
         mobileNumber: '',
         message:''
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
            case 'email':
                  if(this.sortableFields.icon.email){
                    this.sortableFields.icon.email = false
                    this.sortableFields.sort.field = 'desc'
                    this.getContactUs()
                  }else{
                    this.sortableFields.icon.email = true
                    this.sortableFields.sort.field = 'asc'
                    this.getContactUs()
                  }
                break;
            case 'fullname':
                    if(this.sortableFields.icon.fullname){
                    this.sortableFields.icon.fullname = false
                    this.sortableFields.sort.field = 'desc'
                    this.getContactUs()
                  }else{
                    this.sortableFields.icon.fullname = true
                    this.sortableFields.sort.field = 'asc'
                    this.getContactUs()
                  }
                break;
            default:
                break;
        }
    },
  //CONVERTER

  convertCreated(items){
    if(items == null){
        return "No Data Found"
      }else{
        return items
      }
  },
  convertFullname(items){
    // console.log(items)
      if(items == null){
        return "No Data Found"
      }else{
        return items
      }
  },

  //CRUD
  getContactUs(){
    const data = {
         "query":"query($limit:Limit,$sort:sort,$search:search){ReadMessages(limit:$limit,sort:$sort,search:$search){data{id,email,fullname,firstname,lastname,company,mobilenumber,subject,message,address,qq,skype,created},success,message{path,message},page{items,pageNo,totalPages},sortableFields,searchableFields}}",
        "variables":{
            "limit":{
                "to":5,
                "page":3
            },
            "sort":{
                "field":"created",
              "by":"asc"
            },
            "search":{
                "by":"",
                "text":""
            }
        }
    }
    axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
    console.log("getContactUs: ", response)
    this.getContactUsFields.data = response.data.ReadMessages.data
    }).catch((err) => {
      console.log(err);
    });
  },

  async deleteContactUs(){
  const data = {
    "query":"mutation($input:[String!]!) { DeleteMessage( input:$input ) { message,errors { Path,Message } } }",
    "variables":{
      "input":this.deleteContactUsFields.array
    }
  }
  return await axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
  // console.log("deleteContactUs: ", response)
  if(response.data.errors){
    return true
  }else{
    return false
  }
  }).catch((err) => {
    console.log(err);
  });
  },

     //MODAL
    async deleteContactUsModal(items){
      this.deleteContactUsFields.array.push(items.id)
      // console.log(items)
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
      if(await this.deleteContactUs())
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
          this.getContactUs()
        },()=>{
            this.getContactUs()
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

      //OPEN MODAL

    openContactUsPreviewModal(items){
     // console.log("open preview: ", items)
     this.previewContactUsFields.dateCreated = "No Data Found"
     this.previewContactUsFields.email = items.email
     this.previewContactUsFields.fullname = this.convertFullname(items.fullname) 
     this.previewContactUsFields.mobileNumber = items.mobilenumber
     this.previewContactUsFields.message = items.message
     this.$refs.contactUsPreviewModal.open()
    },

    //CLOSE MODAL

    //LANGUAGE
    getContactUsLanguage(){
          const data = {
         "query":"query($input:view_languages_fields,$limit:Limit,$sort:sort,$search:search){view_languages(input:$input,limit:$limit,sort:$sort,search:$search){ data { id,keyword,description,date }, success,message, { path,message }, page { items,pageNo,totalPages } sortableFields,searchableFields } }",
      "variables":{
          "input":{
              "code":this.viewLanguageCode || "en",
              "set_name":"contact us module"
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
      // console.log("getContactUsLanguage: ",response)
      this.getContactUsLanguageFields.data = response.data.view_languages.data
      this.setDefaultLanguage()

      }).catch((err) => {

      }); 
    },

    setDefaultLanguage(){
      this.setContactUsLanguageFields.action = "Action"
      this.setContactUsLanguageFields.contactUs = "Contact Us"
      this.setContactUsLanguageFields.delete = "Delete"
      this.setContactUsLanguageFields.email = "Email"
      this.setContactUsLanguageFields.fullName = "Full Name"
      this.setContactUsLanguageFields.message = "Message"
      this.setContactUsLanguageFields.mobileNumber = "Mobile Number"
      this.setContactUsLanguageFields.pleaseInput = "Please Input"
      this.setContactUsLanguageFields.refresh = "Refresh"
      this.setContactUsLanguageFields.reset = "Reset"
      this.setContactUsLanguageFields.showingOfEntries = "Showing of entries"
      this.setContactUsLanguageFields.submit = "Submit"
      this.setContactUsLanguageFields.view = "View"
      this.setContactUsLanguageFields.of = "of"
      this.setContactUsLanguage()

    },
    setContactUsLanguage(){
         const languageKeys = Object.keys(this.setContactUsLanguageFields)
         for(var i = 0; i < languageKeys.length; i++){
            for(var j = 0; j < this.getContactUsLanguageFields.data.length; j++){
              if(this.setContactUsLanguageFields[languageKeys[i]] == this.getContactUsLanguageFields.data[j].keyword){
                  this.setContactUsLanguageFields[languageKeys[i]] =  this.getContactUsLanguageFields.data[j].description
              }
            }
        }
    }
  },

  watch: {
    'viewLanguageCode': function (newValue, oldValue) {
    if(oldValue != newValue){
      this.getContactUsLanguage()
    }
  },
},
mounted(){
this.getContactUs()
this.getContactUsLanguage()
}
};
</script>
<style>
</style>
