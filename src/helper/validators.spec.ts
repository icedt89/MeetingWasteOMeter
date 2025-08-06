import { describe, expect, test } from 'vitest'
import {
  isSet,
  isResourceValid,
  isMemberCountValid,
  isCostPerHourValid,
} from '@/helper/validators'
import { type Resource } from '@/types/resource'

describe('isResourceValid', () => {
  test('Must be true', () => {
    // Arrange
    const resource: Resource = {
      name: 'Test',
      memberCount: 1,
      costPerHour: 1,
    }

    // Act
    const isValid = isResourceValid(
      resource.name,
      resource.memberCount,
      resource.costPerHour
    )

    // Assert
    expect(isValid).toBeTruthy()
  })

  test('Must be false if name is invalid', () => {
    // Arrange
    const resource: Resource = {
      name: '',
      memberCount: 0,
      costPerHour: 1,
    }

    // Act
    const isValid = isResourceValid(
      resource.name,
      resource.memberCount,
      resource.costPerHour
    )

    // Assert
    expect(isValid).toBeFalsy()
  })

  test('Must be false if memberCount is 0', () => {
    // Arrange
    const resource: Resource = {
      name: 'Test',
      memberCount: 0,
      costPerHour: 1,
    }

    // Act
    const isValid = isResourceValid(
      resource.name,
      resource.memberCount,
      resource.costPerHour
    )

    // Assert
    expect(isValid).toBeFalsy()
  })

  test('Must be false if memberCount is -1', () => {
    // Arrange
    const resource: Resource = {
      name: 'Test',
      memberCount: -1,
      costPerHour: 1,
    }

    // Act
    const isValid = isResourceValid(
      resource.name,
      resource.memberCount,
      resource.costPerHour
    )

    // Assert
    expect(isValid).toBeFalsy()
  })

  test('Must be false if costPerHour is 0', () => {
    // Arrange
    const resource: Resource = {
      name: 'Test',
      memberCount: 1,
      costPerHour: 0,
    }

    // Act
    const isValid = isResourceValid(
      resource.name,
      resource.memberCount,
      resource.costPerHour
    )

    // Assert
    expect(isValid).toBeFalsy()
  })

  test('Must be false if costPerHour is -1', () => {
    // Arrange
    const resource: Resource = {
      name: 'Test',
      memberCount: 1,
      costPerHour: -1,
    }

    // Act
    const isValid = isResourceValid(
      resource.name,
      resource.memberCount,
      resource.costPerHour
    )

    // Assert
    expect(isValid).toBeFalsy()
  })
})

describe('isMemberCountValid', () => {
  test('Must be false for 0', () => {
    // Arrange
    const memberCount = 0

    // Act
    const isValid = isMemberCountValid(memberCount)

    // Assert
    expect(isValid).toBeFalsy()
  })

  test('Must be true for 0', () => {
    // Arrange
    const memberCount = 1

    // Act
    const isValid = isMemberCountValid(memberCount)

    // Assert
    expect(isValid).toBeTruthy()
  })
})

describe('isCostPerHourValid', () => {
  test('Must be false for -1', () => {
    // Arrange
    const costPerHour = -1

    // Act
    const isValid = isCostPerHourValid(costPerHour)

    // Assert
    expect(isValid).toBeFalsy()
  })

  test('Must be false for 0', () => {
    // Arrange
    const costPerHour = 0

    // Act
    const isValid = isCostPerHourValid(costPerHour)

    // Assert
    expect(isValid).toBeFalsy()
  })

  test('Must be true for 1', () => {
    // Arrange
    const costPerHour = 1

    // Act
    const isValid = isCostPerHourValid(costPerHour)

    // Assert
    expect(isValid).toBeTruthy()
  })
})

describe('isSet', () => {
  test('Must be false for null', () => {
    // Arrange
    const value: null = null

    // Act
    const isSetResult = isSet(value)

    // Assert
    expect(isSetResult).toBeFalsy()
  })

  test('Must be false for undefined', () => {
    // Arrange
    const value: undefined = undefined

    // Act
    const isSetResult = isSet(value)

    // Assert
    expect(isSetResult).toBeFalsy()
  })

  test('Must be false for empty string', () => {
    // Arrange
    const value = ''

    // Act
    const isSetResult = isSet(value)

    // Assert
    expect(isSetResult).toBeFalsy()
  })

  test('Must be true for non empty string', () => {
    // Arrange
    const value = '0'

    // Act
    const isSetResult = isSet(value)

    // Assert
    expect(isSetResult).toBeTruthy()
  })

  test('Must be true for 0', () => {
    // Arrange
    const value = 0

    // Act
    const isSetResult = isSet(value)

    // Assert
    expect(isSetResult).toBeTruthy()
  })

  test('Must be true for -1', () => {
    // Arrange
    const value = -1

    // Act
    const isSetResult = isSet(value)

    // Assert
    expect(isSetResult).toBeTruthy()
  })

  test('Must be true for 1', () => {
    // Arrange
    const value = 1

    // Act
    const isSetResult = isSet(value)

    // Assert
    expect(isSetResult).toBeTruthy()
  })
})
