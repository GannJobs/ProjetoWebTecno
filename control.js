let matriz = document.querySelector(".Matriz")
let casas = document.getElementsByClassName("Casa")
let linhas = document.getElementsByClassName("Linha")
let troca = document.getElementsByClassName("Pextra")
let origem

let turn = 0


for (casa of casas) {
    casa.addEventListener("click", event => {
        if (!origem) {

            turn++

            origem = event.target
            origem.classList.add("ativo")
            
            Turn()

        } else {

            origem.classList.remove("ativo")

            if (origem.id == event.target.id && event.target.innerHTML && event.target.innerHTML) {
                origem = ""
                return
            }

            if (origem.id == event.target.id && !event.target.innerHTML && !origem.innerHTML) {
                sobrepor()
                origem = ""
                return
            }

            if (!origem.innerHTML) {

                origem = ""
                return alert("Não se pode passar nada para uma casa!")

            } else {

                LimitMov(event)

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

function Turn() {
    if (turn % 2 == 1) {
        alert("Turno das verdes")
        if (origem.className.includes("Casa2")) {
            return
        } else {
            origem.classList.remove("ativo")
            origem = ""
            turn--
            alert("E o turno das Verdes, nao pule o turno !")
            return
        }
    } else if (turn % 2 == 0) {
        alert("Turno das pretas")
        if (!origem.className.includes("Casa2")) {
            return
        } else {
            origem.classList.remove("ativo")
            origem = ""
            turn--
            alert("E o turno das Pretas, nao pule o turno !")
            return
        }
    }
}

function mov(evento, extra) {
    evento.target.innerHTML = origem.innerHTML
    origem.innerHTML = ""
    origem = null
    vencerV(extra)
}

function movV(evento) {
    if ((evento.target.className.includes("Casa2") || evento.target.className == "Casa sobreposto") 
    /*&& (origem.style.backgroundColor == evento.target.style.backgroundColor)*/) {

        mov(evento, "Verdes")

    } else if ((origem.className == "Casa sobreposto" || origem.className.includes("Casa2")) 
    && (evento.target.className == "Casa Casa2" || evento.target.className == "Casa sobreposto")
        /* && (origem.style.backgroundColor == evento.target.style.backgroundColor)*/) {

        mov(evento, "Verdes")

    } else {
        origem = ""
        return alert("Movimento nao tratado!")
    }
}

function movP(evento) {
    if (origem.className.includes("Casa Casa2 sobreposto") || (!(evento.target.className.includes("Casa2"))
        || evento.target.className.includes("Casa Casa2 sobreposto"))
         /*&& (origem.style.backgroundColor == evento.target.style.backgroundColor)*/) {

        mov(evento, "Pretas")

    } else if (origem.className.includes("Casa Casa2 sobreposto") && (!evento.target.className.includes("Casa2")
        || evento.target.className.includes("Casa Casa2 sobreposto"))
         /*&& (origem.style.backgroundColor == evento.target.style.backgroundColor)*/) {

        mov(evento, "Pretas")

    } else {
        origem = ""
        return alert("Movimento nao tratado!")
    }
}

function movimento(event) {
    //Movimentação das verdes em casas normais e sobrepostas
    if (origem.className == "Casa Casa2" && event.target.className == "Casa Casa2") {

        console.log("verde normal")
        movV(event)

    } else if (origem.className == "Casa Casa2" && ((event.target.className == "Casa sobreposto")
        || event.target.className == "Casa Casa2")) {

        console.log("Verde => Preta->Verde")
        movV(event)

    } else if (origem.className == "Casa sobreposto" && ((event.target.className == "Casa Casa2")
        || (event.target.className == "Casa sobreposto"))) {

        console.log("Preta->Verde => Preta->Verde || Verde")
        movV(event)

    } else

        //Movimentação das pretas em casas normais e sobrepostas
        if (origem.className == "Casa" && event.target.className == "Casa") {

            console.log("preta normal")
            movP(event)

        } else if (origem.className == "Casa" && ((event.target.className == "Casa Casa2 sobreposto")
            || (event.target.className == "Casa"))) {

            console.log("Preta => Verde->Preta")
            movP(event)

        } else if (origem.className == "Casa Casa2 sobreposto" && ((event.target.className == "Casa")
            || (event.target.className == "Casa Casa2 sobreposto"))) {

            console.log("Verde->Preta => Verde->Preta || Preta")
            movP(event)

        } else {
            origem = ""
            alert("movimento Invalido!")
        }
}

function LimitMov(evento) {

    if (origem.id == 0 && (evento.target.id == 1 || evento.target.id == 2 || evento.target.id == 3)) {
        movimento(evento)

    } else if (origem.id == 1 && (evento.target.id == 0 || evento.target.id == 2 || evento.target.id == 4
        || evento.target.id == 5 || evento.target.id == 6)) {
        movimento(evento)

    } else if (origem.id == 2 && (evento.target.id == 0 || evento.target.id == 1 || evento.target.id == 3
        || evento.target.id == 5 || evento.target.id == 6 || evento.target.id == 7)) {
        movimento(evento)

    } else if (origem.id == 3 && (evento.target.id == 0 || evento.target.id == 2 || evento.target.id == 6
        || evento.target.id == 7 || evento.target.id == 8)) {
        movimento(evento)

    } else if (origem.id == 4 && (evento.target.id == 1 || evento.target.id == 5 || evento.target.id == 9
        || evento.target.id == 10)) {
        movimento(evento)

    } else if (origem.id == 5 && (evento.target.id == 1 || evento.target.id == 2 || evento.target.id == 4
        || evento.target.id == 6 || evento.target.id == 9 || evento.target.id == 10 || evento.target.id == 11)) {
        movimento(evento)

    } else if (origem.id == 6 && (evento.target.id == 1 || evento.target.id == 2 || evento.target.id == 3
        || evento.target.id == 5 || evento.target.id == 7 || evento.target.id == 10 || evento.target.id == 11
        || evento.target.id == 12)) {
        movimento(evento)

    } else if (origem.id == 7 && (evento.target.id == 2 || evento.target.id == 3 || evento.target.id == 6
        || evento.target.id == 8 || evento.target.id == 11 || evento.target.id == 12 || evento.target.id == 13)) {
        movimento(evento)

    } else if (origem.id == 8 && (evento.target.id == 3 || evento.target.id == 7 || evento.target.id == 12
        || evento.target.id == 13)) {
        movimento(evento)

    } else if (origem.id == 9 && (evento.target.id == 4 || evento.target.id == 5 || evento.target.id == 10
        || evento.target.id == 14)) {
        movimento(evento)

    } else if (origem.id == 10 && (evento.target.id == 4 || evento.target.id == 5 || evento.target.id == 6
        || evento.target.id == 9 || evento.target.id == 11 || evento.target.id == 14 || evento.target.id == 15)) {
        movimento(evento)

    } else if (origem.id == 11 && (evento.target.id == 5 || evento.target.id == 6 || evento.target.id == 7
        || evento.target.id == 10 || evento.target.id == 13 || evento.target.id == 14 || evento.target.id == 15
        || evento.target.id == 16)) {
        movimento(evento)

    } else if (origem.id == 12 && (evento.target.id == 6 || evento.target.id == 7 || evento.target.id == 8
        || evento.target.id == 11 || evento.target.id == 13 || evento.target.id == 15 || evento.target.id == 16)) {
        movimento(evento)

    } else if (origem.id == 13 && (evento.target.id == 7 || evento.target.id == 8 || evento.target.id == 12
        || evento.target.id == 16)) {
        movimento(evento)

    } else if (origem.id == 14 && (evento.target.id == 9 || evento.target.id == 10 || evento.target.id == 11
        || evento.target.id == 15 || evento.target.id == 17)) {
        movimento(evento)

    } else if (origem.id == 15 && (evento.target.id == 10 || evento.target.id == 11 || evento.target.id == 12
        || evento.target.id == 14 || evento.target.id == 16 || evento.target.id == 17)) {
        movimento(evento)

    } else if (origem.id == 16 && (evento.target.id == 11 || evento.target.id == 12 || evento.target.id == 13
        || evento.target.id == 15 || evento.target.id == 17)) {
        movimento(evento)

    } else if (origem.id == 17 && (evento.target.id == 14 || evento.target.id == 15 || evento.target.id == 16)) {
        movimento(evento)

    } else {
        alert("Casa fora da vizinhaça!")
    }
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



// for (casa of casas) {
//     casa.addEventListener("click", event => {
//         if (!origem) {
//             origem = event.target
//             origem.classList.add("ativo")
//             // if (origem.className.includes("Casa2")) {
//             //     TurnV++
//             // } else {
//             //     TurnP++
//             // }
//             // if (TurnP - TurnV > 1) {
//             //     TurnP--
//             //     TurnV++
//             //     origem.classList.remove("ativo")
//             //     origem = ""
//             //     return (alert("Nao jogue no turno do amiguinho #Respeito!"))
//             // } else if (TurnV - TurnP > 1) {
//             //     TurnP++
//             //     TurnV--
//             //     origem.classList.remove("ativo")
//             //     origem = ""
//             //     return (alert("Nao jogue no turno do amiguinho #Respeito!"))
//             // }
//         } else {

//             origem.classList.remove("ativo")

//             if (origem.id === event.target.id && !event.target.innerHTML) {
//                 sobrepor()
//                 origem = ""
//                 return
//             }

//             // if (origem.id === event.target.id) {
//             //     if (origem.className.includes("Casa2"))
//             //         TurnV--
//             //     else
//             //         TurnP--
//             //     origem = ""
//             //     return
//             // }

//             if (!origem.innerHTML) {
//                 origem = ""
//                 return alert("BUuurro!!!")
//             } else {

//                 let l = linha(origem)
//                 let l2 = linha(event.target)
//                 if (l2 - l == 1 || l - l2 == 1) {
//                     if ((origem.innerHTML) && ((origem.id % 2 == 1) && (event.target.id % 2 == 1) && (event.target.innerHTML == 0))) {
//                         if (CondMovV(event)) {
//                             origem = ""
//                             return alert("para de ser burro!")
//                         } else {
//                             mov(event, "Verdes")
//                         }
//                     } else if ((origem.innerHTML) && (origem.id % 2 == 0) && (event.target.id % 2 == 0) && (event.target.innerHTML == 0)) {
//                         if (CondMovP(event)) {
//                             origem = ""
//                             return alert("para de ser burro!")
//                         } else {
//                             mov(event, "Pretas")
//                         }
//                     }
//                 } else if ((origem.innerHTML) && l - l2 == 0 && ((origem.id - event.target.id == 1) * (origem.id - event.target.id == 1))) {
//                     if (origem.id - event.target.id < 2) {
//                         if (CondMovV(event)) {
//                             origem = ""
//                             return alert("para de ser burro!")
//                         } else {
//                             mov(event, "Verdes")
//                         }
//                         if ((origem.innerHTML) && (origem.id % 2 == 0) && (event.target.id % 2 == 0) && (event.target.innerHTML == 0)) {
//                             if (CondMovP(event)) {
//                                 origem = ""
//                                 return alert("para de ser burro!")
//                             } else {
//                                 mov(event, "Pretas")
//                             }
//                         }
//                     }
//                 } else {
//                     origem = ""
//                     return alert("para de ser burro!")
//                 }
//             }
//         }
//     })
// }

// function CondMovP(evento) {
//     return ((origem.id == 11 && evento.target.id == 3) || (origem.id == 11 && evento.target.id == 13))
//         || ((origem.id == 7 && evento.target.id == 5) || (origem.id == 7 && evento.target.id == 15))
//         || ((origem.id == 3 && evento.target.id == 11) || (origem.id == 13 && evento.target.id == 11))
//         || ((origem.id == 5 && evento.target.id == 7) || (origem.id == 15 && evento.target.id == 7))
// }

// function CondMovV(evento) {
//     return ((origem.id == 11 && evento.target.id == 3) || (origem.id == 11 && evento.target.id == 13))
//         || ((origem.id == 7 && evento.target.id == 5) || (origem.id == 7 && evento.target.id == 15))
//         || ((origem.id == 3 && evento.target.id == 11) || (origem.id == 13 && evento.target.id == 11))
//         || ((origem.id == 5 && evento.target.id == 7) || (origem.id == 15 && evento.target.id == 7))
// }

