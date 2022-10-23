(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n){var r=e.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._renderer=r,this._container=document.querySelector(n)}var n,r;return n=t,(r=[{key:"addItem",value:function(e){this._container.append(e)}},{key:"clear",value:function(){this._container.innerHTML=""}},{key:"renderItems",value:function(e){var t=this;this.clear(),e.forEach((function(e){t._renderer(e)}))}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._data=t,this._templateSelector=n,this._openImagePopup=r}var t,r;return t=e,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content.querySelector(".elements__element").cloneNode(!0)}},{key:"_handlePutLike",value:function(){this._buttonPutLike.classList.toggle("elements__like_active")}},{key:"_handleDelete",value:function(){this._element.remove(),this._element=null}},{key:"_setEventListeners",value:function(){var e=this;this._buttonPutLike.addEventListener("click",(function(){e._handlePutLike()})),this._element.querySelector(".elements__delete").addEventListener("click",(function(){e._handleDelete()})),this._cardImage.addEventListener("click",(function(){e._openImagePopup(e._data)}))}},{key:"generateCard",value:function(){return this._element=this._getTemplate(),this._buttonPutLike=this._element.querySelector(".elements__like"),this._cardImage=this._element.querySelector(".elements__image"),this._setEventListeners(),this._cardImage.src=this._data.image,this._cardImage.alt=this._data.title,this._element.querySelector(".elements__title").textContent=this._data.title,this._element}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var a=i((function e(t,n,r){var o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),u(this,"_showInputError",(function(e){var t=o._formElement.querySelector("#".concat(e.id,"-error"));e.classList.add(o._config.inputErrorClass),t.classList.add(o._config.errorClass),t.textContent=e.validationMessage})),u(this,"_hideInputError",(function(e){var t=o._formElement.querySelector("#".concat(e.id,"-error"));e.classList.remove(o._config.inputErrorClass),t.classList.remove(o._config.errorClass),t.textContent=""})),u(this,"_validateInput",(function(e){e.validity.valid?o._hideInputError(e):o._showInputError(e)})),u(this,"_hasInvalidInputs",(function(){return o._inputs.some((function(e){return!e.validity.valid}))})),u(this,"disableButton",(function(){o._buttonSubmit.classList.add(o._config.inactiveButtonClass),o._buttonSubmit.disabled=!0})),u(this,"_enableButton",(function(){o._buttonSubmit.classList.remove(o._config.inactiveButtonClass),o._buttonSubmit.disabled=!1})),u(this,"_toggleButtonState",(function(){o._hasInvalidInputs()?o.disableButton():o._enableButton()})),u(this,"_setEventListeners",(function(){o._toggleButtonState(),o._inputs.forEach((function(e){e.addEventListener("input",(function(){o._validateInput(e),o._toggleButtonState()}))}))})),u(this,"enableValidation",(function(){o._formElement.addEventListener("submit",(function(e){e.preventDefault()})),o._setEventListeners()})),this._config=t,this._formElement=n,this._buttonSubmit=r,this._inputs=Array.from(n.querySelectorAll(this._config.inputSelector))}));function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var s=function(){function e(t){var n,r,o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r=function(e){"Escape"===e.key&&o.close()},(n="_handleEscClose")in this?Object.defineProperty(this,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):this[n]=r,this._popup=document.querySelector(t)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("click",(function(t){(t.target===t.currentTarget||t.target.classList.contains("popup__close-button"))&&e.close()}))}}])&&c(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function l(e){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l(e)}function p(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _(){return _="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=y(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},_.apply(this,arguments)}function y(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=b(e)););return e}function h(e,t){return h=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},h(e,t)}function d(e,t){if(t&&("object"===l(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function b(e){return b=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},b(e)}var m=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&h(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=b(r);if(o){var n=b(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return d(this,e)});function u(){return p(this,u),i.apply(this,arguments)}return t=u,(n=[{key:"open",value:function(e){var t=e.image,n=e.title,r=this._popup.querySelector(".popup__image");r.src=t,r.alt=n,this._popup.querySelector(".popup__figcaption").textContent=n,_(b(u.prototype),"open",this).call(this)}}])&&f(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(s);function v(e){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},v(e)}function g(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function w(){return w="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=S(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},w.apply(this,arguments)}function S(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=k(e)););return e}function E(e,t){return E=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},E(e,t)}function O(e,t){if(t&&("object"===v(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function k(e){return k=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},k(e)}var j=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&E(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=k(r);if(o){var n=k(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return O(this,e)});function u(e){var t,n=e.popupSelector,r=e.handleFormSubmit;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,n))._handleFormSubmit=r,t._form=t._popup.querySelector(".popup__form"),t}return t=u,(n=[{key:"_getInputValues",value:function(){var e=this;return this._inputList=this._popup.querySelectorAll(".popup__input"),this._formValues={},this._inputList.forEach((function(t){e._formValues[t.name]=t.value})),this._formValues}},{key:"close",value:function(){w(k(u.prototype),"close",this).call(this),this._form.reset()}},{key:"setEventListeners",value:function(){var e=this;w(k(u.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){t.preventDefault(),e._handleFormSubmit(e._getInputValues())}))}}])&&g(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(s);function P(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var L=function(){function e(t){var n=t.userNameSelector,r=t.userStatusSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._userName=document.querySelector(n),this._userStatus=document.querySelector(r)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._userName.textContent,status:this._userStatus.textContent}}},{key:"setUserInfo",value:function(e){var t=e.name,n=e.status;this._userName.textContent=t,this._userStatus.textContent=n}}])&&P(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function C(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var I=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._url=t,this._header=n}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return fetch(this._url,{headers:this._header}).then((function(e){return e.ok?e.json():Promise.reject(new Error(e.status))})).catch((function(e){return Promise.reject(e)}))}},{key:"getInitialsCards",value:function(){return fetch(this._url,{headers:this._header}).then((function(e){return e.ok?e.json():Promise.reject(new Error(e.status))})).catch((function(e){return Promise.reject(e)}))}}])&&C(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),q={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__submit-button",inactiveButtonClass:"popup__submit-button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},R=document.querySelector(".edit-button"),T=document.querySelector(".popup__form_type_profile"),B=T.querySelector(".popup__submit-button_type_profile"),x=document.querySelector(".elements"),D=document.querySelector(".add-button"),V=document.querySelector(".popup__form_type_add"),U=document.querySelector(".popup__submit-button_type_card"),N=new I({url:"https://nomoreparties.co/v1/cohort-52/users/me",headers:{authorization:"ae672644-5499-4af4-bef5-295b969af30e","Content-Type":"application/json"}}),F=new I({url:"https://mesto.nomoreparties.co/v1/cohort-52/cards",headers:{authorization:"ae672644-5499-4af4-bef5-295b969af30e","Content-Type":"application/json"}}),A=new a(q,T,B),z=new a(q,V,U);function M(e,t,n){var o=e.link,i=e.title;return new r({image:o,title:i},t,n).generateCard()}A.enableValidation(),z.enableValidation();var H=new t({renderer:function(e){var t=M({link:e.link,title:e.name},".template",J);H.addItem(t)}},".elements");F.getInitialsCards().then((function(e){H.renderItems(e)}));var G=new m(".popup_type_image");function J(e){G.open({image:e.image,title:e.title})}G.setEventListeners();var K=new L({userNameSelector:".profile__name",userStatusSelector:".profile__status"});N.getUserInfo().then((function(e){K.setUserInfo({name:e.name,status:e.about})}));var Q=new j({popupSelector:".popup_type_edit-profile",handleFormSubmit:function(e){K.setUserInfo({name:e.name,status:e.status}),Q.close()}});Q.setEventListeners(),R.addEventListener("click",(function(){var e=K.getUserInfo(),t=e.name,n=e.status,r=document.querySelector(".popup__input_type_name"),o=document.querySelector(".popup__input_type_status");r.value=t,o.value=n,Q.open()}));var W=new j({popupSelector:".popup_type_add-card",handleFormSubmit:function(e){var t=M({link:e.link,title:e.title},".template",J);x.prepend(t),W.close(),z.disableButton()}});W.setEventListeners(),D.addEventListener("click",(function(){W.open()}))})();