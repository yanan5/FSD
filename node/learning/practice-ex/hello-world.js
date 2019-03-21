setTimeout(() => {
  console.log("World");
}, 2000);
console.log("Hello");
function foo() {
  debugger;
  return 1 + 2;
}
foo();
