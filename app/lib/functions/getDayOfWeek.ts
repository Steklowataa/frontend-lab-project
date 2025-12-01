const getDayOfWeek = ({startDate} : {startDate: string}) => {
    const date = new Date(startDate);

    const dayOfWeek = date.getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const shorts = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    const daysOfWeek = []
    for (let i = 0; i < 7; i++) {
        const newDay = new Date(date);
        newDay.setDate(date.getDate() + i);

        const dayIndex = newDay.getDay();
        daysOfWeek.push({
            data: newDay.toISOString().split('T')[0],
            day: days[dayIndex],
            short: shorts[dayIndex],
            month: newDay.getDate()
        })
    }
    return daysOfWeek
}

export default getDayOfWeek;