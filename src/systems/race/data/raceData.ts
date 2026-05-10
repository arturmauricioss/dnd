import type { Race, RaceName } from '../types'

export const races: Record<RaceName, Race> = {
  'human': { name: 'Humano' },
  'dwarf': { name: 'Anão' },
  'elf': { name: 'Elfo' },
  'gnome': { name: 'Gnomo' },
  'halfling': { name: 'Halfling' },
  'half-elf': { name: 'Meio-Elfo' },
  'half-orc': { name: 'Meio-Orc' },
}

export const raceList: Race[] = Object.values(races)