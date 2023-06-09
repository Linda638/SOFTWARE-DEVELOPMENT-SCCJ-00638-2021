// Get the current date
const currentDate = new Date();

// Variables to store the current month and year
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let selectedDate = null;

// Object to store reminders
const reminders = {};

// Array to store highlighted dates
const highlightedDates = [];

// Function to generate the calendar grid
function generateCalendar() {
  // Get the element for the calendar grid
  const calendarGrid = document.getElementById('calendarGrid');
  // Clear the existing calendar grid
  calendarGrid.innerHTML = '';

  // Set the current month and year in the calendar header
  const currentMonthElement = document.getElementById('currentMonth');
  currentMonthElement.textContent = getMonthName(currentMonth) + ' ' + currentYear;

  // Get the first day of the month
  const firstDay = new Date(currentYear, currentMonth, 1);
  // Get the number of days in the month
  const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Generate calendar days
  for (let i = 1; i <= lastDay; i++) {
    const calendarDay = document.createElement('div');
    calendarDay.classList.add('calendar-day');
    calendarDay.textContent = i;
    calendarDay.addEventListener('click', function() {
      selectDate(calendarDay, i);
    });

    // Check if a reminder exists for the current date
    if (reminders[currentYear]?.[currentMonth]?.[i]) {
      calendarDay.classList.add('highlighted');
    }

    calendarGrid.appendChild(calendarDay);
  }
}

// Function to get the month name
function getMonthName(month) {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  return monthNames[month];
}

// Function to select a date
function selectDate(element, date) {
  selectedDate = date;
  const selectedDay = new Date(currentYear, currentMonth, date);
  const selectedDateString = getMonthName(currentMonth) + ' ' + date + ', ' + currentYear;
  const reminder = reminders[currentYear]?.[currentMonth]?.[date];
  const reminderText = reminder ? `Reminder: ${reminder[0].text} at ${reminder[0].time}` : 'No reminder';
  alert(`Selected Date: ${selectedDateString}\n${reminderText}`);
  addReminder(element);
  // Add class to highlight the selected date
  element.classList.add('highlighted');
}

// Function to add a reminder for the selected date
function addReminder(element) {
  const reminderText = prompt('Enter a reminder:');
  if (reminderText) {
    showTimeDialog(reminderText, element);
  }
}

// Function to show the time dialog
function showTimeDialog(reminderText, element) {
  const timeDialogOverlay = document.getElementById('time-dialog-overlay');
  const timeDialog = document.getElementById('time-dialog');
  const timeInput = document.getElementById('timeInput');
  timeInput.value = '';

  // Display the time dialog
  timeDialogOverlay.style.display = 'block';
  timeDialog.style.display = 'block';

  // Set the focus on the time input field
  timeInput.focus();

  // Update the time dialog label
  document.getElementById('time-dialog-label').textContent = 'Enter the reminder time (HH:MM) in 24-hour clock system:';

  // Event listener for the "Set Time" button
  document.getElementById('set-time-btn').addEventListener('click', function() {
    const time = timeInput.value.trim();
        // Validate the time format
        const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
        if (timeRegex.test(time)) {
          if (!reminders[currentYear]) {
            reminders[currentYear] = {};
          }
          if (!reminders[currentYear][currentMonth]) {
            reminders[currentYear][currentMonth] = {};
          }
          if (!reminders[currentYear][currentMonth][selectedDate]) {
            reminders[currentYear][currentMonth][selectedDate] = [];
          }
          reminders[currentYear][currentMonth][selectedDate].push({
            text: reminderText,
            time: time
          });
          alert(`Reminder added: ${reminderText} at ${time}`);
    
          // Show reminders at the bottom
          showReminders();
        } else {
          alert('Invalid time. Please enter a valid time (HH:MM) in 24-hour clock system.');
        }
    
        // Hide the time dialog
        timeDialogOverlay.style.display = 'none';
        timeDialog.style.display = 'none';
      });
    
      // Event listener for the "Cancel" button
      document.getElementById('cancel-btn').addEventListener('click', function() {
        // Hide the time dialog
        timeDialogOverlay.style.display = 'none';
        timeDialog.style.display = 'none';
      });
    }
    // Function to add a reminder for the selected date
function addReminder(element) {
  const reminderText = prompt('Enter a reminder:');
  if (reminderText) {
    const timeInput = prompt('Enter the reminder time (HH:MM) in 24-hour clock system:');
    if (timeInput) {
      const reminderTime = timeInput.trim();

      // Validate the reminder time format
      const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
      if (timeRegex.test(reminderTime)) {
        if (!reminders[currentYear]) {
          reminders[currentYear] = {};
        }
        if (!reminders[currentYear][currentMonth]) {
          reminders[currentYear][currentMonth] = {};
        }
        if (!reminders[currentYear][currentMonth][selectedDate]) {
          reminders[currentYear][currentMonth][selectedDate] = [];
        }
        reminders[currentYear][currentMonth][selectedDate].push({
          text: reminderText,
          time: reminderTime
        });
        alert(`Reminder added: ${reminderText} at ${reminderTime}`);

        // Show reminders at the bottom
        showReminders();
      } else {
        alert('Invalid time. Please enter a valid time (HH:MM) in 24-hour clock system.');
      }
    }
  }
}

// Function to show reminders at the bottom
function showReminders() {
  const remindersList = document.getElementById('remindersList');
  remindersList.innerHTML = '';

  for (const year in reminders) {
    for (const month in reminders[year]) {
      for (const date in reminders[year][month]) {
        const remindersForDate = reminders[year][month][date];
        remindersForDate.forEach(reminder => {
          const listItem = document.createElement('li');
          listItem.textContent = `${getMonthName(month)} ${date}, ${year}: ${reminder.text} at ${reminder.time}`;
          remindersList.appendChild(listItem);
        });
      }
    }
  }
}


    // Function to go to the previous month
    function goToPreviousMonth() {
      if (currentMonth === 0) {
        currentYear--;
        currentMonth = 11;
      } else {
        currentMonth--;
      }
      generateCalendar();
    }
    
    // Function to go to the next month
    function goToNextMonth() {
      if (currentMonth === 11) {
        currentYear++;
        currentMonth = 0;
      } else {
        currentMonth++;
      }
      generateCalendar();
    }
    
    // Attach event listeners to the previous and next month buttons
    const prevMonthBtn = document.getElementById('prevMonthBtn');
    const nextMonthBtn = document.getElementById('nextMonthBtn');
    prevMonthBtn.addEventListener('click', goToPreviousMonth);
    nextMonthBtn.addEventListener('click', goToNextMonth);
    
    // Generate the initial calendar
    generateCalendar();
    
   
