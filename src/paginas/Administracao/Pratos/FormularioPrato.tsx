import { TextField, Button, Box, Typography, Select, MenuItem, InputLabel, FormControl} from '@mui/material'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import http from '../../../http'
import IPrato from '../../../interfaces/IPrato'
import ITag from '../../../interfaces/ITag'
import IRestaurante from '../../../interfaces/IRestaurante'


const FormularioPrato = () => {

	const parametros = useParams()

	useEffect (() => {
		if (parametros.id) {
			http.get<IPrato>(`pratos/${parametros.id}/`)
			.then(response => setNomePrato(response.data.nome))
		}

        http.get<{tags: ITag[]}>('http://localhost:8000/api/v2/tags/')
        .then(response => setTags(response.data.tags))

        http.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/')
        .then(response => setRestaurantes(response.data))

	}, [parametros])

	const [nomePrato, setNomePrato] = useState('')
    const [tagPrato, setTagPrato] = useState('')
    const [descricaoPrato, setDescricaoPrato] = useState('')
    const [imagemPrato, setImagemPrato] = useState<File | null>()
    const [restaurantePrato, setRestaurantePrato] = useState('')
    
    const [tags, setTags] = useState<ITag[]>([])

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

	const aoSubmeterFormulario = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

        const formData = new FormData()

        formData.append('nome', nomePrato)
        formData.append('descricao', descricaoPrato)
        formData.append('tag', tagPrato)
        formData.append('restaurante', restaurantePrato)

        if (imagemPrato) {
            formData.append('imagem',imagemPrato)
        }

        if (parametros.id) {
            http.request({
                url: `pratos/${parametros.id}/`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            })
            .then(() => {
                setNomePrato('')
                setDescricaoPrato('')
                setTagPrato('')
                setRestaurantePrato('')
                alert('Prato editado com sucesso!')
            })
            .catch(erro => console.log(erro))
        }
        
        else {
            http.request({
                url: 'pratos/',
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            })
            .then(() => {
                setNomePrato('')
                setDescricaoPrato('')
                setTagPrato('')
                setRestaurantePrato('')
                alert('Prato cadastrado com sucesso!')
            })
            .catch(erro => console.log(erro))
        }
	}

    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {

        if(evento.target.files?.length) {
            setImagemPrato(evento.target.files[0])
        } else {
            setImagemPrato(null)
        }

    }

	return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
                <Typography component="h1" variant='h6' >Formulário de Pratos</Typography>
                <Box component='form' sx={{ width: '100%', display: "flex", flexDirection: "column" }} onSubmit={event => aoSubmeterFormulario(event)}>
                    <TextField
                        value={nomePrato}
                        onChange={event => setNomePrato(event.target.value)}
                        label="Nome do prato"
                        variant="standard"
                        fullWidth
                        required
                    />
                    <FormControl margin='dense' fullWidth>
                        <InputLabel htmlFor='select-tag'>Tag</InputLabel>
                        <Select
                            name='select-tag'
                            id="demo-simple-select"
                            value={tagPrato}
                            onChange={(event) => setTagPrato(event.target.value)}
                        >
                            {tags.map((tag: ITag) => (
                                <MenuItem key={tag.id} value={tag.value}>{tag.value}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>              
                    <TextField
                        value={descricaoPrato}
                        onChange={event => setDescricaoPrato(event.target.value)}
                        label="Descrição do prato"
                        variant="standard"
                        fullWidth
                        required
                    />
                    <input
                        onChange={event => selecionarArquivo(event)}
                        type='file'
                    />
                    <FormControl margin='dense' fullWidth>
                        <InputLabel htmlFor='select-restaurante'>Restaurante</InputLabel>
                        <Select
                            name='select-restaurante'
                            id="demo-simple-select"
                            value={restaurantePrato}
                            onChange={(event) => setRestaurantePrato(event.target.value)}
                        >
                            {restaurantes.map((restaurante: IRestaurante) => (
                                <MenuItem key={restaurante.id} value={restaurante.id}>{restaurante.nome}</MenuItem>
                            ))}
                                
                        </Select>
                    </FormControl>
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

export default FormularioPrato
