import type { Resource } from '@/types/resource'

const oneHourInSeconds = 60 * 60

export function computeWastedMoney(
  elapsedSeconds: number,
  resources: Resource[]
) {
  if (!elapsedSeconds || resources.length === 0) {
    return 0
  }

  const totalCostPerSecond = computeTotalCostPerSecond(resources)

  return elapsedSeconds * totalCostPerSecond
}

function computeTotalCostPerSecond(resources: Resource[]) {
  return resources.map((r) => computeCostPerSecond(r)).reduce((p, c) => p + c)
}

function computeCostPerSecond(resource: Resource) {
  const totalResourceCost = computeTotalCost(resource)

  return totalResourceCost / oneHourInSeconds
}

function computeTotalCost(resource: Resource) {
  return resource.memberCount * resource.costPerHour
}
