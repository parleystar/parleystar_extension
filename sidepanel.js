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
console.log('sidepanel loaded') 

function pls_show_error(err){
if (err) {
console.warn('pls_show_error sidepanel $ A functional error occured in ParleyStar extension at: ' + location.href , err)
}
if (chrome && chrome.runtime && chrome.runtime.lastError) {
console.warn('pls_show_error sidepanel $ A runtime error occured in ParleyStar extension at: ' + location.href , chrome.runtime.lastError)
alert(chrome.runtime.lastError.message)
}
}


function pls_send_message(msg) {
if (window.name == 'plsVideosMenuVideoPlayerZZiframe') { return false; }
console.info('pls_send_message sidepanel $ msg chrome', msg, chrome) 
if (chrome && chrome.runtime && chrome.runtime.id && pls && pls.plsv_serviceid) {
console.info('pls_send_message sidepanel $ chrome.runtime.id: ', chrome.runtime.id, pls.plsv_serviceid, location.href, msg)
} else {
console.info('pls_send_message sidepanel $ no message, need to reconnect here')
return false
}
if (pls.plsb_messagesending != false) {
// return false
}
try {
console.log("FINAL MSG sidepanel", msg)  
chrome.runtime.sendMessage({pls_msg: msg}).then((resp) => {
console.info('pls_send_message sidepanel $ resp', resp)
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
pls.plsv_serviceid = 'sidepanel' 
pls.plsv_locationhost = location.href // ffccoklakemijkfmfpjgcdkbpecomclk
pls.plsv_locationhref = location.host // chrome-extension://ffccoklakemijkfmfpjgcdkbpecomclk/sidepanel.html
pls.func = 'pls_init_sidepanel' 
pls.plsb_messagesending = false 
chrome.runtime.sendMessage({pls_msg: pls}) 
}

window.addEventListener("offline", (e) => { 
if (window.name == 'plsVideosMenuVideoPlayerZZiframe') { return false; }
console.log("sidepanel went offline")  
pls.func = 'pls_went_offline' 
pls_send_message(pls) 
});

window.addEventListener("online", (e) => {
if (window.name == 'plsVideosMenuVideoPlayerZZiframe') { return false; }
console.log("sidepanel went online") 
pls.func = 'pls_went_online' 
pls_send_message(pls) 
});

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
if (window.name == 'plsVideosMenuVideoPlayerZZiframe') { return false; }

console.log('requestTosidepanel!', request, sender)
sendResponse({ sender: "sidepanel.js", data: "thumbsup" })
 
if ( request && typeof request === 'object' && request.msg && typeof request.msg === 'object' ) {

if (request.msg.err) {
pls_show_error(request.msg.err)
}

// happens for youtube
if (request.msg.settings) {
let combinedSettings = ''  
combinedSettings = { ...pls, ...request.msg }
pls = combinedSettings 
pls.plsv_serviceid = 'sidepanel' 
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

if (request.msg.plsb_isloaded) {
console.log('9 -------- plsb_isloaded', request.msg) 
if (pls.plsb_invalid_page != true && !request.msg.init) {
pls.plsv_channelid = '' 
pls.plsv_videoid = '' 
pls.plsv_dbNameToSearch = '' 
// request.msg.plsv_channelid 
// request.msg.plsv_videoid 
// request.msg.plsv_dbNameToSearch 
}
}

}
});


function pls_wait_for_youtube_load() {
console.info('doing pls_wait_for_youtube_load $ pls', pls) 
setTimeout(function(){ 
let script = document.body.getElementsByTagName('script') 
if (!script || !script[1] || !script[1].textContent) { return false }
let arr = script[1].textContent.split('] = ') 
console.log(arr) 
if (!arr[1]) { return false }

let arr2 = arr[1].split('};');
let str = arr2[0] 
str = str.slice(0, -1) 
console.log('str', str);
str = str + '}}' 

try {
let obj = JSON.parse(str) 
console.log(obj) 
console.log(obj.contents.liveChatRenderer.participantsList.liveChatParticipantsListRenderer.participants[0].liveChatParticipantRenderer.authorName
.simpleText) 
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
let obj = {} 
obj.func = 'pls_set_db_for_saving';
obj.dbName = pls.plsv_dbNameToSearch; 
obj.plsv_channelid = pls.plsv_channelid;
obj.plsv_serviceid = pls.plsv_serviceid; 
pls_send_message(obj) 
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
console.info('doing pls_open_settings sidepanel $') 
// plsel.plsSettingsMenuZZdialog.showModal();
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


function pls_wait_for_header_to_load() {
if (location.href.includes('com/live_chat?continuation') || window.name == 'plsVideosMenuVideoPlayerZZiframe' ) { return false; }
let elemArr = document.body.getElementsByClassName('plsTopZZdiv');
if (elemArr[0]) { return false; }
console.info('doing pls_wait_for_header_to_load sidepanel $ plsv_serviceid', pls.plsv_serviceid) 
let elem = '#plsSidePanelPPdiv' 
pls_wait_for_element_to_exist(elem).then(element => {
  console.info('pls_wait_for_element_to_exist nav bar dom loaded sidepanel $ element', element)
  pls_make_toast() 
  elem = pls['settingsmenu']
  element.insertAdjacentHTML('afterbegin', elem)
  let B = document.body 
  pls.plsb_mobile = false 
  B.classList.add('pls-' + pls.plsv_serviceid) 
  B.classList.add('pls-loaded') 
  B.classList.add('pls-desktop') 
  setTimeout(function(){ 
  pls_do_settings_on_load() 
  plsel.plsSettingsMenuZZdialog.showModal() 
  plsel.plsChatsMenuLiveTitleZZh5.classList.remove('pls-hide') 
  plsel.plsChatsMenuLoadWrapperZZdiv.classList.remove('pls-hide') 
  pls_wait_for_chatmenu_to_load() 
  }, 2000);
})
}

 

function pls_wait_for_chatmenu_to_load() {
if (location.href.includes('com/live_chat?continuation') || window.name == 'plsVideosMenuVideoPlayerZZiframe' ) { return false }
let elemArr = document.body.getElementsByClassName('plsSideMenuYYdiv') 
if (elemArr[0]) { return false }
console.info('doing pls_wait_for_chatmenu_to_load sidepanel $ plsv_serviceid', pls.plsv_serviceid, pls.chatmenu) 
let elem = '#plsSidePanelPPdiv' 
pls_wait_for_element_to_exist(elem).then(element => {
  console.info('pls_wait_for_element_to_exist chatmenu loaded sidepanel $ element', element)
  if (pls.chatmenu) { 
    if (document.body.getElementsByClassName('plsSideMenuYYdiv')[0]) { return false } 
    elem = pls.chatmenu
    element.insertAdjacentHTML('afterbegin', elem) 
    pls_add_chat_menu_handlers(element) 
  }
})
}


function pls_chat_listen() { }


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
