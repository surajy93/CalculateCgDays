function calculateAttendance() {
    const monthYear = document.getElementById('monthYear').value;
    const leaveDays = document.getElementById('leaveDays').value;
    const attendancePercentage = document.getElementById('attendancePercentage').value;

    if (monthYear && leaveDays !== "" && attendancePercentage !== "") {
        const year = parseInt(monthYear.split('-')[0]);
        const monthIndex = parseInt(monthYear.split('-')[1]) - 1;
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

        const holidays = getIndianHolidays(year, monthIndex);
        let totalWorkingDays = 0;
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, monthIndex, day);
            const dayOfWeek = date.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6 && !holidays.includes(day)) { // Exclude Sundays, Saturdays, and holidays
                totalWorkingDays++;
            }
        }

        const adjustedDays = totalWorkingDays - leaveDays;
        const requiredAttendance = Math.ceil(adjustedDays * (attendancePercentage / 100));
        document.getElementById('result').innerText = `You need to attend ${requiredAttendance} days.`;
    } else {
        document.getElementById('result').innerText = 'Please select a month and year, enter the number of leave days, and the attendance percentage.';
    }
}

function getIndianHolidays(year, month) {
    const holidays = {
        0: [1, 14, 26], // January: New Year's Day, Makar Sankranti, Republic Day
        1: [12, 19], // February: Guru Ravidas Jayanti, Chhatrapati Shivaji Maharaj Jayanti
        2: [8, 13, 14], // March: International Women's Day, Holika Dahan, Holi
        3: [6, 10, 14], // April: Ram Navami, Mahavir Jayanti, Dr Ambedkar Jayanti
        4: [1], // May: Maharashtra Day
        5: [], // June: No major holidays
        6: [], // July: No major holidays
        7: [15], // August: Independence Day
        8: [2], // September: Ganesh Chaturthi
        9: [2, 24], // October: Gandhi Jayanti, Dussehra
        10: [12], // November: Diwali
        11: [25] // December: Christmas
    };
    return holidays[month] || [];
}
