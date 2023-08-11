import { useEffect, useState } from "react"
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material"
import { Link } from "react-router-dom"
import http from "../../../http"
import IPrato from "../../../interfaces/IPrato"

const AdministracaoPratos = () => {

	const [pratos, setPratos] = useState<IPrato[]>([])

	useEffect(() => {
		http.get<IPrato[]>('pratos/')
		.then(response => 
			setPratos(response.data)
			)
		.catch(erro =>
			console.log(erro)	
		)
	}, [])

	const excluirPrato = (prato: IPrato) => {
		http.delete(`pratos/${prato.id}/`)
		.then(() => {
			const listaPratos = pratos.filter(item => item.id !== prato.id)
			setPratos([...listaPratos])
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
							Tag
						</TableCell>

                        <TableCell>
							Descrição
						</TableCell>

                        <TableCell>
							Imagem
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
					{pratos.map(prato => (
						<TableRow key={prato.id}>
							<TableCell>
								{prato.nome}
							</TableCell>
                            <TableCell>
								{prato.tag}
							</TableCell>
                            <TableCell>
								{prato.descricao}
							</TableCell>
                            <TableCell>
                                {prato.imagem ? 
                                    <a href={prato.imagem}>
                                        Ver imagem
                                    </a> : ''
                                }
							</TableCell>
							<TableCell>
								<Link to={`/admin/pratos/${prato.id}`}>Editar</Link>
							</TableCell>
							<TableCell>
								<Button 
									variant="outlined" 
									color='error' 
									onClick={() => excluirPrato(prato)}
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

export default AdministracaoPratos
