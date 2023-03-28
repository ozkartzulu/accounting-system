export const fixDate = date => {
    if(date === ''){
        return ''
    }
    const newDate = new Date(date)
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }
    return newDate.toLocaleDateString('es-ES', options)
}

// get current date format 'yyyy-mm'
export const currentDate = () => {
    const date = new Date()
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const year = date.getFullYear()
    return `${year}-${month}`;
}

// get current year format 'yyyy'
export const currentYear = () => {
    const date = new Date()
    return date.getFullYear();
}

export const generateKey = () => {
    const random = Math.random().toString(36).substring(2)
    const date = Date.now().toString(36)
    return random + date 
}

export const getMonthLiteral = (id) => {
    const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    const name = months[id]
    return name
}

export const weekCount = (year, month_number) => {

    // month_number is in the range 1..12

    var firstOfMonth = new Date(year, month_number-1, 1);
    var lastOfMonth = new Date(year, month_number, 0);

    var used = firstOfMonth.getDay() + lastOfMonth.getDate();

    return Math.ceil( used / 7);
}

export const parseDates = (inp) => {
    let year = parseInt(inp.slice(0,4), 10);
    let week = parseInt(inp.slice(6), 10);
  
    let day = (1 + (week - 1) * 7); // 1st of January + 7 days for each week
  
    let dayOffset = new Date(year, 0, 1).getDay(); // we need to know at what day of the week the year start
  
    dayOffset--;  // depending on what day you want the week to start increment or decrement this value. This should make the week start on a monday
  
    let days = [];
    for (let i = 0; i < 5; i++) // do this 7 times, once for every day
      days.push(new Date(year, 0, day - dayOffset + i)); // add a new Date object to the array with an offset of i days relative to the first day of the week
    return days;
  }