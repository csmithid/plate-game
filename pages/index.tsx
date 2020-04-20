import Head from 'next/head'
import { grommet, Grommet, Box } from 'grommet'
import Game from '../molecules/Game'

export default function Home() {
  return (
    <Grommet full theme={grommet}>
      <Box fill justify='center' align='center'>
        <Game />
      </Box>
    </Grommet>
  )
}
