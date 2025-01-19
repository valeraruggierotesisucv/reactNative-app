export function formatHour(date: Date): string {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${minutesStr} ${ampm}`;
}

export function convertTimeToDate(timeStr: string){
    // Obtener la fecha actual
    let currentDate = new Date();

    // Dividir la hora y los minutos (y el AM/PM)
    let [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");

    // Convertir horas según AM/PM
    if(modifier === "PM" && hours !== "12") {
        hours = parseInt(hours) + 12; // Convertir PM a 24 horas
    } else if(modifier === "AM" && hours === "12") {
        hours = 0; // Convertir 12 AM a 00
    }

    // Establecer la hora y los minutos en la fecha actual
    currentDate.setHours(hours);
    currentDate.setMinutes(minutes);
    currentDate.setSeconds(0); // Opcional: setear los segundos a 0

    return currentDate;
}