// import * as ICS from "https://cdnjs.cloudflare.com/ajax/libs/ical.js/0.0.3/ical.js";
window.onload = function() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
  };

let currentSlide = 0;

function showSlide(slideIndex) {
const slider = document.querySelector('.carousel-slider');
const totalSlides = document.querySelectorAll('.carousel-slide').length;

if (slideIndex >= totalSlides) {
    currentSlide = 0;
} else if (slideIndex < 0) {
    currentSlide = totalSlides - 1;
} else {
    currentSlide = slideIndex;
}

slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function moveSlide(step) {
showSlide(currentSlide + step);
}

function goToSlide(slideIndex) {
showSlide(slideIndex);
}  

// function addEventsToCalendar() {
//     // Check if ics.js library is loaded
//     if (typeof ics !== 'function') {
//       alert("ics.js library failed to load.");
//       return;
//     }

//     // Initialize the ics object
//     let cal = ics();

//     // Event details for specific dates
//     const events = [
//       { title: "Event on November 16", description: "Event details for November 16, 2024", date: "2024-11-16" },
//       { title: "Event on November 17", description: "Event details for November 17, 2024", date: "2024-11-17" },
//       { title: "Event on November 24", description: "Event details for November 24, 2024", date: "2024-11-24" }
//     ];

//     // Loop through each event and add it to the calendar
//     events.forEach(event => {
//       cal.addEvent(
//         event.title,
//         event.description,
//         "Online", // Location placeholder
//         `${event.date}T09:00:00`, // Start time for each event
//         `${event.date}T10:00:00`  // End time for each event
//       );
//     });

//     // Trigger the download of the .ics file
//     cal.download("My_Events");
//   }

  function createICSFile() {
    const events = [
      { title: "Event on November 16", description: "Event details for November 16, 2024", date: "2024-11-16" },
      { title: "Event on November 17", description: "Event details for November 17, 2024", date: "2024-11-17" },
      { title: "Event on November 24", description: "Event details for November 24, 2024", date: "2024-11-24" }
    ];

    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\n";

    events.forEach(event => {
      icsContent += `BEGIN:VEVENT\n`;
      icsContent += `SUMMARY:${event.title}\n`;
      icsContent += `DESCRIPTION:${event.description}\n`;
      icsContent += `DTSTART:${event.date.replace(/-/g, "")}T090000Z\n`;
      icsContent += `DTEND:${event.date.replace(/-/g, "")}T100000Z\n`;
      icsContent += `LOCATION:Online\n`;
      icsContent += `END:VEVENT\n`;
    });

    icsContent += "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "My_Events.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }