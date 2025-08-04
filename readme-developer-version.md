<!-- SPDX-FileCopyrightText: © 2025 promising future digital media llc. All rights reserved. <admin@parleystar.com> -->
<!-- SPDX-License-Identifier: Mozilla Public License 1.1 (MPL-1.1) -->

# ParleyStar browser extension - how to help and developer readme
<hr/>
### [English Documentation](#summary)
<hr/>
## <span id="summary">Summary</span>

## What is this extension?
This extension exists to provide an open-source framework, template or base for building upon for adding features or UI/UX ideas or requested improvements for viewing or managing chat on live-streaming sites, especially when multi-streaming or simulcasting . This deals with chat ideas. 


## What is this document?
This document will explain to other developers the structure of this extension and how to modify it, add to it, build upon it, connect to it in your own extension or tool.


## How to help
- We appreciate help in coding, styling, testing, financial support or you can use the css classes given by this extension in your own extension. You can submit pull requests, bugs or ideas here.


## Source of official versions of ParleyStar 
https://parleystar.com 
https://gitlab.com/parleystarapp
https://bitbucket.org/parleystar/workspace/repositories/
https://codeberg.org/parleystar
https://radicle.xyz/parleystar
- We are NOT on Github. We are trying out other code repository products.


## Platforms
- We have been in closed alpha and beta testing of new platforms, and have many friends and relationships around the world, so we have been or are building for and testing Parleystar on livestreams on the following livestream platforms:
ArenaTV
BigoLive 
CHZZK (Naver)
Clapper
Instagram
Kick
Loco
Locals
Nimo
Noice
Odysee
Parleystar
Parti
Rooter
Rumble
Shareplay
Soop (AfreecaTV)
Tiktok
Trovo
Twitch
Youtube


## Desktop Browsers supported
We have tested this on Windows, Mac (OSX), and Linux computers on the following browsers: 
Google Chrome
Chromium-based (Brave, Vivaldi, Edge, Arc, etc)


## Future Desktop Browsers targeted to support
Ladybird
Firefox (and its forks)
Orion


## Mobile Android Browsers supported
Kiwi
Hu
Quetta
Mask


## Future Mobile Android Browsers targeted to support
Ladybird
Firefox (and its forks)
Orion


## Online/Offline
- A goal of this project is to provide seamless online/offline chat viewing ability so that if you lose connection, you can still view the stream chat offline.


## Translation
- A goal of this project is to provide all menus, settings and text in the extension in all supported languages by Google Chrome/Android which is around 100 languages at the time of writing this. We are building in a way in which you can easily switch the menus from English to Spanish or vice-versa. Another goal is to save livestream chat to your device so it can be roughly translated for you to read in your native language in almost real-time.


## In-Person Support
We will be presenting demos, answering questions and getting public feedback to anyone that wants to see at the following events in the USA in 2025:


## Contact Support
support@parleystar.com is the support email.
https://discord.gg/WErQ832x is the support Discord.


## Official Social Media And Accounts
@parleystar on X
@parleystar on Instagram
@parleystar:matrix.org 
@parleystar on Brax.me
@parleystar on Mastodon
@parleystar on Minds
@parleystar on Odysee
https://rumble.com/user/parleystar
https://www.twitch.tv/parleystar
https://www.youtube.com/@parleystar
https://gab.com/parleystar


## For more...
- This extension is made to work together with tools from:
https://parleystar.com for Kick chat improvements
https://kicklet.com for chatbots and tools and VOD downloads
https://archyved.com for long term live-stream VOD storage
https://kicktools.app/ for chatbots and tools
https://github.com/fb-sean/kick-website-endpoints
https://github.com/BarryCarlyon/twitch_extension_tools


## Made In
Made in Frisco TX USA


## Disclaimer
We collect no personal data on any third-party servers. We do not endorse or financially support any political candidate or party, nor endorse or financially support any one particular live-streaming service.  


## Version A
- This is released under Google Chrome Manifest version 3 (2022) and may only work with browsers/operating systems updated in 2022 and beyond.


## Version B
- This is released in 2025 and follows this versioning structure. 1.6.1.2025 . Version 1 released on June 1st in year 2025 and the 1st release of that day. 


## License
This is released under [MOZILLA PUBLIC LICENSE Version 1.1]https://www.mozilla.org/en-US/MPL/1.1/ . Copyright © 2025 promising future digital media llc. written by biolithic. All rights reserved.


## Namespace
- pls (ParLeyStar or PLeaSe)


## List of Folders
- locales
translated menu/settings text goes here

- css 
global styles and platform specific scripts go here

- js
platform specific scripts go here

- logo
logo images and icons go here

- settings
(not used) browser settings go here


## List of Files
- css/styles.css
general CSS styles go here

- css/archyved.css
styles for offline chat go here

- css/[platform].css
styles for a specific platform only (like Twitch) go in their named css file such as twitch.css

- archyved.html
the offline settings menu goes here

- chatmenu.html
the livestream chat menu goes here

- archyved.js
the offline settings menu scripts go here

- background.js
load extra javascript files when they are needed
API/Network calls
store or load data to browser
get info from the URL on page or screen change
processing tasks
build html for a screen widget or menu
do as much here as you can

- foreground.js
loads first
scripts/functions for only online connectivity usage
recognize when on page or screen load or change
make calls to background.js, and do things with the data/html/json returned
DOM stuff like selecting, listening for page interactions, clicks, changes, adding widgets or menus to page
keep it more minimal

- open_side_menu.js
open, close the settings menu

- shared.js
loads second
scripts/functions for both online connectivity and offline/no network usage
do as much here as you can

- keybinds.js
optional script
loaded in when the user chooses to use keybind/hotkey functionality on desktop

- video.js
optional script
loaded in when the user chooses to use clip browser functionality for Kick on desktop

- voice.js
optional script
loaded in when the user chooses to use voice commands functionality on desktop

- js/[platform].js
optional script
do platform specific code here like for parsing Twitch chat


## Notable terms used in this extension
"frontend" refers to foreground.js, archyved.js, sidepanel.js and shared.js and what the user is doing to interact with the website/application
"backend" refers to background.js and what the extension is doing to process interactions or data or instructions by the frontend with the website/application
"message" refers to a call with data from frontend to the backend and vice versa


## Mobile considerations 1
Remember that this extension is made with mobile Android devices in mind, so you should develop or add to this by testing the extension/your changes on a mobile device and not just on desktop.


## Mobile considerations 2
Remember that this extension is made with general mobile devices in mind, so you should develop with the mindset that we are not against this being used on WebOS device, rooted or altered or alternative Android devices or different mobile operating systems as they appear. Other extensions in the wild are made for a user to be using Google Chrome on a new Samsung Galaxy device. This extension considers the possibility that the user could be using a different browser or operating system which is not as mainstream.


## General workflow
items, data, options, user preferences are not set or stored randomly. Here is a list of how variables or storage is used:


## CSS Body classes added
You can test for or hook into the following classes on the body element for your own extension or service:
pls-kick (a Kick livestream has loaded, or replace with platform name that has loaded)
pls-loaded (Parleystar has loaded on the page without issue)
pls-mobile (a smaller screen device)
pls-desktop (a larger screen device)
pls-popout (the browser window is popout chat that is loaded)


## Light/Dark Mode
This extension is made for the user to switch between light and dark mode. Please use the variables accordingly to accomodate for this.


## CSS Utility Classes
pls-hide { display: none; }
pls-bl { display: block; }
pls-fl { display: flex; }
pls-chat-on { padding-left: .5rem !important; padding-right: .5rem !important; }
pls-chat-off { padding-left: unset !important; padding-right: unset !important; }
pls-chat-mute { opacity: .3 !important; }
pls-chat-hide { opacity: 0 !important; }
pls-chat-highlight { font-size: 2.5rem !important; line-height: 1.25 !important; }
pls-focused
pls-sr-only (screen reader only styles)


## CSS Utility Elements
if you need to use these
plsToast (for showing temporary messages to the user)
plsLoading (for showing a loading spinner to the user)
show and hide these elements as you need


## CSS Classes/Elements
To target other elements this extension provides, we use the following naming structure:
There are 3 main menus this extension provides: Settings Menu, Side Menu, Chat Menu.
The name, ID, and class are all the same word.

EXAMPLES
plsSettingsMenuZZform
- In the settings menu, the form element.

plsSettingsMenuCloseZZbutton
- In the settings menu, the close button element.

plsSideMenuSearchWrapperYYdiv
- In the side menu, the wrapper element around the search which is a div element.

plsSideMenuSearchYYinput
- In the side menu, in the search widget, the input element

plsChatMenuWrapperXXdiv
- In the chat menu, the wrapper element which is a div element.

plsChatMenu1XXbutton
- In the chat menu, the pls1 element which is a button


## CSS Theming
css or styling is not set randomly. We try to add and remove CSS classes to hide/show elements or theme/style your menus/buttons/etc when possible
example: 
show element to user
plsel.plsSettingsMenuZZdialog.classList.add('pls-bl');
hide element from user
plsel.plsSettingsMenuZZdialog.classList.remove('pls-bl');

user clicks on
plsel.plsSettingsMenuZZdialog.classList.add('pls-focused');
user clicks away
plsel.plsSettingsMenuZZdialog.classList.remove('pls-focused');


## DOM element structure and naming
plsSettingsMenuZZdialog
pls is name space
SettingsMenu is the name of the top level element (could be ChatMenu, SearchMenu, etc)
ZZ is the menu group it is in
dialog is the html type of element it is (<dialog>)


## window.pls
This object can be passed back and forth between backend and frontend to inform each other of app/page changes

window.pls is the top level object that this extension uses

pls.plsa are arrays that are used. For example, you might get a list of user chats and put them in the variable pls.plsa_chats

pls.plsb are booleans that are used. For example, you might get whether the current page is a popout chat or not and put that in the variable 
pls.plsb_popout

pls.plsc are colors that are used. For example, you might get a hexadecimal code for a color such as #00ff00 and put that in the variable pls.plsc_menuBackground

pls.plsn are numbers that are used. For example, you might get how big a chat font should be and put that in the variable pls.plsn_fontSize

pls.plso are objects that are used. For example, you might get some data about a chat and put that in the variable pls.plso_chatId12345

pls.plsv are variables that are strings that are used. For example, you might get the name of the current channel and put that in the variable pls.plsv_channelid

pls object can be passed as a message from backend to frontend and vice versa.


## window.plsel
This only exists in the frontend, the backend cannot access it. pls object above informs plsel to change as needed

Do not send plsel to the backend, it will be stripped of its properties

plsel are references to DOM elements that are used. For example, you might get a reference to a modal and put that in the variable plsel.plsSettingsMenuZZdialog

Thus, rather than doing DOM calls all the time to look up elements, you can get the text of that modal anywhere in the extension after by calling plsel.plsSettingsMenuZZdialog.innerText


## element/DOM selectors and references
Add any new elements in your code with classnames and ids that are the same and the same name as the reference variable. 

Use document.body.getElementsByClassName('plsSettingsMenuZZdialog') when possible instead of other selectors, and grab the 1st element in this list to get the live element.

Then all references to an element like this as plsel.plsSettingsMenuZZdialog.click()

This helps reduce confusion of some getElementById, querySelector, querySelectorAll, getElementsByClassName and we don't know if we are doing some selector action on 1, null, or many elements.


## adding new DOM elements to be used by the user in this extension
If adding a new element to DOM yourself (as an example, "mybutton"):

add it to "locales/en/messages.json" folder with an English translation of the button text and tooltip/help text

add it to "locales/XX/messages.json" folder(s) with other languages translation (optional)

on page/DOM load, we loop through messages.json and print them to the page with the user's language and get reference to them like plsel.mybutton

Thus, you can do plsel.mybutton.click() or plsel.mybutton.innerText or whatever around the code and if it exists it will do that, and if it does not exist or gets removed, the placeholder will get clicked off screen or get text of that placeholder with no errors happening to user/extension.


## function overview and workflow
foreground.js, archyved.js, sidepanel.js are parallel UI's for the user, and these use shared.js for processing/shared functionality. They optionally use other js files too as desired by the user's settings.

Function names follow this naming structure: 
pls_chat_listen
pls_chat_listen_stop
pls_get_cleaned_str_from_str
pls_set_chat_parameter

For any saving, retrieving or large processing or API needs, use function pls_send_message(msg) to send an object of instructions to the background so this can process in parallel and not block the user's UI.

Example in frontend: 
(event happens in frontend)
let obj = {}
obj.func = 'pls_went_offline' 
pls_send_message(obj) 

Here, pls_went_offline is the function we want in the background to run.
The background will send data back to the foreground when it is done processing/setting variables/saving/api call response.

Example in frontend: 
(user clicks button in frontend)
let obj = {}
obj.func = 'pls_get_videos' 
obj.type = 'fortnite' 
pls_send_message(obj) 

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
if (request.msg.videos.length) {
pls_build_video_feed(request.msg.videos, request.msg.requestObj) 
}
Here, we receive a message from the background in foreground and pass it off to a function pls_build_video_feed in shared.js


## Types of Storage
- sync storage is for storage of user settings the user has specifically entered in the settings menu. This gets synched to other devices the user is logged into their Google account in, if they are.

- local storage is for storage of random variables and data points and element names

- indexeddb is for storage of chat to view in case of network outage


## Settings
- The user can set settings in this extension which can be exported out to a file to share, imported from another user/streamer who has shared them, or deleted with a button click.


## variables and storage short term data the extension sets or uses
if we need to store any temporary data or settings that doesnt need to be remembered after this page/stream load, then put it in variable or frontend window.pls object.


## API calls and local caching
to avoid spamming the server with API calls, try and make an API call and save the results in localstorage in the backend once per day, and pull the data out of localstorage next time instead of calling out to the server with similar API call every second/minute.


## Version A

- This is released under Google Chrome Manifest version 3 (2022) and may only work with browsers/operating systems updated in 2022 and beyond.

## Version B

- This is released in 2025 and follows this versioning structure. 1.6.1.2025 . Version 1 released on June 1st in year 2025 and the 1st release of that day. 

## License

This is released under [MOZILLA PUBLIC LICENSE Version 1.1]https://www.mozilla.org/en-US/MPL/1.1/ . Copyright © 2025 promising future digital media llc. written by biolithic. All rights reserved.