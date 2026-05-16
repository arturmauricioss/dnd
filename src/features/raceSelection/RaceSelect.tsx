import { useState } from 'react';
import Box from '@components/ui/basic/Box/Box';
import Text from '@components/ui/basic/Text/Text';
import Heptagram from '@components/ui/icons/icons/Heptagram';
import { raceList } from '@systems/race/data/raceData';
import type { Race } from '@systems/race/types';
import RaceRandom from './RaceRandom';
import './RaceSelect.css';

interface RaceSelectProps {
  value: Race | null;
  onChange: (race: Race | null) => void;
}

export default function RaceSelect({ value, onChange }: RaceSelectProps) {
  const [animating, setAnimating] = useState(false);
  const [previewRace, setPreviewRace] = useState<Race | null>(null);

  const raceOrder = [
    raceList[0],
    raceList[1],
    raceList[3],
    raceList[5],
    raceList[6],
    raceList[4],
    raceList[2],
  ];

  const handleRandom = async () => {
    if (animating) return;

    setAnimating(true);

    const totalSwitches = 22 + Math.floor(Math.random() * 7);
    const delays: number[] = [];
    for (let i = 0; i < totalSwitches; i++) {
      delays.push(20 + i * 12);
    }

    const races: Race[] = [];
    for (let i = 0; i < totalSwitches; i++) {
      races.push(raceOrder[i % 7]);
    }

    const finalRace = races[totalSwitches - 1];

    for (let i = 0; i < delays.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, delays[i]));
      setPreviewRace(races[i]);
    }

    await new Promise((resolve) => setTimeout(resolve, 200));
    setPreviewRace(null);
    onChange(finalRace);
    setAnimating(false);
  };

  const displayRace = previewRace || value;

  return (
    <Box className={`race-select ${animating ? 'animating' : ''}`}>
      <Heptagram className="heptagram" />
      <Box className="heptagram-center">
        <RaceRandom onRandom={handleRandom} disabled={animating} />
      </Box>
      {raceOrder.map((race, index) => {
        const angle = (index * 360) / 7 - 90;
        return (
          <Box
            key={race.label}
            className={`race-point ${displayRace?.label === race.label ? 'selected' : ''}`}
            style={{
              position: 'absolute',
              left: `calc(50% + ${140 * Math.cos((angle * Math.PI) / 180)}px - 35px)`,
              top: `calc(50% + ${140 * Math.sin((angle * Math.PI) / 180)}px - 35px)`,
            }}
            onClick={() =>
              !animating &&
              (displayRace?.label === race.label
                ? onChange(null)
                : onChange(race))
            }
          >
            <Text size="sm">{race.label}</Text>
          </Box>
        );
      })}
    </Box>
  );
}
