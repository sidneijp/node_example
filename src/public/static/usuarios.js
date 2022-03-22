"use strict";
Object.prototype.isEmpty = function () {
    return Object.keys(this).length === 0;
};
const objectFromFormData = function (formData) {
    return Object.fromEntries(formData.entries());
};
const capitalize = function (text) {
    return text.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
};
const apiUrl = ''; //'http://localhost:3000';
async function getUsuarios() {
    try {
        let response = await fetch(`${apiUrl}/usuarios`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        });
        return (await response.json());
    }
    catch (TypeError) {
        alert("Não foi possível se conectar com o servidor");
        return { "usuarios": [] };
    }
}
async function createUsuario(usuario) {
    try {
        let response = await fetch(`${apiUrl}/usuarios`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(usuario)
        });
        return (await response.json());
    }
    catch (TypeError) {
        alert("Não foi possível se conectar com o servidor");
        return {};
    }
}
async function deleteUsuario(usuario_id) {
    try {
        let response = await fetch(`${apiUrl}/usuarios/${usuario_id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        });
        return true;
    }
    catch (TypeError) {
        alert("Não foi possível se conectar com o servidor");
        return true;
    }
}
function prependUsuarioListItem(usuario) {
    let ul = document.querySelector(".lista-usuarios");
    if (!ul)
        return;
    let li = document.createElement('li');
    li.innerText = `${capitalize(usuario.nome)} tem ${usuario.idade} ano(s)`;
    li.classList.add('list-group-item');
    let delete_btn = document.createElement('a');
    delete_btn.classList.add('float-end', 'btn', 'btn-danger');
    delete_btn.innerText = 'remover';
    delete_btn.setAttribute('data-usuario-id', String(usuario.id));
    delete_btn.addEventListener('click', async function (event) {
        event.preventDefault();
        let usuario_id = Number.parseInt(delete_btn.getAttribute('data-usuario-id'));
        let deleted = await deleteUsuario(usuario_id);
        if (deleted) {
            let parent_li = this.parentElement;
            if (parent_li) {
                parent_li.remove();
            }
        }
    });
    li.append(delete_btn);
    ul.prepend(li);
}
let form = document.querySelector(".form-usuario");
if (form) {
    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        let formData = new FormData(this);
        let data = objectFromFormData(formData);
        let response_payload = await createUsuario(data);
        if ("usuario" in response_payload) {
            let usuario = response_payload.usuario;
            prependUsuarioListItem(usuario);
        }
        else if ("detail" in response_payload) {
            alert(response_payload.detail);
        }
    });
}
window.onload = async function (event) {
    let response_payload = await getUsuarios();
    if (!response_payload.usuarios.length)
        return;
    let usuarios = response_payload.usuarios;
    for (let usuario of usuarios) {
        prependUsuarioListItem(usuario);
    }
};
