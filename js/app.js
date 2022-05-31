import { saveUser, getUsers, onGetUsers, deleteUser, getUser, updateUser } from "./firebase.js";

const modalToggle = document.getElementById("toggleInsertModal");
const modalInsert = document.getElementById("modalInsert");
const closeInsertModal = document.getElementById("closeInsertModal");
const insertForm = document.getElementById("insertForm");
const userContainer = document.getElementById("user-container");

let editStatus = false;
let currentId = '';

// interaccion modal
const showRegisterModal = () => {
  modalInsert.classList.toggle("is-active");
};

modalToggle.addEventListener("click", showRegisterModal);
closeInsertModal.addEventListener("click", showRegisterModal);

window.addEventListener("DOMContentLoaded", async () => { 
    onGetUsers((data) => {
        let html = '';
        let i = 1;        
        data.forEach(element => {
            const user = element.data();            
            html += `
                <tr>
                    <th>${i}</th>
                    <th>${user.name}</th>
                    <th>${user.flastname}</th>
                    <th>${user.slastname}</th>
                    <th>${user.phone}</th>
                    <th>${user.email}</th>
                    <th>
                    <button class="button is-warning is-rounded button-edit" data-id="${element.id}">
                        <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button class="button is-danger is-rounded button-delete" data-id="${element.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                    </th>
                </tr>
            `
            i++;
        });        
        userContainer.innerHTML = html;

        const btnsDelete = document.querySelectorAll(".button-delete")

        btnsDelete.forEach(btn =>{
            btn.addEventListener('click',({target :{dataset}})=>{                
                deleteUser(dataset.id);
            })
        })

        const btnsEdit = document.querySelectorAll(".button-edit")

        btnsEdit.forEach(btn=>{
            btn.addEventListener('click', async ({target : {dataset}}) =>{
                const doc = await getUser(dataset.id)
                const user = doc.data()

                insertForm["name"].value = user.name;
                insertForm["flastname"].value = user.flastname;
                insertForm["slastname"].value = user.slastname;
                insertForm["phone"].value = user.phone;
                insertForm["email"].value = user.email;
                insertForm["description"].value = user.description;

                showRegisterModal()

                editStatus = true;
                currentId = dataset.id;                
            })
        })
    });
});

insertForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = insertForm["name"].value;
  const flastname = insertForm["flastname"].value;
  const slastname = insertForm["slastname"].value;
  const phone = insertForm["phone"].value;
  const email = insertForm["email"].value;
  const description = insertForm["description"].value;

  if (!editStatus) {
      saveUser(name, flastname, slastname, phone, email, description);
    } else {
        updateUser(currentId, {name, flastname, slastname, phone, email, description});
        editStatus = false;
  }

  showRegisterModal();
});
