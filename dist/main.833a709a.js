!function(e){var r={};function n(t){if(r[t])return r[t].exports;var o=r[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=r,n.d=function(e,r,t){n.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,r){if(1&r&&(e=n(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)n.d(t,o,function(r){return e[r]}.bind(null,o));return t},n.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(r,"a",r),r},n.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},n.p="/ss-to-json/",n(n.s=6)}([function(e,r,n){var t;!function(){"use strict";var o={not_string:/[^s]/,not_bool:/[^t]/,not_type:/[^T]/,not_primitive:/[^v]/,number:/[diefg]/,numeric_arg:/[bcdiefguxX]/,json:/[j]/,not_json:/[^j]/,text:/^[^\x25]+/,modulo:/^\x25{2}/,placeholder:/^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,key:/^([a-z_][a-z_\d]*)/i,key_access:/^\.([a-z_][a-z_\d]*)/i,index_access:/^\[(\d+)\]/,sign:/^[\+\-]/};function i(e){return function(e,r){var n,t,u,s,a,l,c,f,p,d=1,v=e.length,m="";for(t=0;t<v;t++)if("string"==typeof e[t])m+=e[t];else if(Array.isArray(e[t])){if((s=e[t])[2])for(n=r[d],u=0;u<s[2].length;u++){if(!n.hasOwnProperty(s[2][u]))throw new Error(i('[sprintf] property "%s" does not exist',s[2][u]));n=n[s[2][u]]}else n=s[1]?r[s[1]]:r[d++];if(o.not_type.test(s[8])&&o.not_primitive.test(s[8])&&n instanceof Function&&(n=n()),o.numeric_arg.test(s[8])&&"number"!=typeof n&&isNaN(n))throw new TypeError(i("[sprintf] expecting number but found %T",n));switch(o.number.test(s[8])&&(f=n>=0),s[8]){case"b":n=parseInt(n,10).toString(2);break;case"c":n=String.fromCharCode(parseInt(n,10));break;case"d":case"i":n=parseInt(n,10);break;case"j":n=JSON.stringify(n,null,s[6]?parseInt(s[6]):0);break;case"e":n=s[7]?parseFloat(n).toExponential(s[7]):parseFloat(n).toExponential();break;case"f":n=s[7]?parseFloat(n).toFixed(s[7]):parseFloat(n);break;case"g":n=s[7]?String(Number(n.toPrecision(s[7]))):parseFloat(n);break;case"o":n=(parseInt(n,10)>>>0).toString(8);break;case"s":n=String(n),n=s[7]?n.substring(0,s[7]):n;break;case"t":n=String(!!n),n=s[7]?n.substring(0,s[7]):n;break;case"T":n=Object.prototype.toString.call(n).slice(8,-1).toLowerCase(),n=s[7]?n.substring(0,s[7]):n;break;case"u":n=parseInt(n,10)>>>0;break;case"v":n=n.valueOf(),n=s[7]?n.substring(0,s[7]):n;break;case"x":n=(parseInt(n,10)>>>0).toString(16);break;case"X":n=(parseInt(n,10)>>>0).toString(16).toUpperCase()}o.json.test(s[8])?m+=n:(!o.number.test(s[8])||f&&!s[3]?p="":(p=f?"+":"-",n=n.toString().replace(o.sign,"")),l=s[4]?"0"===s[4]?"0":s[4].charAt(1):" ",c=s[6]-(p+n).length,a=s[6]&&c>0?l.repeat(c):"",m+=s[5]?p+n+a:"0"===l?p+a+n:a+p+n)}return m}(function(e){if(s[e])return s[e];var r,n=e,t=[],i=0;for(;n;){if(null!==(r=o.text.exec(n)))t.push(r[0]);else if(null!==(r=o.modulo.exec(n)))t.push("%");else{if(null===(r=o.placeholder.exec(n)))throw new SyntaxError("[sprintf] unexpected placeholder");if(r[2]){i|=1;var u=[],a=r[2],l=[];if(null===(l=o.key.exec(a)))throw new SyntaxError("[sprintf] failed to parse named argument key");for(u.push(l[1]);""!==(a=a.substring(l[0].length));)if(null!==(l=o.key_access.exec(a)))u.push(l[1]);else{if(null===(l=o.index_access.exec(a)))throw new SyntaxError("[sprintf] failed to parse named argument key");u.push(l[1])}r[2]=u}else i|=2;if(3===i)throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported");t.push(r)}n=n.substring(r[0].length)}return s[e]=t}(e),arguments)}function u(e,r){return i.apply(null,[e].concat(r||[]))}var s=Object.create(null);r.sprintf=i,r.vsprintf=u,"undefined"!=typeof window&&(window.sprintf=i,window.vsprintf=u,void 0===(t=function(){return{sprintf:i,vsprintf:u}}.call(r,n,r,e))||(e.exports=t))}()},function(e,r,n){"use strict";function t(e,r){for(var n=[],t=[],o=arguments.length;o-- >2;)n.push(arguments[o]);for(;n.length;){var i=n.pop();if(i&&i.pop)for(o=i.length;o--;)n.push(i[o]);else null!=i&&!0!==i&&!1!==i&&t.push(i)}return"function"==typeof e?e(r||{},t):{nodeName:e,attributes:r||{},children:t,key:r&&r.key}}n.r(r);var o=n(0);function i(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function u(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var n=[],t=!0,o=!1,i=void 0;try{for(var u,s=e[Symbol.iterator]();!(t=(u=s.next()).done)&&(n.push(u.value),!r||n.length!==r);t=!0);}catch(e){o=!0,i=e}finally{try{t||null==s.return||s.return()}finally{if(o)throw i}}return n}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var s="[1-9][0-9]{0,4}",a="\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b",l="(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?",c="^ss:\\/\\/",f="[^:]+",p="[^@]+",d=Object(o.sprintf)("%s(?<config>%s)@(?<server>%s):(?<port>%s)",c,l,a,s),v=Object(o.sprintf)("%s(?<base64>%s)",c,l),m=Object(o.sprintf)("(?<method>%s):(?<password>%s)@(?<server>%s):(?<port>%s)",f,p,a,s),b=function(e){return function(e){return new RegExp(m).exec(e).groups}(window.atob(e).trim())},g=function(e){var r,n={server:"",server_port:8388,local_port:1080,password:"",timeout:600,method:""};if(r=e,new RegExp(d).test(r)){var t=function(e){return new RegExp(d).exec(e).groups}(e);return Object.assign({},n,function(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{},t=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.forEach(function(r){i(e,r,n[r])})}return e}({server:t.server,server_port:Number(t.port)},function(e){var r=u(window.atob(e).trim().split(":"),2);return{method:r[0],password:r[1]}}(t.config)))}if(function(e){return new RegExp(v).test(e)}(e)){var o=function(e){return new RegExp(v).exec(e).groups}(e).base64,s=b(o);return Object.assign({},n,{server:s.server,server_port:Number(s.port),method:s.method,password:s.password})}return null},y=(n(5),n(3),{setURL:function(e){return function(){return{url:e}}},setJSON:function(e){return function(){return{json:null!==e?(r=e,JSON.stringify(r,null,2)):null};var r}},setConfig:function(e){return function(){return{config:e}}},setError:function(e){return function(){return{error:e}}},convert:function(e){return function(r,n){n.setError(""),n.setConfig(null),n.setJSON(null),e.preventDefault();try{var t=g(r.url.trim());if(null===t)return void n.setError("Bad SS URL");n.setConfig(t),n.setJSON(t)}catch(e){n.setError(e)}}}}),h=document.querySelector("main.main");document.body.removeChild(h),function(e,r,n,t){var o,i=[].map,u=t&&t.children[0]||null,s=u&&function e(r){return{nodeName:r.nodeName.toLowerCase(),attributes:{},children:i.call(r.childNodes,function(r){return 3===r.nodeType?r.nodeValue:e(r)})}}(u),a=[],l=!0,c=m(e),f=function e(r,n,t){for(var o in t)"function"==typeof t[o]?function(e,o){t[e]=function(e){var i=o(e);return"function"==typeof i&&(i=i(g(r,c),t)),i&&i!==(n=g(r,c))&&!i.then&&v(c=b(r,m(n,i),c)),i}}(o,t[o]):e(r.concat(o),n[o]=m(n[o]),t[o]=m(t[o]));return t}([],c,m(r));return v(),f;function p(e){return"function"==typeof e?p(e(c,f)):null!=e?e:""}function d(){o=!o;var e=p(n);for(t&&!o&&(u=function e(r,n,t,o,i){if(o===t);else if(null==t||t.nodeName!==o.nodeName){var u=function e(r,n){var t="string"==typeof r||"number"==typeof r?document.createTextNode(r):(n=n||"svg"===r.nodeName)?document.createElementNS("http://www.w3.org/2000/svg",r.nodeName):document.createElement(r.nodeName),o=r.attributes;if(o){o.oncreate&&a.push(function(){o.oncreate(t)});for(var i=0;i<r.children.length;i++)t.appendChild(e(r.children[i]=p(r.children[i]),n));for(var u in o)w(t,u,o[u],null,n)}return t}(o,i);r.insertBefore(u,n),null!=t&&x(r,n,t),n=u}else if(null==t.nodeName)n.nodeValue=o;else{!function(e,r,n,t){for(var o in m(r,n))n[o]!==("value"===o||"checked"===o?e[o]:r[o])&&w(e,o,n[o],r[o],t);var i=l?n.oncreate:n.onupdate;i&&a.push(function(){i(e,r)})}(n,t.attributes,o.attributes,i=i||"svg"===o.nodeName);for(var s={},c={},f=[],d=t.children,v=o.children,b=0;b<d.length;b++){f[b]=n.childNodes[b];var g=y(d[b]);null!=g&&(s[g]=[f[b],d[b]])}for(var b=0,h=0;h<v.length;){var g=y(d[b]),_=y(v[h]=p(v[h]));if(c[g])b++;else if(null==_||_!==y(d[b+1]))if(null==_||l)null==g&&(e(n,f[b],d[b],v[h],i),h++),b++;else{var N=s[_]||[];g===_?(e(n,N[0],N[1],v[h],i),b++):N[0]?e(n,n.insertBefore(N[0],f[b]),N[1],v[h],i):e(n,f[b],null,v[h],i),c[_]=v[h],h++}else null==g&&x(n,f[b],d[b]),b++}for(;b<d.length;)null==y(d[b])&&x(n,f[b],d[b]),b++;for(var b in s)c[b]||x(n,s[b][0],s[b][1])}return n}(t,u,s,s=e)),l=!1;a.length;)a.pop()()}function v(){o||(o=!0,setTimeout(d))}function m(e,r){var n={};for(var t in e)n[t]=e[t];for(var t in r)n[t]=r[t];return n}function b(e,r,n){var t={};return e.length?(t[e[0]]=e.length>1?b(e.slice(1),r,n[e[0]]):r,m(n,t)):r}function g(e,r){for(var n=0;n<e.length;)r=r[e[n++]];return r}function y(e){return e?e.key:null}function h(e){return e.currentTarget.events[e.type](e)}function w(e,r,n,t,o){if("key"===r);else if("style"===r)for(var i in m(t,n)){var u=null==n||null==n[i]?"":n[i];"-"===i[0]?e[r].setProperty(i,u):e[r][i]=u}else"o"===r[0]&&"n"===r[1]?(r=r.slice(2),e.events?t||(t=e.events[r]):e.events={},e.events[r]=n,n?t||e.addEventListener(r,h):e.removeEventListener(r,h)):r in e&&"list"!==r&&!o?e[r]=null==n?"":n:null!=n&&!1!==n&&e.setAttribute(r,n),null!=n&&!1!==n||e.removeAttribute(r)}function x(e,r,n){function t(){e.removeChild(function e(r,n){var t=n.attributes;if(t){for(var o=0;o<n.children.length;o++)e(r.childNodes[o],n.children[o]);t.ondestroy&&t.ondestroy(r)}return r}(r,n))}var o=n.attributes&&n.attributes.onremove;o?o(r,t):t()}}({url:"",config:null,json:"",error:""},y,function(e,r){return t("main",{className:"main"},t("div",{className:"main__wrapper"},t("h1",{className:"title"},"Convert SS URL to JSON"),t("form",{className:"form",onsubmit:function(e){return r.convert(e)}},t("input",{type:"text",className:"form__input",value:e.url,required:!0,oninput:function(e){return r.setURL(e.target.value)}}),t("button",{className:"form__button"},"Convert")),!e.json&&t("div",{className:"example"},"Example: ","ss://YmYtY2ZiOnRlc3RAMTkyLjE2OC4xMDAuMTo4ODg4Cg",t("br",null)," or ",t("br",null),"ss://YmYtY2ZiOnRlc3Q=@192.168.100.1:8888"),e.error&&t("div",{className:"error"},e.error),e.json&&t("div",{className:"result"},t("div",{className:"result__code"},t("code",null,t("pre",null,e.json))),t("div",{className:"result__list"},(n=e.config,t("ul",{className:"result__ul"},Object.keys(n).map(function(e){return t("li",{className:"result__item"},t("span",{className:"result__key"},e,":"),t("input",{className:"result__input",type:"text",value:n[e]}))})))))));var n},document.body)},,function(e,r,n){},,function(e,r,n){},function(e,r,n){e.exports=n(1)}]);
//# sourceMappingURL=main.833a709a.js.map