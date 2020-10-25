const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

const toDos = []; //toDo 객체들을 담을 배열

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  // 여기서 JSON.stringify(toDos)) 를 사용하는 이유는 자바 스크립트는 local storage 에 있는 모든 데이터를 string으로 저장하려 함.
  // JSON.stringify 는 자바스크립트 object를 string으로 바꿔줌.
}

function paintToDo(text) {
  const li = document.createElement("li"); //html에 없는 태그를 생성할 때
  const delBtn = document.createElement("button");
  const newId = toDos.length + 1;
  delBtn.innerHTML = "❌";
  const span = document.createElement("span");
  span.innerText = text;
  li.appendChild(delBtn);
  // append 메소는 노드를 현재 위치에서 새로운 위치로 이동시킴. 여기서는 delBtn을 li로 이동시킨다는 의미. delBtn이 li로 옮겨 질때
  // li의 마지막 자식으로 이동 됨.
  li.appendChild(span);
  toDoList.appendChild(li);
  li.id = newId; // li들에게 id를 할당
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj); //toDo 객체들을 toDos에 push
  saveToDos(); // 자바 스크립트는 local storage 에 있는 모든 데이터를 string으로 저장하려 함.
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      //forEach 는 array 안에 각 요소들이 실행하는 것을 인자로 전달하는 함수. 인자로 전달된 함수는 람다랑 비슷한 것 같음.
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
