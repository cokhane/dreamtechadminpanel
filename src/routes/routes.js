import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'
// Dashboard pages
import Overview from 'src/components/Dashboard/Views/Dashboard/Overview.vue'
import Stats from 'src/components/Dashboard/Views/Dashboard/Stats.vue'

// Pages
import TimeLine from 'src/components/Dashboard/Views/Pages/TimeLinePage.vue'
import Login from 'src/components/Dashboard/Views/Pages/Login.vue'
import Register from 'src/components/Dashboard/Views/Pages/Register.vue'
import Lock from 'src/components/Dashboard/Views/Pages/Lock.vue'

// Components pages
import Buttons from 'src/components/Dashboard/Views/Components/Buttons.vue'
import GridSystem from 'src/components/Dashboard/Views/Components/GridSystem.vue'
import Panels from 'src/components/Dashboard/Views/Components/Panels.vue'
import SweetAlert from 'src/components/Dashboard/Views/Components/SweetAlert.vue'
import Notifications from 'src/components/Dashboard/Views/Components/Notifications.vue'
import Icons from 'src/components/Dashboard/Views/Components/Icons.vue'
import Typography from 'src/components/Dashboard/Views/Components/Typography.vue'

// Forms pages
import RegularForms from 'src/components/Dashboard/Views/Forms/RegularForms.vue'
import ExtendedForms from 'src/components/Dashboard/Views/Forms/ExtendedForms.vue'
import ValidationForms from 'src/components/Dashboard/Views/Forms/ValidationForms.vue'
import Wizard from 'src/components/Dashboard/Views/Forms/Wizard.vue'

// TableList pages
import RegularTables from 'src/components/Dashboard/Views/Tables/RegularTables.vue'
import ExtendedTables from 'src/components/Dashboard/Views/Tables/ExtendedTables.vue'
import PaginatedTables from 'src/components/Dashboard/Views/Tables/PaginatedTables.vue'
// Maps pages
import GoogleMaps from 'src/components/Dashboard/Views/Maps/GoogleMaps.vue'
import FullScreenMap from 'src/components/Dashboard/Views/Maps/FullScreenMap.vue'
import VectorMaps from 'src/components/Dashboard/Views/Maps/VectorMapsPage.vue'

// Calendar
import Calendar from 'src/components/Dashboard/Views/Calendar/CalendarRoute.vue'
// Charts
import Charts from 'src/components/Dashboard/Views/Charts.vue'

/*----------------------------------------------------------------------*/

//Added
import Messages from 'src/components/Dashboard/Views/Messages.vue'
import Settings from 'src/components/Dashboard/Views/Settings.vue'
import User from 'src/components/Dashboard/Views/Pages/UserProfile.vue'

//Language
import Languages from 'src/components/Dashboard/Views/Languages/Languages.vue'
import Children from 'src/components/Dashboard/Views/Languages/Child.vue'

//News
import News from 'src/components/Dashboard/Views/News/News.vue'
import Category from 'src/components/Dashboard/Views/News/Category.vue'

//Tokens
import Airdrop from 'src/components/Dashboard/Views/Tokens/Airdrop.vue'
import BountryProgram from 'src/components/Dashboard/Views/Tokens/BountryProgram.vue'
import TokenSettings from 'src/components/Dashboard/Views/Tokens/TokenSettings.vue'

//User
import Users from 'src/components/Dashboard/Views/Users/Users.vue'

//User
import AddBlog from 'src/components/Dashboard/Views/Blog/AddBlog.vue'
import EditBlog from 'src/components/Dashboard/Views/Blog/EditBlog.vue'
import EditBlogChild from 'src/components/Dashboard/Views/Blog/EditBlogChild.vue'

//Roles 
import RolesAndPermission from 'src/components/Dashboard/Views/Roles/RolesAndPermission.vue'

//Test
import Test from 'src/components/Dashboard/Views/Test.vue'
import Test2 from 'src/components/Dashboard/Views/Test2.vue'

//Contact Us
import Contacts from 'src/components/Dashboard/Views/Contacts/ContactUs.vue'

//Mail
import Mail from 'src/components/Dashboard/Views/Mail/Mail.vue'







let componentsMenu = {
  path: '/components',
  component: DashboardLayout,
  redirect: '/components/buttons',
  children: [
    {
      path: 'buttons',
      name: 'Buttons',
      component: Buttons
    },
    {
      path: 'grid-system',
      name: 'Grid System',
      component: GridSystem
    },
    {
      path: 'panels',
      name: 'Panels',
      component: Panels
    },
    {
      path: 'sweet-alert',
      name: 'Sweet Alert',
      component: SweetAlert
    },
    {
      path: 'notifications',
      name: 'Notifications',
      component: Notifications
    },
    {
      path: 'icons',
      name: 'Icons',
      component: Icons
    },
    {
      path: 'typography',
      name: 'Typography',
      component: Typography
    }

  ]
}
let formsMenu = {
  path: '/forms',
  component: DashboardLayout,
  redirect: '/forms/regular',
  children: [
    {
      path: 'regular',
      name: 'Regular Forms',
      component: RegularForms
    },
    {
      path: 'extended',
      name: 'Extended Forms',
      component: ExtendedForms
    },
    {
      path: 'validation',
      name: 'Validation Forms',
      component: ValidationForms
    },
    {
      path: 'wizard',
      name: 'Wizard',
      component: Wizard
    }
  ]
}

let tablesMenu = {
  path: '/table-list',
  component: DashboardLayout,
  redirect: '/table-list/regular',
  children: [
    {
      path: 'regular',
      name: 'Regular Tables',
      component: RegularTables
    },
    {
      path: 'extended',
      name: 'Extended Tables',
      component: ExtendedTables
    },
    {
      path: 'paginated',
      name: 'Paginated Tables',
      component: PaginatedTables
    }]
}

let mapsMenu = {
  path: '/maps',
  component: DashboardLayout,
  redirect: '/maps/google',
  children: [
    {
      path: 'google',
      name: 'Google Maps',
      component: GoogleMaps
    },
    {
      path: 'full-screen',
      name: 'Full Screen Map',
      component: FullScreenMap
    },
    {
      path: 'vector-map',
      name: 'Vector Map',
      component: VectorMaps
    }
  ]
}

let pagesMenu = {
  path: '/pages',
  component: DashboardLayout,
  redirect: '/pages/user',
  children: [
    {
      path: 'user',
      name: 'User Page',
      component: User
    },
    {
      path: 'timeline',
      name: 'Timeline Page',
      component: TimeLine
    }
  ]
}

let loginPage = {
  path: '/login',
  name: 'Login',
  component: Login,
  meta: {
      title: 'Home Page - Example App',
  }
}

let registerPage = {
  path: '/register',
  name: 'Register',
  component: Register
}

let lockPage = {
  path: '/lock',
  name: 'Lock',
  component: Lock
}

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/overview',
    children: [
      {
        path: 'calendar',
        name: 'Calendar',
        component: Calendar
      },

      {
        path:'/messages',
        name:'Messages',
        component: Messages
      },
      {
        path:'/languages',
        name:'Languages',
        component: Languages,
      },
      {
        path:'/settings',
        name:'Settings',
        component: Settings
      },
      {
        path:'/rolesandpermission',
        name:'Roles And Permission',
        component: RolesAndPermission
      },
       {
        path:'/users',
        name:'Users',
        component: Users
      },
      {
        path:'/overview',
        name:'Dashboard',
        component: Overview
      },

      {
        path:'/contacts',
        name:'Contacts',
        component: Contacts
      },

      {
        path:'/mail',
        name:'Mail',
        component: Mail
      },




      {
        path:'/test',
        name:'Test',
        component: Test
      },
      {
        path:'/test2',
        name:'Test2',
        component: Test2
      },

  

      //setname
      {
        path:'/languages/:setname',
        name:'Keyword Page',
        component: Children,
      },

      {
        path:'/blog/editblog/:setname1',
        name:'Blog Page',
        component: EditBlogChild,
      },
  
 
    ]
  },
  componentsMenu,
  formsMenu,
  tablesMenu,
  mapsMenu,
  pagesMenu,
  loginPage,
  registerPage,
  lockPage,
  //added this

    {
    path: '/blog',
    component: DashboardLayout,
    redirect: '/blog/editblog',
    children: [
      {
        path: 'editblog',
        name: 'Edit Blog',
        component: EditBlog
      },
      {
        path: 'addblog',
        name: 'Add Blog',
        component: AddBlog
      }
    ]
  },


  {
    path: '/news',
    component: DashboardLayout,
    redirect: '/news/management',
    children: [
      {
        path: 'management',
        name: 'News',
        component: News
      },
      {
        path: 'category',
        name: 'Category',
        component: Category
      }
    ]
  },
    {
    path: '/tokens',
    component: DashboardLayout,
    redirect: '/tokens/airdrop',
    children: [
      {
        path: 'airdrop',
        name: 'Airdrop',
        component: Airdrop
      },
      {
        path: 'bountryprogam',
        name: 'Bountry Program',
        component: BountryProgram
      },
      {
        path: 'settings',
        name: 'Token Settings',
        component: TokenSettings
      }
    ]
  },
  {path: '*', component: NotFound}
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
 function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
