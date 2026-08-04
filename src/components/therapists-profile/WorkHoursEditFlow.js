"use client";

import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import EditRepeatingShiftsModal, { EditDayShiftsModal } from "./EditRepeatingShiftsModal";
import EditWorkHoursChoiceModal from "./EditWorkHoursChoiceModal";
import {
  createDefaultShift,
  isScheduleNotWorking,
  parseScheduleToShifts,
} from "./workHoursEditUtils";
import { useToaster } from "@/hooks";

export function useWorkHoursEditFlow({ baseSchedule, weekScheduleMap, onSaved }) {
  const { t } = useTranslation();
  const { toaster } = useToaster();

  const [selectedDate, setSelectedDate] = useState(null);
  const [showChoiceModal, setShowChoiceModal] = useState(false);
  const [showRepeatingModal, setShowRepeatingModal] = useState(false);
  const [showDayModal, setShowDayModal] = useState(false);

  const openEditFlow = useCallback((date) => {
    setSelectedDate(date);
    setShowChoiceModal(true);
  }, []);

  const closeAllModals = useCallback(() => {
    setShowChoiceModal(false);
    setShowRepeatingModal(false);
    setShowDayModal(false);
    setSelectedDate(null);
  }, []);

  const getInitialShiftsForDate = (date) => {
    const dateKey = date.format("YYYY-MM-DD");
    const daySchedule = weekScheduleMap[dateKey] || baseSchedule;
    return parseScheduleToShifts(daySchedule);
  };

  const getInitialNotWorking = (date) => {
    const dateKey = date.format("YYYY-MM-DD");
    const daySchedule = weekScheduleMap[dateKey];
    if (daySchedule) return isScheduleNotWorking(daySchedule);
    return isScheduleNotWorking(baseSchedule);
  };

  const handleSave = async (saveData) => {
    // console.log("saveData", saveData);
    // return
    // toaster(t("workHoursSaved"), TOAST_TYPES.SUCCESS);
    onSaved?.(saveData);
  };

  const modals = (
    <>
      <EditWorkHoursChoiceModal
        show={showChoiceModal}
        selectedDate={selectedDate}
        onHide={closeAllModals}
        onSelectRepeating={() => {
          setShowChoiceModal(false);
          setShowRepeatingModal(true);
        }}
        onSelectDayOnly={() => {
          setShowChoiceModal(false);
          setShowDayModal(true);
        }}
      />

      <EditRepeatingShiftsModal
        show={showRepeatingModal}
        selectedDate={selectedDate}
        initialShifts={
          selectedDate ? getInitialShiftsForDate(selectedDate) : [createDefaultShift()]
        }
        onHide={closeAllModals}
        onSave={handleSave}
      />

      <EditDayShiftsModal
        show={showDayModal}
        selectedDate={selectedDate}
        initialShifts={
          selectedDate ? getInitialShiftsForDate(selectedDate) : [createDefaultShift()]
        }
        initialNotWorking={selectedDate ? getInitialNotWorking(selectedDate) : false}
        onHide={closeAllModals}
        onSave={handleSave}
      />
    </>
  );

  return { openEditFlow, modals };
}
