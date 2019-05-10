<template>
  <div class="child-language">
    <!-- ROW -->
    <div class="row">
      <!-- CARD -->
      <div class="card">
        <!-- TITLE | NAV -->
        <div class="card-header">
          <div class="row">
            <div class="col-md-4">
              <h2 class="card-title">{{this.$route.params.setname}}</h2>
              <div style="margin-top:15px">
                <label>Select Language:</label>
                <select @change="getLanguageCode()" v-model="viewSetLanguageFields.vmodel" class="form-control">
                  <option v-for="items in viewSetLanguageFields.data">{{items.full}}</option>
                </select>
              </div>
            </div>
            <div class="col-md-4"></div>
            <div class="col-md-4">
              <button class="btn btn-sm" style="float:right;margin-right: 10px;" @click="refreshData()">{{setKeywordLanguageFields.reset}}</button>
              <button class="btn btn-sm" style="float:right;margin-right: 5px;" @click="openAddKeywordModal()">{{setKeywordLanguageFields.addKeyword}}</button>
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
                  <option value="date">date created</option>
                  <option>keyword</option>
                  <option>description</option>
                </select>
              </div>
              <!-- SEARCH SELECT -->
              <!-- SEARCH SWITCH -->
              <div v-if="!searchableFields.switchSelect">
                <div class="col-md-5">
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="Please Input" autofocus="true" v-model="searchableFields.data" v-on:keyup="keyDown">
                    <span class="input-group-addon"><i class="ti-search"></i></span>
                  </div>
                </div>
                <div class="col-md-3">
                  <button class="btn" @click="searchData()">{{setKeywordLanguageFields.submit}}</button>
                  <button class="btn" @click="resetFields()">{{setKeywordLanguageFields.reset}}</button>
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
                          <el-date-picker v-model="searchableFields.datePicker.from" type="date" placeholder="Pick a day" :picker-options="pickerOptions1">
                          </el-date-picker>
                        </div>
                      </li>
                      <li>
                        <div>
                          <label> to:</label>
                          <el-date-picker v-model="searchableFields.datePicker.to" type="date" placeholder="Pick a day" :picker-options="pickerOptions1">
                          </el-date-picker>
                        </div>
                      </li>
                      <li>
                        <button class="btn" @click="searchableFieldsDateCombine()">{{setKeywordLanguageFields.submit}}</button>
                        <button class="btn" @click="resetDateFields()">{{setKeywordLanguageFields.reset}}</button>
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
        <div style="padding:20px;margin:20px" class="table-responsive text-left">
          <table class="table table-bordered table-hover table-striped">
            <thead>
              <tr>
                <th>
                  <span @click="sortData('date')" style="cursor:pointer">{{setKeywordLanguageFields.dateCreated}}<i style="" :class="(sortableFields.icon.date) ? 'ti-angle-double-up':'ti-angle-double-down'" style="position: relative;top: 2px; left: 5px;"></i></span>
                </th>
                <th>
                  <span @click="sortData('keyword')" style="cursor:pointer">{{setKeywordLanguageFields.keyword}}<i style="" :class="(sortableFields.icon.keyword) ? 'ti-angle-double-up':'ti-angle-double-down'" style="position: relative;top: 2px; left: 5px;"></i></span>
                </th>
                <th>
                  <span @click="sortData('description')" style="cursor:pointer">{{setKeywordLanguageFields.description}}<i style="" :class="(sortableFields.icon.description) ? 'ti-angle-double-up':'ti-angle-double-down'" style="position: relative;top: 2px; left: 5px;"></i></span>
                </th>
                <th>{{setKeywordLanguageFields.action}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(items,index) in getKeywordFields.data" v-if="getKeywordFields.status">
                <td>
                  {{convertDate(items.date)}}
                </td>
                <td>
                  {{items.keyword}}
                </td>
                <td v-html="items.description">
                </td>
                <td>
                  <button class="btn btn-default btn-sm" @click="openEditKeywordModal(items)">{{setKeywordLanguageFields.edit}}</button>
                  <button class="btn btn-default btn-sm" @click="deleteKeywordModal(items)">{{setKeywordLanguageFields.delete}}</button>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- LOADER  -->
          <div v-if="!getKeywordFields.status">
            <div class="row" style="text-align: center;">
              <i class="fa fa-spinner fa-spin" style="font-size:24px"></i>
            </div>
          </div>
          <!-- LOADER  -->
          <!-- NO DATA -->
          <div v-if="getKeywordFields.dataStatus">
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
            <div class="col-md-2" style="float:right; margin-top:45px">
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
      <!-- CARD -->
    </div>
    <!-- ROW -->
    <sweet-modal ref="addKeywordModal" modal-theme="light" width="50%" hide-close-button blocking>
      <div class="card" style="margin-top: 30px;box-shadow:none">
        <div class="card-header" style="text-align: left; ">
          <h4 class="card-title" style="margin-bottom: 20px">Add Keyword</h4>
          <div class="form-group">
            <input type="text" class="form-control" v-model="addKeywordFields.keyword" autofocus>
          </div>
        </div>
        <div class="card-content">
          <textarea class="form-control" v-model="addKeywordFields.description"></textarea>
        </div>
      </div>
      <div style="float:right">
        <button class="btn btn-md btn-fill btn-primary" @click="addKeywordModal()">Save</button>
        <button class="btn btn-md btn-fill btn-danger" @click="closeAddKeywordModal()">Cancel</button>
      </div>
    </sweet-modal>
    <sweet-modal ref="editKeywordModal" modal-theme="light" width="50%" hide-close-button blocking>
      <div class="card" style="margin-top: 30px;box-shadow:none">
        <div class="card-header" style="text-align: left; ">
          <h4 class="card-title" style="margin-bottom: 20px">Edit Keyword</h4>
          <div class="form-group">
            <input type="text" class="form-control" v-model="editKeywordFields.keyword">
          </div>
        </div>
        <div class="card-content">
          <textarea class="form-control" v-model="editKeywordFields.description"></textarea>
        </div>
      </div>
      <div style="float:right">
        <button class="btn btn-md btn-fill btn-primary" @click="editKeywordModal()">Save</button>
        <button class="btn btn-md btn-fill btn-danger" @click="closeEditKeywordModal()">Cancel</button>
      </div>
    </sweet-modal>
  </div>
</template>
<script>
import Vue from 'vue'
import { Table, TableColumn } from 'element-ui'
import PSwitch from 'src/components/UIComponents/Switch.vue'
import swal from 'sweetalert2'
import axios from 'axios';
import PProgress from 'src/components/UIComponents/Progress.vue'
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'
import { VueEditor } from 'vue2-editor'
import { DatePicker, TimeSelect, Slider, Tag, Input, Button, Select, Option } from 'element-ui'
import PPagination from 'src/components/UIComponents/Pagination.vue'
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

Vue.use(Table)
Vue.use(TableColumn)
export default {
    computed: {
    ...mapGetters([
    'viewLanguageCode',
    'viewNavPanel'
    ])
  },
  components: {
    'sweet-modal': SweetModal,
    'sweet-modal-tab': SweetModalTab,
    'vue-editor': VueEditor,
    [DatePicker.name]: DatePicker,
    'sweet-modal': SweetModal,
    'sweet-modal-tab': SweetModalTab,
    PPagination
  },
  /*  
        />____
  [#####[]____ COMPONENTS
        \>                     
  */
  data() {
    return {
      paginationFields: {
        pageTotal: 1,
        pageLimit: 5,
        pageNumber: 1,
        pageNumberTotal: 1,
        pageShowingFrom: 1,
        pageShowingTo: 1,
        pageMinus: 1,
        selectFields: {
          array: []
        }
      },
      getKeywordLanguageFields:{
        data: '',
      },
      setKeywordLanguageFields:{
        action:'',
        addKeyword:'',
        dateCreated:'',
        delete:'',
        description:'',
        edit:'',
        keyword:'',
        pleaseInput:'',
        refresh:'',
        reset:'',
        submit:'',
      },
      searchableFields: {
        fieldsToSearch: 'date',
        data: '',
        switchSelect: true,
        datePicker: {
          to: new Date(),
          from: new Date()
        }
      },
      sortableFields: {
        fieldsToSort: 'date',
        icon: {
          date: true,
          keyword: true,
          description: true
        },
        sort: {
          field: 'asc'
        },
      },
      sortFields: {
        pageNumber: 1,
        pageLimit: 20,
        sort: 'asc',
        by: 'name'
      },
      addKeywordFields: {
        keyword: '',
        description: ''
      },
      deleteKeywordFields: {
        id: '',
        keyword: ''
      },
      editKeywordFields: {
        keyword: '',
        description: ''
      },
      viewSetLanguageFields: {
        id: '',
        data: '',
        vmodel: 'English',
        query: 'en'
      },
      getKeywordFields: {
        data: '',
        status: false,
        dataStatus: false
      },
      pickerOptions1: {
        shortcuts: [{
            text: 'Today',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: 'Yesterday',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: 'A week ago',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      }
    }
  },
  /*  
        />____
  [#####[]____ DATA
        \>                     
  */
  methods: {
    //CRUD  
    setViewLanguage() {
      const data = {
        "query": "query($limit:Int,$page:Int){view_language_code(filters:{limit:$limit,page:$page}){code,full}}",
        "variables": {
          "limit": 150,
          "page": 1,
        }
      }
      axios.post(this.post_url, JSON.stringify(data), this.post_config_auth).then((response) => {
        this.viewSetLanguageFields.data = response.data.view_language_code
      }).catch((err) => {
        console.log(err)
      });
    },
    async getKeyword() {
      const data = {
        "query": "query($input:view_languages_fields,$limit:Limit,$sort:sort,$search:search){view_languages(input:$input,limit:$limit,sort:$sort,search:$search){ data { id,keyword,description,date }, success,message, { path,message }, page { items,pageNo,totalPages } sortableFields,searchableFields } }",
        "variables": {
          "input": {
            "code": this.viewSetLanguageFields.query,
            "set_name": this.$route.params.setname
          },
          "limit": {
            "to": this.paginationFields.pageLimit,
            "page": this.paginationFields.pageNumber
          },
          "sort": {
            "field": this.sortableFields.fieldsToSort,
            "by": this.sortableFields.sort.field
          },
          "search": {
            "by": "",
            "text": ""
          }
        }
      }
      return await axios.post(this.post_url, JSON.stringify(data), this.post_config_auth).then((response) => {
        console.log("getKeyword: ", response)
        this.getKeywordFields.data = response.data.view_languages.data
        this.paginationFields.pageTotal = response.data.view_languages.page.items
        this.getKeywordFields.dataStatus = (this.getKeywordFields.data.length === 0) ? true : false
        this.getKeywordFields.status = true
        this.setPagination()
        this.setPaginationSelect()
      }).catch((err) => {
        console.log(err)
      });
    },
    async addKeyword() {
      const data = {
        "query": "mutation($set_name:String!,$keyword:String!,$lang_code:String!,$description:String!){save_language(set_name:$set_name,keyword:$keyword,lang_code:$lang_code,description:$description){success,message{path,message}}}",
        "variables": {
          "set_name": this.$route.params.setname,
          "keyword": this.addKeywordFields.keyword,
          "lang_code": this.viewSetLanguageFields.query,
          "description": this.addKeywordFields.description
        }
      }
      return await axios.post(this.post_url, JSON.stringify(data), this.post_config_auth).then((response) => {
        if (response.data.errors) {
          return true
        } else {
          return false
        }
      });
    },
    async deleteKeyword() {
      const data = {
        "query": "mutation($set_name:String!,$keyword:String!){delete_language_keyword(setname:$set_name,keyword:$keyword){success,message{path,message}}}",
        "variables": {
          "set_name": this.$route.params.setname,
          "keyword": this.deleteKeywordFields.keyword
        }
      }
      return await axios.post(this.post_url, JSON.stringify(data), this.post_config_auth).then((response) => {
        if (response.data.errors) {
          return true
        } else {
          return false
        }
      }).catch((err) => {

      });
    },
    async editKeyword() {
      const data = {
        "query": "mutation($set_name:String!,$code:String!,$id:String!,$keyword:String!,$description:String!){update_language_keyword(set_name:$set_name,code:$code,id:$id,keyword:$keyword,description:$description){success,message{path,message}}}",
        "variables": {
          "id": this.editKeywordFields.id,
          "set_name": this.$route.params.setname,
          "keyword": this.editKeywordFields.keyword,
          "code": this.viewSetLanguageFields.query,
          "description": this.editKeywordFields.description
        }
      }
      return await axios.post(this.post_url, JSON.stringify(data), this.post_config_auth).then((response) => {
        if (response.data.errors) {
          return true
        } else {
          return false
        }
      })
    },
    //MODAL
    async addKeywordModal() {
      if (await this.addKeyword()) {
        swal({
          title: 'Error!',
          type: 'warning',
          confirmButtonClass: 'btn btn-success btn-fill',
          buttonsStyling: false
        }).then(() => {})
      } else {
        swal({
          title: 'Success!',
          type: 'success',
          confirmButtonClass: 'btn btn-success btn-fill',
          buttonsStyling: false
        }).then(() => {
          this.addKeywordFields.keyword = ''
          this.addKeywordFields.description = ''
          this.getKeyword()
          this.$refs.addKeywordModal.close()
        }, () => {
          this.addKeywordFields.keyword = ''
          this.addKeywordFields.description = ''
          this.getKeyword()
          this.$refs.addKeywordModal.close()
        });
      }
    },
    async editKeywordModal() {
      if (await this.editKeyword()) {
        swal({
          title: 'Error!',
          type: 'warning',
          confirmButtonClass: 'btn btn-success btn-fill',
          buttonsStyling: false
        })
      } else {
        swal({
          title: 'Success!',
          text: 'Keyword Edited',
          type: 'success',
          confirmButtonClass: 'btn btn-success btn-fill',
          buttonsStyling: false
        }).then(() => {
          this.getKeyword()
          this.$refs.editKeywordModal.close()
        }, () => {
          this.getKeyword()
          this.$refs.editKeywordModal.close()
        });
      }
    },

    deleteKeywordModal(items) {
      this.deleteKeywordFields.id = items.id
      this.deleteKeywordFields.keyword = items.keyword
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
          if (await this.deleteKeyword()) {
            swal({
              title: 'Something Went Wrong!',
              text: 'Yeah',
              type: 'warning',
              confirmButtonClass: 'btn btn-success btn-fill',
              buttonsStyling: false
            })
          } else {
            swal({
              title: 'Deleted!',
              type: 'success',
              confirmButtonClass: 'btn btn-success btn-fill',
              buttonsStyling: false
            }).then(() => {
              this.getKeyword()
            }, () => {
              this.getKeyword()
            })
          }
        },
        function(dismiss) {
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

    //CONVERTER
    convertDate(date_var) {
      if (date_var == null) {
        return false
      } else {
        var d = new Date(date_var),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear(),
          today = '' + d.getDay().toString();
        var thisDay = "";
        if (today == "1") {
          thisDay = "Mon"
        } else if (today == "2") {
          thisDay = "Tue"
        } else if (today == "3") {
          thisDay = "Wed"
        } else if (today == "4") {
          thisDay = "Thur"
        } else if (today == "5") {
          thisDay = "Fri"
        } else if (today == "6") {
          thisDay = "Sat"
        } else {
          thisDay = "Sun"
        }
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return month + "/" + day + "/" + year + " ";
      }
    },
    //SORT
    sortData(items) {
      this.sortableFields.fieldsToSort = items
      switch (this.sortableFields.fieldsToSort) {
        case 'keyword':
          if (this.sortableFields.icon.keyword) {
            this.sortableFields.icon.keyword = false
            this.sortableFields.sort.field = 'desc'
            this.getKeywordFields.status = false
            this.getKeyword()
          } else {
            this.sortableFields.icon.keyword = true
            this.sortableFields.sort.field = 'asc'
            this.getKeywordFields.status = false
            this.getKeyword()
          }
          break;
        case 'description':
          if (this.sortableFields.icon.description) {
            this.sortableFields.icon.description = false
            this.sortableFields.sort.field = 'desc'
            this.getKeywordFields.status = false
            this.getKeyword()
          } else {
            this.sortableFields.icon.description = true
            this.sortableFields.sort.field = 'asc'
            this.getKeywordFields.status = false
            this.getKeyword()
          }
          break;
        case 'date':
          if (this.sortableFields.icon.date) {
            this.sortableFields.icon.date = false
            this.sortableFields.sort.field = 'desc'
            this.getKeywordFields.status = false
            this.getKeyword()
          } else {
            this.sortableFields.icon.date = true
            this.sortableFields.sort.field = 'asc'
            this.getKeywordFields.status = false
            this.getKeyword()
          }
          break;
        default:
          break;
      }
    },
    //SEARCH
    keyDown(event) {
      if (event.key == 'Enter') {
        this.getKeywordFields.status = false
        this.getKeyword()
      }
    },

    pageLoadingState() {
      if (this.searchableFields.fieldsToSearch == 'date') {
        this.searchableFields.switchSelect = true
      } else {
        this.searchableFields.switchSelect = false
      }
    },
    searchData() {
      this.getKeywordFields.status = false
      this.getKeyword()
    },
    searchableFieldsDateCombine() {
      var dateCombine = this.convertDate(this.searchableFields.datePicker.from) + "00:00:00" + "_" + this.convertDate(this.searchableFields.datePicker.to) + "23:59:59"
      this.searchableFields.data = dateCombine
      this.getKeywordFields.status = false
      this.getKeyword()
    },

    //PAGINATION
    setPaginationSelect() {
      var selectData = 0
      this.paginationFields.selectFields.array = []
      for (var i = 0; i < this.paginationFields.pageTotal; i++) {
        if (selectData + 5 < this.paginationFields.pageTotal) {
          selectData = selectData + 5
          this.paginationFields.selectFields.array.push(selectData)
        }
      }
    },
    setPagination() {
      if (this.paginationFields.pageNumber == 1) {
        this.paginationFields.pageShowingFrom = 1
        this.paginationFields.pageShowingTo = this.paginationFields.pageLimit
        this.paginationFields.pageMinus = this.paginationFields.pageShowingTo - this.paginationFields.pageShowingFrom
      }
      if (this.paginationFields.pageTotal % this.paginationFields.pageLimit != 0) {
        this.paginationFields.pageNumberTotal = this.paginationFields.pageTotal / this.paginationFields.pageLimit
        this.paginationFields.pageNumberTotal = Math.floor(this.paginationFields.pageNumberTotal) + 1
      } else {
        this.paginationFields.pageNumberTotal = this.paginationFields.pageTotal / this.paginationFields.pageLimit
        this.paginationFields.pageNumberTotal = Math.floor(this.paginationFields.pageNumberTotal)
      }
    },

    //RESET
    resetFields() {
      this.searchableFields.data = ''
    },
    resetDateFields() {
      this.searchableFields.datePicker.to = new Date()
      this.searchableFields.datePicker.from = new Date()
    },
    refreshData() {
      this.paginationFields.pageTotal = 1
      this.paginationFields.pageLimit = 5
      this.paginationFields.pageNumber = 1
      this.paginationFields.pageNumberTotal = 1
      this.paginationFields.pageShowingFrom = 1
      this.paginationFields.pageShowingTo = 1
      this.paginationFields.pageMinus = 1
      this.paginationFields.selectFields.array = []
      this.searchableFields.fieldsToSearch = 'date'
      this.searchableFields.data = ''
      this.searchableFields.switchSelect = true
      this.searchableFields.datePicker.to = new Date()
      this.searchableFields.datePicker.from = new Date()
      this.sortableFields.fieldsToSort = 'date'
      this.sortableFields.icon.username = true
      this.sortableFields.icon.email = true
      this.sortableFields.icon.date = true
      this.sortableFields.icon.firstname = true
      this.sortableFields.icon.lastname = true
      this.sortableFields.sort.field = 'asc'
      this.getKeywordFields.status = false
      this.getKeyword()
    },

    getLanguageCode() {
      for (var i = 0; i < this.viewSetLanguageFields.data.length; i++) {
        if (this.viewSetLanguageFields.vmodel == this.viewSetLanguageFields.data[i].full) {
          this.viewSetLanguageFields.query = this.viewSetLanguageFields.data[i].code
        }
      }
      this.getKeyword() //all language
    },

    //OPEN MODAL
    openAddKeywordModal() {
      this.$refs.addKeywordModal.open()
    },
    openEditKeywordModal(items) {
      this.editKeywordFields.keyword = items.keyword
      this.editKeywordFields.description = items.description
      this.editKeywordFields.id = items.id
      this.$refs.editKeywordModal.open()
    },

    closeAddKeywordModal() {
      this.$refs.addKeywordModal.close()
    },
    closeEditKeywordModal() {
      this.$refs.editKeywordModal.close()
    },


  // SET LANGUAGE
  getKeywordLanguage(){
        const data = {
         "query":"query($input:view_languages_fields,$limit:Limit,$sort:sort,$search:search){view_languages(input:$input,limit:$limit,sort:$sort,search:$search){ data { id,keyword,description,date }, success,message, { path,message }, page { items,pageNo,totalPages } sortableFields,searchableFields } }",
      "variables":{
          "input":{
              "code":this.viewLanguageCode || "en",
              "set_name":"language child module"
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
    console.log("getKeywordLanguage: ",response)
    this.getKeywordLanguage.data = response.data.view_languages.data
    //set input first to default language
    this.setDefaultLanguage()
    }).catch((err) => {
    }); 

  },

  setDefaultLanguage(){
    this.setKeywordLanguageFields.action = 'Action'
    this.setKeywordLanguageFields.addKeyword = 'Add Keyword'
    this.setKeywordLanguageFields.dateCreated = 'Date Created'
    this.setKeywordLanguageFields.delete = 'Delete'
    this.setKeywordLanguageFields.description = 'Description'
    this.setKeywordLanguageFields.edit = 'Edit'
    this.setKeywordLanguageFields.keyword = 'Keyword'
    this.setKeywordLanguageFields.refresh = 'Refresh'
    this.setKeywordLanguageFields.reset = 'Reset'
    this.setKeywordLanguageFields.submit = 'Submit'
    this.setNewsLanguage()

  },
  setNewsLanguage(){
   const languageKeys = Object.keys(this.setKeywordLanguageFields)
   for(var i = 0; i < languageKeys.length; i++){
      for(var j = 0; j < this.getKeywordLanguage.data.length; j++){
        if(this.setKeywordLanguageFields[languageKeys[i]] == this.getKeywordLanguage.data[j].keyword){
            this.setKeywordLanguageFields[languageKeys[i]] =  this.getKeywordLanguage.data[j].description
        }
      }
     }
   },




  },
  /*  
       />____
  [#####[]____ METHODS
       \>                     
  */
  mounted() {
    this.setViewLanguage()
    this.getKeyword()
    this.getKeywordLanguage()

  },
  watch: {
    'paginationFields.pageNumber': function(newValue, oldValue) {
      if (oldValue != newValue) {
        this.paginationFields.pageShowingFrom = 1
        this.paginationFields.pageShowingTo = this.paginationFields.pageLimit
        this.paginationFields.pageMinus = this.paginationFields.pageShowingTo - this.paginationFields.pageShowingFrom
        this.paginationFields.pageShowingTo = this.paginationFields.pageLimit * this.paginationFields.pageNumber
        this.paginationFields.pageShowingFrom = this.paginationFields.pageShowingTo - this.paginationFields.pageMinus
        if (this.paginationFields.pageShowingTo > this.paginationFields.pageTotal) {
          this.paginationFields.pageShowingTo = this.paginationFields.pageTotal
        }
        this.getKeywordFields.status = false
        this.getKeyword()
      }
    },
    'paginationFields.pageLimit': function(newValue, oldValue) {
      if (oldValue != newValue) {
        this.paginationFields.pageNumber = 1
        this.paginationFields.pageShowingFrom = 1
        this.paginationFields.pageShowingTo = this.paginationFields.pageLimit
        this.paginationFields.pageMinus = this.paginationFields.pageShowingTo - this.paginationFields.pageShowingFrom
        this.paginationFields.pageShowingTo = this.paginationFields.pageLimit * this.paginationFields.pageNumber
        this.paginationFields.pageShowingFrom = this.paginationFields.pageShowingTo - this.paginationFields.pageMinus
        if (this.paginationFields.pageShowingTo > this.paginationFields.pageTotal) {
          this.paginationFields.pageShowingTo = this.paginationFields.pageTotal
        }
        this.getKeywordFields.status = false
        this.getKeyword()
      }
    },

    'searchableFields.fieldsToSearch': function(newValue, oldValue) {
      if (oldValue != newValue) {
        this.searchableFields.data = ''
        this.getKeyword()
      }
    },
    'viewLanguageCode': function (newValue, oldValue) {
      if(oldValue != newValue){
        console.log("yeah")
        this.getKeywordLanguage()
      }
    }
  },
}

</script>
<style>
</style>
