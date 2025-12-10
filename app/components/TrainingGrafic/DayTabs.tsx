import ButtonGrafic from "./ButtonGrafic";
import { dayMap, dayShortMap } from "../../lib/functions/dayMaps";
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from "react-icons/bs";


interface DayTabsProps {
  displayedDays: Date[];
  activeDay: Date | null;
  weekOffset: number;
  totalDays: number;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onDayClick: (date: Date) => void;
}

export default function DayTabs({
  displayedDays,
  activeDay,
  weekOffset,
  totalDays,
  onPrevWeek,
  onNextWeek,
  onDayClick
}: DayTabsProps) {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '16px', 
      marginBottom: '24px', 
      justifyContent: 'center' 
    }}>
      <button
        onClick={onPrevWeek}
        disabled={weekOffset === 0}
        style={{
          padding: '8px',
          color: '#fff',
          fontSize: '24px',
          background: 'transparent',
          border: 'none',
          cursor: weekOffset === 0 ? 'not-allowed' : 'pointer',
          opacity: weekOffset === 0 ? 0.25 : 1
        }}
      >
        <BsArrowLeftCircleFill />
      </button>

      <div style={{ display: 'flex', gap: '8px' }}>
        {displayedDays.map(date => {
          const dayKey = dayMap[date.getDay()];
          const isActive =
            activeDay?.toISOString().split("T")[0] ===
            date.toISOString().split("T")[0];

          return (
            <ButtonGrafic
              key={date.toISOString()}
              date={date}
              isActive={isActive}
              onClick={() => onDayClick(date)}
              dayShort={dayShortMap[dayKey]}
              formattedDate={date.toLocaleDateString("pl-PL", {
                day: "2-digit",
                month: "2-digit",
              })}
            />
          );
        })}
      </div>

      <button
        onClick={onNextWeek}
        disabled={weekOffset + 7 >= totalDays}
        style={{
          padding: '8px',
          color: '#fff',
          fontSize: '24px',
          background: 'transparent',
          border: 'none',
          cursor: weekOffset + 7 >= totalDays ? 'not-allowed' : 'pointer',
          opacity: weekOffset + 7 >= totalDays ? 0.25 : 1
        }}
      >
        <BsArrowRightCircleFill/>
      </button>
    </div>
  );
}
