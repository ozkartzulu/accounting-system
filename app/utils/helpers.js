export const fixDate = date => {
    const newDate = new Date(date)
    const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }
    return newDate.toLocaleDateString('es-ES', options)
}

export const generateKey = () => {
    const random = Math.random().toString(36).substring(2)
    const date = Date.now().toString(36)
    return random + date 
}