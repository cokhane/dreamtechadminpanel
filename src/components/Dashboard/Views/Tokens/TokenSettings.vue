<template>
  <div class="token-set">
  <div class="row">
    <div class="card">
      <ul class="nav nav-tabs">
        <li>
         <router-link to="/tokens/airdrop" >{{setTokenSettingsLanguageFields.airdrop}}</router-link>
        </li>
        <li>
          <router-link to="/tokens/bountryprogam" >{{setTokenSettingsLanguageFields.bountyProgram}}</router-link>
        </li>
         <li  class="active">
          <router-link to="/tokens/settings" >{{setTokenSettingsLanguageFields.tokenSettings}}</router-link>
        </li>
      </ul>
      <div class="tab-content">
        <div class="row">
          <div class="col-md-11">
              <div class="card" style="box-shadow:none">
              <hr>
                <div class="card-content">
                  <div class="form-horizontal">
                    <div class="form-group" style="margin-bottom:40px">
                      <label class="col-md-3 control-label">{{setTokenSettingsLanguageFields.address}}</label>
                      <div class="col-md-7">
                        <input type="email" class="form-control"
                        v-model="this.tokenSettingsFields.address" disabled>
                      </div>
                    </div>
                    <div class="form-group" style="margin-bottom:40px">
                      <label class="col-md-3 control-label">{{setTokenSettingsLanguageFields.code}}</label>
                      <div class="col-md-7">
                        <input type="email" class="form-control" v-model="this.tokenSettingsFields.code" disabled>
                      </div>
                    </div>

                    <div class="form-group" style="margin-bottom:40px">
                      <label class="col-md-3 control-label">{{setTokenSettingsLanguageFields.contract}}</label>
                      <div class="col-md-7">
                        <input type="email" class="form-control" v-model="this.tokenSettingsFields.contract" disabled>
                      </div>
                    </div>

                    <div class="form-group" style="margin-bottom:40px">
                      <label class="col-md-3 control-label">{{setTokenSettingsLanguageFields.dateCreated}}</label>
                      <div class="col-md-7">
                        <input type="email" class="form-control" v-model="this.tokenSettingsFields.created" disabled>
                      </div>
                    </div>

 

                    <div class="form-group" style="margin-bottom:40px">
                      <label class="col-md-3 control-label">{{setTokenSettingsLanguageFields.name}}</label>
                      <div class="col-md-7">
                        <input type="email" class="form-control" v-model="this.tokenSettingsFields.name" disabled>
                      </div>
                    </div>

                    <div class="form-group" style="margin-bottom:40px">
                      <label class="col-md-3 control-label">{{setTokenSettingsLanguageFields.owner}}</label>
                      <div class="col-md-7">
                        <input type="email" class="form-control" v-model="this.tokenSettingsFields.owner" disabled>
                      </div>
                    </div>

                    <div class="form-group" style="margin-bottom:40px">
                      <label class="col-md-3 control-label">{{setTokenSettingsLanguageFields.minimum}}</label>
                      <div class="col-md-7">
                        <input type="email" class="form-control" v-model="this.tokenSettingsFields.minimum" disabled>
                      </div>
                    </div>

                      <div class="form-group" style="margin-bottom:40px">
                      <label class="col-md-3 control-label">{{setTokenSettingsLanguageFields.rate}}</label>
                      <div class="col-md-7">
                        <input type="email" class="form-control" v-model="this.tokenSettingsFields.rate" disabled>
                      </div>
                    </div>
                    <div class="form-group" style="margin-bottom:40px">
                      <label class="col-md-3 control-label">{{setTokenSettingsLanguageFields.secret}}</label>
                      <div class="col-md-7">
                        <input type="email" class="form-control" v-model="this.tokenSettingsFields.secret" disabled>
                      </div>
                    </div>
                    <div class="form-group" style="margin-bottom:40px">
                           <label class="col-md-3 control-label"> </label>
                      <div class="col-md-7">
                      </div>
                      <button type="button" class="btn btn-fill" @click="openTokenSettingModal()">{{setTokenSettingsLanguageFields.changeSettings}}</button>
                    </div>
                  </div><!--form horizontal-->
                </div>
              </div>
              <!-- Card -->
          </div>
        </div>
      </div>
      <!-- Tab Content -->
    </div> 
    <!-- Card -->
  </div>
  <!-- Row -->

    <sweet-modal ref="tokenSettingsModal"  modal-theme="light">
      <div class="card" style="box-shadow:none">
    <div class="card-header">
      <h4 class="title">Update Token Settings</h4>
      <hr>
    </div>
    <div class="card-content">
    <form>
          <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="Address" 
                      placeholder="Address" 
                      v-model="updateTokenSettingsFields.address"
                      >
            </fg-input>
          </div>
          <div class="col-md-6">
          <fg-input type="text"
                    label="Code"
                    placeholder="Code" 
                     v-model="updateTokenSettingsFields.code"
                    >
          </fg-input>
          </div>
        </div>
        <div class="row">
           <div class="col-md-6">
          <fg-input type="text"
                    label="Contract"
                    placeholder="Contract" 
                     v-model="updateTokenSettingsFields.contract"
                    >
          </fg-input>
          </div>
        <div class="col-md-6">
                    <div class="form-group">
               <label style="">Created</label> <br/>
              <el-date-picker v-model="tokenSettingsFields.created" type="date"  placeholder="Pick a day"
                :picker-options="pickerOptions1">
              </el-date-picker>
            </div>
        </div>
        </div>
  

          <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="Name" 
                      placeholder="Name" 
                      v-model="updateTokenSettingsFields.name"
                      >
            </fg-input>
          </div>
          <div class="col-md-6">
          <fg-input type="text"
                    label="Owner"
                    placeholder="Owner" 
                     v-model="updateTokenSettingsFields.owner"
                    >
          </fg-input>
          </div>
        </div>

         <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="Minimum" 
                      placeholder="Minimum" 
                      v-model="updateTokenSettingsFields.minimum"
                      >
            </fg-input>
          </div>
        </div>

           <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="Rate" 
                      placeholder="Rate"
                     v-model="updateTokenSettingsFields.rate"

                      >
            </fg-input>
          </div>
          <div class="col-md-6">
          <fg-input type="text"
                    label="Secret"
                    placeholder="Secret"
                     v-model="updateTokenSettingsFields.secret"

                    >
          </fg-input>
          </div>
        </div>


        <div class="card-footer">
        <button class="btn" style="float:right" @click="updateTokenSettingsModal()">Save</button>
          
        </div>

      </form>
    </div>
  </div>
  </sweet-modal>
</div>
</template>
<script>



import Vue from 'vue'
import axios from 'axios'
import {Table, TableColumn} from 'element-ui'
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'
import {DatePicker, TimeSelect, Slider, Tag, Input, Button, Select, Option} from 'element-ui'
import swal from 'sweetalert2'
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'



Vue.use(Table)
Vue.use(TableColumn)

export default {
    components:{
      'sweet-modal':SweetModal,
      'sweet-modal-tab': SweetModalTab,
      [DatePicker.name]: DatePicker,
    },

  data () {
    return {
      getTokenSettingsLanguageFields:{
        data:''
      },
      setTokenSettingsLanguageFields:{
        address:'',
        airdrop:'',
        bountyProgram:'',
        changeSettings:'',
        code:'',
        contract:'',
        dateCreated:'',
        minimum:'',
        name:'',
        owner:'',
        rate:'',
        secret:'',
        tokenSettings:''
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
    datePicker: '',
  sortableFields:{
    fieldsToSort: 'username', 
    icon:{
      username:true,
      email:true,
      created:true
    },
    sort:{
        field:'asc' 
    },
    limit:{
      pageLimit:'7',
      pageNumber:'1',
      lastIdNumber:''
    },
  },
    getTokenSettingsFields:{
      data:''
    },
    tokenSettingsFields:{
      address:'',
      name:'',
      code:'',
      rate:'',
      minimum:'',
      owner:'',
      created:'',
      contract:'',
      secret:'' 
    },
    updateTokenSettingsFields:{
      address:'',
      name:'',
      code:'',
      rate:'',
      minimum:'',
      owner:'',
      created:'',
      contract:'',
      secret:'' 
    }
  }
},

computed: {
  ...mapGetters([
    'viewLanguageCode',
  ])
},
methods: {
  //CRUD 
  async updateTokenSettings(){
       const data = {
      "query":"mutation($input:TokenSettingInput!){SavetokenSettings(input:$input){ message,errors { Path,Message } } }",
          "variables":{
              "input":{
                "address":this.updateTokenSettingsFields.address,
                "name":this.updateTokenSettingsFields.name,
                "code":this.updateTokenSettingsFields.code,
                "rate":this.updateTokenSettingsFields.rate,
                "minimum":this.updateTokenSettingsFields.minimum,
                "owner":this.updateTokenSettingsFields.owner,
                "contract":this.updateTokenSettingsFields.contract,
                "secret":this.updateTokenSettingsFields.secret
              }
          },
      }
      return await axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
      // console.log("getTokenSettings: ", response)
      if(response.data.errors){
        return true
     }

      this.getTokenSettingsFields.data = response.data.tokenSettings
      return false

      this.setTokenSettingFields() 
      if(response.data.tokenSettings.errors){
        return true
      }else{
        return false
      }
      }).catch((err) => {
        console.log(err);
      });
    },

  getTokenSettings(){
    const data = {
        "query":"query{tokenSettings{minimum,address,name,code,rate,owner,contract,secret,created,errors{Path,Message}}}"
      }
      axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
      // console.log("getTokenSettings: ", response)
      this.getTokenSettingsFields.data = response.data.tokenSettings
       this.setTokenSettingFields()  

      }).catch((err) => {
        console.log(err);
      });

    },
   setTokenSettingFields(){
      this.tokenSettingsFields.address = this.getTokenSettingsFields.data.address
      this.tokenSettingsFields.code = this.getTokenSettingsFields.data.code
      this.tokenSettingsFields.contract = this.getTokenSettingsFields.data.contract
      this.tokenSettingsFields.created = this.getTokenSettingsFields.data.created
      this.tokenSettingsFields.name = this.getTokenSettingsFields.data.name
      this.tokenSettingsFields.owner = this.getTokenSettingsFields.data.owner
      this.tokenSettingsFields.minimum = this.getTokenSettingsFields.data.minimum
      this.tokenSettingsFields.rate = this.getTokenSettingsFields.data.rate
      this.tokenSettingsFields.secret = this.getTokenSettingsFields.data.secret
    },

    //Modal
    
    async updateTokenSettingsModal(){
    if(await this.updateTokenSettings()){
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
          this.getTokenSettings()
          this.$refs.tokenSettingsModal.close()
        })
       }
   
    },
    
    //Open Modal
    openTokenSettingModal(){
      this.updateTokenSettingsFields.address  = this.tokenSettingsFields.address
      this.updateTokenSettingsFields.code  = this.tokenSettingsFields.code
      this.updateTokenSettingsFields.contract  = this.tokenSettingsFields.contract
      this.updateTokenSettingsFields.created  = this.tokenSettingsFields.created
      this.updateTokenSettingsFields.name  = this.tokenSettingsFields.name
      this.updateTokenSettingsFields.owner  = this.tokenSettingsFields.owner
      this.updateTokenSettingsFields.minimum  = this.tokenSettingsFields.minimum
      this.updateTokenSettingsFields.rate  = this.tokenSettingsFields.rate
      this.updateTokenSettingsFields.secret  = this.tokenSettingsFields.secret
      this.$refs.tokenSettingsModal.open()

    },

  //LANGUAGE

  getTokenSettingsLanguage(){
        const data = {
         "query":"query($input:view_languages_fields,$limit:Limit,$sort:sort,$search:search){view_languages(input:$input,limit:$limit,sort:$sort,search:$search){ data { id,keyword,description,date }, success,message, { path,message }, page { items,pageNo,totalPages } sortableFields,searchableFields } }",
      "variables":{
          "input":{
              "code":this.viewLanguageCode || "en",
              "set_name":"token settings module"
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
    this.getTokenSettingsLanguageFields.data = response.data.view_languages.data
    this.setDefaultLanguage()

    }).catch((err) => {

    }); 



  },

  setDefaultLanguage(){

    this.setTokenSettingsLanguageFields.address = "Address"
    this.setTokenSettingsLanguageFields.airdrop = "Airdrop"
    this.setTokenSettingsLanguageFields.bountyProgram = "Bounty Program"
    this.setTokenSettingsLanguageFields.changeSettings = "Change Settings"
    this.setTokenSettingsLanguageFields.code = "Code"
    this.setTokenSettingsLanguageFields.contract = "Contract"
    this.setTokenSettingsLanguageFields.dateCreated = "Date Created"
    this.setTokenSettingsLanguageFields.minimum = "Minimum"
    this.setTokenSettingsLanguageFields.name = "Name"
    this.setTokenSettingsLanguageFields.owner = "Owner"
    this.setTokenSettingsLanguageFields.rate = "Rate"
    this.setTokenSettingsLanguageFields.secret = "Secret"
    this.setTokenSettingsLanguageFields.tokenSettings = "Token Settings"

    this.setTokenSettingsLanguage()

  },
    setTokenSettingsLanguage(){
      // console.log(this.getTokenSettingsLanguageFields.data)
         const languageKeys = Object.keys(this.setTokenSettingsLanguageFields)
         for(var i = 0; i < languageKeys.length; i++){
            for(var j = 0; j < this.getTokenSettingsLanguageFields.data.length; j++){
              if(this.setTokenSettingsLanguageFields[languageKeys[i]] == this.getTokenSettingsLanguageFields.data[j].keyword){
                  this.setTokenSettingsLanguageFields[languageKeys[i]] =  this.getTokenSettingsLanguageFields.data[j].description
              }
            }
        }
    }
},

  watch: {
    'viewLanguageCode': function (newValue, oldValue) {
    if(oldValue != newValue){
      this.getTokenSettingsLanguage()
    }
   },
  },
  mounted(){
    this.getTokenSettings()
    this.getTokenSettingsLanguage()

  }
}
</script>
<style>
</style>
