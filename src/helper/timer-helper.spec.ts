import { describe, expect, test } from 'vitest'
import { getTimerDisplayParts } from '@/helper/timer-helper'

describe('getTimerDisplayParts', () => {
  test('Returns 0 if elapsedSeconds is 0', () => {
    // Arrange
    const elapsedSeconds = 0

    // Act
    const { hours, minutes, seconds } = getTimerDisplayParts(elapsedSeconds)

    // Assert
    expect(hours).toBe(0)
    expect(minutes).toBe(0)
    expect(seconds).toBe(0)
  })

  test('Returns correctly (1)', () => {
    // Arrange
    const elapsedSeconds = 3600

    // Act
    const { hours, minutes, seconds } = getTimerDisplayParts(elapsedSeconds)

    // Assert
    expect(hours).toBe(1)
    expect(minutes).toBe(0)
    expect(seconds).toBe(0)
  })

  test('Returns correctly (2)', () => {
    // Arrange
    const elapsedSeconds = 6343

    // Act
    const { hours, minutes, seconds } = getTimerDisplayParts(elapsedSeconds)

    // Assert
    expect(hours).toBe(1)
    expect(minutes).toBe(45)
    expect(seconds).toBe(43)
  })

  test('Returns correctly (3)', () => {
    // Arrange
    const elapsedSeconds = 14483

    // Act
    const { hours, minutes, seconds } = getTimerDisplayParts(elapsedSeconds)

    // Assert
    expect(hours).toBe(4)
    expect(minutes).toBe(1)
    expect(seconds).toBe(23)
  })
})
