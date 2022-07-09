const lcl = document.getElementsByClassName("local")

for (locals of lcl) {
    locals.addEventListener("click", event => {

        Playclick()

        let a = event.target
        if(event.target){
            jogarL()
        }
    })
}

function jogarL() {
    window.location.href = "Jogo.html"
}

function ShowT(){

    Playclick()

    var x = document.getElementById("1");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

}

function Playclick(){
    const audio = document.getElementById('click')
    audio.play()
    console.log('toca misera')
}