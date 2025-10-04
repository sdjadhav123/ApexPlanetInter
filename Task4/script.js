
  
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  
    // Typing animation
    const roles = ["Frontend Developer", "Web Designer", "Full Stack Developer"];
    let i = 0, j = 0, currentRole = "", isDeleting = false;
    function typeEffect() {
      currentRole = roles[i];
      let display = currentRole.substring(0, j);
      document.getElementById("typing").textContent = display;
      
      if (!isDeleting && j < currentRole.length) {
        j++;
        setTimeout(typeEffect, 100);
      } else if (isDeleting && j > 0) {
        j--;
        setTimeout(typeEffect, 50);
      } else {
        isDeleting = !isDeleting;
        if (!isDeleting) i = (i + 1) % roles.length;
        setTimeout(typeEffect, 1000);
      }
    }
    typeEffect();
    //Note section
    
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
let editIndex = -1;

function renderNotes() {
  const container = document.getElementById('notesContainer');
  container.innerHTML = notes.map((note, index) => `
    <div class="col-md-4">
      <div class="note-card glass-card">
        <p>${note.text}</p>
        <small>🕒 ${note.date}</small>
        <button class="delete-btn" onclick="deleteNote(${index})">🗑️</button>
        <button class="edit-btn" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editNote(${index})">✏️</button>
      </div>
    </div>
  `).join('');
}

function addNote() {
  const text = document.getElementById('noteInput').value.trim();
  if (!text) return alert('Please enter a note.');
  notes.push({ text, date: new Date().toLocaleString() });
  localStorage.setItem('notes', JSON.stringify(notes));
  document.getElementById('noteInput').value = '';
  renderNotes();
}

function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  renderNotes();
}

function editNote(index) {
  editIndex = index;
  document.getElementById('editNoteInput').value = notes[index].text;
}

function saveEditedNote() {
  const newText = document.getElementById('editNoteInput').value.trim();
  if (!newText) return alert('Note cannot be empty.');
  notes[editIndex].text = newText;
  localStorage.setItem('notes', JSON.stringify(notes));
  renderNotes();
  bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
}

document.addEventListener('DOMContentLoaded', renderNotes);
