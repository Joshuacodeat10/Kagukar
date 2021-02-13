var synth = window.speechSynthesis;
// var synth = window.speechSynthesis;

var msg = new SpeechSynthesisUtterance();
msg.voiceURI = 'native';
msg.volume = 1; // 0 to 1
msg.rate = 1; // 0.1 to 10
msg.pitch = 2; //0 to 2
msg.lang = 'en-US';


const modal_process = document.getElementById("ModalProcess")

window.addEventListener('load', async e => {
  // console.clear()




  speechSynthesis.cancel()
  const welcome = 'Welcome to Kagukar, I am Kagukar, what would you like to do today? Triple tap to start learning';
  await speak(welcome)
});


async function speak(message, func) {
  //  console.log(message)
   var voices = synth.getVoices();
   //  msg.voice = voices[10]; // Note: some voices don't support altering params


  //  speechSynthesisInstance.cancel()
  // speechSynthesis.cancel()

   msg.text = message;
   msg.onend = func;
  //  function (e) {
    //  console.log('Finished in ' + event.elapsedTime + ' seconds.');
    console.log(func)
  //  };
   msg.onboundary = onboundaryHandler;
   synth.speak(msg);
 }












 



var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
var text;


 window.addEventListener('click', async e=>{

  if(e.detail != 3){
    return
  }


  speechSynthesis.cancel()
 

    await speak(("Hello, kindly select an option from the following prompt! "+
    '\n 1: Curriculum (contains all the topics included in a subject)' +
    '\n 2: Read (get a topic read to you)' +
    '\n 3: Test (test your knowledge of a subject topic)' +
    '\n 4: Stories (allow me help you relax with a classic story)' +
    '\n 5: Play (play a game with me)' +
    '\n 6: Listen Again' +
    '\n 7: Quit'),  async e => {
      console.log("End Talking")
      modal_process.click();

      if (!recognizing) {
        await startButton()
      } else {
        await stopButton()
      }
    }
  )
   
   

    
})

const read = e =>{
  console.log(e)
}


var chosenOption;

 async function speakResponse(e) {
   console.log(e)

  //  var options = ['curriculum', 'test', 'read', 'story', 'play'];
  if (e.includes('curriculum')){
    chosenOption = 'curriculum'
  }
   if (e.includes('test')) {
     chosenOption = 'test'
   }

    if (e.includes('read')) {
      chosenOption = 'read'
    }

     if (e.includes('play')) {
       chosenOption = 'play'
     }


     alert(chosenOption)
   

   

   await speak("You selected " + chosenOption + "! Kindly respond to the class you would like to learn in " +
     '\n 1: JSS 1' +
     '\n 2: JSS 2' +
     '\n 3: JSS 3' +
     '\n 4: SSS 1' +
     '\n 5: SSS 2' +
     '\n 6: SSS 3' +
     '\n 7: Quit', async e =>{

     }
   )
 }


modal_process.addEventListener('click', (e) => {
  console.log('I got clicked')
})









 if (!('webkitSpeechRecognition' in window)) {
   upgrade();
 } else {
   var recognition = new webkitSpeechRecognition();
  //  recognition.continuous = true;
   recognition.interimResults = true;

   recognition.onstart = function (e) {
     recognizing = true;
     console.log("Start")
     console.log(e)
     // showInfo('info_speak_now');
   }

   recognition.onerror = function (event) {
     if (event.error == 'no-speech') {
       // start_img.src = '/intl/en/chrome/assets/common/images/content/mic.gif';
       // showInfo('info_no_speech');
       console.log('info_no_speech');
       ignore_onend = true;
     }
     if (event.error == 'audio-capture') {
       // start_img.src = '/intl/en/chrome/assets/common/images/content/mic.gif';
       // showInfo('info_no_microphone');
       console.log('info_no_microphone');
       ignore_onend = true;
     }
     if (event.error == 'not-allowed') {
       if (event.timeStamp - start_timestamp < 100) {
         // showInfo('info_blocked');
         console.log('info_blocked');
       } else {
         // showInfo('info_denied');
         console.log('info_denied');
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
       console.log('info_start');
       return;
     }
     // showInfo('');
     if (window.getSelection) {
       window.getSelection().removeAllRanges();
       var range = document.createRange();
       console.log("range")
       console.log(range)
       range.selectNode(document.getElementById('final_span'));
       window.getSelection().addRange(range);
     }
   };


   recognition.onresult = async (event) => {
     var interim_transcript = '';
    console.log(event)

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

     console.log(final_transcript)
     console.log(interim_transcript)
    

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
 $('.read').click(e => {

   if (synth.speaking) {
        synth.cancel()
    //    setTimeout(() => {
    //      console.log("I got here");
    // synth.pause(msg)
    //       warn("Yes, May I continue?")
    //    }, 5000);
   }
  

   var read = $(e.target).parent('.event-info').find('.read-content')
   var display = $(e.target).parent('.event-info').find('.display-content')
   var toRead = read.text();
   var toDisplay = display.text();

  //  console.log(msg.speaking);
  toReplay = toRead;
   
  

   modal_process.click();

  //  $('#final_span').resizable()
  //  $('#final_span').autoResize()
   $('#final_span').html(toRead)


   speak(toRead);
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