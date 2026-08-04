import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const pulseAnimation = keyframes`
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
`;

export const SkeletonChip = styled.div`
  width: 75px;
  height: 32px;
  border-radius: 100px;
  background-color: #e2eefc;
  animation: ${pulseAnimation} 1.5s infinite ease-in-out;
`;

export const SlotChipButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  white-space: nowrap;
  padding: 6px 10px;
  border-radius: 10px;
  border: 1px solid #295086;
  background: ${(props) => (props.active ? "#295086" : "#ffffff")};
  color: ${(props) => (props.active ? "#ffffff" : "#295086")};
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  transition: all 0.2s;
`;

export const CalendarLayoutWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0;
  width: 100%;
  min-height: 640px;
`;

export const CalendarMainArea = styled.div`
  flex: 1;
  min-width: 0;
  min-height: 640px;
  transition: flex 0.2s ease;
`;

export const SidebarContainer = styled.aside`
  width: 360px;
  flex-shrink: 0;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  height: 715px;
  min-height: unset;
  color-scheme: light;
  background: #ffffff;
  overflow: hidden;
  /* border-left: 1px solid #e2eefc; */
  border-right: 1px solid #e2eefc;
  position: sticky;
  top: 0;
  
`;

export const SidebarHeader = styled.div`
  padding: 20px 20px 18px;
  background: #f4f9ff;
  border-bottom: 1px solid #e2eefc;
`;

export const SidebarTitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  // margin-bottom: 10px;
`;

export const SidebarTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #004d87;
  line-height: 1.35;
`;

export const SidebarCancelBtn = styled.button`
  background: #ffffff;
  border: 1px solid #c5d9ef;
  border-radius: 100px;
  padding: 7px 18px;
  font-size: 13px;
  font-weight: 600;
  color: #004d87;
  cursor: pointer;
  white-space: nowrap;
  line-height: 1.2;

  &:hover {
    background: #edf5fd;
  }
`;

export const SidebarSubLinkRow = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 400;
  color: #5e6c84;
  line-height: 1.4;
`;

export const SidebarSubLink = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 13px;
  font-weight: 500;
  color: #004d87;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
`;

export const SidebarDateTimeRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: stretch;
  border-bottom: 1px solid #e2eefc;
  overflow: visible;
  position: relative;
  z-index: 2;
`;

export const SidebarDateTimeItem = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  padding: 10px 12px;
`;

export const SidebarDateTimeButton = styled.button`
  width: 100%;
  max-width: 100%;
  border: none;
  background: transparent;
  font-size: 14px;
  font-weight: 600;
  color: #295086;
  text-align: center;
  cursor: pointer;
  padding: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    color: #004d87;
  }

  &:disabled {
    cursor: not-allowed;
    &:hover {
      color: #295086;
    }
  }
`;

export const SidebarDatePickerCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  padding: 10px 12px;
  background: #f4f9ff;
  overflow: hidden;
  min-width: 0;

  .react-datepicker-wrapper {
    width: 100%;
    max-width: 100%;
    display: flex;
    justify-content: center;
    overflow: hidden;
  }
`;

export const SidebarTimePickerCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  padding: 10px 12px;
  background: #ffffff;
  min-width: 0;
  white-space: nowrap;
  overflow: visible;

  .sidebar-time-picker-wrap {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: visible;
    gap: 0;
  }

  .label-prefix {
    font-size: 14px;
    font-weight: 400;
    color: #295086;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .sidebar-time-select {
    width: auto;
    height: auto;
    border: none;
    background: transparent;
    box-shadow: none;
    padding: 0;
    font-size: 14px;
    font-weight: 600;
    color: #295086;
    text-align: left;
    cursor: pointer;
    white-space: nowrap;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    &:hover,
    &:focus {
      color: #004d87;
      outline: none;
    }

    option {
      color: #333;
      background-color: #fff;
    }
  }
`;

export const SidebarDateTimePickerCell = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  padding: 10px 12px;
  position: relative;

  .label-prefix {
    font-size: 14px;
    font-weight: 400;
    color: #295086;
    white-space: nowrap;
  }

  .sidebar-time-picker {
    width: auto;

    .rc-time-picker-input {
      width: auto;
      min-width: 72px;
      height: auto;
      border: none;
      background: transparent;
      box-shadow: none;
      padding: 0;
      font-size: 14px;
      font-weight: 400;
      color: #295086;
      text-align: left;
      cursor: pointer;

      &:hover,
      &:focus {
        color: #004d87;
        outline: none;
      }
    }

    .rc-time-picker-icon {
      display: none;
    }
  }

  .sidebar-date-picker {
    width: 100%;
    border: none;
    background: transparent;
    font-size: 14px;
    font-weight: 600;
    color: #295086;
    text-align: center;
    cursor: pointer;
    padding: 0;

    &:focus {
      outline: none;
      color: #004d87;
    }
  }
`;

export const SidebarDivider = styled.span`
  width: 1px;
  background: #e2eefc;
  align-self: stretch;
`;

export const SidebarForm = styled.div`
  flex: 1 1 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow-y: auto;
  background: #ffffff;

  .sitback-select2-container {
  &.sitback-select-option--is-disabled {
   
        .sitback-select-option__control {
        background-color: rgb(248, 250, 252);
    color: rgb(100, 116, 139);
    cursor: not-allowed;
        }
      }
    .sitback-select-option__control {
      min-height: 46px;
      height: 46px;
      padding: 0 10px;
      border-radius: 10px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      box-shadow: none !important;

      &:hover {
        border-color: #004d87;
      }

      &.sitback-select-option--is-disabled {
        cursor: not-allowed;
        .sitback-select-option__control {
          background-color: #F8F8FB !important;
          cursor: not-allowed;
        }
      }

      .sitback-select-option__value-container {
        padding: 0 6px;
        flex-wrap: nowrap;
        overflow: hidden;

        .sitback-select-option__placeholder,
        .sitback-select-option__single-value {
          color: #a0aec0;
          font-size: 14px;
          font-weight: 400;
        }

        .sitback-select-option__single-value {
          color: #295086;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          position: absolute;
          margin: 0;
        }
      }

      .sitback-select-option__indicators {
        .sitback-select-option__indicator-separator {
          display: none;
        }
        .sitback-select-option__indicator {
          color: #7a869a;
          padding: 8px;
        }
      }
    }

    .sitback-select-option__menu {
      margin-top: 4px;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
      overflow: hidden;
      z-index: 20;
    }

    .sitback-select-option__menu-list {
      padding: 4px 0;
    }

    .sitback-select-option__option {
      color: #295086 !important;
      font-size: 14px;
      font-weight: 400;
      padding: 10px 14px;
      cursor: pointer;
      background-color: #ffffff;

      span {
        color: inherit;
      }

      &:active {
        background-color: #004b87;
        color: #ffffff !important;
      }

      &.sitback-select-option__option--is-focused {
        background-color: #f4f9ff;
        color: #295086 !important;
      }

      &.sitback-select-option__option--is-selected {
        background-color: #004b87 !important;
        color: #ffffff !important;

        span {
          color: #ffffff !important;
        }
      }

      &.sitback-select-option__option--is-selected.sitback-select-option__option--is-focused {
        background-color: #004b87 !important;
        color: #ffffff !important;
      }
    }
  }
`;

export const SidebarField = styled.div`
  width: 100%;
`;

const sidebarInputStyles = `
  width: 100%;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  color-scheme: light;
  transition: border-color 0.2s ease, background-color 0.2s ease;

  &::placeholder {
    color: #a0aec0;
  }

  &:focus {
    border-color: #004d87;
  }
`;

export const ClientSearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const ClientSearchInput = styled.input`
  ${sidebarInputStyles}
  height: 46px;
  padding: 0 50px 0 16px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  color: #295086;
  background: #ffffff;
`;

export const ClientAddBtn = styled.button`
  position: absolute;
  right: 10px;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: #004d87;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;

  &:hover {
    background: #0b4170;
  }
`;

export const SearchDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 50;
  margin-top: 4px;
  scrollbar-width: thin;
  scrollbar-color: #8a8a8f #e9dede;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #e9dede;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #8a8a8f;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-button {
    display: none;
    width: 0;
    height: 0;
  }

  @media (prefers-color-scheme: dark) {
    scrollbar-color: #8a8a8f #e9dede;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #e9dede;
      border-radius: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background: #8a8a8f;
      border-radius: 8px;
    }

    &::-webkit-scrollbar-button {
      display: none;
      width: 0;
      height: 0;
    }
  }
`;

export const SearchDropdownItem = styled.div`
  padding: 10px 16px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #f7fafc;
  transition: background 0.15s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f7fafc;
  }

  .client-name {
    font-size: 14px;
    font-weight: 500;
    color: #295086;
  }

  .client-info {
    font-size: 12px;
    color: #7a869a;
    margin-top: 2px;
  }

  &.create-client-option {
    .client-name {
      color: #004d87;
      font-weight: 600;
      text-decoration: underline;
    }
  }
`;

export const ServiceSelect = styled.select`
  ${sidebarInputStyles}
  height: 46px;
  padding: 0 40px 0 16px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  color: #295086;
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%237A869A' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  appearance: none;
  cursor: pointer;

  &:invalid,
  &:has(option[value='']:checked) {
    color: #a0aec0;
  }

  option {
    background: #ffffff;
    color: #295086;
  }
`;

export const NotesTextarea = styled.textarea`
  ${sidebarInputStyles}
  min-height: 150px;
  padding: 14px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  color: #295086;
  background: #ffffff;
  resize: vertical;
`;

export const SidebarFooter = styled.div`
  padding: 15px 0px 0px;
  background: #ffffff;
`;

export const BookAppointmentBtn = styled.button`
  width: 100%;
  height: 46px;
  border: none;
  /* border-radius: 8px; */
  background: #004d87;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 0.01em;

  &:hover {
    background: #0b4170;
  }
`;

export const CalendarContainer = styled.div`
  background: #ffffff;
  border-radius: 12px;
  width: 100%;

  .rbc-calendar {
    color: #295086;
  }

  .rbc-time-view {
    border: 1px solid #E2EEFC;
    border-radius: 12px;
    overflow: hidden;
  }

  .rbc-allday-cell {
    display: none !important;
  }

  .rbc-time-header {
    background: #ffffff;
    position: relative;
    z-index: 2;
  }

  .rbc-time-header-content {
    border-left: 1px solid #E2EEFC;
  }

  .rbc-time-content {
    border-top: 1px solid #E2EEFC;
    background: #ffffff;
  }

  .rbc-time-gutter {
    background: #ffffff;
  }

  .rbc-time-gutter .rbc-timeslot-group {
    border-bottom: 1px solid #E2EEFC;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    padding-right: 12px;
    height: 65px;
    .rbc-time-slot {
      background-color: #fff;
    }
  }

  .rbc-label {
    font-size: 11px;
    font-weight: 600;
    color: #7A869A;
    margin-top: -6px;
  }

  .rbc-timeslot-group {
    border-bottom: 1px solid #E2EEFC;
    min-height: 65px;
    display: flex;
    flex-direction: column;
  }

  .rbc-day-slot .rbc-time-slot {
    border-bottom: 1px solid #F0F6FD;
    flex: 1;
  }

  .rbc-day-slot .rbc-time-slot:last-child {
    border-bottom: none;
  }

  .rbc-day-slot {
    /* border-left: 1px solid #E2EEFC; */
    background-color: #ffffff;
    overflow: hidden;

    .rbc-events-container {
      margin-right: 4px !important;
    }
  }

  .rbc-time-header-cell {
    overflow: visible !important;
    min-height: 64px;
  }

  .rbc-time-header-cell-single-day {
    display: block !important;
  }

  .rbc-day-slot.rbc-today {
    /* background-color: #F9FCFF; */
  }

  .rbc-header {
    overflow: visible !important;
    white-space: normal !important;
    border-bottom: none !important;
    min-height: 64px !important;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 !important;
  }

  .rbc-header .rbc-button-link,
  .rbc-header > span {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .rbc-header.rbc-today {
    background-color: #F4F9FF;
    box-shadow: inset 0 3px 0 #3B67A3;
  }

  .rbc-today {
    overflow: visible !important;
  }

  .custom-day-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 0 8px;
    line-height: 1.2;
  }

  .custom-day-header.is-today {
    padding-top: 12px;
  }

  .custom-day-header .day-name {
    font-size: 11px;
    font-weight: 600;
    color: #7A869A;
    text-transform: uppercase;
    margin-bottom: 4px;
    line-height: 1.2;
  }

  .custom-day-header .day-number {
    font-size: 20px;
    font-weight: 700;
    color: #004D87;
    line-height: 1.2;
  }

  .rbc-time-content::-webkit-scrollbar {
    width: 6px;
  }
  .rbc-time-content::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  .rbc-time-content::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }

  .rbc-event {
    background: none;
    border: none;
    padding: 0;
    color: inherit;
  }

  .rbc-day-slot .rbc-event.event-preview-slot,
  .rbc-day-slot .rbc-event.event-booked-slot {
    display: flex !important;
    flex-flow: column nowrap !important;
    align-items: stretch !important;
    min-height: 44px !important;
    max-width: 100% !important;
    padding: 0 !important;
    border: none !important;
    background: transparent !important;
    overflow: hidden !important;
    box-sizing: border-box !important;
  }

  .rbc-day-slot .rbc-event.event-preview-slot.event-preview-expanded {
    min-height: 44px !important;
  }

  .rbc-event.event-preview-slot .rbc-event-label,
  .rbc-event.event-booked-slot .rbc-event-label {
    display: none !important;
    height: 0 !important;
    min-height: 0 !important;
    padding: 0 !important;
    margin: 0 !important;
    overflow: hidden !important;
  }

  .rbc-event.event-preview-slot .rbc-event-content,
  .rbc-event.event-booked-slot .rbc-event-content {
    flex: 1 1 auto !important;
    width: 100% !important;
    max-width: 100% !important;
    height: 100% !important;
    min-height: 0 !important;
    min-width: 0 !important;
    display: flex !important;
    line-height: normal !important;
    overflow: hidden !important;
  }

  .rbc-event.event-preview-slot.event-preview-expanded .rbc-event-content {
    min-height: 0 !important;
  }

  .rbc-slot-selection {
    background-color: rgba(0, 77, 135, 0.08) !important;
    border: 1px solid rgba(0, 77, 135, 0.2) !important;
  }

  .rbc-time-slot.rbc-slot-past,
  .rbc-time-slot.rbc-slot-disabled {
    background-color: #f8f9fb;
    cursor: not-allowed !important;
    pointer-events: auto !important;
  }

  .rbc-day-slot.rbc-past-day {
    background-color: #f8f9fb;
  }

  .rbc-day-slot.rbc-past-day .rbc-time-slot {
    cursor: not-allowed !important;
    pointer-events: auto !important;
  }

  .rbc-header.rbc-past-day {
    opacity: 0.55;
  }

  .custom-calendar-event {
    height: 100%;
    padding: 6px 8px;
    border-radius: 6px;
    font-size: 11px;
    line-height: 1.3;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.04);

    &.event-unavailable {
      background-color: #E7E7E7 !important;
      border-left: 4px solid #B0B0B0 !important;
      color: #5E6C84;
    }

    &.event-booking {
      border-left: 4px solid var(--event-color);
      background-color: var(--event-bg);
      color: #295086;
    }

    &.event-booked {
      width: 100%;
      max-width: 100%;
      min-width: 0;
      min-height: 0;
      height: 100%;
      padding: 4px 6px;
      background-color: #CCFBF1 !important;
      border-left: 4px solid #0D9488 !important;
      color: #115E59 !important;
      box-shadow: none;
      justify-content: flex-start;
      box-sizing: border-box;
      font-weight: 500;
      overflow: hidden;

      /* bookingstatus = 0 */
      &.status-confirmed {
        background-color: #CCFBF1 !important;
        border-left: 4px solid #0D9488 !important;
        color: #115E59 !important;
        .event-title {
          color: #115E59 !important;
        }
        .event-time {
          color: #0F766E !important;
        }
      }

      /* bookingstatus = 1 */
      &.status-cancelled {
        background-color: #F3F4F6 !important;
        border-left: 4px solid #6B7280 !important;
        color: #374151 !important;
        .event-title {
          color: #374151 !important;
        }
        .event-time {
          color: #6B7280 !important;
        }
      }

      /* bookingstatus = 2 */
      &.status-noshow {
        background-color: #FEE2E2 !important;
        border-left: 4px solid #DC2626 !important;
        color: #991B1B !important;
        .event-title {
          color: #991B1B !important;
        }
        .event-time {
          color: #DC2626 !important;
        }
      }

      /* bookingstatus = 3 */
      &.status-completed {
        background-color: #DCFCE7 !important;
        border-left: 4px solid #22C55E !important;
        color: #166534 !important;
        .event-title {
          color: #166534 !important;
        }
        .event-time {
          color: #16A34A !important;
        }
      }

      /* bookingstatus = 4 */
      &.status-inprogress {
        background-color: #DBEAFE !important;
        border-left: 4px solid #3B82F6 !important;
        color: #1E40AF !important;
        .event-title {
          color: #1E40AF !important;
        }
        .event-time {
          color: #1D4ED8 !important;
        }
      }

      /* bookingstatus = 5 */
      &.status-ready {
        background-color: #F3E8FF !important;
        border-left: 4px solid #8B5CF6 !important;
        color: #6B21A8 !important;
        .event-title {
          color: #6B21A8 !important;
        }
        .event-time {
          color: #7C3AED !important;
        }
      }

      &.status-checkedin {
        background-color: #DBEAFE !important;
        border-left: 4px solid #3B82F6 !important;
        color: #1E40AF !important;
        .event-title {
          color: #1E40AF !important;
        }
        .event-time {
          color: #1D4ED8 !important;
        }
      }
    }

    &.event-preview {
      width: 100%;
      max-width: 100%;
      min-width: 0;
      min-height: 0;
      height: 100%;
      padding: 4px 6px;
      background-color: #d6e8f7 !important;
      border-left: 4px solid #004d87 !important;
      color: #004d87;
      box-shadow: none;
      justify-content: flex-start;
      box-sizing: border-box;
      overflow: hidden;
    }
  }

  .event-preview.event-preview-expanded {
    min-height: 0;
    padding: 4px 6px;
  }

  .event-booked .event-title,
  .event-preview .event-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.25;
    flex-shrink: 0;
  }

  .event-booked .event-time,
  .event-preview .event-time {
    font-size: 11px;
    font-weight: 500;
    margin-top: 2px;
    text-transform: lowercase;
    line-height: 1.25;
    flex-shrink: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .event-preview .event-time {
    color: #004d87;
  }

  .event-title {
    font-weight: 700;
    font-size: 11px;
    color: #004D87;
  }

  .event-client {
    font-size: 10px;
    color: #4A5568;
    margin-top: 2px;
  }

  .event-status-badge {
    align-self: flex-start;
    font-size: 9px;
    font-weight: 600;
    padding: 2px 6px;
    border-radius: 100px;
    background-color: #F5DEC8;
    color: #5F3D1F;
    margin-top: 4px;
  }
`;

export const ToolbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  width: 100%;
`;

export const ToolbarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const TodayButton = styled.button`
  font-size: 14px;
  font-weight: 700;
  color: #004D87;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px 12px;

  &:hover {
    opacity: 0.8;
  }
`;

export const NavButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const NavButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;

  &:hover svg path {
    stroke: #004D87;
  }
`;

export const MonthTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #004D87;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const MonthDropdownContainer = styled.div`
  position: relative;
`;

export const MonthDropdownButton = styled.button`
  font-size: 16px;
  font-weight: 700;
  color: #004d87;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px 4px;

  &:hover {
    opacity: 0.85;
  }
`;

export const MonthDropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 8px 0;
  min-width: 200px;
  max-height: 280px;
  overflow-y: auto;
`;

export const MonthDropdownItem = styled.button`
  display: block;
  width: 100%;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: ${(props) => (props.active ? "700" : "500")};
  color: ${(props) => (props.active ? "#004d87" : "#295086")};
  background: ${(props) => (props.active ? "#f4f9ff" : "transparent")};
  border: none;
  text-align: left;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    background: #f4f9ff;
    color: #004d87;
  }
`;

export const ToolbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const TherapistDropdownContainer = styled.div`
  position: relative;
`;

export const TherapistDropdownButton = styled.button`
  background: #ffffff;
  border: 1px solid #E2E8F0;
  border-radius: 100px;
  height: 40px;
  padding: 4px 16px 4px 6px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #295086;
  cursor: pointer;
  outline: none;

  &:hover {
    border-color: #CBD5E1;
  }
`;

export const TherapistAvatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #F4F5F7;
`;

export const TherapistName = styled.span`
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TherapistDropdownMenu = styled.div`
  position: absolute;
  top: 46px;
  left: 0;
  background: #ffffff;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 8px 0;
  width: 200px;
  max-height: 250px;
  overflow-y: auto;
`;

export const TherapistDropdownItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  font-size: 14px;
  color: #295086;
  cursor: pointer;

  &:hover {
    background-color: #F4F5F7;
  }
`;

export const ViewModeToggleContainer = styled.div`
  background: #ffffff;
  border: 1px solid #E2E8F0;
  border-radius: 100px;
  display: inline-flex;
  padding: 2px;
`;

export const ViewModeButton = styled.button`
  padding: 6px 18px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: ${(props) => (props.active ? "#004D87" : "transparent")};
  color: ${(props) => (props.active ? "#ffffff" : "#7A869A")};
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${(props) => (props.active ? "#ffffff" : "#004D87")};
  }
`;

export const UnavailableBtn = styled.button`
  background: #004D87;
  color: #ffffff;
  border: none;
  border-radius: 100px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: #0b4170;
  }
`;

export const ErrorText = styled.p`
  color: #e53e3e;
  font-size: 12px;
  margin-top: 4px;
  font-weight: 500;
  margin-left: 15px;
`;

export const ReviewCard = styled.div`
  background: transparent;
  border: none;
  border-bottom: 1px solid #EAEBEC;
  border-radius: 0;
  padding: 16px 0;
  margin-bottom: 0px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const ReviewHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
  text-align: center;
`;

export const ReviewAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #f4f9ff;
  border: 2px solid #e2eefc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: #004d87;
  overflow: hidden;
  margin-bottom: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ReviewTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: #004d87;
  margin: 0 0 4px 0;
`;

export const ReviewSubtitle = styled.span`
  font-size: 12px;
  color: #7a869a;
`;

export const ReviewRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #EAEBEC;
  font-size: 14px;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const ReviewLabel = styled.span`
  color: #295086;
  font-weight: 400;
`;

export const ReviewValue = styled.span`
  color: #295086;
  font-weight: 600;
  text-align: right;
`;

export const ReviewCardDeleteBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 0px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(41, 80, 134);
  transition: color 0.15s ease;
`;

export const ServiceReviewCard = styled.div`
  background: transparent;
  border: none;
  border-bottom: 1px solid #EAEBEC;
  border-radius: 0;
  padding: 0 0 10px 0;
  margin-bottom: 14px;
  position: relative;
`;

export const ServiceReviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const ServiceReviewTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: #295086;
  margin: 0;
`;

export const AddServicesLink = styled.button`
  background: none;
  border: none;
  font-size: 12px;
  font-weight: 600;
  color: #004d87;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

export const ServiceReviewSubText = styled.p`
  font-size: 13px;
  color: #295086;
  margin: 0 0 12px 0;
  border-bottom: 1px solid #EAEBEC;
  padding-bottom: 12px;
  word-break: break-word;
  overflow-wrap: break-word;

  span {
    font-weight: 600;
    color: #295086;
  }
`;

export const ServiceReviewTimeText = styled.p`
  font-size: 13px;
  color: #295086;
  margin: 0;

  span {
    font-weight: 600;
    color: #295086;
  }
`;

export const ExpressBookingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 4px;
  margin-top: 10px;
  border-top: 1px solid #e2eefc;
`;

export const ExpressBookingLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #295086;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const AddCreditCardBtn = styled.button`
  background: none;
  border: none;
  color: #004d87;
  font-weight: 600;
  text-decoration: underline;
  font-size: 13px;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: #0b4170;
  }
`;
