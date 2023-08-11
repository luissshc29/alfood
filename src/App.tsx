import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdministracaoRestaurantes from './paginas/Administracao/Restaurantes/AdministracaoRestaurantes'
import FormularioRestaurante from './paginas/Administracao/Restaurantes/FormularioRestaurante';
import AdministracaoBase from './paginas/Administracao/AdministracaoBase';
import AdministracaoPratos from './paginas/Administracao/Pratos/AdministracaoPratos';
import FormularioPrato from './paginas/Administracao/Pratos/FormularioPrato';

function App() {
	
  return (
    <Routes>
	
      <Route path="/" element={<Home />} />

      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path="/admin"> 

	  	<Route path='restaurantes' element={<AdministracaoBase/>}> 

			<Route index element={<AdministracaoRestaurantes />} />

			<Route path=':id' element={<FormularioRestaurante/>} />
		
			<Route path='novo' element={<FormularioRestaurante/>} />

		</Route>

        <Route path='pratos' element={<AdministracaoBase/>}>

            <Route index element={<AdministracaoPratos />} />

            <Route path=':id' element={<FormularioPrato/>} />
            
            <Route path='novo' element={<FormularioPrato/>} />

        </Route>

	  </Route>

    </Routes>
  );
}

export default App;
