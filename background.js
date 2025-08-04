/* SPDX-FileCopyrightText: © 2025 promising future digital media llc. All rights reserved. <admin@parleystar.com> */
/* SPDX-License-Identifier: Mozilla Public License 1.1 (MPL-1.1) */
/* 
*/

async function pls_get_tab(){
console.info('pls_get_tab $ ')
let options = { active: true, currentWindow: true }
let [tab] = await chrome.tabs.query(options)
return tab
}


function pls_dbe(str, obj, obj2){
console.log('Error for ParleyStar extension: getting saved chat database failed or blocked. Full error report: ' + str, obj, obj2) 
}


async function pls_send_err_message(err) {
console.warn('pls_send_err_message $ err', err)
let obj = {}
obj.err = true
obj.msg = err
let tab = await pls_get_tab() 
pls_send_message(tab.id, obj)
}


async function pls_send_message(tabId, msg) {
console.info('pls_send_message $ ', tabId, msg)
try {
await chrome.scripting.executeScript({
target: {tabId: tabId},
func: () => { document.body.style.border = '0px solid black' }
})
.then(function(resp) {
  console.log('pls_send_message $ resp', resp, msg)
  chrome.tabs.sendMessage(tabId, { msg: msg })
  .then((resp2) => {
  console.log('pls_send_message $ resp2', resp2)
  }).catch((err) => {
  console.warn('pls_send_message $ err', err)
  });
})
.catch((err2) => {
console.warn('pls_send_message $ err2', err2)
return true
})
} catch(err3) {
console.warn('pls_send_message $ err3', err3)
return true
}
return true
}


function pls_get_services(){
let str = '' 
let arr = chrome.runtime.getManifest().content_scripts[0].matches 
let arrl = arr.length 
let arr2 = [] 
for (var i = 0; i < arrl; i++) {
if (arr[i]) {

if (arr[i] == 'https://archyved.com/*') {
arr2.push('sidepanel'); continue;
}
if (arr[i] == 'https://chzzk.naver.com/*') {
arr2.push('chzzk'); continue;
}
if (arr[i] == 'https://play.sooplive.co.kr/*') {
arr2.push('sooplive'); continue;
}
str = arr[i] 
str = str.replace('https://www.', '')
str = str.replace('https://*.', '')
str = str.replace('https://', '')
str = str.replace('*.', '')
str = str.replace('.com/*', '')
str = str.replace('.tv/*', '')
str = str.replace('.live/*', '')
str = str.replace('.gg/*', '')
arr2.push(str)
}

}

return arr2;
}


function pls_get_formatted_channelid(str){
console.info('pls_get_formatted_channelid $ str', str)
if (str){
str = str.trim().toLowerCase()
str = str.replace(/ /g, '_')
str = str.replace(/\W/g, '')
}
return str
}


async function pls_get_local_storage_item(key){
console.info('pls_get_local_storage_item $ key', key)
return new Promise((resolve, reject) => {
chrome.storage.local.get([key], function (result){
if (result[key] === undefined){
reject()
} else {
resolve(result[key])
}
})
})
}

async function pls_get_session_storage_item(key){
console.info('pls_get_session_storage_item $ key', key)
return new Promise((resolve, reject) => {
chrome.storage.session.get([key], function (result){
if (result[key] === undefined){
reject()
} else {
resolve(result[key])
}
})
})
}

async function pls_get_sync_storage_item(key){
console.info('pls_get_sync_storage_item $ key', key)
return new Promise((resolve, reject) => {
chrome.storage.sync.get([key], function (result){
if (result[key] === undefined){
reject()
} else {
resolve(result[key])
}
})
})
}

function pls_get_arr_from_dbName_string(str){
console.info('pls_get_arr_from_dbName_string $ str', str)
let arr = []
if (str && typeof str === 'string'){
arr = str.split('&')
}
return arr
}


function pls_get_blank_chat_obj(id, timestamp, channelid, message, serviceid) {
console.info('doing pls_get_blank_chat_obj $ ', id, timestamp, channelid, message, serviceid) 
let obj = {} 
obj.itemid = id
obj.timestamp = timestamp 
obj.username = channelid 
obj.message = message 
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
obj.serviceid = serviceid 
return obj
}


function pls_load_platform_scripts(tabId, S) {
console.info('pls_load_platform_scripts $ tabId S', tabId, S) 
try {
chrome.scripting.executeScript({
target: {tabId: tabId},
files: ['shared.js']
})
.then((resp) => {
console.log('pls_load_platform_scripts insertjs $ resp', resp)
}).catch((err) => {
console.warn('pls_load_platform_scripts insertjs $ err', err)
});
} catch(err) {
pls_send_err_message(err)
}
try {
chrome.scripting.insertCSS({
target: {tabId: tabId},
files: ['css/' + S + '.css']
})
.then((resp) => {
console.log('pls_load_platform_scripts insertcss $ resp', resp)
}).catch((err) => {
console.warn('pls_load_platform_scripts insertcss $ err', err)
});
} catch(err) {
pls_send_err_message(err)
}

if (S == 'kick') {
try {
chrome.scripting.executeScript({
target: {tabId: tabId},
files: ['video.js'] 
})
.then((resp) => { 
console.log('pls_load_platform_scripts video.js insertjs $ resp', resp)
}).catch((err) => { 
console.warn('pls_load_platform_scripts video.js insertjs $ err', err)
});
} catch(err) { 
pls_send_err_message(err) 
}
}

}


async function pls_set_page_values_from_url(tabId, U, serviceid){
console.info('pls_set_page_values_from_url $ tabId URL serviceid', tabId, U, serviceid) 
let pls = {} 
let arr = [] 
let str = '' 
pls.plsv_channelid = null 
pls.plsv_videoid = null 
pls.plsv_dbNameToSearch = null 
pls.plsb_vod = false 
pls.plsb_channelPage = false 
pls.plsb_popout = false 
pls.plsb_invalid_page = false 
pls.settings = true 
pls.plsv_lastPage = U 
pls.plsv_serviceid = serviceid 
if (!U) {
pls_send_message(tabId, pls)
return false
} 
switch (serviceid) {
case "archyved":
pls_archyved(tabId, U, serviceid, pls);
break;
case "arena":
pls_arena(tabId, U, serviceid, pls);
break;
case "bigo":
pls_bigo(tabId, U, serviceid, pls);
break;
case "chzzk":
pls_chzzk(tabId, U, serviceid, pls);
break;
case "clapper":
pls_clapper(tabId, U, serviceid, pls);
break;
case "instagram":
pls_instagram(tabId, U, serviceid, pls);
break;
case "kick":
pls_kick(tabId, U, serviceid, pls);
break;
case "loco":
pls_loco(tabId, U, serviceid, pls);
break;
case "locals":
pls_locals(tabId, U, serviceid, pls);
break;
case "nimo":
pls_nimo(tabId, U, serviceid, pls);
break;
case "noice":
pls_noice(tabId, U, serviceid, pls);
break;
case "odysee":
pls_odysee(tabId, U, serviceid, pls);
break;
case "parleystar":
pls_parleystar(tabId, U, serviceid, pls);
break;
case "parti":
pls_parti(tabId, U, serviceid, pls);
break;
case "rooter":
pls_rooter(tabId, U, serviceid, pls);
break;
case "rumble":
pls_rumble(tabId, U, serviceid, pls);
break;
case "shareplay":
pls_shareplay(tabId, U, serviceid, pls);
case "sidepanel":
pls_sidepanel(tabId, U, serviceid, pls);
break;
case "sooplive":
pls_sooplive(tabId, U, serviceid, pls);
break;
case "tiktok":
pls_tiktok(tabId, U, serviceid, pls);
break;
case "trovo":
pls_trovo(tabId, U, serviceid, pls);
break;
case "twitch":
pls_twitch(tabId, U, serviceid, pls);
break;
case "x":
pls_x(tabId, U, serviceid, pls);
break;
case "youtube":
pls_youtube(tabId, U, serviceid, pls);
break;
} 
return false
}


function pls_archyved(tabId, U, serviceid, pls){
if (
U == 'https://archyved.com/' || 
U.includes('terms-of-service') || 
U.includes('privacy-policy') 
) {
pls.plsb_invalid_page = true 
pls_send_message(tabId, pls)
return false
}

pls_send_message(tabId, pls)
return false
}


function pls_arena(tabId, U, serviceid, pls){
if (
U == 'https://arena.tv/' || 
U.includes('terms-of-service') || 
U.includes('privacy-policy') 
) {
pls.plsb_invalid_page = true 
pls_send_message(tabId, pls)
return false
}

pls_send_message(tabId, pls)
return false
}


function pls_bigo(tabId, U, serviceid, pls){
if (
U == 'https://www.bigo.tv/' || 
U.includes('.html') || 
U.includes('/agreement') || 
U.includes('/privacyPolicy') || 
U.includes('/child-safety') || 
U.includes('/anti-bullying-policy') || 
U.includes('/cookiePolicy') || 
U.includes('/legalInquiry') || 
U.includes('/copyright-policy') || 
U.includes('/code-of-conduct') || 
U.includes('/about-us') || 
U.includes('/contact-us') || 
U.includes('/join-us') || 
U.includes('/Introduce/info') || 
U.includes('blog.bigo.tv/') || 
U.includes('/bigo-streamer') || 
U.includes('/show/') || 
U.includes('/games/') || 
U.includes('/about-us') 
) {
pls.plsb_invalid_page = true 
pls_send_message(tabId, pls) 
return false
}

if ( U.includes('/user/') ) {
pls.plsb_channelPage = true 
pls_send_message(tabId, pls) 
return false
}


let str = U.split('.tv/')[1] 
if (str) {
pls.plsv_videoid = U.split('.tv/')[1] 
pls.plsv_channelid = 'TODO' 
pls.plsv_dbNameToSearch = 'TODO' 
pls_send_message(tabId, pls)
return false
}


pls_send_message(tabId, pls)
return false
}



function pls_chzzk(tabId, U, serviceid, pls){
if (
U == 'https://chzzk.naver.com/' || 
U == 'https://game.naver.com/' || 
U.includes('.com/lives') || 
U.includes('.com/clips') || 
U.includes('.com/category') || 
U.includes('.com/following') || 
U.includes('https://game.naver.com/esports') || 
U.includes('https://game.naver.com/original_series') || 
U.includes('https://game.naver.com/pcgame') || 
U.includes('https://game.naver.com/lounge/chzzk/home') || 
U.includes('https://policy.naver.com/rules/service.html') || 
U.includes('https://game.naver.com/policy') || 
U.includes('https://policy.naver.com/rules/privacy.html') || 
U.includes('https://game.naver.com/lounge/chzzk/home') || 
U.includes('https://help.naver.com/alias/contents1/game/game_10.naver') || 
U.includes('https://developers.chzzk.naver.com/') || 
U.includes('https://game.naver.com/ticket') || 
U.includes('https://chzzk.naver.com/category/ETC/talk/lives') || 
U.includes('https://chzzk.naver.com/tags/') 
) {
pls.plsb_invalid_page = true 
pls_send_message(tabId, pls)
return false
}

if (U.includes('/live/') ) {
let str = U.split('/live/')[1] 
if (str) {
pls.plsv_videoid = str
pls.plsv_channelid = 'TODO' 
pls.plsv_dbNameToSearch = 'TODO' 
pls_send_message(tabId, pls)
return false
}  
}

if ( U.includes('naver.com/') ) {
pls.plsb_channelPage = true 
let str = U.split('naver.com/')[1] 
if (str) {
pls.plsv_channelid = str
pls_send_message(tabId, pls) 
return false
}
}

pls_send_message(tabId, pls)
return false
}


function pls_clapper(tabId, U, serviceid, pls){
if (
U == 'https://www.clapperapp.com/' || 
U == 'https://blog.clapperapp.com/' || 
U.includes('terms-of-service') || 
U.includes('privacy-policy') || 
U.includes('cookie-policy') || 
U.includes('privacy') || 
U.includes('about') || 
U.includes('terms') || 
U.includes('community') || 
U.includes('copyright') || 
U.includes('contact') 
) {
pls.plsb_invalid_page = true 
pls_send_message(tabId, pls)
return false
}

pls_send_message(tabId, pls)
return false
}



function pls_instagram(tabId, U, serviceid, pls){
if (
U == 'https://instagram.com/' || 
U.includes('community-guidelines') ) {
pls.plsb_invalid_page = true 
pls_send_message(tabId, pls)
return false
}

pls_send_message(tabId, pls)
return false
}


function pls_kick(tabId, U, serviceid, pls){
console.info('doing pls_kick');
if (
U == 'https://kick.com/' || 
U.includes('community-guidelines') || 
U.includes('dmca-policy') || 
U.includes('privacy-policy') || 
U.includes('terms-of-service') || 
U.includes('/dashboard/') || 
U.includes('https://dashboard.kick.com') || 
U.includes('https://kick.com/dashboard/') || 
U.includes('/subscriptions') || 
U.includes('https://kick.com/transactions/') || 
U.includes('https://shop.kick.com/') || 
U.includes('https://help.kick.com/') || 
U.includes('https://kick.com/browse') || 
U.includes('https://kick.com/following') || 
U.includes('https://kick.com/search') || 
U.includes('https://kick.com/category/') 
) {
pls.plsb_invalid_page = true 
pls_send_message(tabId, pls)
return false
}
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch((error) => console.error(error));

if (U.includes('/videos/')) {
console.info('doing pls_kick in a VOD page');
pls.plsb_vod = true
pls.plsv_videoid = U.split('/videos/')[1]
if (pls.plsv_serviceid == 'kick') {
pls.plsv_channelid = U.split('/videos/')[0].split('com/')[1] 
pls.plsv_channelid = pls_get_formatted_channelid(pls.plsv_channelid)
pls.plsv_dbNameToSearch = 'savedchat' + '&' + pls.plsv_serviceid + '&' + pls.plsv_channelid + '&' + pls.plsv_videoid
}
pls_send_message(tabId, pls)
console.log('pls is live at videos page', pls)
return false
}

if (U.includes('/popout/')) {
console.info('doing pls_kick in a popout live chat');
chrome.sidePanel.setOptions({ tabId, enabled: false }).catch((error) => console.error(error));
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false }).catch((error) => console.error(error));
pls.plsb_popout = true 
pls.plsb_channelPage = false 
pls.plsv_channelid = U.split('popout/')[1].split('/chat')[0] 
pls.plsv_channelid = pls_get_formatted_channelid(pls.plsv_channelid) 
pls.plsv_videoid = new Date().toISOString().slice(0, 10) + '-' + pls.plsv_channelid 
pls.plsv_dbNameToSearch = 'savedchat' + '&' + pls.plsv_serviceid + '&' + pls.plsv_channelid + '&' + pls.plsv_videoid 
pls.plsb_islive = true 
console.log('pls is live at popout page', pls) 
pls_send_message(tabId, pls)
return false
}

if (U.includes('.com/')) {
console.info('doing pls_kick in a standard livestream');
pls.plsv_channelid = U.split('com/')[1] 
pls.plsv_channelid = pls_get_formatted_channelid(pls.plsv_channelid)
if (pls.plsv_channelid) {
pls.plsb_channelPage = true 
}
pls_send_message(tabId, pls) 
return false
}


return false
}


function pls_locals(tabId, U, serviceid, pls){
if (
U == 'https://locals.com/' || 
U == 'https://locals.com/_/feed' || 
U.includes('terms-of-service') || 
U.includes('privacy-policy') || 
U.includes('/site/') || 
U.includes('/account/') || 
U.includes('blog.locals.com/') || 
U.includes('support.locals.com/') 
) {
pls.plsb_invalid_page = true 
pls_send_message(tabId, pls)
return false
}

pls_send_message(tabId, pls)
return false
}


function pls_loco(tabId, U, serviceid, pls){
if (
U == 'https://loco.com/' || 
U.includes('loco.com/live-streams') || 
U.includes('loco.com/videos') || 
U.includes('loco.com/legal/') || 
U == 'https://loco.com/streamers' || 
U.includes('loco.com/support/') || 
U.includes('loco.com/help/') 
) {
pls.plsb_invalid_page = true 
pls_send_message(tabId, pls) 
return false
}

if (U.includes('/streamers/') ) {
pls.plsb_channelPage = true 
let str = U.split('/streamers/')[1] 
if (str) {
if ( !str.includes('/') ) {
pls.plsv_channelid = pls_get_formatted_channelid(str)
pls.plsv_videoid = new Date().toISOString().slice(0, 10) + '-' + pls.plsv_channelid
pls.plsv_dbNameToSearch = 'savedchat' + '&' + pls.plsv_serviceid + '&' + pls.plsv_channelid + '&' + pls.plsv_videoid
console.log('pls is live at channel page', pls)
pls_send_message(tabId, pls)
return false
}
pls_send_message(tabId, pls)
return false
}  
}

}


function pls_nimo(tabId, U, serviceid, pls){
if (
U == 'https://www.nimo.tv/' || 
U.includes('https://www.nimo.tv/download/nimotv') || 
U.includes('https://www.nimo.tv/download/streamer-app') || 
U.includes('https://www.nimo.tv/p/contact') || 
U.includes('https://www.nimo.tv/download/streamer-pc') || 
U.includes('https://www.nimo.tv/ranks') || 
U.includes('https://www.nimo.tv/games') || 
U.includes('https://www.nimo.tv/game/') ||
U.includes('https://www.nimo.tv/p/about') ||
U.includes('https://www.nimo.tv/p/contact') ||
U.includes('https://www.nimo.tv/p/agreement5') ||
U.includes('https://www.nimo.tv/p/agreement6') ||
U.includes('https://www.nimo.tv/p/copyright-policy') ||
U.includes('https://www.nimo.tv/p/agreement1') ||
U.includes('https://www.nimo.tv/p/volunteer') ||
U.includes('https://www.nimo.tv/p/openplatform') ||
U.includes('https://www.nimo.tv/lives') 
) {
pls.plsb_invalid_page = true 
pls_send_message(tabId, pls) 
return false
}

if (U.includes('/user/') ) {
pls.plsb_channelPage = true 
let str = U.split('/user/')[1] 
if (str) {
pls.plsv_channelid = pls_get_formatted_channelid(str)
pls_send_message(tabId, pls)
return false
}
}

if (U.includes('/live/') ) {
pls.plsb_channelPage = true 
let str = U.split('/live/')[1] 
if (str) {
if ( !str.includes('/') ) {
pls.plsv_videoid = str
pls.plsv_channelid = 'TODO' 
pls.plsv_dbNameToSearch = 'TODO' 
pls_send_message(tabId, pls)
return false
}
pls_send_message(tabId, pls)
return false
}  
}

pls_send_message(tabId, pls)
return false
}


function pls_noice(tabId, U, serviceid, pls){
if (
U == 'https://noice.com/' || 
U == 'https://noice.com/collection' || 
U == 'https://noice.com/store' || 
U == 'https://noice.com/seasons' || 
U == 'https://noice.com/dailygoals' || 
U == 'https://noice.com/avatar' || 
U == 'https://noice.com/settings' || 
U == 'https://noice.com/user' || 
U.includes('/browse/') || 
U.includes('support.noice.com/') || 
U.includes('legal.noice.com/') || 
U.includes('about.noice.com/') || 
U.includes('/u/') ||
U.includes('community-guidelines') ) {
pls.plsb_invalid_page = true 
pls_send_message(tabId, pls)
return false
}

if (U.includes('/videos/')) {
pls.plsb_vod = true
pls.plsv_videoid = U.split('/videos/')[1]
if (pls.plsv_serviceid == 'kick') {
pls.plsv_channelid = U.split('/videos/')[0].split('com/')[1] 
pls.plsv_channelid = pls_get_formatted_channelid(pls.plsv_channelid)
pls.plsv_dbNameToSearch = 'savedchat' + '&' + pls.plsv_serviceid + '&' + pls.plsv_channelid + '&' + pls.plsv_videoid
}
pls_send_message(tabId, pls)
console.log('pls is live at videos page', pls)
return false
}

if (U.includes('.com/')) {
pls.plsb_channelPage = false 
pls.plsv_channelid = U.split('.com/')[1] 
pls.plsv_channelid = pls_get_formatted_channelid(pls.plsv_channelid)
pls.plsv_videoid = new Date().toISOString().slice(0, 10) + '-' + pls.plsv_channelid
pls.plsv_dbNameToSearch = 'savedchat' + '&' + pls.plsv_serviceid + '&' + pls.plsv_channelid + '&' + pls.plsv_videoid
pls.plsb_islive = true 
console.log('pls is live at noice page', pls)
pls_send_message(tabId, pls)
return false
}

pls_send_message(tabId, pls)
return false
}


function pls_odysee(tabId, U, serviceid, pls){
if (
U == 'https://odysee.com/' || 
U.includes('/@taran:1/subscriptions:6') || 
U.includes('/subscriptions/') || 
U.includes('/$/') || 
U.includes('help.odysee') || 
U.includes('chat.odysee') || 
U.includes('community-guidelines') ) {
pls.plsb_invalid_page = true 
pls_send_message(tabId, pls)
return false
}

pls_send_message(tabId, pls)
return false
}


function pls_parleystar(tabId, U, serviceid, pls){
if (
U == 'https://parleystar.com/' || 
U.includes('community-guidelines') ) {
pls.plsb_invalid_page = true 
pls_send_message(tabId, pls)
return false
}

pls_send_message(tabId, pls)
return false
}


function pls_parti(tabId, U, serviceid, pls){
if (
U == 'https://parti.com/' || 
U.includes('community-guidelines') ) {
pls.plsb_invalid_page = true 
pls_send_message(tabId, pls)
return false
}

pls_send_message(tabId, pls)
return false
}


function pls_rooter(tabId, U, serviceid, pls){
if (
U == 'https://www.rooter.gg/' || 
U.includes('community-guidelines') ) {
pls.plsb_invalid_page = true 
pls_send_message(tabId, pls)
return false
}

pls_send_message(tabId, pls)
return false
}


function pls_rumble(tabId, U, serviceid, pls){
if (
U == 'https://rumble.com/' || 
U.includes('.com/upload.php') || 
U.includes('.com/live?') || 
U.includes('.com/account') || 
U.includes('.com/our-apps') || 
U.includes('.com/s/') || 
U.includes('https://corp.rumble.com/') || 
U.includes('https://help.rumble.com/') || 
U.includes('https://ads.rumble.com/') || 
U.includes('https://ads.rumble.com/') || 
U.includes('.com/editor-picks') || 
U.includes('.com/subscriptions') || 
U.includes('.com/category') || 
U.includes('.com/browse') || 
U.includes('.com/for-you') || 
U.includes('.com/videos') || 
U.includes('.com/my-library') || 
U.includes('.com/playlists') || 
U.includes('.com/user/') || 
U.includes('.com/UFC') || 
U.includes('.com/search') || 
U.includes('community-guidelines') ) {
pls.plsb_invalid_page = true 
pls_send_message(tabId, pls)
return false
}

pls_send_message(tabId, pls)
return false
}


function pls_shareplay(tabId, U, serviceid, pls){
if (
U == 'https://www.shareplay.tv/' || 
U.includes('community-guidelines') ) {
pls.plsb_invalid_page = true 
pls_send_message(tabId, pls)
return false
}

pls_send_message(tabId, pls)
return false
}


function pls_sidepanel(tabId, U, serviceid, pls){
console.info('doing pls_sidepanel with tabId, U, serviceid, pls', tabId, U, serviceid, pls) 
// pls.plsb_popout = true 
// pls.plsb_channelPage = false 
// pls.plsv_channelid = U.split('popout/')[1].split('/chat')[0] 
// pls.plsv_channelid = pls_get_formatted_channelid(pls.plsv_channelid) 
// pls.plsv_videoid = new Date().toISOString().slice(0, 10) + '-' + pls.plsv_channelid 
// pls.plsv_dbNameToSearch = 'savedchat' + '&' + pls.plsv_serviceid + '&' + pls.plsv_channelid + '&' + pls.plsv_videoid 
pls.plsb_isloaded = true 
console.log('pls_sidepanel is live at popout page', pls) 
chrome.runtime.sendMessage({ msg: pls }) 
return false
}


function pls_sooplive(tabId, U, serviceid, pls){
if (
U == 'https://play.sooplive.co.kr/' || 
U.includes('community-guidelines') ) {
pls.plsb_invalid_page = true 
pls_send_message(tabId, pls)
return false
}

pls_send_message(tabId, pls)
return false
}


function pls_tiktok(tabId, U, serviceid, pls){
if (
U == 'https://www.tiktok.com/' || 
U.includes('.com/en') || 
U.includes('.com/explore') || 
U.includes('.com/following') || 
U.includes('.com/friends') || 
U.includes('.com/live') || 
U.includes('.com/messages') || 
U.includes('https://effecthouse.tiktok.com') || 
U.includes('.com/about') || 
U.includes('https://newsroom.tiktok.com') || 
U.includes('.com/contact') || 
U.includes('https://careers.tiktok.com') || 
U.includes('.com/forgood') || 
U.includes('.com/business') || 
U.includes('https://developers.tiktok.com') || 
U.includes('.com/transparency') || 
U.includes('.com/tiktok-rewards') || 
U.includes('.com/embed') || 
U.includes('https://support.tiktok.com') || 
U.includes('.com/safety?') || 
U.includes('.com/legal') || 
U.includes('.com/creators') || 
U.includes('.com/signup') || 
U.includes('.com/404') || 
U.includes('.com/login') || 
U.includes('.com/community-guidelines') || 
U.includes('.com/feedback') || 
U.includes('community-guidelines') ) {
pls.plsb_invalid_page = true 
pls_send_message(tabId, pls)
return false
}

// https://www.tiktok.com/@happyhappygaltv/live?enter_from_merge=others_homepage&enter_method=others_photo
if ( U.includes('/live') && U.includes('@') ) {
pls.plsb_channelPage = false 
pls.plsv_channelid = U.split('@')[1].split('/')[0]
pls.plsv_channelid = pls_get_formatted_channelid(pls.plsv_channelid) 
pls.plsv_videoid = new Date().toISOString().slice(0, 10) + '-' + pls.plsv_channelid 
pls.plsv_dbNameToSearch = 'savedchat' + '&' + pls.plsv_serviceid + '&' + pls.plsv_channelid + '&' + pls.plsv_videoid 
pls.plsb_islive = true 
console.log('pls is live at page', pls) 
pls_send_message(tabId, pls)
return false
}

pls_send_message(tabId, pls)
return false
}


function pls_trovo(tabId, U, serviceid, pls){
if (
U == 'https://trovo.live/' || 
U.includes('community-guidelines') ) {
pls.plsb_invalid_page = true 
pls_send_message(tabId, pls)
return false
}

pls_send_message(tabId, pls)
return false
}


function pls_twitch(tabId, U, serviceid, pls){
if (
U == 'https://www.twitch.tv/' || 
U == 'https://m.twitch.tv/' || 
U.includes('https://help.twitch.tv/') || 
U.includes('https://safety.twitch.tv/') || 
U.includes('https://blog.twitch.tv/') || 
U.includes('https://appeals.twitch.tv/') || 
U.includes('https://dashboard.twitch.tv/') || 
U.includes('https://dev.twitch.tv/') || 
U.includes('.tv/settings') || 
U.includes('.tv/privacy') || 
U.includes('.tv/inventory') || 
U.includes('.tv/wallet') || 
U.includes('.tv/subscriptions') || 
U.includes('.tv/p/') || 
U.includes('.tv/downloads') || 
U.includes('.tv/store') || 
U.includes('.tv/jobs') || 
U.includes('.tv/turbo') || 
U.includes('.tv/legal') || 
U.includes('.tv/dmca-policy') || 
U.includes('.tv/privacy-policy') || 
U.includes('.tv/terms-of-service') || 
U.includes('.tv/team/') || 
U.includes('.tv/dashboard') || 
U.includes('.tv/categories') || 
U.includes('.tv/directory') || 
U.includes('.tv/search') || 
U.includes('.tv/subscriptions') || 
U.includes('community-guidelines') 
) {
pls.plsb_invalid_page = true 
pls_send_message(tabId, pls)
return false
}

if (U.includes('/videos/')) {
pls.plsb_vod = true
pls.plsv_videoid = U.split('/videos/')[1] 
pls_send_message(tabId, pls)
console.log('pls is live at videos page', pls)
return false
}

// https://www.twitch.tv/popout/streamer/chat?popout=
if (U.includes('/popout/')) {
pls.plsb_popout = true
pls.plsb_channelPage = false
pls.plsv_channelid = U.split('popout/')[1].split('/')[0] 
pls.plsv_channelid = pls_get_formatted_channelid(pls.plsv_channelid)
pls.plsv_videoid = new Date().toISOString().slice(0, 10) + '-' + pls.plsv_channelid
pls.plsv_dbNameToSearch = 'savedchat' + '&' + pls.plsv_serviceid + '&' + pls.plsv_channelid + '&' + pls.plsv_videoid
pls.plsb_islive = true 
pls.plsv_serviceid = serviceid 
pls_send_message(tabId, pls) 
return false
}

pls_send_message(tabId, pls)
return false
}


function pls_x(tabId, U, serviceid, pls){
if (
U == 'https://x.com/' || 
U.includes('community-guidelines') ) {
pls.plsb_invalid_page = true 
pls_send_message(tabId, pls)
return false
}

pls_send_message(tabId, pls)
return false
}


function pls_youtube(tabId, U, serviceid, pls){
console.log('doing pls_youtube $ tabId, U, serviceid, pls', tabId, U, serviceid, pls) 
if (
U == 'https://www.youtube.com/' || 
U == 'https://m.youtube.com/' || 
U.includes('youtube.com/improvedtube') || 
U.includes('youtube.com/tv') || 
U.includes('youtube.com/audiolibrary') || 
U.includes('youtube.com/embed/') || 
U.includes('youtube.com/premium') || 
U.includes('youtube.com/account') || 
U.includes('youtube.com/reporthistory') || 
U.includes('youtube.com/about/') || 
U.includes('youtube.com/new/') || 
U.includes('youtube.com/t/') || 
U.includes('youtube.com/creators/') || 
U.includes('youtube.com/ads/') || 
U.includes('youtube.com/howyoutubeworks') || 
U.includes('https://developers.google.com/youtube') || 
U.includes('http://studio.youtube.com') || 
U.includes('https://tv.youtube.com/') || 
U.includes('https://music.youtube.com/') || 
U.includes('youtubekids.com/') || 
U.includes('youtube.com/?bp=') || 
U.includes('community-guidelines') ) {
pls.plsb_invalid_page = true 
pls_send_message(tabId, pls)
return false
}


if (U.includes('is_popout')) {
pls.plsb_popout = true 
pls.plsb_channelPage = false 
pls.plsv_dbNameToSearch = '' 
pls.plsv_channelid = '' 
pls.plsv_videoid = U.split('is_popout=1')[1].split('&v=')[1] 
pls.plsb_islive = true 
console.log('pls is live at popout page', pls) 
pls_send_message(tabId, pls)
return false
}

/*
{
    "plsv_channelid": null,
    "plsv_videoid": null,
    "plsv_dbNameToSearch": null,
    "plsb_vod": false,
    "plsb_channelPage": false,
    "plsb_popout": false,
    "plsb_invalid_page": false,
    "settings": true,
    "plsv_lastPage": "https://www.youtube.com/live_chat?is_popout=1&v=uGfwnFHSl-M",
    "plsv_serviceid": "youtube"
}
*/


pls_send_message(tabId, pls)
return false
}



function pls_initialize_store(store) {
console.info('doing pls_initialize_store', store) 
store.createIndex('itemid', 'itemid', {unique: true});
store.createIndex('timestamp', 'timestamp', {unique: false});
store.createIndex('username', 'username', {unique: false});
store.createIndex('message', 'message', {unique: false});
store.createIndex('owner', 'owner', {unique: false});
store.createIndex('moderator', 'moderator', {unique: false});
store.createIndex('vip', 'vip', {unique: false});
store.createIndex('og', 'og', {unique: false});
store.createIndex('founder', 'founder', {unique: false});
store.createIndex('gifter', 'gifter', {unique: false});
store.createIndex('sub', 'sub', {unique: false});
store.createIndex('verified', 'verified', {unique: false});
store.createIndex('staff', 'staff', {unique: false});
store.createIndex('anevent', 'anevent', {unique: false});
store.createIndex('donation', 'donation', {unique: false});
store.createIndex('subevent', 'subevent', {unique: false});
store.createIndex('bot', 'bot', {unique: false});
store.createIndex('serviceid', 'serviceid', {unique: false});
return store 
}



function pls_remove_db_on_close() {
console.info('doing pls_remove_db_on_close')
let arr = [] 
let arrl = arr.length 
let dbName = '' 
let dbRequest = {} 
let db = {}
let transaction = {} 
let store = {} 
let chatObjArr = [] 
let chatObj = {} 

indexedDB.databases().then((arr) => {
if (arr.length < 1) { return false } 
arrl = arr.length 
for (let i = 0; i < arrl; i++) {
console.info('doing pls_remove_db_on_close $ db ', arr[i]) 
dbName = arr[i].name 
if (dbName && dbName.startsWith('savedchat') ) { 
(async () => {
dbRequest = await indexedDB.open(dbName, 10) 
dbRequest.onerror = (e) => {          pls_dbe('8 d e', this, e, dbRequest); return; } 
dbRequest.onblocked = (e) => {        pls_dbe('8 d b', this, e, dbRequest); return; } 
dbRequest.onupgradeneeded = (e) => {  pls_dbe('8 d u', this, e, dbRequest); return; };
dbRequest.onsuccess = function(successObj) {

console.info('doing pls_remove_db_on_close onsuccess $ successObj ', successObj) 
if (!dbRequest.result) {              pls_dbe('8 ds r', this, successObj, dbRequest); return; }
if (!successObj) {                    pls_dbe('8 ds s', this, successObj, dbRequest); return; }
db = dbRequest.result;
db.onerror = (e) => {                 pls_dbe('8 ds dbe', this, e, dbRequest); return; } 
transaction = db.transaction('chat', 'readonly') 
transaction.onerror = (e) => {        pls_dbe('8 ds te', this, e, dbRequest); return; } 
transaction.onabort = (e) => {        pls_dbe('8 ds ta', this, e, dbRequest); return; } 
transaction.oncomplete = (e) => {     console.info('doing pls_remove_db_on_close transaction.oncomplete $ e ', e) }
store = transaction.objectStore('chat') 
store.getAll().onerror = (e) => {     pls_dbe('8 ds se', this, e, dbRequest); return; }
store.getAll().onblocked = (e) => {   pls_dbe('8 ds sb', this, e, dbRequest); return; }
store.getAll().onsuccess = function(successAllObj) {

if (!successAllObj) {                 pls_dbe('8 ds sa', this, successAllObj, dbRequest); return; }
if (!successAllObj.target) {          pls_dbe('8 ds sat', this, successAllObj, dbRequest); return; }
if (!successAllObj.target.result) {   pls_dbe('8 ds satr', this, successAllObj, dbRequest); return; }
chatObjArr = successAllObj.target.result 
console.info('doing pls_remove_db_on_close getall onsuccess $ chatObjArr ', chatObjArr) 
if (chatObjArr.length && chatObjArr.length < 2) {
dbRequest.result.close() 
pls_delete_db(dbName) 
}

};  // store.getAll().onsuccess 
}; // request.onsuccess 
})(); // async 
} // startsWith('savedchat') 
} // for each db 
}); // indexedDB.databases().then 
}


function pls_delete_db(dbName) {
console.info('doing pls_delete_db $ dbName ', dbName) 
if (!dbName) { return false } 
let dbRequest = indexedDB.deleteDatabase(dbName) 
dbRequest.onerror = (e) => { 					pls_dbe('9 d e', this, e, dbRequest) }
dbRequest.onblocked = (e) => { 					pls_dbe('9 d b', this, e, dbRequest) } 
dbRequest.onupgradeneeded = (e) => { 			pls_dbe('9 d u', this, e, dbRequest) } 
dbRequest.onsuccess = function(successObj) { 	console.info('doing pls_delete_db onsuccess $ successObj ', successObj) }
}


function pls_save_bulk_chat_from_dbName_arr(dbName, chatObjArr) {
console.info('pls_save_bulk_chat_from_dbName_arr $ dbName chatObjArr', dbName, chatObjArr) 

return new Promise((resolve, reject) => {
if (!dbName || !chatObjArr) { resolve('fail'); }
let dbRequest = {} 
let store = {} 
let db = {} 
let transaction = {} 
let objectStore = {} 

dbRequest = indexedDB.open(dbName, 10) 
dbRequest.onerror = (e) => {                    pls_dbe('4 d e', this, e, dbRequest); resolve('fail') } 
dbRequest.onblocked = (e) => {                  pls_dbe('4 d b', this, e, dbRequest); resolve('fail') } 
dbRequest.onupgradeneeded = function(e) {
console.info('pls_save_bulk_chat_from_dbName_arr onupgradeneeded $ e', e, dbRequest) 
if (!dbRequest.result) {                        pls_dbe('4 d u r', this, e, dbRequest); resolve('fail') }
store = dbRequest.result.createObjectStore('chat', {
keyPath: 'id',
autoIncrement: true,
});
store = pls_initialize_store(store) 
store.transaction.onerror = (e) => {            pls_dbe('4 ds te', this, e, dbRequest); resolve('fail') } 
store.transaction.onabort = (e) => {            pls_dbe('4 ds ta', this, e, dbRequest); resolve('fail') } 
store.transaction.oncomplete = (e) => {         console.info('pls_save_bulk_chat_from_dbName_arr oncomplete $ e', e); resolve('success') }
} 
dbRequest.onsuccess = function(successObj) {

console.info('pls_save_bulk_chat_from_dbName_arr onsuccess $ e', successObj, dbRequest) 
if (!dbRequest.result) {                        pls_dbe('4 ds r', this, successObj, dbRequest); resolve('fail') } 
if (!successObj) {                              pls_dbe('4 ds s', this, successObj, dbRequest); resolve('fail') } 
db = dbRequest.result 
db.onerror = (e) => {                           pls_dbe('4 ds dbe', this, e, successObj); resolve('fail') } 
transaction = db.transaction('chat', 'readwrite', { durability: 'relaxed' } ) 
transaction.onerror = (e) => {                  pls_dbe('4 ds te', this, e, dbRequest); resolve('fail') } 
transaction.onabort = (e) => {                  pls_dbe('4 ds ta', this, e, dbRequest); resolve('fail') } 
transaction.oncomplete = (e) => {               console.info('pls_save_bulk_chat_from_dbName_arr onsuccess $ e successObj, dbRequest', e, successObj, dbRequest) } 
objectStore = transaction.objectStore('chat'); 
[].forEach.call(chatObjArr, function(chatObj) {
objectStore.put(chatObj) 
});
transaction.commit() 
}
})
}


function pls_set_db_save_chat_begin(tabId, dbName, channelid, serviceid) {
console.info('pls_set_db_save_chat_begin $ tabId, dbName, channelid', tabId, dbName, channelid);
if (!tabId || !dbName || !channelid || !serviceid) {                pls_dbe('2 dn', this, dbName); return false } 
let str = new Date().toISOString().slice(0, 10) 
let obj = pls_get_blank_chat_obj('1111', '00:00AM', channelid, str, serviceid) 
let dbRequest = indexedDB.open(dbName, 10) 
dbRequest.onerror = (e) => {                                        pls_dbe('2 d e', this, e, dbRequest) };
dbRequest.onblocked = (e) => {                                      pls_dbe('2 d b', this, e, dbRequest) };
dbRequest.onupgradeneeded = (e) => {                                pls_dbe('2 d u', this, e, dbRequest) };
dbRequest.onsuccess = function(successObj) {
 
console.info('pls_set_db_save_chat_begin onsuccess $ dbRequest, successObj', dbRequest, successObj) 
if (!dbRequest.result) {                                            pls_dbe('2 ds r', this, successObj, dbRequest); return false } 
if (!successObj) {                                                  pls_dbe('2 ds s', this, successObj, dbRequest); return false } 
if (!successObj.target) {                                           pls_dbe('2 ds st', this, successObj, dbRequest); return false } 
if (!successObj.target.result) {                                    pls_dbe('2 ds str', this, successObj, dbRequest); return false } 
let db = successObj.target.result 
db.onerror = (e) => {                                               pls_dbe('2 ds dbe', this, e, dbRequest) } 
let transaction = db.transaction('chat', 'readwrite', { durability: 'relaxed' } ) 
transaction.onerror = (e) => {                                      pls_dbe('2 ds te', this, e, dbRequest) } 
transaction.onabort = (e) => {                                      pls_dbe('2 ds ta', this, e, dbRequest) } 
transaction.oncomplete = (e) => {                                   console.info('pls_set_db_save_chat_begin oncomplete $ e, dbRequest', e, dbRequest) }
let store = transaction.objectStore('chat') 
store.add(obj).onsuccess = function(addObj) {                       console.info('pls_set_db_save_chat_begin store $ addObj, dbRequest', addObj, dbRequest) }
} 
}


async function pls_unregister_content_scripts(){
/*
try {
let scripts = await chrome.scripting.getRegisteredContentScripts()
let scriptIds = scripts.map(script => script.id)
chrome.scripting.unregisterContentScripts(scriptIds)
return true
} catch(err){
pls_send_err_message(err)
}
*/
}



class ParleyStar {

pls_offline_init(request, sender) {
/*
// console.info('pls_offline_init $ request, sender', request, sender)
// pls_msg :  {func: 'pls_offline_init'}
let pls = {}
pls.settings = true
pls.init = true
let combinedSettings = {}
chrome.storage.local.get(null).then((resp1) => {
  // console.log("localstorage is ", resp1);
  combinedSettings = { ...pls, ...resp1 }
    chrome.storage.sync.get(null).then((resp3) => {
      // console.log("syncstorage is ", resp3);
      // plsb_1b1kick: false
      combinedSettings = { ...combinedSettings, ...resp3 }
      // console.log("combinedSettings is ", combinedSettings);
      chrome.storage.session.get(null).then((resp2) => {
        // console.log("sessionstorage is ", resp2);
        // kick: "kick"
        combinedSettings = { ...combinedSettings, ...resp2 }
        chrome.runtime.sendMessage({
          offline: {
            msg: combinedSettings
          }
        });

    })
  })
})
*/
return false
}


pls_init(request, tab) {
console.info('pls_init $ request, tab', request, tab)
if (tab.url.includes('chrome')) {
return false
}
if (!request || !request.pls_msg || !request.pls_msg.plsv_serviceid) {
return false 
}

let s = request.pls_msg.plsv_serviceid
let arr = pls_get_services()
let isTrue  = arr.includes(s) 
if (!isTrue) { return false } 
pls_load_platform_scripts(tab.id, s) 
let pls = {}
pls.settings = true
pls.plsv_serviceid = s
pls.init = true
let combinedSettings = {} 
chrome.storage.local.get(null).then((resp1) => {
  // // console.log("localstorage is ", resp1);
  combinedSettings = { ...pls, ...resp1 }
    chrome.storage.sync.get(null).then((resp2) => {
      // // console.log("syncstorage is ", resp2);
      combinedSettings = { ...combinedSettings, ...resp2 }
      // // console.log("combinedSettings is ", combinedSettings);
      chrome.storage.session.get(null).then((resp3) => {
        // // console.log("sessionstorage is ", resp3);
        combinedSettings = { ...combinedSettings, ...resp3 }
        pls_send_message(tab.id, combinedSettings)
    })
  })
})
return false 
}


pls_init_sidepanel(request, sender) {
console.info('pls_init_sidepanel $ request, sender', request, sender)
if (!request || !request.pls_msg) {
return false
}
let pls = {}
pls.settings = true
pls.init = true
pls.plsv_serviceid = request.pls_msg.plsv_serviceid 
let combinedSettings = {}
chrome.storage.local.get(null).then((resp1) => {
  // // console.log("localstorage is ", resp1);
  combinedSettings = { ...pls, ...resp1 }
    chrome.storage.sync.get(null).then((resp2) => {
      // // console.log("syncstorage is ", resp2);
      combinedSettings = { ...combinedSettings, ...resp2 }
      // // console.log("combinedSettings is ", combinedSettings);
      chrome.storage.session.get(null).then((resp3) => {
        // // console.log("sessionstorage is ", resp3);
        combinedSettings = { ...combinedSettings, ...resp3 }
        chrome.runtime.sendMessage({ msg: combinedSettings }) 
    })
  })
})
return false
}


pls_sync(request, tab) {
console.info('pls_sync $ request', request)
try {
chrome.storage.sync.set({ [request.pls_msg.key]: request.pls_msg.val })
.then((resp) => {
console.log('pls_sync $ resp', resp)
}).catch((err) => {
console.warn('pls_sync $ err', err)
});
} catch (err){
pls_send_err_message(tab.id, err)
}
return false
}


pls_csv_import_chat_log_from_chatarr(request, tab) {
console.info('pls_csv_import_chat_log_from_chatarr $ request, tab', request, tab)
let filename = request.pls_msg.filename 
let chatArr = request.pls_msg.chatArr 

let fileNameArr = filename.split('-chatlog') 
fileNameArr = fileNameArr[0] 
let fileNamePartsArr = fileNameArr.split('&') 
let one = fileNamePartsArr[0];    // savedchat
let two = fileNamePartsArr[1];    // kick
let three = fileNamePartsArr[2];  // streamer
let four = fileNamePartsArr[3];   // abc123
let dbName = one + '&' + two + '&' + three + '&' + four 
let chatObj = {} 
let chatObjArr = [] 
chatArr = chatArr.slice(1) 
let arrl = chatArr.length 

for (var i = 0; i < arrl; i++) {
if (chatArr[i][1]) {
  chatArr[i] = chatArr[i].slice(1) 
  chatObj.itemid = chatArr[i][0] 
  chatObj.timestamp = chatArr[i][1] 
  chatObj.username = chatArr[i][2] 
  chatObj.message = chatArr[i][3] 
  
  chatObj.owner = Number(chatArr[i][4]) 
  chatObj.moderator = Number(chatArr[i][5]) 
  chatObj.vip = Number(chatArr[i][6]) 
  chatObj.og = Number(chatArr[i][7]) 
  chatObj.founder = Number(chatArr[i][8]) 
  chatObj.gifter = Number(chatArr[i][9]) 
  chatObj.sub = Number(chatArr[i][10]) 
  chatObj.verified = Number(chatArr[i][11]) 
  chatObj.staff = Number(chatArr[i][12]) 
  chatObj.anevent = Number(chatArr[i][13]) 
  chatObj.donation = Number(chatArr[i][14]) 
  chatObj.subevent = Number(chatArr[i][15]) 
  chatObj.bot = Number(chatArr[i][16]) 
  chatObj.serviceid = Number(chatArr[i][17]) 

  chatObjArr.push(chatObj) 
  chatObj = {}
}
}
pls_save_bulk_chat_from_dbName_arr(dbName, chatObjArr) 
return false
}


// here
pls_delete_settings(request, tab) {
console.info('pls_delete_settings $ request', request, tab) 
try {
chrome.storage.sync.clear()
.then((resp) => { 
console.log('pls_delete_settings $ resp', resp)
let obj = {} 
obj.home = 'pls_delete_settings' 
pls_send_message(tab.id, obj) 
}).catch((err) => { 
console.warn('pls_delete_settings $ err', err)
});
} catch (err){ 
pls_send_err_message(tab.id, err)
}
return false
}


pls_get_arr_of_all_dbNames(request, tab) {
// console.info('pls_get_arr_of_all_dbNames $ pls', request)
indexedDB.databases().then((dbArr) => {
// console.log('databases', dbArr)
if (dbArr.length < 1) { 
pls_send_message(tab.id, dbArr) 
return false
}

let arr = []
let arrl = dbArr.length 
let dbName = '' 
let obj = {} 
for (let i = 0; i < arrl; i++){
if (dbArr[i].name.startsWith('savedchat') ){
let dbNameArr = pls_get_arr_from_dbName_string(dbArr[i].name) 
// console.log('dbNameArr', dbNameArr) 
if (dbNameArr.length){
let obj = {}
obj.dbName = dbArr[i].name
obj.serviceid = dbNameArr[1]
obj.channelid = dbNameArr[2]
obj.videoid = dbNameArr[3]
arr.push(obj)
}
}
}
obj.chatdbs = arr 
obj.home = request.pls_msg.home 
if (tab && tab.url && tab.url.includes('sidepanel.html')) {
chrome.runtime.sendMessage({ msg: obj }) 
} else {
pls_send_message(tab.id, obj)   
}
});
return false
}


pls_set_chatmessage() {
// console.info('pls_set_chatmessage $ pls', pls)
return false
}


pls_chat_mark_by_videoid(request, tab) {
try {
chrome.storage.local.set({ [request.pls_msg.href]: request.pls_msg.db })
.then((resp) => {
// console.log('pls_chat_mark_by_videoid $ resp', resp)
}).catch((err) => {
console.warn('pls_chat_mark_by_videoid $ err', err)
});
} catch (err){
pls_send_err_message(tab.id, err)
}
return false
}


pls_set_stream_for_offline() {
// console.info('pls_set_stream_for_offline $ pls', pls)
return false
}


pls_went_offline(request, tab) {
console.info('pls_went_offline $ request', request)
chrome.action.onClicked.removeListener((tab) => {
console.info('offline removed action listener')
});
chrome.action.setPopup({ popup: 'sidepanel.html' });
}


pls_went_online(request, tab) {
console.info('pls_went_online $ request', request)
chrome.action.setPopup({ popup: '' });

chrome.action.onClicked.addListener((tab) => {
console.info('online added action listener') 
/*
try {
chrome.scripting.executeScript({
target: {tabId: tab.id},
files: ['open_side_menu.js']
});
} catch (err){
pls_send_err_message(err)
}
});
*/
try {
chrome.sidePanel.open({ tabId: tab.id }, () => {
console.log("Side Panel Opened") 
});
} catch (err){
pls_send_err_message(err)
}
});


}


pls_search_multiple_saved_chat(request, tab) {
console.info('pls_search_multiple_saved_chat $ request tab', request, tab) 
if (!request || !request.pls_msg || !tab) {                               pls_dbe('6 d n', this, request, tab); return false } 
let arr = [] 
let arrl = arr.length 
let dbName = '' 
let dbRequest = {} 
let db = {} 
let transaction = {} 
let store = {} 
let chatObjArr = [] 
let chatObj = {} 

indexedDB.databases().then((arr) => {
if (arr.length < 1) { return false } 
arrl = arr.length 
for (let i = 0; i < arrl; i++) {
console.info('doing pls_search_multiple_saved_chat $ db ', arr[i]) 
dbName = arr[i].name 
if (dbName && dbName.startsWith('savedchat') ) {
(async () => {
dbRequest = await indexedDB.open(dbName, 10);
dbRequest.onerror = (e) => {                                          pls_dbe('6 d e', this, e, dbRequest); return; } 
dbRequest.onblocked = (e) => {                                        pls_dbe('6 d b', this, e, dbRequest); return; } 
dbRequest.onupgradeneeded = (e) => {                                  pls_dbe('6 d u', this, e, dbRequest); return; };
dbRequest.onsuccess = function(successObj) {

console.log('doing pls_search_multiple_saved_chat success', successObj) 
if (!dbRequest.result) {                                              pls_dbe('6 ds r', this, successObj, dbRequest); return; }
if (!successObj) {                                                    pls_dbe('6 ds s', this, successObj, dbRequest); return; }
db = dbRequest.result 
db.onerror = (e) => {                                                 pls_dbe('6 ds dbe', this, e, dbRequest); return; } 
transaction = db.transaction('chat', 'readonly') 
transaction.onerror = (e) => {                                        pls_dbe('6 ds te', this, e, dbRequest); return; } 
transaction.onabort = (e) => {                                        pls_dbe('6 ds ta', this, e, dbRequest); return; } 
transaction.oncomplete = (e) => {                                     console.info('doing pls_search_multiple_saved_chat transaction.oncomplete $ e ', e) } 
store = transaction.objectStore('chat') 
store.getAll().onerror = (e) => {                                     pls_dbe('6 ds se', this, e, dbRequest); return; } 
store.getAll().onblocked = (e) => {                                   pls_dbe('6 ds sb', this, e, dbRequest); return; } 
store.getAll().onsuccess = function(successAllObj) {

if (!successAllObj) {                                                 pls_dbe('6 ds sa', this, successAllObj, dbRequest); return; } 
if (!successAllObj.target) {                                          pls_dbe('6 ds sat', this, successAllObj, dbRequest); return; } 
if (!successAllObj.target.result) {                                   pls_dbe('6 ds satr', this, successAllObj, dbRequest); return; } 
chatObjArr = successAllObj.target.result 
if (chatObjArr.length < 1) {                                          console.warn('Error: this stream chat not found for display'); return; } 
chatObj = {} 
chatObj.chats = chatObjArr 
chatObj.home = request.pls_msg.home
chatObj.dbName = request.pls_msg.dbName
chatObj.searchType = request.pls_msg.searchType
chatObj.search = request.pls_msg.search
if (tab && tab.url && tab.url.includes('sidepanel.html')) {
chrome.runtime.sendMessage({ msg: chatObj }) 
} else {
pls_send_message(tab.id, chatObj) 
}
};  // store.getAll().onsuccess 
}; // request.onsuccess 
})(); // async 
} // startsWith('savedchat') 
} // for each db 
}); // indexedDB.databases().then 
}


pls_build_chat_by_dbName_string(request, tab) {
console.info('pls_build_chat_by_dbName_string $ request tab', request, tab) 
if (!request || !request.pls_msg || !request.pls_msg.dbName || !tab) {       pls_dbe('5 d n', this, request, tab); return false } 
let arr = [] 
let arrl = arr.length 
let dbName = '' 
let dbRequest = {} 
let db = {} 
let transaction = {} 
let store = {} 
let chatObjArr = [] 
let chatObj = {} 
dbRequest = indexedDB.open(request.pls_msg.dbName, 10) 
dbRequest.onerror = (e) => {                                                pls_dbe('5 d e', this, e, dbRequest); return false } 
dbRequest.onblocked = (e) => {                                              pls_dbe('5 d b', this, e, dbRequest); return false } 
dbRequest.onupgradeneeded = (e) => {                                        pls_dbe('5 d u', this, e, dbRequest); return false } 
dbRequest.onsuccess = function(successObj) {

console.info('pls_set_db_save_chat_begin onsuccess $ dbRequest, successObj', dbRequest, successObj) 
if (!dbRequest.result) {                                                    pls_dbe('5 ds r', this, successObj, dbRequest); return false } 
if (!successObj) {                                                          pls_dbe('5 ds s', this, successObj, dbRequest); return false } 
if (!successObj.target) {                                                   pls_dbe('5 ds st', this, successObj, dbRequest); return false } 
if (!successObj.target.result) {                                            pls_dbe('5 ds str', this, successObj, dbRequest); return false } 
db = successObj.target.result 
db.onerror = (e) => {                                                       pls_dbe('5 ds dbe', this, e, dbRequest) } 
transaction = db.transaction('chat', 'readonly');
transaction.onerror = (e) => {                                              pls_dbe('5 ds te', this, e, dbRequest) } 
transaction.onabort = (e) => {                                              pls_dbe('5 ds ta', this, e, dbRequest) } 
transaction.oncomplete = (e) => {                                           console.info('pls_set_db_save_chat_begin oncomplete $ e, dbRequest', e, dbRequest) }
store = transaction.objectStore('chat') 
store.getAll().onerror = (e) => {                                           pls_dbe('5 ds se', this, e, dbRequest); return false }
store.getAll().onblocked = (e) => {                                         pls_dbe('5 ds sb', this, e, dbRequest); return false }
store.getAll().onsuccess = function(successAllObj) {

if (!successAllObj) {                                                       pls_dbe('5 ds sa', this, successAllObj, dbRequest); return false }
if (!successAllObj.target) {                                                pls_dbe('5 ds sat', this, successAllObj, dbRequest); return false }
if (!successAllObj.target.result) {                                         pls_dbe('5 ds satr', this, successAllObj, dbRequest); return false }
chatObj = {} 
chatObj.chats = successAllObj.target.result 
chatObj.home = request.pls_msg.home 
chatObj.dbName = request.pls_msg.dbName 
chatObj.searchType = request.pls_msg.searchType 
chatObj.search = request.pls_msg.search 
if (tab && tab.url && tab.url.includes('sidepanel.html')) {
chrome.runtime.sendMessage({ msg: chatObj }) 
} else {
pls_send_message(tab.id, chatObj) 
}

}
}
return false
}



pls_chat_delete_by_videoid(request, tab) {
console.info('pls_chat_delete_by_videoid $ request tab', request, tab)
if (!request || !request.pls_msg || !request.pls_msg.dbName || !tab) {       	pls_dbe('7 d n', this, request, tab); return false } 
let dbRequest = indexedDB.deleteDatabase(request.pls_msg.dbName) 
dbRequest.onerror = (e) => {                                                	pls_dbe('7 d e', this, e, dbRequest); return false } 
dbRequest.onblocked = (e) => {                                              	pls_dbe('7 d b', this, e, dbRequest); return false } 
dbRequest.onupgradeneeded = (e) => {                                        	pls_dbe('7 d u', this, e, dbRequest); return false } 
dbRequest.onsuccess = function(successObj) {
																				console.info('pls_chat_delete_by_videoid onsuccess $ dbRequest, successObj', dbRequest, successObj) 
let obj = {} 
obj.dbName = request.pls_msg.dbName 
if (tab && tab.url && tab.url.includes('sidepanel.html')) {
chrome.runtime.sendMessage({ msg: obj }) 
} else {
pls_send_message(tab.id, obj) 
}
}
return false
}


pls_set_active_db_for_saving(request, tab){
console.info('pls_set_active_db_for_saving $ request tab', request, tab)
if (!request || !request.pls_msg) { console.log('sorry DAVE', request.pls_msg); return false } 
console.log('pls_set_active_db_for_saving request.pls_msg', request.pls_msg);
console.log('pls_set_active_db_for_saving request.pls_msg.dbName', request.pls_msg.dbName);
chrome.storage.local.set({ 'plsv_dbName': request.pls_msg.dbName })
}



pls_set_db_for_saving(request, tab) {
console.info('pls_set_db_for_saving $ request tab', request, tab);
// if (!request || !request.pls_msg || !request.pls_msg.dbName || request.pls_msg.plsv_channelid || request.pls_msg.plsv_serviceid || !tab) {      pls_dbe('1 d n', this, request, tab); return false } 
let arr = [] 
let arrl = arr.length 
let dbName = '' 
let dbRequest = {} 
let db = {} 
let transaction = {} 
let store = {} 
let chatObjArr = [] 
let chatObj = {} 
dbRequest = indexedDB.open(request.pls_msg.dbName, 10) 
dbRequest.onerror = (e) => {                                                pls_dbe('1 d e', this, e, dbRequest); return false } 
dbRequest.onblocked = (e) => {                                              pls_dbe('1 d b', this, e, dbRequest); return false } 
dbRequest.onupgradeneeded = function(e) {
console.info('pls_set_db_for_saving onupgradeneeded -- called when 1st saving chat $ e, dbRequest', e, dbRequest) 
if (!dbRequest.result) {                                                    pls_dbe('1 d u r', this, e, dbRequest); return false } 
store = dbRequest.result.createObjectStore('chat', {
keyPath: 'id',
autoIncrement: true,
});
store = pls_initialize_store(store) 
store.transaction.onerror = (e) => {                                        pls_dbe('1 ds te', this, e, dbRequest); return false } 
store.transaction.onabort = (e) => {                                        pls_dbe('1 ds ta', this, e, dbRequest); return false } 
store.transaction.oncomplete = (e) => {
console.info('pls_set_db_for_saving oncomplete $ e dbRequest', e, dbRequest) 
dbRequest.result.close() 
pls_set_db_save_chat_begin(tab.id, request.pls_msg.dbName, request.pls_msg.plsv_channelid, request.pls_msg.plsv_serviceid) 
return false 
}
}

dbRequest.onsuccess = function (successObj) { 
console.info('pls_set_db_for_saving onsuccess -- called when saving chat on return loads $ dbRequest, successObj', dbRequest, successObj) 
if (!dbRequest.result) {                                                    pls_dbe('1 ds r', this, successObj, dbRequest); return false } 
if (!successObj) {                                                          pls_dbe('1 ds s', this, successObj, dbRequest); return false } 
return dbRequest 
} 
}


pls_set_db_save_chat_obj(request, tab) {
console.info('pls_set_db_save_chat_obj $ request tab', request, tab)
if (!request || !request.pls_msg || !request.pls_msg.dbName || !tab) {        pls_dbe('3 d n', this, request, tab); return false } 
let arr = [] 
let arrl = arr.length 
let dbName = '' 
let dbRequest = {} 
let db = {} 
let transaction = {} 
let store = {} 
let chatObjArr = [] 
let chatObj = {} 
dbRequest = indexedDB.open(request.pls_msg.dbName, 10) 
dbRequest.onerror = (e) => {                                                  pls_dbe('3 d e', this, e, dbRequest); return false } 
dbRequest.onblocked = (e) => {                                                pls_dbe('3 d b', this, e, dbRequest); return false } 
dbRequest.onupgradeneeded = (e) => {                                          pls_dbe('3 d u r', this, e, dbRequest); return false } 
dbRequest.onsuccess = function(successObj) {

console.info('pls_set_db_save_chat_obj $ dbRequest, successObj', dbRequest, successObj) 
if (!dbRequest.result) {                                                    pls_dbe('3 ds r', this, successObj, dbRequest); return false } 
if (!successObj) {                                                          pls_dbe('3 ds s', this, successObj, dbRequest); return false } 

db = successObj.target.result 
db.onerror = (e) => {                                                       pls_dbe('3 ds dbe', this, e, successObj); return false } 
transaction = db.transaction('chat', 'readwrite', { durability: 'relaxed' } );
transaction.onerror = (e) => {                                              pls_dbe('3 ds te', this, e, dbRequest); return false } 
transaction.onabort = (e) => {                                              pls_dbe('3 ds ta', this, e, dbRequest); return false } 
transaction.oncomplete = (e) => {                                           console.info('doing pls_set_db_save_chat_obj transaction.oncomplete $ e ', e) }
store = transaction.objectStore('chat');
delete request.pls_msg.func; 
delete request.pls_msg.dbName;
store.add(request.pls_msg).onsuccess = function(addObj) {
console.info('doing pls_set_db_save_chat_obj store.onsuccess $ e ', addObj) 
};
};
}


pls_get_videos(request, tab) {
console.info('pls_get_videos $ request, tab', request, tab)
if (!request || !request.pls_msg) { return false; }
if (request.pls_msg.two == 'Followed') { 
request.pls_msg.five = request.pls_msg.six; 
console.log('followed', request.pls_msg);
pls_get_videos_from_followed_start(request.pls_msg, tab);
return false;
}

let lsKeyStr = 'pls' + 'Video' + '@' +  request.pls_msg.one + '@' + request.pls_msg.two + '@' + request.pls_msg.three + '@' + request.pls_msg.four + '@' + request.pls_msg.five + '0' 
console.log('pls_get_videos key', lsKeyStr) 

chrome.storage.local.get([lsKeyStr], function (result){
  if (result && result[lsKeyStr]) {
    console.log('pls_get_videos result', result[lsKeyStr] );
    pls_get_videos_from_storage(request.pls_msg, tab) 
  } else {
    pls_get_videos_from_api(request.pls_msg, tab) 
  }
}) 
}

}
let p  = new ParleyStar();






async function pls_get_videos_from_storage(requestObj, tab) {
console.log('getting pls_get_videos_from_storage', requestObj);
let arrl = 20 
let arr = [] 
let videoObj = {} 
let localObj = {} 
let result = '' 
let lsKeyStr = 'pls' + 'Video' + '@' +  requestObj.one + '@' + requestObj.two + '@' + requestObj.three + '@' + requestObj.four + '@' + requestObj.five 
let str = ''
for (let i = 0; i < arrl; i++) {
str = lsKeyStr + i 
console.log('str is ', str) 
localObj = await chrome.storage.local.get([str]) 
console.log('pls_get_videos_from_storage - 2', localObj[str] ) 
if (localObj && localObj[str]) { 
  videoObj = JSON.parse(localObj[str]) 
  arr.push(videoObj) 
}
} 
console.log(arr)
let obj = {}
obj.videos = arr 
obj.requestObj = requestObj 
pls_send_message(tab.id, obj) 
}


function pls_get_videos_from_api(requestObj, tab) {
  console.log('doing pls_get_videos_from_api with ', requestObj);
  let url = '' 
  if (requestObj.three == 'Stream') {
  url = '/js/channel_v1.json' 
  }

  if (requestObj.three == 'Clip') {
  url = '/js/clips_v2.json' 
  }

  if (requestObj.two == 'Category') {
  url = '/js/clips_fortnite_v2.json'
  }

  if (requestObj.two == 'Followed') {
  requestObj.nextCursor = 0
  requestObj.followedChannels = []
  pls_get_followed_channels_from_api(requestObj, 0) 
  return false;
  }

  fetch(url,
    {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
    })
    .then(function(res){ if (res.ok) { return res.json(); } else { return Promise.reject(res); } })
    .then(function(resp) {
    if ( 
      (resp == null) ||
      (resp.length === 0) ||
      (isNaN(resp) == false) || 
      (resp == 'error') || 
      (typeof resp != 'object')
    ) { console.log('pls_get_videos error1', resp); return false; }
      pls_process_videos_from_api(resp, tab, requestObj) 
      return false
    })
    .catch(err => {
       console.log('pls_get_videos error2', err); return false;
    });
}


async function pls_process_videos_from_api(resp, tab, requestObj) {
  console.log('doing pls_process_videos_from_api with ', resp) 
  if (!resp || !tab || !requestObj) {
    console.log('pls_process_videos_from_api error0', resp, tab, requestObj); return false
  }
  console.log('doing pls_process_videos_from_api with ', resp, tab, requestObj) 
  let arrl = 20  
  let arr = [] 
  if (resp.clips) {
    arr = resp.clips 
  }
  if (resp.previous_livestreams) {
    arr = resp.previous_livestreams  
  }
  if (arr.length) {
    arrl = arr.length 
  }

  for (let i = 0; i < arrl; i++) {
    if (typeof arr[i] === 'object') { 
      let videoObj = pls_get_videoObj_blank() 
      videoObj = pls_get_videoObj_populated(videoObj, arr[i], requestObj) 
      let lsKeyStr = 'pls' + 'Video' + '@' +  requestObj.one + '@' + requestObj.two + '@' + requestObj.three + '@' + requestObj.four + '@' + requestObj.five + i 
      await chrome.storage.local.set({ [lsKeyStr]: JSON.stringify(videoObj) })
    }
  }
  return false
}


function pls_get_videoObj_blank(){
let videoObj = {} 
videoObj.id = ''
videoObj.livestream_id = '' 
videoObj.thumbnail_url = '' 
videoObj.channelUsername = '' 
videoObj.channelSlug = '' 
videoObj.channelImg = '' 
videoObj.title = '' 
videoObj.video_url = '' 
videoObj.views = '' 
videoObj.duration = '' 
videoObj.created_at = '' 
videoObj.categoryName = '' 
videoObj.categorySlug = '' 
videoObj.categoryParent = '' 
videoObj.channelUsername = '' 
videoObj.channelSlug = '' 
videoObj.channelImg = '' 
return videoObj 
}


function pls_get_videoObj_populated(videoObj, clipObj, requestObj){
if (!clipObj) { return videoObj; }

// "id": "clip_01JMJHZA5H1DMHXDKSTJ6BJCY0",
if (clipObj.id) {
videoObj.id = clipObj.id 
}
// "uuid": "6f9058b4-dcf4-4d22-b441-b871f84e9855",
// channel previous_livestreams video "live_stream_id": 49688569, "uuid": "9fbe688e-e307-4ef2-87e2-4d12e1fab653", 
if (clipObj.video && clipObj.video.uuid) {
videoObj.id = clipObj.video.uuid 
}
// clips "livestream_id": "49583522",
if (clipObj.livestream_id) {
videoObj.livestream_id = clipObj.livestream_id 
}
// previous_livestreams video "live_stream_id": 49583522,
if (clipObj.video && clipObj.video.live_stream_id) {
videoObj.livestream_id = clipObj.video.live_stream_id 
}

// "thumbnail_url": "https://clips.kick.com/clips/9e/clip_01JMJHZA5H1DMHXDKSTJ6BJCY0/thumbnail.webp",
if (clipObj.thumbnail_url) {
videoObj.thumbnail_url = clipObj.thumbnail_url  
}

// "src": "https://images.kick.com/video_thumbnails/CNd33pZcxN4z/rv7UGs0pSco4/720.webp",
if (clipObj.thumbnail) {
videoObj.thumbnail_url = clipObj.thumbnail.src 
videoObj.channelUsername = requestObj.five 
videoObj.channelSlug = requestObj.five 
videoObj.channelImg = clipObj.thumbnail.src 
}

// "title": "whaaa???",
if (clipObj.title) {
videoObj.title = clipObj.title 
} 
// "session_title": " hello! ",
if (clipObj.session_title) {
videoObj.title = clipObj.session_title 
} 
if (clipObj.created_at) {
  let created_atArr = clipObj.created_at.split('T') 
  videoObj.created_at = created_atArr[0] 
} 
if (clipObj.video && clipObj.video.created_at) {
  let created_atArr = clipObj.video.created_at.split('T') 
  videoObj.created_at = created_atArr[0] 
}

if (clipObj.category) {
videoObj.categoryName = clipObj.category.name 
videoObj.categorySlug = clipObj.category.slug 
videoObj.categoryParent = clipObj.category.parent_category  
}

if (clipObj.categories && clipObj.categories[0]) {
videoObj.categoryName = clipObj.categories[0].name 
videoObj.categorySlug = clipObj.categories[0].slug 
videoObj.categoryParent = clipObj.categories[0].category.slug  
}

if (clipObj.channel) {
videoObj.channelUsername = clipObj.channel.username 
videoObj.channelSlug = clipObj.channel.slug 
videoObj.channelImg = clipObj.channel.profile_picture  
}

if (clipObj.views) {
videoObj.views = clipObj.views 
}

if (clipObj.duration) {
videoObj.duration = clipObj.duration 
}

return videoObj 
}





chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
console.log('requestToBackground!', request, sender, sendResponse)
sendResponse({ response: request })

if (request && request.pls_msg && request.pls_msg.func && sender && sender.tab) {
try {
p[request.pls_msg.func](request, sender.tab) 
} catch (err){
pls_send_err_message(err)
}  
}

if (request && request.pls_msg && request.pls_msg.func && sender && sender.url.includes('sidepanel.html')) {
try {
p[request.pls_msg.func](request, sender) 
} catch (err){
pls_send_err_message(err)
}  
}

})



chrome.commands.onCommand.addListener(function(command) {
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
if (tabs[0] && tabs[0].id) {
pls_send_message(tabs[0].id, command)
}
})
})


chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );
  }
}); 

chrome.tabs.onUpdated.addListener(function (tabId, info, tab){
if (tab && tab.url && info && info.status == 'complete') {
let arr = pls_get_services() 
let isValid = false 
let serviceid = ''; 
[].forEach.call(arr, function(item){
console.log('tab.url item', tab.url, item) 
if (tab.url.includes(item)) {
isValid = true 
serviceid = item 
}
})
if (isValid) {
console.info('service is', serviceid); 
console.info('chrome.tabs.onUpdated $ tabId, info, tab', tabId, info, tab, tab.url);
pls_set_page_values_from_url(tabId, tab.url, serviceid)
return true
}
}
return true
})



// tab removed 699961070 {isWindowClosing: true, windowId: 699961071}
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
console.log('tab removed', tabId, removeInfo) 
pls_remove_db_on_close() 
});


chrome.runtime.onConnect.addListener(port => {
  port.onMessage.addListener(async msg => {
  	console.log('PORT IS', port)
  	console.log('PORTMSG IS', msg)

/*
    if (port.name === PortNames.SidePanelPort) {
      if (msg.type === 'init') {
        console.log('panel opened');

        await storage.setItem('panelOpen', true);

        port.onDisconnect.addListener(async () => {
          await storage.setItem('panelOpen', false);
          console.log('panel closed');
          console.log('port disconnected: ', port.name);
        });

        const tab = await getCurrentTab();

        if (!tab?.id) {
          console.error("Couldn't get current tab");
          return;
        }

        injectContentScript(tab.id);

        port.postMessage({ 
          type: 'handle-init', 
          message: 'panel open' 
        });
      }
    }
*/

  });
});



// chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch((error) => console.error(error));

/*
chrome.action.onClicked.addListener((tab) => {
// console.info('online added action listener')
try {
chrome.scripting.executeScript({
target: {tabId: tab.id},
files: ['open_side_menu.js']
});

} catch (err){
pls_send_err_message(err)
}

});
*/
// install update
chrome.runtime.onInstalled.addListener((details) => {
console.log('ParleyStar installed', details) 

if (details && details.previousVersion) {
  chrome.storage.local.set({ 'parleystarpreviousVersion': details.previousVersion }).then(pls_send_resp_install, pls_show_error_install)
}
if (details && details.reason) {
  chrome.storage.local.set({ 'parleystarpreviousreason': details.reason }).then(pls_send_resp_install, pls_show_error_install)
}
if (details && details.reason == 'update') {
  let date = new Date();
  chrome.storage.local.set({ 'parleystarfirstinstalldate': date.toLocaleDateString() }).then(pls_send_resp_install, pls_show_error_install) 
  chrome.runtime.setUninstallURL('https://parleystar.com/uninstall') 
  let lang = chrome.i18n.getUILanguage() 
  lang = lang.split('-')[0]
  console.log(lang) 
  fetch('_locales/' + lang + '/messages.json', 
  {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
  })
  .then(function(res){ if (res.ok) { return res.json(); } else { return Promise.reject(res); } })
  .then(function(resp) {
  if ( 
    (resp == null) ||
    (resp.length === 0) ||
    (isNaN(resp) == false) || 
    (resp == 'error') || 
    (typeof resp != 'object')
  ) { console.log('pls_get_messages error1', resp); return false; }
    console.log('messages successs', resp) 
    pls_start_install(resp) 
    return false
  })
  .catch(err => {
  	console.log('pls_get_messages error2', err); return false;
  });
}
if (details && details.reason == 'update') {

}



});





function pls_show_error_install(err){
console.error('A functional error occured on installation in ParleyStar extension: ', err)
}

function pls_send_resp_install(msg) {
console.info('installation success in ParleyStar extension', msg);
}


async function pls_start_install(resp){
console.log('pls_start_install', resp); 
let plsel = [] 
let syncJson = []
await pls_chat_menu_install() 
let elem = '' 
let html = '' 
Object.keys(resp).forEach(function(key,index) { 
if (key != 'description' || key != 'title') {
plsel.push(key) 
}

/*
if (key.includes('plsb')) {
await chrome.storage.sync.set({ [key]: false }).then(pls_send_resp_install, pls_show_error_install)   
}
if (key.includes('plsc')) {
await chrome.storage.sync.set({ [key]: '#000000' }).then(pls_send_resp_install, pls_show_error_install)   
}
if (key.includes('plsn')) {
await chrome.storage.sync.set({ [key]: '0' }).then(pls_send_resp_install, pls_show_error_install)   
}
if (key.includes('plsv')) {
await chrome.storage.local.set({ [key]: '' }).then(pls_send_resp_install, pls_show_error_install)   
}
});
*/

if (key.includes('ZZ')) {
console.log('key! index', key, index, resp[key]) 
let arr = key.split('ZZ') 
console.log('CONSOLEWARS', arr);


switch (arr[1]) {
case 'div':
elem = pls_get_div(key, index, resp[key], arr[0]); html = html + elem
break;
case 'h4':
elem = pls_get_h4(key, index, resp[key], arr[0]); html = html + elem
break;
case 'h5':
elem = pls_get_h5(key, index, resp[key], arr[0]); html = html + elem
break;
case 'select':
elem = pls_get_select(key, index, resp[key], arr[0]); html = html + elem
break;
case 'small':
elem = pls_get_small(key, index, resp[key], arr[0]); html = html + elem
break;
case 'dialog':
elem = pls_get_dialog(key, index, resp[key], arr[0]); html = html + elem
break;
case 'form':
elem = pls_get_form(key, index, resp[key], arr[0]); html = html + elem
break;
case 'details':
elem = pls_get_details(key, index, resp[key], arr[0]); html = html + elem
break;
case 'summary':
elem = pls_get_summary(key, index, resp[key], arr[0]); html = html + elem
break;
case 'p':
elem = pls_get_p(key, index, resp[key], arr[0]); html = html + elem
break;
case 'fieldset':
elem = pls_get_fieldset(key, index, resp[key], arr[0]); html = html + elem
break;
case 'legend':
elem = pls_get_legend(key, index, resp[key], arr[0]); html = html + elem
break;
case 'section':
elem = pls_get_section(key, index, resp[key], arr[0]); html = html + elem
break;
case 'button':
elem = pls_get_button(key, index, resp[key], arr[0]); html = html + elem
break;
case 'iframe':
elem = pls_get_iframe(key, index, resp[key], arr[0]); html = html + elem
break;
case 'input':
elem = pls_get_input(key, index, resp[key], arr[0]); html = html + elem
break;
}

}
});

await chrome.storage.local.set({ 'plsel': plsel }).then(pls_send_resp_install, pls_show_error_install) 
console.log(html);
await chrome.storage.local.set({ 'settingsmenu': html }).then(pls_send_resp_install, pls_show_error_install) 
}


// div      id class 
function pls_get_div(key, index, obj, name) {
let elem = "<div id='" + key + "' class='" + key + "'>" 
if (key == 'plsChatsMenuPreviousStreamsZZdiv') { 
elem = elem + "</fieldset></p></details>" 
}
if (key == 'plsVideosMenuContentZZdiv') { 
elem = elem + "</div></div>" 
}

if (key == 'plsHelpMenuWrapperZZdiv') { 
elem = elem + "</div></p></details>" 
}

return elem 
}

// h4       id class translateclass title aria-label content
function pls_get_h4(key, index, obj, name) {
console.log('h4 key is ', key);
let elem = "" 
if (key == 'plsTopTitleZZh4') {
elem = "<h4 id='" + key + "' class='plsi18n " + key + "' ><span id='plsTopChatAZZspan' class='plsi18n plsTopChatAZZspan' ></span><span id='plsTopChatBZZspan' class='plsi18n plsTopChatBZZspan'></span></h4>" 
}
if (key == 'plsVideosMenuZZh4') {
elem = "<h4 id='" + key + "' class='plsi18n " + key + "' ><span id='plsVideosMenuAZZspan' class='plsi18n plsVideosMenuAZZspan' ></span><span id='plsVideosMenuBZZspan' class='plsi18n plsVideosMenuBZZspan'></span></h4>" 
}
if (key == 'plsChatsMenuImportTitleZZh4') {
elem = "<h4 id='" + key + "' class='plsi18n " + key + "' ></h4>" 
}
if (key == 'plsOptionsMenuWrapperSettingsImportTitleZZh4') {
elem = "<h4 id='" + key + "' class='plsi18n " + key + "' ></h4>" 
}
return elem 
}

// h5       id class translateclass title aria-label content
function pls_get_h5(key, index, obj, name) {
let elem = "<h5 id='" + key + "' class='plsi18n " + key + "' ></h5>" 
return elem 
}

// small    id class translateclass title aria-label content
function pls_get_small(key, index, obj, name) {
let elem = "<small id='" + key + "' class='plsi18n " + key + "' ></small>" 
return elem 
}

// dialog   id class
function pls_get_dialog(key, index, obj, name) {
let elem = "<dialog id='" + key + "' class='" + key + "'>" 
return elem 
}

// form name='plsSettingsMenuForm' id='plsSettingsMenuForm' class='pls-settings-menu-form' method='dialog' autocapitalize='off' autocomplete='off' spellcheck='false' 
function pls_get_form(key, index, obj, name) {
let elem = "<form id='" + key + "' class='" + key + "' name='" + key + "' method='dialog' autocapitalize='off' autocomplete='off' spellcheck='false'>" 
return elem 
}

// details  id class name 
function pls_get_details(key, index, obj, name) {
let elem = "<details id='" + key + "' class='" + key + "'>" 
return elem 
}

// summary  id class translateclass title aria-label content
function pls_get_summary(key, index, obj, name) {
let elem = "<summary id='" + key + "' class='plsi18n " + key + "' ></summary>" 
return elem 
}

// p        id class
function pls_get_p(key, index, obj, name) {
let elem = "<p id='" + key + "' class='" + key + "'>" 
return elem 
}

// fieldset id class
function pls_get_fieldset(key, index, obj, name) {
let elem = "<fieldset id='" + key + "' class='" + key + "'>" 
return elem 
}

// legend   id class translateclass title aria-label content
function pls_get_legend(key, index, obj, name) {
let elem = "<legend id='" + key + "' class='plsi18n " + key + "' ></legend>" 
return elem 
}

// section   id class translateclass title aria-label content
function pls_get_section(key, index, obj, name) {
let elem = "<section id='" + key + "' class='plsi18n " + key + "' ></section>" 
if (key == 'plsHideMenuTitleZZsection') {
let arrl = 18 
for (let i = 1; i < arrl; i++) {
elem = elem + "<input name='plsb" + i + "' id='plsb" + i + "' class='plsb" + i + "' type='checkbox' /><label class='plsi18n' for='plsb" + i + "'></label>" 
}
}

if (key == 'plsMuteMenuTitleZZsection') {
let arrl = 30 
for (let i = 21; i < arrl; i++) {
elem = elem + "<input name='plsb" + i + "' id='plsb" + i + "' class='plsb" + i + "' type='checkbox' /><label class='plsi18n' for='plsb" + i + "'></label>" 
}
}

if (key == 'plsOptionsMenuTitleZZsection') {
let arrl = 40 
for (let i = 31; i < arrl; i++) {
elem = elem + "<input name='plsb" + i + "' id='plsb" + i + "' class='plsb" + i + "' type='checkbox' /><label class='plsi18n' for='plsb" + i + "'></label>" 
}
}

if (key == 'plsColorsMenuTitleZZsection') {
let arrl = 25 
for (let i = 1; i < arrl; i++) {
elem = elem + "<input name='plsc" + i + "' id='plsc" + i + "' class='plsc" + i + "' type='color' /><label class='plsi18n' for='plsc" + i + "'></label>" 
}
}

if (key == 'plsOpacityMenuTitleZZsection') {
let arrl = 25 
for (let i = 1; i < arrl; i++) {
elem = elem + "<input name='plsn" + i + "' id='plsn" + i + "' class='plsn" + i + "' type='number' min='0' max='9' placeholder='1' pattern='d*' /><label class='plsi18n' for='plsn" + i + "'></label>" 
}
}

if (key == 'plsContentMenuTitleZZsection') {
let arrl = 8 
for (let i = 1; i < arrl; i++) {
elem = elem + "<input name='plsv" + i + "' id='plsv" + i + "' class='plsv" + i + "' type='text' maxlength='100' size='45' /><label class='plsi18n' for='plsv" + i + "'></label>" 
}
}

if (key == 'plsHideMenuTitleZZsection' || key == 'plsMuteMenuTitleZZsection' || key == 'plsColorsMenuTitleZZsection' || key == 'plsOpacityMenuTitleZZsection') {
elem = elem + "</div></fieldset><hr />" 
}
if (key == 'plsOptionsMenuTitleZZsection' || key == 'plsContentMenuTitleZZsection') {
elem = elem + "</div></fieldset><hr /></p></details>" 
}
return elem 
}

// select   id class
function pls_get_select(key, index, obj, name) {
let elem = "<select id='" + key + "' class='" + key + "'></select>" 
if (key == 'plsChatsMenuLiveZZselect') {
elem = elem + "</div>"   
}
return elem 
}

// button   id class name type='button' translateclass title aria-label content
function pls_get_button(key, index, obj, name) {
let elem = "<button id='" + key + "' class='plsi18n " + key + "'  type='button'>" + obj.buttonText + "</button>" 
if (key == 'plsChatsMenuLoadZZbutton' || key == 'plsOptionsMenuWrapperSettingsDeleteZZbutton') { 
elem = elem + "</div>" 
} 
if (key == 'plsChatsMenuSortStreamsByChanZZbutton') {
elem = elem + "</div></div>" 
}
if (key == 'plsSettingsMenuCloseZZbutton') { 
elem = elem + "</form></dialog></div>" 
} 
return elem 
}

// 
function pls_get_iframe(key, index, obj, name) {
let elem = "<iframe id='" + key + "' name='" + key + "' class='" + key + "' title='" + key + "' width='1' height='1' allow='fullscreen' loading='lazy' src='#'></iframe>" 
return elem 
}

function pls_get_input(key, index, obj, name) {
console.log('doing pls_get_input $ key, index, obj, name', key, index, obj, name);
let elem = "" 

if (key == 'plsChatsMenuImportZZinput') {
elem = elem + "<input id='plsChatsMenuImportZZinput' class='plsChatsMenuImportZZinput' name='plsChatsMenuImportZZinput' value='' accept='.csv' type='file' /></div>" 
}
if (key == 'plsSideMenuSearchYYinput') {
elem = elem + '<input id="plsSideMenuSearchYYinput" class="plsSideMenuSearchYYinput" name="plsSideMenuSearchYYinput" type="search" autocapitalize="off" autocorrect="off" spellcheck="false" minlength="1" maxlength="100" dir="auto" enterkeyhint="search" placeholder="">' 
}
return elem 
}


async function pls_chat_menu_install(){
await fetch('chatmenu.html',
{
method: 'GET',
mode: 'cors',
cache: 'no-cache',
})
.then(function(res){ 
if (res.ok){ 
  return res.text() 
} else { 
  return Promise.reject(res.status) 
}
})
.then(async function(html){
if ( 
  (html == null) ||
  (html.length === 0) ||
  (isNaN(html) == false) || 
  (html == 'error')
) { pls_show_error_install('pls_menu_install error 1'); return false; }
  console.log('pls_menu_install response', html);
  let key = 'chatmenu';
  await chrome.storage.local.set({ [key]: html }).then(pls_send_resp_install, pls_show_error_install)
})
.catch(err => {
 pls_show_error_install(err); return false;
});
}

















function pls_get_followed_channels_from_api(videoObj) {
  console.log('doing pls_get_followed_channels_from_api with ', videoObj);

  fetch('https://kick.com/api/v2/channels/followed?cursor=' + videoObj.nextCursor,
    {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
      'accept': 'application/json',
      'site': 'v2',
      'Authorization': 'Bearer ' + videoObj.five,
      },
      credentials: 'include',
    })
    .then(function(res){ if (res.ok) { return res.json(); } else { return Promise.reject(res); } })
    .then(function(resp) {
    if ( 
      (resp == null) ||
      (resp.length === 0) ||
      (isNaN(resp) == false) || 
      (resp == 'error') || 
      (typeof resp != 'object')
    ) { console.log('pls_get_followed_channels_from_api error1', resp); return false; }
      console.log('pls_get_followed_channels_from_api', resp) 
      if (resp && resp.channels) {
        let arrl = resp.channels.length;
        for (let i = 0; i < arrl; i++) {
          videoObj.followedChannels.push(resp.channels[i].channel_slug);
        }
      }
      if (resp.nextCursor) {
        videoObj.nextCursor = resp.nextCursor;
        // setTimeout(function() { pls_get_followed_channels_from_api(videoObj); }, 2000);
      } else {
        chrome.storage.local.set({'plsFollowedChannels': JSON.stringify(videoObj.followedChannels) }).then(() => {
          console.log('DONE!!!', videoObj.followedChannels);
        }); 
      }
    })
    .catch(err => {
       console.log('pls_get_followed_channels_from_api error2', err, videoObj); return false;
    });

  

  return false;
}


/*
plsVideosMenuFollowedClipsZZbutton
obj.one = pls.plsv_serviceid  
let two = 'Followed' 
let three = 'Clip' 
obj.four = new Date().toISOString().slice(0, 10) 
let five = pls.plsv_channelid 
*/
async function pls_get_videos_from_followed_start(requestObj, tab) {
requestObj.five = requestObj.six;
console.log('doing pls_get_videos_from_followed with ', requestObj); 
let obj = await chrome.storage.local.get('plsFollowedChannels');
if (!obj) {
pls_get_followed_channels_from_api(requestObj, tab) 
return false 
}
if (!obj['plsFollowedChannels']) { 
pls_get_followed_channels_from_api(requestObj, tab) 
return false 
}

let arr = obj['plsFollowedChannels'] 
arr = JSON.parse(arr) 
console.log('pls_get_videos_from_followed_start plsFollowedChannels', arr);
let arrl = arr.length 
console.log('pls_get_videos_from_followed_start plsFollowedChannels arrl', arrl);
let lsKeyStr = '' 
let videoObj = {} 
let videoArr = [] 

for (let i = 0; i < arrl; i++) { 
  lsKeyStr = 'pls' + 'Video' + '@' +  requestObj.one + '@' + requestObj.two + '@' + requestObj.three + '@' + requestObj.four + '@' + arr[i] + '@0' 
  console.log('pls_get_videos_from_followed_start plsFollowedChannels item', arr[i], lsKeyStr);
  obj = await chrome.storage.local.get(lsKeyStr) 
  console.log('obj', obj) 
  if (obj && obj[lsKeyStr]) { 
    videoObj = JSON.parse(obj[lsKeyStr]) 
    console.log('pls_get_videos_from_followed_start videoObj', videoObj) 
    videoArr.push(videoObj) 
  } else {
    console.log(arr[i] + ' NOT FOUND')
    requestObj.five = arr[i] 
    pls_get_followed_videos_from_api(requestObj, tab);
  }
}

if (videoArr.length > 0) {
requestObj.five = videoArr.length + ' recent from my followed channels ';
let objMsg = {} 
objMsg.videos = videoArr 
objMsg.requestObj = requestObj 
pls_send_message(tab.id, objMsg)
}
}


function pls_get_followed_videos_from_api(requestObj, tab) {
if (!requestObj) {
console.log('pls_get_clips_from_api error0', requestObj); return false
}
let url = '' 

if (requestObj.three == 'Clip') { 
url = 'https://kick.com/api/v2/channels/' + requestObj.five + '/clips?cursor=0&sort=date&time=all' 
}
if (requestObj.three == 'Stream') {
url = 'https://kick.com/api/v1/channels/' + requestObj.five 
}
console.log('doing pls_get_clips_from_api with ', requestObj, url) 

if (url) {
fetch(url,
  {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
  })
  .then(function(res){ if (res.ok) { return res.json(); } else { return Promise.reject(res); } })
  .then(function(resp) {
  if ( 
    (resp == null) ||
    (resp.length === 0) ||
    (isNaN(resp) == false) || 
    (resp == 'error') || 
    (typeof resp != 'object')
  ) { console.log('pls_get_clips_from_api error1', resp); return false; }
    pls_process_followed_videos_from_api(resp, tab, requestObj) 
    return false
  })
  .catch(err => {
     console.log('pls_get_clips_from_api error2', err); return false;
  });
}

}


async function pls_process_followed_videos_from_api(resp, tab, requestObj) {
if (!resp || !tab || !requestObj) {
console.log('pls_process_followed_videos_from_api error0', resp, tab, requestObj); return false
}
console.log('doing pls_process_followed_videos_from_api with ', resp, tab, requestObj);
let arrl = 3 
let arr = [] 
let videoObj = {} 
let lsKeyStr = '' 
let videoArr = [] 

if (resp.clips) {
arr = resp.clips 
requestObj.five = resp.clips[0].channel.slug 
}
if (resp.previous_livestreams) {
arr = resp.previous_livestreams  
if (resp.slug) { 
requestObj.five = resp.slug 
} 
}
if (arr.length < 3) {
arrl = arr.length 
}

for (let i = 0; i < arrl; i++) {
  if (typeof arr[i] === 'object') { 
    videoObj = pls_get_videoObj_blank() 
    videoObj = pls_get_videoObj_populated(videoObj, arr[i], requestObj) 
    lsKeyStr = 'pls' + 'Video' + '@' +  requestObj.one + '@' + requestObj.two + '@' + requestObj.three + '@' + requestObj.four + '@' + requestObj.five + '@' + i 
    console.log('pls_process_followed_videos_from_api lsKeyStr', lsKeyStr);
    videoArr.push(videoObj) 
    await chrome.storage.local.set({ [lsKeyStr]: JSON.stringify(videoObj) })
  }
}

requestObj.five = videoArr.length + ' recent from my followed channels ';
let obj = {} 
obj.videos = videoArr 
obj.requestObj = requestObj 
pls_send_message(tab.id, obj) 
}
