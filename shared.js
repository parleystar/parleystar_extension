/* SPDX-FileCopyrightText: © 2025 promising future digital media llc. All rights reserved. <admin@parleystar.com> */
/* SPDX-License-Identifier: Mozilla Public License 1.1 (MPL-1.1) */
/* 
2 top-level objects
pls = variables
plsel = dom elements
*/

window.addEventListener('unhandledrejection', err => {
console.warn('A browser error occured in ParleyStar extension at: ' + location.href , err)
pls_show_error(err)
})


function onUnloadHandler(){
if (chrome && chrome.runtime && chrome.runtime.id) {
// save and cleanup
}
else {
window.removeEventListener('beforeunload', onUnloadHandler)
}
}
window.addEventListener('beforeunload', onUnloadHandler)

function pls_send_resp(msg) {
console.info('background response', msg) 
}

function pls_send_err(err) {
console.info('background err', err) 
}

function pls_sync(key, val){
console.info('pls_sync $ key val', key, val)
let obj = {}
obj.key = key
obj.val = val
obj.func = 'pls_sync' 
pls_send_message(obj) 
}

function pls_store(key, val){
console.info('pls_store $ key val', key, val)
let obj = {}
obj.key = key
obj.val = val
obj.func = 'pls_store' 
pls_send_message(obj) 
}


function pls_make_toast(){
let elemArr = document.getElementById('plsToast');
if (elemArr) { return false; }
console.info('doing pls_make_toast') 
let theHTML = '<div id="plsToast" class="plsToast"></div><svg id="plsLoading" class="plsLoading" version="1.1" id="L2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"> <circle fill="none" stroke="#fff" stroke-width="4" stroke-miterlimit="10" cx="50" cy="50" r="48"/> <line fill="none" stroke-linecap="round" stroke="#fff" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="85" y2="50.5"> <animateTransform attributeName="transform" dur="2s" type="rotate" from="0 50 50" to="360 50 50" repeatCount="indefinite" /> </line> <line fill="none" stroke-linecap="round" stroke="#fff" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="49.5" y2="74"> <animateTransform attributeName="transform" dur="15s" type="rotate" from="0 50 50" to="360 50 50" repeatCount="indefinite" /> </line> </svg>' 
document.body.insertAdjacentHTML('beforeend', theHTML) 
elemArr = document.body.getElementsByClassName('plsToast') 
if (elemArr[0]) { plsel.plsToast = elemArr[0] }
elemArr = document.body.getElementsByClassName('plsLoading') 
if (elemArr[0]) { plsel.plsLoading = elemArr[0] }
pls_toast('Status: building menus');
}


function pls_toast(str){
console.info('doing pls_toast $ str:', str) 
plsel.plsToast.textContent = str;
plsel.plsToast.className = 'pls-bl';
setTimeout(function(){ plsel.plsToast.className = plsel.plsToast.className.replace('pls-bl', ''); }, 2500);
}


function pls_wait_for_element_to_exist(selector){
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }
    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });
    observer.observe(document.body, {
      subtree: true,
      childList: true,
    });
  });
}


function pls_style_with_str(css){
if (!css) { return false }
// console.info('doing pls_style_with_str $ css', css) 
let head = document.getElementsByTagName('head')[0];
let style = document.createElement('style');
head.appendChild(style);
style.type = 'text/css';
if (style.styleSheet){
style.styleSheet.cssText = css;
} else {
style.appendChild(document.createTextNode(css));
}
}


// do this after building menu 
function pls_do_settings_on_load(){ 
if (pls.plsb_settingsMenuLoaded === true) { return false } 
pls.plsb_settingsMenuLoaded = true 
console.info('doing pls_do_settings_on_load $', pls) 
let x = null 
let item = null 
let obj = {} 
let arr = [] 
let theId = '' 
let thenodeName = '' 
let theContent = '' 
let elemArr = document.body.querySelectorAll('.plsHideMenuZZfieldset input, .plsMuteMenuZZfieldset input, .plsOptionsMenuZZfieldset input, .plsColorsMenuZZfieldset input, .plsOpacityMenuZZfieldset input, .plsContentMenuZZfieldset input'); 
[].forEach.call(elemArr, function(elem) { 
  // plsb1
  if (elem.type == 'checkbox') {
    elem.checked = false;
    if (pls[elem.id]) {
      elem.checked = pls[elem.id];
      pls_style_with_obj_of_changes(elem.id, elem.checked);
    }
    elem.addEventListener('change', e => {
      console.log('pls_do_settings_on_load checkbox changed', e);
      if (e && e.target && e.target.checked) {
        pls[elem.id] = true 
        pls_sync(elem.id, true) 
        pls_style_with_obj_of_changes(elem.id, true) 
      } else {
        pls[elem.id] = false 
        pls_sync(elem.id, false) 
        pls_style_with_obj_of_changes(elem.id, false) 
      }
    });
  }

  if (elem.type == 'color') {
    elem.value = '#000000'
    if (pls[elem.id]) {
      elem.value = pls[elem.id]
      if (pls[elem.id] != '#000000') {
        pls_style_with_obj_of_changes(elem.id, elem.value);
      }
    }
    elem.addEventListener('change', e => {
      console.log('pls_do_settings_on_load color changed', e)
      if (e && e.target && e.target.value) {
        pls[elem.id] = e.target.value
        pls_sync(elem.id, e.target.value)
        pls_style_with_obj_of_changes(elem.id, elem.value);
      } else {
        pls[elem.id] = '#000000' 
        pls_sync(elem.id, '#000000') 
        pls_style_with_obj_of_changes(elem.id, '#000000') 
      }
    });
  }

  if (elem.type == 'number') {
    elem.value = '1'
    if (pls[elem.id]) {
      elem.value = pls[elem.id]
      if (pls[elem.id] != '1') {
        // pls_style_with_obj_of_changes();
      }
    }
    elem.addEventListener('change', e => {
      console.log('pls_do_settings_on_load number changed', e) 
      if (e && e.target && e.target.value) {
        pls[elem.id] = e.target.value
        // pls_sync(elem.id, e.target.value)
      } else {
        pls[elem.id] = '0';
        // pls_sync(elem.id, '0')
      }
      // pls_style_with_obj_of_changes();
    });
  }

  if (elem.type == 'text') {
    elem.value = ''
    if (pls[elem.id]) {
      elem.value = pls[elem.id]
    }
    elem.addEventListener('change', e => {
      console.log('pls_do_settings_on_load text changed', e) 
      if (e && e.target && e.target.value) {
        pls[elem.id] = e.target.value
        // pls_sync(elem.id, e.target.value)
      } else {
        pls[elem.id] = '';
        // pls_sync(elem.id, '')
      }
    });
  }
});

elemArr = document.body.getElementsByClassName('plsi18n'); 
[].forEach.call(elemArr, function(elem) {
theId = '' 
thenodeName = '' 
theContent = '' 

if (elem.nodeName) {
thenodeName = elem.nodeName 
}

if (elem.id) {
theId = elem.id 
}

if (thenodeName == 'LABEL') {
theId = elem.htmlFor 
}

if (theId && thenodeName) {
theContent = chrome.i18n.getMessage(theId);
// console.log(theId, thenodeName, theContent, elem);
if (thenodeName == 'H4' || thenodeName == 'H5' || thenodeName == 'SPAN' || thenodeName == 'SUMMARY' || thenodeName == 'LEGEND' || thenodeName == 'BUTTON' || thenodeName == 'SMALL' || thenodeName == 'LABEL' || thenodeName == 'INPUT') {
elem.title = theContent;
elem.setAttribute('aria-label', theContent);
}
if (thenodeName == 'H4' || thenodeName == 'H5' || thenodeName == 'SPAN' || thenodeName == 'SUMMARY' || thenodeName == 'LEGEND' || thenodeName == 'SMALL' || thenodeName == 'LABEL') {
elem.textContent = theContent;
}
}
});

pls_add_settings_menu_handlers() 
} 
// end do_settings_on_load


function pls_style_with_obj_of_changes(elemId, val) {
// console.info('doing pls_style_with_obj_of_changes $ elemId, val', elemId, val) 
if (!elemId) { return false }
let css = '' 

if (val == 'on') {
css = ' .plsChatMenuWrapperXXdiv p:not(.' +  elemId + ') { opacity: .25; } ' 
}
if (val == 'inverse') {
css = ' .plsChatMenuWrapperXXdiv p:not(.' +  elemId + ') { opacity: 1; } .plsChatMenuWrapperXXdiv p.' +  elemId + ' { opacity: .5; } ' 
}
if (val == 'default') {
css = ' .plsChatMenuWrapperXXdiv p.' +  elemId + ' { opacity: 1; } ' 
}

// plsb1 text only
if (elemId == 'plsb1') {
if (val) {
css = ' .plsChatMenuWrapperXXdiv p.emoji b { visibility: hidden; } ' 
} else {
css = ' .plsChatMenuWrapperXXdiv p.emoji b { visibility: visible; } '  
}
}

// plsb2 emoji only
if (elemId == 'plsb2') {
if (val) {
css = ' .plsChatMenuWrapperXXdiv p:not(.emoji) b { visibility: hidden; } ' 
} else {
css = ' .plsChatMenuWrapperXXdiv p:not(.emoji) b { visibility: visible; } '  
}
}

// plsb3 Hide Non Roles
if (elemId == 'plsb3') {
if (val) {
css = ' .plsChatMenuWrapperXXdiv p:not(.owner, .moderator, .vip, .og, .founder, .gifter, .sub, .verified, .staff, .anevent, .donation, .subevent), .plsChatMenuWrapperXXdiv p:not(.owner, .moderator, .vip, .og, .founder, .gifter, .sub, .verified, .staff, .anevent, .donation, .subevent) b { visibility: hidden; } ' 
} else {
css = ' .plsChatMenuWrapperXXdiv p:not(.owner, .moderator, .vip, .og, .founder, .gifter, .sub, .verified, .staff, .anevent, .donation, .subevent), .plsChatMenuWrapperXXdiv p:not(.owner, .moderator, .vip, .og, .founder, .gifter, .sub, .verified, .staff, .anevent, .donation, .subevent) b { visibility: visible; } ' 
}
}

// plsb4 Hide Streamer
if (elemId == 'plsb4') {
if (val) {
css = ' .plsChatMenuWrapperXXdiv p.owner, .plsChatMenuWrapperXXdiv p.owner b { visibility: hidden; } ' 
} else {
css = ' .plsChatMenuWrapperXXdiv p.owner, .plsChatMenuWrapperXXdiv p.owner b { visibility: visible; } ' 
}
}

// plsb5 Hide Mentions
if (elemId == 'plsb5') {
if (val) {
css = ' .plsChatMenuWrapperXXdiv p.mention, .plsChatMenuWrapperXXdiv p.mention b { visibility: hidden; } ' 
} else {
css = ' .plsChatMenuWrapperXXdiv p.mention, .plsChatMenuWrapperXXdiv p.mention b { visibility: visible; } ' 
}
}

// plsb6 Hide usernames 
if (elemId == 'plsb6') {
if (val) {
css = ' .plsChatMenuWrapperXXdiv .pls-chat-timestamp, .plsChatMenuWrapperXXdiv .pls-chat-username { visibility: hidden; } ' 
} else {
css = ' .plsChatMenuWrapperXXdiv .pls-chat-timestamp, .plsChatMenuWrapperXXdiv .pls-chat-username { visibility: visible; } ' 
}
}

// plsb7 Hide Bots
if (elemId == 'plsb7') {
if (val) {
css = ' .plsChatMenuWrapperXXdiv p.bot, .plsChatMenuWrapperXXdiv p.bot b { visibility: hidden; } ' 
} else {
css = ' .plsChatMenuWrapperXXdiv p.bot, .plsChatMenuWrapperXXdiv p.bot b { visibility: visible; } ' 
}
}

// plsb8 Hide Follows
if (elemId == 'plsb8') {
if (val) {
css = ' .plsChatMenuWrapperXXdiv p.follow, .plsChatMenuWrapperXXdiv p.follow b { visibility: hidden; } ' 
} else {
css = ' .plsChatMenuWrapperXXdiv p.follow, .plsChatMenuWrapperXXdiv p.follow b { visibility: visible; } ' 
}
}

// plsb9 Hide Subscribes
if (elemId == 'plsb9') {
if (val) {
css = ' .plsChatMenuWrapperXXdiv p.subscribe, .plsChatMenuWrapperXXdiv p.subscribe b { visibility: hidden; } ' 
} else {
css = ' .plsChatMenuWrapperXXdiv p.subscribe, .plsChatMenuWrapperXXdiv p.subscribe b { visibility: visible; } ' 
}
}

// plsb10 Hide Links
if (elemId == 'plsb10') {
if (val) {
css = ' .plsChatMenuWrapperXXdiv p.link, .plsChatMenuWrapperXXdiv p.link b { visibility: hidden; } ' 
} else {
css = ' .plsChatMenuWrapperXXdiv p.link, .plsChatMenuWrapperXXdiv p.link b { visibility: visible; } ' 
}
}

// plsb11 Hide Chat Menu
if (elemId == 'plsb11') {
if (val) {
css = ' .plsSideMenuYYbutton { display: none; } ' 
} else {
css = ' .plsSideMenuYYbutton { display: block; } ' 
}
}

// plsb12 Hide Streams Menu
if (elemId == 'plsb12') {
if (val) {
css = ' .plsChatMenuXXdiv { display: none; } ' 
} else {
css = ' .plsChatMenuXXdiv { display: block; } ' 
}
}

// plsb1 text mute
if (elemId == 'plsb21') {
if (val) {
css = ' .plsChatMenuWrapperXXdiv p:not(.emoji) b { opacity: .25; } ' 
} else {
css = ' .plsChatMenuWrapperXXdiv p:not(.emoji) b { opacity: 1; } '  
}
}

// plsb2 emoji mute
if (elemId == 'plsb22') {
if (val) {
css = ' .plsChatMenuWrapperXXdiv p.emoji b { opacity: .25; } ' 
} else {
css = ' .plsChatMenuWrapperXXdiv p.emoji b { opacity: 1; } '  
}
}

// plsb3 mute Non Roles
if (elemId == 'plsb23') {
if (val) {
css = ' .plsChatMenuWrapperXXdiv p:not(.owner, .moderator, .vip, .og, .founder, .gifter, .sub, .verified, .staff, .anevent, .donation, .subevent) { opacity: .25; } ' 
} else {
css = ' .plsChatMenuWrapperXXdiv p:not(.owner, .moderator, .vip, .og, .founder, .gifter, .sub, .verified, .staff, .anevent, .donation, .subevent) { opacity: 1; } ' 
}
}

// plsb4 mute Streamer
if (elemId == 'plsb24') {
if (val) {
css = ' .plsChatMenuWrapperXXdiv p.owner { opacity: .25; } ' 
} else {
css = ' .plsChatMenuWrapperXXdiv p.owner { opacity: 1; } ' 
}
}

// plsb5 mute Mentions
if (elemId == 'plsb25') {
if (val) {
css = ' .plsChatMenuWrapperXXdiv p.mention { opacity: .25; } ' 
} else {
css = ' .plsChatMenuWrapperXXdiv p.mention { opacity: 1; } ' 
}
}

// plsb6 mute usernames 
if (elemId == 'plsb26') {
if (val) {
css = ' .plsChatMenuWrapperXXdiv .pls-chat-timestamp, .plsChatMenuWrapperXXdiv .pls-chat-username { opacity: .25; } ' 
} else {
css = ' .plsChatMenuWrapperXXdiv .pls-chat-timestamp, .plsChatMenuWrapperXXdiv .pls-chat-username { opacity: 1; } ' 
}
}

// plsb7 mute Bots
if (elemId == 'plsb27') {
if (val) {
css = ' .plsChatMenuWrapperXXdiv p.bot { opacity: .25; } ' 
} else {
css = ' .plsChatMenuWrapperXXdiv p.bot { opacity: 1; } ' 
}
}

// plsb8 mute Follows
if (elemId == 'plsb28') {
if (val) {
css = ' .plsChatMenuWrapperXXdiv p.follow { opacity: .25; } ' 
} else {
css = ' .plsChatMenuWrapperXXdiv p.follow { opacity: 1; } ' 
}
}

// plsb32 upside down chat
if (elemId == 'plsb32') {
if (val) {
css = ' .plsChatMenuSavedChat1XXdiv { display: flex; flex-direction: column-reverse; } ' 
} else {
css = ' .plsChatMenuSavedChat1XXdiv { display: block; flex-direction: unset; } ' 
}
}

// plsb33 hover enlarge chat
if (elemId == 'plsb33') {
if (val) {
css = ' .plsChatMenuSavedChat1XXdiv b:hover { font-size: 125%; } ' 
} else {
css = ' .plsChatMenuSavedChat1XXdiv b:hover { font-size: 100%; } ' 
}
}

// plsb34 press to mention in search
if (elemId == 'plsb34') {
if (val) {

} else {

}
}

// plsb35 
if (elemId == 'plsb35') {
if (val) {

} else {

}
}

// plsb36 basic keybinds
if (elemId == 'plsb36') {
if (val) {

} else {

}
}

// plsb37 full keybinds
if (elemId == 'plsb37') {
if (val) {

} else {

}
}

// plsb38 voice commands
if (elemId == 'plsb38') {
if (val) {

} else {

}
}

// plsc1 background tab 1
if (elemId == 'plsc1') {
if (val) {
css = ' .pls-loaded .plsChatMenu1XXaside { background-color: ' + val + '; } ' 
} else {
css = ' .pls-loaded .plsChatMenu1XXaside { background-color: var(--background-color); } ' 
}
}

// plsc2 background tab 2
if (elemId == 'plsc2') {
if (val) {
css = ' .pls-loaded .plsChatMenuSimulcastChat1XXdiv { background-color: ' + val + '; } ' 
} else {
css = ' .pls-loaded .plsChatMenuSimulcastChat1XXdiv { background-color: var(--background-color); } ' 
}
}

// plsc3 background tab 3
if (elemId == 'plsc3') {
if (val) {
css = ' .pls-loaded .plsChatMenuSimulcastChat2XXdiv { background-color: ' + val + '; } ' 
} else {
css = ' .pls-loaded .plsChatMenuSimulcastChat2XXdiv { background-color: var(--background-color); } ' 
}
}

// plsc4 background tab 4
if (elemId == 'plsc4') {
if (val) {
css = ' .pls-loaded .plsChatMenuSimulcastChat3XXdiv { background-color: ' + val + '; } ' 
} else {
css = ' .pls-loaded .plsChatMenuSimulcastChat3XXdiv { background-color: var(--background-color); } ' 
}
}

// plsc5 timestamp
if (elemId == 'plsc5') {
if (val) {
css = ' .pls-loaded .pls-chat-timestamp { color: ' + val + '; } ' 
} else {
css = ' .pls-loaded .pls-chat-timestamp { color: var(--text-color); } ' 
}
}

// plsc6 username
if (elemId == 'plsc6') {
if (val) {
css = ' .pls-loaded .pls-chat-username { color: ' + val + '; } ' 
} else {
css = ' .pls-loaded .pls-chat-username { color: var(--text-color); } ' 
}
}

// plsc7 message
if (elemId == 'plsc7') {
if (val) {
css = ' .pls-loaded .pls-chat-message { color: ' + val + '; } ' 
} else {
css = ' .pls-loaded .pls-chat-message { color: var(--text-color); } ' 
}
}

// plsc8 highlighted
if (elemId == 'plsc8') {
if (val) {
css = ' .pls-loaded .pls-highlight { color: ' + val + '; } ' 
} else {
css = ' .pls-loaded .pls-highlight { color: var(--text-color); } ' 
}
}

// plsc21 serviceid
if (elemId == 'plsc21') {
if (val) {
css = ' .pls-loaded .pls-chat-line .serviceid { color: ' + val + '; } ' 
} else {
css = ' .pls-loaded .pls-chat-line .serviceid { color: var(--text-color); } ' 
}
}


// plsc17 staff
if (elemId == 'plsc17') {
if (val) {
css = ' .pls-loaded .pls-chat-line.staff { border-top: 2px solid ' + val + ' !important; } ' 
} else {
css = ' .pls-loaded .pls-chat-line.staff { border-top: none !important; } ' 
}
}

// plsc16 verified
if (elemId == 'plsc16') {
if (val) {
css = ' .pls-loaded .pls-chat-line.verified { border-top: 2px solid ' + val + ' !important; } ' 
} else {
css = ' .pls-loaded .pls-chat-line.verified { border-top: none !important; } ' 
}
}

// plsc10 moderator
if (elemId == 'plsc10') {
if (val) {
css = ' .pls-loaded .pls-chat-line.moderator { border-top: 2px solid ' + val + ' !important; } ' 
} else {
css = ' .pls-loaded .pls-chat-line.moderator { border-top: none !important; } ' 
}
}

// plsc9 owner
if (elemId == 'plsc9') {
if (val) {
css = ' .pls-loaded .pls-chat-line.owner { border-top: 2px solid ' + val + ' !important; } ' 
} else {
css = '.pls-loaded  .pls-chat-line.owner { border-top: none !important; } ' 
}
}

// plsc15 sub
if (elemId == 'plsc15') {
if (val) {
css = ' .pls-loaded .pls-chat-line.sub { border-bottom: 2px solid ' + val + ' !important; } ' 
} else {
css = ' .pls-loaded .pls-chat-line.sub { border-bottom: none !important; } ' 
}
}

// plsc14 gifter
if (elemId == 'plsc14') {
if (val) {
css = ' .pls-loaded .pls-chat-line.gifter { border-bottom: 2px solid ' + val + ' !important; } ' 
} else {
css = ' .pls-loaded .pls-chat-line.gifter { border-bottom: none !important; } ' 
}
}

// plsc12 og
if (elemId == 'plsc12') {
if (val) {
css = ' .pls-loaded .pls-chat-line.og { border-bottom: 2px solid ' + val + ' !important; } ' 
} else {
css = ' .pls-loaded .pls-chat-line.og { border-bottom: none !important; } ' 
}
}

// plsc13 founder
if (elemId == 'plsc13') {
if (val) {
css = ' .pls-loaded .pls-chat-line.founder { border-bottom: 2px solid ' + val + ' !important; } ' 
} else {
css = ' .pls-loaded .pls-chat-line.founder { border-bottom: none !important; } ' 
}
}

// plsc11 vip
if (elemId == 'plsc11') {
if (val) {
css = ' .pls-chat-line.vip { border-bottom: 2px solid ' + val + ' !important; } ' 
} else {
css = ' .pls-chat-line.vip { border-bottom: none !important; } ' 
}
}

// plsc18 anevent
if (elemId == 'plsc18') {
if (val) {
css = ' .pls-chat-line.anevent { border-right: 2px solid ' + val + ' !important; } ' 
} else {
css = ' .pls-chat-line.anevent { border-right: none !important; } ' 
}
}

// plsc19 donation
if (elemId == 'plsc19') {
if (val) {
css = ' .pls-chat-line.donation { border-right: 2px solid ' + val + ' !important; } ' 
} else {
css = ' .pls-chat-line.donation { border-right: none !important; } ' 
}
}

// plsc20 subevent
if (elemId == 'plsc20') {
if (val) {
css = ' .pls-chat-line.subevent { border-right: 2px solid ' + val + ' !important; } ' 
} else {
css = ' .pls-chat-line.subevent { border-right: none !important; } ' 
}
}

// plsc22 hashtag
if (elemId == 'plsc22') {
if (val) {
css = ' .pls-chat-line.hashtag { border-left: 2px solid ' + val + ' !important; } ' 
} else {
css = ' .pls-chat-line.hashtag { border-left: none !important; } ' 
}
}

// plsc23 mention color
if (elemId == 'plsc23') {
if (val) {
css = ' .pls-chat-line.mention { border-left: 2px solid ' + val + ' !important; } ' 
} else {
css = ' .pls-chat-line.mention { border-left: none !important; } ' 
}
}

if (elemId == 'plsc24') {
if (val) {
css = ' .pls-chat-line.keyword { border-left: 2px solid ' + val + ' !important; } ' 
} else {
css = ' .pls-chat-line.keyword { border-left: none !important; } ' 
}
}


// Number(seconds); plsn1
// plsn1 background tab 1
if (elemId == 'plsn1') {
if (val) {
css = ' .plsChatMenuSavedChat1XXdiv { opacity: ' + Number(val) + '; } ' 
} else {
css = ' .plsChatMenuSavedChat1XXdiv { opacity: 1; } ' 
}
}

// plsn2 background tab 2
if (elemId == 'plsn2') {
if (val) {
css = ' .plsChatMenuSimulcastChat1XXdiv { opacity: ' + Number(val) + '; } ' 
} else {
css = ' .plsChatMenuSimulcastChat1XXdiv { opacity: 1; } ' 
}
}

// plsn3 background tab 3
if (elemId == 'plsn3') {
if (val) {
css = ' .plsChatMenuSimulcastChat2XXdiv { opacity: ' + Number(val) + '; } ' 
} else {
css = ' .plsChatMenuSimulcastChat2XXdiv { opacity: 1; } ' 
}
}

// plsn4 background tab 4
if (elemId == 'plsn4') {
if (val) {
css = ' .plsChatMenuSimulcastChat3XXdiv { opacity: ' + Number(val) + '; } ' 
} else {
css = ' .plsChatMenuSimulcastChat3XXdiv { opacity: 1; } ' 
}
}

// plsn5 timestamp
if (elemId == 'plsn5') {
if (val) {
css = ' .pls-chat-timestamp { opacity: ' + Number(val) + '; } ' 
} else {
css = ' .pls-chat-timestamp { opacity: 1; } ' 
}
}

// plsn6 username
if (elemId == 'plsn6') {
if (val) {
css = ' .pls-chat-username { opacity: ' + Number(val) + '; } ' 
} else {
css = ' .pls-chat-username { opacity: 1; } ' 
}
}

// plsn7 message
if (elemId == 'plsn7') {
if (val) {
css = ' .pls-chat-message { opacity: ' + Number(val) + '; } ' 
} else {
css = ' .pls-chat-message { opacity: 1; } ' 
}
}

// plsn8 highlighted
if (elemId == 'plsn8') {
if (val) {
css = ' .pls-highlight { opacity: ' + Number(val) + '; } ' 
} else {
css = ' .pls-highlight { opacity: 1; } ' 
}
}

// plsn21 serviceid
if (elemId == 'plsn21') {
if (val) {
css = ' .pls-chat-line .serviceid { opacity: ' + Number(val) + '; } ' 
} else {
css = ' .pls-chat-line .serviceid { opacity: 1; } ' 
}
}


// plsn17 staff
if (elemId == 'plsn17') {
if (val) {
css = ' .pls-chat-line.staff { opacity: ' + Number(val) + '; } ' 
} else {
css = ' .pls-chat-line.staff { opacity: 1; } ' 
}
}

// plsn16 verified
if (elemId == 'plsn16') {
if (val) {
css = ' .pls-chat-line.verified { opacity: ' + Number(val) + '; } ' 
} else {
css = ' .pls-chat-line.verified { opacity: 1; } ' 
}
}

// plsn10 moderator
if (elemId == 'plsn10') {
if (val) {
css = ' .pls-chat-line.moderator { opacity: ' + Number(val) + '; } ' 
} else {
css = ' .pls-chat-line.moderator { opacity: 1; } ' 
}
}

// plsn9 owner
if (elemId == 'plsn9') {
if (val) {
css = ' .pls-chat-line.owner { opacity: ' + Number(val) + '; } ' 
} else {
css = ' .pls-chat-line.owner { opacity: 1; } ' 
}
}





// plsn15 sub
if (elemId == 'plsn15') {
if (val) {
css = ' .pls-chat-line.sub { opacity: ' + Number(val) + '; } ' 
} else {
css = ' .pls-chat-line.sub { border-bottom: none !important; } ' 
}
}

// plsn14 gifter
if (elemId == 'plsn14') {
if (val) {
css = ' .pls-chat-line.gifter { opacity: ' + Number(val) + '; } ' 
} else {
css = ' .pls-chat-line.gifter { border-bottom: none !important; } ' 
}
}

// plsn12 og
if (elemId == 'plsn12') {
if (val) {
css = ' .pls-chat-line.og { opacity: ' + Number(val) + '; } ' 
} else {
css = ' .pls-chat-line.og { border-bottom: none !important; } ' 
}
}

// plsn13 founder
if (elemId == 'plsn13') {
if (val) {
css = ' .pls-chat-line.founder { opacity: ' + Number(val) + '; } ' 
} else {
css = ' .pls-chat-line.founder { border-bottom: none !important; } ' 
}
}

// plsn11 vip
if (elemId == 'plsn11') {
if (val) {
css = ' .pls-chat-line.vip { opacity: ' + Number(val) + '; } ' 
} else {
css = ' .pls-chat-line.vip { border-bottom: none !important; } ' 
}
}




// plsn18 anevent
if (elemId == 'plsn18') {
if (val) {
css = ' .pls-chat-line.anevent { opacity: ' + Number(val) + '; } ' 
} else {
css = ' .pls-chat-line.anevent { border-right: none !important; } ' 
}
}

// plsn19 donation
if (elemId == 'plsn19') {
if (val) {
css = ' .pls-chat-line.donation { opacity: ' + Number(val) + '; } ' 
} else {
css = ' .pls-chat-line.donation { border-right: none !important; } ' 
}
}

// plsn20 subevent
if (elemId == 'plsn20') {
if (val) {
css = ' .pls-chat-line.subevent { opacity: ' + Number(val) + '; } ' 
} else {
css = ' .pls-chat-line.subevent { border-right: none !important; } ' 
}
}



// plsn22 hashtag
if (elemId == 'plsn22') {
if (val) {
css = ' .pls-chat-line.hashtag { opacity: ' + Number(val) + '; } ' 
} else {
css = ' .pls-chat-line.hashtag { border-left: none !important; } ' 
}
}

// plsn23 mention color
if (elemId == 'plsn23') {
if (val) {
css = ' .pls-chat-line.mention { opacity: ' + Number(val) + '; } ' 
} else {
css = ' .pls-chat-line.mention { border-left: none !important; } ' 
}
}

if (elemId == 'plsn24') {
if (val) {
css = ' .pls-chat-line.keyword { opacity: ' + Number(val) + '; } ' 
} else {
css = ' .pls-chat-line.keyword { border-left: none !important; } ' 
}
}

pls_style_with_str(css) 
return false 
}

// DO THIS
function pls_add_settings_menu_handlers() {
console.info('doing pls_add_settings_menu_handlers 1 $', window.plsel) 
let elemArr = [] 
let elemArr2 = [] 
let theHTML = '' 
Object.keys(window.plsel).forEach(function(key,index) {
if (key.includes('ZZ')) {
let el = document.getElementById(key) 
if (el) {
window.plsel[key] = el 
}
}
});

console.log('doing pls_add_settings_menu_handlers 2', pls.plsb_islive, window.plsel);
if (!pls.plsb_islive) {
plsel.plsChatsMenuLiveTitleZZh5.classList.add('pls-hide') 
plsel.plsChatsMenuLoadWrapperZZdiv.classList.add('pls-hide') 
} else {
plsel.plsChatsMenuLiveTitleZZh5.classList.remove('pls-hide') 
plsel.plsChatsMenuLoadWrapperZZdiv.classList.remove('pls-hide') 
}
plsel.plsChatsMenuSavedWrapperZZdiv.classList.add('pls-hide') 
pls_add_listener_for_importing_settings()
pls_add_listener_for_exporting_settings()
pls_add_listener_for_deleting_settings()
pls_add_listener_for_uploading_chat() 

plsel.plsChatsMenuLoadZZbutton.addEventListener('click', pls_handler_get_arr_of_all_dbNames) 
plsel.plsSettingsMenuCloseZZbutton.addEventListener('click', () => { plsel.plsSettingsMenuZZdialog.close(); }) 
plsel.plsChatsMenuZZsummary.addEventListener('click', pls_handler_get_arr_of_all_dbNames) 
plsel.plsChatsMenuLiveZZselect.addEventListener('change', pls_chat_listen) 
plsel.plsChatsMenuSortStreamsByServiceIDZZbutton.addEventListener('click', pls_handler_sort_saved_streams_by_serviceid) 
plsel.plsChatsMenuSortStreamsByChannelIDZZbutton.addEventListener('click', pls_handler_sort_saved_streams_by_channelid) 
plsel.plsChatsMenuSortStreamsByVideoIDZZbutton.addEventListener('click', pls_handler_sort_saved_streams_by_videoid) 
plsel.plsChatsMenuSortStreamsByChanZZbutton.addEventListener('click', pls_handler_sort_saved_streams_by_current) 

if (pls.plsv_serviceid == 'kick') {
console.log('this is kick');
// pls_add_listener_for_video_settings()
} else {
console.log('this is not kick');
elemArr = document.body.getElementsByClassName('plsVideosMenuWrapperZZdiv') 
if (elemArr[0]) {
elemArr[0].classList.add('pls-hide') 
}
}
}

// DO THIS
function pls_add_chat_menu_handlers(topLevelMenuElem) {
console.log('doing pls_add_chat_menu_handlers with ', topLevelMenuElem, window.plsel, pls.plsv_serviceid); 
let elemArr = [] 
let str = pls['chattitle_' + pls.plsv_serviceid] 
if (str) {
elemArr = document.body.querySelectorAll(str) 
if (elemArr[0]) {
elemArr[0].addEventListener('click', pls_open_settings);
}
}

Object.keys(window.plsel).forEach(function(key,index) {
if ( (key.includes('YY')) || (key.includes('XX')) ) {
console.log('key index', key, index);
let el = document.getElementById(key) 
if (el) {
window.plsel[key] = el 
}
}
});

elemArr = document.body.getElementsByClassName('plsSideMenuYYbutton') 
if (elemArr[0]) {
plsel.plsSideMenuYYbutton = elemArr[0] 
plsel.plsSideMenuYYbutton.addEventListener('click', pls_toggle_chat_menu) 
plsel.plsSideMenuYYbutton.addEventListener('drop', dropHandler) 
plsel.plsSideMenuYYbutton.addEventListener('dragover', dragoverHandler) 
} 

elemArr = document.body.getElementsByClassName('plsSideMenuFilterYYbutton') 
if (elemArr[0]) {
plsel.plsSideMenuFilterYYbutton = elemArr[0] 
plsel.plsSideMenuFilterYYbutton.addEventListener('click', pls_toggle_chat_menu) 
}

elemArr = document.body.getElementsByClassName('plsSideMenuSearchYYbutton') 
if (elemArr[0]) {
plsel.plsSideMenuSearchYYbutton = elemArr[0] 
plsel.plsSideMenuSearchYYbutton.addEventListener('click', pls_toggle_chat_menu) 
}

document.getElementById('pls1').addEventListener('click', pls_chat_up_to_top);
document.getElementById('pls2').addEventListener('click', pls_chat_down_to_bottom) 
elemArr = document.body.getElementsByClassName('pls-toggle'); 
[].forEach.call(elemArr, function(elem) {
elem.addEventListener('click', pls_toggle_chats);
});

plsel.plsSideMenuChatSearchStartsWithYYbutton.addEventListener('click', pls_search_saved_chat);
plsel.plsSideMenuChatSearchUserYYbutton.addEventListener('click', pls_search_saved_chat);
plsel.plsSideMenuChatSearchKeywordYYbutton.addEventListener('click', pls_search_saved_chat);
plsel.plsSideMenuChatSearchEventsYYbutton.addEventListener('click', pls_search_saved_chat);
plsel.plsSideMenuChatSearchFullYYbutton.addEventListener('click', pls_search_saved_chat);
plsel.plsSideMenuChatSearchMultiYYbutton.addEventListener('click', pls_toggle_search_multiple_chat);

let el = document.getElementById("plsChatMenuSavedChat1XXdiv");
el.addEventListener("dragstart", (e) => { 
  e.target.classList.add("dragging");
  document.getElementById("plsChatMenu1XXaside").classList.add("dragging");
  e.dataTransfer.setData("text", e.target.id);
});
el.addEventListener("dragend", (e) => { 
  e.target.classList.remove("dragging");
  document.getElementById("plsChatMenu1XXaside").classList.remove("dragging");
});
}

function dropHandler(e) {
e.preventDefault() 
plsel.plsChatMenu1XXaside.classList.remove('pls-active-chat') 
plsel.plsChatMenu1XXaside.classList.remove("pls-active") 
plsel.plsChatMenuDragSpot1XXdiv.classList.remove("pls-active") 
plsel.plsChatMenuSavedChat1XXdiv.classList.remove("pls-active") 
plsel.plsChatMenuSavedChat1XXdiv.innerHTML = '' 
plsel.plsChatMenu1XXbutton.checked = false 
pls.plsv_dbNameToSearch = 'savedchat' + '&' + pls.plsv_serviceid + '&' + pls.plsv_channelid + '&' + pls.plsv_videoid 
}
function dragoverHandler(e) {
e.preventDefault();
}



function pls_toggle_search_menu(e) {
console.info('doing pls_toggle_search_menu $ e', e) 
if (plsel.plsSideMenuSearchWrapperYYdiv.classList.contains('pls-focused') ) { 
plsel.plsSideMenuSearchWrapperYYdiv.classList.remove('pls-focused') 
} else {
plsel.plsSideMenuSearchWrapperYYdiv.classList.add('pls-focused') 
}
}


function pls_add_listener_for_importing_settings(e){
plsel.plsOptionsMenuWrapperSettingsImportZZbutton.addEventListener('change', async function(e2) {
console.info('doing pls_add_listener_for_importing_settings $ e e2 this', e, e2, this) 
if (!this || !this.files || this.files[0]) { return false } 
if (this.files[0].name != 'parleystar_settings.json') { pls_toast('Error: file name not supported to import'); return false }
if ( (this.files[0].size < 8) || (this.files[0].size > 100000000) ) { pls_toast('Error: file size not supported to import'); return false }
if ( (this.files[0].type != 'text/json') && (this.files[0].type != 'application/json') ) { pls_toast('Error: file type not supported to import'); return false }
let reader = new FileReader() 
reader.addEventListener('load', function(e3) {

console.info('doing pls_add_listener_for_importing_settings $ e3', e3, JSON.parse(reader.result) ) 
pls_toast('Status: importing chat now.') 
let jsonObj = JSON.parse(reader.result) 
let arr = Object.getOwnPropertyNames(jsonObj); 
[].forEach.call(arr, async function(item) {
if (item.includes('pls')) {
console.log('pls_add_listener_for_importing_settings item ', item) 
await pls_sync(item, jsonObj[item]);
}
});
});
reader.readAsText(file) 
});
}


function pls_add_listener_for_exporting_settings(e){
plsel.plsOptionsMenuWrapperSettingsExportZZbutton.addEventListener('click', async function(e2) {
console.info('doing pls_add_listener_for_exporting_settings $ e e2 this', e, e2, this) 
let x = await chrome.storage.sync.get() 
let str = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(x)) 
let el = document.createElement('a') 
el.setAttribute('href', str) 
el.setAttribute('download', 'parleystar_settings.json') 
document.body.appendChild(el) 
el.click() 
el.remove() 
pls_toast('Success: Settings exported.') 
return false 
});
}


function pls_add_listener_for_deleting_settings(e){
plsel.plsOptionsMenuWrapperSettingsDeleteZZbutton.addEventListener('click', function(e2) {
console.info('doing pls_add_listener_for_deleting_settings $ e e2 this', e, e2, this) 
if ( confirm('Are you sure you want to delete all of your ParleyStar extension settings?') == true) {
let obj = {} 
obj.func = 'pls_delete_settings' 
pls_send_message(obj)
}
return false
});
}


function pls_get_arr_chatbox_elem(){
let elemArr = [] 
let elem = pls['chatcontainer_' + pls.plsv_serviceid] 
elem = document.body.querySelectorAll(elem) 
if (elem[0]) { 
elemArr = elem 
}
return elemArr
}


function pls_get_arr_chats(){
let elemArr = [] 
let elem = pls['chatelement_' + pls.plsv_serviceid] 
elem = document.body.querySelectorAll(elem) 
if (elem[0]) { 
elemArr = elem 
}
return elemArr 
}


function pls_get_arr_from_dbName_string(str){
let arr = [] 
if (str && typeof str === 'string') { 
arr = str.split('&') 
}
return arr
}


function pls_get_arr_sortedtimes_from_arr(arr){
if (!arr) { return false } 
if ( !arr[1] || !arr[1].timestamp || (typeof arr[1].timestamp === 'number') || (arr[1].timestamp.indexOf(':') < 0) ) { return arr }
return arr.sort(function (a, b) {
  if (parseInt(a.timestamp.split(':')[0]) - parseInt(b.timestamp.split(':')[0]) === 0) {
    return parseInt(a.timestamp.split(':')[1]) - parseInt(b.timestamp.split(':')[1]);
  } else {
    return parseInt(a.timestamp.split(':')[0]) - parseInt(b.timestamp.split(':')[0]);
  }
})
}


function pls_handler_get_arr_of_all_dbNames(e) {
console.info('doing pls_handler_get_arr_of_all_dbNames', e) 
let obj = {} 
obj.func = 'pls_get_arr_of_all_dbNames' 
obj.home = 'pls_build_dropdown_of_saved_stream_chat_by_arr' 
if (e && e.target && e.target.id == 'plsChatsMenuLoadZZbutton') { 
if (e && e.preventDefault) { e.preventDefault() } 
plsel.plsChatsMenuSavedWrapperZZdiv.classList.remove('pls-hide') 
obj.home = 'pls_build_list_of_saved_stream_chat_by_arr' 
}
console.info('doing pls_handler_get_arr_of_all_dbNames OBJ to send', obj) 
pls_send_message(obj)
}


function pls_get_number_seconds_difference_from_two_timestamps(startTime, timeToCompare){
let seconds = 0 
if (startTime && timeToCompare) { 
let diff = Math.abs(new Date('2011/11/11 ' + startTime) - new Date('2011/11/11 ' + timeToCompare)) 
let diff2 = Math.floor((diff/1000)/60) 
seconds = diff2 * 60 
}
return seconds 
}


function pls_get_str_for_chat_classes_from_obj(obj){
let str = '' 
if (obj) {
  if (obj.owner === 1) {
    str = str + ' owner ' 
  }
  if (obj.moderator === 1) {
    str = str + ' moderator ' 
  }
  if (obj.vip === 1) {
    str = str + ' vip ' 
  }
  if (obj.og === 1) {
    str = str + ' og ' 
  }
  if (obj.founder === 1) {
    str = str + ' founder ' 
  }
  if (obj.gifter === 1) {
    str = str + ' gifter ' 
  }
  if (obj.sub === 1) {
    str = str + ' sub ' 
  }
  if (obj.verified === 1) {
    str = str + ' verified ' 
  }
  if (obj.staff === 1) {
    str = str + ' staff ' 
  }
  if (obj.anevent === 1) {
    str = str + ' anevent ' 
  }
  if (obj.donation === 1) {
    str = str + ' donation ' 
  }
  if (obj.subevent === 1) {
    str = str + ' subevent ' 
  }
  if (obj.bot === 1) {
    str = str + ' bot ' 
  }
  if (obj.serviceid) {
    str = str + ' ' + obj.serviceid + ' ' 
  }
  if (obj.message) {
    if (obj.message.indexOf('@') > -1) {
      str = str + ' mention ' 
    }
    if (obj.message.indexOf('#') > -1) {
      str = str + ' hashtag ' 
    }
    if (obj.message.indexOf('::') > -1) {
      str = str + ' emoji ' 
    }
  }
}
return str
}


function pls_get_str_for_search(){
let str = '' 
if (plsel.plsSideMenuSearchYYinput) { 
str = plsel.plsSideMenuSearchYYinput.value 
}
if (str) {
str = str.replace(/[^a-zA-Z0-9_\-@!\s]/g, '') 
str = str.trim() 
}
return str
}


function pls_get_str_military_hours_minutes_from_timestamp(timestamp){
if (timestamp) {
timestamp = timestamp.trim() 
if (timestamp.indexOf('AM') > -1) {
timestamp = timestamp.replace('AM', '') 
} else {
timestamp = timestamp.replace('PM', '') 
let arr = timestamp.split(':') 
let hours = parseInt(arr[0]) 
hours = hours + 12 
timestamp = hours + ':' + arr[1] 
}
}
return timestamp
}


function pls_get_str_seconds_from_hour_minute_time(str){
let seconds = 0 
if (str) { 
str = str.replace('@', '') 
str = str.replace('.', '') 
str = str.trim() 
let p = str.split(':') 
let m = 1 
while (p.length > 0) {
seconds += m * parseInt(p.pop(), 10) 
m *= 60 
}
}
return seconds 
}


function pls_get_csv_file_from_str(str){
if (str) { 
let csv_mime_type = 'text/csv';  
return new Blob([str], {type: csv_mime_type})
}
return false
}


function pls_get_csv_download(blob, filename){
if (blob && filename) { 
let el = document.createElement('a') 
el.setAttribute('download', filename) 
let url = URL.createObjectURL(blob) 
el.setAttribute('href', url) 
el.click();
URL.revokeObjectURL(url) 
}
}


function pls_set_chat_parameter(a, b){
// a parameter, b visibility
let str = '' 
let end = ' chats -'  
let non = '- non ' 
switch (a) {

case 'owner':
if (b == 1) {
str = '-streamer' + end 
}
if (b == 2) {
str = non + 'streamer' + end 
}
break;

case 'moderator': 
if (b == 1) {
str = '-mod' + end 
}
if (b == 2) {
str = non + 'mod' + end 
}
break;

case 'vip': 
if (b == 1) {
str = '-vip' + end 
}
if (b == 2) {
str = non + 'vip' + end 
}
break;

case 'og': 
if (b == 1) {
str = '-og' + end 
}
if (b == 2) {
str = non + 'og' + end 
}
break;

case 'founder': 
if (b == 1) {
str = '-founder' + end 
}
if (b == 2) {
str = non + 'founder' + end 
}
break;

case 'gifter': 
if (b == 1) {
str = '-gifter' + end 
}
if (b == 2) {
str = non + 'gifter' + end 
}
break;

case 'sub': 
if (b == 1) {
str = '-sub' + end 
}
if (b == 2) {
str = non + 'sub' + end 
}
break;

case 'verified': 
if (b == 1) {
str = '-verified' + end 
}
if (b == 2) {
str = non + 'verified' + end 
}
break;

case 'staff': 
if (b == 1) {
str = '-staff' + end 
}
if (b == 2) {
str = non + 'staff' + end 
}
break;

case 'anevent': 
if (b == 1) {
str = '-anevent' + end 
}
if (b == 2) {
str = non + 'anevent' + end 
}
break;

case 'donation': 
if (b == 1) {
str = '-donation' + end 
}
if (b == 2) {
str = non + 'donation' + end 
}
break;

case 'subevent': 
if (b == 1) {
str = '-subevent' + end 
}
if (b == 2) {
str = non + 'subevent' + end 
}
break;

case 'bot': 
if (b == 1) {
str = '-bot' + end 
}
if (b == 2) {
str = non + 'bot' + end 
}
break;

case 'role': 
if (b == 1) {
str = '-role' + end 
}
if (b == 2) {
str = non + 'role' + end 
}
break;

case 'mention': 
if (b == 1) {
str = '-mention' + end 
}
if (b == 2) {
str = non + 'mention' + end 
}
break;

case 'hashtag': 
if (b == 1) {
str = '-hashtag' + end 
}
if (b == 2) {
str = non + 'hashtag' + end 
}
break;

case 'emoji': 
if (b == 1) {
str = '-emoji' + end 
}
if (b == 2) {
str = non + 'emoji' + end 
}
break;

}
return str;
}


function pls_set_vod_length(){
// duration is 30449.461 SECONDS, minutes is: 507,  seconds is: 29.46099999999933
let elemArr = document.getElementsByTagName('video') 
if (elemArr[0] && elemArr[0].readyState > 0) { 
pls.plsn_vodSecondsTotal = parseInt(elemArr[0].duration) 
pls.plsn_vodMinutesLong = parseInt(elemArr[0].duration / 60, 10) 
pls.plsn_vodSecondsLong = parseInt(elemArr[0].duration % 60) 
}
}


function pls_build_chat_line_from_obj(chatObj, chatObjFirst){
if (!chatObj) { return false } 
let classString = pls_get_str_for_chat_classes_from_obj(chatObj) 
let theHTML = '' 
if (chatObjFirst) {
theHTML = "<p class='pls-chat-line " + classString + "'><s><span>" + chatObjFirst.username + ' stream on ' + chatObjFirst.message + "<br><span class='pls-chat-timestamp'>" + chatObj.timestamp + "</span> : <span class='pls-chat-username'>" + chatObj.username + "</span> <b class='pls-chat-message'>" +  chatObj.message + "</b></s></p>";
} else {
theHTML = "<p class='pls-chat-line " + classString + "'><span class='pls-chat-timestamp'>" + chatObj.timestamp + "</span> : <span class='pls-chat-username'>" + chatObj.username + "</span> <b class='pls-chat-message'>" +  chatObj.message + "</b></p>";
}
return theHTML 
}


function pls_build_dropdown_of_saved_stream_chat_by_arr(arr){
console.info('doing pls_build_dropdown_of_saved_stream_chat_by_arr', arr) 
let db = '' 
let newOption = '' 
plsel.plsChatsMenuLiveZZselect.innerHTML = '' 
newOption = new Option('do not save this stream', 'nosave') 
plsel.plsChatsMenuLiveZZselect.add(newOption, undefined) 
pls.plsa_savedStreams = arr 
dbArrLen = pls.plsa_savedStreams.length 
if (dbArrLen > 0) { 
pls.plsa_savedStreams.sort((a,b) => (a.videoid.toLowerCase() < b.videoid.toLowerCase()) ? 1 : ((b.videoid.toLowerCase() < a.videoid.toLowerCase()) ? -1 : 0));
for (let i = 0; i < dbArrLen; i++) {
db = pls.plsa_savedStreams[i] 
newOption = new Option( db.channelid + ' stream on ' + db.serviceid + ' on ' + db.videoid, db.dbName) 
plsel.plsChatsMenuLiveZZselect.add(newOption, undefined) 
}
if (pls.plsv_dbName && (pls.plsv_dbName != '') && (pls.plsv_dbName != null)) {
plsel.plsChatsMenuLiveZZselect.value = pls.plsv_dbName 
}

}
}


function pls_build_list_of_saved_stream_chat_by_arr(arr){
let arrl = arr.length 
if (arrl < 1) { return false }
let dbName = '' 
let theHTML = '' 
plsel.plsChatsMenuPreviousStreamsZZdiv.innerHTML = '' 
for (let i = 0; i < arrl; i++) {
dbName = 'savedchat' + '&' + arr[i].serviceid + '&' + arr[i].channelid + '&' + arr[i].videoid 
theHTML = '<p>' 
theHTML = theHTML + "<button type='button' class='pls-db-3' title='View This Stream Chat' aria-label='View This Stream Chat' data-dbName='" + dbName + "'>" + arr[i].videoid + "</button>" 
theHTML = theHTML + "<button type='button' class='pls-db-4' title='Download This Stream Chat' aria-label='Download This Stream Chat' data-dbName='" + dbName + "'>💾</button>"
theHTML = theHTML + "<button type='button' class='pls-db-5' title='Delete This Stream Chat' aria-label='Delete This Stream Chat' data-dbName='" + dbName + "'>🗑️</button>"
theHTML = theHTML + "<button type='button' class='pls-db-6' title='Load This Stream Chat When This Video Loads' aria-label='Load This Stream Chat When This Video Loads' data-dbName='" + dbName + "'>🎯</button>" 
theHTML = theHTML + "</p><p>&nbsp;&nbsp;</p>";
plsel.plsChatsMenuPreviousStreamsZZdiv.insertAdjacentHTML('beforeend', theHTML) 
}
pls_add_listener_for_saved_chat_from_streams() 
}


function pls_chat_blur(elem){
elem.style.paddingLeft = '.75rem' 
elem.style.paddingRight = '.75rem' 
// elem.style.borderBottom = '1px dotted ' + pls.c.plsBorderColor;
}

function pls_chat_off(elem){
elem.style.paddingLeft = 'initial' 
elem.style.paddingRight = 'initial' 
elem.classList.remove('pls-chat-on') 
}

function pls_chat_on(elem){
elem.style.paddingLeft = '.4rem' 
elem.style.paddingRight = '.4rem' 
// elem.style.borderBottom = '2px solid ' + pls.c.plsBorderColor;
elem.classList.add('pls-chat-on') 
}

function pls_chat_set_to_hide(elem){
// elem.style.opacity = 0;
elem.classList.remove('pls-chat-mute') 
elem.classList.add('pls-chat-hide') 
}

function pls_chat_set_to_highlight(elem, color){
elem.classList.add('pls-chat-highlight') 
}

function pls_chat_set_to_color(elem, color){
elem.style.setProperty('border-left', '2px solid ' + color, 'important') 
elem.style.setProperty('border-right', '2px solid ' + color, 'important') 
}

function pls_chat_set_to_mute(elem){
// elem.style.opacity = '.3';
elem.classList.add('pls-chat-mute') 
elem.classList.remove('pls-chat-hide') 
}

function pls_chat_set_to_show(elem){
// elem.style.opacity = '1';
elem.classList.remove('pls-chat-mute') 
elem.classList.remove('pls-chat-hide') 
}


function pls_chat_up_to_top(e){
console.log('doing pls_chat_up_to_top', e) 
if (e && e.preventDefault) { e.preventDefault() }
plsel.plsChatMenuSavedChat1XXdiv.scrollTop = 0 
plsel.plsChatMenuSimulcastChat1XXdiv.scrollTop = 0 
plsel.plsChatMenuSimulcastChat2XXdiv.scrollTop = 0 
plsel.plsChatMenuSimulcastChat3XXdiv.scrollTop = 0 
}

function pls_chat_down_to_bottom(e){
console.log('doing pls_chat_down_to_bottom', e) 
if (e && e.preventDefault) { e.preventDefault() }
plsel.plsChatMenuSavedChat1XXdiv.scrollTop = plsel.plsChatMenuSavedChat1XXdiv.scrollHeight - plsel.plsChatMenuSavedChat1XXdiv.clientHeight 
plsel.plsChatMenuSimulcastChat1XXdiv.scrollTop = plsel.plsChatMenuSimulcastChat1XXdiv.scrollHeight - plsel.plsChatMenuSimulcastChat1XXdiv.clientHeight 
plsel.plsChatMenuSimulcastChat2XXdiv.scrollTop = plsel.plsChatMenuSimulcastChat2XXdiv.scrollHeight - plsel.plsChatMenuSimulcastChat2XXdiv.clientHeight 
plsel.plsChatMenuSimulcastChat3XXdiv.scrollTop = plsel.plsChatMenuSimulcastChat3XXdiv.scrollHeight - plsel.plsChatMenuSimulcastChat3XXdiv.clientHeight 
}


function pls_chat_font_size(e){
  if (e && e.preventDefault) { e.preventDefault(); }
  // if (!pls.plsv_dbNameToSearch) { pls_toast(' No active stream or VOD chat '); return false; } 
  let elemArr = [];
  let str = 'initial';
  let str2 = 'initial';
  if (plsel.plsChatMenuSavedChat1XXdiv.classList.contains('pls-active') ) {
    elemArr = plsel.plsChatMenuSavedChat1XXdiv.getElementsByTagName('p');
  } else {
    if ( (pls.plsv_serviceid == 'twitch') || (pls.plsv_serviceid == 'youtube') ) {
      elemArr = pls_get_arr_chats();
    } else {
      elemArr = pls_get_arr_message_elems_from_parent_element(document.body);
    }
  }
  if (pls.plsv_fontUp < 6) {
    if (pls.plsv_fontSize == 'initial') {
      pls.plsv_fontSize = 1;
    }
    if (pls.plsv_heightSize == 'initial') {
      pls.plsv_heightSize = 'auto'; 
    }
    pls.plsv_fontSize = pls.plsv_fontSize - -.25;
    str = pls.plsv_fontSize + 'em';
    pls.plsv_fontUp = pls.plsv_fontUp - -1;
  } else {
    pls.plsv_fontSize = 'initial';
    pls.plsv_heightSize = 'initial';
    pls.plsv_fontUp = 1;
  } 
  [].forEach.call(elemArr, function(elem) {
    if (pls.plsv_serviceid == 'youtube') {
      var els = elem.querySelectorAll('#message');
      if (els[0]) {
        els[0].style.setProperty('font-size', str, 'important');
        els[0].style.height = str2;
      }
    } else {
      elem.style.setProperty('font-size', str, 'important');
      elem.style.height = str2;  
    }
  });
}


function pls_chat_upside_down_chat() {
if (pls.plsb_upsideDownChat) {
pls.plsb_upsideDownChat = false 
} else {
pls.plsb_upsideDownChat = true 
}
}


function pls_toggle_chats(e){
console.log('doing pls_toggle_chats with e ' , e);
if (!e || !e.target || !e.target.dataset || !e.target.dataset.chat) { return false }
if (e.preventDefault) { e.preventDefault() }
// pls.plsn_visibilityChatShow == '1'
let elemArr = document.body.getElementsByClassName('pls-toggle'); 
console.log('doing pls_toggle_chats elemArr n', elemArr, pls.plsn_visibilityChatShow);
[].forEach.call(elemArr, function(elem) {
elem.classList.remove('pls-on') 
elem.classList.remove('pls-inverse') 
});

if (pls.plsn_visibilityChatShow == '1') {
console.log('yes 1');
e.target.classList.add('pls-on') 
pls.plsn_visibilityChatShow = '2' 
pls_style_with_obj_of_changes(e.target.dataset.chat, 'on') 
return false 
}
if (pls.plsn_visibilityChatShow == '2') {
console.log('yes 2');
e.target.classList.add('pls-inverse') 
pls.plsn_visibilityChatShow = '3' 
pls_style_with_obj_of_changes(e.target.dataset.chat, 'inverse') 
return false 
}
if (pls.plsn_visibilityChatShow == '3') {
console.log('yes 3');
pls.plsn_visibilityChatShow = '1' 
pls_style_with_obj_of_changes(e.target.dataset.chat, 'default') 
return false 
}

}


function pls_toggle_chat_menu(e){
console.log('doing pls_toggle_chat_menu', e) 
if (!e || !e.target || !e.target.id) { return false }
if (e.target.id == 'plsSideMenuYYbutton') {
plsel.plsSideMenuYYbutton.classList.toggle('pls-focused') 
plsel.plsSideMenuWrapperYYdiv.classList.toggle('pls-hide') 
}
if (e.target.id == 'plsSideMenuFilterYYbutton') {
plsel.plsSideMenuFilterYYbutton.classList.toggle('pls-focused') 
plsel.plsSideMenuFilterWrapperYYdiv.classList.toggle('pls-hide') 
}
if (e.target.id == 'plsSideMenuSearchYYbutton') {
plsel.plsSideMenuSearchYYbutton.classList.toggle('pls-focused') 
plsel.plsSideMenuSearchYYsearch.classList.toggle('pls-hide') 
}
}


function pls_toggle_search_multiple_chat(){
if (plsel.plsChatSearchMultiButton.classList.contains('pls-multiple')) {
plsel.plsChatSearchMultiButton.classList.remove('pls-multiple') 
} else {
plsel.plsChatSearchMultiButton.classList.add('pls-multiple') 
}
}


function pls_handler_sort_saved_streams_by_serviceid(e){
console.log('doing pls_handler_sort_saved_streams_by_serviceid', e) 
if (e && e.preventDefault) { e.preventDefault() }
pls.plsa_savedStreams.sort((a,b) => (a.serviceid.toLowerCase() > b.serviceid.toLowerCase()) ? 1 : ((b.serviceid.toLowerCase() > a.serviceid.toLowerCase()) ? -1 : 0)) 
pls_build_list_of_saved_stream_chat_by_arr(pls.plsa_savedStreams) 
pls_add_listener_for_saved_chat_from_streams(pls.plsa_savedStreams) 
}

function pls_handler_sort_saved_streams_by_channelid(e){
console.log('doing pls_handler_sort_saved_streams_by_channelid', e) 
if (e && e.preventDefault) { e.preventDefault() }
pls.plsa_savedStreams.sort((a,b) => (a.channelid.toLowerCase() > b.channelid.toLowerCase()) ? 1 : ((b.channelid.toLowerCase() > a.channelid.toLowerCase()) ? -1 : 0)) 
pls_build_list_of_saved_stream_chat_by_arr(pls.plsa_savedStreams) 
pls_add_listener_for_saved_chat_from_streams(pls.plsa_savedStreams) 
}

function pls_handler_sort_saved_streams_by_videoid(e){
console.log('doing pls_handler_sort_saved_streams_by_videoid', e)
if (e && e.preventDefault) { e.preventDefault() }
pls.plsa_savedStreams.sort((a,b) => (a.videoid.toLowerCase() < b.videoid.toLowerCase()) ? 1 : ((b.videoid.toLowerCase() < a.videoid.toLowerCase()) ? -1 : 0)) 
pls_build_list_of_saved_stream_chat_by_arr(pls.plsa_savedStreams) 
pls_add_listener_for_saved_chat_from_streams(pls.plsa_savedStreams) 
}

function pls_handler_sort_saved_streams_by_current(e){
console.log('doing pls_handler_sort_saved_streams_by_current', e) 
if (e && e.preventDefault) { e.preventDefault() }
pls.plsa_savedStreams.sort((a,b) => (a.videoid.toLowerCase() > b.videoid.toLowerCase()) ? 1 : ((b.videoid.toLowerCase() > a.videoid.toLowerCase()) ? -1 : 0)) 
let arrl = pls.plsa_savedStreams.length 
let arr = [] 
for (let i = 0; i < arrl; i++) {
if (pls.plsa_savedStreams[i].channelid.toLowerCase() == pls.plsv_channelid) { 
arr.unshift(pls.plsa_savedStreams[i]) 
} else {
arr.push(pls.plsa_savedStreams[i]) 
}
}
pls_build_list_of_saved_stream_chat_by_arr(arr) 
pls_add_listener_for_saved_chat_from_streams(arr) 
}


function pls_add_listener_for_saved_chat_from_streams(e){
console.log('doing pls_add_listener_for_saved_chat_from_streams with ', e); 
setTimeout(function() {
  let elemArr = document.body.getElementsByClassName('pls-db-3');
  console.log('elemArr', elemArr); 
  [].forEach.call(elemArr, function(elem) {
    if (elem) { elem.addEventListener('click', pls_chat_load_by_videoid); }
  });
  elemArr = document.body.getElementsByClassName('pls-db-4');
  [].forEach.call(elemArr, function(elem) {
    if (elem) { elem.addEventListener('click', pls_chat_export_by_videoid); }
  });
  elemArr = document.body.getElementsByClassName('pls-db-5');
  [].forEach.call(elemArr, function(elem) {
    if (elem) { elem.addEventListener('click', pls_chat_delete_by_videoid); }
  });
  elemArr = document.body.getElementsByClassName('pls-db-6');
  [].forEach.call(elemArr, function(elem) {
    if (elem) { elem.addEventListener('click', pls_chat_mark_by_videoid); }
  });
  elemArr = document.body.getElementsByClassName('pls-db-7');
  [].forEach.call(elemArr, function(elem) {
    if (elem) { elem.addEventListener('click', pls_chat_export_to_offline); }
  });
}, 2000);
}


function pls_go_to_timestamp_in_video(e){
if (pls.plsb_vod == false) { return false }
let seconds = 0 
if (e) {
seconds = e 
if (e.target && e.target.dataset && e.target.dataset.seconds) {
seconds = e.target.dataset.seconds 
}
}
setTimeout(function(){
let el = document.body.getElementsByTagName('video') 
if (el[0] && el[0].readyState > 0) {
document.body.scrollTop = document.documentElement.scrollTop = 0 
videoEl[0].currentTime = Number(seconds) 
videoEl[0].play() 
videoEl = null 
pls.plsn_seconds = 1 
}
}, 2000);
}

// <button type="button" class="pls-db-3" title="View This Stream Chat" aria-label="View This Stream Chat" data-dbname="savedchat&amp;kick&amp;whiz&amp;2025-04-20-whiz">2025-04-20-whiz</button>
function pls_chat_load_by_videoid(e){
console.info('doing pls_chat_load_by_videoid $ e', e) 
if (!e || !e.srcElement || !e.srcElement.dataset || !e.srcElement.dataset.dbname) { return false }
if (e.preventDefault) { e.preventDefault() }
if (pls.plsv_serviceid) {
plsel.plsSettingsMenuZZdialog.close('') 
plsel.plsChatMenu1XXbutton.click() 
}
let obj = {} 
obj.dbName = e.srcElement.dataset.dbname 
obj.func = 'pls_build_chat_by_dbName_string' 
obj.home = 'pls_build_chat_from_arr' 
pls_send_message(obj) 
pls.plsv_dbNameToSearch = e.srcElement.dataset.dbname 
}


function pls_build_chat_from_arr(chatObjs){
if (!chatObjs) { return false }
console.info('doing pls_build_chat_from_arr $ chatObjs plsel', chatObjs, plsel) 
plsel.plsChatMenuSavedChat1XXdiv.innerHTML = '' 
plsel.plsChatMenuSavedChat1XXdiv.classList.add('pls-active') 
plsel.plsChatMenuDragSpot1XXdiv.classList.add('pls-active') 
plsel.plsChatMenu1XXaside.classList.add('pls-active-chat') 
str = chatObjs[0].message 
arr = pls_get_arr_from_dbName_string(pls.plsv_dbNameToSearch); // ['savedchat', 'kick', 'streamer', '2024-06-11-streamer'] 
plsel.plsTopChatAZZspan.textContent = 'saved chat from ' + arr[2] + ' on ' + arr[1] + ': ' + arr[3] + ' ' + str 
plsel.plsTopChatBZZspan.textContent = '' 
chatObjs = pls_get_arr_sortedtimes_from_arr(chatObjs) 
let theHTML = ''; 
[].forEach.call(chatObjs, function(chatObj) {
theHTML = pls_build_chat_line_from_obj(chatObj) 
plsel.plsChatMenuSavedChat1XXdiv.insertAdjacentHTML('beforeend', theHTML) 
});
setTimeout(function() {
// pls_add_listener_for_username_insert_into_search();
// pls_add_listener_for_click_timestamp_go_to_video();
// elem, isToSave, isStylingOnly
// let chatElmArr = document.body.getElementsByClassName('pls-chat-line');
// [].forEach.call(chatElmArr, function(chatElm) {
//    pls_process_chat_line(chatElm, false, true); 
// });
// pls_chat_down_to_bottom();
// plsel.plsDragSpot4.classList.add('pls-forefront');
}, 2000);    
}


function pls_chat_delete_by_videoid(e){
console.info('doing pls_chat_delete_by_videoid 1 $ e ', e) 
if (!e) { return false }
console.info('doing pls_chat_delete_by_videoid 2 $ e ', e) 
if (!e || !e.srcElement || !e.srcElement.dataset || !e.srcElement.dataset.dbname) { return false }
console.info('doing pls_chat_delete_by_videoid 3 $ e ', e)   
if (e.preventDefault) { e.preventDefault() }
let obj = {}
obj.dbName = e.srcElement.dataset.dbname 
obj.func = 'pls_chat_delete_by_videoid' 
pls_send_message(obj) 
let dbname = obj.dbName 
let el = document.body.querySelectorAll(`[data-dbname="${dbname}"]`) 
console.info('doing pls_chat_delete_by_videoid 4 $ el ', el) 
if (el[0]) {
el[0].parentElement.remove() 
}
pls_toast('Status: Chat messages from this stream successfully deleted') 
}


function pls_chat_mark_by_videoid(e){
if (!e) { return false } 
console.info('doing pls_chat_mark_by_videoid $ e ', e) 
if (!e || !e.srcElement || !e.srcElement.dataset || !e.srcElement.dataset.dbname) { return false }
if (e.preventDefault) { e.preventDefault() } 
if (pls.plsb_vod == false) {
pls_toast('Status: This is not a VOD or previous livestream.'); return false
}
let obj = {} 
obj.href = location.href 
obj.db = e.srcElement.dataset.dbname 
obj.func = 'pls_chat_mark_by_videoid' 
pls_send_message(obj)
}


function pls_chat_export_to_offline(e){
if (!e) { return false } 
console.info('doing pls_chat_export_to_offline $ e ', e) 
if (!e || !e.srcElement || !e.srcElement.dataset || !e.srcElement.dataset.dbname) { return false }
if (e.preventDefault) { e.preventDefault() } 
let obj = {}
obj.db = e.srcElement.dataset.dbname 
obj.func = 'pls_chat_export_to_offline' 
obj.home = 'pls_chat_export_to_offline_finish' 
pls_send_message(obj)
}
 

function pls_chat_export_to_offline_finish(chatObjArr) {
if (!chatObjArr) { return false } 
console.info('doing pls_chat_export_to_offline_finish $ chatObjArr ', chatObjArr) 
chatObjArr = pls_get_arr_sortedtimes_from_arr(chatObjArr);
let row = '' 
let str = '' 
let str2 = '' 
let username = '' 
let output = [] 
let titles = 'itemid,timestamp,username,message,owner,moderator,vip,og,founder,gifter,sub,verified,staff,anevent,donation,subevent,bot,serviceid,id' 
output.push(e.srcElement.dataset.dbname) 
output.push('\n') 
output.push(titles) 
output.push('\n');  

[].forEach.call(chatObjArr, function(chatObj) {
row = '' 
str = '' 
str2 = ''  
if (chatObj.username) {
str = chatObj.username.replace(/[^a-zA-Z0-9!._\-@\s]/g, ' ') 
str = str.replace(/(\r\n|\n|\r)/gm, "") 
str = str.replaceAll(',', ' ') 
str = str.trim() 
}
if (chatObj.message) {
str2 = chatObj.message.replace(/\/‘’,‚“”„"`~«´<>/g, ' ') 
str2 = str2.replace(/(\r\n|\n|\r)/gm, "") 
str2 = str2.replaceAll(',', ' ') 
str2 = str2.trim() 
}

row += chatObj.itemid + ',' 
row += chatObj.timestamp + ',' 
row += str + ',' 
row += str2 + ',' 
row += chatObj.owner + ',' 
row += chatObj.moderator + ',' 
row += chatObj.vip + ',' 
row += chatObj.og + ',' 
row += chatObj.founder + ',' 
row += chatObj.gifter + ',' 
row += chatObj.sub + ',' 
row += chatObj.verified + ',' 
row += chatObj.staff + ',' 
row += chatObj.anevent + ',' 
row += chatObj.donation + ',' 
row += chatObj.subevent + ',' 
row += chatObj.bot + ',' 
row += chatObj.serviceid + ',' 
row += chatObj.id 
output.push(row) 
output.push('\n') 
});

console.log('pls_chat_export_to_offline output', output) 
let obj = {} 
obj.streamForOffline = output 
obj.func = 'pls_set_stream_for_offline' 
pls_send_message(obj)
}


function pls_search_saved_chat_finish(obj) {
if (!obj) { return false } 
console.info('doing pls_search_saved_chat_finish $ obj ', obj) 

let chatObjArr = obj.chats 
if (chatObjArr.length < 1) { pls_toast('Error: this stream chat not found for display'); return false } 
chatObjArr = pls_get_arr_sortedtimes_from_arr(chatObjArr) 
let searchType = obj.searchType 
let search = obj.search 
let theHTML = '' 

if (searchType == 'byevent') { 
[].forEach.call(chatObjArr, function(chatObj) {
  if ( (chatObj.anevent == 1) || (chatObj.staff === 1) ) {
    let classString = pls_get_str_for_chat_classes_from_obj(chatObj);
    if (chatObj.message) {
      if (chatObj.message.indexOf('clips.kick.com') > -1) {
        let m = chatObj.message;
        let mArr = m.split('-thumbnail.jpeg');
        let mString = mArr[0];
        let mmArr = mString.split('https://clips.kick.com/clips/');
        let clipID = mmArr[1];
        mArr = m.split('img ');
        let imgElm = mArr[0] + "<br /><video class='vjs-tech' webkit-playsinline='' playsinline='' controls src='https://clips.kick.com/clips/" + clipID + ".mp4'></video>";
        theHTML = "<p class='" + classString + "'><span>" + "<span class='author-name'>" + chatObj.username + "</span></span><b>" + imgElm + "</b></p>";
      } else {
        theHTML = "<p class='" + classString + "'><span>" + " : <span class='author-name'>" + chatObj.username + "</span> </span><b>" + chatObj.message + "</b></p>";
      }
    }
    plsel.plsChatMenuSavedChat1XXdiv.insertAdjacentHTML('beforeend', theHTML) 
  }
});
}

if (searchType == 'bykeyword') { 
[].forEach.call(chatObjArr, function(chatObj) {
  if (chatObj.message) {
    if (chatObj.message.toLowerCase().includes(search.toLowerCase() ) ) {
      theHTML = pls_build_chat_line_from_obj(chatObj) 
      plsel.plsChatMenuSavedChat1XXdiv.insertAdjacentHTML('beforeend', theHTML) 
    }
  }
});
}

if (searchType == 'byuser') { 
[].forEach.call(chatObjArr, function(chatObj) {
  if (chatObj.username) {
    if (chatObj.username.toLowerCase().includes(search.toLowerCase() ) ) {
      theHTML = pls_build_chat_line_from_obj(chatObj) 
      plsel.plsChatMenuSavedChat1XXdiv.insertAdjacentHTML('beforeend', theHTML) 
    }
  }
});
}

if (searchType == 'full') { 
[].forEach.call(chatObjArr, function(chatObj) {
  theHTML = pls_build_chat_line_from_obj(chatObj) 
  plsel.plsChatMenuSavedChat1XXdiv.insertAdjacentHTML('beforeend', theHTML) 
});
}

if (searchType == 'startswith') { 
[].forEach.call(chatObjArr, function(chatObj) {
  if (chatObj.message) {
    if (chatObj.message.toLowerCase().indexOf(search.toLowerCase()) == 0) {
      theHTML = pls_build_chat_line_from_obj(chatObj) 
      plsel.plsChatMenuSavedChat1XXdiv.insertAdjacentHTML('beforeend', theHTML) 
    }
  }
});
}

setTimeout(function() {
// pls_add_listener_for_username_insert_into_search();
// pls_add_listener_for_click_timestamp_go_to_video();
// pls_chat_down_to_bottom();
/*
let chatElmArr = document.body.getElementsByClassName('pls-chat-line');
[].forEach.call(chatElmArr, function(chatElm) {
   pls_process_chat_line(chatElm, false, true); 
});
plsel.plsDragSpot4.classList.add('pls-forefront');
plsel.plsChatMenuSavedChat1XXdiv.classList.add('pls-active');
*/
}, 2000);
}


function pls_search_saved_chat(e){
console.info('doing pls_search_saved_chat $ e', e, pls.plsv_dbNameToSearch) 
if (!pls.plsv_dbNameToSearch) { setTimeout(function(){ pls_toast('Error: no active or loaded chat to search.'); return false }, 1000); }
if (e && e.preventDefault) { e.preventDefault() }
let str = pls_get_str_for_search() 
if (str.length < 3) { return false } 
console.log('doing pls_search_saved_chat with: ' + str) 
if (plsel.plsSideMenuChatSearchMultiYYbutton.classList.contains('pls-multiple')) {
if (e.target.id == 'plsSideMenuChatSearchStartsWithYYbutton' || e.target.id == 'plsSideMenuChatSearchUserYYbutton' || e.target.id == 'plsSideMenuChatSearchKeywordYYbutton') {
pls_search_multiple_saved_chat(e) 
return false 
}
}
plsel.plsChatMenuSavedChat1XXdiv.innerHTML = '' 
let searchType = '' 
let toastMessage = 'Searching...' 
let toastMessage2 = '' 
let labelMessage = '' 
if (e.target.id == 'plsSideMenuChatSearchStartsWithYYbutton') {
searchType = 'startswith' 
toastMessage = str + ' beginning a message is being searched for' 
toastMessage2 = str + ' not found starting message' 
labelMessage = ' chat starting with: ' + str 
}
if (e.target.id == 'plsSideMenuChatSearchUserYYbutton') {
searchType = 'byuser' 
toastMessage = ' messages from ' + str + ' being searched for ' 
toastMessage2 = str + ' username has no saved chat messages' 
labelMessage = ' chat from username: ' + str 
}
if (e.target.id == 'plsSideMenuChatSearchKeywordYYbutton') {
searchType = 'bykeyword' 
toastMessage = str + ' in a message is being searched for ' 
toastMessage2 = str + ' not found in chat' 
labelMessage = ' chat by phrase: ' + str 
}
if (e.target.id == 'plsSideMenuChatSearchEventsYYbutton') {
searchType = 'byevent' 
str = 'test' 
toastMessage = ' stream events ' 
toastMessage2 = ' events not found ' 
labelMessage = ' stream events' 
}
if (e.target.id == 'plsSideMenuChatSearchFullYYbutton') {
searchType = 'full' 
str = 'test' 
toastMessage = ' full chat search ' 
toastMessage2 = ' chat not found ' 
labelMessage = ' full stream chat' 
}
pls_toast(toastMessage);
let obj = {} 
obj.dbName = pls.plsv_dbNameToSearch 
obj.func = 'pls_build_chat_by_dbName_string' 
obj.home = 'pls_search_saved_chat_finish' 
obj.searchType = searchType 
obj.search = str 
pls_send_message(obj) 
let dbArr = pls_get_arr_from_dbName_string(pls.plsv_dbNameToSearch) 
plsel.plsTopChatAZZspan.textContent = dbArr[2] + ' on ' + dbArr[1] + ': ' + dbArr[3] 
plsel.plsTopChatBZZspan.textContent = labelMessage 
}


function pls_search_multiple_saved_chat(e){
console.info('doing pls_search_multiple_saved_chat $ e', e, pls.plsv_dbNameToSearch) 
if (e && e.preventDefault) { e.preventDefault() } 
let str = pls_get_str_for_search() 
console.log('search_multiple_saved_chat with: ' + str) 
if (str.length < 3) { return false } 
let searchType = '' 
let toastMessage = 'Searching...' 
let toastMessage2 = '' 
let labelMessage = '' 
if (e.target.id == 'plsSideMenuChatSearchStartsWithYYbutton') { 
searchType = 'startswith' 
toastMessage = str + ' beginning a message is being searched for' 
toastMessage2 = str + ' not found starting message' 
labelMessage = ' chat starting with: ' + str 
}
if (e.target.id == 'plsSideMenuChatSearchUserYYbutton') { 
searchType = 'byuser' 
toastMessage = ' messages from ' + str + ' being searched for ' 
toastMessage2 = str + ' username has no saved chat messages' 
labelMessage = ' chat from username: ' + str 
}
if (e.target.id == 'plsSideMenuChatSearchKeywordYYbutton') { 
searchType = 'bykeyword' 
toastMessage = str + ' in a message is being searched for ' 
toastMessage2 = str + ' not found in chat' 
labelMessage = ' chat by phrase: ' + str 
}
if (e.target.id == 'plsSideMenuChatSearchEventsYYbutton') { 
searchType = 'byevent' 
toastMessage = ' stream event search ' 
toastMessage2 = ' events not found ' 
labelMessage = ' stream events' 
}
if (e.target.id == 'plsSideMenuChatSearchFullYYbutton') { 
searchType = 'full' 
str = 'test' 
toastMessage = ' full chat search ' 
toastMessage2 = ' chat not found ' 
labelMessage = ' full stream chat' 
}
plsel.plsChatMenuSavedChat1XXdiv.innerHTML = '' 
pls_toast(toastMessage) 
pls.plsa_savedStreams = [] 

let obj = {} 
obj.func = 'pls_search_multiple_saved_chat' 
obj.home = 'pls_search_multiple_saved_chat_finish' 
obj.searchType = searchType 
obj.search = str 
pls_send_message(obj) 
plsel.plsTopChatAZZspan.textContent = 'Saved Chat From All' 
plsel.plsTopChatBZZspan.textContent = labelMessage 
}


function pls_search_multiple_saved_chat_finish(obj) {
console.log('doing pls_search_multiple_saved_chat_finish with obj', obj) 
let chatObjArr = obj.chats 
if (chatObjArr.length < 1) { pls_toast('Error: this stream chat not found for display'); return false }
chatObjArr = pls_get_arr_sortedtimes_from_arr(chatObjArr) 
let searchType = obj.searchType
let search = obj.search
let theHTML = '' 
chatObjArr = pls_get_arr_sortedtimes_from_arr(chatObjArr) 

if (searchType == 'bykeyword') {
  [].forEach.call(chatObjArr, function(chatObj) {
    if (chatObj.message) {
      if (chatObj.message.toLowerCase().includes(search.toLowerCase() ) ) {
        let theHTML = pls_build_chat_line_from_obj(chatObj, chatObjArr[0]);
        plsel.plsChatMenuSavedChat1XXdiv.insertAdjacentHTML('beforeend', theHTML);
      }
    }
  });
}

if (searchType == 'byuser') {
  [].forEach.call(chatObjArr, function(chatObj) {
    if (chatObj.username) {
      if (chatObj.username.toLowerCase().includes(search.toLowerCase() ) ) {
        let theHTML = pls_build_chat_line_from_obj(chatObj, chatObjArr[0]);
        plsel.plsChatMenuSavedChat1XXdiv.insertAdjacentHTML('beforeend', theHTML);
      }
    }
  });
}

if (searchType == 'full') {
  [].forEach.call(chatObjArr, function(chatObj) {
    let theHTML = pls_build_chat_line_from_obj(chatObj, chatObjArr[0]);
    plsel.plsChatMenuSavedChat1XXdiv.insertAdjacentHTML('beforeend', theHTML);
  });
}

if (searchType == 'startswith') {
  [].forEach.call(chatObjArr, function(chatObj) {
    if (chatObj.message) {
      if (chatObj.message.toLowerCase().indexOf(search.toLowerCase()) == 0) {
        let theHTML = pls_build_chat_line_from_obj(chatObj, chatObjArr[0]);
        plsel.plsChatMenuSavedChat1XXdiv.insertAdjacentHTML('beforeend', theHTML);
      }
    }
  });
}

setTimeout(function() {
  /*
  // pls_add_listener_for_username_insert_into_search();
  // pls_add_listener_for_click_timestamp_go_to_video();
  // pls_chat_down_to_bottom();
  let chatElmArr = document.body.getElementsByClassName('pls-chat-line');
  [].forEach.call(chatElmArr, function(chatElm) {
     pls_process_chat_line(chatElm, false, true);
  });
  plsel.plsDragSpot4.classList.add('pls-forefront');
  plsel.plsChatMenuSavedChat1XXdiv.classList.add('pls-active');
*/
}, 2000);
}


function pls_add_listener_for_uploading_chat(e){
console.log("pls_add_listener_for_uploading_chat 1 $ ", e);
plsel.plsChatsMenuImportZZinput.addEventListener('change', function(e2) {
  console.log("pls_add_listener_for_uploading_chat change 2 $ ", e2);
  if (this.files && this.files[0]) {
    console.log("pls_add_listener_for_uploading_chat has files 3 $ ", this.files);
    if (this.files[0].name.substring(this.files[0].name.length - 11) != 'chatlog.csv') {
      console.log('Error: file name not supported to import'); pls_toast('Error: file name not supported to import'); return false;
    }
    if ( (this.files[0].size < 8) || (this.files[0].size > 100000000) ) {
      console.log('Error: file size not supported to import'); pls_toast('Error: file size not supported to import'); return false;
    }
    if ( this.files[0].type != 'text/csv' ) {
      console.log('Error: file type not supported to import'); pls_toast('Error: file type not supported to import'); return false;
    }
    var reader = new FileReader();
    reader.addEventListener('load', function(e3) {
      console.log('pls_add_listener_for_uploading_chat load 4 $ ', e3);
      if (!e3 || !e3.target || !e3.target.result) { pls_toast('Error: chat failed loading'); return false; }
      pls_toast('Status: importing chat now.') 
      let csvdata = e3.target.result 
      let chatLineArr = [] 
      let arr = csvdata.split("\n") 
      let arrl = arr.length 
      for (let i = 0; i < arrl; i++) {
      chatLineArr.push(arr[i].split(',')) 
      }
      if (!this.files[0].name || !chatLineArr || !chatLineArr || chatLineArr.length < 2) { pls_toast('Error: chat not found to import'); return false; }
      let obj = {}
      obj.func = 'csv_import_chat_log_from_chatarr'
      obj.filename = this.files[0].name
      obj.chatArr = chatLineArr
      pls_send_message(obj)
    });
    reader.readAsBinaryString(this.files[0]);
  }
});
}


function pls_chat_export_by_videoid(e){
if (!e || !e.srcElement || !e.srcElement.dataset || !e.srcElement.dataset.dbname) { return false }
if (e.preventDefault) { e.preventDefault() } 
console.log('doing pls_chat_export_by_videoid', e) 
let obj = {}
obj.dbName = e.srcElement.dataset.dbname 
obj.func = 'pls_build_chat_by_dbName_string' 
obj.home = 'pls_chat_export_from_obj' 
pls_send_message(obj)
}


function pls_chat_export_from_obj(obj){
if (!obj) { return false } 
console.info('doing pls_chat_export_from_obj $ obj ', obj) 
let row = '' 
let str = '' 
let str2 = '' 
let output = [] 
let titles = 'itemid,timestamp,username,message,owner,moderator,vip,og,founder,gifter,sub,verified,staff,anevent,donation,subevent,bot,serviceid,id' 
output.push(titles) 
output.push('\n'); 
[].forEach.call(chatObjArr, function(chatObj) {
row = '' 
str = '' 
str2 = ''  
if (chatObj.username) {
str = chatObj.username.replace(/[^a-zA-Z0-9!._\-@\s]/g, ' ') 
str = str.replace(/(\r\n|\n|\r)/gm, "") 
str = str.replaceAll(',', ' ') 
str = str.trim() 
}
if (chatObj.message) {
str2 = chatObj.message.replace(/\/‘’,‚“”„"`~«´<>/g, ' ') 
str2 = str2.replace(/(\r\n|\n|\r)/gm, "") 
str2 = str2.replaceAll(',', ' ') 
str2 = str2.trim() 
}

row += chatObj.itemid + ',' 
row += chatObj.timestamp + ',' 
row += str + ',' 
row += str2 + ',' 
row += chatObj.owner + ',' 
row += chatObj.moderator + ',' 
row += chatObj.vip + ',' 
row += chatObj.og + ',' 
row += chatObj.founder + ',' 
row += chatObj.gifter + ',' 
row += chatObj.sub + ',' 
row += chatObj.verified + ',' 
row += chatObj.staff + ',' 
row += chatObj.anevent + ',' 
row += chatObj.donation + ',' 
row += chatObj.subevent + ',' 
row += chatObj.bot + ',' 
row += chatObj.serviceid + ',' 
row += chatObj.id 
output.push(row) 
output.push('\n') 
});

let csvString = output.join() 
output = null 
csvString = csvString.replace(/\/'"`/g, '') 
csvString = csvString.replace(/%3D/g, '') 
let blob = pls_get_csv_file_from_str(csvString) 
let csvName = obj.dbName + '-chatlog.csv' 
pls_get_csv_download(blob, csvName) 
}


console.log('shared loaded');