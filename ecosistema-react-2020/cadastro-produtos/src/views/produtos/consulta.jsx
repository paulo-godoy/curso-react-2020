import React from 'react';
import ProdutoService from '../../app/produtoService';
import { withRouter } from 'react-router-dom';

class ConsultaProdutos extends React.Component {

    state = {
        produtos : []
    }

    constructor(){
        super()
        this.service = new ProdutoService();
    }

    componentDidMount() {
        const produtos = this.service.obterProdutos()
        this.setState({produtos})
    }

    preparaEditar = (sku) => {
        console.log('Editar ' ,sku)
        this.props.history.push(`/cadastro-produto/${sku}`)
    }

    deletar = (sku) => {
        const produtos = this.service.deletar(sku)
        this.setState({produtos})
    }

    render() {
        return (

            <div className="card">
                <div className="card-header">
                    Consulta Produtos
                </div>
                <div className="card-body">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>SKU</th>
                                <th>Preço</th>
                                <th>Fornecedor</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.produtos.map( (produto, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{produto.nome}</td>
                                        <td>{produto.sku}</td>
                                        <td>{produto.preco}</td>
                                        <td>{produto.fornecedor}</td>
                                        <td>
                                            <button onClick={ () => this.preparaEditar(produto.sku)} className="btn btn-primary mr-2">Editar</button>
                                            <button onClick={ () => this.deletar(produto.sku)} className="btn btn-danger">Excluir</button>
                                        </td>
                                    </tr>
                                )

                                })

                            }
                        </tbody>
                    </table>
                </div>
            </div>
            
        )
    }
}

export default withRouter(ConsultaProdutos);