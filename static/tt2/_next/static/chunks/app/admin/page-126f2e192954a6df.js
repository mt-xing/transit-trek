(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3],{377:function(e,t,n){Promise.resolve().then(n.bind(n,6068))},6068:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return c}});var l=n(7437),a=n(2265),i=n(7686),s=n.n(i);let r="https://accounts.google.com/o/oauth2/v2/auth?scope=email&response_type=token&redirect_uri=".concat("https://transit-trek-2.vercel.app/admin","&client_id=").concat("370521712823-b7258e13jr4un8ahd1v25eqcto2o0hhs.apps.googleusercontent.com");var c=()=>{let[e,t]=(0,a.useState)(null),[n,i]=(0,a.useState)("home"),[c,o]=(0,a.useState)([]),[d,u]=(0,a.useState)([]);(0,a.useEffect)(()=>{let e;let n=location.hash.substring(1),l={},a=/([^&=]+)=([^&]*)/g;for(;e=a.exec(n);)l[decodeURIComponent(e[1])]=decodeURIComponent(e[2]);if(!l.access_token){location.href=r;return}let i=l.access_token;fetch("/api/private-get",{headers:{token:i}}).then(e=>{if(200!==e.status){alert("Failed to fetch");return}e.json().then(e=>{console.log(e),u(e.teams),o(e.challenges),e.teams&&e.challenges?t(i):alert("ERROR: Fetch failed")})}).catch(()=>alert("failed to fetch"))},[]);let h=(0,a.useMemo)(()=>({teams:d,challenges:c}),[d,c]),p=function(e,t){let[n,l]=a.useState(e);return a.useEffect(()=>{let n=setTimeout(()=>{l(e)},t);return()=>{clearTimeout(n)}},[e,t]),n}(h,1e3);(0,a.useEffect)(()=>{e&&fetch("/api/private-save",{method:"POST",body:JSON.stringify(p),headers:{token:e}}).then(e=>{200!==e.status&&alert("Failed to save")}).catch(()=>alert("Failed to save"))},[p,e]);let m=(0,a.useMemo)(()=>(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("p",{children:["Challenges: ",c.length]}),(0,l.jsx)("ol",{children:d.sort((e,t)=>t.score-e.score).map(e=>(0,l.jsxs)("li",{children:["Team ",e.id+1,": ",e.name," (",e.score,")"]},e.id))}),(0,l.jsx)("button",{onClick:()=>i("challenges"),children:"Edit Challenges"}),(0,l.jsx)("button",{onClick:()=>i("teams"),children:"Edit Teams"}),(0,l.jsx)("button",{onClick:()=>i("entry"),className:s().bigBtn,children:"Enter Points"})]}),[c,d]),[x,g]=(0,a.useState)(""),[j,v]=(0,a.useState)(0),[f,y]=(0,a.useState)(""),[C,b]=(0,a.useState)({t:"one"}),k=(0,a.useCallback)(()=>{x&&(o(e=>e.concat({id:e.length,name:x,point:j,desc:f,type:C})),g(""),v(0),y(""),b({t:"one"}))},[x,j,f,C]),S=(0,a.useMemo)(()=>(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("h2",{children:"Edit Challenges"}),(0,l.jsx)("ol",{children:c.map((e,t)=>(0,l.jsxs)("li",{children:[(0,l.jsx)("input",{placeholder:"Title",type:"text",value:e.name,onChange:t=>o(n=>n.map(n=>n.id===e.id?{...n,name:t.target.value}:n))}),(0,l.jsx)("br",{}),(0,l.jsx)("input",{placeholder:"Desc",type:"text",value:e.desc,onChange:t=>o(n=>n.map(n=>n.id===e.id?{...n,desc:t.target.value}:n))}),(0,l.jsx)("br",{}),"Points: ",(0,l.jsx)("input",{type:"number",value:e.point,onChange:t=>o(n=>n.map(n=>n.id===e.id?{...n,point:parseFloat(t.target.value)}:n))}),(0,l.jsx)("br",{}),"Type: ",(0,l.jsxs)("select",{value:e.type.t,onChange:t=>o(n=>n.map(n=>n.id===e.id?{...n,type:"multiple"===t.target.value?{t:"multiple",num:2}:{t:t.target.value}}:n)),children:[(0,l.jsx)("option",{value:"one",children:"One and Done"}),(0,l.jsx)("option",{value:"multiple",children:"Multi-Part"}),(0,l.jsx)("option",{value:"unlimited",children:"Unlimited"})]}),"multiple"===e.type.t?(0,l.jsx)("input",{type:"number",value:e.type.num,onChange:t=>o(n=>n.map(n=>n.id===e.id?{...n,type:{t:"multiple",num:parseInt(t.target.value)}}:n))}):null,(0,l.jsx)("br",{}),(0,l.jsx)("button",{onClick:()=>o(t=>t.filter(t=>t.id!==e.id).map((e,t)=>({...e,id:t}))),children:"DELETE"}),0!==t?(0,l.jsx)("button",{onClick:()=>o(n=>n.slice(0,t-1).concat(e).concat(n[t-1]).concat(n.slice(t+1))),children:"↑"}):(0,l.jsx)("div",{style:{display:"inline-block",width:"24px"}}),t!==c.length-1?(0,l.jsx)("button",{onClick:()=>o(n=>n.slice(0,t).concat(n[t+1]).concat(e).concat(n.slice(t+2))),children:"↓"}):null]},e.id))}),(0,l.jsxs)("div",{children:[(0,l.jsx)("p",{children:"Add challenge:"}),"Name: ",(0,l.jsx)("input",{placeholder:"Challenge Name",type:"string",value:x,onChange:e=>g(e.target.value)}),"Points: ",(0,l.jsx)("input",{placeholder:"Challenge Name",type:"number",value:j,onChange:e=>v(parseFloat(e.target.value))}),"Desc: ",(0,l.jsx)("input",{placeholder:"Challenge Desc",type:"string",value:f,onChange:e=>y(e.target.value)}),"Type: ",(0,l.jsxs)("select",{value:C.t,onChange:e=>b("multiple"===e.target.value?{t:"multiple",num:2}:{t:e.target.value}),children:[(0,l.jsx)("option",{value:"one",children:"One and Done"}),(0,l.jsx)("option",{value:"multiple",children:"Multi-Part"}),(0,l.jsx)("option",{value:"unlimited",children:"Unlimited"})]})," ","multiple"===C.t?(0,l.jsx)("input",{type:"number",value:C.num,onChange:e=>b({t:"multiple",num:parseInt(e.target.value)}),style:{width:"40px"}}):null,(0,l.jsx)("button",{onClick:k,children:"Add Challenge"})]}),(0,l.jsx)("p",{children:(0,l.jsx)("button",{onClick:()=>i("home"),children:"Done"})})]}),[c,x,k,f,j,C]),[_,E]=(0,a.useState)(""),w=(0,a.useCallback)(()=>{_&&(u(e=>e.concat({id:e.length,name:_,score:0,history:[],challengeStatus:{}})),E(""))},[_]),O=(0,a.useMemo)(()=>(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("h2",{children:"Edit Teams"}),(0,l.jsx)("ol",{children:d.map((e,t)=>(0,l.jsxs)("li",{children:[(0,l.jsx)("input",{type:"text",value:e.name,onChange:t=>u(n=>n.map(n=>n.id===e.id?{...n,name:t.target.value}:n))}),(0,l.jsx)("button",{onClick:()=>u(t=>t.filter(t=>t.id!==e.id).map((e,t)=>({...e,id:t}))),children:"DELETE"}),0!==t?(0,l.jsx)("button",{onClick:()=>u(n=>n.slice(0,t-1).concat(e).concat(n[t-1]).concat(n.slice(t+1))),children:"↑"}):(0,l.jsx)("div",{style:{display:"inline-block",width:"24px"}}),t!==d.length-1?(0,l.jsx)("button",{onClick:()=>u(n=>n.slice(0,t).concat(n[t+1]).concat(e).concat(n.slice(t+2))),children:"↓"}):null]},e.id))}),(0,l.jsxs)("div",{children:[(0,l.jsx)("p",{children:"Add team:"}),(0,l.jsx)("input",{placeholder:"Team Name",type:"string",value:_,onChange:e=>E(e.target.value)}),(0,l.jsx)("button",{onClick:w,children:"Add Team"})]}),(0,l.jsx)("p",{children:(0,l.jsx)("button",{onClick:()=>i("home"),children:"Done"})})]}),[d,_,w]),[T,F]=(0,a.useState)(-1),[A,N]=(0,a.useState)(""),[P,D]=(0,a.useState)(-1),I=(0,a.useCallback)((e,t,n)=>{u(l=>l.map(l=>l.id!==e?l:{...l,score:l.score+(n?1:-1)*t.point,history:l.history.concat({jsTimestamp:new Date().getTime(),log:"Complete ".concat(n," challenge ").concat(t.id," for points ").concat(t.point)})}))},[]),R=(0,a.useRef)(null);(0,a.useEffect)(()=>{let e=e=>{if("ControlRight"===e.code){var t;null===(t=R.current)||void 0===t||t.focus()}};return window.addEventListener("keydown",e),()=>{window.removeEventListener("keydown",e)}},[]);let L=(0,a.useMemo)(()=>(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("p",{children:["Team: ",(0,l.jsxs)("select",{ref:R,value:T,onChange:e=>F(parseInt(e.target.value)),children:[(0,l.jsx)("option",{value:"-1",children:"PICK"}),d.sort((e,t)=>e.id-t.id).map(e=>(0,l.jsxs)("option",{value:e.id,children:[e.id+1,": ",e.name]},e.id))]})]}),(0,l.jsxs)("p",{children:["Challenge Filter: ",(0,l.jsx)("input",{type:"text",value:A,onChange:e=>{let t=e.target.value;N(t);let n=t.toLowerCase();n&&1===c.filter(e=>e.name.toLowerCase().indexOf(n)>-1).length?(console.log("Auto"),D(c.find(e=>e.name.toLowerCase().indexOf(n)>-1).id)):D(-1)}})]}),(0,l.jsxs)("p",{children:["Challenge: ",(0,l.jsxs)("select",{value:P,onChange:e=>D(parseInt(e.target.value)),children:[(0,l.jsx)("option",{value:"-1",children:"PICK"}),c.filter(e=>!A||e.name.toLowerCase().indexOf(A.toLowerCase())>-1).map(e=>(0,l.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),-1!==T&&-1!==P&&d[T]&&c[P]?(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("h2",{children:"Challenge Status"}),(0,l.jsxs)("p",{children:["Team: ",d[T].name]}),(0,l.jsxs)("p",{children:["Challenge: ",c[P].name]}),c[P].desc?(0,l.jsx)("p",{children:c[P].desc}):null,(0,l.jsxs)("p",{children:[c[P].point," Point(s)"]}),(()=>{let e=c[P],t=d[T];switch(e.type.t){case"one":{let n=t.challengeStatus[P],a=!!n&&n[0];return(0,l.jsxs)(l.Fragment,{children:[a?"Completed!":"Incomplete; check box to complete",(0,l.jsx)("br",{}),(0,l.jsx)("input",{type:"checkbox",checked:a,onChange:n=>{let l=n.target.checked;u(n=>n.map(n=>n.id!==t.id?n:{...n,challengeStatus:{...n.challengeStatus,[e.id]:[l]}})),I(t.id,e,l)}})]})}case"multiple":{let n=(()=>{let n=t.challengeStatus[P];return n?n.length===e.type.num?n:n.length<e.type.num?n.concat(Array.from(Array(e.type.num-n.length)).map(e=>!1)):n.slice(0,e.type.num):Array.from(Array(e.type.num)).map(e=>!1)})();return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("p",{children:n.every(e=>e)?"Completed!":"Incomplete"}),(0,l.jsx)("ol",{children:n.map((a,i)=>(0,l.jsx)("li",{children:(0,l.jsx)("input",{type:"checkbox",checked:a,onChange:l=>u(a=>a.map(a=>a.id!==t.id?a:{...a,challengeStatus:{...a.challengeStatus,[e.id]:(()=>{let a=n.slice();return a[i]=l.target.checked,a.every(e=>e)&&n.some(e=>!e)?I(t.id,e,!0):a.some(e=>!e)&&n.every(e=>e)&&I(t.id,e,!1),a})()}}))})},i))})]})}case"unlimited":{let n=t.challengeStatus[P],a=n?n.length:0;return(0,l.jsxs)(l.Fragment,{children:["Completed ",(0,l.jsx)("span",{style:{fontSize:"3em"},children:a})," time(s)",(0,l.jsx)("br",{}),(0,l.jsx)("button",{onClick:n=>{u(n=>n.map(n=>n.id!==t.id?n:{...n,challengeStatus:{...n.challengeStatus,[e.id]:Array.from(Array(a+1)).map(e=>!0)}})),I(t.id,e,!0)},className:s().bigBtn,children:"+ Add One"}),(0,l.jsx)("button",{onClick:n=>{u(n=>n.map(n=>n.id!==t.id?n:{...n,challengeStatus:{...n.challengeStatus,[e.id]:Array.from(Array(a-1>0?a-1:0)).map(e=>!0)}})),I(t.id,e,!1)},className:s().bigBtn,children:"- Sub One"})]})}}})()]}):null,(0,l.jsx)("p",{children:(0,l.jsx)("button",{onClick:()=>{i("home"),F(-1),D(-1)},children:"Return Home"})})]}),[T,P,A,d,c,I]),M=(0,a.useMemo)(()=>{switch(n){case"home":return m;case"challenges":return S;case"entry":return L;case"teams":return O;default:(e=>{throw Error(e)})(n)}},[n,m,O,S,L]);return(0,l.jsxs)("div",{className:s().adminWrap,children:[(0,l.jsx)("h1",{children:"Super Secret Admin Page"}),(0,l.jsx)("p",{children:(0,l.jsx)("a",{href:"/admin",className:s().bigBtn,children:"Force Refresh"})}),e?M:"LOADING"]})}},7686:function(e){e.exports={adminWrap:"admin_adminWrap__K0siD",bigBtn:"admin_bigBtn__9wYko"}},622:function(e,t,n){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var l=n(2265),a=Symbol.for("react.element"),i=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,r=l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,c={key:!0,ref:!0,__self:!0,__source:!0};function o(e,t,n){var l,i={},o=null,d=null;for(l in void 0!==n&&(o=""+n),void 0!==t.key&&(o=""+t.key),void 0!==t.ref&&(d=t.ref),t)s.call(t,l)&&!c.hasOwnProperty(l)&&(i[l]=t[l]);if(e&&e.defaultProps)for(l in t=e.defaultProps)void 0===i[l]&&(i[l]=t[l]);return{$$typeof:a,type:e,key:o,ref:d,props:i,_owner:r.current}}t.Fragment=i,t.jsx=o,t.jsxs=o},7437:function(e,t,n){"use strict";e.exports=n(622)}},function(e){e.O(0,[971,596,744],function(){return e(e.s=377)}),_N_E=e.O()}]);