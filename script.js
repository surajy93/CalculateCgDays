function calculateAttendance() {
    const monthYear = document.getElementById('monthYear').value;
    const leaveDays = document.getElementById('leaveDays').value;
    const attendancePercentage = document.getElementById('attendancePercentage').value;

    if (monthYear && leaveDays !== "" && attendancePercentage !== "") {
        const year = parseInt(monthYear.split('-')[0]);
        const monthIndex = parseInt(monthYear.split('-')[1]) - 1;
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

        let totalWorkingDays = 0;
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, monthIndex, day);
            const dayOfWeek = date.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Exclude Sundays (0) and Saturdays (6)
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
