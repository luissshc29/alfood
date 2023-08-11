import { useEffect, useState } from "react"
import IRestaurante from "../../../interfaces/IRestaurante"
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material"
import { Link } from "react-router-dom"
import http from "../../../http"

const AdministracaoRestaurantes = () => {

	const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

	useEffect(() => {
		http.get<IRestaurante[]>('restaurantes/')
		.then(response => 
			setRestaurantes(response.data)
			)
		.catch(erro =>
			console.log(erro)	
		)
	}, [])

	const excluirRestaurante = (restaurante: IRestaurante) => {
		http.delete(`restaurantes/${restaurante.id}/`)
		.then(() => {
			const listaNova = restaurantes.filter(item => item.id !== restaurante.id)
			setRestaurantes([...listaNova])
		})
		.catch(erro =>
			console.log(erro)	
		)
	}

	return (
		<TableContainer component={Paper}>
			<Table>

				<TableHead>
					<TableRow>
						<TableCell>
							Nome
						</TableCell>
						
						<TableCell>
							Editar
						</TableCell>

						<TableCell>
							Excluir
						</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{restaurantes.map(restaurante => (
						<TableRow key={restaurante.id}>
							<TableCell>
								{restaurante.nome}
							</TableCell>
							<TableCell>
								<Link to={`/admin/restaurantes/${restaurante.id}`}>[ Editar ]</Link>
							</TableCell>
							<TableCell>
								<Button 
									variant="outlined" 
									color='error' 
									onClick={() => excluirRestaurante(restaurante)}
								>
									Excluir
								</Button>
							</TableCell>
						</TableRow>
					))}
					
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default AdministracaoRestaurantes
