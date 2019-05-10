<template>
  <div class="wrapper">
    <side-bar type="sidebar" :sidebar-links="$sidebar.sidebarLinks">

      <user-menu>
      </user-menu>
      <form class="navbar-form navbar-left navbar-search-form navbar-search-form-mobile" role="search">
        <div class="input-group">
          <span class="input-group-addon"><i class="fa fa-search"></i></span>
          <input type="text" value="" class="form-control" placeholder="Search...">
        </div>
      </form>
      <!-- <mobile-menu></mobile-menu> -->
    </side-bar>

    <div class="main-panel">
      <top-navbar>
      </top-navbar>

      <dashboard-content @click.native="toggleSidebar">
      </dashboard-content>
      

      <!-- <content-footer></content-footer> -->
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>

  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import UserMenu from 'src/components/UIComponents/SidebarPlugin/UserMenu.vue'
  import MobileMenu from 'src/components/UIComponents/SidebarPlugin/MobileMenu.vue'
  import swal from 'sweetalert2'
  import RolesAndPermission from 'src/components/Dashboard/Views/Roles/RolesAndPermission.vue'
  import axios from 'axios';
  import Vue from 'vue';
  import SideBar from '../../UIComponents/SidebarPlugin'
  import sidebarLinks from '../../../sidebarLinks'
  Vue.use(SideBar, {sidebarLinks:sidebarLinks})

  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      UserMenu,
      MobileMenu,
      'roles-item' :RolesAndPermission
    },
    data(){
      return{
      
      }
    },
methods: {

    toggleSidebar () {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false)
      }
    },

  }, 
  created(){

  },
  mounted(){

      if(this.validate_session() == null || this.validate_session() == false){
        this.$router.push('/login')
      }
  }
}

</script>
