import { describe, expect, test } from 'vitest'
import {
  computeWastedMoney,
  computeTotalResourceCost,
} from '@/helper/waste-helper'
import { type Resource } from '@/types/resource'

describe('computeWastedMoney', () => {
  test('Returns 0 if elapsedSeconds is 0', () => {
    // Arrange
    const elapsedSeconds = 0
    const resources: Resource[] = [
      {
        name: 'name',
        memberCount: 1,
        costPerHour: 1,
      },
    ]

    // Act
    const wastedMoney = computeWastedMoney(elapsedSeconds, resources)

    // Assert
    expect(wastedMoney).toBe(0)
  })

  test('Returns 0 if resources are empty', () => {
    // Arrange
    const elapsedSeconds = 1
    const resources: Resource[] = []

    // Act
    const wastedMoney = computeWastedMoney(elapsedSeconds, resources)

    // Assert
    expect(wastedMoney).toBe(0)
  })

  test('Computes the wasted money correctly', () => {
    // Arrange
    const elapsedSeconds = 3600
    const resources: Resource[] = [
      {
        costPerHour: 50,
        memberCount: 1,
        name: 'name',
      },
    ]

    // Act
    const wastedMoney = computeWastedMoney(elapsedSeconds, resources)

    // Assert
    expect(wastedMoney).toBe(50)
  })
})

describe('computeTotalResourceCost', () => {
  test('Returns 0 if elapsedSeconds is 0', () => {
    // Arrange
    const elapsedSeconds = 0
    const resource: Resource = {
      name: 'name',
      memberCount: 1,
      costPerHour: 1,
    }

    // Act
    const totalResourceCost = computeTotalResourceCost(resource, elapsedSeconds)

    // Assert
    expect(totalResourceCost).toBe(0)
  })

  test('Computes the total resource cost correctly', () => {
    // Arrange
    const elapsedSeconds = 3600
    const resource: Resource = {
      costPerHour: 50,
      memberCount: 1,
      name: 'name',
    }

    // Act
    const totalResourceCost = computeTotalResourceCost(resource, elapsedSeconds)

    // Assert
    expect(totalResourceCost).toBe(50)
  })
})
