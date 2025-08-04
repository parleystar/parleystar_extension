/* SPDX-FileCopyrightText: © 2025 promising future digital media llc. All rights reserved. <admin@parleystar.com> */
/* SPDX-License-Identifier: Mozilla Public License 1.1 (MPL-1.1) */
// ************** START VOICE functions
console.log('loading voice.js');

function pls_chat_speak(str){
  if (str) {
    let strMatch = str.toLowerCase().trim();
    let arr = scbt.s.scbtfeature12.split(',');
    let arrl = arr.length;
    for (let i = 0; i < arrl; i++) {
      let str2 = arr[i];
      let str2Match = str2.toLowerCase().trim();
      if ( strMatch.includes(str2Match) ) {
        if ( scbt.a.spokenWords.includes(str) ) {  } else {
          scbt.a.spokenWords.push(str);
          let synth = window.speechSynthesis;
          let voices = synth.getVoices();
          let utterance = new SpeechSynthesisUtterance(t);
          utterance.voice = voices[0];
          synth.speak(utterance);
          utterance.addEventListener('start', e => {
            console.log('speak start of ' + str);
          });
          utterance.addEventListener('end', e => {
            console.log('speak end of ' + str);
            return false;
          });
        }
      }
    }
  }
}

function pls_turn_off_voice_commands(){
  window.recognition = null;
  window.SpeechRecognition = null;
  window.SpeechGrammarList = null;
  window.SpeechRecognitionEvent = null;
}

function pls_turn_on_voice_commands(){
  window.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
  window.recognition.continuous = true;
  window.recognition.lang = 'en-US';
  window.recognition.interimResults = false;
  window.recognition.maxAlternatives = 1;
  window.recognition.start();

  window.recognition.onresult = function(e) {
    if (e) {
      let str = e.results[e.results.length - 1][0].transcript;
      if (str) {
        str = str.replace(/[^a-zA-Z0-9_\-@\s]/g, '');
        str = str.trim();
        str = str.toLowerCase();
        
        if (str == 'computer toggle chat') {
          pls_command1(); return false;
        }
        if (str == 'computer search chat') {
          pls_command2(); return false;
        }
        if (str == 'computer search all chat') {
          pls_command4(); return false;
        }
        if (str == 'computer chat top') {
          pls_chat_up_to_top(); return false;
        }
        if (str == 'computer chat bottom') {
          pls_chat_down_to_bottom(); return false;
        }
      }
    }
  }

  window.recognition.onspeechend = function(e) {
    // console.log('onspeechend speech');
    window.recognition.stop();
    pls_turn_off_voice_commands();
    pls_turn_on_voice_commands();
  }

  window.recognition.onnomatch = function(e) {
    // console.log('onnomatch speech');
  }

  window.recognition.onerror = function(e) {
    console.error('on speech error', e);
    pls_turn_off_voice_commands();
    pls_turn_on_voice_commands();
  }
}

// ************** END VOICE functions