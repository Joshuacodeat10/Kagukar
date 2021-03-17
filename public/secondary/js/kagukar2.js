// console.log = function(){

// }


var synth = window.speechSynthesis;
// var synth = window.speechSynthesis;
var chosenOption;
var menuOption = 0; //main menu 0, next 1
var msg = new SpeechSynthesisUtterance();
msg.voiceURI = 'native';
msg.volume = 1; // 0 to 1
msg.rate = 0.8; // 0.1 to 10
// msg.pitch = 2; //0 to 2
// msg.speakingRate = 1
msg.pitch = 0; //0 to 2
// msg.lang = 'en-US';
msg.lang = 'en-GB';

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

const shortCut = 'Kagukar Quicklinks! ' +
  '\n 1: press C or 1 for Curriculum: (collections topics included in a subject)' +
  // '\n 2: Read (get a topic read to you)' +
  '\n 2: press T or 2 for take a Test: (test your knowledge of a subject topic)' +
  '\n 3: press S or 3 to read Stories: (allow me help you relax with a classic story)' +
  '\n 4: press P or 4 to Play a game ' +
  '\n 5: press L or 5 to Listen Again' +
  '\n 6: press Q or 6 to Quit';

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

const subjectMenu = e => {
  return (
    "You selected "+e+" Kindly respond to the subject you would like to take" +
    '\n 1: Agriculture' +
    '\n 2: Basic Science' +
    '\n 3: Basic Technology' +
    '\n 4: Civic Education' +
    '\n 5: English Language' +
    '\n 6: Mathematics' +
    '\n 7: Social Studies' +
    '\n 8: Quit'
  )
}


const modal_process = document.getElementById("ModalProcess")
const menu_process = $("#menuDisplay")


var quickLink;

window.addEventListener('load', async e => {
  // console.clear()
  speechSynthesis.cancel()
  stopButton()
  const welcome = 'Welcome to Kagukar, what would you like to do today? press key X to get a list of the available shortcuts or Triple tap to start learning';
  if(window.location.pathname === '/'){
    await speak(welcome)
  }

  if(window.location.pathname === '/resources/test'){
      $("#test-options").show();
  }
   if (window.location.pathname.match(/resources/gi)) {
     return readTitles()

   }



});
const readTitles = async e =>{
    var title = $(".event-title a")

    var titles = ["Welcome,"+(title.length>1 ? " Kindly select from the following Topics":" There's only one content for this category")];

      for (var i = 0; i < title.length; i++) {
        // '\n 1: Agriculture' +
        console.log(title[i].text)
        titles.push("\n " + [i+1] + ", " + title[i].text);
      }
   
    
    // console.log(titles.toString())
    const speakTitles = titles.toString()
    await speak(speakTitles, readTitleEnd)
}


const readTitleEnd = async () =>{
  // $('#options').hide();

  // openModalFunc();
  // menu_process.slideUp()

  if (!recognizing) {
    await startButton()
  } else {
    await stopButton()
  }
}




async function speak(message, func, start_func) {
   var voices = synth.getVoices();
  //  console.log(voices);
   
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
// setTimeout(async ()=>{
  $('#options').hide();

  openModalFunc();
  menu_process.slideUp()

  if (!recognizing) {
    await startButton()
  } else {
    await stopButton()
  }
// }, 2000)
}

var level = 0;
var classLink
const classSpeechEnd = async e =>{
  level = 1
  const k = await keyResponse(0);
  console.log(k);
 if(level < 2){ 
   if (k == 1) {
     classLink = 'JSS 1'
   } else if (k == 2) {
     classLink = 'JSS 2'
   } else if (k == 3) {
     classLink = 'JSS 3'
   } else if (k == 4) {
     classLink = 'SSS 1'
   } else if (k == 5) {
     classLink = 'SSS 2'
   } else if (k == 6) {
     classLink = 'SSS 3'
   } else if (k == 'q' || k == "Q" || k == 0) {
      level = 0;
      await speak(classMenu(chosenOption), classSpeechEnd)
   }}

   $("#class-filter-form").val(classLink)
   $("#select2-class-filter-form-container").text(classLink)
   
   await speak(subjectMenu(classLink))
   
   const s = await keyResponse();
    console.log(s)

    $("#class-filter-form").val(classLink)
    $("#select2-class-filter-form-container").text(classLink)

}

function keyResponse(){
  return new Promise((resolve) =>{
    document.addEventListener('keydown', onKeyHandler);
    function onKeyHandler(e) {
      // console.log("Resolver")
      // console.log(e)
        resolve(e.key);
    }
  })
}

const subjectSpeechEnd = async e => {
   level = 2;
    const res = await keyResponse(10000);
    console.log("Response "+ res)
}



window.addEventListener('click', async e=>{

  if(e.detail != 3){
    return
  }
  speechSynthesis.cancel();
  stopButton()
 
  if(window.location.pathname === '/' || menuOption == 0){

    //  await speak(mainMenu, speechEnd, menu_process.slideDown());
    await menuFunction()
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


     if (!loc.includes(chosenOption) && chosenOption !== undefined) {
       return redirecting(chosenOption)
     }
  //  else {
  //     console.log("Same Location")
  //   }
   

    if(chosenOption == undefined){
      return
    }

   

   await speak(classMenu(chosenOption), speechEnd)

 }

 function redirecting(chosenOption){
   if(chosenOption !== 'home'){
      return window.location.href = '/resources/' + chosenOption;
   }else{
      return window.location.href = '/';
   }
 }


modal_process.addEventListener('click', (e) => {
  // console.log('I got clicked')
})



// var inputing = false

var typingTimer; //timer identifier
var doneTypingInterval = 3000; //time in ms, 5 second for example
var $input = $('input');
var inputing = false

$input.on('keyup', e=>{
  clearTimeout(typingTimer);
  // console.log("Start")
  inputing = true
  typingTimer = setTimeout(doneTyping, doneTypingInterval);
})

//on keydown, clear the countdown 
$input.on('keydown', function () {
  clearTimeout(typingTimer);
});

//user is "finished typing," do something
async function doneTyping() {
  //do something
  // console.log("DOne ")
  inputing = false
}


const menuFunction = async e =>{
  $("#final_read_span").text(" ")
  $("#test-options").hide()
  await speak(mainMenu, speechEnd, menu_process.slideDown());
}

document.onkeypress = async ({key}) => {

 if (inputing)  return;

  if(level > 0){
    return 
  }
  var e = key;
  if (e == 'c' || e == 'C') {
    quickLink = 'curriculum';
  } else if (e == 't' || e == 'T') {
    quickLink = 'test'
  } else if (e == 'r' || e == 'R') {
    quickLink = 'read'
  } else if (e == 'p' || e == 'P') {
    quickLink = 'play'
  } else if (e == 'h' || e == 'H') {
    quickLink = 'home'
  } else if (e == 's' || e == 'S') {
    quickLink = 'stories'
  } else if (e == 'm' || e == 'M') {
     speechSynthesis.cancel()
    menuFunction()
    return
  } else if (e == 'k' || e == 'K') {
      chosenOption = window.location.pathname.split('/')[2];
      await speak(classMenu(chosenOption), classSpeechEnd)
      return
      // level = 1

  } else if (e == 'x' || e == 'X') {

   await speak(shortCut, speechEnd)
   return
}else {
    quickLink = null
    return
  }

  console.log("Chosen " + quickLink);
 
  redirecting(quickLink);
  
}























var fback = new SpeechSynthesisUtterance();
fback.voiceURI = 'native';
fback.volume = 1; // 0 to 1
fback.rate = 0.8; // 0.1 to 10
fback.pitch = 2; //0 to 2
// fback.lang = 'en-US';
fback.lang = 'en-IN';

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
        stopButton()
   }

   var read = $(e.target).parents('.event-info').find('.read-content')
  //  var display = $(e.target).parents('.event-info').find('.display-content')
   var toRead = read.text();
  //  var toDisplay = display.text();
  toReplay = toRead;

  //  modal_process.click();
  openModalFunc();

        targetItem(e)

     $("#test-options").hide()
    $('#options').show();
  $('#final_span').show();
  $('#final_span_read').hide()
   $('#final_span').val(toRead)

   speak(toRead);
 })


  $('.read').click(e => {
    if (synth.speaking) {
      synth.cancel()
      stopButton()
    }
    var display = $(e.target).parents('.event-info').find('.display-content')
    var toDisplay = display.text();

    targetItem(e)

    openModalFunc()
   
     $("#test-options").hide()
     $('#options').hide();
    $('#final_span').hide();
    $('#final_span_read').show()
    $('#final_span_read').html(toDisplay)
  })


  var testAnswer, qstIndex = 0, answered = false, questions, correct = 0, wrong = 0, activeExercise = false;
  $('.take-test').click(async e => {
     activeExercise = true
     if (synth.speaking) {
       synth.cancel()
       stopButton()
     }
     qstIndex = 0, answered = false,
     questions = undefined, correct = 0, wrong = 0;
    //  var display = $(e.target).parents('.event-info').find('.display-content')
    //  var toDisplay = display.text();

    questions = await targetItem(e)
    $("#test-options").show()

       var prompt =
    (window.location.pathname.split('/')[2] == 'test'?
     "Welcome, your test starts in" +
         "\n 4" +
         "\n 3" +
         "\n 2" +
         "\n 1": 'Kindly relax as I take you on this Journey ');

       await speak(prompt, speechEnd)

    // await openModalFunc();

     

    //  var optA = $(e.target).attr('data-optA')
    //  var optB = $(e.target).attr('data-optB')
    //  var optC = $(e.target).attr('data-optC')
    //  var optD = $(e.target).attr('data-optD')
    //  testAnswer = $(e.target).attr('data-answer')
     
    //  console.log(optA +" "+optB)
 

     $("#test-options").show()
     $('#options').hide();
     $('#final_span').hide();
     $('#final_span_read').show()
    //  $('#final_span_read').html(toDisplay)
     return (questions.length > 0 && setQuestion(e.target, questions))
   })




const testEnd = e =>{
  $("#stop").click();
  // modal_process.click()
}

const setQuestion = async () =>{
  if (qstIndex >= questions.length) {

    const score = (correct / questions.length)*100;
    const average = score >= 50 ? " Good Job, Keep it up ": " Nice Try, You can do better "
    const report = "You have come to the end of the Test"+
                "\n  Here's your score" +
                "\n  You got " + correct + " " + (correct > 1 ? " questions " : " question ") + " correctly"+
                "\n  You missed " + wrong + " " + (wrong > 1 ? " questions " : " question ") + 
                "\n  out of a total of " + questions.length + " " + (questions.length > 1 ? " questions " : " question ")+
                " \n You scored a total percentage of " +score +"% "+
                "\n  " + average 

    await speak(report, testEnd)
     activeExercise = false
    return false
  }

  var readQst = 
  (window.location.pathname.split('/')[2] == 'test' ?
   "Question " + (qstIndex + 1) +
    "\n" + questions[qstIndex].question +
    "\n A "+ questions[qstIndex].optionA + 
    "\n B " + questions[qstIndex].optionB +
    "\n C " + questions[qstIndex].optionC +
    "\n D " + questions[qstIndex].optionD
   : (qstIndex + 1))


    $('#final_span_read').html(questions[qstIndex].question)
    $("#optA p").text(questions[qstIndex].optionA)
    $("#optB p").text(questions[qstIndex].optionB)
    $("#optC p").text(questions[qstIndex].optionC)
    $("#optD p").text(questions[qstIndex].optionD)
    testAnswer = questions[qstIndex].answer;

    await speak(readQst, voiceResponse)
}

const voiceResponse = async e => {
  $('#options').hide();
  openModalFunc();
  menu_process.slideUp();

  if (!recognizing) {
    await startButton()
  } else {
    await stopButton()
  }
}

const answerResponse = async e =>{
  const resWord = e.split(" ", 1)[0];

  const options = [questions[qstIndex].optionA, questions[qstIndex].optionB,
                  questions[qstIndex].optionC, questions[qstIndex].optionD, questions[qstIndex].answer]

  console.log(options)

  console.log(resWord)
  if (options[0].toLowerCase() == resWord || options[1].toLowerCase() == resWord 
  || options[2].toLowerCase() == resWord || options[3].toLowerCase() == resWord || ['a', 'b','c','d'].includes(resWord)) {
    console.log("Valid option");
      await attempt(resWord)
  }
  // else{
  //   setQuestion()
  // }
  
  // if (resWord == options[5]){
  //   console.log("Correct")
  //     await speak('Correct', speechEnd)
  //     // await speak('You have entered an incorrect option ', setQuestion)
  // }else{

  // }

  
}

$('.optionTest').click(async e => {
console.log(testAnswer)

const res = await attempt(e.target)

console.log(res);

//  $(e.target).removeClass('correct');
//  $(e.target).removeClass('wrong');

})

const attempt = async e =>{

   return new Promise(async (resolve) => {

  window.speechSynthesis.cancel();
  stopButton()

  if (qstIndex >= questions.length) {
    return
  }

  console.log(e)

   var optA =  $("#optA p").text(questions[qstIndex].optionA)
   var optB = $("#optB p").text(questions[qstIndex].optionB)
   var optC = $("#optC p").text(questions[qstIndex].optionC)
   var optD = $("#optD p").text(questions[qstIndex].optionD)

  if (!answered) {
    if (testAnswer == $(e).text() || testAnswer.toLowerCase() == e || 
      e == 'a' && questions[qstIndex].optionA == testAnswer || e == 'b' && questions[qstIndex].optionB == testAnswer ||
         e == 'c' && questions[qstIndex].optionC == testAnswer || e == 'd' && questions[qstIndex].optionD == testAnswer
    ) {
      correct += 1;
      $(e).addClass('correct');

      await speak('Correct', speechEnd)
    } else {
      wrong += 1
      $(e).addClass('wrong')
      await speak('Incorrect', speechEnd)
    }
    answered = true;
  }
  

     resolve(setTimeout(() => {
           answered = false;
           qstIndex += 1;
           $(e).removeClass('correct');
           $(e).removeClass('wrong');
           return setQuestion();
         }, 5000));

     })
}


const targetItem = async (e) =>{
  var id = $(e.target).attr('data-id');
  var title = $(e.target).attr('data-title');
    console.log(id + " " + title)

 await  $('#itemid').val(id)
  await $('#itemTitle').val(title)
 await $('#itemType').val('test')
  const type = $('#itemType').val()
  console.log($("#itemType").val());

 const res = await submitTarget(type);
 return res
}

const submitTarget= async (type) =>{
    // $('#submitTarget').trigger('click')
    var result
      await $.ajax({
       url: "/engage",
       method: "POST",
       data: $("#targetItem").serialize(),
       dataType: "JSON",
       success: async (res) => {
        result = (type == 'test' && await res.questions)
       },
       error: function (err) {
        }
       })
       return result
}


const getQuestions = async () =>{
    $.ajax({
      url: "/engage",
      method: "POST",
      data: $("#targetItem").serialize(),
      dataType: "JSON",
      success: function (res) {

      },
      error: function (err) {}
    })
}






























 var utterance = new SpeechSynthesisUtterance();
//  utterance.lang = 'en-UK';
 utterance.lang = 'en-IN';
 utterance.rate = 0.8;

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
     stopButton()

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
     stopButton()
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


























const popupCenter = ({
  url,
  title,
  w,
  h
}) => {
  // Fixes dual-screen position                             Most browsers      Firefox
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

  const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

  const systemZoom = width / window.screen.availWidth;
  const left = (width - w) / 2 / systemZoom + dualScreenLeft
  const top = (height - h) / 2 / systemZoom + dualScreenTop
  const newWindow = window.open(url, title,
    `
      scrollbars=yes,
      width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left}
      `
  )

  if (window.focus) newWindow.focus();
}

$('#edit-profile').on('click', ()=>{
  // window.open('/', 'myWindow','top=0, height=100%, width=50%')
  popupCenter({url: '/update/profile', title: 'xtf', w: 500, h: 600}); 
})





//SPEECH TAKE IN
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

        if (!activeExercise) {
          await speakResponse(text)
        }else{
          await answerResponse(text)
        }

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


async function stopButton() {
  window.speechSynthesis.cancel();
  recognition.stop();
  return;

}
