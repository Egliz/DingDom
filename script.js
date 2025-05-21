const teclas = [
  { tipo: 'blanca', nota: 'DO', tecla: 'A' },
  { tipo: 'blanca', nota: 'RE', tecla: 'S' },
  { tipo: 'blanca', nota: 'MI', tecla: 'D' },
  { tipo: 'blanca', nota: 'FA', tecla: 'F' },
  { tipo: 'blanca', nota: 'SOL', tecla: 'G' },
  { tipo: 'blanca', nota: 'LA', tecla: 'H' },
  { tipo: 'blanca', nota: 'SI', tecla: 'J' },
  { tipo: 'negra', nota: 'DO', tecla: 'W', left: 42 },
  { tipo: 'negra', nota: 'RE', tecla: 'E', left: 102 },
  { tipo: 'negra', nota: 'FA', tecla: 'T', left: 222 },
  { tipo: 'negra', nota: 'SOL', tecla: 'Y', left: 282 },
  { tipo: 'negra', nota: 'LA', tecla: 'U', left: 342 }
];

// Crear teclas en el HTML
const piano = document.getElementById('piano');

teclas.forEach(t => {
  const div = document.createElement('div');
  div.classList.add('tecla', t.tipo);
  div.dataset.note = t.nota;

  // Solo las teclas negras necesitan posición absoluta
  if (t.tipo === 'negra') {
    div.style.left = `${t.left}px`;
  }

  // Añadir letras y nombre de nota
  div.innerHTML = `<span>${t.tecla}</span><small>${t.nota}</small>`;
  piano.appendChild(div);
});

// Mapeo de teclas del teclado físico a notas
const tecladoNotas = {
  'a': 'DO',
  's': 'RE',
  'd': 'MI',
  'f': 'FA',
  'g': 'SOL',
  'h': 'LA',
  'j': 'SI',
  'w': 'DOs',
  'e': 'REs',
  't': 'FAs',
  'y': 'SOLs',
  'u': 'LAs'
};

function reproducirNota(nota) {
  const sonido = new Audio(`sounds/${nota}.mp3`);
  sonido.play();
}

// Evento: click en la tecla
document.querySelectorAll('.tecla').forEach(tecla => {
  tecla.addEventListener('click', () => {
    const nota = tecla.dataset.note;
    if (nota) reproducirNota(nota);
  });
});

// Evento: presionar tecla del teclado
document.addEventListener('keydown', (e) => {
  const nota = tecladoNotas[e.key.toLowerCase()];
  if (nota) {
    reproducirNota(nota);
    const tecla = document.querySelector(`.tecla[data-note="${nota}"]`);
    if (tecla) {
      tecla.classList.add('activa');
      setTimeout(() => tecla.classList.remove('activa'), 100);
    }
  }
});
