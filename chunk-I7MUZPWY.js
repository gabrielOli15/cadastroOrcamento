import{a as b,c as L}from"./chunk-Y7ZRXO2H.js";import{A as s,B as h,C as g,D as l,Oa as f,Pa as v,g as c,l as p,ma as d,na as n,o as r,u as m,w as a,x as u}from"./chunk-63LJVA47.js";var w=(()=>{class o{constructor(t,e){this.router=t,this.storage=e,this.hideRememberUser=!0,this.menus=[{label:"Painel",link:"./painel",icon:"an an-ranking",shortLabel:"Painel"},{label:"Atualiza\xE7\xE3o de Pre\xE7os",link:"./precos",icon:"an an-money",shortLabel:"Pre\xE7os"},{label:"Par\xE2metros de or\xE7amentos",link:"./parametros",icon:"an an-gear",shortLabel:"Par\xE2metros"},{label:"Estruturas de or\xE7amentos",link:"./estrutura",icon:"an an-tree-view",shortLabel:"Estruturas"},{label:"Forma\xE7\xE3o de or\xE7amento",link:"./formacao",icon:"an an-layout",shortLabel:"Or\xE7amentos"},{label:"Solicitar or\xE7amento",link:"./solicitar",icon:"an an-receipt",shortLabel:"Solicitar"},{label:"Sair",action:()=>this.closeApp(),icon:"an an-sign-out",shortLabel:"Sair"}]}closeApp(){this.storage.remove("loggedIn").then(()=>{this.router.navigate(["/login"])})}static{this.\u0275fac=function(e){return new(e||o)(a(n),a(b))}}static{this.\u0275cmp=u({type:o,selectors:[["app-home"]],standalone:!1,decls:4,vars:3,consts:[["p-logo","../../assets/logo.png","p-logo-alt","string",3,"p-shadow"],[1,"po-wrapper"],["p-logo","../../assets/logo.png",3,"p-menus","p-collapsed"]],template:function(e,i){e&1&&(l(0,"po-navbar",0),h(1,"div",1),l(2,"po-menu",2)(3,"router-outlet"),g()),e&2&&(s("p-shadow",i.hideRememberUser),m(2),s("p-menus",i.menus)("p-collapsed",!0))},dependencies:[d,f,v],encapsulation:2})}}return o})();var j=(()=>{class o{constructor(t,e){this.loginService=t,this.router=e}canActivate(t,e){let i;return i=this.checkLogin(),i}canActivateChild(t,e){let i;return i=this.checkLogin(),i}checkLogin(){return c(this,null,function*(){let t,e=new Date;return t=yield this.loginService.isLoggedIn().then(i=>new Date(i)<e?this.router.navigate(["/login"]):!0),t})}static{this.\u0275fac=function(e){return new(e||o)(r(L),r(n))}}static{this.\u0275prov=p({token:o,factory:o.\u0275fac,providedIn:"root"})}}return o})();export{w as a,j as b};
