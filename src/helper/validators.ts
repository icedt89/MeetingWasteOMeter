export function isSet(value: string | number | null | undefined) {
  return !!value || Number.isFinite(value)
}

export function isMemberCountValid(memberCount: number) {
  return isMinimumSet(memberCount, 1)
}

export function isCostPerHourValid(costPerHour: number) {
  return isMinimumSet(costPerHour, 1)
}

export function isResourceValid(
  name: string | null,
  memberCount: number,
  costPerHour: number
) {
  return (
    isSet(name) &&
    isSet(memberCount) &&
    isSet(costPerHour) &&
    isMemberCountValid(memberCount) &&
    isCostPerHourValid(costPerHour)
  )
}

function isMinimumSet(value: number, minimum: number) {
  return value >= minimum
}
