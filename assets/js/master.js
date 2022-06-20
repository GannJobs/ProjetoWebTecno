const lcl = document.getElementsByClassName("local")

for (locals of lcl) {
    locals.addEventListener("click", event => {
        let a = event.target
        if(event.target){
            jogarL()
        }
    })
}

function jogarL() {
    window.location.href = "Jogo.html"
}