import type { Resource } from '@/types/resource'

const oneHourInSeconds = 60 * 60

export function computeWastedMoney(
  elapsedSeconds: number,
  resources: Resource[]
) {
  if (!elapsedSeconds || resources.length === 0) {
    return 0
  }

  return resources
    .map((r) => computeTotalResourceCost(r, elapsedSeconds))
    .reduce((p, c) => p + c)
}

export function computeTotalResourceCost(
  resource: Resource,
  elapsedSeconds: number
) {
  return computeCostPerSecond(resource) * elapsedSeconds
}

function computeCostPerSecond(resource: Resource) {
  const totalResourceCost = computeTotalCostPerHour(resource)

  return totalResourceCost / oneHourInSeconds
}

function computeTotalCostPerHour(resource: Resource) {
  return resource.memberCount * resource.costPerHour
}
