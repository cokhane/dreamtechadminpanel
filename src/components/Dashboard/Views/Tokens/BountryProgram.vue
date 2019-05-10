<template>
  <div class="token-management">
    <div class="row">
      <div class="card">
    <ul class="nav nav-tabs">
        <li >
         <router-link to="/tokens/airdrop" >Airdrop</router-link>
        </li>
        <li class="active">
          <router-link to="/tokens/bountryprogam" >Bounty Program</router-link>
        </li>
         <li >
          <router-link to="/tokens/settings" >Token Settings</router-link>
        </li>
      </ul>
        <div class="tab-content">
        <div class="row">

        </div>
        </div>
      </div>
      </div> 
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import axios from 'axios'
  import {Table, TableColumn} from 'element-ui'
  Vue.use(Table)
  Vue.use(TableColumn)
  export default {

    data () {
      return {
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
      }
    },
    methods: {
      getTokens(){
        const data = {
          "query":"query{tokenSettings{address,name,code,rate,owner,contract,secret,created,errors{Path,Message}}}"
        }
        axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
        console.log("getTokens: ", response)
        }).catch((err) => {
          console.log(err);
        });
      }
    },
    mounted(){
      this.getTokens()

    }
  }
</script>
<style>
</style>
