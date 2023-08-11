import { Outlet, Link as RouterLink } from 'react-router-dom'
import { Button, Box, AppBar, Container, Toolbar, Typography, Link, Paper } from '@mui/material'


export default function AdministracaoBase() {
  return (
    <>
          <AppBar position='static'>

              <Container maxWidth='xl'>
                  <Toolbar>
                      <Typography variant='h4'>
                          Administração
                      </Typography>
                      <Box sx={{ display: 'flex', flexGrow: 1, ml: 4 }}>
                          <Link component={RouterLink} to='/admin/restaurantes'>
                              <Button sx={{ my: 2, color: 'white' }}>
                                  Restaurantes
                              </Button>
                          </Link>
                          <Link component={RouterLink} to='/admin/restaurantes/novo'>
                              <Button sx={{ my: 2, color: 'white' }}>
                                  Novo restaurante
                              </Button>
                          </Link>
                          <Link component={RouterLink} to='/admin/pratos'>
                              <Button sx={{ my: 2, color: 'white' }}>
                                  Pratos
                              </Button>
                          </Link>
                          <Link component={RouterLink} to='/admin/pratos/novo'>
                              <Button sx={{ my: 2, color: 'white' }}>
                                  Novo prato
                              </Button>
                          </Link>
                      </Box>
                  </Toolbar>
              </Container>

          </AppBar>

          <Box>
                <Container maxWidth='lg' sx={{mt: 1}}>
                    <Paper sx={{p: 2}}>
                        <Outlet/>
                    </Paper>
                </Container>
            </Box>
      </>
  )
}
