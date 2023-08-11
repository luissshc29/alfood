import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';
import {TextField, Button, Select, MenuItem, InputLabel} from '@mui/material'

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState('')
  const [paginaAnterior, setPaginaAnterior] = useState('')

  const [busca, setBusca] = useState('')
  const [ordenacao, setOrdenacao] = useState('')

  useEffect(()=> {
	carregarDados('http://localhost:8000/api/v1/restaurantes/')
  }, [])

  const carregarDados = (url: string) => {
	axios.get<IPaginacao<IRestaurante>>(url)
	.then(response => {
		setRestaurantes(response.data.results)
		setProximaPagina(response.data.next)
		setPaginaAnterior(response.data.previous)
	})
	.catch(erro => console.log(erro))
  }

  const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
	evento.preventDefault()

	carregarDados(`http://localhost:8000/api/v1/restaurantes/?search=${busca}`)
  }

    const ordenar = (ordenacao: string) => {
        setOrdenacao(ordenacao)
    }

  return (
  <section className={style.ListaRestaurantes}>
	<form onSubmit={buscar}>
		<TextField 
			onChange={evento => setBusca(evento.target.value)} 
			id="standard-basic" 
			label="Buscar um restaurante" 
			variant="standard"
		/>	
		<Button type='submit' variant="outlined">Pesquisar</Button>
		<InputLabel htmlFor='select-ordenacao'>Ordenar</InputLabel>
		<Select
			name='select-ordenacao'
			id="demo-simple-select"
			value={ordenacao}
            onChange={(event) => ordenar(event.target.value)}
		>
			<MenuItem value='id-cresc'>Por Id crescente</MenuItem>
			<MenuItem value='id-decresc'>Por Id decrescente</MenuItem>
			<MenuItem value='nome'>Por nome</MenuItem>
		</Select>
	</form>
    <h1>Os restaurantes mais <em>surpreendentes</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
	{paginaAnterior !== '' && paginaAnterior !== null ? 
		<button onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}>
			Página Anterior
		</button> 
		: ''
	}
	{proximaPagina ? 
		<button onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}>
			Próxima Página
		</button> 
		: ''
	}
  </section>
  )
}

export default ListaRestaurantes