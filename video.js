
function pls_add_listener_for_video_settings() {
console.info('doing pls_add_listener_for_video_settings') 
plsel.plsVideosMenuChannelClipsZZbutton.addEventListener('click', function(e) {
console.info('plsVideosMenuChannelClipsZZbutton clicked $ e', e) 
let two = 'Channel' 
let three = 'Clip' 
let five = pls.plsv_channelid 
pls_send_message_for_videos(two, three, five) 
});

plsel.plsVideosMenuChannelStreamsZZbutton.addEventListener('click', function(e) {
console.info('plsVideosMenuChannelStreamsZZbutton clicked $ e', e) 
let two = 'Channel' 
let three = 'Stream' 
let five = pls.plsv_channelid 
pls_send_message_for_videos(two, three, five) 
});

plsel.plsVideosMenuFollowedClipsZZbutton.addEventListener('click', function(e) {
console.info('plsVideosMenuFollowedClipsZZbutton clicked $ e', e) 
let two = 'Followed' 
let three = 'Clip' 
let five = pls.plsv_channelid 
pls_send_message_for_videos(two, three, five) 
});

plsel.plsVideosMenuFollowedStreamsZZbutton.addEventListener('click', function(e) {
console.info('plsVideosMenuFollowedStreamsZZbutton clicked $ e', e) 
let two = 'Followed' 
let three = 'Stream' 
let five = pls.plsv_channelid 
pls_send_message_for_videos(two, three, five) 
});

plsel.plsVideosMenuCategoryClipsZZbutton.addEventListener('click', function(e) {
console.info('plsVideosMenuCategoryClipsZZbutton clicked $ e', e) 
let two = 'Category' 
let three = 'Clip' 
let five = 'fortnite' 
pls_send_message_for_videos(two, three, five) 
});

plsel.plsVideosMenuCategoryStreamsZZbutton.addEventListener('click', function(e) {
console.info('plsVideosMenuCategoryStreamsZZbutton clicked $ e', e) 
let two = 'Category' 
let three = 'Stream' 
let five = 'fortnite' 
pls_send_message_for_videos(two, three, five) 
});

plsel.plsVideosMenuLoadedVideosSortRandomZZbutton.addEventListener('click', pls_get_random_sorted);
plsel.plsVideosMenuLoadedVideosSortAlphaStreamerZZbutton.addEventListener('click', pls_get_alpha_streamer_sorted);
plsel.plsVideosMenuLoadedVideosSortAlphaTitleZZbutton.addEventListener('click', pls_get_alpha_title_sorted);
plsel.plsVideosMenuLoadedVideosSortDateZZbutton.addEventListener('click', pls_get_date_sorted);
plsel.plsVideosMenuLoadedVideosSortCategoryZZbutton.addEventListener('click', pls_get_category_sorted);
}

function pls_get_random_sorted(e){
if (e && e.preventDefault) { e.preventDefault(); } 
console.info('doing pls_get_random_sorted $ e', e) 
let elemArr = [];
elemArr = plsel.plsVideosMenuWrapperZZdiv.querySelectorAll('.plsVideosMenuContentZZdiv > div');
plsel.plsVideosMenuContentZZdiv.innerHTML = '';
if (elemArr && elemArr.length) {
  elemArr = Array.from(elemArr);
  let sorted = elemArr.sort(pls_comparator_random);
  let arrl = sorted.length;
  for (let i = 0; i < arrl; i++) {
    plsel.plsVideosMenuContentZZdiv.append(sorted[i]);
  }
}
}

// <div data-plsalphastreamer="streamer" data-plsalphatitle="whaaa???" data-plsdate="2025-02-20" data-plscategory="just-chatting"> pls_comparator_alpha
function pls_get_alpha_streamer_sorted(e){
if (e && e.preventDefault) { e.preventDefault(); } 
console.info('doing pls_get_alpha_streamer_sorted $ e', e) 
let elemArr = [];
elemArr = plsel.plsVideosMenuWrapperZZdiv.querySelectorAll('.plsVideosMenuContentZZdiv > div');
  plsel.plsVideosMenuContentZZdiv.innerHTML = ''; 
  if (elemArr && elemArr.length) {
    elemArr = Array.from(elemArr);
    let sorted = elemArr.sort(pls_comparator_alpha_streamer);
    let arrl = sorted.length;
    for (let i = 0; i < arrl; i++) {
      plsel.plsVideosMenuContentZZdiv.append(sorted[i]);
    }
  }
}

function pls_get_alpha_title_sorted(e){
if (e && e.preventDefault) { e.preventDefault(); }
console.info('doing pls_get_alpha_title_sorted $ e', e) 
let elemArr = [];
elemArr = plsel.plsVideosMenuWrapperZZdiv.querySelectorAll('.plsVideosMenuContentZZdiv > div');
plsel.plsVideosMenuContentZZdiv.innerHTML = ''; 
if (elemArr && elemArr.length) {
  elemArr = Array.from(elemArr);
  let sorted = elemArr.sort(pls_comparator_alpha_title);
  let arrl = sorted.length;
  for (let i = 0; i < arrl; i++) {
    plsel.plsVideosMenuContentZZdiv.append(sorted[i]);
  }
}
}

function pls_get_date_sorted(e){
if (e && e.preventDefault) { e.preventDefault(); }
console.info('doing pls_get_date_sorted $ e', e) 
let elemArr = [];
elemArr = plsel.plsVideosMenuWrapperZZdiv.querySelectorAll('.plsVideosMenuContentZZdiv > div');
plsel.plsVideosMenuContentZZdiv.innerHTML = ''; 
if (elemArr && elemArr.length) {
  elemArr = Array.from(elemArr);
  let sorted = elemArr.sort(pls_comparator_date);
  let arrl = sorted.length;
  for (let i = 0; i < arrl; i++) {
    plsel.plsVideosMenuContentZZdiv.append(sorted[i]);
  }
}
}

function pls_get_category_sorted(e){
if (e && e.preventDefault) { e.preventDefault(); }
console.info('doing pls_get_category_sorted $ e', e) 
let elemArr = [];
elemArr = plsel.plsVideosMenuWrapperZZdiv.querySelectorAll('.plsVideosMenuContentZZdiv > div');
plsel.plsVideosMenuContentZZdiv.innerHTML = ''; 
if (elemArr && elemArr.length) {
  elemArr = Array.from(elemArr);
  let sorted = elemArr.sort(pls_comparator_category);
  let arrl = sorted.length;
  for (let i = 0; i < arrl; i++) {
    plsel.plsVideosMenuContentZZdiv.append(sorted[i]);
  }
}
}

function pls_comparator_random(a, b) {
  return Math.random() - 0.5;
}

function pls_comparator_alpha_streamer(a, b) {
  if (a.dataset.plsalphastreamer.toLowerCase() < b.dataset.plsalphastreamer.toLowerCase())
      return -1;
  if (a.dataset.plsalphastreamer.toLowerCase() > b.dataset.plsalphastreamer.toLowerCase())
      return 1;
  return 0;
}

function pls_comparator_alpha_title(a, b) {
  if (a.dataset.plsalphatitle.toLowerCase() < b.dataset.plsalphatitle.toLowerCase())
      return -1;
  if (a.dataset.plsalphatitle.toLowerCase() > b.dataset.plsalphatitle.toLowerCase())
      return 1;
  return 0;
}

function pls_comparator_date(a, b) {
  if (a.dataset.plsdate > b.dataset.plsdate)
      return -1;
  if (a.dataset.plsdate < b.dataset.plsdate)
      return 1;
  return 0;
}

function pls_comparator_category(a, b) {
  if (a.dataset.plscategory.toLowerCase() < b.dataset.plscategory.toLowerCase())
      return -1;
  if (a.dataset.plscategory.toLowerCase() > b.dataset.plscategory.toLowerCase())
      return 1;
  return 0;
}


function pls_send_message_for_videos(two, three, five) {
console.info('doing pls_send_message_for_videos $ 235', two, three, five) 
plsel.plsVideosMenuAZZspan.textContent = '' 
plsel.plsVideosMenuBZZspan.textContent = '' 
plsel.plsVideosMenuContentZZdiv.innerHTML = '' 

let obj = {} 
obj.func = 'pls_get_videos';
obj.one = pls.plsv_serviceid;  
obj.two = two;
obj.three = three;
obj.four = new Date().toISOString().slice(0, 10);
obj.five = five;
obj.six = pls.plsv_channelid;
pls_send_message(obj) 
}



function pls_load_video(e) {
  if (e && e.preventDefault) { e.preventDefault(); }
  console.log('doing pls_load_video', e);
  plsel.plsVideosMenuVideoPlayerZZiframe.src = e.target.href;
  plsel.plsVideosMenuVideoPlayerZZiframe.width = '310';
  plsel.plsVideosMenuVideoPlayerZZiframe.height = '460';
  plsel.plsVideosMenuVideoPlayerZZiframe.seamless = true;
  return false
}

function pls_build_video_feed(videos, requestObj) {
  console.log('1 doing pls_build_video_feed with videos, requestObj', videos, requestObj);
  let arrl = videos.length;
  if (arrl) {
    plsel.plsVideosMenuAZZspan.textContent = requestObj.five + ' ' + requestObj.three + 's'
    plsel.plsVideosMenuBZZspan.textContent = ' from ' +  requestObj.four 
  }
  for (let i = 0; i < arrl; i++) { 
    pls_build_video_feed2(videos[i])
  }
  setTimeout(function() {
    let elemArr = document.body.getElementsByClassName('pls-video-item');
    [].forEach.call(elemArr, function(elem) {
      if (elem) { elem.addEventListener('click', pls_load_video); }
    });
  }, 3000);
}


function pls_build_video_feed2(videoObj) {
console.log('pls_build_video_feed2', videoObj);
if (!videoObj.id) {
  videoObj.id = 0 
}
if (!videoObj.livestream_id) {
  videoObj.livestream_id = 0 
}
if (!videoObj.thumbnail_url) {
  videoObj.thumbnail_url = 'https://kick.com/img/default-profile-pictures/default2.jpeg' 
}
if (!videoObj.channelUsername) {
  videoObj.channelUsername = 'anonymous' 
}
if (!videoObj.channelSlug) {
  videoObj.channelSlug = 'anonymous' 
}
if (!videoObj.channelImg) {
  videoObj.channelImg = 'https://kick.com/img/default-profile-pictures/default2.jpeg' 
}
if (!videoObj.title) {
  videoObj.title = 'clip' 
} 
if (!videoObj.views) {
  videoObj.views = 0 
}
if (!videoObj.duration) {
  videoObj.duration = 0 
} 
if (!videoObj.created_at) {
  videoObj.created_at = '' 
} 
if (!videoObj.categoryName) {
  videoObj.categoryName = 'irl' 
} 
if (!videoObj.categorySlug) {
  videoObj.categorySlug = 'irl' 
} 
if (!videoObj.categoryParent) {
  videoObj.categoryParent = '' 
} 
if (videoObj.id.includes('clip_') ) {
  videoObj.video_url = 'https://kick.com/' + videoObj.channelSlug + '/clips/' + videoObj.id 
}
if (videoObj.id.includes('-') ) {
  videoObj.video_url = 'https://kick.com/' + videoObj.channelSlug + '/videos/' + videoObj.id  
}
if (!videoObj.video_url) {
  videoObj.video_url = 'https://kick.com/rickroller81/clips/clip_01HNKE2HQBYW91W5C9KRAG0R9N' 
} 

let theHTML = '';
theHTML = theHTML + '<div class="group/card relative flex w-full shrink-0 grow-0 flex-col gap-2 lg:gap-0" data-plsalphastreamer="' + videoObj.channelSlug + '" data-plsalphatitle="' + videoObj.title + '" data-plsdate="' + videoObj.created_at + '" data-plscategory="' + videoObj.categorySlug + '">';
theHTML = theHTML + '<div class="group relative aspect-video w-full select-none overflow-hidden rounded">';
theHTML = theHTML + '<button aria-label="Open clip modal" class="relative aspect-video w-full overflow-hidden rounded" type="button">';
theHTML = theHTML + '<div class="z-controls absolute rounded bg-[#070809] bg-opacity-80 px-1.5 py-1 text-xs font-semibold top-1.5 left-1.5">00:' + videoObj.duration + '</div>';
theHTML = theHTML + '<div class="z-controls absolute rounded bg-[#070809] bg-opacity-80 px-1.5 py-1 text-xs font-semibold bottom-1.5 left-1.5"><span title="214">' + videoObj.views + '</span> views</div>';
theHTML = theHTML + '<div class="z-player relative aspect-video w-full">';
theHTML = theHTML + '<div class="z-player absolute inset-0 aspect-video bg-black opacity-0"></div>';
theHTML = theHTML + '<div class="absolute inset-0 z-[202]"></div><img class="top-O absolute left-0 h-full w-full object-cover brightness-110 contrast-[110%] saturate-[110%] transition-[transform]" src="' + videoObj.thumbnail_url + '" sizes="480px" alt="' + videoObj.channelUsername + '" draggable="false" data-thumbnail="true" fetchpriority="low" loading="lazy"></div>';
theHTML = theHTML + '</button>';
theHTML = theHTML + '</div>';
theHTML = theHTML + '<div class="flex w-full flex-row flex-nowrap gap-2 lg:px-1.5 lg:py-2">';
theHTML = theHTML + '<a class="group inline-flex gap-1.5 items-center justify-center rounded font-semibold box-border relative transition-all betterhover:active:scale-[0.98] disabled:pointer-events-none select-none whitespace-nowrap [&amp;_svg]:size-[1em] outline-transparent outline outline-2 outline-offset-2 bg-transparent text-grey-300 [&amp;_svg]:fill-current betterhover:hover:text-white data-[state=active]:text-white !p-0 focus-visible:underline underline-offset-2 disabled:opacity-30 px-3 py-1.5 text-sm h-fit w-fit shrink-0" data-state="active" href="/' + videoObj.channelSlug + '" target="_blank"><img class="size-8 rounded-full" src="' + videoObj.channelImg + '" alt="' + videoObj.channelUsername + '" draggable="false"></a>'; 
theHTML = theHTML + '<div class="flex w-full min-w-0 flex-col items-start">';
theHTML = theHTML + '<button class="group gap-1.5 items-center justify-center rounded font-semibold box-border transition-all betterhover:active:scale-[0.98] disabled:pointer-events-none select-none whitespace-nowrap [&amp;_svg]:size-[1em] outline-transparent outline outline-2 outline-offset-2 bg-transparent text-white [&amp;_svg]:fill-current betterhover:hover:text-white data-[state=active]:text-white [&amp;_svg]:data-[state=active]:fill-green-500 !p-0 focus-visible:underline underline-offset-2 disabled:opacity-30 px-3 py-2 relative line-clamp-1 inline-flex w-fit max-w-full text-sm leading-5" dir="ltr" type="button" title="' + videoObj.title + ' "><a class="pls-video-item max-w-full truncate" href="' + videoObj.video_url + '">' + videoObj.title + '</a></button>';
theHTML = theHTML + '<div class="relative inline-flex max-w-full items-center gap-1 overflow-hidden"><a class="group inline-flex gap-1.5 items-center rounded font-semibold box-border relative transition-all betterhover:active:scale-[0.98] disabled:pointer-events-none select-none whitespace-nowrap [&amp;_svg]:size-[1em] outline-transparent outline outline-2 outline-offset-2 bg-transparent text-grey-300 [&amp;_svg]:fill-current betterhover:hover:text-white data-[state=active]:text-white !p-0 focus-visible:underline underline-offset-2 disabled:opacity-30 px-2 py-1 text-xs min-w-0 max-w-full shrink grow justify-start truncate leading-5" data-state="inactive" target="_blank" href="/category/' + videoObj.categorySlug + '"><span class="truncate" title="' + videoObj.categoryName + '">' + videoObj.categoryName + '</span></a><a class="group gap-1.5 items-center justify-center rounded box-border relative transition-all betterhover:active:scale-[0.98] disabled:pointer-events-none select-none whitespace-nowrap [&amp;_svg]:size-[1em] outline-transparent outline outline-2 outline-offset-2 bg-transparent [&amp;_svg]:fill-current betterhover:hover:text-white data-[state=active]:text-white !p-0 focus-visible:underline underline-offset-2 disabled:opacity-30 px-3 py-1.5 text-neutral inline-flex shrink-0 grow-0 text-xs font-semibold leading-[18px]" data-state="inactive" href="/' + videoObj.categorySlug + '"><span class="max-w-full truncate">·&nbsp;<span title="">' + videoObj.created_at + '</span></span></a></div><a class="group inline-flex gap-1.5 items-center rounded font-semibold box-border relative transition-all betterhover:active:scale-[0.98] disabled:pointer-events-none whitespace-nowrap [&amp;_svg]:size-[1em] outline-transparent outline outline-2 outline-offset-2 bg-transparent text-grey-300 [&amp;_svg]:fill-current betterhover:hover:text-white data-[state=active]:text-white !p-0 focus-visible:underline underline-offset-2 disabled:opacity-30 px-2 py-1 text-xs max-w-full select-auto justify-start leading-5" data-state="active" target="_blank" title="' + videoObj.channelUsername + '" href="/' + videoObj.channelSlug + '"><span class="max-w-full truncate">' + videoObj.channelUsername + '</span></a></div>';
theHTML = theHTML + '<button class="group relative box-border flex shrink-0 grow-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded font-semibold ring-0 transition-all focus-visible:outline-none active:scale-[0.95] disabled:pointer-events-none [&amp;_svg]:size-[1em] bg-transparent focus-visible:outline-grey-300 text-white [&amp;_svg]:fill-current betterhover:hover:bg-surface-tint lg:data-[state=open]:bg-surface-tint data-[state=active]:bg-surface-tint disabled:text-grey-600 disabled:bg-grey-1000 size-6 text-xs" data-state="closed" aria-label="More actions" type="button" id="radix-:r8:" aria-haspopup="menu" aria-expanded="false">';
theHTML = theHTML + '<svg width="32" height="32" viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">';
theHTML = theHTML + '<path d="M19 4H13V10H19V4Z" fill="current"></path>';
theHTML = theHTML + '<path d="M19 13H13V19H19V13Z" fill="current"></path>';
theHTML = theHTML + '<path d="M19 22H13V28H19V22Z" fill="current"></path>';
theHTML = theHTML + '</svg>';
theHTML = theHTML + '</button>';
theHTML = theHTML + '</div>';
theHTML = theHTML + '<div class="betterhover:group-hover/card:opacity-100 absolute bottom-0 left-0 flex items-baseline opacity-0 transition-opacity">';
theHTML = theHTML + '<div class="h-3 w-1 bg-green-500"></div>';
theHTML = theHTML + '<div class="h-1 w-2 bg-green-500"></div>';
theHTML = theHTML + '</div>';
theHTML = theHTML + '<div class="betterhover:group-hover/card:opacity-100 absolute bottom-0 right-0 flex items-baseline opacity-0 transition-opacity">';
theHTML = theHTML + '<div class="h-1 w-2 bg-green-500"></div>';
theHTML = theHTML + '<div class="h-3 w-1 bg-green-500"></div>';
theHTML = theHTML + '</div>';
theHTML = theHTML + '</div>';
plsel.plsVideosMenuContentZZdiv.insertAdjacentHTML('beforeend', theHTML);
}


console.log('videos loaded');