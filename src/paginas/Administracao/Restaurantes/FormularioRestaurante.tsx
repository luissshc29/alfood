import { TextField, Button, Box, Typography} from '@mui/material'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import IRestaurante from '../../../interfaces/IRestaurante'
import http from '../../../http'


const FormularioRestaurante = () => {

	const parametros = useParams()

	useEffect (() => {
		if (parametros.id) {
			http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
			.then(response => setNomeRestaurante(response.data.nome))
		}
	}, [parametros])

	const [nomeRestaurante, setNomeRestaurante] = useState('')

	const aoSubmeterFormulario = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (parametros.id) {
			http.put(`restaurantes/${parametros.id}/`, {nome: nomeRestaurante})
			.then(() => alert('Restaurante editado com sucesso!'))
		} else {
			http.post('restaurantes/', {nome: nomeRestaurante})
			.then(() => alert('Restaurante cadastrado com sucesso!'))
		}
	}

	return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
                <Typography component="h1" variant='h6' >Formulário de Restaurantes</Typography>
                <Box component='form' sx={{ width: '100%' }} onSubmit={event => aoSubmeterFormulario(event)}>
                    <TextField
                        value={nomeRestaurante}
                        onChange={event => setNomeRestaurante(event.target.value)}
                        label="Nome do restaurante"
                        variant="standard"
                        fullWidth
                        required
                    />
                    <Button
                        sx={{ marginTop: 1 }}
                        type='submit'
                        variant="outlined"
                    >
                        Salvar
                    </Button>
                </Box>
            </Box>

        </>
	)
}

export default FormularioRestaurante
