function pls_turn_on_keybinds() {
  console.log('doing pls_turn_on_keybinds')
  plsel.plsChatA.textContent = '';
  plsel.plsChatB.textContent = '';
  plsel.plsChatTitle.classList.add('pls-bl');

  window.addEventListener('keydown', function(e) {
    console.log('keydown', e);
    let b = document.body;

    // 16 left shift toggle the settings menu
    if ( (e.keyCode == '16') && (e.altKey === true) )  {
      console.log('you pressed shift + Alt to toggle the settings menu');
      if (e.preventDefault) { e.preventDefault(); }
      if (plsel.plsSettingsMenu.open) {
        plsel.plsSettingsMenu.close(); return false;
      } else {
        pls_open_settings(); return false;
      }
    }

    // 17 left ctrl toggle the chat menu
    if ( (e.keyCode == '17') && (e.altKey === true) )  {
      console.log('you pressed ctrl + Alt to toggle the chat menu');
      if (e.preventDefault) { e.preventDefault(); }
      plsel.plsChatMenuToggleButton.click(); 
      plsel.plsChatMenuToggleButton.focus();
      return false;
    }

    // 32 space focus chatbox
    if ( (e.keyCode == '32') && (e.altKey === true) )  {
      console.log('you pressed space + Alt to focus the chatbox');
      if (e.preventDefault) { e.preventDefault(); }
      try {
        resp = pls_ws('pls_turn_on_keybinds_chatbox');
      } catch (error) {
        console.error(error); pls_show_error(error);
      }
      return false;
    }

    // 90 z toggle the settings theme menu
    if ( (e.keyCode == '90') && (e.altKey === true) )  {
      console.log('you pressed z + Alt to toggle the settings theme menu');
      if (e.preventDefault) { e.preventDefault(); }
      if (plsel.plsSettingsMenu.open) {
        plsel.plsSettingsMenu.close(); return false;
      } else {
        pls_open_settings(); 
        setTimeout(function() { 
          elemArr = b.getElementsByClassName('pls-theme-menu-summary');
          if (elemArr) { elemArr[0].click(); }
          elemArr = b.getElementsByClassName('sz1c1');
          if (elemArr) { elemArr[0].focus(); }
         }, 1500);
        return false;
      }
    }

    // 88 x toggle the settings Highlight menu
    if ( (e.keyCode == '88') && (e.altKey === true) )  {
      console.log('you pressed x + Alt to toggle the settings Highlight menu');
      if (e.preventDefault) { e.preventDefault(); }
      if (plsel.plsSettingsMenu.open) {
        plsel.plsSettingsMenu.close(); return false;
      } else {
        pls_open_settings(); 
        setTimeout(function() { 
          elemArr = b.getElementsByClassName('pls-highlight-menu-summary');
          if (elemArr) { elemArr[0].click(); }
          elemArr = b.getElementsByClassName('sz2v1');
          if (elemArr) { elemArr[0].focus(); }
         }, 1500);
        return false;
      }
    }

    // 67 c toggle the settings mute menu
    if ( (e.keyCode == '67') && (e.altKey === true) )  {
      console.log('you pressed c + Alt to toggle the settings mute menu');
      if (e.preventDefault) { e.preventDefault(); }
      if (plsel.plsSettingsMenu.open) {
        plsel.plsSettingsMenu.close(); return false;
      } else {
        pls_open_settings();
        setTimeout(function() {
          elemArr = b.getElementsByClassName('pls-mute-menu-summary');
          if (elemArr) { elemArr[0].click(); }
          elemArr = b.getElementsByClassName('sz3b1');
          if (elemArr) { elemArr[0].focus(); }
         }, 1500);
        return false;
      }
    }

    // 86 v toggle the settings hide menu
    if ( (e.keyCode == '86') && (e.altKey === true) )  {
      console.log('you pressed v + Alt to toggle the settings hide menu');
      if (e.preventDefault) { e.preventDefault(); }
      if (plsel.plsSettingsMenu.open) {
        plsel.plsSettingsMenu.close(); return false;
      } else {
        pls_open_settings();
        setTimeout(function() {
          elemArr = b.getElementsByClassName('pls-hide-menu-summary');
          if (elemArr) { elemArr[0].click(); }
          elemArr = b.getElementsByClassName('sz4b1');
          if (elemArr) { elemArr[0].focus(); }
         }, 1500);
        return false;
      }
    }

    // 66 b toggle the settings features menu
    if ( (e.keyCode == '66') && (e.altKey === true) )  {
      console.log('you pressed b + Alt to toggle the settings features menu');
      if (e.preventDefault) { e.preventDefault(); }
      if (plsel.plsSettingsMenu.open) {
        plsel.plsSettingsMenu.close(); return false;
      } else {
        pls_open_settings();
        setTimeout(function() {
          elemArr = b.getElementsByClassName('pls-features-menu-summary');
          if (elemArr) { elemArr[0].click(); }
          elemArr = b.getElementsByClassName('sz5b21');
          if (elemArr) { elemArr[0].focus(); }
         }, 1500);
        return false;
      }
    }

    // 78 n toggle the settings saved menu
    if ( (e.keyCode == '78') && (e.altKey === true) )  {
      console.log('you pressed n + Alt to toggle the settings saved menu');
      if (e.preventDefault) { e.preventDefault(); }
      if (plsel.plsSettingsMenu.open) {
        plsel.plsSettingsMenu.close(); return false;
      } else {
        pls_open_settings(); 
        setTimeout(function() {
          elemArr = b.getElementsByClassName('pls-saved-menu-summary');
          if (elemArr) { elemArr[0].click(); }
          elemArr = b.getElementsByClassName('pls-saved-accordion-1');
          if (elemArr) { elemArr[0].focus(); }
         }, 1500);
        return false;
      }
    }

    // 77 m toggle the settings simulcast menu
    if ( (e.keyCode == '77') && (e.altKey === true) )  {
      console.log('you pressed m + Alt to toggle the settings simulcast menu');
      if (e.preventDefault) { e.preventDefault(); }
      if (plsel.plsSettingsMenu.open) {
        plsel.plsSettingsMenu.close(); return false;
      } else {
        pls_open_settings(); 
        setTimeout(function() {
          elemArr = b.getElementsByClassName('pls-features-menu-summary');
          if (elemArr) { elemArr[0].click(); }
          elemArr = b.getElementsByClassName('sz5b2');
          if (elemArr) { elemArr[0].focus(); }
         }, 1500);

        return false;
      }
    }


    if ( (e.keyCode == '81') && (e.altKey === true) )  {
      console.log('you pressed Q + Alt to toggle Broadcaster Messages Only');
      if (e.preventDefault) { e.preventDefault(); }
      pls_toggle_chats('owner');
      return false;
    }
    if ( (e.keyCode == '87') && (e.altKey === true) )  {
      console.log('you pressed W + Alt to toggle Moderator Messages Only');
      if (e.preventDefault) { e.preventDefault(); }
      pls_toggle_chats('moderator');
      return false;
    }
    if ( (e.keyCode == '69') && (e.altKey === true) )  {
      console.log('you pressed E + Alt to toggle Sub Messages Only');
      if (e.preventDefault) { e.preventDefault(); }
      pls_toggle_chats('sub');
      return false;
    }
    if ( (e.keyCode == '82') && (e.altKey === true) )  {
      console.log('you pressed R + Alt to toggle Sub + Moderator Messages Only');
      if (e.preventDefault) { e.preventDefault(); }
      pls_toggle_chats('mod_sub');
      return false;
    }
    if ( (e.keyCode == '84') && (e.altKey === true) )  {
      console.log('you pressed T + Alt to toggle VIP Only');
      if (e.preventDefault) { e.preventDefault(); }
      pls_toggle_chats('vip');
      return false;
    }
    if ( (e.keyCode == '89') && (e.altKey === true) )  {
      console.log('you pressed Y + Alt to toggle Donation Chats Only');
      if (e.preventDefault) { e.preventDefault(); }
      pls_toggle_chats('donation');
      return false;
    }
    if ( (e.keyCode == '85') && (e.altKey === true) )  {
      console.log('you pressed U + Alt to toggle Mention Messages Only');
      if (e.preventDefault) { e.preventDefault(); }
      pls_toggle_chats('mention');
      return false;
    }
    if ( (e.keyCode == '73') && (e.altKey === true) )  {
      console.log('you pressed I + Alt to toggle Hashtag Messages Only');
      if (e.preventDefault) { e.preventDefault(); }
      pls_toggle_chats('hashtag');
      return false;
    }
    if ( (e.keyCode == '79') && (e.altKey === true) )  {
      console.log('you pressed O + Alt to toggle OG Messages Only'); 
      if (e.preventDefault) { e.preventDefault(); }
      pls_toggle_chats('og');
      return false;
    }
    if ( (e.keyCode == '80') && (e.altKey === true) )  {
      console.log('you pressed P + Alt to toggle text only chat');  // pls13
      if (e.preventDefault) { e.preventDefault(); }
      pls_chat_text_only();
      return false;
    }
    if ( (e.keyCode == '219') && (e.altKey === true) )  {
      console.log('you pressed [ + Alt to  View Top of Chat'); // pls14
      if (e.preventDefault) { e.preventDefault(); }
      pls_chat_up_to_top();
      return false;
    }
    if ( (e.keyCode == '221') && (e.altKey === true) )  {
      console.log('you pressed ] + Alt to  View Bottom of Chat'); // pls15
      if (e.preventDefault) { e.preventDefault(); }
      pls_chat_down_to_bottom();
      return false;
    }
    if ( (e.keyCode == '220') && (e.altKey === true) )  {
      console.log('you pressed  + Alt to  Change Chat Font Size'); // pls20
      if (e.preventDefault) { e.preventDefault(); }
      pls_chat_font_size();
      return false;
    }
    return false;
  });
}


// Show/Hide Live Stream Chat
function pls_user_command1() {
  console.log('doing pls_user_command1')
  return false;
}

// Show/Hide Recorded Live Stream Chat
function pls_user_command2() {
  console.log('doing pls_user_command2')
  return false;
}

// Search This Live Stream Chat
function pls_user_command3() {
  console.log('doing pls_user_command3')
  return false;
}

// Search All Recorded Live Stream Chat
function pls_user_command4() {
  console.log('doing pls_user_command4')
  return false;
}

if (pls && pls.b && pls.b.sz5b13) {
  pls_turn_on_keybinds();
}