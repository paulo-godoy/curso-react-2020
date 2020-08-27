import React from 'react';
import Card from '../../components/card';
import ProdutoService from '../../app/produtoService';
import { withRouter } from 'react-router-dom';


const estadoInicial = {
    nome: '',
    sku: '',
    descricao: '',
    preco: 0,
    fornecedor: '',
    sucesso: false,
    errors: [],
    atualizando: false
}

class CadastroProduto extends React.Component {

    state = estadoInicial;

    constructor() {
        super()
        this.service = new ProdutoService();
    }

    // esse função pega os valores dos campos
    onChange = (event) => {
        const valor = event.target.value
        const nomeDoCampo = event.target.name
        this.setState({ [nomeDoCampo]: valor })
    }

    onSubmit = (event) => {
        // sempre utilizar o event.prventDefault() para submeter formularios
        event.preventDefault();
        const produto = {
            nome: this.state.nome,
            sku: this.state.sku,
            descricao: this.state.descricao,
            preco: this.state.preco,
            fornecedor: this.state.fornecedor
        }

        try {
            this.service.salvar(produto);
            this.limpaCampos();
            this.setState({ sucesso: true })
        } catch (e) {
            const errors = e.errors
            this.setState({ errors: errors })
        }


    }

    limpaCampos = () => {
        this.setState(estadoInicial)
    }

    componentDidMount() {
        const sku = this.props.match.params.sku

        if (sku) {
            const resultado = this.service.obterProdutos().filter(produto => produto.sku === sku)

            if (resultado.length === 1) {
                const produtoEncontrado = resultado[0]
                this.setState({ ...produtoEncontrado, atualizando: true })
            }
        }
    }

    render() {
        return (
            <Card header={this.state.atualizando ? 'Atualização de Produtos' : 'Cadastro de Produtos'}>
                <form id="frmFormulario" onSubmit={this.onSubmit}>
                        {this.state.sucesso ?
                            (
                                <div class="alert alert-dismissible alert-success">
                                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                                    <strong>Dados salvos com sucesso!</strong>
                                </div>
                            ) : (
                                <></>
                            )

                        }

                        {this.state.errors.length > 0 &&

                            this.state.errors.map(msg => {
                                return (
                                    <div class="alert alert-dismissible alert-danger">
                                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                                        <strong>Erro</strong> {msg}
                                    </div>
                                )
                            })


                        }


                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label>Nome: *</label>
                                    <input onChange={this.onChange} name="nome" type="text" value={this.state.nome} className="form-control" />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <label>SKU: *</label>
                                <input onChange={this.onChange} name="sku" disabled={this.state.atualizando} type="text" value={this.state.sku} className="form-control" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <label>Descrição:</label>
                                    <textarea onChange={this.onChange} name="descricao" value={this.state.descricao} className="form-control"></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label>Preço: *</label>
                                    <input onChange={this.onChange} name="preco" type="text" value={this.state.preco} className="form-control"></input>
                                </div>
                            </div>

                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label>Fornecedor: *</label>
                                    <input onChange={this.onChange} name="fornecedor" type="text" value={this.state.fornecedor} className="form-control"></input>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 col-sm-6 d-flex justify-content-start">
                                <button type="submit" className="btn btn-success">{this.state.atualizando ? 'Atualizar' : 'Salvar'}</button>
                            </div>
                            <div className="col-12 col-sm-6 d-flex justify-content-start">
                                <button onClick={this.limpaCampos} type="button" className="btn btn-primary">Limpar</button>
                            </div>
                        </div>
                    </form>
                
            </Card>
        )
    }

}

export default withRouter(CadastroProduto);