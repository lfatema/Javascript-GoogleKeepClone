const addBtn = document.querySelector("#add");

//storing data on a local storage
const updateLocalStorageData = () => {
  const textAreaData = document.querySelectorAll("textarea");
  const notes = [];

  textAreaData.forEach((note) => {
    return notes.push(note.value);
  });

  localStorage.setItem("notes", JSON.stringify(notes));
};

const addNewNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");

  const htmlData = `
    <div class="operation">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="" ${text ? "hidden" : ""}" ></textarea> `;

  note.insertAdjacentHTML("afterbegin", htmlData);
  document.body.appendChild(note);

  //Define note references
  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");
  const mainDiv = note.querySelector(".main");
  const textarea = note.querySelector("textarea");

  //delete a note
  deleteBtn.addEventListener("click", () => {
    note.remove();
    updateLocalStorageData();
  });

  //Toggle Edit note
  textarea.value = text;

  editBtn.addEventListener("click", () => {
    mainDiv.classList.toggle("hidden");
    textarea.classList.toggle("hidden");
  });

  textarea.addEventListener("change", (event) => {
    const value = event.target.value;
    mainDiv.innerHTML = value;

    updateLocalStorageData();
  });
};

//getting data from Local storage
const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => addNewNote(note));
}

addBtn.addEventListener("click", () => addNewNote());
