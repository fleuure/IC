let nav = 0;
let clicked = null;
let events = [{date: "11/2/2022", title: "Noite de Jazz"}, {date: "11/18/2022", title: "Clássicos do Fado"}]

const calendarioEventos = document.getElementById('calendarioEventos');
const reservaEventoModal = document.getElementById('reservaEventoModal');
const backDrop = document.getElementById('modalBackDrop');
const diasSemana = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date) {
  clicked = date;

  const eventForDay = events.find(e => e.date === clicked);

  if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;
    reservaEventoModal.style.display = 'block';
    backDrop.style.display = 'block';
  } 

}

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = diasSemana.indexOf(dateString.split(', ')[0]);

  document.getElementById('mesAno').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendarioEventos.innerHTML = '';

  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      const eventForDay = events.find(e => e.date === dayString);

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }

      if (eventForDay) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = eventForDay.title;
        daySquare.appendChild(eventDiv);
      }

      daySquare.addEventListener('click', () => openModal(dayString));
    } else {
      daySquare.classList.add('padding');
    }

    calendarioEventos.appendChild(daySquare);    
  }
}

function cancelarModal() {
  reservaEventoModal.style.display = 'none';
  backDrop.style.display = 'none';
  clicked = null;
  load();
}

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });

  //document.getElementById('reservaEventoButton').addEventListener('click', reservaEvento);
  document.getElementById('cancelarButton').addEventListener('click', cancelarModal);
}

initButtons();
load();
