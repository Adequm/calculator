(function(e){function _(_){for(var s,n,a=_[0],o=_[1],c=_[2],u=0,d=[];u<a.length;u++)n=a[u],Object.prototype.hasOwnProperty.call(i,n)&&i[n]&&d.push(i[n][0]),i[n]=0;for(s in o)Object.prototype.hasOwnProperty.call(o,s)&&(e[s]=o[s]);l&&l(_);while(d.length)d.shift()();return r.push.apply(r,c||[]),t()}function t(){for(var e,_=0;_<r.length;_++){for(var t=r[_],s=!0,a=1;a<t.length;a++){var o=t[a];0!==i[o]&&(s=!1)}s&&(r.splice(_--,1),e=n(n.s=t[0]))}return e}var s={},i={app:0},r=[];function n(_){if(s[_])return s[_].exports;var t=s[_]={i:_,l:!1,exports:{}};return e[_].call(t.exports,t,t.exports,n),t.l=!0,t.exports}n.m=e,n.c=s,n.d=function(e,_,t){n.o(e,_)||Object.defineProperty(e,_,{enumerable:!0,get:t})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,_){if(1&_&&(e=n(e)),8&_)return e;if(4&_&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&_&&"string"!=typeof e)for(var s in e)n.d(t,s,function(_){return e[_]}.bind(null,s));return t},n.n=function(e){var _=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(_,"a",_),_},n.o=function(e,_){return Object.prototype.hasOwnProperty.call(e,_)},n.p="/minis-calculator/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],o=a.push.bind(a);a.push=_,a=a.slice();for(var c=0;c<a.length;c++)_(a[c]);var l=o;r.push([0,"chunk-vendors"]),t()})({0:function(e,_,t){e.exports=t("56d7")},"4d05":function(e,_,t){"use strict";t("667e")},"56d7":function(e,_,t){"use strict";t.r(_);t("e260"),t("e6cf"),t("cca6"),t("a79d"),t("c4d1");var s=t("2b0e"),i=function(){var e=this,_=e.$createElement,t=e._self._c||_;return t("div",{staticClass:"container",class:{fullscreen:e.isFullscreen},style:{height:e.innerHeight+"px",maxWidth:e.isDesktop?e.containerWidth+"px":"100vw",maxHeight:e.isDesktop?e.containerHeight+"px":"100vh"}},[e.isPageLoad?t("div",{staticClass:"minis__wrapper"},[e.isDesktop?t("SettingsDesktop",{attrs:{themeIcon:e.themeMain.icon,appHeight:e.appHeight,appWidth:e.appWidth,translate:e.translate,translateDef:e.translateDef,showHints:e.minisHints},on:{switchHints:e.switchHints,switchTheme:e.switchTheme,switchLang:e.switchLang,switchFullscreen:function(_){return e.$store.commit(e.switchFullscreenKey)}},model:{value:e.isClosedSettings,callback:function(_){e.isClosedSettings=_},expression:"isClosedSettings"}}):e._e(),t("LayoutContent",{style:{filter:e.openedModalName?"blur(2px)":"none"},attrs:{appWidth:e.appWidth,appHeight:e.appHeight,isDesktop:e.isDesktop,history:e.history},on:{openModal:function(_){e.openedModalName=_},addToHistory:e.addToCalculatorHistory,clearHistory:e.clearHistory}}),t("AppModal",{attrs:{isRoundedBorder:e.isWidthMore768&&!e.isFullscreen},model:{value:e.openedModalName,callback:function(_){e.openedModalName=_},expression:"openedModalName"}},["settings"==e.openedModalName?t("SettingsMobile",{attrs:{themeIcon:e.themeMain.icon,isWidthMore768:e.isWidthMore768},on:{switchTheme:e.switchTheme,switchLang:e.switchLang,switchFullscreen:function(_){return e.$store.commit(e.switchFullscreenKey)}}}):e._e()],1),e.isDesktop?t("div",{staticClass:"resize_button",on:{mousedown:function(_){return _.preventDefault(),e.startResize.apply(null,arguments)},dblclick:function(_){return _.preventDefault(),e.autoResize.apply(null,arguments)}}}):e._e(),e.isDesktop?t("a",{staticClass:"minis",attrs:{href:"https://adequm.github.io/minis",target:"_blank"},domProps:{textContent:e._s("Minis")}}):e._e()],1):t("AppLoader",{attrs:{size:100,rotate:""}})],1)},r=[],n=t("5530"),a=t("b54a"),o=t("1c09"),c=function(){var e=this,_=e.$createElement,t=e._self._c||_;return t("div",{ref:"calculator",staticClass:"minis__content",style:{minHeight:e.appHeight+"px"}},[t("div",{staticClass:"calculator__display"},[e.isDesktop?e._e():t("div",{staticClass:"settings__button",on:{click:function(_){return e.$emit("openModal","settings")}}},[t("Icon",{attrs:{type:"settings"}})],1),t("div",{ref:"calculator__history",staticClass:"calculator__history"},[t("div",{staticClass:"calculator__history_container"},e._l(e.history,(function(_,s){var i=_[0],r=_[1];return t("span",{key:s+"|"+e.value,domProps:{textContent:e._s(e.getHistoryPoint(i,r,s))},on:{click:function(_){e.value=i}}})})),0)]),t("div",{ref:"calculator__current",staticClass:"calculator__current",class:{equal:e.historyLast==e.value},style:{opacity:e.value.length?"1":".25",fontSize:e.fontSize+"em"},attrs:{"data-brackets":e.endsBrackets},domProps:{textContent:e._s("error"==e.extendedValue?e.translate("error"):e.extendedValue||0)}})]),t("div",{staticClass:"calculator__buttons"},[t("div",{staticClass:"calculator__wrap-row"},[t("div",{staticClass:"calculator__button",domProps:{textContent:e._s(e.value?"C":"AC")},on:{click:e.clear}}),t("div",{staticClass:"calculator__button",on:{click:function(_){return e.historyBack()}}},[t("Icon",{attrs:{type:"delete"}})],1),t("div",{staticClass:"calculator__button",on:{click:function(_){return e.percent()}}},[e._v("%")])]),t("div",{staticClass:"calculator__wrap-column"},e._l(e.signs,(function(_){return t("div",{key:"sign_"+_,staticClass:"calculator__button",on:{click:function(t){return e.addSign(_)}}},[t("span",{style:{transform:"translateY("+("*"==_?.15:0)+"em)"},domProps:{textContent:e._s(_)}})])})),0),e._l([7,8,9,4,5,6,1,2,3],(function(_){return t("div",{key:"num_"+_,staticClass:"calculator__button",domProps:{textContent:e._s(_)},on:{click:function(t){e.addSign(_.toString())}}})})),t("div",{staticClass:"calculator__button",on:{click:e.addDot}},[t("span",{staticStyle:{transform:"translateY(-0.3em)"},domProps:{textContent:e._s(".")}})]),t("div",{staticClass:"calculator__button",on:{click:function(_){return e.addSign("0")}}},[e._v("0")]),t("div",{staticClass:"calculator__button",on:{click:e.plusMinus}},[e._v("±")]),t("div",{staticClass:"calculator__button calculator__button-equal",on:{click:e.equal}})],2)])},l=[],u=t("6478"),d=u["a"],h=(t("4d05"),t("2877")),p=Object(h["a"])(d,c,l,!1,null,"0ff14cca",null),f=p.exports,E=t("2f62"),m={components:{LayoutContent:f,AppModal:a["b"],SettingsDesktop:a["d"],SettingsMobile:a["e"],AppLoader:a["a"]},mixins:[o["b"],o["d"],o["a"],o["e"]],data:function(){return{isClosedSettings:!0,openedModalName:null}},watch:{isDesktop:function(e){e&&"settings"==this.openedModalName&&(this.openedModalName=null,this.isClosedSettings=!1)}},computed:Object(n["a"])({},Object(E["c"])(["history","switchFullscreenKey"])),methods:Object(n["a"])({},Object(E["b"])(["clearHistory","addToCalculatorHistory"])),beforeMount:function(){var e=this;document.body.addEventListener("click",(function(_){document.body===_.target&&e.isDesktop&&(e.isClosedSettings||(e.isClosedSettings=!0))}))}},v=m,b=(t("5c0b"),Object(h["a"])(v,i,r,!1,null,null,null)),M=b.exports,g=t("9483");Object(g["a"])("".concat("/minis-calculator/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var j,O=t("2909"),D=t("ade3"),P=(t("a15b"),t("fb6a"),t("ac1f"),t("1276"),t("99af"),t("0e44")),y=t("0759"),k=t.n(y),w=location.pathname.split("/")[1].split("-").slice(1).join("-"),C="switchFullscreen_".concat(w),W={};s["a"].use(E["a"]),W.state=function(){return{isFullscreen:!1,switchFullscreenKey:C,projectKey:w,history:[]}},W.mutations=(j={},Object(D["a"])(j,C,(function(e){return s["a"].set(e,"isFullscreen",!e.isFullscreen)})),Object(D["a"])(j,"addToCalculatorHistory",(function(e,_){var t=e.history.slice(-9).concat([_]);s["a"].set(e,"history",t)})),Object(D["a"])(j,"clearHistory",(function(e){s["a"].set(e,"history",[])})),j);var L=["history"];W.modules={minis:o["f"]},W.plugins=[k()({predicate:function(){return[].concat(Object(O["a"])(o["c"]),L)}}),Object(P["a"])({paths:o["c"],key:"minis"}),Object(P["a"])({paths:L.concat("isFullscreen"),key:"minis-".concat(w)})];var T=new E["a"].Store(W);s["a"].config.productionTip=!1,new s["a"]({store:T,render:function(e){return e(M)}}).$mount("#app")},"5c0b":function(e,_,t){"use strict";t("9c0c")},6478:function(module,__webpack_exports__,__webpack_require__){"use strict";var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("a9e3"),core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__),core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("fb6a"),core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_1__),core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("ac1f"),core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_2__),core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("5319"),core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_3__),core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("466d"),core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_4__),core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("a15b"),core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_5__),core_js_modules_es_array_fill_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("cb29"),core_js_modules_es_array_fill_js__WEBPACK_IMPORTED_MODULE_6___default=__webpack_require__.n(core_js_modules_es_array_fill_js__WEBPACK_IMPORTED_MODULE_6__),core_js_modules_es_number_to_fixed_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("b680"),core_js_modules_es_number_to_fixed_js__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(core_js_modules_es_number_to_fixed_js__WEBPACK_IMPORTED_MODULE_7__),core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("99af"),core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_8___default=__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_8__),core_js_modules_es_string_ends_with_js__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("8a79"),core_js_modules_es_string_ends_with_js__WEBPACK_IMPORTED_MODULE_9___default=__webpack_require__.n(core_js_modules_es_string_ends_with_js__WEBPACK_IMPORTED_MODULE_9__),core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("1276"),core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_10___default=__webpack_require__.n(core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_10__),core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("caad"),core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_11___default=__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_11__),core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__("2532"),core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_12___default=__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_12__),core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__("2ca0"),core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_13___default=__webpack_require__.n(core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_13__),core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__("d3b7"),core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_14___default=__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_14__),core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__("25f0"),core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_15___default=__webpack_require__.n(core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_15__),_minis_core_components__WEBPACK_IMPORTED_MODULE_16__=__webpack_require__("b54a"),_minis_core_mixins__WEBPACK_IMPORTED_MODULE_17__=__webpack_require__("1c09");__webpack_exports__["a"]={name:"LayoutContent",mixins:[_minis_core_mixins__WEBPACK_IMPORTED_MODULE_17__["e"]],components:{Icon:_minis_core_components__WEBPACK_IMPORTED_MODULE_16__["c"]},props:{appWidth:Number,appHeight:Number,isDesktop:Boolean,history:Array},data:function(){return{value:"",fontSize:1,limit:30,signs:["/","*","-","+"]}},watch:{value:function(e){this.changeFontSize(),e.length<=this.limit||(this.value=this.value.slice(0,this.limit))},appWidth:"changeFontSize"},computed:{historyLast:function(){var e=this.history.slice(-1)[0];return e&&e[1]},extendedValue:function(){return this.value.replace(/\+/g," + ").replace(/\-/g," - ").replace(/\*/g," * ").replace(/\//g," / ")},brackets:function(){var e=this.value.match(/\(/g)||[],_=this.value.match(/\)/g)||[],t=e.length,s=_.length;return{starts:t,ends:s,isClosed:t===s}},endsBrackets:function(){var e=this.brackets,_=e.starts,t=e.ends;return new Array(_-t).fill(")").join("")}},methods:{checkFontSize:function(){var e=this.$refs.calculator,_=this.$refs.calculator__current;return e.clientWidth-_.clientWidth-50},changeFontSize:function(e){var _=this;this.$nextTick((function(){var e=_.checkFontSize();if(e<=0){if(_.fontSize<=.1)return;_.fontSize=+(_.fontSize-.1).toFixed(1),_.changeFontSize()}else if(e>100){if(_.fontSize>=1)return;_.fontSize=+(_.fontSize+.1).toFixed(1),_.changeFontSize()}}))},getHistoryPoint:function(e,_,t){return this.historyLast==this.value&&t==this.history.length-1?e:"".concat(e," = ").concat(_)},addSign:function(e){"error"==this.value&&(this.value="");var _=!isNaN(+e),t=!this.value,s="-"==e,i=!!/(\/|\*|\+)/.exec(e),r=!!/\d+\.\d+$/.exec(this.value),n=!!/(\/|\*|\+|\-)$/.exec(this.value),a=this.value.endsWith("("),o=this.value.endsWith(")"),c=!!/\d$/.exec(this.value),l=this.value.endsWith(".");if("("==e&&(c||o)&&(this.value+="*"),(!_||!o)&&(!this.brackets.isClosed||")"!=e)&&(!t&&!a||!i)&&(!this.value.endsWith("0")||!_||r))if(s&&this.value.endsWith("-"))"-"==this.value&&this.clear();else if(_||!l){if(!t&&n&&i){if("-"==this.value)return;return this.historyBack(),this.addSign(e)}this.value+=e}},addDot:function(){"error"==this.value&&(this.value="");var e=this.value.split(/(\/|\*|\+|\-)/g).slice(-1)[0];e||(this.value+="0"),e.includes(".")||(this.value+=".")},plusMinus:function(){"error"==this.value&&(this.value=""),this.value||(this.value+="0"),this.value=this.value.startsWith("-")?this.value.slice(1):"-".concat(this.value)},percent:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:2,_=this.value.toString().replace(/^\d*(\.|)/,"").length;this.value&&"error"!=this.value&&(this.limit<=_+e||/\d$/.exec(this.value)&&(this.value=(parseFloat(this.value)/Math.pow(10,e)).toFixed(_+e)))},clear:function(){this.value?(this.value="",this.historyBack(!0)):this.$emit("clearHistory")},historyBack:function(e){"error"!=this.value?this.value=e?"":this.value.slice(0,-1):this.value=""},equal:function equal(){if("error"!=this.value&&(this.value=this.value.replace(/(\-|\+|\*|\/|\.|\()*$/,""),this.value)){this.value+=this.endsBrackets;var equation=this.value.match(/\d|\.|\-|\+|\*|\/|\(|\)/g).join(""),answer=parseFloat(eval(equation).toFixed(10));equation.replace(/(\(|\))/g,"")!=answer&&(answer.toString().endsWith("Infinity")||isNaN(answer)?this.value="error":(this.value=answer.toString(),this.$refs.calculator__history.scrollTop=1e3,this.$emit("addToHistory",[equation,answer])))}},keydown:function(e){var _=e.key,t=e.shiftKey;switch(_){case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":case"+":case"-":case"*":case"/":case"(":case")":this.addSign(_);break;case".":case",":this.addDot();break;case"%":this.percent();break;case"Backspace":this.historyBack(t);break;case"Enter":this.equal();break;case"Escape":this.$emit("switchSettings");break}}},beforeMount:function(){document.addEventListener("keydown",this.keydown)},beforeDestroy:function(){document.removeEventListener("keydown",this.keydown)}}},"667e":function(e,_,t){},"9c0c":function(e,_,t){}});
//# sourceMappingURL=app.eb3414f8.js.map