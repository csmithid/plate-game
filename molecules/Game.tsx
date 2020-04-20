import React, { useState, useEffect } from 'react'
import { useList, useCounter, useError } from 'react-use'
import stringMath from 'string-math'
import _ from 'lodash'

import { Box, Form, TextInput, Text } from 'grommet'
import ResultText from './atoms/ResultText'

export default function Game() {
  const [history, { push: pushHistory }] = useList<Turn>([]) //Turn history
  const [currentTurn, { inc: nextTurn }] = useCounter(0) //Count turns (necessary? Maybe use length of history)
  const [message, setMessage] = useState('') //Tell player if they have won or done something wrong

  const [userInput, setInput] = useState('') //Controlled form

  const handleSubmit = (e) => {
    //TODO: Logic for acceptable inputs goes here
    try {
      if (
        _.isEqual(
          getNumbersFromString(userInput),
          getNumbersFromString(history[currentTurn].result)
        )
      ) {
        pushHistory(new Turn(userInput))
        setInput('')
        nextTurn()
      } else {
        setMessage('Try again!')
      }
    } catch (err) {
      setMessage(err)
    }
  }
  const handleInput = (e) => {
    //Form controller (TODO: Block unacceptable characters here, instead of @ submit?)
    setInput(e.target.value)
  }

  useEffect(() => {
    //Initialize game
    pushHistory(new Turn(_.random(10000, 99999).toString()))
  }, [])

  return (
    <Box width='medium' height='large'>
      <Text size='xxlarge'>{message}</Text>
      <Form onSubmit={handleSubmit}>
        <TextInput onChange={handleInput} value={userInput}></TextInput>
      </Form>

      <Box pad={{ vertical: 'medium' }}>
        {history.map((turn: Turn, key: number) => (
          <ResultText size='xxlarge' key={key}>
            {turn.input + '=' + turn.result}
          </ResultText>
        ))}
      </Box>
    </Box>
  )
}

class Turn {
  //A turn contains the form input from that turn and its mathematical result. Should it contain the array of available numbers too?
  input: string
  result: string

  constructor(input: string) {
    this.input = input.trim()
    this.result = stringMath(this.input).toString()
  }
}

function getNumbersFromString(input: string): number[] {
  //Helper function; creates a sorted array of digits from a string
  let output: number[] = []
  let charArray = input.split('')

  for (let char of charArray) {
    let int = parseInt(char)
    if (!isNaN(int)) {
      output.push(int)
    }
  }

  return output.sort()
}
