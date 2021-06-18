let a = 6;
let b = "Hello";

console.log(a);
let inputIn = document.querySelector("input.input-in");
let button = document.querySelector("button");
let out = document.querySelector("div.out");

button.onclick = function () {
  let b = inputIn.value;
  console.log("IT'S ALIVE!");
  console.log(b);

  out.innerHTML = b;
};
