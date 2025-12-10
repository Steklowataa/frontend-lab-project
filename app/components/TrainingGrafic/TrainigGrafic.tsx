import { useState } from "react";
import { useAuth } from "../../lib/AuthContext";
import { db } from "../../lib/firebase/firebase";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import type { Training, SignedUpTraining } from "../../lib/types/training";
import { useTrainingSchedule } from "../../lib/hooks/useTrainingSchedule";
import { useSignedUpTrainings } from "../../lib/hooks/useSignedUpTrainings";
import ScheduleHeader from "./ScheduleHeader";
import SearchSection from "./SearchSection";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";
import DayTabs from "./DayTabs";
import ScheduleList from "./ScheduleList";
import ShowMoreButton from "./ShowMoreButton";
import SidePanel from "./SidePanel";

export default function TrainingGrafic() {
  const { user } = useAuth();
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [showAll, setShowAll] = useState(false);
  const { signedUpTrainings, setSignedUpTrainings } = useSignedUpTrainings();

  const {
    // trainings,
    loading,
    error,
    allSelectedDates,
    weekOffset,
    activeDay,
    hasSearched,
    displayedDays,
    // activeDayTrainings,
    hoursForActiveDay,
    trainingsByDayAndHour,
    handleSearch,
    handlePrevWeek,
    handleNextWeek,
    setActiveDay,
  } = useTrainingSchedule(startDate, endDate);

  const handleSignUp = async (training: Training, date: Date) => {
    if (!user) {
      alert("Musisz być zalogowany, aby zapisać się na zajęcia.");
      return;
    }

    const trainingDate = new Date(date);
    trainingDate.setHours(training.hour, 0, 0, 0);

    const newSignUp: Omit<SignedUpTraining, 'docId'> = {
      ...training,
      signUpId: `${training.id}-${trainingDate.toISOString()}`,
      date: trainingDate.toISOString(),
    };

    if (signedUpTrainings.some(t => t.signUpId === newSignUp.signUpId)) {
      return; // Already signed up
    }

    try {
      const docRef = await addDoc(collection(db, "users", user.uid, "signedUpTrainings"), newSignUp);
      setSignedUpTrainings(prev => 
        [...prev, { ...newSignUp, docId: docRef.id }].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      );
    } catch (error) {
      console.error("Error signing up for training:", error);
      alert("Wystąpił błąd podczas zapisywania na zajęcia. Spróbuj ponownie.");
    }
  };

  const handleUnsubscribe = async (docId: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, "users", user.uid, "signedUpTrainings", docId));
      setSignedUpTrainings(prev => prev.filter(t => t.docId !== docId));
    } catch (error) {
      console.error("Error unsubscribing from training:", error);
      alert("Wystąpił błąd podczas wypisywania z zajęć. Spróbuj ponownie.");
    }
  };

   const handleDayClick = (date: Date) => {
    setActiveDay(date);
    setShowAll(false);
  };

  return (
    <div style={{
      display: 'flex',
      paddingTop: '12px',
      paddingBottom: '32px',
      gap: '50px'
    }}>
      {/* lewa strona */}
      <div style={{ 
        marginLeft: '-100px',
        width: '800px',
        maxWidth: '100%',
      }}>
        <ScheduleHeader />

        <SearchSection
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          onSearch={handleSearch}
        />

        {error && <ErrorMessage message={error} />}

        {/* rozklad zajec */}
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
                onDayClick={handleDayClick}
              />

              {activeDay && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ScheduleList
                  activeDay={activeDay}
                  hoursForActiveDay={showAll ? hoursForActiveDay : hoursForActiveDay.slice(0, 4)}
                  trainingsByDayAndHour={trainingsByDayAndHour}
                  onSignUp={handleSignUp}
                />
                {hoursForActiveDay.length > 4 && !showAll && (
                  <ShowMoreButton onClick={() => setShowAll(true)} />
                )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* to po prawej */}
      <SidePanel signedUpTrainings={signedUpTrainings} onUnsubscribe={handleUnsubscribe} />
    </div>
  );
}
