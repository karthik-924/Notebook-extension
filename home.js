const body = document.getElementById("body");
if(localStorage.getItem('status')!='logged-in'){
    window.location.href = '/index.html';
}