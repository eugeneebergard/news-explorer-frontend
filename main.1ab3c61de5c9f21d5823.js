!function(e){var t={};function n(o){if(t[o])return t[o].exports;var u=t[o]={i:o,l:!1,exports:{}};return e[o].call(u.exports,u,u.exports,n),u.l=!0,u.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var u in e)n.d(o,u,function(t){return e[t]}.bind(null,u));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);n(1);var o=document.querySelector(".popup_type_auth"),u=document.querySelector(".popup_type_signup"),r=document.querySelector(".popup__link_signup"),c=document.querySelector(".popup__link_auth"),i=document.getElementById("auth-desk"),p=document.getElementById("auth-mobile"),d=document.querySelector(".popup__close_type_auth"),s=document.querySelector(".popup__close_type_signup"),l=document.querySelector(".header__mobile-menu_open"),a=document.querySelector(".header__mobile-menu_close"),_=document.querySelector(".header__mobile-menu");p.addEventListener("click",(function(){o.classList.add("popup_is-opened")})),i.addEventListener("click",(function(){o.classList.add("popup_is-opened")})),r.addEventListener("click",(function(){o.classList.remove("popup_is-opened"),u.classList.add("popup_is-opened")})),c.addEventListener("click",(function(){u.classList.remove("popup_is-opened"),o.classList.add("popup_is-opened")})),d.addEventListener("click",(function(){o.classList.remove("popup_is-opened")})),s.addEventListener("click",(function(){u.classList.remove("popup_is-opened")})),l.addEventListener("click",(function(){_.classList.add("header__mobile-menu_show")})),a.addEventListener("click",(function(){_.classList.remove("header__mobile-menu_show")}))},function(e,t,n){}]);