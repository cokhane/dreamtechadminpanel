var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
	
  NODE_ENV: '"development"',
  LOGIN_BG: '"static/img/background/background14.jpg"',
  TITLE: "'New Admin Panel'",
  ROOT_API: "'https://api.bitdtc.com/'",
  LOGO_IMG: "'static/img/images/dreamtech/logo/dreamtechlogo.png'",
  SIDEBAR_TITLE: "'New Admin Panel'"

});

/*
LOGIN_BG
	- static/img/images/dreamtech/dreamtechBg.jpg
	- static/img/images/linejr/linejrBg.jpg
	- static/img/images/vpncash/vpncashBg.jpg
	- static/img/images/background1.jpg
TITLE
	- Vpn Cash 
	- Dream Tech 
	- LineJr Tech 
ROOT_API
	- http://172.16.39.21:7861/query/
    - https://api.linejr.com/query/
    - https://api.vpncash.org/query/
    - http://172.16.39.21:821/ //new api localhost?
    - https://demoapi.bitdtc.com/
    - http://172.16.39.21:4565/
    - https://api.bitdtc.com
LOGO_IMG
	- static/img/images/dreamtech/logo/dreamtechlogo.png
	- static/img/images/linejr/logo/linejrlogo.png
	- static/img/images/vpncash/logo/vpncashlogo.png
SIDEBAR_TITLE
	- Dream Tech
	- Vpn Cash
	- Line Jr
TITLE_IMG // still looking for a webpack T_T
 	-static/img/images/vpncash/logo/vpncashfavicon.png
 	-static/img/images/dreamtech/logo/dreamtechfavicon.png
 	-static/img/images/linejr/logo/linejrfavicon.png
*/