var synth = window.speechSynthesis;
// var synth = window.speechSynthesis;
var chosenOption;
var menuOption = 0; //main menu 0, next 1
var msg = new SpeechSynthesisUtterance();
msg.voiceURI = 'native';
msg.volume = 1; // 0 to 1
msg.rate = 1; // 0.1 to 10
msg.pitch = 2; //0 to 2
msg.lang = 'en-US';

 var final_transcript = '';
 var recognizing = false;
 var ignore_onend;
 var start_timestamp;
 var text;

const mainMenu = 'Hello, kindly select an option at the end of the following prompt! ' +
  '\n 1: Curriculum: (collections topics included in a subject)' +
  // '\n 2: Read (get a topic read to you)' +
  '\n 2: Test: (test your knowledge of a subject topic)' +
  '\n 3: Stories: (allow me help you relax with a classic story)' +
  '\n 4: Play: (play a game with me)' +
  '\n 5: Listen Again' +
  '\n 6: Quit';

const classMenu = e => {
  return (
    "You selected " + e + "! Kindly respond to the class you would like to learn in " +
      '\n 1: JSS 1' +
      '\n 2: JSS 2' +
      '\n 3: JSS 3' +
      '\n 4: SSS 1' +
      '\n 5: SSS 2' +
      '\n 6: SSS 3' +
      '\n 7: Quit'
  )
}


const modal_process = document.getElementById("ModalProcess")
const menu_process = $("#menuDisplay")

window.addEventListener('load', async e => {
  // console.clear()
  speechSynthesis.cancel()
  const welcome = 'Welcome to Kagukar, what would you like to do today? Triple tap to start learning';
  if(window.location.pathname === '/'){
    await speak(welcome)
  }
});


async function speak(message, func, start_func) {
   var voices = synth.getVoices();
   msg.text = message;
   msg.onstart = start_func
   msg.onend = func;
   msg.onboundary = onboundaryHandler;
   synth.speak(msg);

 }

 const openModalFunc = async e =>{
    if (!$("#processModal").hasClass('show')) {
      return modal_process.click();
   };
 }

const speechEnd = async e => {
setTimeout(async ()=>{
  openModalFunc();

  if (!recognizing) {
    await startButton()
  } else {
    await stopButton()
  }
}, 2000)
}





window.addEventListener('click', async e=>{

  if(e.detail != 3){
    return
  }
  speechSynthesis.cancel();
 
  if(window.location.pathname === '/' || menuOption == 0){

     await speak(mainMenu, speechEnd, menu_process.slideDown());
     menuOption = 1;

  }else if(window.location.pathname.includes('resources')){
    chosenOption = window.location.pathname.split('/')[2];
    await speak("mainMenu", speechEnd)
  }
})

const read = e =>{
  console.log(e)
}






 async function speakResponse(e) {

  menu_process.fadeOut()

  if (e.includes('curriculum') || e.includes('one') || e.includes('1')) {
    chosenOption = 'curriculum';
  } else if (e.includes('test') || e.includes('two') || e.includes('2')) {
     chosenOption = 'test'
   } else if (e.includes('read') || e.includes('three') || e.includes('3')) {
      chosenOption = 'read'
    } else if (e.includes('play') || e.includes('four') || e.includes('4')) {
       chosenOption = 'play'
    } else if (e.includes('main menu') || e.includes('listen again') || e.includes('five') || e.includes('5')) {
      // chosenOption = 'main menu';
      return speak(mainMenu, speechEnd);
    }

    
    var loc = window.location.pathname;

    if(!loc.includes(chosenOption)){      
      return window.location.href = '/resources/' + chosenOption
    }else {
      alert("Same Location")
    }
   

   

   await speak(classMenu(chosenOption), async e =>{

     }
   )
 }


modal_process.addEventListener('click', (e) => {
  // console.log('I got clicked')
})









 if (!('webkitSpeechRecognition' in window)) {
   upgrade();
 } else {
   var recognition = new webkitSpeechRecognition();
  //  recognition.continuous = true;
   recognition.interimResults = true;

   recognition.onstart = function (e) {
     recognizing = true;
    //  console.log("Start")
    //  console.log(e)
     // showInfo('info_speak_now');
   }

   recognition.onerror = function (event) {
     if (event.error == 'no-speech') {
       // start_img.src = '/intl/en/chrome/assets/common/images/content/mic.gif';
       // showInfo('info_no_speech');
      //  console.log('info_no_speech');
       ignore_onend = true;
     }
     if (event.error == 'audio-capture') {
       // start_img.src = '/intl/en/chrome/assets/common/images/content/mic.gif';
       // showInfo('info_no_microphone');
      //  console.log('info_no_microphone');
       ignore_onend = true;
     }
     if (event.error == 'not-allowed') {
       if (event.timeStamp - start_timestamp < 100) {
         // showInfo('info_blocked');
        //  console.log('info_blocked');
       } else {
         // showInfo('info_denied');
        //  console.log('info_denied');
       }
       ignore_onend = true;
     }
   };


   recognition.onend = function () {
     recognizing = false;
     if (ignore_onend) {
       return;
     }
     // start_img.src = '/intl/en/chrome/assets/common/images/content/mic.gif';
     if (!final_transcript) {
       // showInfo('info_start');
      //  console.log('info_start');
       return;
     }
     // showInfo('');
     if (window.getSelection) {
       window.getSelection().removeAllRanges();
       var range = document.createRange();
      //  console.log("range")
      //  console.log(range)
       range.selectNode(document.getElementById('final_span'));
       window.getSelection().addRange(range);
     }
   };


   recognition.onresult = async (event) => {
     var interim_transcript = '';
    // console.log(event)

     if (typeof (event.results) == 'undefined') {
       recognition.onend = null;
       recognition.stop();
       upgrade();

        setTimeout(() => {
          recognition.start();
        }, 3000);
       return;
     }

     for (var i = event.resultIndex; i < event.results.length; ++i) {
       if (event.results[i].isFinal) {
         final_transcript += event.results[i][0].transcript;
          
         text = event.results[i][0].transcript;
          await speakResponse(text)
       } else {
         interim_transcript += event.results[i][0].transcript;
       }
     }

    //  console.log(final_transcript)
    //  console.log(interim_transcript)
    

     final_transcript = capitalize(final_transcript);
    //  final_span.innerHTML = linebreak(final_transcript);
    //  interim_span.innerHTML = linebreak(interim_transcript);

        final_span.value = linebreak(final_transcript);
        interim_span.value = linebreak(interim_transcript);

     // if (final_transcript || interim_transcript) {
     //   showButtons('inline-block');
     // }

   };


 }


 var two_line = /\n\n/g;
 var one_line = /\n/g;

 function linebreak(s) {
   return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
 }

 var first_char = /\S/;

 function capitalize(s) {
   return s.replace(first_char, function (m) {
     return m.toUpperCase();
   });
 }


 async function startButton() {
   if (recognizing) {
     recognition.stop();
     return;
   }

   final_transcript = '';
   recognition.lang = 'en-NG';
   // recognition.lang = select_dialect.value;
   recognition.start();
 }

 
 async function stopButton(){
    window.speechSynthesis.cancel();
    recognition.stop();
    return;
  
 }



















var fback = new SpeechSynthesisUtterance();
fback.voiceURI = 'native';
fback.volume = 1; // 0 to 1
fback.rate = 1; // 0.1 to 10
fback.pitch = 2; //0 to 2
fback.lang = 'en-US';

async function warn(message) {
  // console.log(message)

  //  msg.voice = voices[10]; // Note: some voices don't support altering params


  //  speechSynthesisInstance.cancel()
  // speechSynthesis.cancel()

  fback.text = message;
  fback.onend = function (e) {
    console.log('Finished in ' + event.elapsedTime + ' seconds.');
  };

  synth.speak(fback);
}



var toReplay;
 //to read content from respective resources
 $('.listen').click(e => {

   if (synth.speaking) {
        synth.cancel()
   }

   var read = $(e.target).parents('.event-info').find('.read-content')
  //  var display = $(e.target).parents('.event-info').find('.display-content')
   var toRead = read.text();
  //  var toDisplay = display.text();
  toReplay = toRead;

  //  modal_process.click();
  openModalFunc()

    $('#options').show();
  $('#final_span').show();
  $('#final_span_read').hide()
   $('#final_span').val(toRead)

   speak(toRead);
 })


  $('.read').click(e => {
    if (synth.speaking) {
      synth.cancel()
    }
    var display = $(e.target).parents('.event-info').find('.display-content')
    var toDisplay = display.text();

    openModalFunc()

    
    $('#options').hide();
    $('#final_span').hide();
    $('#final_span_read').show()
    $('#final_span_read').html(toDisplay)
  })

































 var utterance = new SpeechSynthesisUtterance();
 utterance.lang = 'en-UK';
 utterance.rate = 1;

//  document.getElementById('playButton').onclick = function () {
//    var text = document.getElementById('textarea').value;
//    // create the utterance on play in case user called stop
//    // reference https://stackoverflow.com/a/47276578/441016
//    utterance = new SpeechSynthesisUtterance();
//    utterance.onboundary = onboundaryHandler;
//    utterance.text = text;
//    speechSynthesis.speak(utterance);
//  };

  $("#resume").hide();


 document.getElementById('play').onclick = function () {
    if (speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  speak(toReplay);
 };

 document.getElementById('pause').onclick = function (e) {
   if (speechSynthesis) {
     window.speechSynthesis.pause();
   }
  $("#pause").hide();
  $("#resume").show();
 };

 document.getElementById('resume').onclick = function (e) {
   if (speechSynthesis) {
     window.speechSynthesis.resume();
   }

  $("#resume").hide();
  $("#pause").show();

 };

 document.getElementById('stop').onclick = function () {
   if (speechSynthesis) {
     window.speechSynthesis.cancel();
   }
  modal_process.click()
 };

 function onboundaryHandler(event) {
   var textarea = document.getElementById('final_span');
   var value = textarea.value;
   var index = event.charIndex;
   var word = getWordAt(value, index);
   var anchorPosition = getWordStart(value, index);
   var activePosition = anchorPosition + word.length;

   textarea.focus();

   if (textarea.setSelectionRange) {
     textarea.setSelectionRange(anchorPosition, activePosition);
   }
    else {
     var range = textarea.createTextRange();
     range.collapse(true);
     range.moveEnd('character', activePosition);
     range.moveStart('character', anchorPosition);
     range.select();
   }
 };

 // Get the word of a string given the string and index
 function getWordAt(str, pos) {
   // Perform type conversions.
   str = String(str);
   pos = Number(pos) >>> 0;

   // Search for the word's beginning and end.
   var left = str.slice(0, pos + 1).search(/\S+$/),
     right = str.slice(pos).search(/\s/);

   // The last word in the string is a special case.
   if (right < 0) {
     return str.slice(left);
   }

   // Return the word, using the located bounds to extract it from the string.
   return str.slice(left, right + pos);
 }

 // Get the position of the beginning of the word
 function getWordStart(str, pos) {
   str = String(str);
   pos = Number(pos) >>> 0;

   // Search for the word's beginning
   var start = str.slice(0, pos + 1).search(/\S+$/);
   return start;
 }