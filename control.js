let matriz = document.querySelector(".Matriz")
let casas = document.getElementsByClassName("Casa")
let linhas = document.getElementsByClassName("Linha")
let troca = document.getElementsByClassName("Pextra")
let origem, origeml

let TurnV = 0, TurnP = 0

for (casa of casas) {
    casa.addEventListener("click", event => {
        if (!origem) {
            origem = event.target
            origem.classList.add("ativo")
            // if (origem.className.includes("Casa2")) {
            //     TurnV++
            // } else {
            //     TurnP++
            // }
            // if (TurnP - TurnV > 1) {
            //     TurnP--
            //     TurnV++
            //     origem.classList.remove("ativo")
            //     origem = ""
            //     return (alert("Nao jogue no turno do amiguinho #Respeito!"))
            // } else if (TurnV - TurnP > 1) {
            //     TurnP++
            //     TurnV--
            //     origem.classList.remove("ativo")
            //     origem = ""
            //     return (alert("Nao jogue no turno do amiguinho #Respeito!"))
            // }
        } else {

            origem.classList.remove("ativo")

            if (origem.id === event.target.id && !event.target.innerHTML) {
                sobrepor()
                origem = ""
                return
            }

            // if (origem.id === event.target.id) {
            //     if (origem.className.includes("Casa2"))
            //         TurnV--
            //     else
            //         TurnP--
            //     origem = ""
            //     return
            // }

            if (!origem.innerHTML) {
                origem = ""
                return alert("BUuurro!!!")
            } else {

                let l = linha(origem)
                let l2 = linha(event.target)
                if (l2 - l == 1 || l - l2 == 1) {
                    if ((origem.innerHTML) && ((origem.id % 2 == 1) && (event.target.id % 2 == 1) && (event.target.innerHTML == 0))) {
                        if (CondMovV(event)) {
                            origem = ""
                            return alert("para de ser burro!")
                        } else {
                            mov(event, "Verdes")
                        }
                    } else if ((origem.innerHTML) && (origem.id % 2 == 0) && (event.target.id % 2 == 0) && (event.target.innerHTML == 0)) {
                        if (CondMovP(event)) {
                            origem = ""
                            return alert("para de ser burro!")
                        } else {
                            mov(event, "Pretas")
                        }
                    }
                } else if ((origem.innerHTML) && l - l2 == 0 && ((origem.id - event.target.id == 1) * (origem.id - event.target.id == 1))) {
                    if (origem.id - event.target.id < 2) {
                        if (CondMovV(event)) {
                            origem = ""
                            return alert("para de ser burro!")
                        } else {
                            mov(event, "Verdes")
                        }
                        if ((origem.innerHTML) && (origem.id % 2 == 0) && (event.target.id % 2 == 0) && (event.target.innerHTML == 0)) {
                            if (CondMovP(event)) {
                                origem = ""
                                return alert("para de ser burro!")
                            } else {
                                mov(event, "Pretas")
                            }
                        }
                    }
                } else {
                    origem = ""
                    return alert("para de ser burro!")
                }
            }
        }
    })
}

function sobrepor() {
    let r = confirm("Deseja Trocar a Casa?")
    if (r) {
        origem.classList.toggle("sobreposto")
    }
}

function CondMovP(evento) {
    return ((origem.id == 11 && evento.target.id == 3) || (origem.id == 11 && evento.target.id == 13))
        || ((origem.id == 7 && evento.target.id == 5) || (origem.id == 7 && evento.target.id == 15))
        || ((origem.id == 3 && evento.target.id == 11) || (origem.id == 13 && evento.target.id == 11))
        || ((origem.id == 5 && evento.target.id == 7) || (origem.id == 15 && evento.target.id == 7))
}

function CondMovV(evento) {
    return ((origem.id == 11 && evento.target.id == 3) || (origem.id == 11 && evento.target.id == 13))
        || ((origem.id == 7 && evento.target.id == 5) || (origem.id == 7 && evento.target.id == 15))
        || ((origem.id == 3 && evento.target.id == 11) || (origem.id == 13 && evento.target.id == 11))
        || ((origem.id == 5 && evento.target.id == 7) || (origem.id == 15 && evento.target.id == 7))
}



function mov(evento, extra) {
    evento.target.innerHTML = origem.innerHTML
    origem.innerHTML = ""
    origem = null
    vencerV(extra)
}

function vencerV(extra) {
    setInterval(() => {
        //para as verdes
        if ((casas[1].innerHTML) && (casas[4].innerHTML) && (casas[0].innerHTML)) {
            window.location.href = "Tela.html"
            return alert(extra + " ganharam!")
        } else if ((casas[10].innerHTML) && (casas[6].innerHTML) && (casas[8].innerHTML)) {
            window.location.href = "Tela.html"
            return alert(extra + " ganharam!")
        } else if ((casas[15].innerHTML) && (casas[12].innerHTML) && (casas[8].innerHTML)) {
            window.location.href = "Tela.html"
            return alert(extra + " ganharam!")
        } else if ((casas[0].innerHTML) && (casas[3].innerHTML) && (casas[8].innerHTML)) {
            window.location.href = "Tela.html"
            return alert(extra + " ganharam!")
        } else if ((casas[1].innerHTML) && (casas[6].innerHTML) && (casas[12].innerHTML)) {
            window.location.href = "Tela.html"
            return alert(extra + " ganharam!")
        } else if ((casas[4].innerHTML) && (casas[10].innerHTML) && (casas[15].innerHTML)) {
            window.location.href = "Tela.html"
            return alert(extra + " ganharam!")
            //para as pretas
        } else if ((casas[2].innerHTML) && (casas[5].innerHTML) && (casas[9].innerHTML)) {
            window.location.href = "Tela.html"
            return alert(extra + " ganharam!")
        } else if ((casas[7].innerHTML) && (casas[11].innerHTML) && (casas[14].innerHTML)) {
            window.location.href = "Tela.html"
            return alert(extra + " ganharam!")
        } else if ((casas[13].innerHTML) && (casas[16].innerHTML) && (casas[17].innerHTML)) {
            window.location.href = "Tela.html"
            return alert(extra + " ganharam!")
        } else if ((casas[2].innerHTML) && (casas[7].innerHTML) && (casas[13].innerHTML)) {
            window.location.href = "Tela.html"
            return alert(extra + " ganharam!")
        } else if ((casas[5].innerHTML) && (casas[11].innerHTML) && (casas[16].innerHTML)) {
            window.location.href = "Tela.html"
            return alert(extra + " ganharam!")
        } else if ((casas[9].innerHTML) && (casas[14].innerHTML) && (casas[17].innerHTML)) {
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