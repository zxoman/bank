var socket = io("http://localhost:3000");
// add question
function get_src() {
  var data = CKEDITOR.instances.text.getData();
  return data;
}

var add = () => {
  var form = document.forms[0].elements;
  question = {
    class: form.class.value,
    term: form.term.value,
    unit: form.unit.value,
    lesson: form.lesson.value,
    type_a: form.type.value,
    difficulty: form.difficulty.value,
    text: get_src(),
    answer: $("#text_area").val(),
  };
  if ($("#type").val() == "text") {
    question.answer = $("#text_area").val();
  } else {
    question.answer = $("input:radio[name=ans]:checked").val();
  }
  socket.emit("add_questions", question);
  console.log(question);
};

get_data = () => {
  var form = document.forms[0].elements;
  arr = ["class", "term", "unit", "lesson", "type_a", "difficulty", "id"];
  data = {};
  for (let index = 0; index < arr.length; index++) {
    console.log(arr[index]);
    if (form[arr[index]].value != "") {
      data[arr[index]] = form[arr[index]].value;
    }
  }
  console.log(data);
  socket.emit("get_data", data);
};
var dataq = {};
socket.on("get_data", (d) => {
  $("#data").html("");
  dataq = d;
  set_data(0);
});
del = (id) => {
  console.log(id);
  socket.emit("del_question", id);
};

socket.on("del", (d) => {
  get_data();
});

set_data = (ni) => {
  for (let nin = ni; nin < ni + 5; nin++) {
    const element = dataq[nin];
    console.log(element.id,idsz.indexOf(element.id));
    if (idsz.indexOf(element.id) > -1) {
      sel = "checked";
    } else {
      sel = "";
    }
    console.log(sel);
    $("#data").append(`<div class="qu">
      <div>
        <button class="but1 del" onclick="del(${element.id})">delete</button><input type="checkbox" ${sel} onclick="ziad(${element.id})">
        <a href='/edit.html?id=${element.id}'><button class="but1 edi">edit</button></a>
      </div>
      ${element.text}

      </div>`);
  }
};

const container = document.getElementById("data");
var ni = 5;

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  console.log({ scrollTop, scrollHeight, clientHeight });

  if (clientHeight + scrollTop >= scrollHeight - 5) {
    // show the loading animation
    set_data(ni);
    ni += 5;
  }
});
