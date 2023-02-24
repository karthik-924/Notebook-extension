const body = document.getElementById("body");
if(localStorage.getItem('status')!='logged-in'){
    window.location.href = '/index.html';
}


document.getElementById('save').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = sessionStorage.getItem('email');
    let notes = document.getElementById('note').value;
    console.log(notes);
    fetch('http://localhost:5000/notebook/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, notes })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
        }
    })
    .catch(error => {
      console.error(error);
    });
});
  
const notebooksave= () => {
    const email = sessionStorage.getItem('email');
    const notebook = document.getElementById('note');
    console.log(email);
    fetch('http://localhost:5000/notebook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            if(data.data.notebook!=null)
            notebook.innerHTML = data.data.notebook;
        }
    })
    .catch(error => {
      console.error(error);
    });
  };