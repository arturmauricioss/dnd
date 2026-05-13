export type NameCultureKey =
  | 'human'
  | 'elf'
  | 'dwarf'
  | 'orc'
  | 'gnome'
  | 'halfling'

export type NameCulture = {
  key: NameCultureKey
  label: string
}

export const namesCultures: NameCulture[] = [
  { key: 'human', label: 'Humano' },
  { key: 'elf', label: 'Elfo' },
  { key: 'dwarf', label: 'Anão' },
  { key: 'orc', label: 'Orc' },
  { key: 'gnome', label: 'Gnomo' },
  { key: 'halfling', label: 'Halfling' },
]