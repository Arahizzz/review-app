import { useState } from 'react'
import logo from './logo.svg'
import { runPlaywright } from './services/playwright'
import Configurator from './Configurator'
import { Container } from '@mui/material'
import { Box } from '@mui/system'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Box height='100vh' m={10}>
        <Container maxWidth='xl'>
          <Configurator />
        </Container>
      </Box>
    </div>
  )
}

export default App
