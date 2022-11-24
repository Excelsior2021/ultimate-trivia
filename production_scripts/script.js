(()=>{"use strict";var e={593:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(s,o){function i(e){try{c(r.next(e))}catch(e){o(e)}}function a(e){try{c(r.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,a)}c((r=r.apply(e,t||[])).next())}))},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=s(n(218)),i=document.getElementById("categories"),a=document.getElementById("form"),c=document.getElementById("results"),u=document.getElementById("game"),l=document.getElementById("game-reset"),d=document.getElementById("message");let f,p=0,h=0,m=0,g=0;a.addEventListener("submit",(e=>{e.preventDefault(),u.innerHTML="",c.innerHTML="",p=0,h=0,m=0,g=0,y()}));const y=()=>r(void 0,void 0,void 0,(function*(){const e=a.questions_num.value;f=parseInt(e);const t=a.categories.value,n=a.difficulty.value,r=a.question_type.value;try{const{data:s}=yield o.default.get(`https://opentdb.com/api.php?amount=${e}&category=${t}&difficulty=${n}&type=${r}`);a.classList.add("form--hidden"),u.classList.remove("game--hidden"),u.classList.add("game--format"),c.classList.add("results--hidden"),l.classList.remove("game__reset--hidden"),d.classList.add("message--hidden"),1===s.response_code&&b(),E(s.results)}catch(e){console.log(e)}})),b=()=>{const e=document.createElement("p");e.classList.add("no-data__message"),e.innerText="There were no questions for your chosen settings. Try reducing the number of questions in the settings.";const t=document.createElement("button");t.innerText="go back",t.classList.add("no-data__button"),t.classList.add("game__navigate"),t.addEventListener("click",x),u.appendChild(e),u.appendChild(t)},E=e=>{e.forEach(((e,t)=>{t+=1;const n=[],r=document.createElement("div");r.classList.add("game__questions"),1!==t&&r.classList.add("game__questions--hidden");const s=document.createElement("h2");s.classList.add("game__title"),s.innerText=`Question ${t}`;const o=document.createElement("p");o.classList.add("game__question");const i=w(e.question);o.innerText=i,e.incorrect_answers.forEach((e=>{const t=document.createElement("input");t.type="button",t.classList.add("game__answer");const r=w(e);t.name="false",t.value=r,t.innerText=r,t.addEventListener("click",(e=>_(e,n))),n.push(t)}));const a=document.createElement("input");a.type="button",a.classList.add("game__answer");const c=w(e.correct_answer);a.name="true",a.value=c,a.addEventListener("click",(e=>_(e,n))),n.push(a);const l=v(n);r.appendChild(s),r.appendChild(o),l.forEach((e=>r.appendChild(e)));const d=document.createElement("div"),p=document.createElement("div"),h=document.createElement("div");if(d.classList.add("game__navigate-container"),1!==t){const e=document.createElement("input");e.classList.add("game__navigate"),e.classList.add("game__navigate--prev"),e.type="button",e.value="prev",e.addEventListener("click",L),p.appendChild(e),t===f&&e.classList.add("game__navigate--prev--format")}if(t!==f){const e=document.createElement("input");e.classList.add("game__navigate"),e.classList.add("game__navigate--next"),e.type="button",e.value="next",e.addEventListener("click",O),p.appendChild(e)}const m=document.createElement("input");m.classList.add("game__navigate"),m.classList.add("game__navigate--results"),m.type="button",m.value="view results",m.addEventListener("click",S),h.appendChild(m),d.appendChild(p),d.appendChild(h),r.appendChild(d),u.appendChild(r)}))},w=e=>e.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#039;/g,"'").replace(/&pi;/g,"π").replace(/&Delta;/g,"Δ").replace(/&Deg;/g,"°").replace(/&ldquo;/g,"“").replace(/&rdquo;/g,"”").replace(/&shy;/g,"-"),v=e=>{for(let t=e.length-1;t>0;t--){const n=Math.floor(Math.random()*(t+1)),r=e[t];e[t]=e[n],e[n]=r}return e},_=(e,t)=>{m+=1;const n=e.target;if("true"===n.name)n.classList.add("game__answer--correct"),p+=1;else{n.classList.add("game__answer--incorrect"),h+=1;for(const e of t)if("true"===e.name){e.classList.add("game__answer--correct");break}}if(n.parentElement.classList.add("game__questions--unclickable"),m===f){const e=document.getElementsByClassName("game__navigate--results");for(const t of e)t.classList.add("game__navigate--results--show");R()}},O=()=>{const e=document.getElementById("game");e.children[g].classList.add("game__questions--hidden"),e.children[g+1].classList.remove("game__questions--hidden"),g+=1},L=()=>{const e=document.getElementById("game");e.children[g].classList.add("game__questions--hidden"),e.children[g-1].classList.remove("game__questions--hidden"),g-=1},S=()=>{u.classList.add("game--hidden"),c.classList.remove("results--hidden")},R=()=>{l.classList.add("game__reset--hidden");const e=T(),t=document.createElement("p");t.classList.add("results__statement"),t.innerText=`You got ${p} out of ${f} questions right.`,t.classList.add("results__statement--format");const n=document.createElement("p");n.classList.add("results__feedback"),n.innerText=e;const r=document.createElement("input");r.classList.add("results__button"),r.classList.add("game__navigate"),r.type="button",r.value="play again",r.addEventListener("click",x);const s=document.createElement("input");s.classList.add("results__button"),s.classList.add("game__navigate"),s.type="button",s.value="review",s.addEventListener("click",A),c.appendChild(t),c.appendChild(n),c.appendChild(s),c.appendChild(r)},T=()=>{const e=p/f;let t;switch(!0){case e>=.9:t="Exceptional!";break;case e>=.7:t="Very good! Well done.";break;case e>=.5:t="Not bad! See if you could do better.";break;case e>=.2:t="hmmm, a bit more studying wouldn't hurt.";break;default:t="Don't bother playing again!"}return t},x=()=>{c.innerHTML="",u.innerHTML="",u.classList.remove("game--format"),a.classList.remove("form--hidden"),d.classList.remove("message--hidden")};l.addEventListener("click",x);const A=()=>{c.classList.add("results--hidden"),u.classList.remove("game--hidden")};r(void 0,void 0,void 0,(function*(){try{const{data:e}=yield o.default.get("https://opentdb.com/api_category.php");e.trivia_categories.map(((e,t)=>{t+=9;const n=document.createElement("option");n.value=t.toString(),n.innerText=e.name,i.appendChild(n)}))}catch(e){console.log(e)}}))},218:(e,t,n)=>{function r(e,t){return function(){return e.apply(t,arguments)}}const{toString:s}=Object.prototype,{getPrototypeOf:o}=Object,i=(a=Object.create(null),e=>{const t=s.call(e);return a[t]||(a[t]=t.slice(8,-1).toLowerCase())});var a;const c=e=>(e=e.toLowerCase(),t=>i(t)===e),u=e=>t=>typeof t===e,{isArray:l}=Array,d=u("undefined"),f=c("ArrayBuffer"),p=u("string"),h=u("function"),m=u("number"),g=e=>null!==e&&"object"==typeof e,y=e=>{if("object"!==i(e))return!1;const t=o(e);return!(null!==t&&t!==Object.prototype&&null!==Object.getPrototypeOf(t)||Symbol.toStringTag in e||Symbol.iterator in e)},b=c("Date"),E=c("File"),w=c("Blob"),v=c("FileList"),_=c("URLSearchParams");function O(e,t,{allOwnKeys:n=!1}={}){if(null==e)return;let r,s;if("object"!=typeof e&&(e=[e]),l(e))for(r=0,s=e.length;r<s;r++)t.call(null,e[r],r,e);else{const s=n?Object.getOwnPropertyNames(e):Object.keys(e),o=s.length;let i;for(r=0;r<o;r++)i=s[r],t.call(null,e[i],i,e)}}function L(e,t){t=t.toLowerCase();const n=Object.keys(e);let r,s=n.length;for(;s-- >0;)if(r=n[s],t===r.toLowerCase())return r;return null}const S="undefined"==typeof self?void 0===n.g?void 0:n.g:self,R=e=>!d(e)&&e!==S,T=(x="undefined"!=typeof Uint8Array&&o(Uint8Array),e=>x&&e instanceof x);var x;const A=c("HTMLFormElement"),C=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),j=c("RegExp"),N=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};O(n,((n,s)=>{!1!==t(n,s,e)&&(r[s]=n)})),Object.defineProperties(e,r)};var P={isArray:l,isArrayBuffer:f,isBuffer:function(e){return null!==e&&!d(e)&&null!==e.constructor&&!d(e.constructor)&&h(e.constructor.isBuffer)&&e.constructor.isBuffer(e)},isFormData:e=>{const t="[object FormData]";return e&&("function"==typeof FormData&&e instanceof FormData||s.call(e)===t||h(e.toString)&&e.toString()===t)},isArrayBufferView:function(e){let t;return t="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&f(e.buffer),t},isString:p,isNumber:m,isBoolean:e=>!0===e||!1===e,isObject:g,isPlainObject:y,isUndefined:d,isDate:b,isFile:E,isBlob:w,isRegExp:j,isFunction:h,isStream:e=>g(e)&&h(e.pipe),isURLSearchParams:_,isTypedArray:T,isFileList:v,forEach:O,merge:function e(){const{caseless:t}=R(this)&&this||{},n={},r=(r,s)=>{const o=t&&L(n,s)||s;y(n[o])&&y(r)?n[o]=e(n[o],r):y(r)?n[o]=e({},r):l(r)?n[o]=r.slice():n[o]=r};for(let e=0,t=arguments.length;e<t;e++)arguments[e]&&O(arguments[e],r);return n},extend:(e,t,n,{allOwnKeys:s}={})=>(O(t,((t,s)=>{n&&h(t)?e[s]=r(t,n):e[s]=t}),{allOwnKeys:s}),e),trim:e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,""),stripBOM:e=>(65279===e.charCodeAt(0)&&(e=e.slice(1)),e),inherits:(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},toFlatObject:(e,t,n,r)=>{let s,i,a;const c={};if(t=t||{},null==e)return t;do{for(s=Object.getOwnPropertyNames(e),i=s.length;i-- >0;)a=s[i],r&&!r(a,e,t)||c[a]||(t[a]=e[a],c[a]=!0);e=!1!==n&&o(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},kindOf:i,kindOfTest:c,endsWith:(e,t,n)=>{e=String(e),(void 0===n||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return-1!==r&&r===n},toArray:e=>{if(!e)return null;if(l(e))return e;let t=e.length;if(!m(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},forEachEntry:(e,t)=>{const n=(e&&e[Symbol.iterator]).call(e);let r;for(;(r=n.next())&&!r.done;){const n=r.value;t.call(e,n[0],n[1])}},matchAll:(e,t)=>{let n;const r=[];for(;null!==(n=e.exec(t));)r.push(n);return r},isHTMLForm:A,hasOwnProperty:C,hasOwnProp:C,reduceDescriptors:N,freezeMethods:e=>{N(e,((t,n)=>{if(h(e)&&-1!==["arguments","caller","callee"].indexOf(n))return!1;const r=e[n];h(r)&&(t.enumerable=!1,"writable"in t?t.writable=!1:t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")}))}))},toObjectSet:(e,t)=>{const n={},r=e=>{e.forEach((e=>{n[e]=!0}))};return l(e)?r(e):r(String(e).split(t)),n},toCamelCase:e=>e.toLowerCase().replace(/[_-\s]([a-z\d])(\w*)/g,(function(e,t,n){return t.toUpperCase()+n})),noop:()=>{},toFiniteNumber:(e,t)=>(e=+e,Number.isFinite(e)?e:t),findKey:L,global:S,isContextDefined:R,toJSONObject:e=>{const t=new Array(10),n=(e,r)=>{if(g(e)){if(t.indexOf(e)>=0)return;if(!("toJSON"in e)){t[r]=e;const s=l(e)?[]:{};return O(e,((e,t)=>{const o=n(e,r+1);!d(o)&&(s[t]=o)})),t[r]=void 0,s}}return e};return n(e,0)}};function B(e,t,n,r,s){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=(new Error).stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),s&&(this.response=s)}P.inherits(B,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:P.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const D=B.prototype,k={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach((e=>{k[e]={value:e}})),Object.defineProperties(B,k),Object.defineProperty(D,"isAxiosError",{value:!0}),B.from=(e,t,n,r,s,o)=>{const i=Object.create(D);return P.toFlatObject(e,i,(function(e){return e!==Error.prototype}),(e=>"isAxiosError"!==e)),B.call(i,e.message,t,n,r,s),i.cause=e,i.name=e.name,o&&Object.assign(i,o),i};var F="object"==typeof self?self.FormData:window.FormData;function U(e){return P.isPlainObject(e)||P.isArray(e)}function q(e){return P.endsWith(e,"[]")?e.slice(0,-2):e}function I(e,t,n){return e?e.concat(t).map((function(e,t){return e=q(e),!n&&t?"["+e+"]":e})).join(n?".":""):t}const M=P.toFlatObject(P,{},null,(function(e){return/^is[A-Z]/.test(e)}));function z(e,t,n){if(!P.isObject(e))throw new TypeError("target must be an object");t=t||new(F||FormData);const r=(n=P.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,(function(e,t){return!P.isUndefined(t[e])}))).metaTokens,s=n.visitor||l,o=n.dots,i=n.indexes,a=(n.Blob||"undefined"!=typeof Blob&&Blob)&&(c=t)&&P.isFunction(c.append)&&"FormData"===c[Symbol.toStringTag]&&c[Symbol.iterator];var c;if(!P.isFunction(s))throw new TypeError("visitor must be a function");function u(e){if(null===e)return"";if(P.isDate(e))return e.toISOString();if(!a&&P.isBlob(e))throw new B("Blob is not supported. Use a Buffer instead.");return P.isArrayBuffer(e)||P.isTypedArray(e)?a&&"function"==typeof Blob?new Blob([e]):Buffer.from(e):e}function l(e,n,s){let a=e;if(e&&!s&&"object"==typeof e)if(P.endsWith(n,"{}"))n=r?n:n.slice(0,-2),e=JSON.stringify(e);else if(P.isArray(e)&&function(e){return P.isArray(e)&&!e.some(U)}(e)||P.isFileList(e)||P.endsWith(n,"[]")&&(a=P.toArray(e)))return n=q(n),a.forEach((function(e,r){!P.isUndefined(e)&&null!==e&&t.append(!0===i?I([n],r,o):null===i?n:n+"[]",u(e))})),!1;return!!U(e)||(t.append(I(s,n,o),u(e)),!1)}const d=[],f=Object.assign(M,{defaultVisitor:l,convertValue:u,isVisitable:U});if(!P.isObject(e))throw new TypeError("data must be an object");return function e(n,r){if(!P.isUndefined(n)){if(-1!==d.indexOf(n))throw Error("Circular reference detected in "+r.join("."));d.push(n),P.forEach(n,(function(n,o){!0===(!(P.isUndefined(n)||null===n)&&s.call(t,n,P.isString(o)?o.trim():o,r,f))&&e(n,r?r.concat(o):[o])})),d.pop()}}(e),t}function J(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,(function(e){return t[e]}))}function H(e,t){this._pairs=[],e&&z(e,this,t)}const K=H.prototype;function $(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function V(e,t,n){if(!t)return e;const r=n&&n.encode||$,s=n&&n.serialize;let o;if(o=s?s(t,n):P.isURLSearchParams(t)?t.toString():new H(t,n).toString(r),o){const t=e.indexOf("#");-1!==t&&(e=e.slice(0,t)),e+=(-1===e.indexOf("?")?"?":"&")+o}return e}K.append=function(e,t){this._pairs.push([e,t])},K.toString=function(e){const t=e?function(t){return e.call(this,t,J)}:J;return this._pairs.map((function(e){return t(e[0])+"="+t(e[1])}),"").join("&")};var W=class{constructor(){this.handlers=[]}use(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!n&&n.synchronous,runWhen:n?n.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){P.forEach(this.handlers,(function(t){null!==t&&e(t)}))}},X={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},Q="undefined"!=typeof URLSearchParams?URLSearchParams:H,Y=FormData;const Z=(()=>{let e;return("undefined"==typeof navigator||"ReactNative"!==(e=navigator.product)&&"NativeScript"!==e&&"NS"!==e)&&"undefined"!=typeof window&&"undefined"!=typeof document})();var G={isBrowser:!0,classes:{URLSearchParams:Q,FormData:Y,Blob},isStandardBrowserEnv:Z,protocols:["http","https","file","blob","url","data"]};function ee(e){function t(e,n,r,s){let o=e[s++];const i=Number.isFinite(+o),a=s>=e.length;return o=!o&&P.isArray(r)?r.length:o,a?(P.hasOwnProp(r,o)?r[o]=[r[o],n]:r[o]=n,!i):(r[o]&&P.isObject(r[o])||(r[o]=[]),t(e,n,r[o],s)&&P.isArray(r[o])&&(r[o]=function(e){const t={},n=Object.keys(e);let r;const s=n.length;let o;for(r=0;r<s;r++)o=n[r],t[o]=e[o];return t}(r[o])),!i)}if(P.isFormData(e)&&P.isFunction(e.entries)){const n={};return P.forEachEntry(e,((e,r)=>{t(function(e){return P.matchAll(/\w+|\[(\w*)]/g,e).map((e=>"[]"===e[0]?"":e[1]||e[0]))}(e),r,n,0)})),n}return null}const te={"Content-Type":void 0},ne={transitional:X,adapter:["xhr","http"],transformRequest:[function(e,t){const n=t.getContentType()||"",r=n.indexOf("application/json")>-1,s=P.isObject(e);if(s&&P.isHTMLForm(e)&&(e=new FormData(e)),P.isFormData(e))return r&&r?JSON.stringify(ee(e)):e;if(P.isArrayBuffer(e)||P.isBuffer(e)||P.isStream(e)||P.isFile(e)||P.isBlob(e))return e;if(P.isArrayBufferView(e))return e.buffer;if(P.isURLSearchParams(e))return t.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let o;if(s){if(n.indexOf("application/x-www-form-urlencoded")>-1)return function(e,t){return z(e,new G.classes.URLSearchParams,Object.assign({visitor:function(e,t,n,r){return G.isNode&&P.isBuffer(e)?(this.append(t,e.toString("base64")),!1):r.defaultVisitor.apply(this,arguments)}},t))}(e,this.formSerializer).toString();if((o=P.isFileList(e))||n.indexOf("multipart/form-data")>-1){const t=this.env&&this.env.FormData;return z(o?{"files[]":e}:e,t&&new t,this.formSerializer)}}return s||r?(t.setContentType("application/json",!1),function(e,t,n){if(P.isString(e))try{return(0,JSON.parse)(e),P.trim(e)}catch(e){if("SyntaxError"!==e.name)throw e}return(0,JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){const t=this.transitional||ne.transitional,n=t&&t.forcedJSONParsing,r="json"===this.responseType;if(e&&P.isString(e)&&(n&&!this.responseType||r)){const n=!(t&&t.silentJSONParsing)&&r;try{return JSON.parse(e)}catch(e){if(n){if("SyntaxError"===e.name)throw B.from(e,B.ERR_BAD_RESPONSE,this,null,this.response);throw e}}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:G.classes.FormData,Blob:G.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};P.forEach(["delete","get","head"],(function(e){ne.headers[e]={}})),P.forEach(["post","put","patch"],(function(e){ne.headers[e]=P.merge(te)}));var re=ne;const se=P.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),oe=Symbol("internals");function ie(e){return e&&String(e).trim().toLowerCase()}function ae(e){return!1===e||null==e?e:P.isArray(e)?e.map(ae):String(e)}function ce(e,t,n,r){return P.isFunction(r)?r.call(this,t,n):P.isString(t)?P.isString(r)?-1!==t.indexOf(r):P.isRegExp(r)?r.test(t):void 0:void 0}class ue{constructor(e){e&&this.set(e)}set(e,t,n){const r=this;function s(e,t,n){const s=ie(t);if(!s)throw new Error("header name must be a non-empty string");const o=P.findKey(r,s);(!o||void 0===r[o]||!0===n||void 0===n&&!1!==r[o])&&(r[o||t]=ae(e))}const o=(e,t)=>P.forEach(e,((e,n)=>s(e,n,t)));return P.isPlainObject(e)||e instanceof this.constructor?o(e,t):P.isString(e)&&(e=e.trim())&&!/^[-_a-zA-Z]+$/.test(e.trim())?o((e=>{const t={};let n,r,s;return e&&e.split("\n").forEach((function(e){s=e.indexOf(":"),n=e.substring(0,s).trim().toLowerCase(),r=e.substring(s+1).trim(),!n||t[n]&&se[n]||("set-cookie"===n?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)})),t})(e),t):null!=e&&s(t,e,n),this}get(e,t){if(e=ie(e)){const n=P.findKey(this,e);if(n){const e=this[n];if(!t)return e;if(!0===t)return function(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}(e);if(P.isFunction(t))return t.call(this,e,n);if(P.isRegExp(t))return t.exec(e);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,t){if(e=ie(e)){const n=P.findKey(this,e);return!(!n||t&&!ce(0,this[n],n,t))}return!1}delete(e,t){const n=this;let r=!1;function s(e){if(e=ie(e)){const s=P.findKey(n,e);!s||t&&!ce(0,n[s],s,t)||(delete n[s],r=!0)}}return P.isArray(e)?e.forEach(s):s(e),r}clear(){return Object.keys(this).forEach(this.delete.bind(this))}normalize(e){const t=this,n={};return P.forEach(this,((r,s)=>{const o=P.findKey(n,s);if(o)return t[o]=ae(r),void delete t[s];const i=e?function(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,((e,t,n)=>t.toUpperCase()+n))}(s):String(s).trim();i!==s&&delete t[s],t[i]=ae(r),n[i]=!0})),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const t=Object.create(null);return P.forEach(this,((n,r)=>{null!=n&&!1!==n&&(t[r]=e&&P.isArray(n)?n.join(", "):n)})),t}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map((([e,t])=>e+": "+t)).join("\n")}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e,...t){const n=new this(e);return t.forEach((e=>n.set(e))),n}static accessor(e){const t=(this[oe]=this[oe]={accessors:{}}).accessors,n=this.prototype;function r(e){const r=ie(e);t[r]||(function(e,t){const n=P.toCamelCase(" "+t);["get","set","has"].forEach((r=>{Object.defineProperty(e,r+n,{value:function(e,n,s){return this[r].call(this,t,e,n,s)},configurable:!0})}))}(n,e),t[r]=!0)}return P.isArray(e)?e.forEach(r):r(e),this}}ue.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent"]),P.freezeMethods(ue.prototype),P.freezeMethods(ue);var le=ue;function de(e,t){const n=this||re,r=t||n,s=le.from(r.headers);let o=r.data;return P.forEach(e,(function(e){o=e.call(n,o,s.normalize(),t?t.status:void 0)})),s.normalize(),o}function fe(e){return!(!e||!e.__CANCEL__)}function pe(e,t,n){B.call(this,null==e?"canceled":e,B.ERR_CANCELED,t,n),this.name="CanceledError"}P.inherits(pe,B,{__CANCEL__:!0});var he=G.isStandardBrowserEnv?{write:function(e,t,n,r,s,o){const i=[];i.push(e+"="+encodeURIComponent(t)),P.isNumber(n)&&i.push("expires="+new Date(n).toGMTString()),P.isString(r)&&i.push("path="+r),P.isString(s)&&i.push("domain="+s),!0===o&&i.push("secure"),document.cookie=i.join("; ")},read:function(e){const t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}};function me(e,t){return e&&!/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)?function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}(e,t):t}var ge=G.isStandardBrowserEnv?function(){const e=/(msie|trident)/i.test(navigator.userAgent),t=document.createElement("a");let n;function r(n){let r=n;return e&&(t.setAttribute("href",r),r=t.href),t.setAttribute("href",r),{href:t.href,protocol:t.protocol?t.protocol.replace(/:$/,""):"",host:t.host,search:t.search?t.search.replace(/^\?/,""):"",hash:t.hash?t.hash.replace(/^#/,""):"",hostname:t.hostname,port:t.port,pathname:"/"===t.pathname.charAt(0)?t.pathname:"/"+t.pathname}}return n=r(window.location.href),function(e){const t=P.isString(e)?r(e):e;return t.protocol===n.protocol&&t.host===n.host}}():function(){return!0};function ye(e,t){let n=0;const r=function(e,t){e=e||10;const n=new Array(e),r=new Array(e);let s,o=0,i=0;return t=void 0!==t?t:1e3,function(a){const c=Date.now(),u=r[i];s||(s=c),n[o]=a,r[o]=c;let l=i,d=0;for(;l!==o;)d+=n[l++],l%=e;if(o=(o+1)%e,o===i&&(i=(i+1)%e),c-s<t)return;const f=u&&c-u;return f?Math.round(1e3*d/f):void 0}}(50,250);return s=>{const o=s.loaded,i=s.lengthComputable?s.total:void 0,a=o-n,c=r(a);n=o;const u={loaded:o,total:i,progress:i?o/i:void 0,bytes:a,rate:c||void 0,estimated:c&&i&&o<=i?(i-o)/c:void 0,event:s};u[t?"download":"upload"]=!0,e(u)}}const be={http:null,xhr:"undefined"!=typeof XMLHttpRequest&&function(e){return new Promise((function(t,n){let r=e.data;const s=le.from(e.headers).normalize(),o=e.responseType;let i;function a(){e.cancelToken&&e.cancelToken.unsubscribe(i),e.signal&&e.signal.removeEventListener("abort",i)}P.isFormData(r)&&G.isStandardBrowserEnv&&s.setContentType(!1);let c=new XMLHttpRequest;if(e.auth){const t=e.auth.username||"",n=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";s.set("Authorization","Basic "+btoa(t+":"+n))}const u=me(e.baseURL,e.url);function l(){if(!c)return;const r=le.from("getAllResponseHeaders"in c&&c.getAllResponseHeaders());!function(e,t,n){const r=n.config.validateStatus;n.status&&r&&!r(n.status)?t(new B("Request failed with status code "+n.status,[B.ERR_BAD_REQUEST,B.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n)):e(n)}((function(e){t(e),a()}),(function(e){n(e),a()}),{data:o&&"text"!==o&&"json"!==o?c.response:c.responseText,status:c.status,statusText:c.statusText,headers:r,config:e,request:c}),c=null}if(c.open(e.method.toUpperCase(),V(u,e.params,e.paramsSerializer),!0),c.timeout=e.timeout,"onloadend"in c?c.onloadend=l:c.onreadystatechange=function(){c&&4===c.readyState&&(0!==c.status||c.responseURL&&0===c.responseURL.indexOf("file:"))&&setTimeout(l)},c.onabort=function(){c&&(n(new B("Request aborted",B.ECONNABORTED,e,c)),c=null)},c.onerror=function(){n(new B("Network Error",B.ERR_NETWORK,e,c)),c=null},c.ontimeout=function(){let t=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded";const r=e.transitional||X;e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(new B(t,r.clarifyTimeoutError?B.ETIMEDOUT:B.ECONNABORTED,e,c)),c=null},G.isStandardBrowserEnv){const t=(e.withCredentials||ge(u))&&e.xsrfCookieName&&he.read(e.xsrfCookieName);t&&s.set(e.xsrfHeaderName,t)}void 0===r&&s.setContentType(null),"setRequestHeader"in c&&P.forEach(s.toJSON(),(function(e,t){c.setRequestHeader(t,e)})),P.isUndefined(e.withCredentials)||(c.withCredentials=!!e.withCredentials),o&&"json"!==o&&(c.responseType=e.responseType),"function"==typeof e.onDownloadProgress&&c.addEventListener("progress",ye(e.onDownloadProgress,!0)),"function"==typeof e.onUploadProgress&&c.upload&&c.upload.addEventListener("progress",ye(e.onUploadProgress)),(e.cancelToken||e.signal)&&(i=t=>{c&&(n(!t||t.type?new pe(null,e,c):t),c.abort(),c=null)},e.cancelToken&&e.cancelToken.subscribe(i),e.signal&&(e.signal.aborted?i():e.signal.addEventListener("abort",i)));const d=function(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}(u);d&&-1===G.protocols.indexOf(d)?n(new B("Unsupported protocol "+d+":",B.ERR_BAD_REQUEST,e)):c.send(r||null)}))}};P.forEach(be,((e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch(e){}Object.defineProperty(e,"adapterName",{value:t})}}));function Ee(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new pe}function we(e){return Ee(e),e.headers=le.from(e.headers),e.data=de.call(e,e.transformRequest),-1!==["post","put","patch"].indexOf(e.method)&&e.headers.setContentType("application/x-www-form-urlencoded",!1),(e=>{e=P.isArray(e)?e:[e];const{length:t}=e;let n,r;for(let s=0;s<t&&(n=e[s],!(r=P.isString(n)?be[n.toLowerCase()]:n));s++);if(!r){if(!1===r)throw new B(`Adapter ${n} is not supported by the environment`,"ERR_NOT_SUPPORT");throw new Error(P.hasOwnProp(be,n)?`Adapter '${n}' is not available in the build`:`Unknown adapter '${n}'`)}if(!P.isFunction(r))throw new TypeError("adapter is not a function");return r})(e.adapter||re.adapter)(e).then((function(t){return Ee(e),t.data=de.call(e,e.transformResponse,t),t.headers=le.from(t.headers),t}),(function(t){return fe(t)||(Ee(e),t&&t.response&&(t.response.data=de.call(e,e.transformResponse,t.response),t.response.headers=le.from(t.response.headers))),Promise.reject(t)}))}const ve=e=>e instanceof le?e.toJSON():e;function _e(e,t){t=t||{};const n={};function r(e,t,n){return P.isPlainObject(e)&&P.isPlainObject(t)?P.merge.call({caseless:n},e,t):P.isPlainObject(t)?P.merge({},t):P.isArray(t)?t.slice():t}function s(e,t,n){return P.isUndefined(t)?P.isUndefined(e)?void 0:r(void 0,e,n):r(e,t,n)}function o(e,t){if(!P.isUndefined(t))return r(void 0,t)}function i(e,t){return P.isUndefined(t)?P.isUndefined(e)?void 0:r(void 0,e):r(void 0,t)}function a(n,s,o){return o in t?r(n,s):o in e?r(void 0,n):void 0}const c={url:o,method:o,data:o,baseURL:i,transformRequest:i,transformResponse:i,paramsSerializer:i,timeout:i,timeoutMessage:i,withCredentials:i,adapter:i,responseType:i,xsrfCookieName:i,xsrfHeaderName:i,onUploadProgress:i,onDownloadProgress:i,decompress:i,maxContentLength:i,maxBodyLength:i,beforeRedirect:i,transport:i,httpAgent:i,httpsAgent:i,cancelToken:i,socketPath:i,responseEncoding:i,validateStatus:a,headers:(e,t)=>s(ve(e),ve(t),!0)};return P.forEach(Object.keys(e).concat(Object.keys(t)),(function(r){const o=c[r]||s,i=o(e[r],t[r],r);P.isUndefined(i)&&o!==a||(n[r]=i)})),n}const Oe={};["object","boolean","number","function","string","symbol"].forEach(((e,t)=>{Oe[e]=function(n){return typeof n===e||"a"+(t<1?"n ":" ")+e}}));const Le={};Oe.transitional=function(e,t,n){function r(e,t){return"[Axios v1.2.0] Transitional option '"+e+"'"+t+(n?". "+n:"")}return(n,s,o)=>{if(!1===e)throw new B(r(s," has been removed"+(t?" in "+t:"")),B.ERR_DEPRECATED);return t&&!Le[s]&&(Le[s]=!0,console.warn(r(s," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(n,s,o)}};var Se={assertOptions:function(e,t,n){if("object"!=typeof e)throw new B("options must be an object",B.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let s=r.length;for(;s-- >0;){const o=r[s],i=t[o];if(i){const t=e[o],n=void 0===t||i(t,o,e);if(!0!==n)throw new B("option "+o+" must be "+n,B.ERR_BAD_OPTION_VALUE)}else if(!0!==n)throw new B("Unknown option "+o,B.ERR_BAD_OPTION)}},validators:Oe};const Re=Se.validators;class Te{constructor(e){this.defaults=e,this.interceptors={request:new W,response:new W}}request(e,t){"string"==typeof e?(t=t||{}).url=e:t=e||{},t=_e(this.defaults,t);const{transitional:n,paramsSerializer:r,headers:s}=t;let o;void 0!==n&&Se.assertOptions(n,{silentJSONParsing:Re.transitional(Re.boolean),forcedJSONParsing:Re.transitional(Re.boolean),clarifyTimeoutError:Re.transitional(Re.boolean)},!1),void 0!==r&&Se.assertOptions(r,{encode:Re.function,serialize:Re.function},!0),t.method=(t.method||this.defaults.method||"get").toLowerCase(),o=s&&P.merge(s.common,s[t.method]),o&&P.forEach(["delete","get","head","post","put","patch","common"],(e=>{delete s[e]})),t.headers=le.concat(o,s);const i=[];let a=!0;this.interceptors.request.forEach((function(e){"function"==typeof e.runWhen&&!1===e.runWhen(t)||(a=a&&e.synchronous,i.unshift(e.fulfilled,e.rejected))}));const c=[];let u;this.interceptors.response.forEach((function(e){c.push(e.fulfilled,e.rejected)}));let l,d=0;if(!a){const e=[we.bind(this),void 0];for(e.unshift.apply(e,i),e.push.apply(e,c),l=e.length,u=Promise.resolve(t);d<l;)u=u.then(e[d++],e[d++]);return u}l=i.length;let f=t;for(d=0;d<l;){const e=i[d++],t=i[d++];try{f=e(f)}catch(e){t.call(this,e);break}}try{u=we.call(this,f)}catch(e){return Promise.reject(e)}for(d=0,l=c.length;d<l;)u=u.then(c[d++],c[d++]);return u}getUri(e){return V(me((e=_e(this.defaults,e)).baseURL,e.url),e.params,e.paramsSerializer)}}P.forEach(["delete","get","head","options"],(function(e){Te.prototype[e]=function(t,n){return this.request(_e(n||{},{method:e,url:t,data:(n||{}).data}))}})),P.forEach(["post","put","patch"],(function(e){function t(t){return function(n,r,s){return this.request(_e(s||{},{method:e,headers:t?{"Content-Type":"multipart/form-data"}:{},url:n,data:r}))}}Te.prototype[e]=t(),Te.prototype[e+"Form"]=t(!0)}));var xe=Te;class Ae{constructor(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");let t;this.promise=new Promise((function(e){t=e}));const n=this;this.promise.then((e=>{if(!n._listeners)return;let t=n._listeners.length;for(;t-- >0;)n._listeners[t](e);n._listeners=null})),this.promise.then=e=>{let t;const r=new Promise((e=>{n.subscribe(e),t=e})).then(e);return r.cancel=function(){n.unsubscribe(t)},r},e((function(e,r,s){n.reason||(n.reason=new pe(e,r,s),t(n.reason))}))}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)}static source(){let e;return{token:new Ae((function(t){e=t})),cancel:e}}}var Ce=Ae;const je=function e(t){const n=new xe(t),s=r(xe.prototype.request,n);return P.extend(s,xe.prototype,n,{allOwnKeys:!0}),P.extend(s,n,null,{allOwnKeys:!0}),s.create=function(n){return e(_e(t,n))},s}(re);je.Axios=xe,je.CanceledError=pe,je.CancelToken=Ce,je.isCancel=fe,je.VERSION="1.2.0",je.toFormData=z,je.AxiosError=B,je.Cancel=je.CanceledError,je.all=function(e){return Promise.all(e)},je.spread=function(e){return function(t){return e.apply(null,t)}},je.isAxiosError=function(e){return P.isObject(e)&&!0===e.isAxiosError},je.AxiosHeaders=le,je.formToJSON=e=>ee(P.isHTMLForm(e)?new FormData(e):e),je.default=je,e.exports=je}},t={};function n(r){var s=t[r];if(void 0!==s)return s.exports;var o=t[r]={exports:{}};return e[r].call(o.exports,o,o.exports,n),o.exports}n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n(593)})();