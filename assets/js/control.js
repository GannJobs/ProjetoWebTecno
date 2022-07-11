function include(file_path) {
    /**
     * criando um elemento script:
     * </script><script></script>
     */
    let j = document.createElement("script");

    /**
     * informando o type como text/javacript:
     * <script type="text/javascript"></script>
     */
    j.type = "text/javascript";

    /**
     * Inserindo um src com o valor do parâmetro file_path:
     * <script type="javascript" src="+file_path+"></script>
     */
    j.src = file_path;

    /**
     * Inserindo o seu elemento(no caso o j) como filho(child) do BODY:
     * <html><body><script type="javascript" src="+file_path+"></script></body></html>
     */
    document.getElementsByTagName("body")[0].appendChild(j);
}

include("assets/js/sweatalert2.js")

function back() {
    window.location.href = "index.html"
}

let Fvitoria = [], Fwin

function recebeTexto(resultado) {
    F = resultado
    Fvitoria = F.split(".")
}


function TextAleatorioWin() {
    let aux = Math.floor(Math.random() * Fvitoria.length)
    Fwin = Fvitoria[aux]
}

const ChamarApi = async () => {
    const url = "https://frases-vitoria.herokuapp.com/textos"
    const dados = await fetch(url, { mode: 'cors', headers: { 'Access-Control-Allow-Origin': '*' } }).then(
        async (dados) => {
            const textos = await dados.json()
            recebeTexto(textos[0].textos)
        }
    )
    TextAleatorioWin()
}

ChamarApi()


let casas = document.getElementsByClassName("Casa")
let origem

let c = 0, jogada, turn = 1, t = 0, aux

function Playaudio(a) {
    if(a == 1) {
        const audio = document.getElementById('move')
        audio.play()
    } else {
        const audio = document.getElementById('win')
        audio.play()
    }
}

for (casa of casas) {
    casa.addEventListener("click", event => {
        if (!origem) {

            origem = event.target
            origem.classList.add("ativo")

        } else {

            origem.classList.remove("ativo")

            if (origem.id == event.target.id && origem.innerHTML && event.target.innerHTML) {
                origem = ""
                return Swal.fire({
                    icon: 'question',
                    title: 'Movimento Inválido!',
                    text: 'Ação Cancelada!',
                })
            }

            if (origem.id == event.target.id && !event.target.innerHTML && !origem.innerHTML) {
                if (origem.getAttribute("t") == 0) {
                    Turn(event)
                    sobrepor()
                    return
                } else if (origem.getAttribute("t") < turn - 2) {
                    Turn(event)
                    sobrepor()
                    return
                } else {
                    origem = ""
                    return Swal.fire({
                        icon: 'error',
                        title: 'Movimento Inválido!',
                        text: 'Essa casa so pode ser desobreposta no seu proximo turno!',
                    })
                }
            }

            if (!origem.innerHTML) {

                origem = ""
                return Swal.fire({
                    icon: 'error',
                    title: 'Movimento Inválido!',
                    text: 'Não se pode realizar movimentos com casas que não tem peças!',
                })

            } else if (!event.target.innerHTML) {

                Turn(event)

                if (c == 0)
                    LimitMov(event)

                turn++

            } else if (event.target.innerHTML) {

                origem = ""
                return Swal.fire({
                    icon: 'error',
                    title: 'Movimento Inválido!',
                    text: 'Não se pode para uma casa ocupada!',
                })

            }
            c = 0
        }
    })
}

function Historico() {
    let tbody = document.getElementById("innertable")
    let tr = tbody.insertRow()

    let td_turn = tr.insertCell()
    let td_jogada = tr.insertCell()

    td_jogada.innerText = jogada
    td_turn.innerText = turn
}

function showData(a) {
    if (a == 1) {
        let a = document.getElementById("divhistorico")
        if (a.getAttribute("style") == "display: none;")
            a.setAttribute("style", "")
        else
            a.setAttribute("style", "display: none;")
    } else {
        let b = document.getElementById("botoes")
        if (b.getAttribute("style") == "display: none;")
            b.setAttribute("style", "display: flex;")
        else
            b.setAttribute("style", "display: none;")
    }
}

function sobrepor() {

    let r = false
    Swal.fire({
        title: 'Sobreposição',
        text: "Deseja colocar ou retirar a sobreposição nesta casa?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Feito!',
                '',
                'success'
            )
            r = result.isConfirmed
            if (r) {

                Playaudio(1)

                if (origem.getAttribute("t") == 0) {

                    origem.setAttribute("t", turn)
                    origem.classList.toggle("sobreposto")
                    origem = ""

                } else {

                    origem.setAttribute("t", turn)
                    origem.classList.toggle("sobreposto")
                    origem = ""

                }

                Historico()
                jogada = "Sobreposição"

            }

        } else {

            t = 1
            indicarTurno()
            origem = ""
            return

        }
    })
}

function indicarTurno() {
    let bola = document.querySelector('span')
    if (t == 1) {
        console.log("So entra se cancelar")
        bola.innerHTML = turn
        if (turn % 2 == 1) {
            bola.style = "background-color: rgb(13, 179, 13);"
            t = 0
            return
        } else {
            bola.style = "background-color: rgb(44, 39, 39);"
            t = 0
            return
        }
    } else {
        console.log("Sempre entra")
        bola.innerHTML = turn + 1
        if (turn % 2 == 0) {
            bola.style = "background-color: rgb(13, 179, 13);"
            return
        } else {
            bola.style = "background-color: rgb(44, 39, 39);"
            return
        }
    }
}

function Turn(event) {
    if (turn % 2 == 1) {
        if ((origem.className == "Casa Casa2" || origem.className == "Casa sobreposto")
            && (event.target.className == "Casa Casa2" || event.target.className == "Casa sobreposto")) {
                console.log("chamo no turno")
            indicarTurno()
            return
        } else if (origem.id == event.target.id) {
            console.log("chamo no turno")
            indicarTurno()
            return
        } else if (origem.className == "Casa" || origem.className == "Casa Casa2 sobreposto") {
            c = 1
            origem = ""
            turn--
            return Swal.fire(
                'Turno do Oponente!',
                'É o turno das Verdes, nao pule o turno !',
                'warning'
            )
        }

    } else if (turn % 2 == 0) {
        if ((origem.className == "Casa" || origem.className == "Casa Casa2 sobreposto")
            && (event.target.className == "Casa" || event.target.className == "Casa Casa2 sobreposto")) {
                console.log("chamo no turno")
            indicarTurno()
            return
        } else if (origem.id == event.target.id) {
            console.log("chamo no turno")
            indicarTurno()
            return
        } else if (origem.className == "Casa Casa2" || origem.className == "Casa sobreposto") {
            c = 1
            origem = ""
            turn--
            return Swal.fire(
                'Turno do Oponente!',
                'É o turno das Pretas, nao pule o turno !',
                'warning'
            )
        }
    }
}

function mov(evento) {
    Historico()
    Playaudio(1)
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
        return Swal.fire(
            'Movimento não tratado',
            'Perdoe o desenvolvedor!',
            'error'
        )
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
        turn--
        return Swal.fire(
            'Movimento não tratado',
            'Perdoe o desenvolvedor!',
            'error'
        )
    }
}

function movimento(event) {
    //Movimentação das verdes em casas normais e sobrepostas
    if (origem.className == "Casa Casa2" && event.target.className == "Casa Casa2") {

        jogada = "verde => Verde"
        movV(event)

    } else if (origem.className == "Casa Casa2" && ((event.target.className == "Casa sobreposto")
        || event.target.className == "Casa Casa2")) {

        jogada = "Verde => Preta Sobreposta"
        movV(event)

    } else if (origem.className == "Casa sobreposto" && ((event.target.className == "Casa Casa2")
        || (event.target.className == "Casa sobreposto"))) {

        jogada = "Preta Sobreposta => Preta Sobreposta ou Verde"
        movV(event)

    } else

        //Movimentação das pretas em casas normais e sobrepostas
        if (origem.className == "Casa" && event.target.className == "Casa") {

            jogada = "Preta => Preta"
            movP(event)

        } else if (origem.className == "Casa" && ((event.target.className == "Casa Casa2 sobreposto")
            || (event.target.className == "Casa"))) {

            jogada = "Preta => Verde Sobreposta"
            movP(event)

        } else if (origem.className == "Casa Casa2 sobreposto" && ((event.target.className == "Casa")
            || (event.target.className == "Casa Casa2 sobreposto"))) {

            jogada = "Verde Sobreposta => Verde Sobreposta ou Verde Sobreposta"
            movP(event)

        } else {

            turn--
            origem = ""
            return Swal.fire({
                icon: 'error',
                title: 'Movimento Inválido!',
                text: 'So mover a peça para a casa de sua respectiva cor!',
            })
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
        origem = ""
        turn--
        Swal.fire(
            'Movimento Inválido!',
            'Fora do limite de movimento (1 casa), perdeu o turno',
            'error'
        )
        return
    }
}

function backwin() {
    backgroundwin = document.getElementById("backwin")
    backgroundwin.style = "display: block; margin-top:20vh;"
}

function jogarN(vencedor) {
    backwin()
    Playaudio(2)
    casas = ""
    Swal.fire({
        title: 'As ' + vencedor + ' ganharam!',
        text: '' + Fwin + '',
        imageUrl: 'https://img.freepik.com/vetores-gratis/trofeu-de-ouro-com-a-placa-de-identificacao-do-vencedor-da-competicao_68708-545.jpg?w=2000',
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: 'Custom image',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'GG!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Fim de Jogo',
                text: "Deseja jogar novamente?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceitar'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "Jogo.html"
                    return
                } else {
                    window.location.href = "index.html"
                    return
                }
            })
        }
    })
}

function vencerV() {
    setInterval(() => {
        if (!casas) return
        //para as verdes
        if ((casas[1].innerHTML) && (casas[4].innerHTML) && (casas[0].innerHTML)
            && (casas[1].className == "Casa Casa2") && (casas[4].className == "Casa Casa2") && (casas[0].className == "Casa Casa2")) {

            jogarN("Verdes")
            return

        } else if ((casas[10].innerHTML) && (casas[6].innerHTML) && (casas[3].innerHTML)
            && (casas[10].className == "Casa Casa2") && (casas[6].className == "Casa Casa2") && (casas[3].className == "Casa Casa2")) {

            jogarN("Verdes")
            return

        } else if ((casas[15].innerHTML) && (casas[12].innerHTML) && (casas[8].innerHTML)
            && (casas[15].className == "Casa Casa2") && (casas[12].className == "Casa Casa2") && (casas[8].className == "Casa Casa2")) {

            jogarN("Verdes")
            return

        } else if ((casas[0].innerHTML) && (casas[3].innerHTML) && (casas[8].innerHTML)
            && (casas[0].className == "Casa Casa2") && (casas[3].className == "Casa Casa2") && (casas[8].className == "Casa Casa2")) {

            jogarN("Verdes")
            return

        } else if ((casas[1].innerHTML) && (casas[6].innerHTML) && (casas[12].innerHTML)
            && (casas[1].className == "Casa Casa2") && (casas[6].className == "Casa Casa2") && (casas[12].className == "Casa Casa2")) {

            jogarN("Verdes")
            return

        } else if ((casas[4].innerHTML) && (casas[10].innerHTML) && (casas[15].innerHTML)
            && (casas[4].className == "Casa Casa2") && (casas[10].className == "Casa Casa2") && (casas[15].className == "Casa Casa2")) {

            jogarN("Verdes")
            return

            //para as pretas
        } else if ((casas[2].innerHTML) && (casas[5].innerHTML) && (casas[9].innerHTML)
            && (casas[2].className == "Casa") && (casas[5].className == "Casa") && (casas[9].className == "Casa")) {

            jogarN("Pretas")
            return

        } else if ((casas[7].innerHTML) && (casas[11].innerHTML) && (casas[14].innerHTML)
            && (casas[7].className == "Casa") && (casas[11].className == "Casa") && (casas[14].className == "Casa")) {

            jogarN("Pretas")
            return

        } else if ((casas[13].innerHTML) && (casas[16].innerHTML) && (casas[17].innerHTML)
            && (casas[13].className == "Casa") && (casas[16].className == "Casa") && (casas[17].className == "Casa")) {

            jogarN("Pretas")
            return

        } else if ((casas[2].innerHTML) && (casas[7].innerHTML) && (casas[13].innerHTML)
            && (casas[2].className == "Casa") && (casas[7].className == "Casa") && (casas[13].className == "Casa")) {

            jogarN("Pretas")
            return

        } else if ((casas[5].innerHTML) && (casas[11].innerHTML) && (casas[16].innerHTML)
            && (casas[5].className == "Casa") && (casas[11].className == "Casa") && (casas[16].className == "Casa")) {

            jogarN("Pretas")
            return

        } else if ((casas[9].innerHTML) && (casas[14].innerHTML) && (casas[17].innerHTML)
            && (casas[9].className == "Casa") && (casas[14].className == "Casa") && (casas[17].className == "Casa")) {

            jogarN("Pretas")
            return

        } else

            //para as casas sobrepostas verdes
            if ((casas[1].innerHTML) && (casas[2].innerHTML) && (casas[3].innerHTML)
                && (casas[2].className == "Casa sobreposto") && (casas[1].className == "Casa Casa2") && (casas[3].className == "Casa Casa2")) {

                jogarN("Verdes")
                return

            } else if ((casas[0].innerHTML) && (casas[2].innerHTML) && (casas[6].innerHTML)
                && (casas[2].className == "Casa sobreposto") && (casas[0].className == "Casa Casa2") && (casas[3].className == "Casa Casa2")) {

                jogarN("Verdes")
                return

            } else if ((casas[1].innerHTML) && (casas[5].innerHTML) && (casas[10].innerHTML)
                && (casas[5].className == "Casa sobreposto") && (casas[1].className == "Casa Casa2") && (casas[10].className == "Casa Casa2")) {

                jogarN("Verdes")
                return

            } else if ((casas[4].innerHTML) && (casas[5].innerHTML) && (casas[6].innerHTML)
                && (casas[5].className == "Casa sobreposto") && (casas[4].className == "Casa Casa2") && (casas[6].className == "Casa Casa2")) {

                jogarN("Verdes")
                return

            } else if ((casas[5].innerHTML) && (casas[6].innerHTML) && (casas[7].innerHTML)
                && (casas[5].className == "Casa sobreposto" && casas[7].className == "Casa sobreposto") && (casas[6].className == "Casa Casa2")) {

                jogarN("Verdes")
                return

            } else if ((casas[2].innerHTML) && (casas[6].innerHTML) && (casas[11].innerHTML)
                && (casas[11].className == "Casa sobreposto" && casas[2].className == "Casa sobreposto") && (casas[6].className == "Casa Casa2")) {

                jogarN("Verdes")
                return

            } else if ((casas[3].innerHTML) && (casas[7].innerHTML) && (casas[12].innerHTML)
                && (casas[7].className == "Casa sobreposto") && (casas[3].className == "Casa Casa2") && (casas[12].className == "Casa Casa2")) {

                jogarN("Verdes")
                return

            } else if ((casas[6].innerHTML) && (casas[7].innerHTML) && (casas[8].innerHTML)
                && (casas[7].className == "Casa sobreposto") && (casas[6].className == "Casa Casa2") && (casas[8].className == "Casa Casa2")) {

                jogarN("Verdes")
                return

            } else if ((casas[5].innerHTML) && (casas[10].innerHTML) && (casas[14].innerHTML)
                && (casas[5].className == "Casa sobreposto" && casas[14].className == "Casa sobreposto") && (casas[10].className == "Casa Casa2")) {

                jogarN("Verdes")
                return

            } else if ((casas[9].innerHTML) && (casas[10].innerHTML) && (casas[11].innerHTML)
                && (casas[9].className == "Casa sobreposto" && casas[11].className == "Casa sobreposto") && (casas[10].className == "Casa Casa2")) {

                jogarN("Verdes")
                return

            } else if ((casas[6].innerHTML) && (casas[11].innerHTML) && (casas[15].innerHTML)
                && (casas[11].className == "Casa sobreposto") && (casas[6].className == "Casa Casa2") && (casas[15].className == "Casa Casa2")) {

                jogarN("Verdes")
                return

            } else if ((casas[10].innerHTML) && (casas[11].innerHTML) && (casas[12].innerHTML)
                && (casas[11].className == "Casa sobreposto") && (casas[10].className == "Casa Casa2") && (casas[12].className == "Casa Casa2")) {

                jogarN("Verdes")
                return

            } else if ((casas[7].innerHTML) && (casas[12].innerHTML) && (casas[16].innerHTML)
                && (casas[7].className == "Casa sobreposto" && casas[16].className == "Casa sobreposto") && (casas[12].className == "Casa Casa2")) {

                jogarN("Verdes")
                return

            } else if ((casas[11].innerHTML) && (casas[12].innerHTML) && (casas[13].innerHTML)
                && (casas[11].className == "Casa sobreposto" && casas[13].className == "Casa sobreposto") && (casas[12].className == "Casa Casa2")) {

                jogarN("Verdes")
                return

            } else if ((casas[11].innerHTML) && (casas[15].innerHTML) && (casas[17].innerHTML)
                && (casas[11].className == "Casa sobreposto" && casas[17].className == "Casa sobreposto") && (casas[15].className == "Casa Casa2")) {

                jogarN("Verdes")
                return

            } else if ((casas[14].innerHTML) && (casas[15].innerHTML) && (casas[16].innerHTML)
                && (casas[14].className == "Casa sobreposto" && casas[16].className == "Casa sobreposto") && (casas[15].className == "Casa Casa2")) {

                jogarN("Verdes")
                return

            } else if ((casas[2].innerHTML) && (casas[7].innerHTML) && (casas[13].innerHTML)
                && (casas[2].className == "Casa sobreposto" && casas[7].className == "Casa sobreposto" && casas[13].className == "Casa sobreposto")) {

                jogarN("Verdes")
                return

            } else if ((casas[5].innerHTML) && (casas[11].innerHTML) && (casas[16].innerHTML)
                && (casas[5].className == "Casa sobreposto" && casas[11].className == "Casa sobreposto" && casas[16].className == "Casa sobreposto")) {

                jogarN("Verdes")
                return

            } else if ((casas[9].innerHTML) && (casas[14].innerHTML) && (casas[17].innerHTML)
                && (casas[9].className == "Casa sobreposto" && casas[14].className == "Casa sobreposto" && casas[17].className == "Casa sobreposto")) {

                jogarN("Verdes")
                return

            } else if ((casas[2].innerHTML) && (casas[5].innerHTML) && (casas[9].innerHTML)
                && (casas[2].className == "Casa sobreposto" && casas[5].className == "Casa sobreposto" && casas[9].className == "Casa sobreposto")) {

                jogarN("Verdes")
                return

            } else if ((casas[7].innerHTML) && (casas[11].innerHTML) && (casas[14].innerHTML)
                && (casas[7].className == "Casa sobreposto" && casas[11].className == "Casa sobreposto" && casas[14].className == "Casa sobreposto")) {

                jogarN("Verdes")
                return

            } else if ((casas[13].innerHTML) && (casas[16].innerHTML) && (casas[17].innerHTML)
                && (casas[13].className == "Casa sobreposto" && casas[16].className == "Casa sobreposto" && casas[17].className == "Casa sobreposto")) {

                jogarN("Verdes")
                return

            } else

                //para as casas pretas sobrepostas
                if ((casas[0].innerHTML) && (casas[2].innerHTML) && (casas[6].innerHTML)
                    && (casas[0].className == "Casa Casa2 sobreposto" && casas[6].className == "Casa Casa2 sobreposto") && (casas[2].className == "Casa")) {

                    jogarN("Pretas")
                    return

                } else if ((casas[1].innerHTML) && (casas[2].innerHTML) && (casas[3].innerHTML)
                    && (casas[1].className == "Casa Casa2 sobreposto" && casas[3].className == "Casa Casa2 sobreposto") && (casas[2].className == "Casa")) {

                    jogarN("Pretas")
                    return

                } else if ((casas[1].innerHTML) && (casas[5].innerHTML) && (casas[10].innerHTML)
                    && (casas[1].className == "Casa Casa2 sobreposto" && casas[10].className == "Casa Casa2 sobreposto") && (casas[5].className == "Casa")) {

                    jogarN("Pretas")
                    return

                } else if ((casas[4].innerHTML) && (casas[5].innerHTML) && (casas[6].innerHTML)
                    && (casas[4].className == "Casa Casa2 sobreposto" && casas[6].className == "Casa Casa2 sobreposto") && (casas[5].className == "Casa")) {

                    jogarN("Pretas")
                    return

                } else if ((casas[2].innerHTML) && (casas[6].innerHTML) && (casas[11].innerHTML)
                    && (casas[6].className == "Casa Casa2 sobreposto") && (casas[2].className == "Casa") && (casas[11].className == "Casa")) {

                    jogarN("Pretas")
                    return

                } else if ((casas[5].innerHTML) && (casas[6].innerHTML) && (casas[7].innerHTML)
                    && (casas[6].className == "Casa Casa2 sobreposto") && (casas[5].className == "Casa") && (casas[7].className == "Casa")) {

                    jogarN("Pretas")
                    return

                } else if ((casas[3].innerHTML) && (casas[7].innerHTML) && (casas[12].innerHTML)
                    && (casas[3].className == "Casa Casa2 sobreposto" && casas[12].className == "Casa Casa2 sobreposto") && (casas[7].className == "Casa")) {

                    jogarN("Pretas")
                    return

                } else if ((casas[6].innerHTML) && (casas[7].innerHTML) && (casas[8].innerHTML)
                    && (casas[6].className == "Casa Casa2 sobreposto" && casas[8].className == "Casa Casa2 sobreposto") && (casas[7].className == "Casa")) {

                    jogarN("Pretas")
                    return

                } else if ((casas[5].innerHTML) && (casas[10].innerHTML) && (casas[14].innerHTML)
                    && (casas[10].className == "Casa Casa2 sobreposto") && (casas[5].className == "Casa") && (casas[14].className == "Casa")) {

                    jogarN("Pretas")
                    return

                } else if ((casas[9].innerHTML) && (casas[10].innerHTML) && (casas[11].innerHTML)
                    && (casas[10].className == "Casa Casa2 sobreposto") && (casas[9].className == "Casa") && (casas[11].className == "Casa")) {

                    jogarN("Pretas")
                    return

                } else if ((casas[6].innerHTML) && (casas[11].innerHTML) && (casas[15].innerHTML)
                    && (casas[6].className == "Casa Casa2 sobreposto" && casas[15].className == "Casa Casa2 sobreposto") && (casas[11].className == "Casa")) {

                    jogarN("Pretas")
                    return

                } else if ((casas[10].innerHTML) && (casas[11].innerHTML) && (casas[12].innerHTML)
                    && (casas[10].className == "Casa Casa2 sobreposto" && casas[12].className == "Casa Casa2 sobreposto") && (casas[11].className == "Casa")) {

                    jogarN("Pretas")
                    return

                } else if ((casas[7].innerHTML) && (casas[12].innerHTML) && (casas[16].innerHTML)
                    && (casas[12].className == "Casa Casa2 sobreposto") && (casas[7].className == "Casa") && (casas[16].className == "Casa")) {

                    jogarN("Pretas")
                    return

                } else if ((casas[11].innerHTML) && (casas[12].innerHTML) && (casas[13].innerHTML)
                    && (casas[12].className == "Casa Casa2 sobreposto") && (casas[11].className == "Casa") && (casas[13].className == "Casa")) {

                    jogarN("Pretas")
                    return

                } else if ((casas[11].innerHTML) && (casas[15].innerHTML) && (casas[17].innerHTML)
                    && (casas[15].className == "Casa Casa2 sobreposto") && (casas[11].className == "Casa") && (casas[17].className == "Casa")) {

                    jogarN("Pretas")
                    return

                } else if ((casas[14].innerHTML) && (casas[15].innerHTML) && (casas[16].innerHTML)
                    && (casas[15].className == "Casa Casa2 sobreposto") && (casas[14].className == "Casa") && (casas[16].className == "Casa")) {

                    jogarN("Pretas")
                    return

                } else if ((casas[0].innerHTML) && (casas[3].innerHTML) && (casas[8].innerHTML)
                    && (casas[0].className == "Casa Casa2 sobreposto" && casas[3].className == "Casa Casa2 sobreposto" && casas[8].className == "Casa Casa2 sobreposto")) {

                    jogarN("Pretas")
                    return

                } else if ((casas[1].innerHTML) && (casas[6].innerHTML) && (casas[12].innerHTML)
                    && (casas[1].className == "Casa Casa2 sobreposto" && casas[6].className == "Casa Casa2 sobreposto" && casas[12].className == "Casa Casa2 sobreposto")) {

                    jogarN("Pretas")
                    return

                } else if ((casas[4].innerHTML) && (casas[10].innerHTML) && (casas[15].innerHTML)
                    && (casas[4].className == "Casa Casa2 sobreposto" && casas[10].className == "Casa Casa2 sobreposto" && casas[15].className == "Casa Casa2 sobreposto")) {

                    jogarN("Pretas")
                    return

                } else if ((casas[0].innerHTML) && (casas[1].innerHTML) && (casas[5].innerHTML)
                    && (casas[0].className == "Casa Casa2 sobreposto" && casas[1].className == "Casa Casa2 sobreposto" && casas[5].className == "Casa Casa2 sobreposto")) {

                    jogarN("Pretas")
                    return

                } else if ((casas[3].innerHTML) && (casas[6].innerHTML) && (casas[10].innerHTML)
                    && (casas[3].className == "Casa Casa2 sobreposto" && casas[6].className == "Casa Casa2 sobreposto" && casas[10].className == "Casa Casa2 sobreposto")) {

                    jogarN("Pretas")
                    return

                } else if ((casas[8].innerHTML) && (casas[12].innerHTML) && (casas[15].innerHTML)
                    && (casas[8].className == "Casa Casa2 sobreposto" && casas[12].className == "Casa Casa2 sobreposto" && casas[15].className == "Casa Casa2 sobreposto")) {

                    jogarN("Pretas")
                    return

                }
    }, 500);
}