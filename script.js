if ('opgeslagen_douchetijd' in localStorage) {
    document.querySelector('input').value = localStorage.getItem('opgeslagen_douchetijd');
}

document.querySelector('#verder').addEventListener('click', () => {
    douchetijd = document.querySelector('input').value;
    if (douchetijd === "00:00") {
        alert('als je niet doucht, ga je stinken');
    } else if (douchetijd) {
        localStorage.setItem('opgeslagen_douchetijd', douchetijd);
        window.location.href = "spetterwekker.html"
    } else {
        alert('geef een geldige tijd in')
    }
});