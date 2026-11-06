const buttonSchedule = document.querySelector("#button-schedule")
const modal = document.querySelector(".modal-overlay")
const closeModal = document.querySelector("#close-modal")
const tutorName = document.querySelector("#tutor-name")

// Abre o Modal
buttonSchedule.addEventListener("click", () => {
    modal.classList.remove("hide")
    
    tutorName.focus()
})

// Fecha o Modal
closeModal.addEventListener("click", () => {
    closeScheduleModal()
})

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("hide")){
        closeScheduleModal()
    }    
})

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeScheduleModal()
    }
})

export function closeScheduleModal() {
    modal.classList.add("hide")
    buttonSchedule.focus()
}