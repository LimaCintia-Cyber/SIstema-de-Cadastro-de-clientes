import { Client } from './classes.js';
import { API_BASE, validateClient, renderClient } from './utils.js';

const form = document.getElementById('client-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const clientList = document.getElementById('client-list');

const listarClientes = async () => {
    try {
        const res = await fetch(API_BASE);
        const clientes = await res.json();
        renderClient(clientes, clientList, excluirCliente);
    } catch (err) {
        console.error('Erro ao listar clientes:', err);
    }
};

const cadastroClient = async (e) => {
    e.preventDefault();
    const nome = nameInput.value;
    const email = emailInput.value;

    if (!validateClient(nome, email)) {
        alert('Dados inválidos. Verifique o nome e o email.');
        return;
    }

    const client = new Client(nome, email);

    try {
        const res = await fetch(API_BASE, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(client)
        });

        if (res.ok) {
            form.reset();
            listarClientes();
        }
    } catch (err) {
        console.error('Erro ao cadastrar cliente:', err);
    }
};

const excluirCliente = async (id) => {
    try {
        const res = await fetch(`${API_BASE}/${id}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            listarClientes();
        }
    } catch (err) {
        console.error('Erro ao excluir cliente:', err);
    }
};

form.addEventListener('submit', cadastroClient);
listarClientes();
