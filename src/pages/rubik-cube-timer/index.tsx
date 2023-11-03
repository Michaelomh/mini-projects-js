import { Box, Flex, Text } from "@chakra-ui/react"
import { useState } from "react"

const SECONDS_BEFORE_STARTING = 4 // in microseconds

const formatStopwatch = (time: number) => {
  const minute: number = Math.floor(time / 6000)
  let minuteValue = minute.toString()
  const second = time % 6000
  let secondValue = second.toString()

  if (minute >= 0 && minute < 10) {
    minuteValue = `0${minute}`
  }

  if (second >= 0 && second < 10) {
    secondValue = `000${second}`
  } else if (second >= 10 && second < 100) {
    secondValue = `00${second}`
  } else if (second >= 100 && second < 1000) {
    secondValue = `0${second}`
  } else {
    secondValue = `${second}`
  }

  return `${minuteValue}:${secondValue}`
}

const getBgColor = (isTimerRunning: boolean, falseStartTimer: number) => {
  if (isTimerRunning || falseStartTimer >= SECONDS_BEFORE_STARTING) {
    return "green.300"
  }

  if (falseStartTimer > 0 && falseStartTimer < SECONDS_BEFORE_STARTING) {
    return "red.500"
  }
  return "white"
}

const getColor = (isTimerRunning: boolean, falseStartTimer: number) => {
  if (isTimerRunning || falseStartTimer >= SECONDS_BEFORE_STARTING) {
    return "white"
  }

  if (falseStartTimer > 0 && falseStartTimer < SECONDS_BEFORE_STARTING) {
    return "white"
  }
  return "black"
}

function RubikCubeTimer() {
  const [falseStartTimer, setFalseStartTimer] = useState(0)
  const [falseStartIntervalId, setFalseStartIntervalId] = useState<NodeJS.Timeout>()

  const [currentTimer, setCurrentTimer] = useState(0)
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout>()
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  const timer = (shouldStart: boolean) => {
    if (shouldStart) {
      const timer: ReturnType<typeof setTimeout> = setInterval(() => {
        setCurrentTimer((prevState) => prevState + 1)
      }, 41)
      setIntervalID(timer)
      setIsTimerRunning(true)
    } else {
      clearInterval(intervalID)
      setIsTimerRunning(false)
    }
  }

  /**
   * if timer is running, on hold would reset the timer
   * if timer is not running, a false start timer would start.
   * A minimum of 1 sec should pass before we start a timer.
   */
  const onHold = () => {
    const falseStartTimer: ReturnType<typeof setTimeout> = setInterval(() => {
      setFalseStartTimer((prevState) => prevState + 1)
    }, 100)
    setFalseStartIntervalId(falseStartTimer)

    if (!isTimerRunning) {
      setCurrentTimer(0)
    }
  }

  /**
   * if timer is running; stop the timer
   * if timer is not running, but false start timer > 1sec; the timer would start
   * if timer is not running, but false start timer < 1sec; the timer would not start.
   */
  const onUp = () => {
    if (isTimerRunning) {
      timer(false)
    } else if (falseStartTimer > SECONDS_BEFORE_STARTING) {
      timer(true)
      setCurrentTimer(0)
    }

    clearInterval(falseStartIntervalId)
    setFalseStartTimer(0)
  }

  return (
    <Box
      w="100dvw"
      h="100dvh"
      onTouchStart={onHold}
      onTouchEnd={onUp}
      bgColor={getBgColor(isTimerRunning, falseStartTimer)}
    >
      <Flex justifyContent="center" alignItems="center" w="full" h="full">
        <Flex flexDir="column" gap={4}>
          <Text fontSize="106px" fontFamily="mono" color={getColor(isTimerRunning, falseStartTimer)} userSelect="none">
            {formatStopwatch(currentTimer)}
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}

export default RubikCubeTimer
