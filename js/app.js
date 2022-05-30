const modalToggle = document.getElementById("toggleInsertModal");
const modalInsert = document.getElementById("modalInsert");
const closeInsertModal = document.getElementById('closeInsertModal');

const showRegisterModal = ()=>{
    modalInsert.classList.toggle('is-active');
}

modalToggle.addEventListener('click', showRegisterModal )
closeInsertModal.addEventListener('click',showRegisterModal)