let elForm = document.querySelector(".site-form");
let elChooseInput = document.querySelector(".choose-input");
let elChooseImg = document.querySelector(".choose-img");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

elChooseImg.src = null
elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  let todo = {
    id: todos[todos.length - 1]?.id ? todos[todos.length - 1].id + 1 : 1,
    title: evt.target.todoInput.value,
    isComplated: false,
    image: elChooseImg.src,
  };
  todos.push(todo);
  evt.target.reset();
  renderTodos(todos, elForm.nextElementSibling);
  localStorage.setItem("todos", JSON.stringify(todos));
  elChooseImg.src = null;
  elChooseImg.classList.remove("h-[200px]");
});

function renderTodos(arr, list) {
  list.innerHTML = null;
  arr.forEach((item, index) => {
    let elItem = document.createElement("li");
    elItem.className = ` bg-white${
      item.isComplated ? "line-through opacity-[70%] cursor-not-allowed" : ""
    } duration-300 p-5 rounded-md`;
    elItem.innerHTML = `
        <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
        <label>
        <input id="complate" class="hidden" type="checkbox" >
        <div onclick="handleCheckClick(${
          item.id
        })"  id="complate"  class="w-[20px] relative flex items-center justify-center h-[20px] rounded-full border-[1px]  border-slate-500">
        <div id="complate" class="${
          item.isComplated ? "bg-red-900" : ""
        } absolute inset-[1.2px] mx-auto rounded-full "></div>
        </div>
        </label>
            <strong>${index + 1}.</strong>
            <p>${item.title}</p>
        </div>

            <div class = "flex items-center gap-2"> 
                <button id="edit" onclick="handleEditBtn(${
                  item.id
                })" class="w-[100px] h-[30px] bg-blue-500 hover:bg-blue-600 text-white rounded-[5px]">Edit</button>
                <button onclick="handleDeleteBtn(${
                  item.id
                })" class="w-[100px] h-[30px] bg-red-500 hover:bg-red-600 text-white rounded-[5px]">Delete</button>
            </div>
        </div>
        <img class = "mt-5 ${
          item.image.includes("null") ? "hidden" : ""
        } rounded-md h-[300px]" src=${item.image} alt="todo img" />
        `;
    list.appendChild(elItem);

    elItem.addEventListener("click", function (e) {
      if (e.target.id == "delete") {
        todos.splice(index, 1);
        renderTodos(todos, elForm.nextElementSibling);
        localStorage.setItem("todos", JSON.stringify(todos));
      } else if (e.target.id == "edit") {
        if (!item.isComplated) {
          let newValue = prompt(item.title);
          todos[index].title = newValue;
          renderTodos(todos, elForm.nextElementSibling);
          localStorage.setItem("todos", JSON.stringify(todos));
        }
      }
    });
  });
}
renderTodos(todos, elForm.nextElementSibling);

function handleDeleteBtn(id) {
  let deleteIndex = todos.findIndex((item) => item.id == id);
  todos.splice(deleteIndex,1)
  renderTodos(todos, elForm.nextElementSibling);
  localStorage.setItem("todos", JSON.stringify(todos));
}
console.log(elChooseInput);

elChooseInput.addEventListener("change", function(e) {
  elChooseImg.src = URL.createObjectURL(e.target.files[0]);
  elChooseImg.classList.add("h-[200px]");
});
