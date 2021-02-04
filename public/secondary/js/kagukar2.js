var msg = new SpeechSynthesisUtterance();
msg.voiceURI = 'native';
msg.volume = 1; // 0 to 1
msg.rate = 1; // 0.1 to 10
msg.pitch = 2; //0 to 2
msg.lang = 'en-US';


const modal_process = document.getElementById("ModalProcess")

window.addEventListener('load', async e => {
  // console.clear()
  await speak('Welcome to Kagukar, I am Kagukar, what would you like to do today? Double tap to start learning')
});


async function speak(message) {
   console.log(message)
   var voices = window.speechSynthesis.getVoices();
   //  msg.voice = voices[10]; // Note: some voices don't support altering params
   msg.text = message;
   msg.onend = function (e) {
     console.log('Finished in ' + event.elapsedTime + ' seconds.');
   };
   window.speechSynthesis.speak(msg);
 }


var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
var text;


 window.addEventListener('dblclick', async e=>{
  modal_process.click()

 

    await speak("Hello, kindly select an option from the following prompt! "+
    '\n 1: Curriculum (contains all the topics included in a subject)' +
    '\n 2: Read (get a topic read to you)' +
    '\n 3: Test (test your knowledge of a subject topic)' +
    '\n 4: Stories (allow me help you relax with a classic story)' +
    '\n 5: Play (play a game with me)' +
    '\n 6: Listen Again' +
    '\n 7: Quit'
    )
   
   speak.onend = e =>{
     console.log("End Talinkg")
   }

    if (!recognizing) {
      await startButton()
    } else {
      await stopButton()
    }
})


 async function speakResponse(e) {
   console.log(e)
   
   if (e == 'curriculum') {
     speak()
   }

   await speak("Kindly respond to the class you would like to learn in " +
     '\n 1: JSS 1' +
     '\n 2: JSS 2' +
     '\n 3: JSS 3' +
     '\n 4: SSS 1' +
     '\n 5: SSS 2' +
     '\n 6: SSS 3' +
     '\n 7: Quit'
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
     final_span.innerHTML = linebreak(final_transcript);
     interim_span.innerHTML = linebreak(interim_transcript);

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