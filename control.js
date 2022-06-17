let matriz = document.querySelector(".Matriz")
let casas = document.getElementsByClassName("Casa")
let linhas = document.getElementsByClassName("Linha")
let origem, origeml

for (casa of casas) {
    casa.addEventListener("click", event => {
        if (!origem) {
            origem = event.target
            origem.classList.add("ativo")
        } else {
            origem.classList.remove("ativo")
            let l = linha(origem)
            let l2 = linha(event.target)
            console.log(event.target)
            if (l2 - l == 1 || l - l2 == 1) {
                if ((origem.id % 2 == 1) && (event.target.id % 2 == 1) && (event.target.innerHTML == 0)) {
                    if (((origem.id == 11 && event.target.id == 3) || (origem.id == 11 && event.target.id == 13))
                        || ((origem.id == 7 && event.target.id == 5) || (origem.id == 7 && event.target.id == 15))
                        || ((origem.id == 3 && event.target.id == 11) || (origem.id == 13 && event.target.id == 11))
                        || ((origem.id == 5 && event.target.id == 7) || (origem.id == 15 && event.target.id == 7))
                    ) {
                        origem = null
                        return (alert("para de ser burro!"))
                    } else {
                        mov(event, "Verdes")
                    }
                } else if ((origem.id % 2 == 0) && (event.target.id % 2 == 0) && (event.target.innerHTML == 0)) {
                    if (((origem.id == 8 && event.target.id == 6) || (origem.id == 8 && event.target.id == 16))
                        || ((origem.id == 12 && event.target.id == 14) || (origem.id == 12 && event.target.id == 4))
                        || ((origem.id == 6 && event.target.id == 8) || (origem.id == 16 && event.target.id == 8))
                        || ((origem.id == 14 && event.target.id == 12) || (origem.id == 4 && event.target.id == 12))
                    ) {
                        origem = null
                        return (alert("para de ser burro!"))
                    } else {
                        mov(event, "Pretas")
                    }
                }
            } else if (l - l2 == 0 && (origem.id - event.target.id == 1) * (origem.id - event.target.id == 1)) {
                if (((origem.id == 11 && event.target.id == 3) || (origem.id == 11 && event.target.id == 13))
                    || ((origem.id == 7 && event.target.id == 5) || (origem.id == 7 && event.target.id == 15))
                    || ((origem.id == 3 && event.target.id == 11) || (origem.id == 13 && event.target.id == 11))
                    || ((origem.id == 5 && event.target.id == 7) || (origem.id == 15 && event.target.id == 7))
                ) {
                    origem = null
                    return (alert("para de ser burro!"))
                } else {
                    mov(event, "Verdes")
                }
                if ((origem.id % 2 == 0) && (event.target.id % 2 == 0) && (event.target.innerHTML == 0)) {
                    if (((origem.id == 8 && event.target.id == 6) || (origem.id == 8 && event.target.id == 16))
                        || ((origem.id == 12 && event.target.id == 14) || (origem.id == 12 && event.target.id == 4))
                        || ((origem.id == 6 && event.target.id == 8) || (origem.id == 16 && event.target.id == 8))
                        || ((origem.id == 14 && event.target.id == 12) || (origem.id == 4 && event.target.id == 12))
                    ) {
                        origem = null
                        return (alert("para de ser burro!"))
                    } else {
                        mov(event, "Pretas")
                    }
                }
            }
        }
    })
}

function mov(evento, extra){
    evento.target.innerHTML = origem.innerHTML
    origem.innerHTML = ""
    origem = null
    vencerV(extra)
}

function vencerV(extra){
    setInterval(() => {
        if((casas[1].innerHTML) && (casas[4].innerHTML) && (casas[0].innerHTML)){
            window.location.href = "Tela.html"
            return alert(extra + " ganharam!") 
        }
    }, 500);
}


function linha(a) {
    if (a.classList == 'Casa Casa2') {
        if (a.id == 1) {
            return 1;
        } else if (a.id >= 3 && a.id <= 5) {
            return 2;
        } else if (a.id >= 7 && a.id <= 11) {
            return 3;
        } else if (a.id >= 13 && a.id <= 15) {
            return 4;
        } else if (a.id == 17) {
            return 5;
        }
    } else {
        if (a.id == 2) {
            return 2;
        } else if (a.id >= 4 && a.id <= 6) {
            return 3;
        } else if (a.id >= 8 && a.id <= 12) {
            return 4;
        } else if (a.id >= 14 && a.id <= 16) {
            return 5;
        } else if (a.id == 18) {
            return 6;
        }
    }
}

function isChild(linhas, origem) {
    let childrenss = linhas.children

    for (let i = 0; i < childrenss.length; i++) {

        let pai = childrenss[i].children
        let filho = document.getElementsByClassName(origem)

        if (pai.id == filho.id) return true
        else return false
    }
}