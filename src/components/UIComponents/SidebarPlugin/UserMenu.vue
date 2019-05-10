<template>
  <div class="user">
    <div class="photo">
      <img src="static/img/faces/face-1.jpg"/>

    </div>
    <div class="info">
      <a data-toggle="collapse" @click="toggleMenu" href="javascript:void(0)">
           <span>
            {{userTitle}}
             <b class="caret"></b>
          </span>
      </a>
      <div class="clearfix"></div>
      <div>
        <el-collapse-transition>
          <ul class="nav" v-show="!isClosed">
            <li>
<!--             <router-link to="/settings" class="btn-rotate">
                  <span class="sidebar-mini">S</span>
                <span class="sidebar-normal">Settings</span>
            </router-link> -->
            </li>
            <li>
            <router-link to="/pages/user" class="btn-rotate">
                  <span class="sidebar-mini">U</span>
                <span class="sidebar-normal">User Page</span>
            </router-link>
            </li>
          </ul>
        </el-collapse-transition>
      </div>
    </div>
  </div>
</template>
<script>
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
  import jwtDecode from 'jwt-decode'; 
  export default {
    components: {
      [CollapseTransition.name]: CollapseTransition
    },
    data () {
      return {
        userTitle : '',
        isClosed: true
      }
    },
    methods: {
      toggleMenu () {
        this.isClosed = !this.isClosed
      },
        getUserName(){
      // console.log("called this validate_session!");
        const sessiondata =  window.localStorage.getItem("session");
        const decoded = jwtDecode(sessiondata);

        this.userTitle = decoded.Firstname
        }
      },
     mounted(){
      this.getUserName()
    }

  };
</script>
<style>
  .collapsed {
    transition: opacity 1s;
  }
</style>
