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