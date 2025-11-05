//localStorage.clear()

let arr = localStorage.getItem("arr") ? JSON.parse(localStorage.getItem("arr")) : [];
display(arr);

function display(arr) {
  let res = "";
  arr.forEach((ele, index) => {
    let icon = ele.completed ? "bi-check-circle-fill text-success" : "bi-circle";
    let textDecoration = ele.completed ? "text-decoration-line-through text-muted" : "";

    res += `
    <div id="task" class="tas d-flex align-items-center justify-content-between p-2" data-index="${index}">
      <div class="d-flex align-items-center gap-2">
        <i id='circle' class="fs-3 ${icon}" data-index="${index}"></i>
        <span class="abc fs-5 m-2 ${textDecoration}">${ele.text}</span>
      </div>
      <div class="ms-auto d-flex align-items-center gap-3 icons">
        <i class="del bi bi-x-circle-fill text-danger fs-4" data-index="${index}"></i>
        <img data-index="${index}" class="reset" width="30" src="images/update-icon-refresh-or-repeat-sign-vector-11657652.jpg">
      </div>
    </div>`;
  });
  document.getElementById("tasks").innerHTML = res;
}


let edit_index = null;
let add = document.getElementById("add");
let input = document.getElementById("input");

document.getElementById("tasks").addEventListener("click", (event) => {
  let index = event.target.dataset.index;

  if (event.target.classList.contains("del")) {
    arr.splice(index, 1);
    localStorage.setItem("arr", JSON.stringify(arr));
    display(arr);
  }


  if (event.target.classList.contains("reset")) {
    event.target.classList.add("rotate");
    setTimeout(() => event.target.classList.remove("rotate"), 600);
    add.innerText = "UPDATE";
    edit_index = index;
    input.value = arr[index].text;
  }
if (event.target.id === "circle") {
    let index = event.target.dataset.index;
    arr[index].completed = !arr[index].completed;
    localStorage.setItem("arr", JSON.stringify(arr));
    display(arr);
}

})

document.getElementById("add").addEventListener("click", () => {
  if (input.value.trim() === "") {
    alert("Please enter a task");
    return;
  }

  if (add.innerText === "ADD") {
    arr.push({ text: input.value, completed: false });
  } else {
    arr[edit_index].text = input.value;
    add.innerText = "ADD";
    edit_index = null;
  }

  input.value = "";
  localStorage.setItem("arr", JSON.stringify(arr));
  display(arr);
});
console.log(arr)