const API_BASE = 'https://crudcrud.com/api/27a7a08266b34df4a30c3e90c6b83c5d/clientes';

const form = document.getElementById('client-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const clientList = document.getElementById('client-list');

//Cadastrar cliente
form.addEventListener('submit', async (e) =>{
    e.preventDefault();
    const client ={
        nome: nameInput.value,
        email: emailInput.value
    };

    try {
        const res = await fetch(API_BASE, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(client)
        });
        if (res.ok) {
            nameInput.value = '';
            emailInput.value = '';
            listarClientes();
        }
    }catch (err) {
        console.error('Erro ao cadastrar cliente:', err);
    }
})

//Lista clientes
async function  listarClientes() {
    clientList.innerHTML = '';
    try{
        const res = await fetch(API_BASE);
        const clientes = await res.json();
        clientes.forEach(cliente => {
            const li = document.createElement('li');
            li.textContent = `${cliente.nome} - ${cliente.email}`;
            const btn = document.createElement('button');
            btn.textContent = 'Excluir';
            btn.onclick = () => excluirCliente(cliente._id);
            li.appendChild(btn);
            clientList.appendChild(li);            
        });
    }catch (err) {
        console.error('Erro ao listar clientes:', err);
    }
}

//Excluir cliente
async function excluirCliente(id) {
    try{
        const res = await fetch(`${API_BASE}/${id}`,{
            method: 'DELETE'
        });
        if (res.ok){
            listarClientes();
        }
    } catch (err) {
      console.error('Erro ao excluir cliente:', err);
    }
  }

//Inicializar lista
listarClientes();