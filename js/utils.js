export const API_BASE = `https://crudcrud.com/api/ec7349b7274b4d6e80b3c329f0c9daa2/clientes`;

//Função pura para validar cliente
export const validateClient = (nome, email) =>
    nome.trim() !== '' && email.includes('@');

//Renderiza lista no DOM
export const renderClient = (clientes, container, onDelete) => {
    container.innerHTML = '';
    clientes.map(cliente => {
        const li = document.createElement('li');
        li.textContent = `${cliente.nome} - ${cliente.email}`;
        const btn = document.createElement('button');
        btn.textContent = 'Excluir';
        btn.addEventListener('click', () => onDelete(cliente._id));
        li.appendChild(btn);
        container.appendChild(li);
    });
};