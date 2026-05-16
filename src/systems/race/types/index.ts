export type RaceKey =
  | 'human'
  | 'dwarf'
  | 'elf'
  | 'gnome'
  | 'halfling'
  | 'half-elf'
  | 'half-orc';

export interface Race {
  key: RaceKey;
  label: string;
}
