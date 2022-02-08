
interface Object {
    isEmpty(): boolean;
}

interface ObjectConstructor {
    fromEntries(entries: IterableIterator<[string, FormDataEntryValue]>): any;
}

interface RestAPI201 {
    detail: string;
}

interface RestAPI400 {
    detail: string;
}

interface Pessoa {
    id?: number;
    nome: string;
    idade: number;
    
}

Object.prototype.isEmpty = function(): boolean {
    return Object.keys(this).length === 0;
}

const objectFromFormData = function(formData: FormData): Pessoa {
    return Object.fromEntries(formData.entries())
}

const capitalize = function(text: string): string {
    return text.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
}

const apiUrl = '';//'http://localhost:3000';

async function getPessoas(): Promise<{pessoas: Pessoa[]}> {
    try {
        let response = await fetch(
            `${apiUrl}/pessoas`,
            {
                method:'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
        return (await response.json())
    } catch (TypeError) {
        alert("Não foi possível se conectar com o servidor")
        return {"pessoas": []}
    }
}

type CreatePessoa = {pessoa: Pessoa} | RestAPI400 | {}
async function createPessoa(pessoa: Pessoa): Promise<CreatePessoa> {
    try {
        let response = await fetch(
	    `${apiUrl}/pessoas`,
            {
                method:'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pessoa)
            }
        )
        return (await response.json())
    } catch (TypeError) {
        alert("Não foi possível se conectar com o servidor")
        return {}
    }
}

async function deletePessoa(pessoa_id: number): Promise<boolean> {
    try {
        let response = await fetch(
	    `${apiUrl}/pessoas/${pessoa_id}`,
            {
                method:'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
	return true
    } catch (TypeError) {
        alert("Não foi possível se conectar com o servidor")
        return true
    }
}

function prependPessoaListItem(pessoa: Pessoa): void {
    let ul = document.querySelector(".lista-pessoas")
    if (!ul)
        return
    let li = document.createElement('li')
    li.innerText = `${capitalize(pessoa.nome)} tem ${pessoa.idade} ano(s)`
    li.classList.add('list-group-item')

    let delete_btn = document.createElement('a')
    delete_btn.classList.add('float-end', 'btn', 'btn-danger')
    delete_btn.innerText = 'remover'
    delete_btn.setAttribute('data-pessoa-id', String(pessoa.id))
    delete_btn.addEventListener('click', async function (event): Promise<void> {
        event.preventDefault()
        let pessoa_id: number = Number.parseInt(delete_btn.getAttribute('data-pessoa-id') as string)
        let deleted = await deletePessoa(pessoa_id)
        if (deleted) {
            let parent_li = this.parentElement
            if (parent_li) {
                parent_li.remove()
            }
        }
    })

    li.append(delete_btn)
    ul.prepend(li)
}

let form: HTMLFormElement|null = document.querySelector(".form-pessoa")
if (form) {
    form.addEventListener('submit', async function (event): Promise <void> {
        event.preventDefault()
        let formData = new FormData(this)
        let data: Pessoa = objectFromFormData(formData)
        let response_payload = await createPessoa(data)
        if ("pessoa" in response_payload) {
            let pessoa = response_payload.pessoa
            prependPessoaListItem(pessoa)
        } else if ("detail" in response_payload) {
            alert(response_payload.detail)
        }
    })
}

window.onload = async function (event): Promise<void> {
    let response_payload = await getPessoas()
    if (!response_payload.pessoas.length)
        return
    let pessoas = response_payload.pessoas
    for (let pessoa of pessoas) {
        prependPessoaListItem(pessoa)
    }
};
