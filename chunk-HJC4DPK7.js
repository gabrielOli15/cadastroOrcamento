import{a as Vt}from"./chunk-HNFZQEMD.js";import{a as U}from"./chunk-FF4B56LT.js";import{A as c,B as p,C as d,Ca as N,D as I,Da as ft,E as K,Ea as _t,F as _,Fa as bt,G as w,Ga as vt,H as Z,Ha as $,I as O,Ia as Et,J as k,K as B,Ka as gt,L as D,La as Ct,M as Y,Ma as wt,N as tt,O as y,P as T,Q as P,Qa as yt,R as et,Ra as Tt,Sa as Pt,Ta as Mt,Ua as St,V as rt,W as ot,Y as at,_a as It,a as V,b as Q,l as G,na as st,o as H,p as l,pa as it,q as u,qa as lt,ra as ut,sa as nt,t as J,ta as pt,u as n,ua as ct,va as dt,w as F,wa as R,x as X,xa as q,ya as ht,z as j,za as mt}from"./chunk-63LJVA47.js";var Dt=new U,kt=(()=>{class b{constructor(t){this.http=t,this.serviceApi=Dt.URL+"/cardallapis"}getColumnsBusca(){return[{property:"value",label:"Produto"},{property:"label",label:"Descri\xE7\xE3o"},{property:"UM",label:"UM"}]}getColumns(){return[{property:"estrutura",type:"label",label:"Estrutura",width:"5%",labels:[{value:1,color:"color-01",label:"1",textColor:"white"},{value:2,color:"color-02",label:"2",textColor:"white"},{value:3,color:"color-03",label:"3",textColor:"white"},{value:4,color:"color-04",label:"4",textColor:"white"},{value:5,color:"color-05",label:"5",textColor:"white"},{value:6,color:"color-06",label:"6",textColor:"white"},{value:7,color:"color-07",label:"7",textColor:"white"},{value:8,color:"color-08",label:"8",textColor:"white"},{value:9,color:"color-09",label:"9",textColor:"white"},{value:10,color:"color-10",label:"10",textColor:"white"},{value:11,color:"color-11",label:"11",textColor:"white"},{value:12,color:"color-12",label:"12",textColor:"white"},{value:13,color:"color-01",label:"13",textColor:"white"},{value:14,color:"color-02",label:"14",textColor:"white"},{value:15,color:"color-03",label:"15",textColor:"white"},{value:16,color:"color-04",label:"16",textColor:"white"},{value:17,color:"color-05",label:"17",textColor:"white"},{value:18,color:"color-06",label:"18",textColor:"white"},{value:19,color:"color-07",label:"19",textColor:"white"},{value:20,color:"color-08",label:"20",textColor:"white"},{value:21,color:"color-09",label:"21",textColor:"white"},{value:22,color:"color-10",label:"22",textColor:"white"},{value:23,color:"color-11",label:"23",textColor:"white"},{value:24,color:"color-12",label:"24",textColor:"white"},{value:25,color:"color-01",label:"25",textColor:"white"},{value:26,color:"color-02",label:"26",textColor:"white"},{value:27,color:"color-03",label:"27",textColor:"white"},{value:28,color:"color-04",label:"28",textColor:"white"},{value:29,color:"color-05",label:"29",textColor:"white"},{value:30,color:"color-06",label:"30",textColor:"white"}]},{property:"value",label:"Produto"},{property:"label",label:"Descri\xE7\xE3o"},{property:"pai",label:"Pai"},{property:"UM",label:"UM"},{property:"quantidade",label:"Quantidade",type:"number"},{property:"peso",label:"Peso",type:"number"},{property:"custounit",type:"currency",label:"Custo Unit\xE1rio",format:"BRL"},{property:"custototal",type:"currency",label:"Custo Total",format:"BRL"}]}getPageOptions(){return{keepFilters:!0}}getProdutos(t){return this.http.get(this.serviceApi+"/produtos?filter="+t)}getModObra(t){return this.http.get(this.serviceApi+"/modobra/"+t)}getKitTinta(t){return this.http.get(this.serviceApi+"/kittinta/"+t)}static{this.\u0275fac=function(a){return new(a||b)(H(at))}}static{this.\u0275prov=G({token:b,factory:b.\u0275fac,providedIn:"root"})}}return b})();var Ft=["stepper"],Lt=["definicaoForm"],At=()=>({standalone:!0});function Wt(b,z){if(b&1){let t=K();p(0,"po-accordion-item",37,3)(2,"div",38),I(3,"po-tag",39),d(),p(4,"div",8),tt(5,"\xA0"),d(),p(6,"div",19)(7,"po-button",40),_("p-click",function(){let e=l(t).index,r=w();return u(r.removerEstrutura(e))}),d(),p(8,"po-button",41),_("p-click",function(){let e=l(t).index,r=w();return u(r.modelProdutos(e))}),d()(),p(9,"po-tree-view",42),_("p-selected",function(e){l(t);let r=w();return u(r.selecionarTreeIrem(e))})("p-unselected",function(e){l(t);let r=w();return u(r.removerTreeItem(e))}),d(),I(10,"po-divider"),p(11,"po-multiselect",43),P("ngModelChange",function(e){let r=l(t).index,s=w();return T(s.parametroEstruturaEspecial[r],e)||(s.parametroEstruturaEspecial[r]=e),u(e)}),_("p-change",function(e){let r=l(t).index,s=w();return u(s.onChangeParametro(e,s.parametroEstruturaEspecial[r],r))}),d(),I(12,"po-divider"),p(13,"po-widget",44),_("p-primary-action",function(){l(t);let e=w();return u(e.checkOut())}),I(14,"po-table",45),d()()}if(b&2){let t=z.$implicit,a=z.index,e=w();Z("p-label",t.label),n(3),O("p-color","color-0",a+1,""),O("p-value","Estrutura ",a+1,""),n(6),c("p-selectable",!0)("p-items",e.produtosTree[a])("p-max-level",5),n(2),y("ngModel",e.parametroEstruturaEspecial[a]),c("ngModelOptions",et(19,At))("p-disabled",e.tipoEstrutura)("p-filter-service",e.parametrosUrl),n(2),O("p-title","Resumo da estrutura ",a+1,""),n(),c("p-spacing",e.tableSpacing)("p-columns",e.colunasTotais)("p-items",e.itemsTotais[a])("p-hide-table-search",!0)("p-hide-columns-manager",!0)}}function Ot(b,z){b&1&&I(0,"po-loading-overlay",46)}var Rt=new U,Xt=(()=>{class b{constructor(t,a,e,r,s){this.poAlert=t,this.cadastraEstruturaService=a,this.parametrosEstruturaService=e,this.poNotification=r,this.router=s,this.produtosEstrutura=[],this.produtosEstruturaCopiar=[],this.produtosEstruturaCompleta=[],this.filteredProdutosEstrutura=[],this.produtosTree=[Array],this.itemsListSelected=[],this.isLoadingBusca=!1,this.confirmaEstrutura=!1,this.statusEstrutura=!0,this.tipoEstrutura=!0,this.tipoEstEspecial=!0,this.acaoBotoesTable=!0,this.nomeEstrutura="",this.parametroEstrutura=[],this.parametroEstruturaEspecial=[],this.areaInterna=0,this.areaExterna=0,this.observacao="",this.codigoEstrutura="",this.lastSelectedIndex=null,this.selectedIndex=0,this.parametrosUrl=Rt.URL+"/cardallapis/ZX2/ZX2_DESC",this.estruturaSelecionadaIndex=null,this.produtoTreeViewSelecionado=null,this.columnsItemsSelected=[{property:"item",label:"Servi\xE7o"},{property:"valor",label:"Valor",type:"currency",format:"BRL"}],this.confirmed=!1,this.columnsProdutosEstrutura=[],this.columnsDefault=[],this.produtos=[],this.total=0,this.totalExpanded=0,this.initialColumns=[],this.estruturas=[],this.produtosBusca=[],this.tituloModel="Adicionar novo item \xE0 estrutura",this.columnsProdutosBusca=[],this.itemsTotalGeral=[],this.itemsTotais=[],this.itemsTotaisDef=[{item:"Mat\xE9ria-Prima",valor:0},{item:"Material El\xE9trico",valor:0},{item:"Elementos de Fixa\xE7\xE3o",valor:0},{item:"Transmiss\xE3o",valor:0},{item:"Hidr\xE1ulicos e Pneum\xE1ticos",valor:0},{item:"Secund\xE1rios",valor:0},{item:"Material de Consumo",valor:0},{item:"Material Comercial",valor:0},{item:"Material Transforma\xE7\xE3o",valor:0},{item:"Total Geral de Materiais",valor:0},{item:"Total Servi\xE7os Gerais",valor:0},{item:"Total M\xE3o-de-Obra",valor:0},{item:"Total Outros",valor:0},{item:"Custo Total do Produto",valor:0},{item:"Total Geral",valor:0}],this.tableSpacing=vt.Small,this.colunasTotais=[{property:"item",label:"Descri\xE7\xE3o"},{property:"valor",label:"Valor",type:"currency",format:"BRL"},{property:"horas",label:"Horas"},{property:"peso",label:"Peso"}],this.breadcrumb={items:[{label:"Or\xE7amentos",action:this.beforeRedirect.bind(this,"orcamentos")},{label:"Estruturas",action:this.beforeRedirect.bind(this,"orcamentos/estrutura")},{label:"Cadastro"}]},this.parametros={items:[],hasNext:!1,remaningRecords:0},this.listaFiltros=[{label:"Estrutura",value:["estrutura"]},{label:"Produto",value:["pai","value","label"]},{label:"UM",value:"UM"},{label:"Quantidade",value:"quantidade"},{label:"Peso",value:"peso"},{label:"Custo Unit\xE1rio",value:"custounit"},{label:"Custo Total",value:"custototal"},{label:"Custo Standard",value:"custostandard"}],this.pageActions=[{action:this.salvarEstrutura.bind(this),label:"Salvar",separator:!0,visible:this.isConfirmedEstrutura.bind(this,2),type:"primary"},{action:this.beforeRedirect.bind(this,"orcamentos/estrutura"),label:"Voltar",separator:!0,type:"secondary"}],this.actions=[{action:this.editarProdutoEstrutura.bind(this),icon:"po-icon-edit",label:" ",separator:!0}],this.selecionar={action:()=>{this.selecionarProdutoBusca()},label:"Selecionar"},this.novoProduto={action:()=>{console.log("novo produto")},label:"Novo Produto"},this.listaFiltrosBusca=[{label:"Estrutura",value:["estrutura"]},{label:"Produto",value:["produto"]},{label:"Produto Gen\xE9rico",value:["generico"]},{label:"Servi\xE7o",value:["servico"]}],this.filters=[{property:"C\xF3digo",gridColumns:6}],this.literals={filterConfirmLabel:"Aplicar",filterTitle:"Filtro avan\xE7ado",quickSearchLabel:"Valor pesquisado:"}}ngOnInit(){this.columnsProdutosEstrutura=this.cadastraEstruturaService.getColumns(),this.columnsProdutosBusca=this.cadastraEstruturaService.getColumnsBusca(),this.parametrosEstruturaService.getParametros().subscribe(t=>{this.parametros=t})}handleKeyboardEvent(t){t.ctrlKey&&t.key==="c"||t.metaKey&&t.key==="c"&&!this.acaoBotoesTable?this.copiarEstrutura():t.ctrlKey&&t.key==="v"||t.metaKey&&t.key==="v"&&this.produtosEstruturaCopiar.length>0?this.colarEstrutura():t.key==="Delete"&&this.deletarProdutoEstrutura()}editarProdutoEstrutura(t){console.log("row",t),this.poNotification.success("Editar Produto Estrutura")}onChangeTipoEstrutura(t){}isConfirmedEstrutura(t){return this.confirmaEstrutura=!0,t===1?this.definicaoForm.valid?this.confirmaEstrutura=!0:this.confirmaEstrutura=!1:t===2&&(this.produtosEstrutura.length>0?this.confirmaEstrutura=!0:this.confirmaEstrutura=!1),!!this.confirmaEstrutura}adicionarEstrutura(t){return this.estruturas.length>0&&this.produtosTree.push(Array),this.estruturas.push({index:this.estruturas.length,label:t}),this.itemsTotais.push({}),this.parametroEstruturaEspecial.push(""),this.estruturas.length}removerEstrutura(t){this.estruturas.splice(t,1),this.produtosTree.splice(t,1),this.produtosEstrutura=this.produtosEstruturaCompleta,this.produtosEstrutura=this.produtosEstrutura.filter(a=>a.estrutura!==t+1),this.produtosEstrutura.forEach(a=>{a.estrutura>t+1&&(a.estrutura=a.estrutura-1)}),this.filteredProdutosEstrutura=[...this.produtosEstrutura],this.produtosEstruturaCompleta=this.produtosEstrutura}selecionarTreeIrem(t){console.log("seletectedItem",t),this.produtoTreeViewSelecionado=t;let a=s=>s.subItems?[s.value,...s.subItems.flatMap(a)]:s.value,e=this.produtosEstrutura.flatMap(a),r=[t].flatMap(a);this.produtosEstrutura.length<this.produtosEstruturaCompleta.length&&(r=[...r,...e]),this.produtosEstrutura=this.produtosEstruturaCompleta,this.produtosEstrutura=this.produtosEstrutura.filter(s=>r.includes(s.value)),this.filteredProdutosEstrutura=[...this.produtosEstrutura]}removerTreeItem(t){t=[t];let a=r=>r.subItems?[r.value,...r.subItems.flatMap(a)]:r.value,e=t.flatMap(a);this.produtosEstrutura=this.produtosEstrutura.filter(r=>!e.includes(r.value)),this.produtosEstrutura.length===0?this.produtosEstrutura=this.produtosEstruturaCompleta:this.produtosEstruturaCompleta=this.produtosEstrutura}selecionarProduto(t){this.acaoBotoesTable=!1,this.selectedIndex=this.produtosEstrutura.findIndex(a=>a.value===t.value),t.value&&(this.total+=t.value)}deselecionarProduto(t){let a=!this.produtosEstrutura.find(function(e){return e.$selected});this.acaoBotoesTable=a,t.value&&(this.total-=t.value)}cliqueLinha(t){if(t.shiftKey&&this.lastSelectedIndex!==null){let a=Math.min(this.lastSelectedIndex,this.selectedIndex),e=Math.max(this.lastSelectedIndex,this.selectedIndex);for(let r=a;r<=e;r++)this.produtosEstrutura[r].$selected=!0}this.lastSelectedIndex=this.selectedIndex}copiarEstrutura(){let t=this.produtosEstrutura.flatMap(e=>e.$selected?`${e.estrutura}-${e.value}`:[]);this.produtosEstrutura.forEach(e=>{t.includes(`${e.estrutura}-${e.pai}`)&&t.push(`${e.estrutura}-${e.value}`)}),this.produtosEstruturaCopiar=this.produtosEstrutura.filter(e=>t.includes(`${e.estrutura}-${e.value}`)).map(e=>V({},e));let a={message:"Copiado.",orientation:void 0,action:void 0,actionLabel:"",duration:500};this.poNotification.success(a),this.poTable.unselectRows(),this.acaoBotoesTable=!0}colarEstrutura(){if(this.produtosEstruturaCopiar.length>0){let t=this.produtosEstrutura.findIndex(a=>a.$selected);if(t!==-1){let a=this.produtosEstrutura[t],e=this.produtosEstrutura.slice(0,t+1),r=this.produtosEstrutura.slice(t+1),s=this.produtosEstrutura[t].estrutura-1,o=this.produtosEstruturaCopiar.map(m=>Q(V({},m),{estrutura:this.produtosEstrutura[t].estrutura,pai:this.produtosEstruturaCopiar.some(h=>h.value===m.pai)?m.pai:this.produtosEstrutura[t].value}));this.produtosEstrutura=[...e,...o,...r],this.filteredProdutosEstrutura=[...this.produtosEstrutura],this.produtosEstruturaCompleta=[...this.produtosEstrutura];let i=(m=>{let h=new Map,S=[];return m.forEach(g=>{let E={label:g.label,value:g.value,pai:g.pai,subItems:[]};h.set(g.value,E),g.pai===null||!h.has(g.pai)?S.push(E):h.get(g.pai).subItems.push(E)}),S})(o),v=(m,h,S,g)=>{for(let E=0;E<m.length;E++){if(m[E].value===h&&m[E].pai===S)return m[E].subItems=[...m[E].subItems,...g],!0;if(m[E].subItems&&v(m[E].subItems,h,S,g))return!0}return!1};v(this.produtosTree[s],a.value,a.pai,i),this.produtosTree[s]=[...this.produtosTree[s]];let M={message:"Colado.",orientation:void 0,action:void 0,actionLabel:"",duration:500};this.produtosEstruturaCopiar=[],this.poNotification.success(M),this.poTable.unselectRows(),this.acaoBotoesTable=!0}}}deletarProdutoEstrutura(){this.acaoBotoesTable||this.poAlert.confirm({literals:{cancel:"N\xE3o",confirm:"Sim"},title:"Excluir",message:"Deseja remover os produtos selecionados da estrutura?",confirm:()=>{let t=this.produtosEstrutura.flatMap(r=>r.$selected?`${r.estrutura}-${r.value}`:[]);this.produtosEstrutura.forEach(r=>{t.includes(`${r.estrutura}-${r.pai}`)&&t.push(`${r.estrutura}-${r.value}`)}),this.produtosEstrutura=this.produtosEstrutura.filter(r=>!t.includes(`${r.estrutura}-${r.value}`)),this.produtosEstruturaCompleta=this.produtosEstruturaCompleta.filter(r=>!t.includes(`${r.estrutura}-${r.value}`)),this.produtosEstrutura.length===0&&(this.produtosEstrutura=this.produtosEstruturaCompleta);let a=(r,s)=>r.subItems?(r.subItems=r.subItems.filter(o=>a(o,s)),!t.includes(`${s}-${r.value}`)||r.subItems.length>0):!t.includes(`${s}-${r.value}`);this.produtosTree=this.produtosTree.map((r,s)=>r.filter(o=>a(o,s+1)));let e=!this.produtosEstrutura.find(function(r){return r.$selected});this.acaoBotoesTable=e}})}BuscarProdutos(t){this.isLoadingBusca=!0,this.cadastraEstruturaService.getProdutos(t).subscribe(a=>{console.log(a),this.produtosBusca=a&&a.items||[],this.isLoadingBusca=!1})}filtrarProdutos(t){t.length===0?this.produtosEstrutura=this.produtosEstruturaCompleta:this.produtosEstrutura=t}VerificarFiltroProdutos(t){t||(this.produtosEstrutura=this.produtosEstruturaCompleta)}onLoadModal(){return this.cadastraEstruturaService.getPageOptions()}selecionarProdutoBusca(){this.produtosBusca.forEach(t=>{if(t.$selected&&!this.produtos.find(a=>a.value===t.value)){let a;this.estruturaSelecionadaIndex!==null?(a=this.estruturaSelecionadaIndex+1,t.pai=this.produtoTreeViewSelecionado.value):a=this.adicionarEstrutura(t.value+" - "+t.label),t.estrutura=a,this.produtos.push(t);let e,r=[t],s=i=>i.subItems?{label:i.label,value:i.value,pai:i.pai,subItems:i.subItems.map(s)}:{label:i.label,value:i.value,pai:i.pai,subItems:[]};if(e=r.map(s)[0],this.estruturaSelecionadaIndex!==null){let i=(v,M,m)=>{for(let h=0;h<v.length;h++){if(v[h].value===M)return v[h].subItems||(v[h].subItems=[]),v[h].subItems=[...v[h].subItems,V({},m)],!0;if(v[h].subItems&&v[h].subItems.length>0&&i(v[h].subItems,M,m))return!0}return!1};i(this.produtosTree[a-1],this.produtoTreeViewSelecionado.value,e)?this.produtosTree[a-1]=[...this.produtosTree[a-1]]:this.produtosTree[a-1]=[...this.produtosTree[a-1],V({},e)]}else this.produtosTree[a-1]=[V({},e)];let o=i=>i.subItems?[{estrutura:a,pai:i.pai,value:i.value,label:i.label,UM:i.UM,quantidade:i.quantidade,peso:i.peso,custounit:i.custounit,custototal:i.custototal,custostandard:i.custostandard,tipo:i.tipo,grupo:i.grupo,subgrupo:i.subgrupo},...i.subItems.flatMap(o)]:{estrutura:a,pai:i.pai,value:i.value,label:i.label,UM:i.UM,quantidade:i.quantidade,peso:i.peso,custounit:i.custounit,custototal:i.custototal,custostandard:i.custostandard,tipo:i.tipo,grupo:i.grupo,subgrupo:i.subgrupo},C=r.flatMap(o);console.log("novoProdutoEstrutura",C),console.log("this.produtosEstrutura",this.produtosEstrutura),console.log("this.produtosEstruturaCompleta",this.produtosEstruturaCompleta),this.produtosEstruturaCompleta=[...this.produtosEstruturaCompleta,...C],this.produtosEstrutura=[...this.produtosEstruturaCompleta],this.tipoEstrutura&&this.calculaTotais(a-1,this.parametroEstrutura,!1)}}),this.poModal.close()}onChangeParametro(t,a,e){e!==void 0?this.calculaTotais(e,a,!1):this.calculaTotaisEstruturas()}calculaTotaisEstruturas(){this.estruturas.forEach(t=>{this.calculaTotais(t.index-1,this.parametroEstrutura,!0)})}calculaTotais(t,a,e){let r=0;console.log("calculaTotais",t,e),this.itemsTotais[t]=JSON.parse(JSON.stringify(this.itemsTotaisDef)),this.produtosEstrutura.forEach(s=>{if(s.estrutura===t+1||e){console.log("item",s);let o=s.grupo.substring(0,2),C=s.subgrupo.substring(3);switch(r+=s.peso,!0){case o==="01":this.itemsTotais[t][0].valor+=s.custototal;break;case(o==="02"||o==="09"):this.itemsTotais[t][1].valor+=s.custototal;break;case o==="03":this.itemsTotais[t][2].valor+=s.custototal;break;case o==="04":this.itemsTotais[t][3].valor+=s.custototal;break;case o==="05":this.itemsTotais[t][4].valor+=s.custototal;break;case o==="06":this.itemsTotais[t][5].valor+=s.custototal;break;case o==="07":this.itemsTotais[t][6].valor+=s.custototal;break;case o==="00":this.itemsTotais[t][10].valor+=s.custototal;break;case o==="MOD":this.itemsTotais[t][11].valor+=s.custototal;break;case(o==="10"&&C!=="100"):this.itemsTotais[t][12].valor+=s.custototal;break}C==="001"&&(this.itemsTotais[t][7].valor+=s.custototal),C==="002"&&o!=="09"&&(this.itemsTotais[t][8].valor+=s.custototal)}}),r=Math.round(r*100)/100,this.itemsTotais[t][9].valor=this.itemsTotais[t].slice(0,9).reduce((s,o)=>s+o.valor,0),this.itemsTotais[t][13].valor=this.itemsTotais[t].slice(10,13).reduce((s,o)=>s+o.valor,0),this.tipoEstrutura&&(console.log("parametros",a),a.forEach(s=>{let o=this.parametros.items.find(C=>C.zx2_cod===s);if(o){console.log("Par\xE2metro encontrado:",o);let C=o.zx2_var,i=o.zx2_mod,v=o.zx2_kit,M=0,m=o.zx2_cmc,h=o.zx2_cmt,S=o.zx2_smc,g=o.zx2_smt,E=o.zx2_fmc,W=o.zx2_fmt;if(C==="H"?M=o.zx2_vlprod:M=Math.round(r/o.zx2_vlprod*100)/100,i&&this.cadastraEstruturaService.getModObra(i).subscribe(f=>{console.log("modObra",f);let x=f&&typeof f=="object"?f.b1_desc:"Produtividade";this.itemsTotais[t].push({item:x,horas:M})}),this.areaExterna>0&&this.itemsTotais[t].push({item:"Area Externa",horas:this.areaExterna}),this.areaInterna>0&&this.itemsTotais[t].push({item:"Area Interna",horas:this.areaInterna}),v){let f="";this.cadastraEstruturaService.getKitTinta(v).subscribe(x=>{console.log("kitTinta",x),f=x&&typeof x=="object"?x.b1_desc:"Kit de Tinta",this.itemsTotais[t].push({item:f,peso:r})})}let L=this.itemsTotais[t][7].valor;if(console.log("valorConsumiveisMC",L),L>0){if(m>0){let f=Math.round(L*m/100*100)/100;this.itemsTotais[t].push({item:"Consum\xEDveis MC",valor:f})}if(S>0){let f=Math.round(L*S/100*100)/100;this.itemsTotais[t].push({item:"Sucata MC",valor:f})}if(E>0){let f=Math.round(L*E/100*100)/100;this.itemsTotais[t].push({item:"Frete MC",valor:f})}}let A=this.itemsTotais[t][8].valor;if(console.log("valorConsumiveisMT",A),A>0){if(h>0){let f=Math.round(A*h/100*100)/100;this.itemsTotais[t].push({item:"Consum\xEDveis MT",valor:f})}if(g>0){let f=Math.round(A*g/100*100)/100;this.itemsTotais[t].push({item:"Sucata MT",valor:f})}if(W>0){let f=Math.round(A*W/100*100)/100;this.itemsTotais[t].push({item:"Frete MT",valor:f})}}}else console.log("Par\xE2metro n\xE3o encontrado:",s)})),this.itemsTotais[t][14].valor=this.itemsTotais[t][13].valor,this.itemsTotais[t]=this.itemsTotais[t].filter(s=>s.valor>0||s.horas>0),console.log("this.itemsTotais ap\xF3s c\xE1lculos:",this.itemsTotais)}geraTotaisEstruturas(){this.itemsTotalGeral=this.itemsTotais.reduce((t,a)=>(a.forEach(e=>{t[e.item]=(t[e.item]||0)+e.valor}),t),{}),this.stepper.next()}checkOut(){this.confirmed=!0,this.stepper.next()}isConfirmed(){return!!this.confirmed}salvarEstrutura(){console.log("salvarEstrutura")}collapseAll(){this.produtos.forEach((t,a)=>{t.detail&&(this.onCollapseDetail(),this.poTable.collapse(a))})}modelProdutos(t){this.estruturaSelecionadaIndex=t,this.poModal.open()}remove(t){this.poTable.removeItem(t)}discount(t){if(!t.disableDiscount){let a=Q(V({},t),{value:t.value-t.value*.2,disableDiscount:!0});this.poTable.updateItem(t,a)}}expandAll(){this.accordion.expandAllItems(),this.estruturas.forEach((t,a)=>{t.detail})}onCollapseDetail(){this.totalExpanded-=1,this.totalExpanded=this.totalExpanded<0?0:this.totalExpanded}onExpandDetail(){this.totalExpanded+=1}restoreColumn(){this.columnsProdutosEstrutura=this.columnsDefault}changeColumnVisible(t){localStorage.setItem("initial-columns",t)}getDescription(t){return`Airfare to ${t.destination} - ${t.initials}`}beforeRedirect(t){this.poAlert.confirm({title:`Retornar para ${t}`,message:"Deseja retornar? Os dados n\xE3o salvos ser\xE3o perdidos.",confirm:()=>this.router.navigate(["/"+t])})}static{this.\u0275fac=function(a){return new(a||b)(F(ft),F(kt),F(Vt),F(bt),F(st))}}static{this.\u0275cmp=X({type:b,selectors:[["app-cadastra-estrutura"]],viewQuery:function(a,e){if(a&1&&(k(Ft,7),k(N,7),k($,7),k(Lt,7),k(q,7),k(R,7)),a&2){let r;B(r=D())&&(e.stepper=r.first),B(r=D())&&(e.poModal=r.first),B(r=D())&&(e.poTable=r.first),B(r=D())&&(e.definicaoForm=r.first),B(r=D())&&(e.accordion=r.first),B(r=D())&&(e.accordionItem=r.first)}},hostBindings:function(a,e){a&1&&_("keydown",function(s){return e.handleKeyboardEvent(s)},!1,J)},decls:43,vars:57,consts:[["stepper",""],["definicaoForm","ngForm"],["accordion",""],["accordionItem",""],["p-title","Nova Estrutura de Or\xE7amento",3,"p-breadcrumb","p-actions"],["p-step-icon-active","an an-factory","p-step-icon-inactive","po-icon-check","p-step-icon-complete","po-icon-check",3,"p-sequential"],["p-label","Defini\xE7\xE3o",1,"tsc-center",3,"p-can-active-next-step"],["p-primary-label","Pr\xF3ximo passo","p-title","Defini\xE7\xE3o da estrutura",1,"po-md-5",3,"p-primary-action"],[1,"po-row"],["name","switch","p-label","Tipo de Estrutura","p-label-off","Especial","p-label-on","Padr\xE3o",1,"po-md-4",3,"ngModelChange","ngModel"],["name","switch","p-label","Status","p-label-off","Bloqueada","p-label-on","Dispon\xEDvel",1,"po-md-4",3,"ngModelChange","ngModel"],["name","descricao","p-placeholder","Nome da estrutura","p-label","Descri\xE7\xE3o","p-required","true","p-readonly","false","p-auto-focus","true",1,"po-md-10",3,"ngModelChange","ngModel","p-optional"],["p-auto-height","true","name","parametroEstrutura","p-field-label","zx2_desc","p-field-value","zx2_cod","p-hide-select-all","true","p-label","Par\xE2metro","p-placeholder","Selecione os par\xE2metros para o c\xE1lculo",1,"po-md-10",3,"ngModelChange","p-change","ngModel","p-disabled","p-filter-service"],["name","areaInterna","p-label","\xC1rea Interna","type","number","p-placeholder","Valor \xE1rea interna","p-readonly","false","p-auto-focus","true",1,"po-md-5",3,"ngModelChange","ngModel","p-optional"],["name","areaExterna","p-label","\xC1rea Externa","type","number","p-placeholder","Valor \xE1rea externa","p-readonly","false","p-auto-focus","true",1,"po-md-5",3,"ngModelChange","ngModel","p-optional"],["name","observacao","p-label","Observa\xE7\xE3o",1,"po-md-10",3,"ngModelChange","ngModel","p-optional","p-rows"],["p-label","Estrutura",1,"tsc-center",3,"p-can-active-next-step"],["p-primary-label","Pr\xF3ximo passo","p-title","Montagem da Estrutura",1,"po-md-12",3,"p-primary-action"],[1,"po-lg-4"],[1,"po-table-actions"],["p-icon","an an-plus","p-label"," ","p-small","false","p-kind","default",3,"p-click"],[3,"p-show-manager-accordion"],["class","po-md-6",3,"p-label",4,"ngFor","ngForOf"],[1,"po-lg-8"],[1,"po-table-actions-batch-actions"],["p-icon","an an-trash","p-label"," ","p-danger","true",3,"p-click","p-disabled"],["p-icon","an an-copy","p-label"," ",3,"p-click","p-disabled"],["p-icon","an an-stack-plus","p-label"," ",3,"p-click","p-disabled"],["p-placeholder","Pesquisar","p-aria-label","teste","name","Po Search",1,"po-md-6",3,"p-filtered-items-change","p-change-model","p-items","p-filter-select"],["p-container","true",3,"p-collapsed","p-expanded","p-selected","p-unselected","p-all-selected","p-all-unselected","p-change-visible-columns","click","p-hide-batch-actions","p-hide-columns-manager","p-hide-table-search","p-selectable","p-sort","p-actions","p-columns","p-items","p-max-columns","p-spacing","p-infinite-scroll"],["p-label","Valores",1,"tsc-center"],["p-title","Revis\xE3o da estrutura",1,"po-md-4",3,"p-primary-action"],[3,"p-columns","p-spacing","p-items","p-hide-table-search","p-hide-columns-manager"],[3,"p-title","p-primary-action","p-secondary-action"],["p-text","Carregando...",4,"ngIf"],["p-placeholder","Pesquisar","p-aria-label","teste","name","Po Search","p-search-type","trigger",1,"po-md-6",3,"p-change-model","p-items"],["p-container","true",3,"p-height","p-hide-batch-actions","p-hide-columns-manager","p-hide-table-search","p-spacing","p-sort","p-columns","p-items","p-selectable","p-infinite-scroll"],[1,"po-md-6",3,"p-label"],[1,"finalLinha"],["p-text-color","white",3,"p-color","p-value"],["p-icon","an an-trash","p-label"," ","p-danger","true",3,"p-click"],["p-icon","an an-plus","p-label"," ",3,"p-click"],[3,"p-selected","p-unselected","p-selectable","p-items","p-max-level"],["p-auto-height","true","name","parametroEstruturaEspecial","p-field-label","zx2_desc","p-field-value","zx2_cod","p-hide-select-all","true","p-label","Par\xE2metro","p-placeholder","Selecione um par\xE2metro",1,"po-md-10",3,"ngModelChange","p-change","ngModel","ngModelOptions","p-disabled","p-filter-service"],[3,"p-primary-action","p-title"],[3,"p-spacing","p-columns","p-items","p-hide-table-search","p-hide-columns-manager"],["p-text","Carregando..."]],template:function(a,e){if(a&1){let r=K();p(0,"po-page-default",4)(1,"po-stepper",5,0)(3,"po-step",6)(4,"po-widget",7),_("p-primary-action",function(){l(r);let o=Y(2);return u(o.next())}),p(5,"form",null,1)(7,"div",8)(8,"po-switch",9),P("ngModelChange",function(o){return l(r),T(e.tipoEstrutura,o)||(e.tipoEstrutura=o),u(o)}),d(),p(9,"po-switch",10),P("ngModelChange",function(o){return l(r),T(e.statusEstrutura,o)||(e.statusEstrutura=o),u(o)}),d()(),p(10,"div",8)(11,"po-input",11),P("ngModelChange",function(o){return l(r),T(e.nomeEstrutura,o)||(e.nomeEstrutura=o),u(o)}),d()(),p(12,"div",8)(13,"po-multiselect",12),P("ngModelChange",function(o){return l(r),T(e.parametroEstrutura,o)||(e.parametroEstrutura=o),u(o)}),_("p-change",function(o){return l(r),u(e.onChangeParametro(o,e.parametroEstrutura))}),d()(),p(14,"div",8)(15,"po-input",13),P("ngModelChange",function(o){return l(r),T(e.areaInterna,o)||(e.areaInterna=o),u(o)}),d(),p(16,"po-input",14),P("ngModelChange",function(o){return l(r),T(e.areaExterna,o)||(e.areaExterna=o),u(o)}),d()(),p(17,"div",8)(18,"po-textarea",15),P("ngModelChange",function(o){return l(r),T(e.observacao,o)||(e.observacao=o),u(o)}),d()()()()(),p(19,"po-step",16)(20,"po-widget",17),_("p-primary-action",function(){return l(r),u(e.geraTotaisEstruturas())}),p(21,"div",18)(22,"div",19)(23,"po-button",20),_("p-click",function(){return l(r),u(e.modelProdutos(null))}),d()(),p(24,"po-accordion",21,2),j(26,Wt,15,20,"po-accordion-item",22),d()(),p(27,"div",23)(28,"div",19)(29,"div",24)(30,"po-button",25),_("p-click",function(){return l(r),u(e.deletarProdutoEstrutura())}),d(),p(31,"po-button",26),_("p-click",function(){return l(r),u(e.copiarEstrutura())}),d(),p(32,"po-button",27),_("p-click",function(){return l(r),u(e.colarEstrutura())}),d()(),p(33,"po-search",28),_("p-filtered-items-change",function(o){return l(r),u(e.filtrarProdutos(o))})("p-change-model",function(o){return l(r),u(e.VerificarFiltroProdutos(o))}),d()(),p(34,"po-table",29),_("p-collapsed",function(){return l(r),u(e.onCollapseDetail())})("p-expanded",function(){return l(r),u(e.onExpandDetail())})("p-selected",function(o){return l(r),u(e.selecionarProduto(o))})("p-unselected",function(o){return l(r),u(e.deselecionarProduto(o))})("p-all-selected",function(o){return l(r),u(e.selecionarProduto(o))})("p-all-unselected",function(o){return l(r),u(e.deselecionarProduto(o))})("p-change-visible-columns",function(o){return l(r),u(e.changeColumnVisible(o))})("click",function(o){return l(r),u(e.cliqueLinha(o))}),d()()()(),p(35,"po-step",30)(36,"po-widget",31),_("p-primary-action",function(){return l(r),u(e.salvarEstrutura())}),I(37,"po-table",32),d()()(),p(38,"po-modal",33),j(39,Ot,1,0,"po-loading-overlay",34),p(40,"div",19)(41,"po-search",35),_("p-change-model",function(o){return l(r),u(e.BuscarProdutos(o))}),d()(),I(42,"po-table",36),d()()}a&2&&(c("p-breadcrumb",e.breadcrumb)("p-actions",e.pageActions),n(),c("p-sequential",!0),n(2),c("p-can-active-next-step",e.isConfirmedEstrutura.bind(e,1)),n(5),y("ngModel",e.tipoEstrutura),n(),y("ngModel",e.statusEstrutura),n(2),y("ngModel",e.nomeEstrutura),c("p-optional",!1),n(2),y("ngModel",e.parametroEstrutura),c("p-disabled",!e.tipoEstrutura)("p-filter-service",e.parametrosUrl),n(2),y("ngModel",e.areaInterna),c("p-optional",!0),n(),y("ngModel",e.areaExterna),c("p-optional",!0),n(2),y("ngModel",e.observacao),c("p-optional",!0)("p-rows",2),n(),c("p-can-active-next-step",e.isConfirmedEstrutura.bind(e,2)),n(5),c("p-show-manager-accordion",!0),n(2),c("ngForOf",e.estruturas),n(4),c("p-disabled",e.acaoBotoesTable),n(),c("p-disabled",e.acaoBotoesTable),n(),c("p-disabled",!(e.produtosEstruturaCopiar.length>0)),n(),c("p-items",e.produtosEstrutura)("p-filter-select",e.listaFiltros),n(),c("p-hide-batch-actions",!0)("p-hide-columns-manager",!0)("p-hide-table-search",!0)("p-selectable",!0)("p-sort",!0)("p-actions",e.actions)("p-columns",e.columnsProdutosEstrutura)("p-items",e.produtosEstrutura)("p-max-columns",7)("p-spacing",e.tableSpacing)("p-infinite-scroll",!0),n(3),c("p-columns",e.colunasTotais)("p-spacing",e.tableSpacing)("p-items",e.itemsTotalGeral)("p-hide-table-search",!0)("p-hide-columns-manager",!0),n(),c("p-title",e.tituloModel)("p-primary-action",e.selecionar)("p-secondary-action",e.novoProduto),n(),c("ngIf",e.isLoadingBusca),n(2),c("p-items",e.produtosBusca),n(),c("p-height",500)("p-hide-batch-actions",!0)("p-hide-columns-manager",!0)("p-hide-table-search",!0)("p-spacing",e.tableSpacing)("p-sort",!0)("p-columns",e.columnsProdutosBusca)("p-items",e.produtosBusca)("p-selectable",!0)("p-infinite-scroll",!0))},dependencies:[It,q,R,mt,ct,Et,gt,Ct,_t,dt,ht,N,yt,Tt,Pt,$,Mt,St,wt,pt,it,lt,nt,ut,rt,ot],styles:[".tamDivPrd[_ngcontent-%COMP%]{width:1200px}"]})}}return b})();export{Xt as CadastraEstruturaComponent};
