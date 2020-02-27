import React, { Component } from 'react';
import PubSub from 'pubsub-js'
import './TabelaSeries.css'

const ListaSeries = (props) => {

	return (
		<div className="card-body card-body-flex">
			{props.series.map(serie => {
				return (
					<div className="card card-serie" key={serie.id}>
						<div className="card-header">
							<h5 className="card-title">{serie.nome}</h5>
							<h6 className="card-title text-muted mb-0">
								{serie.ano_lancamento}
							</h6>
						</div>
						<div className="card-body">
							<img src="/logo192.png" alt="a" className="card-img" />
						</div>
						<div className="card-footer">
							{serie.temporadas}
							{serie.temporadas > 1 ? ' temporadas' : ' temporada'}
							<br />
							<a href="#"
								data-toggle="modal"
								data-target="#exampleModalCenter"
								onClick={() => {
									PubSub.publish('detail', serie)
								}}>Sinopse</a> <br />
							<div className="text-center mt-1">
								<button
									className="btn btn-outline-danger btn-sm mr-2 p-1"
									onClick={() => {
										if(window.confirm('Confirma a exclusão?'))
											props.deleta(serie.id)
									}}>
									Delete
								</button>
								<button
									className="btn btn-outline-warning btn-sm p-1"
									onClick={() => {
										PubSub.publish('editing',serie)
									}}
								>
									Editar
							</button>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}

class TabelaSeries extends Component {

	constructor() {
		super()
		this.state = {
			serieDetalhe: ''
		}
		PubSub.subscribe('detail', (msg, serie) => {
			this.setState({serieDetalhe: serie})
		})
	}

	render() {

		const { series, deleta } = this.props

		const serieDetalhe = this.state.serieDetalhe

		return (
			<div className='card'>
				<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
					Botão!
				</button>
				<div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalLongTitle">{serieDetalhe.nome}</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						<img src='/logo192.png' className='card-img' />
						{serieDetalhe.temporadas}
						{serieDetalhe.temporadas > 1 ? 'temporadas' : 'temporada'}
						<br />
						{serieDetalhe.ano_lancamento}
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
						<button type="button" className="btn btn-primary">Save changes</button>
					</div>
					</div>
				</div>
				</div>
				<div className="card-header ">
					<h5 className="text-center">Lista de Series</h5>
				</div>

				<ListaSeries series={series} deleta={deleta} />
			</div>
		)
	}
}

export default TabelaSeries