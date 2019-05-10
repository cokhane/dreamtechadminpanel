<template>
  <div class="token-set">
  <div class="row">
    <div class="card">
      <ul class="nav nav-tabs">
        <li class="active">
         <router-link to="/tokens/airdrop" >{{setAirdropLanguageFields.airdrop}}</router-link>
        </li>
        <li>
          <router-link to="/tokens/bountryprogam">{{setAirdropLanguageFields.bountyProgam}}</router-link>
        </li>
         <li >
          <router-link to="/tokens/settings">{{setAirdropLanguageFields.tokenSettings}}</router-link>
        </li>
      </ul>
      <div class="tab-content">
       <div class="row">
      <div class="col-md-12">
        <div class="card"  style="box-shadow:none">
         <div class="card-header">
          <div class="row">
            <div class="col-md-4">
               <h2 class="card-title">{{setAirdropLanguageFields.airdrop}}</h2>
            </div>
            <div class="col-md-4">
            </div>
            <div class="col-md-4">
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
                      <button class="btn" @click="searchData()">{{setAirdropLanguageFields.submit}}</button>
                      <button class="btn" @click="resetFields()">{{setAirdropLanguageFields.reset}}</button>
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
                         <button class="btn" @click="searchableFieldsDateCombine()">{{setAirdropLanguageFields.submit}}</button>
                         <button class="btn" @click="resetDateFields()">{{setAirdropLanguageFields.reset}}</button>
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
                <th ><span  @click="sortData('created')" style="cursor:pointer">{{setAirdropLanguageFields.dateCreated}}<i style="" :class="(sortableFields.icon.created) ? 'ti-angle-double-up':'ti-angle-double-down'" style="position: relative;top:2px; left: 5px;"></i></span></th>
                 <th ><span  @click="sortData('exp')" style="cursor:pointer">{{setAirdropLanguageFields.expirationDate}}<i style="" :class="(sortableFields.icon.expirationDate) ? 'ti-angle-double-up':'ti-angle-double-down'" style="position: relative;top:2px; left: 5px;"></i></span></th>
                <th>Status</th>
                <th ><span  @click="sortData('totalSupply')" style="cursor:pointer">{{setAirdropLanguageFields.totalSupply}}<i style="" :class="(sortableFields.icon.totalSupply) ? 'ti-angle-double-up':'ti-angle-double-down'" style="position: relative;top:2px; left: 5px;"></i></span></th>
                <th>{{setAirdropLanguageFields.userId}}</th>
                <th>{{setAirdropLanguageFields.action}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(items,index) in getAirdropFields.data">
                <td>
                  {{convertDate(items.created)}}
                </td>
                <td>
                  {{convertDate(items.exp)}}
                </td>
                <td>
                  {{items.status}}
                </td>
                <td >
                  {{items.totalSupply}}
                </td>
                <td >
                  <div v-for="(itemsChild,index) in items.userID">
                    <ul>
                      <li>
                    {{itemsChild}}
                      </li>
                    </ul>
                  </div>
                </td>
                <td>
                  <button class="btn btn-sm" @click="openAirdropUpdateModal(items)">{{setAirdropLanguageFields.edit}}</button>
                  <button class="btn btn-sm" @click="enableAirdropModal(items)"  v-if="!items.status" >{{setAirdropLanguageFields.enable}}</button>
                  <button class="btn btn-sm" @click="disableAirdropModal(items)"  v-if="items.status" >{{setAirdropLanguageFields.disable}}</button>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- PAGINATION -->
<!--             <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-3"></div>
              <div class="col-md-2"></div>
               <div class="col-md-1"  style="float:right">
                <div class="form-group">
                  <select class="form-control" @change="getUser()" v-model="sortableFields.limit.pageLimit">
                    <option>7</option>
                    <option>20</option>
                    <option>30</option>
                    <option>50</option>
                    <option>80</option>
                  </select>
                  </div>
               </div>
                  <div class="col-md-3" >
               <div class="btn-group" style="float:right;margin-top: 7px;">
                <button type="button" class="btn btn-default  btn-sm btn-move-left" @click="sortableFields.limit.pageNumber > 1 ? sortableFields.limit.pageNumber-- : 1,getUser()">
                  <span class="btn-label"> <i class="ti-angle-left"></i> </span>
                </button>
                 <button type="button" class="btn btn-default  btn-sm btn-move-left">
                  <span class="btn-label">{{sortableFields.limit.pageNumber}}</span>
                </button>
                <button type="button" class="btn btn-default btn-sm btn-move-right" @click="sortableFields.limit.pageNumber++,getUser()">
                  <span class="btn-label"> <i class="ti-angle-right"></i></span>
                </button>
               </div>
              </div>
          </div> -->
          </div>   
      </div>
      </div>
    </div>
      </div>
    </div> 
  </div>
    <sweet-modal ref="updateAirdropModal"  modal-theme="light">
      <div class="card" style="box-shadow:none">
    <div class="card-header">
      <h4 class="title">Update Airdrop</h4>
      <hr> 
    </div>
    <div class="card-content">
      <form>
          <div class="row">
          <div class="col-md-6">
                <label style="">Expiration Date</label> <br/>
              <el-date-picker v-model="airdropUpdateFields.expirationDate" type="date"  placeholder="Pick a day"
                :picker-options="pickerOptions1">
              </el-date-picker>
          </div>
          <div class="col-md-6">
          <fg-input type="Total"label="Supply" placeholder="Email" v-model="airdropUpdateFields.totalSupply">
          </fg-input>
          </div>
        
        </div>
      </form>
        <div style="margin-top:50px">
          <button class="btn" style="float:right" @click="updateAirdropModal()">Save</button>
         </div>
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
        getAirdropLannguageFields:{
          data:''
        },
        setAirdropLanguageFields:{
          action:'',
          airdrop:'',
          bountyProgam:'',
          dateCreated:'',
          edit:'',
          enable:'',
          expirationDate:'',
          disable:'',
          pleaseInput:'',
          reset:'',
          showingOfEntries:'',
          status:'',
          submit:'',
          totalSupply:'',
          tokenSettings:'',
          userId:'',
          of:''
        },
       
      getAirdropFields:{
        data:''
      },
      airdropUpdateFields:{
        totalSupply:'',
        expirationDate:''
      },
      airdropEnableFields:{
        id:''
      },
     airdropDisableFields:{
        id:''
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
        case 'created':
          if(this.sortableFields.icon.created){
            this.sortableFields.icon.created = false
            this.sortableFields.sort.field = 'desc'
            this.getAirdrop()
          }else{
            this.sortableFields.icon.created = true
            this.sortableFields.sort.field = 'asc'
            this.getAirdrop()
          }
          break;
      case 'exp':
        if(this.sortableFields.icon.expirationDate){
          this.sortableFields.icon.expirationDate = false
          this.sortableFields.sort.field = 'desc'
          this.getAirdrop()
        }else{
          this.sortableFields.icon.expirationDate = true
          this.sortableFields.sort.field = 'asc'
          this.getAirdrop()
        }
        break;
        case 'totalSupply':
        if(this.sortableFields.icon.totalSupply){
          this.sortableFields.icon.totalSupply = false
          this.sortableFields.sort.field = 'desc'
          this.getAirdrop()
        }else{
          this.sortableFields.icon.totalSupply = true
          this.sortableFields.sort.field = 'asc'
          this.getAirdrop()
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
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return month + "/"+ day + "/"+ year;
    },

    convertFormatedDate(date_var){
      var d = new Date(date_var),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      today = '' + d.getDay().toString();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      // console.log("date converter:", month + "."+ day + "."+ year)


      return month + "."+ day + "."+ year;
    },

    //CRUD

    updateAirdrop(){
      const data = {
        "query":"mutation($id:String!,$input:airdropDetails!){updateAirdrop(id:$id,input:$input){ message,errors { Path,Message } } }",
        "variables":{
          "id":"a5ba9d94b359e7c27a89586ada",
          "input":{
              "expDate":this.convertFormatedDate(this.airdropUpdateFields.expirationDate),
              "totalSupply": this.airdropUpdateFields.totalSupply
          }
        }
      }
      axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
      // console.log("updateAirdrop: ", response)
      }).catch((err) => {
        console.log(err);
      });
    },

    getAirdrop(){
      const data = {
        "query":"query($limit:Limit,$sort:sort,$search:search){getAirdrop(limit:$limit,sort:$sort,search:$search){ data{ id userID exp totalSupply created status } page { items pageNo totalPages} sortableFields searchableFields }}",
        "variables":{
            "limit":{
                "to":7,
                "page":1
            },
            "sort":{
              "field":this.sortableFields.fieldsToSort,
              "by": this.sortableFields.sort.field
            },
            "search":{
                "by":"",
                "text":""
            }
        }
      }
      axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
      // console.log("getAirdrop: ", response)
      this.getAirdropFields.data = response.data.getAirdrop.data
      }).catch((err) => {
        console.log(err);
      });
    },
    async enableAirdrop(){
      const data = {
       "query":"mutation($id:String!){enableAirdrop(id:$id){ message errors{Path Message}}}",
       "variables":{
            "id":this.airdropEnableFields.id
        }
      }
      return await axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
      // console.log("enableAirdrop: ", response)
      if(response.data.enableAirdrop.errors){
        return true
      }else{
        return false
      }
      }).catch((err) => {
        console.log(err);
      });
    },

    disableAirdrop(){
      const data = {
        "query":"mutation($id:String!){disableAirdrop(id:$id){ message errors{Path Message}}}",
        "variables":{
            "id":this.airdropDisableFields.id
        }
      }
      axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
      // console.log("disableAirdrop: ", response)
      }).catch((err) => {
        console.log(err);
      });
    },

    //OPEN MODAL
    openAirdropUpdateModal(items){
      // console.log("update modal", items.exp)
      this.airdropUpdateFields.expirationDate = items.exp
      this.airdropUpdateFields.totalSupply = items.totalSupply
      this.$refs.updateAirdropModal.open()
    },

    //MODAL

    async updateAirdropModal(){
      if(await this.updateAirdrop()){
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
        this.getAirdrop()
        this.$refs.updateAirdropModal.close()
      })
     }
    },

    async enableAirdropModal(items){
     this.airdropEnableFields.id = items.id
      if(await this.enableAirdrop()){
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
        this.getAirdrop()
      })
     }
    },

    async disableAirdropModal(items){
     this.airdropDisableFields.id = items.id
      if(await this.disableAirdrop()){
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
        this.getAirdrop()
      })
     }
    },

    getAirdropLanguage(){
        const data = {
         "query":"query($input:view_languages_fields,$limit:Limit,$sort:sort,$search:search){view_languages(input:$input,limit:$limit,sort:$sort,search:$search){ data { id,keyword,description,date }, success,message, { path,message }, page { items,pageNo,totalPages } sortableFields,searchableFields } }",
      "variables":{
          "input":{
              "code":this.viewLanguageCode || "en",
              "set_name":"airdrop module"
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
    // console.log("getAirdropLannguage: ",response)
    this.getAirdropLannguageFields.data = response.data.view_languages.data
    this.setDefaultLanguage()
    }).catch((err) => {

    }); 

  },

  setDefaultLanguage(){

    this.setAirdropLanguageFields.action = "Action"
    this.setAirdropLanguageFields.airdrop = "Airdrop"
    this.setAirdropLanguageFields.bountyProgam = "Bounty Program"
    this.setAirdropLanguageFields.dateCreated = "Date Created"
    this.setAirdropLanguageFields.edit = "Edit"
    this.setAirdropLanguageFields.enable = "Enable"
    this.setAirdropLanguageFields.expirationDate = "Expiration Date"
    this.setAirdropLanguageFields.disable = "Disable"
    this.setAirdropLanguageFields.pleaseInput = " Please Input"
    this.setAirdropLanguageFields.reset = "Reset"
    this.setAirdropLanguageFields.showingOfEntries = "Showing of Entries"
    this.setAirdropLanguageFields.status = "Status"
    this.setAirdropLanguageFields.submit = "Submit"
    this.setAirdropLanguageFields.totalSupply = "Total Supply"
    this.setAirdropLanguageFields.tokenSettings = "Token Settings"
    this.setAirdropLanguageFields.userId = "User ID"
    this.setAirdropLanguageFields.of = "of"

    this.setAirdropLanguage()

  },


  setAirdropLanguage(){
     const languageKeys = Object.keys(this.setAirdropLanguageFields)
     for(var i = 0; i < languageKeys.length; i++){
        for(var j = 0; j < this.getAirdropLannguageFields.data.length; j++){
          if(this.setAirdropLanguageFields[languageKeys[i]] == this.getAirdropLannguageFields.data[j].keyword){
              this.setAirdropLanguageFields[languageKeys[i]] =  this.getAirdropLannguageFields.data[j].description
          }
        }
      }
    }
  },

  watch: {
    'viewLanguageCode': function (newValue, oldValue) {
    if(oldValue != newValue){
      this.getAirdropLanguage()
    }
   },
  },
  mounted(){
   this.getAirdrop()
   this.getAirdropLanguage()
  }
};
</script>
<style>
</style>
