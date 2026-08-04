"use client";

import styled from "@emotion/styled";

export const PageWrapper = styled.div`
  background-color: #FFFFFF;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: #FFFFFF;
  box-sizing: border-box;
`;

export const HeaderSection = styled.div`
  background: #F5FBFF;
  padding: 24px 24px;
  border-bottom: 1px solid #D2E3F0;
`;

export const MiddleSection = styled.div`
  background-color: #FFF;
  padding: 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-bottom: 1px solid #D2E3F0;
`;

export const TableSection = styled.div`
  background-color: #FFFFFF;
  padding: 24px;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;

export const PageTitle = styled.h1`
  font-size: 16px;
  font-weight: 600;
  color: #0A3A60;
  margin: 0;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

export const SearchWrapper = styled.div`
  position: relative;
  width: 320px;
  @media (max-width: 576px) {
    width: 100%;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 8px 16px 8px 40px;
  border-radius: 20px;
  border: 1px solid #C8D7E6;
  font-size: 13px;
  outline: none;
  background-color: #FFFFFF;
  color: #0A3A60;
  transition: border-color 0.2s, box-shadow 0.2s;
  &::placeholder {
    color: #7A869A;
  }
  &:focus {
    border-color: #004B87;
    box-shadow: 0 0 0 2px rgba(0, 75, 135, 0.15);
  }
`;

export const SearchIconWrapper = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #7A869A;
  display: flex;
  align-items: center;
  pointer-events: none;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  
  &.secondary {
    background-color: #FFFFFF;
    color: #004B87;
    border: 1px solid #C8D7E6;
    &:hover {
      background-color: #EDF5FC;
      border-color: #004B87;
    }
  }

  &.primary {
    background-color: #004B87;
    color: #FFFFFF;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 75, 135, 0.2);
    &:hover {
      background-color: #003662;
      transform: translateY(-1px);
    }
  }

  &.active-tab {
    background-color: #FFFFFF;
    color: #004B87;
    border: 2px solid #004B87;
    box-shadow: none;

    &:hover {
      background-color: #EDF5FC;
      border-color: #004B87;
    }
  }
`;

export const ViewToggle = styled.div`
  display: flex;
  background-color: #EDF2F7;
  border-radius: 20px;
  padding: 4px;
  border: 1px solid #C8D7E6;
`;

export const ToggleButton = styled.button`
  padding: 6px 16px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${props => props.active ? '#004B87' : 'transparent'};
  color: ${props => props.active ? '#FFFFFF' : '#4A607A'};
  box-shadow: ${props => props.active ? '0 1px 3px rgba(0,0,0,0.15)' : 'none'};
  &:hover {
    color: ${props => props.active ? '#FFFFFF' : '#004B87'};
  }
`;

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: 4px;
  margin-bottom: 4px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  height: 120px;
  background: #FFFFFF;
  border-radius: 8px;
  border: 1px solid #E2ECF5;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0px 4px 12px rgba(0, 72, 124, 0.04);
  }
`;

export const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const StatLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #295086;
`;

export const StatValue = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #004B87;
`;

export const StatIconContainer = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  background-color: #004B87;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

export const FilterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

export const FilterGroupLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const DropdownSelect = styled.select`
  padding: 8px 32px 8px 12px;
  border-radius: 20px;
  border: 1px solid #C8D7E6;
  background-color: #FFFFFF;
  color: #4A607A;
  font-size: 13px;
  font-weight: 500;
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%234A607A' d='M0 0.5L5 5.5L10 0.5H0Z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  min-width: 140px;
  transition: border-color 0.2s;
  &:focus {
    border-color: #004B87;
  }
`;

export const DatePickerInput = styled.input`
  padding: 7px 12px;
  border-radius: 20px;
  border: 1px solid #C8D7E6;
  background-color: #FFFFFF;
  color: #4A607A;
  font-size: 13px;
  font-weight: 500;
  outline: none;
  cursor: pointer;
  min-width: 140px;
  transition: border-color 0.2s;
  &:focus {
    border-color: #004B87;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

export const Th = styled.th`
  background-color: #FFFFFF;
  padding: 16px 12px;
  font-size: 13px;
  font-weight: 600;
  color: #5E6C84;
  border-bottom: 1px solid #E2ECF5;
`;

export const Td = styled.td`
  padding: 14px 12px;
  font-size: 13.5px;
  color: #5E6C84;
  border-bottom: 1px solid #F1F5F9;
  vertical-align: middle;
`;

export const Tr = styled.tr`
  transition: background-color 0.2s;
  &:hover {
    background-color: #F8FAFC;
  }
  &.guest-row {
    background-color: #FAFBFC;
    &:hover {
      background-color: #F8FAFC;
    }
  }
`;

export const CustomerInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CustomerName = styled.span`
  font-weight: 500;
  color: #295086;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const CustomerPhone = styled.span`
  font-size: 12px;
  color: #7A869A;
  margin-top: 2px;
`;

export const GuestBadge = styled.span`
  background-color: #EBF8FF;
  color: #2B6CB0;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
`;

export const PillBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 12.5px;
  font-weight: 500;
  text-transform: capitalize;
  background-color: ${props => props.bgColor || '#F4F5F7'};
  color: ${props => props.color || '#5E6C84'};
  white-space: nowrap;
`;

export const ActionIconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ActionIconButton = styled.button`
  background: transparent;
  border: none;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #295086;
  transition: all 0.2s;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    color: #004B87;
    opacity: 0.85;
  }
  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  &.action-delete {
    color: #E5484D;

    &:hover:not(:disabled) {
      color: #C62828;
    }
  }

  &.action-view {
    color: #295086;
  }

  &.action-edit {
    color: #295086;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #7A869A;
  background-color: #FFFFFF;
  border-radius: 8px;
  border: 1px dashed #DFE1E6;
  gap: 12px;
  font-size: 15px;
  margin-top: 16px;
`;

export const ViewMoreBtn = styled.button`
  display: block;
  width: 200px;
  margin: 24px auto;
  padding: 10px 16px;
  border-radius: 20px;
  border: 1px solid #004B87;
  background: transparent;
  color: #004B87;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: #004B87;
    color: #FFFFFF;
  }
`;

export const ListLayoutWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0;
  width: 100%;
`;

export const ListMainArea = styled.div`
  flex: 1;
  min-width: 0;
  transition: flex 0.2s ease;
`;

export const ListSidebarWrap = styled.div`
  flex-shrink: 0;
  align-self: flex-start;
  position: sticky;
  top: 0;
  height: fit-content;
  margin-top: 25px;

  & > aside {
    height: 715px;
    border-left: 1px solid #e2eefc;
  }
`;
