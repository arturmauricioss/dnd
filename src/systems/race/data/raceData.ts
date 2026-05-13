import type { Race, RaceKey } from '../types'

export const races: Record<RaceKey, Race> = {
  'human': { key: 'human', label: 'Humano' },
  'dwarf': { key: 'dwarf', label: 'Anão' },
  'elf': { key: 'elf', label: 'Elfo' },
  'gnome': { key: 'gnome', label: 'Gnomo' },
  'halfling': { key: 'halfling', label: 'Halfling' },
  'half-elf': { key: 'half-elf', label: 'Meio-Elfo' },
  'half-orc': { key: 'half-orc', label: 'Meio-Orc' },
}

export const raceList: Race[] = Object.values(races)