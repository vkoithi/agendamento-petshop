import { addAppointment, isTimeOccupied } from "./schedules.js"
import { closeScheduleModal } from "./modal.js"

const form = document.querySelector(".form")

// Evento para captar o submit do formulário.
form.addEventListener("submit",(event) => {
    event.preventDefault()

     const data = new FormData(form)
     const tutor = data.get("tutor-name")
     const pet = data.get("pet-name")
     const phone = data.get("phone-number")
     const description = data.get("services")
     const date = data.get("schedule")
     const hour = data.get("hour")

     // Verifica se o campo não está vazio e informa o alert.
     if (tutor.trim() === "") {
          alert("Informe o nome do tutor.")
          return 
     }

     if (pet.trim() === "") {
          alert("Informe o nome do pet.")
          return
     }

     if (phone.trim() === "") {
          alert("Informe um número de telefone.")
          return
     }

     const phoneNumbers = phone.replace(/\D/g, "")

     if (phoneNumbers.length !== 10 && phoneNumbers.length !== 11){
          alert("Informe um número válido.")
          return
     }

     if (description.trim() === "") {
          alert("Informe a descrição do serviço")
          return
     }

     if (date.trim() === "") {
          alert("Informe a data do agendamento.")
          return
     }

     const today = new Date()
     const year = today.getFullYear()
     const month = today.getMonth() + 1
     const day = today.getDate()

     const formattedMonth = String(month).padStart(2, "0")
     const formattedDay = String(day).padStart(2, "0")

     const formattedDate = `${year}-${formattedMonth}-${formattedDay}`

     if (date < formattedDate) {
          alert("Não é possível agendar em datas passadas.")
          return
     }

     if (hour.trim() === "") {
          alert("Informe o horário de agendamento.")
          return
     }

     const currentHour = today.getHours()
     const currentMinutes = today.getMinutes()
     
     const formattedHour = String(currentHour).padStart(2, "0")
     const formattedMinutes = String(currentMinutes).padStart(2, "0")
     const formattedTime = `${formattedHour}:${formattedMinutes}`

     if (date === formattedDate && hour <= formattedTime) {
          alert("Não é possível agendar em horários que já passaram.")
          return
     } 

     let period 

     if (hour >= "13:00" && hour <= "18:00") {
          period = "afternoon"
     } else if (hour >= "09:00" && hour <= "12:00") {
          period = "morning"
     } else if (hour >= "19:00" && hour <= "21:00") {
          period = "night"
     } else {
          alert("Informe outro horário.")
          return
     }

    // Verifica se o horário já está ocupado.
    if (isTimeOccupied(date, hour)) {
        alert("Este horário já está ocupado.")
        return
    }

    // Cria o objeto com os dados do agendamento.
    const appointment = {
        tutor,
        pet,
        phone,
        description,
        date,
        hour,
        period
    }

    // Adiciona o agendamento.
    addAppointment(appointment)

    // Limpa os campos do formulário.
    form.reset()

    // Fecha o formulário e devolve o foco para o botão de agendamento.
    closeScheduleModal()

    const parts = date.split("-")

    const formattedAppointmentDate = `${parts[2]}/${parts[1]}/${parts[0]}`

    alert(`Agendamento realizado com sucesso para ${formattedAppointmentDate}, às ${hour}!`)
})

