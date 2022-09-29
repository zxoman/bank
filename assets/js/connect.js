var socket = io("http://localhost:3000");
// add question
var add = () => {
  var form = document.forms[0].elements
  question = {
    class: form.class.value,
    term: form.term.value,
    unit: form.unit.value,
    lesson: form.lesson.value,
    type_a: form.type.value,
    difficulty: form.difficulty.value,
    text: $('#text').html(),
    "1": $('#ans1').html(),
    "2": $('#ans2').html(),
    "3": $('#ans3').html(),
    "4": $('#ans4').html(),
    answer: $('#text_area').val()
  }; 
  if ($('#type').val() == "text") {
    question.answer = $('#text_area').val();
  } else {
    question.answer = $('input:radio[name=ans]:checked').val();
  }
  socket.emit('add_questions', question);
  console.log(question)
}
var select_type = (e) => {
  if (e.value == "text") {
    $('#choices').hide();
    $('#text_area').show();
  } else {
    $('#choices').show();
    $('#text_area').hide();
  }
}