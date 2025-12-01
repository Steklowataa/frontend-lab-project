import ScheduleItem from "./ScheduleItem";
import { dayMap } from "../../lib/functions/dayMaps";
import type { Training } from "../../lib/types/training";

interface ScheduleListProps {
  activeDay: Date;
  hoursForActiveDay: number[];
  trainingsByDayAndHour: Record<string, Training>;
}

export default function ScheduleList({
  activeDay,
  hoursForActiveDay,
  trainingsByDayAndHour
}: ScheduleListProps) {
  if (hoursForActiveDay.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '32px',
        color: 'white',
        fontFamily: 'var(--font-manrope)'
      }}>
        Brak zaplanowanych zajęć na ten dzień.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {hoursForActiveDay.map(hour => {
        const key = `${dayMap[activeDay.getDay()]}-${hour}`;
        const training = trainingsByDayAndHour[key];

        return (
          <ScheduleItem
            key={`${activeDay.toISOString()}-${hour}`}
            hour={hour}
            training={training}
          />
        );
      })}
    </div>
  );
}