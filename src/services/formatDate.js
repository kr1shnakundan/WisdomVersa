export const formatDate = (dateString) =>{
    const options = {year: "numeric", month: "long", day:"numeric"}
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("eng-US",options)

    const hour = date.getHours();
    const minutes = date.getMinutes();
    const period = hour >= 12 ? "AM" : "PM";
    const formattedTime = `${hour % 12 || 12 }:${minutes.toString().padStart(2,"0")} ${period}`

}