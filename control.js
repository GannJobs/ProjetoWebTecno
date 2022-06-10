let matriz = document.querySelector(".Matriz")
let casas = document.getElementsByClassName("Casa")
let linhas = document.getElementsByClassName("Linha")
let origem,origeml

for(linha of linhas){
    linha.addEventListener("click", event => {
        let permissao = event.target.id;
        console.log(permissao);
    for(casa of casas){
        casa.addEventListener("click", event => {
            //console.log(event.target.id)
                if(!origem) {
                    origem = event.target
                    origeml = permissao
                }else{
                    console.log(permissao)
                    if((origem.id % 2 == 1) && (event.target.id % 2 == 1)){
                        let teste = event.target.innerHTML
                        if(permissao == origeml+1 || permissao == origeml-1)
                            if(teste == ""){
                                event.target.innerHTML = origem.innerHTML
                                origem.innerHTML = ""
                                origem = null
                                permissao = ""
                            }
                    }
                }
        })
    }
})
}