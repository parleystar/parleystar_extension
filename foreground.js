/* SPDX-FileCopyrightText: © 2025 promising future digital media llc. All rights reserved. <admin@parleystar.com> */
/* SPDX-License-Identifier: Mozilla Public License 1.1 (MPL-1.1) */
/* 
2 top-level objects
pls = variables
plsel = dom elements

chrome.storage
chrome.runtime.connect()
chrome.runtime.getManifest()
chrome.runtime.getURL()
chrome.runtime.id
chrome.runtime.onConnect
chrome.runtime.onMessage
chrome.runtime.sendMessage()
*/
console.log('foreground loaded') 

function pls_show_error(err){
if (err) {
console.warn('pls_show_error $ A functional error occured in ParleyStar extension at: ' + location.href , err)
}
if (chrome && chrome.runtime && chrome.runtime.lastError) {
console.warn('pls_show_error $ A runtime error occured in ParleyStar extension at: ' + location.href , chrome.runtime.lastError)
alert(chrome.runtime.lastError.message)
}
}


function pls_send_message(msg) {
if (window.name == 'plsVideosMenuVideoPlayerZZiframe') { return false; }
console.info('pls_send_message $ msg chrome', msg, chrome) 
if (chrome && chrome.runtime && chrome.runtime.id && pls && pls.plsv_serviceid) {
console.info('pls_send_message $ chrome.runtime.id: ', chrome.runtime.id, pls.plsv_serviceid, location.href, msg)
} else {
console.info('pls_send_message $ no message, need to reconnect here')
return false
}
if (pls.plsb_messagesending != false) {
// return false
}
try {
console.log("FINAL MSG", msg)  
chrome.runtime.sendMessage({pls_msg: msg}).then((resp) => {
console.info('pls_send_message $ resp', resp)
if (pls.func) {
pls.plsb_messagesending = pls.func  
setTimeout(function(){ pls.plsb_messagesending = false }, 500) 
}
})
.catch((err) => {
pls_show_error(err)
})
} catch(err) {
pls_show_error(err)
}
}


if (!window.hasOwnProperty('pls') && !location.href.includes('com/live_chat?continuation') && window.name != 'plsVideosMenuVideoPlayerZZiframe') {
window.pls = {} 
window.plsel = {} 
let str = '' 
let S = location.host 
S = S.replace('www.', '') 
S = S.replace('m.', '') 
S = S.replace('.com', '') 
S = S.replace('.tv', '') 
S = S.replace('.live', '') 
pls.plsv_serviceid = S 
pls.func = 'pls_init'
pls.plsb_messagesending = false 
chrome.runtime.sendMessage({pls_msg: pls}) 
}

window.addEventListener("offline", (e) => { 
if (window.name == 'plsVideosMenuVideoPlayerZZiframe') { return false; }
console.log("foreground went offline")  
pls.func = 'pls_went_offline' 
pls_send_message(pls) 
});

window.addEventListener("online", (e) => {
if (window.name == 'plsVideosMenuVideoPlayerZZiframe') { return false; }
console.log("foreground went online") 
pls.func = 'pls_went_online' 
pls_send_message(pls) 
});

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
if (window.name == 'plsVideosMenuVideoPlayerZZiframe') { return false; }

console.log('requestToForeground!', request, sender)
sendResponse({ sender: "foreground.js", data: "thumbsup" })
 
if ( request && typeof request === 'object' && request.msg && typeof request.msg === 'object' ) {

if (request.msg.err) {
pls_show_error(request.msg.err)
}

// happens for youtube
if (request.msg.settings) {
let combinedSettings = '' 
combinedSettings = { ...pls, ...request.msg }
pls = combinedSettings 
pls.plsv_serviceid = pls_get_str_serviceid(pls) 
console.log('1 -------- settings', pls) 
}

// happens for youtube
if (request.msg.init) {
console.log('2 -------- init', pls) 

if (request.msg.plsel) {
console.log('3 -------- init plsel', request.msg.plsel) 
let str = '' 
let elem = document.createElement('div')
document.body.appendChild(elem) 
let arrlen = request.msg.plsel.length 
for (let i = 0; i < arrlen; i++) {
str = request.msg.plsel[i]
window.plsel[str] = elem 
}
}

if (pls.plsv_serviceid == 'kick') {
pls_get_logged_in_token() 
}
pls_wait_for_header_to_load() 
}

if (request.msg.chatdbs) {
console.log('4 -------- chatdbs', request.msg) 
if (request.msg.home == 'pls_build_list_of_saved_stream_chat_by_arr') {
pls_build_list_of_saved_stream_chat_by_arr(request.msg.chatdbs) 
}
if (request.msg.home == 'pls_build_dropdown_of_saved_stream_chat_by_arr') {
pls_build_dropdown_of_saved_stream_chat_by_arr(request.msg.chatdbs) 
} 
}

if (request.msg.chats) {
console.log('5 -------- chats', request.msg) 
if (request.msg.home == 'pls_build_chat_from_arr') {
pls_build_chat_from_arr(request.msg.chats)
}
if (request.msg.home == 'pls_chat_export_from_obj') {
pls_chat_export_from_obj(request.msg)
}
if (request.msg.home == 'pls_search_saved_chat_finish') {
pls_search_saved_chat_finish(request.msg)
}
if (request.msg.home == 'pls_search_multiple_saved_chat_finish') {
pls_search_multiple_saved_chat_finish(request.msg)
}
}

if (request.msg.help_text) {
console.log('6 -------- help_text', request.msg) 
pls_set_help_text(request.msg.help_text)
}

if (request.msg.videos) {
console.log('7 -------- pls_build_video_feed', request.msg) 
if (request.msg.videos.length) {
pls_build_video_feed(request.msg.videos, request.msg.requestObj) 
}
}

if (request.msg.home == 'pls_delete_settings') {
console.log('8 -------- pls_delete_settings', request.msg) 
window.location.reload() 
}

if (request.msg.plsb_islive) {
console.log('9 -------- plsb_islive', request.msg) 
pls.plsv_channelid = request.msg.plsv_channelid 
pls.plsv_videoid = request.msg.plsv_videoid 
pls.plsv_dbNameToSearch = request.msg.plsv_dbNameToSearch 
if (pls.plsb_invalid_page != true && !request.msg.init) {

if (pls.plsv_serviceid == 'youtube' && pls.plsv_videoid) {
console.log('youtube livechat', pls.plsv_serviceid, pls.plsv_videoid)
pls_wait_for_youtube_load() 
return false   
}

plsel.plsChatsMenuLiveTitleZZh5.classList.remove('pls-hide') 
plsel.plsChatsMenuLoadWrapperZZdiv.classList.remove('pls-hide') 
pls.plsb_islive = true 
let obj = {} 
obj.func = 'pls_set_db_for_saving';
obj.dbName = pls.plsv_dbNameToSearch; 
obj.plsv_channelid = pls.plsv_channelid;
obj.plsv_serviceid = pls.plsv_serviceid; 
pls_send_message(obj) 
pls_wait_for_chatmenu_to_load() 

}
}

}
});


function pls_wait_for_youtube_load() {
console.info('doing pls_wait_for_youtube_load $ pls', pls) 

setTimeout(function(){ 
let elemArr = document.body.querySelectorAll('#action-buttons');
if (elemArr[0]) {
elemArr[0].insertAdjacentHTML('afterbegin', '<section>⚙️</section>') 
}
elemArr[0].addEventListener('click', pls_open_settings) 

let script = document.body.getElementsByTagName('script') 
if (!script || !script[1] || !script[1].textContent) { return false }
let arr = script[1].textContent.split('] = ') 
if (!arr[1]) { return false }
let arr2 = arr[1].split('};');
let str = arr2[0]; 
str = str.slice(0, -1); 
str = str + '}}';

try {
let obj = JSON.parse(str) 
if (
obj && 
obj.contents && 
obj.contents.liveChatRenderer && 
obj.contents.liveChatRenderer.participantsList && 
obj.contents.liveChatRenderer.participantsList.liveChatParticipantsListRenderer && 
obj.contents.liveChatRenderer.participantsList.liveChatParticipantsListRenderer.participants[0] && 
obj.contents.liveChatRenderer.participantsList.liveChatParticipantsListRenderer.participants[0].liveChatParticipantRenderer && 
obj.contents.liveChatRenderer.participantsList.liveChatParticipantsListRenderer.participants[0].liveChatParticipantRenderer.authorName && 
obj.contents.liveChatRenderer.participantsList.liveChatParticipantsListRenderer.participants[0].liveChatParticipantRenderer.authorName.simpleText
) {

pls.plsv_channelid = obj.contents.liveChatRenderer.participantsList.liveChatParticipantsListRenderer.participants[0].liveChatParticipantRenderer.authorName.simpleText 
pls.plsv_dbNameToSearch = 'savedchat' + '&' + pls.plsv_serviceid + '&' + pls.plsv_channelid + '&' + pls.plsv_videoid 
plsel.plsChatsMenuLiveTitleZZh5.classList.remove('pls-hide') 
plsel.plsChatsMenuLoadWrapperZZdiv.classList.remove('pls-hide') 
pls.plsb_islive = true 
let obj2 = {} 
obj2.func = 'pls_set_db_for_saving' 
obj2.dbName = pls.plsv_dbNameToSearch 
obj2.plsv_channelid = pls.plsv_channelid 
obj2.plsv_serviceid = pls.plsv_serviceid  
pls_send_message(obj2) 
pls_wait_for_chatmenu_to_load() 
}
} catch(err){
pls_show_error(err) 
}

 }, 3000);
}


function pls_get_str_serviceid(pls){
console.info('doing pls_get_str_serviceid $ pls', pls)
pls.plsv_serviceid = null
if (location && location.hostname) {
let str = location.hostname.toLowerCase().trim()
if (str) {
if ( str.includes('chzzk.naver') ) {
pls.plsv_serviceid = 'chzzk' 
return pls.plsv_serviceid
}
str = str.replace('www.', '')
str = str.replace('m.', '')
str = str.split('.com')[0]
str = str.split('.tv')[0]
str = str.split('.live')[0]
str = str.replace('/', '')
pls.plsv_serviceid = str
}
}
return pls.plsv_serviceid
}


function pls_open_settings(){
console.info('doing pls_open_settings $') 
plsel.plsSettingsMenuZZdialog.showModal();
}


function pls_get_logged_in_token(e) {
console.info('doing pls_get_logged_in_token $ e', e) 
  pls.plsv_session_token = null;
  let cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key == 'session_token') {
      chrome.storage.local.set({ 'parleystarkick': decodeURIComponent(value) })
    }
  }
}

// #container .ytd-masthead
// chat-messages
function pls_wait_for_header_to_load() {
if (location.href.includes('com/live_chat?continuation') || window.name == 'plsVideosMenuVideoPlayerZZiframe' ) { return false; }
let elemArr = document.body.getElementsByClassName('plsTopZZdiv');
if (elemArr[0]) { return false; }
console.info('doing pls_wait_for_header_to_load $ plsv_serviceid', pls.plsv_serviceid) 

// let elem = pls['nav_' + pls.plsv_serviceid]
// elem = '#tiktok-live-main-container-id' 
// action-buttons ⚙️
let elem = '#contents.yt-live-chat-app';
console.info('1 pls_wait_for_header_to_load elem', elem)
pls_wait_for_element_to_exist(elem).then(element => {
  console.info('pls_wait_for_element_to_exist nav bar dom loaded $ element', element)
  pls_make_toast() 
  elem = pls['settingsmenu']
  element.insertAdjacentHTML('afterbegin', elem) 
  let B = document.body 
  B.classList.add('pls-' + pls.plsv_serviceid) 
  B.classList.add('pls-loaded') 
  if (window.matchMedia('only screen and (max-width: 760px)').matches) {
  	pls.plsb_mobile = true 
    B.classList.add('pls-mobile') 
  } else {
    pls.plsb_mobile = false 
    B.classList.add('pls-desktop') 
  }
  if (pls.plsb_popout === true) {
  	B.classList.add('pls-popout') 
  }
  pls.func = 'pls_went_online' 
  pls_send_message(pls) 
  setTimeout(function(){ pls_do_settings_on_load() }, 3000);
})
}


function pls_wait_for_chatmenu_to_load() {
if (location.href.includes('com/live_chat?continuation') || window.name == 'plsVideosMenuVideoPlayerZZiframe' ) { return false }
let elemArr = document.body.getElementsByClassName('plsSideMenuYYdiv') 
if (elemArr[0]) { return false }
console.info('doing pls_wait_for_chatmenu_to_load $ plsv_serviceid', pls.plsv_serviceid) 

let elem = pls['chatmenu_' + pls.plsv_serviceid] 
// elem = '[aria-label="LIVE chat"]' 
console.info('1 pls_wait_for_chatmenu_to_load elem', elem)
pls_wait_for_element_to_exist(elem).then(element => {
  console.info('pls_wait_for_element_to_exist chatmenu loaded $ element', element)
  setTimeout(function(){ 
    if (pls.chatmenu) { 
      if (document.body.getElementsByClassName('plsSideMenuYYdiv')[0]) { return false } 
      elem = pls.chatmenu
      element.insertAdjacentHTML('afterbegin', elem) 
      pls_add_chat_menu_handlers(element) 
      console.log('pls.plsv_dbName is: ', pls.plsv_dbName) 
      if (pls.plsv_dbName && (pls.plsv_dbName != '') && (pls.plsv_dbName != null)) {
        let e = {} 
        e.target = {} 
        e.target.value = pls.plsv_dbName 
        pls_chat_listen(e) 
      }
    }
  }, 3500)
})
}


function pls_chat_listen(e){
if (window.name == 'plsVideosMenuVideoPlayerZZiframe' || !e || !e.target) { return false; } 
console.info('doing pls_chat_listen1 $ evalue', e.target.value); // savedchat&kick&whiz&2025-04-20-whiz
if (e.target.value == '' || e.target.value == 'nosave') { pls_chat_listen_stop(); return false }
console.info('doing pls_chat_listen2 $ e observer', e, pls.plso_observer) 
if (pls.plso_observer) { return false }

let targetNode = pls_get_arr_chatbox_elem() 
targetNode = document.body.querySelectorAll('div.absolute.w-full.top-0.left-0') 

console.info('doing pls_chat_listen $ targetNode plsb_islive', targetNode, pls.plsb_islive) 
if (targetNode[0]) { 
// pls.plsv_dbNameToSearch = 'savedchat' + '&' + pls.plsv_serviceid + '&' + pls.plsv_channelid + '&' + pls.plsv_videoid
// e.target.value = current db from select menu or localstorage
let str = 'savedchat' + '&' + pls.plsv_serviceid + '&' + pls.plsv_channelid + '&' + pls.plsv_videoid 
console.log('pls_chat_listen ' + e.target.value + ' vs ' + str) 
if (str != e.target.value || !pls.plsb_islive) { return false }

let obj = {} 
obj.func = 'pls_set_active_db_for_saving' 
obj.dbName = e.target.value 
pls_send_message(obj) 
plsel.plsChatsMenuZZsummary.textContent = 'Chats 🔴' 
let config = { 
  childList: true,
  attributes: false,
  characterData: false,
  subtree: false,
  attributeOldValue: false,
  characterDataOldValue: false 
};
let callback = function(mutationsList, observer) {
  for(const mutation of mutationsList) {
    if (mutation.type === 'childList') {
        if (mutation.addedNodes) {
          let arrl = mutation.addedNodes.length 
          for (let i=0; i < arrl; i++) { 
            pls_process_chat_line(mutation.addedNodes[i]) 
          }
        }
      }
    }
  };
  if (pls) {
    pls.plso_observer = new MutationObserver(callback) 
    pls.plso_observer.observe(targetNode[0], config) 
  }
}
return false
}


function pls_chat_listen_stop(e) {
console.info('doing pls_chat_listen_stop $ e', e) 
pls.plso_observer = null 
pls.plsv_dbName = null 
pls.plsb_islive = false 
plsel.plsChatsMenuZZsummary.textContent = 'Chats' 
let obj = {} 
obj.func = 'pls_set_active_db_for_saving' 
obj.dbName = null 
pls_send_message(obj) 
}


function pls_get_blank_chat_obj() {
// console.info('doing pls_get_blank_chat_obj $ ') 
let stampArr = new Date().toLocaleTimeString().replace(/ /g, '').split(':') 
let obj = {} 
obj.itemid = '' 
obj.timestamp = stampArr[0] + ':' + stampArr[1] + stampArr[2].slice(2)
obj.username = '' 
obj.message = '' 
obj.owner = 0 
obj.moderator = 0 
obj.vip = 0 
obj.og = 0 
obj.founder = 0 
obj.gifter = 0 
obj.sub = 0 
obj.verified = 0 
obj.staff = 0 
obj.anevent = 0 
obj.donation = 0 
obj.subevent = 0 
obj.bot = 0 
obj.serviceid = pls.plsv_serviceid 
return obj
}


// pls_process_chat_line(elm, false, false); , isToSave, isStylingOnly return false;
function pls_process_chat_line(elem){
// console.info('doing pls_process_chat_line $ elem', elem) 
let elemArr = [] 
let imgArr = [] 
let usr = '' 
let msg = '' 
let str = '' 
let srcStr = '' 
let obj = pls_get_blank_chat_obj() 
obj.serviceid = pls.plsv_serviceid 



if (pls.plsv_serviceid == 'youtube') {

elemArr = elem.querySelectorAll('.yt-live-chat-viewer-engagement-message-renderer') 
if (elemArr[0]) {
return false 
}
obj.itemid = elem.id 

elemArr = elem.querySelectorAll('#author-name') 
if (elemArr[0]) {
usr = elemArr[0].textContent 
}
usr = pls_get_cleaned_str_from_str(usr) 
if (!usr) { return false }

elemArr = elem.querySelectorAll('#message') 
if (elemArr[0]) {
msg = elemArr[0].textContent 
}
msg = pls_get_cleaned_str_from_str(msg) 



if (!msg) { return false }


// emoji img.alt

// #author-name
// if elem.author-type="moderator" obj.moderator = 1



}


/*
tiktok
elemArr = elem.querySelectorAll('[data-e2e="message-owner-name"]') 
if (elemArr[0]) { 
usr = elemArr[0].textContent 
}

elemArr = elem.querySelectorAll('div.w-full.break-words.align-middle') 
if (elemArr[0]) { 
msg = elemArr[0].textContent 
}
*/



  str = pls['chatusr_' + pls.plsv_serviceid] 
  if (str) {
    elemArr = elem.querySelectorAll(str) 
    if (elemArr[0]) {
      usr = elemArr[0].textContent 
    }
  }

  str = pls['chatmessage_' + pls.plsv_serviceid] 
  if (str) {
    elemArr = elem.querySelectorAll(str) 
    if (elemArr[0]) {
      msg = elemArr[0].textContent 
      if (pls.plsv_serviceid == 'kick') {
        imgArr = elemArr[0].querySelectorAll('img') 
      }
      if (pls.plsv_serviceid == 'twitch') {
        imgArr = elem.querySelectorAll('img.chat-line__message--emote') 
      }
      if (pls.plsv_serviceid == 'kick' || pls.plsv_serviceid == 'twitch') {
        if (imgArr[0]) { 
            [].forEach.call(imgArr, function(imgElem) {
              if (imgElem && imgElem.alt) {
                msg = msg + ' ' + imgElem.alt;
                // ::emote-
              }
            });
        }
      }
    }
  }


if (!usr || !msg) { return false }
if (msg.charAt(0) == '!') { return false }
// if ( (usr.indexOf('bot') > -1) || (usr.indexOf('Bot') > -1) || (usr == 'StreamElements') || (usr == 'StreamLabs') || (usr == 'Tifa Lockhart') || (usr == 'Kicklet') || (usr == 'BotRix') ) {
// return false 
// }
usr = pls_get_cleaned_str_from_str(usr) 
msg = pls_get_cleaned_str_from_str(msg) 
if (!usr || !msg) { return false }
obj.itemid = pls.plsv_videoid + '+' + Date.now() 
obj.username = usr 
obj.message = msg 

if (pls.plsv_serviceid == 'kick') {
  obj = pls_get_roles_from_kick(obj, elem) 
}
if (pls.plsv_serviceid == 'twitch') {
  obj = pls_get_roles_from_twitch(obj, elem) 
}
if (pls.plsv_serviceid == 'tiktok') {
  obj = pls_get_roles_from_tiktok(obj, elem) 
}

obj.func = 'pls_set_db_save_chat_obj' 
obj.dbName = pls.plsv_dbName 
pls_send_message(obj)
return false 
}


function pls_get_roles_from_tiktok(obj, elem) {
imgArr = elem.querySelectorAll('img'); 
[].forEach.call(imgArr, function(imgElem) {
if (imgElem && imgElem.src) {
srcStr = imgElem.getAttribute('src');
if (srcStr) {
  if (srcStr.includes('broadcaster')) {
    obj.owner = 1;
    console.log(obj.username + ' - ' + obj.message + ' - broadcaster chat');
  }
  if (srcStr.includes('staff')) {
    obj.staff = 1;
    console.log(obj.username + ' - ' + obj.message + ' - staff chat');
  }
  if (srcStr.indexOf('sub') > -1) {
    obj.sub = 1;
    console.log(obj.username + ' - ' + obj.message + ' - subs chat');
  }
  if (srcStr.indexOf('fans') > -1) {
    obj.og = 1;
    console.log(obj.username + ' - ' + obj.message + ' - og chat');
  }
  if (srcStr.indexOf('mod') > -1) {
    obj.moderator = 1;
    console.log(obj.username + ' - ' + obj.message + ' - mod chat');
  }
  if (srcStr.indexOf('gifter') > -1) {
    obj.gifter = 1;
    console.log(obj.username + ' - ' + obj.message + ' - gifter chat');
  }
}
}
});
return obj 
}


function pls_get_roles_from_kick(obj, elem) {
  if ( 
      (elem.classList.contains('owner')) || 
      (elem.querySelector('path[fill="url(#HostBadgeA)"'))
  ) {
    obj.owner = 1
  }
  if (
      (elem.classList.contains('moderator')) || 
      (elem.querySelector('path[fill="#00C7FF"]')) 
  ) {
    obj.moderator = 1
  }
  if ( 
      (elem.classList.contains('vip')) || 
      (elem.querySelector('path[fill="url(#VIPBadgeA)"')) || 
      (elem.querySelector('path[fill="#1EFF00"')) 
    ) {
    obj.vip = 1
  }
  if ( 
      (elem.classList.contains('og')) || 
      (elem.querySelector('[data-v-935db34c]')) || 
      (elem.querySelector('#badge-og-gradient-1'))
  ) {
    obj.og = 1
  }
  if ( 
      (elem.classList.contains('founder')) || 
      (elem.querySelector('path[fill="url(#FounderBadgeB)"'))
    ) {
      obj.founder = 1
  }
  if ( 
       (elem.classList.contains('gifter')) || 
       (elem.querySelector('svg[viewBox="0 0 32 32"]'))
    ) {
      obj.gifter = 1 
  }
  if ( 
      (elem.classList.contains('sub')) || 
      (elem.querySelector('img[alt*="Subscriber"]')) 
  ) {
    obj.sub = 1
  }
  if ( 
      (elem.classList.contains('verified')) || 
      (elem.querySelector('path[fill="#1EFF00"')) 
    ) {
    obj.verified = 1
  }
  if ( 
      (elem.classList.contains('staff')) || 
      (elem.querySelector("svg g#surface1 path[d='M 8 14 L 5 11 L 7 5 L 9 5 L 11 11 Z M 8 14 ']")) || 
      (elem.querySelector('[data-v-9200dfef]')) || 
      (elem.querySelector('path[d="M2.07324 1.33331H6.51991V4.29331H7.99991V2.81331H9.47991V1.33331H13.9266V5.77998H12.4466V7.25998H10.9599V8.73998H12.4466V10.22H13.9266V14.6666H9.47991V13.1866H7.99991V11.7066H6.51991V14.6666H2.07324V1.33331Z"]') )
    ) {
    obj.staff = 1
  }
  return obj 
}

// alt="Founder, 80-Month Subscriber"
function pls_get_roles_from_twitch(obj, elem) {
let imgArr = elem.querySelectorAll('img'); 
if (imgArr[0]) { 
[].forEach.call(imgArr, function(imgElem) {
  if (imgElem && imgElem.alt) {
    if (imgElem.alt.includes('Broadcaster')) {
      obj.owner = 1 
    }
    if (imgElem.alt.includes('Moderator')) {
      obj.moderator = 1 
    }
    if (imgElem.alt.includes('VIP')) {
      obj.vip = 1 
    }
    if (imgElem.alt.includes('Founder')) {
      obj.founder = 1 
    }
    if (imgElem.alt.includes('Gifter')) {
      obj.gifter = 1 
    }
    if (imgElem.alt.includes('Subscriber')) {
      obj.sub = 1 
    }
    if (imgElem.alt.includes('Verified')) {
      obj.verified = 1 
    }
    if (imgElem.alt.includes('Staff')) {
      obj.staff = 1 
    }
  }
});
}
return obj 
}


function pls_get_cleaned_str_from_str(str){
if (str) {
str = str.replace(/\/‘’‚“”„"`~«´<>/g, '') 
}
if (str) {
str = str.replace(/,/g, ' ') 
}
if (str) {
str = str.replaceAll("’", "") 
}
if (str) {
str = str.trim() 
}
if (str) {
str = str.replace(/(?:\r\n|\r|\n)/g, '') 
}
if (str) {
str = str.split("\t").join("") 
}
if (str) {
str = str.split("\n").join("") 
}
if (str) {
str = str.split("\"").join("");
}
if (str) {
str = str.split("\'").join("");
} 
if (str) {
str = str.toLowerCase() 
}
return str 
}
