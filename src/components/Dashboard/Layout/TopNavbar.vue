<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-minimize">
        <button class="btn btn-fill btn-icon" @click="minimizeSidebar">
          <i :class="$sidebar.isMinimized ? 'ti-menu-alt' : 'ti-more-alt'"></i>
        </button>
      </div>
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" :class="{toggled: $sidebar.showSidebar}" @click="toggleSidebar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar bar1"></span>
          <span class="icon-bar bar2"></span>
          <span class="icon-bar bar3"></span>
        </button>
        <a class="navbar-brand">{{this.$route.name}}</a>
      </div>
      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav navbar-right">
          <drop-down tag="li" icon="ti-settings">
            <li><a href="#" @click="logout()">Logout</a></li>
          </drop-down>   
        </ul>
         <ul class="nav navbar-nav navbar-right">
          <drop-down tag="li" icon="ti-world" class="notranslate">
            <li><a href="#" @click="getLanguageCode('en')">English</a></li>
            <li><a href="#" @click="getLanguageCode('zh-cn')">Chinise Simplified</a></li>
        </drop-down>   
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  import swal from 'sweetalert2'
  import {mapActions} from 'vuex';
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        activeNotifications: false,
          post: {
          id: 1,
          title: 'My Journey with Vue'
        },
        languageArray:{
          code:['en','zh-cn','ja']
        }
      }
    },
    mounted(){
    },
    computed:{
    ...mapGetters([
      'viewLanguageCode'
      ])
    },

    methods: {
      capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown () {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown () {
        this.activeNotifications = false
      },
      toggleSidebar () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar () {
        this.$sidebar.displaySidebar(false)
      },
      minimizeSidebar () {
        this.$sidebar.toggleMinimize()
      },
       showSwal (type) {
        if (type === 'byebye') {
          swal({
            title: `Logout`,
            text: `Have a wonderfull day! Please come again!`,
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-success btn-fill'
          })
        }
      },
      logout(){
        this.showSwal('byebye');
        window.localStorage.removeItem("session");
        this.validate_session();
      },
       getLanguageCode(items){
        window.localStorage.setItem("lang",items)
        this.$store.dispatch('getLanguageCode',items)
      },

    },
    mounted(){

    }
  
  }

</script>
<style>

</style>
