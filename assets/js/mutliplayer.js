import { vencerV } from './control.js';

const socket = new WebSocket('ws://localhost:8080'); // Substitua pelo servidor real
let playerRole = null; // 'green' ou 'black'
let isMyTurn = false;

// Gerar link de convite
const inviteLink = document.createElement('a');
inviteLink.href = `${window.location.origin}?invite=${Math.random().toString(36).substring(2)}`;
inviteLink.textContent = 'Copie este link e envie para o adversário';
document.body.appendChild(inviteLink);

socket.onopen = () => {
    console.log('Conectado ao servidor');
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('invite')) {
        // Jogador que entrou via link de convite
        socket.send(JSON.stringify({ type: 'join', inviteCode: urlParams.get('invite') }));
    } else {
        // Criador do jogo
        socket.send(JSON.stringify({ type: 'create' }));
    }
};

// Receber mensagens do servidor
socket.onmessage = (event) => {
    const message = JSON.parse(event.data);

    switch (message.type) {
        case 'role-assignment':
            playerRole = message.role;
            isMyTurn = playerRole === 'green'; // Verde começa
            console.log(`Você é o jogador ${playerRole}`);
            break;

        case 'move':
            realizarMovimento(message.move);
            isMyTurn = true;
            break;

        case 'end':
            alert(`O jogador ${message.winner} venceu!`);
            exibirOpcoes();
            break;

        default:
            console.error('Mensagem desconhecida:', message);
    }
};

// Função para realizar um movimento
function realizarMovimento(move) {
    const casa = document.getElementById(move.targetId);
    const origem = document.getElementById(move.originId);

    origem.innerHTML = '';
    casa.innerHTML = move.piece;

    // Verificar vitória
    setTimeout(() => vencerV(), 500);
}

// Enviar movimento ao servidor
function enviarMovimento(originId, targetId) {
    if (!isMyTurn) return alert('Não é seu turno!');
    const origem = document.getElementById(originId);
    const destino = document.getElementById(targetId);

    if (validarMovimento(origem, destino)) {
        socket.send(JSON.stringify({
            type: 'move',
            move: {
                originId,
                targetId,
                piece: origem.innerHTML
            }
        }));
        isMyTurn = false;
    }
}

// Validar movimento (simplificação)
function validarMovimento(origem, destino) {
    return origem.innerHTML && !destino.innerHTML; // Pode adicionar lógica completa
}

// Exibir opções após o jogo
function exibirOpcoes() {
    const restart = confirm('Deseja jogar novamente?');
    if (restart) {
        socket.send(JSON.stringify({ type: 'restart' }));
        location.reload();
    } else {
        socket.send(JSON.stringify({ type: 'leave' }));
        window.location.href = 'index.html';
    }
}

// Adicionar eventos de clique nas casas
document.querySelectorAll('.Casa').forEach(casa => {
    casa.addEventListener('click', (event) => {
        if (!isMyTurn) return;
        const originId = document.querySelector('.ativo')?.id;
        const targetId = event.target.id;

        if (originId) {
            enviarMovimento(originId, targetId);
        }
    });
});
