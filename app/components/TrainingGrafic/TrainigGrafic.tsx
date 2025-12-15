import { useState } from "react";
import { useIsMobile } from "../../lib/hooks/useIsMobile";
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
  const isMobile = useIsMobile();
  const { user } = useAuth();

  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [showAll, setShowAll] = useState(false);

  const { signedUpTrainings, setSignedUpTrainings } = useSignedUpTrainings();

  const {
    loading,
    error,
    allSelectedDates,
    weekOffset,
    activeDay,
    hasSearched,
    displayedDays,
    hoursForActiveDay,
    trainingsByDayAndHour,
    handleSearch,
    handlePrevWeek,
    handleNextWeek,
    setActiveDay,
  } = useTrainingSchedule(startDate, endDate);

  /* ================= LOGIKA (bez zmian) ================= */

  const handleSignUp = async (training: Training, date: Date) => {
    if (!user) return alert("Musisz być zalogowany.");

    const trainingDate = new Date(date);
    trainingDate.setHours(training.hour, 0, 0, 0);

    const newSignUp: Omit<SignedUpTraining, "docId"> = {
      ...training,
      signUpId: `${training.id}-${trainingDate.toISOString()}`,
      date: trainingDate.toISOString(),
    };

    if (signedUpTrainings.some(t => t.signUpId === newSignUp.signUpId)) return;

    const docRef = await addDoc(
      collection(db, "users", user.uid, "signedUpTrainings"),
      newSignUp
    );

    setSignedUpTrainings(prev =>
      [...prev, { ...newSignUp, docId: docRef.id }].sort(
        (a, b) => +new Date(a.date) - +new Date(b.date)
      )
    );
  };

  const handleUnsubscribe = async (docId: string) => {
    if (!user) return;
    await deleteDoc(doc(db, "users", user.uid, "signedUpTrainings", docId));
    setSignedUpTrainings(prev => prev.filter(t => t.docId !== docId));
  };

  const handleDayClick = (date: Date) => {
    setActiveDay(date);
    setShowAll(false);
  };

  /* ===================================================== */
  /* ===================== MOBILE ======================== */
  /* ===================================================== */

  if (isMobile) {
    return (
      <div style={{ padding: "16px", color: "white" }}>
        <ScheduleHeader />

        <SearchSection
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          onSearch={handleSearch}
        />

        {error && <ErrorMessage message={error} />}
        {loading && <LoadingSpinner />}

        {hasSearched && (
          <>
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
              <>
                <ScheduleList
                  activeDay={activeDay}
                  hoursForActiveDay={
                    showAll ? hoursForActiveDay : hoursForActiveDay.slice(0, 3)
                  }
                  trainingsByDayAndHour={trainingsByDayAndHour}
                  onSignUp={handleSignUp}
                />

                {hoursForActiveDay.length > 3 && !showAll && (
                  <ShowMoreButton onClick={() => setShowAll(true)} />
                )}
              </>
            )}

            {/* zapisane zajęcia NA DOLE */}
            <div style={{ marginTop: "32px" }}>
              <SidePanel
                signedUpTrainings={signedUpTrainings}
                onUnsubscribe={handleUnsubscribe}
              />
            </div>
          </>
        )}
      </div>
    );
  }

  /* ===================================================== */
  /* ==================== DESKTOP ======================== */
  /* ===================================================== */

  return (
    <div style={{ display: "flex", gap: "50px", padding: "32px" }}>
      {/* LEWA */}
      <div style={{ width: "800px" }}>
        <ScheduleHeader />

        <SearchSection
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          onSearch={handleSearch}
        />

        {error && <ErrorMessage message={error} />}
        {loading && <LoadingSpinner />}

        {hasSearched && (
          <>
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
              <>
                <ScheduleList
                  activeDay={activeDay}
                  hoursForActiveDay={
                    showAll ? hoursForActiveDay : hoursForActiveDay.slice(0, 4)
                  }
                  trainingsByDayAndHour={trainingsByDayAndHour}
                  onSignUp={handleSignUp}
                />

                {hoursForActiveDay.length > 4 && !showAll && (
                  <ShowMoreButton onClick={() => setShowAll(true)} />
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* PRAWA */}
      <SidePanel
        signedUpTrainings={signedUpTrainings}
        onUnsubscribe={handleUnsubscribe}
      />
    </div>
  );
}
