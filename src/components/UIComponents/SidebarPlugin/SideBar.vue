<template>
  <div :class="sidebarClasses"
       :data-background-color="backgroundColor"
       :data-active-color="activeColor">
  <router-link tag="a" to="/overview">
    <div class="logo">
         <a class="simple-text logo-mini" href="#">
          <div class="logo-img">
              <img :src="logo" alt="" style="max-width: 35px;top: -1px;">
          </div>
        </a>


      <a class="simple-text logo-normal"
         href="#">
          {{ title }}
      </a>
    </div>
  </router-link>
    <div class="sidebar-wrapper" ref="sidebarScrollArea">
      <slot>

      </slot>
      <ul :class="navClasses">
        <slot name="links">
          <sidebar-item v-for="(link, index) in sidebarLinks"
                        :key="link.name + index"
                        :link="link">

            <sidebar-item v-for="(subLink, index) in link.children"
                          :key="subLink.name + index"
                          :link="subLink">
            </sidebar-item>
          </sidebar-item>
        </slot>

      </ul>
    </div>
  </div>
</template>
<script>

import axios from 'axios'
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex'
  export default {
    data(){
      return{
        sidebarLinksLanguage:{
          array:[],
          orignal:[]
        },
        sideBarResponse:{
          parent:{},
          child:{}
        }
      }
    },
    props: {
      title: {
        type: String,
        default: process.env.SIDEBAR_TITLE
      },
      type: {
        type: String,
        default: 'sidebar',
        validator: (value) => {
          let acceptedValues = ['sidebar', 'navbar']
          return acceptedValues.indexOf(value) !== -1
        }
      },
      backgroundColor: {
        type: String,
        default: 'black',
        validator: (value) => {
          let acceptedValues = ['white', 'brown', 'black']
          return acceptedValues.indexOf(value) !== -1
        }
      },
      activeColor: {
        type: String,
        default: 'success',
        validator: (value) => {
          let acceptedValues = ['primary', 'info', 'success', 'warning', 'danger']
          return acceptedValues.indexOf(value) !== -1
        }
      },
      logo: {
        type: String,
        default: process.env.LOGO_IMG
      },
      sidebarLinks: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      sidebarClasses () {
        if (this.type === 'sidebar') {
          return 'sidebar'
        } else {
          return 'collapse navbar-collapse off-canvas-sidebar'
        }
      },
      navClasses () {
        if (this.type === 'sidebar') {
          return 'nav'
        } else {
          return 'nav navbar-nav'
        }
      },
      ...mapGetters([
        'viewLanguageCode',
        'viewNavPanel'
      ])
    },

    methods: {
      testing(){
        console.log("bibi let go")
      },
      setSideBarLinks(){
       this.sidebarLinksLanguage.array = this.$props.sidebarLinks

       // console.log("this.sidebarLinksLanguage.array: ", this.sidebarLinksLanguage.array)

      },
      setSideBarParentNav(){

        const data = {
         "query":"query($input:view_languages_fields,$limit:Limit,$sort:sort,$search:search){view_languages(input:$input,limit:$limit,sort:$sort,search:$search){ data { id,keyword,description,date }, success,message, { path,message }, page { items,pageNo,totalPages } sortableFields,searchableFields } }",
      "variables":{
          "input":{
              "code":this.viewLanguageCode || "en",
              "set_name":"nav panel"
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
    // console.log("setSideBarParentNav: ",response)
    this.sideBarResponse.parent = response.data.view_languages.data
    this.sidebarLinksLanguage.orignal = this.viewNavPanel

    // 
    // console.log(this.viewNavPanel)

  for(var i = 0; i < this.sidebarLinksLanguage.orignal.length; i++){
      for(var j = 0; j < this.sideBarResponse.parent.length; j++){
        if(this.sidebarLinksLanguage.orignal[i].name == this.sideBarResponse.parent[j].keyword){
          this.sidebarLinksLanguage.array[i].name = this.sideBarResponse.parent[j].description
         
        }
      }
    }



    }).catch((err) => {
    }); 
  },

      async initScrollBarAsync () {
        await import('perfect-scrollbar/dist/css/perfect-scrollbar.css')
        const PerfectScroll = await import('perfect-scrollbar')
        PerfectScroll.initialize(this.$refs.sidebarScrollArea)
      }
    },
    watch: {
    'viewLanguageCode': function (newValue, oldValue) {
      if(this.viewLanguageCode == newValue){
       this.setSideBarParentNav()
       }
     }
     },

    mounted () {
      this.initScrollBarAsync()
      this.setSideBarLinks()
      this.setSideBarParentNav()


    },
    beforeDestroy () {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.showSidebar = false
      }
    }
  };

</script>
<style>
  @media (min-width: 992px) {
    .navbar-search-form-mobile,
    .nav-mobile-menu{
      display: none;
    }
  }
</style>
