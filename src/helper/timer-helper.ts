export interface TimerParts {
  hours: number
  minutes: number
  seconds: number
}

export function getTimerDisplayParts(elapsedSeconds: number): TimerParts {
  let hours = 0
  let minutes = 0
  let seconds = 0

  if (!!elapsedSeconds) {
    hours = Math.floor(elapsedSeconds / 3600)
    const remainderAfterHours = elapsedSeconds % 3600

    minutes = Math.floor(remainderAfterHours / 60)
    seconds = remainderAfterHours % 60
  }

  return { hours, minutes, seconds }
}

// TODO: Tests
export function formatTimerDisplay(
  hours: number,
  minutes: number,
  seconds: number
) {
  return `${padTimerDigit(hours)}:${padTimerDigit(minutes)}:${padTimerDigit(seconds)}`
}

function padTimerDigit(n: number) {
  return n.toString().padStart(2, '0')
}
