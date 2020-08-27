

const PRODUTOS = '_PRODUTOS'

export function ErrosValidacao(errors) {
    this.errors = errors;
}

export default class ProdutoService {

    validar = (produto) => {
        const errors = []

        if (!produto.nome){ 
            errors.push('O campo nome é obrigatório.')
        }

        if (!produto.sku){ 
            errors.push('O campo sku é obrigatório.')
        }

        if (!produto.descricao){ 
            errors.push('O campo descrição é obrigatório.')
        }

        if (!produto.preco || produto.preco <= 0){ 
            errors.push('O campo preço deve possuir um valor maior que 0.')
        }

        if (!produto.fornecedor){ 
            errors.push('O campo fornecedor é obrigatório.')
        }

        if (errors.length > 0) {
            throw new ErrosValidacao(errors)
        }
    }

    obterProdutos = () => {
        const produtos = localStorage.getItem(PRODUTOS)
        // esse if ferifica se não tiver dados retorna um array vazio na tela de consulta
        if (!produtos){
            return [];
        }
        return JSON.parse(produtos)
    }

    obterIndex = (sku) => {
        let index = null;
        this.obterProdutos().forEach( (produto, i ) => {
            if (produto.sku === sku ) {
                index = i;
            }
        })

        return index;

    }

    deletar = (sku) => {
        const index = this.obterIndex(sku)
        if (index !== null) {
            const produtos = this.obterProdutos()
            // o splice vai deletar apartir do index a quantidade de um elemento
            produtos.splice(index, 1)
            localStorage.setItem(PRODUTOS, JSON.stringify(produtos))
            // abaixo retorna o array de produtos atualizados
            return produtos
        }
    }

    salvar = (produto) => {
            this.validar(produto)

            let produtos = localStorage.getItem(PRODUTOS)

            if (!produtos) {
                produtos = []
            } else {
                produtos = JSON.parse(produtos)
            }

            const index = this.obterIndex(produto.sku)
            if (index === null) {
                produtos.push(produto);
            } else {
                produtos[index] = produto;
            }

            

            localStorage.setItem(PRODUTOS, JSON.stringify(produtos))
    }
}