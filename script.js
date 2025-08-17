
const tablinks = document.getElementsByClassName("tab-links ")
const tabcontents = document.getElementsByClassName("tab-contents")

function opentabsk() {
    document.querySelector("#skills").style.display = "block";
    document.querySelector("#Exprience").style.display = "none";
    document.querySelector("#Education").style.display = "none";


    document.querySelector("#mainskill").classList.add('active-links');
    document.querySelector("#mainExp").classList.remove('active-links');
    document.querySelector("#mainEd").classList.remove('active-links');


}

function opentabEx() {
    document.querySelector("#skills").style.display = "none";
    document.querySelector("#Exprience").style.display = "block";
    document.querySelector("#Education").style.display = "none";

    document.querySelector("#mainskill").classList.remove('active-links');
    document.querySelector("#mainExp").classList.add('active-links');
    document.querySelector("#mainEd").classList.remove('active-links');
}
function opentabEdu() {
    document.querySelector("#skills").style.display = "none";
    document.querySelector("#Exprience").style.display = "none";
    document.querySelector("#Education").style.display = "block";

    document.querySelector("#mainskill").classList.remove('active-links');
    document.querySelector("#mainExp").classList.remove('active-links');
    document.querySelector("#mainEd").classList.add('active-links');

}

const sidemenu = document.getElementById("side-menu");
function openmenu() {
    sidemenu.style.right = "0";
}


function closemenu() {
    sidemenu.style.right = "-200px";
}




const scriptURL = 'https://script.google.com/macros/s/AKfycbyOG7FN29a4Bk_jLiV866bF2c7JZ7HRJmT3g2AE6IV95xgMMTT5dWk5QH8b7J7VCXEvLg/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")
form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Massege sent successfully thank you "
            setTimeout(function () {
                msg.innerHTML = " "
            }, 5000)
        })
    from.reset()
        .catch(error => console.error('Error!', error.message))
})

function Callme() {
    window.location.href = ("tel:+919093013606");
}

function Emailme() {
    window.location.href = "mailto:someone@example.com?subject=Hello&body=I%20want%20to%20connect%20with%20you";


}