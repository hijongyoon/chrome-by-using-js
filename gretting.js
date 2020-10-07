const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault(); //기본적인 event의 행동이 금지
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  // 여기서 SHOWING_CN 을 넣어주는 이유는 paintGreeting은 currentUser가 null이 아닐때만 호출되는데 index.css 에서 greetings의 display를 none
  // 이라고 하여 currentUser가 있다면 none을 해지해야하기 때문. 그래서 SHOWING_CN이 가지는 class 이름을 넣고 index.css에 있는 것처럼 showing이라는 클래스
  // 이름을 가지는 것은 display: block 처리 해 놓은 것.
  greeting.innerText = `Hello ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
