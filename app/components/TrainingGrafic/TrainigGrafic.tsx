import { useState, useEffect } from "react";
import { useTrainingSchedule } from "../../lib/hooks/useTrainingSchedule";
import ScheduleHeader from "./ScheduleHeader";
import SearchSection from "./SearchSection";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";
import DayTabs from "./DayTabs";
import ScheduleList from "./ScheduleList";
import ShowMoreButton from "./ShowMoreButton";
import SidePanel from "./SidePanel";

export default function TrainingGrafic() {
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [showAll, setShowAll] = useState(false);

  const {
    trainings,
    loading,
    error,
    allSelectedDates,
    weekOffset,
    activeDay,
    hasSearched,
    displayedDays,
    activeDayTrainings,
    hoursForActiveDay,
    trainingsByDayAndHour,
    handleSearch,
    handlePrevWeek,
    handleNextWeek,
    setActiveDay,
  } = useTrainingSchedule(startDate, endDate);

  useEffect(() => {
    setShowAll(false);
  }, [activeDay]);

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      paddingTop: '32px',
      paddingBottom: '32px'
    }}>
      {/* Left side - main content */}
      <div style={{ 
        marginLeft: '70px',
        width: '800px',
        maxWidth: '100%'
      }}>
        <ScheduleHeader />

        <SearchSection
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={(e) => setStartDate(e.target.value)}
          onEndDateChange={(e) => setEndDate(e.target.value)}
          onSearch={handleSearch}
        />

        {error && <ErrorMessage message={error} />}

        {/* Schedule Container */}
        <div style={{ minHeight: '500px' }}>
          {loading && <LoadingSpinner />}

          {!loading && hasSearched && allSelectedDates.length > 0 && (
            <div>
              <DayTabs
                displayedDays={displayedDays}
                activeDay={activeDay}
                weekOffset={weekOffset}
                totalDays={allSelectedDates.length}
                onPrevWeek={handlePrevWeek}
                onNextWeek={handleNextWeek}
                onDayClick={setActiveDay}
              />

              {activeDay && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ScheduleList
                  activeDay={activeDay}
                  hoursForActiveDay={showAll ? hoursForActiveDay : hoursForActiveDay.slice(0, 3)}
                  trainingsByDayAndHour={trainingsByDayAndHour}
                />
                {hoursForActiveDay.length > 3 && !showAll && (
                  <ShowMoreButton onClick={() => setShowAll(true)} />
                )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right side - blue rectangle */}
      <SidePanel />
    </div>
  );
}
