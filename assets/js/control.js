let casas = document.getElementsByClassName("Casa")
let linhas = document.getElementsByClassName("Linha")
let origem

let turn = 1

for (casa of casas) {
    casa.addEventListener("click", event => {

        if (!origem) {

            origem = event.target
            origem.classList.add("ativo")

        } else {

            origem.classList.remove("ativo")

            if (origem.id == event.target.id && origem.innerHTML && event.target.innerHTML) {
                origem = ""
                return
            }

            if (origem.id == event.target.id && !event.target.innerHTML && !origem.innerHTML) {
                if (origem.getAttribute("t") == 0) {
                    console.log("veio aqui")
                    Turn(event)
                    turn++
                    sobrepor()
                    origem = ""
                    return
                } else if (origem.getAttribute("t") <= turn - 2) {
                    console.log("ou veio aqui")
                    Turn(event)
                    turn++
                    sobrepor()
                    origem = ""
                    return
                } else {
                    origem = ""
                    alert("Essa casa so pode ser desobreposta no seu proximo turno!")
                    return
                }
            }

            if (!origem.innerHTML) {

                origem = ""
                return alert("Não se pode passar nada para uma casa!")

            } else {

                Turn(event)
                turn++
                LimitMov(event)

            }
        }
    })
}

function sobrepor() {
    let r = confirm("Deseja Trocar a Casa?")
    if (r) {
        if (origem.getAttribute("t") == 0) {
            origem.setAttribute("t", turn)
            origem.classList.toggle("sobreposto")
        } else {
            origem.setAttribute("t", "0")
            origem.classList.toggle("sobreposto")
        }
    }
}



function Turn(event) {
    if (turn % 2 == 1) {
        if (((origem.className == "Casa Casa2" || (origem.className == "Casa sobreposto" && origem.innerHTML))
            && (event.target.className == "Casa Casa2" || event.target.className == "Casa sobreposto"))
            || (!origem.innerHTML && !event.target.innerHTML)) {
            return
        } else if ((origem.className == "Casa Casa2" || (origem.className == "Casa sobreposto") && !event.target.className.includes("Casa2"))) {
            LimitMov(event)
        } else {
            origem = ""
            turn--
            alert("E o turno das Verdes, nao pule o turno !")
            return
        }
    } else if (turn % 2 == 0) {
        if (((origem.className == "Casa" || (origem.className == "Casa Casa2 sobreposto" && origem.innerHTML))
            && (event.target.className == "Casa" || event.target.className == "Casa Casa2 sobreposto"))
            || ((!origem.innerHTML) && (!event.target.innerHTML))) {
            return
        } else if ((origem.className == "Casa" || (origem.className == "Casa Casa2 sobreposto") && event.target.className.includes("Casa2"))) {
            LimitMov(event)
        } else {
            origem = ""
            turn--
            alert("E o turno das Pretas, nao pule o turno !")
            return
        }
    }
}

function mov(evento) {
    evento.target.innerHTML = origem.innerHTML
    origem.innerHTML = ""
    origem = null
    vencerV()
}

function movV(evento) {
    if ((evento.target.className.includes("Casa2") || evento.target.className == "Casa sobreposto")) {

        mov(evento)

    } else if ((origem.className == "Casa sobreposto" || origem.className.includes("Casa2"))
        && (evento.target.className == "Casa Casa2" || evento.target.className == "Casa sobreposto")) {

        mov(evento)

    } else {
        origem = ""
        return alert("Movimento nao tratado!")
    }
}

function movP(evento) {
    if (origem.className.includes("Casa Casa2 sobreposto") || (!(evento.target.className.includes("Casa2"))
        || evento.target.className.includes("Casa Casa2 sobreposto"))) {

        mov(evento)

    } else if (origem.className.includes("Casa Casa2 sobreposto") && (!evento.target.className.includes("Casa2")
        || evento.target.className.includes("Casa Casa2 sobreposto"))) {

        mov(evento)

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
        || evento.target.id == 10 || evento.target.id == 12 || evento.target.id == 14 || evento.target.id == 15
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
        return
    }
}

function vencerV() {
    setInterval(() => {
        //para as verdes
        if ((casas[1].innerHTML) && (casas[4].innerHTML) && (casas[0].innerHTML)
            && (casas[1].className == "Casa Casa2") && (casas[4].className == "Casa Casa2") && (casas[0].className == "Casa Casa2")) {
            window.location.href = "index.html"
            return alert("Verdes ganharam!")
        } else if ((casas[10].innerHTML) && (casas[6].innerHTML) && (casas[3].innerHTML)
            && (casas[10].className == "Casa Casa2") && (casas[6].className == "Casa Casa2") && (casas[3].className == "Casa Casa2")) {
            window.location.href = "index.html"
            return alert("Verdes ganharam!")
        } else if ((casas[15].innerHTML) && (casas[12].innerHTML) && (casas[8].innerHTML)
            && (casas[15].className == "Casa Casa2") && (casas[12].className == "Casa Casa2") && (casas[8].className == "Casa Casa2")) {
            window.location.href = "index.html"
            return alert("Verdes ganharam!")
        } else if ((casas[0].innerHTML) && (casas[3].innerHTML) && (casas[8].innerHTML)
            && (casas[0].className == "Casa Casa2") && (casas[3].className == "Casa Casa2") && (casas[8].className == "Casa Casa2")) {
            window.location.href = "index.html"
            return alert("Verdes ganharam!")
        } else if ((casas[1].innerHTML) && (casas[6].innerHTML) && (casas[12].innerHTML)
            && (casas[1].className == "Casa Casa2") && (casas[6].className == "Casa Casa2") && (casas[12].className == "Casa Casa2")) {
            window.location.href = "index.html"
            return alert("Verdes ganharam!")
        } else if ((casas[4].innerHTML) && (casas[10].innerHTML) && (casas[15].innerHTML)
            && (casas[4].className == "Casa Casa2") && (casas[10].className == "Casa Casa2") && (casas[15].className == "Casa Casa2")) {
            window.location.href = "index.html"
            return alert("Verdes ganharam!")

            //para as pretas
        } else if ((casas[2].innerHTML) && (casas[5].innerHTML) && (casas[9].innerHTML)
            && (casas[2].className == "Casa") && (casas[5].className == "Casa") && (casas[9].className == "Casa")) {
            window.location.href = "index.html"
            return alert("Pretas ganharam!")
        } else if ((casas[7].innerHTML) && (casas[11].innerHTML) && (casas[14].innerHTML)
            && (casas[7].className == "Casa") && (casas[11].className == "Casa") && (casas[14].className == "Casa")) {
            window.location.href = "index.html"
            return alert("Pretas ganharam!")
        } else if ((casas[13].innerHTML) && (casas[16].innerHTML) && (casas[17].innerHTML)
            && (casas[13].className == "Casa") && (casas[16].className == "Casa") && (casas[17].className == "Casa")) {
            window.location.href = "index.html"
            return alert("Pretas ganharam!")
        } else if ((casas[2].innerHTML) && (casas[7].innerHTML) && (casas[13].innerHTML)
            && (casas[2].className == "Casa") && (casas[7].className == "Casa") && (casas[13].className == "Casa")) {
            window.location.href = "index.html"
            return alert("Pretas ganharam!")
        } else if ((casas[5].innerHTML) && (casas[11].innerHTML) && (casas[16].innerHTML)
            && (casas[5].className == "Casa") && (casas[11].className == "Casa") && (casas[10].className == "Casa")) {
            window.location.href = "index.html"
            return alert("Pretas ganharam!")
        } else if ((casas[9].innerHTML) && (casas[14].innerHTML) && (casas[17].innerHTML)
            && (casas[9].className == "Casa") && (casas[14].className == "Casa") && (casas[17].className == "Casa")) {
            window.location.href = "index.html"
            return alert("Pretas ganharam!")
        } else

            //para as casas sobrepostas verdes
            if ((casas[1].innerHTML) && (casas[2].innerHTML) && (casas[3].innerHTML)
                && (casas[2].className == "Casa sobreposto") && (casas[1].className == "Casa Casa2") && (casas[3].className == "Casa Casa2")) {
                window.location.href = "index.html"
                return alert("Verdes ganharam!")

            } else if ((casas[0].innerHTML) && (casas[2].innerHTML) && (casas[6].innerHTML)
                && (casas[2].className == "Casa sobreposto") && (casas[0].className == "Casa Casa2") && (casas[3].className == "Casa Casa2")) {
                console.log("chegou ue?")
                window.location.href = "index.html"
                return alert("Verdes ganharam!")

            } else if ((casas[1].innerHTML) && (casas[5].innerHTML) && (casas[10].innerHTML)
                && (casas[5].className == "Casa sobreposto") && (casas[1].className == "Casa Casa2") && (casas[10].className == "Casa Casa2")) {
                window.location.href = "index.html"
                return alert("Verdes ganharam!")

            } else if ((casas[4].innerHTML) && (casas[5].innerHTML) && (casas[6].innerHTML)
                && (casas[5].className == "Casa sobreposto") && (casas[4].className == "Casa Casa2") && (casas[6].className == "Casa Casa2")) {
                window.location.href = "index.html"
                return alert("Verdes ganharam!")

            } else if ((casas[5].innerHTML) && (casas[6].innerHTML) && (casas[7].innerHTML)
                && (casas[5].className == "Casa sobreposto" && casas[7].className == "Casa sobreposto") && (casas[6].className == "Casa Casa2")) {
                window.location.href = "index.html"
                return alert("Verdes ganharam!")

            } else if ((casas[2].innerHTML) && (casas[6].innerHTML) && (casas[11].innerHTML)
                && (casas[11].className == "Casa sobreposto" && casas[2].className == "Casa sobreposto") && (casas[6].className == "Casa Casa2")) {
                window.location.href = "index.html"
                return alert("Verdes ganharam!")

            } else if ((casas[3].innerHTML) && (casas[7].innerHTML) && (casas[12].innerHTML)
                && (casas[7].className == "Casa sobreposto") && (casas[3].className == "Casa Casa2") && (casas[12].className == "Casa Casa2")) {
                window.location.href = "index.html"
                return alert("Verdes ganharam!")

            } else if ((casas[6].innerHTML) && (casas[7].innerHTML) && (casas[8].innerHTML)
                && (casas[7].className == "Casa sobreposto") && (casas[6].className == "Casa Casa2") && (casas[8].className == "Casa Casa2")) {
                window.location.href = "index.html"
                return alert("Verdes ganharam!")

            } else if ((casas[5].innerHTML) && (casas[10].innerHTML) && (casas[14].innerHTML)
                && (casas[5].className == "Casa sobreposto" && casas[14].className == "Casa sobreposto") && (casas[10].className == "Casa Casa2")) {
                window.location.href = "index.html"
                return alert("Verdes ganharam!")

            } else if ((casas[9].innerHTML) && (casas[10].innerHTML) && (casas[11].innerHTML)
                && (casas[9].className == "Casa sobreposto" && casas[11].className == "Casa sobreposto") && (casas[10].className == "Casa Casa2")) {
                window.location.href = "index.html"
                return alert("Verdes ganharam!")

            } else if ((casas[6].innerHTML) && (casas[11].innerHTML) && (casas[15].innerHTML)
                && (casas[11].className == "Casa sobreposto") && (casas[6].className == "Casa Casa2") && (casas[15].className == "Casa Casa2")) {
                window.location.href = "index.html"
                return alert("Verdes ganharam!")

            } else if ((casas[10].innerHTML) && (casas[11].innerHTML) && (casas[12].innerHTML)
                && (casas[11].className == "Casa sobreposto") && (casas[10].className == "Casa Casa2") && (casas[12].className == "Casa Casa2")) {
                window.location.href = "index.html"
                return alert("Verdes ganharam!")

            } else if ((casas[7].innerHTML) && (casas[12].innerHTML) && (casas[16].innerHTML)
                && (casas[7].className == "Casa sobreposto" && casas[16].className == "Casa sobreposto") && (casas[12].className == "Casa Casa2")) {
                window.location.href = "index.html"
                return alert("Verdes ganharam!")

            } else if ((casas[11].innerHTML) && (casas[12].innerHTML) && (casas[13].innerHTML)
                && (casas[11].className == "Casa sobreposto" && casas[13].className == "Casa sobreposto") && (casas[12].className == "Casa Casa2")) {
                window.location.href = "index.html"
                return alert("Verdes ganharam!")

            } else if ((casas[11].innerHTML) && (casas[15].innerHTML) && (casas[17].innerHTML)
                && (casas[11].className == "Casa sobreposto" && casas[17].className == "Casa sobreposto") && (casas[15].className == "Casa Casa2")) {
                window.location.href = "index.html"
                return alert("Verdes ganharam!")

            } else if ((casas[14].innerHTML) && (casas[15].innerHTML) && (casas[16].innerHTML)
                && (casas[14].className == "Casa sobreposto" && casas[16].className == "Casa sobreposto") && (casas[15].className == "Casa Casa2")) {
                window.location.href = "index.html"
                return alert("Verdes ganharam!")

            } else if ((casas[2].innerHTML) && (casas[7].innerHTML) && (casas[13].innerHTML)
                && (casas[2].className == "Casa sobreposto" && casas[7].className == "Casa sobreposto" && casas[13].className == "Casa sobreposto")) {
                window.location.href = "index.html"
                return alert("Verdes ganharam!")

            } else if ((casas[5].innerHTML) && (casas[11].innerHTML) && (casas[16].innerHTML)
                && (casas[5].className == "Casa sobreposto" && casas[11].className == "Casa sobreposto" && casas[16].className == "Casa sobreposto")) {
                window.location.href = "index.html"
                return alert("Verdes ganharam!")

            } else if ((casas[9].innerHTML) && (casas[14].innerHTML) && (casas[17].innerHTML)
                && (casas[9].className == "Casa sobreposto" && casas[14].className == "Casa sobreposto" && casas[17].className == "Casa sobreposto")) {
                window.location.href = "index.html"
                return alert("Verdes ganharam!")

            } else if ((casas[2].innerHTML) && (casas[5].innerHTML) && (casas[9].innerHTML)
                && (casas[2].className == "Casa sobreposto" && casas[5].className == "Casa sobreposto" && casas[9].className == "Casa sobreposto")) {
                window.location.href = "index.html"
                return alert("Verdes ganharam!")

            } else if ((casas[7].innerHTML) && (casas[11].innerHTML) && (casas[14].innerHTML)
                && (casas[7].className == "Casa sobreposto" && casas[11].className == "Casa sobreposto" && casas[14].className == "Casa sobreposto")) {
                window.location.href = "index.html"
                return alert("Verdes ganharam!")

            } else if ((casas[13].innerHTML) && (casas[16].innerHTML) && (casas[17].innerHTML)
                && (casas[13].className == "Casa sobreposto" && casas[16].className == "Casa sobreposto" && casas[17].className == "Casa sobreposto")) {
                window.location.href = "index.html"
                return alert("Verdes ganharam!")

            } else

                //para as casas pretas sobrepostas
                if ((casas[0].innerHTML) && (casas[2].innerHTML) && (casas[6].innerHTML)
                    && (casas[0].className == "Casa Casa2 sobreposto" && casas[6].className == "Casa Casa2 sobreposto") && (casas[2].className == "Casa")) {
                    window.location.href = "index.html"
                    return alert("Pretas ganharam!")

                } else if ((casas[1].innerHTML) && (casas[2].innerHTML) && (casas[3].innerHTML)
                    && (casas[1].className == "Casa Casa2 sobreposto" && casas[3].className == "Casa Casa2 sobreposto") && (casas[2].className == "Casa")) {
                    console.log("chegou ue?")
                    window.location.href = "index.html"
                    return alert("Pretas ganharam!")

                } else if ((casas[1].innerHTML) && (casas[5].innerHTML) && (casas[10].innerHTML)
                    && (casas[1].className == "Casa Casa2 sobreposto" && casas[10].className == "Casa Casa2 sobreposto") && (casas[5].className == "Casa")) {
                    window.location.href = "index.html"
                    return alert("Pretas ganharam!")

                } else if ((casas[4].innerHTML) && (casas[5].innerHTML) && (casas[6].innerHTML)
                    && (casas[4].className == "Casa Casa2 sobreposto" && casas[6].className == "Casa Casa2 sobreposto") && (casas[5].className == "Casa")) {
                    window.location.href = "index.html"
                    return alert("Pretas ganharam!")

                } else if ((casas[2].innerHTML) && (casas[6].innerHTML) && (casas[11].innerHTML)
                    && (casas[6].className == "Casa Casa2 sobreposto") && (casas[2].className == "Casa") && (casas[11].className == "Casa")) {
                    window.location.href = "index.html"
                    return alert("Pretas ganharam!")

                } else if ((casas[5].innerHTML) && (casas[6].innerHTML) && (casas[7].innerHTML)
                    && (casas[6].className == "Casa Casa2 sobreposto") && (casas[5].className == "Casa") && (casas[7].className == "Casa")) {
                    window.location.href = "index.html"
                    return alert("Pretas ganharam!")

                } else if ((casas[3].innerHTML) && (casas[7].innerHTML) && (casas[12].innerHTML)
                    && (casas[3].className == "Casa Casa2 sobreposto" && casas[12].className == "Casa Casa2 sobreposto") && (casas[7].className == "Casa")) {
                    window.location.href = "index.html"
                    return alert("Pretas ganharam!")

                } else if ((casas[6].innerHTML) && (casas[7].innerHTML) && (casas[8].innerHTML)
                    && (casas[6].className == "Casa Casa2 sobreposto" && casas[8].className == "Casa Casa2 sobreposto") && (casas[7].className == "Casa")) {
                    window.location.href = "index.html"
                    return alert("Pretas ganharam!")

                } else if ((casas[5].innerHTML) && (casas[10].innerHTML) && (casas[14].innerHTML)
                    && (casas[10].className == "Casa Casa2 sobreposto") && (casas[5].className == "Casa") && (casas[14].className == "Casa")) {
                    window.location.href = "index.html"
                    return alert("Pretas ganharam!")

                } else if ((casas[9].innerHTML) && (casas[10].innerHTML) && (casas[11].innerHTML)
                    && (casas[10].className == "Casa Casa2 sobreposto") && (casas[9].className == "Casa") && (casas[11].className == "Casa")) {
                    window.location.href = "index.html"
                    return alert("Pretas ganharam!")

                } else if ((casas[6].innerHTML) && (casas[11].innerHTML) && (casas[15].innerHTML)
                    && (casas[6].className == "Casa Casa2 sobreposto" && casas[15].className == "Casa Casa2 sobreposto") && (casas[11].className == "Casa")) {
                    window.location.href = "index.html"
                    return alert("Pretas ganharam!")

                } else if ((casas[10].innerHTML) && (casas[11].innerHTML) && (casas[12].innerHTML)
                    && (casas[10].className == "Casa Casa2 sobreposto" && casas[12].className == "Casa Casa2 sobreposto") && (casas[11].className == "Casa")) {
                    window.location.href = "index.html"
                    return alert("Pretas ganharam!")

                } else if ((casas[7].innerHTML) && (casas[12].innerHTML) && (casas[16].innerHTML)
                    && (casas[12].className == "Casa Casa2 sobreposto") && (casas[7].className == "Casa") && (casas[16].className == "Casa")) {
                    window.location.href = "index.html"
                    return alert("Pretas ganharam!")

                } else if ((casas[11].innerHTML) && (casas[12].innerHTML) && (casas[13].innerHTML)
                    && (casas[12].className == "Casa Casa2 sobreposto") && (casas[11].className == "Casa") && (casas[13].className == "Casa")) {
                    window.location.href = "index.html"
                    return alert("Pretas ganharam!")

                } else if ((casas[11].innerHTML) && (casas[15].innerHTML) && (casas[17].innerHTML)
                    && (casas[15].className == "Casa Casa2 sobreposto") && (casas[11].className == "Casa") && (casas[17].className == "Casa")) {
                    window.location.href = "index.html"
                    return alert("Pretas ganharam!")

                } else if ((casas[14].innerHTML) && (casas[15].innerHTML) && (casas[16].innerHTML)
                    && (casas[15].className == "Casa Casa2 sobreposto") && (casas[14].className == "Casa") && (casas[16].className == "Casa")) {
                    window.location.href = "index.html"
                    return alert("Pretas ganharam!")

                } else if ((casas[0].innerHTML) && (casas[3].innerHTML) && (casas[8].innerHTML)
                    && (casas[0].className == "Casa Casa2 sobreposto" && casas[3].className == "Casa Casa2 sobreposto" && casas[8].className == "Casa Casa2 sobreposto")) {
                    window.location.href = "index.html"
                    return alert("Pretas ganharam!")

                } else if ((casas[1].innerHTML) && (casas[6].innerHTML) && (casas[12].innerHTML)
                    && (casas[1].className == "Casa Casa2 sobreposto" && casas[6].className == "Casa Casa2 sobreposto" && casas[12].className == "Casa Casa2 sobreposto")) {
                    window.location.href = "index.html"
                    return alert("Pretas ganharam!")

                } else if ((casas[4].innerHTML) && (casas[10].innerHTML) && (casas[15].innerHTML)
                    && (casas[4].className == "Casa Casa2 sobreposto" && casas[10].className == "Casa Casa2 sobreposto" && casas[15].className == "Casa Casa2 sobreposto")) {
                    window.location.href = "index.html"
                    return alert("Pretas ganharam!")

                } else if ((casas[0].innerHTML) && (casas[1].innerHTML) && (casas[5].innerHTML)
                    && (casas[0].className == "Casa Casa2 sobreposto" && casas[1].className == "Casa Casa2 sobreposto" && casas[5].className == "Casa Casa2 sobreposto")) {
                    window.location.href = "index.html"
                    return alert("Pretas ganharam!")

                } else if ((casas[3].innerHTML) && (casas[6].innerHTML) && (casas[10].innerHTML)
                    && (casas[3].className == "Casa Casa2 sobreposto" && casas[6].className == "Casa Casa2 sobreposto" && casas[10].className == "Casa Casa2 sobreposto")) {
                    window.location.href = "index.html"
                    return alert("Pretas ganharam!")

                } else if ((casas[8].innerHTML) && (casas[12].innerHTML) && (casas[15].innerHTML)
                    && (casas[8].className == "Casa Casa2 sobreposto" && casas[12].className == "Casa Casa2 sobreposto" && casas[15].className == "Casa Casa2 sobreposto")) {
                    window.location.href = "index.html"
                    return alert("Pretas ganharam!")

                }
    }, 500);
}