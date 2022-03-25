import { useState } from 'react'
import Configurator from './Configurator'
import { Container } from '@mui/material'
import { Box } from '@mui/system'

function App() {

  return (
    <div className="App">
      <Box m={5}>
        <Container maxWidth='xl'>
          <Configurator />
        </Container>
      </Box>
    </div>
  )
}

export default App
