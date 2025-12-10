import { useState, useMemo, useCallback } from "react";
import { db } from "@/app/lib/firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { dayMap } from "../functions/dayMaps";
import { getDatesInRange } from "../utils/dateUtils";
import type { Training } from "../types/training";

export function useTrainingSchedule(startDate: string, endDate: string) {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allSelectedDates, setAllSelectedDates] = useState<Date[]>([]);
  const [weekOffset, setWeekOffset] = useState(0);
  const [activeDay, setActiveDay] = useState<Date | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async () => {
    if (!startDate || !endDate) {
      setError("Proszę wybrać zakres dat.");
      return;
    }
    const start = new Date(startDate + "T00:00:00");
    const end = new Date(endDate + "T00:00:00");
    if (start > end) {
      setError("Data początkowa nie może być późniejsza niż końcowa.");
      setTrainings([]);
      setAllSelectedDates([]);
      setActiveDay(null);
      setHasSearched(true);
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    const datesInRange = getDatesInRange(start, end);
    setAllSelectedDates(datesInRange);
    setWeekOffset(0);
    setActiveDay(datesInRange[0] || null);

    const daysToQuery = [...new Set(datesInRange.map(date => dayMap[date.getDay()]))];

    if (daysToQuery.length === 0) {
      setTrainings([]);
      setLoading(false);
      return;
    }

    try {
      const q = query(collection(db, "trainings"), where("day", "in", daysToQuery));
      const querySnapshot = await getDocs(q);
      const fetchedTrainings: Training[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }) as Training);
      setTrainings(fetchedTrainings);
    } catch (err) {
      console.error("Error fetching trainings:", err);
      setError("Nie udało się pobrać grafiku. Spróbuj ponownie.");
      setTrainings([]);
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]);

  const displayedDays = useMemo(() => {
    return allSelectedDates.slice(weekOffset, weekOffset + 7);
  }, [allSelectedDates, weekOffset]);

  const handlePrevWeek = useCallback(() => {
    setWeekOffset(prev => {
      const newOffset = Math.max(0, prev - 7);
      if (newOffset !== prev) setActiveDay(allSelectedDates[newOffset] || null);
      return newOffset;
    });
  }, [allSelectedDates]);

  const handleNextWeek = useCallback(() => {
    setWeekOffset(prev => {
      if (prev + 7 >= allSelectedDates.length) return prev;
      const newOffset = prev + 7;
      setActiveDay(allSelectedDates[newOffset] || null);
      return newOffset;
    });
  }, [allSelectedDates]);

  const trainingsByDayAndHour = useMemo(() => {
    const mapped: Record<string, Training> = {};
    trainings.forEach(t => {
      if (t.day) {
        mapped[`${t.day.trim()}-${t.hour}`] = t;
      }
    });
    return mapped;
  }, [trainings]);

  const activeDayTrainings = useMemo(() => {
    if (!activeDay) return [];
    const activeDayKey = dayMap[activeDay.getDay()];
    return trainings.filter(t => t.day && t.day.trim() === activeDayKey);
  }, [activeDay, trainings]);

  const hoursForActiveDay = useMemo(() => {
    if (activeDayTrainings.length === 0) return [];
    const hours = activeDayTrainings.map(t => t.hour);
    const min = Math.min(...hours);
    const max = Math.max(...hours);
    let availableHours = Array.from({ length: max - min + 1 }, (_, i) => min + i);

    const isToday = activeDay ? new Date().toDateString() === activeDay.toDateString() : false;
    if (isToday) {
      const currentHour = new Date().getHours();
      availableHours = availableHours.filter(hour => hour > currentHour);
    }

    return availableHours;
  }, [activeDay, activeDayTrainings]);

  return {
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
  };
}
