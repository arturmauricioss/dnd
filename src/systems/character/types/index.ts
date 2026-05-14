import type { Name } from '@systems/names'
import type { Race } from '@systems/race'

export interface Character {
  id: string
  name: Name
  race: Race
  gender?: string
  createdAt?: string
}