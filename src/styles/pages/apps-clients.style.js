"use client";

import styled from "@emotion/styled";
import { theme } from "../global/theme";
import { mediaQueries } from "@/utils/mediaQuery";

export const ClientsPage = styled.div`
  background: #f5f8fc;
  min-height: calc(100vh - 80px);
  color: ${theme.color.secondary};
`;

export const ClientsContent = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 32px 48px;

  ${mediaQueries("lg")`
    padding: 0 20px 40px;
  `}

  ${mediaQueries("sm")`
    padding: 0 14px 32px;
  `}
`;

export const ClientsHeader = styled.header`
  display: grid;
  grid-template-columns: auto minmax(280px, 1fr) auto;
  align-items: center;
  gap: 24px;
  background: #F5FBFF;
  border-bottom: 1px solid #d2e3f0;
  padding: 20px 32px;
  margin: 0 -32px 24px;

  ${mediaQueries("lg")`
    margin: 0 -20px 24px;
    padding: 18px 20px;
    grid-template-columns: 1fr;
    gap: 16px;
  `}
`;

export const ClientsTitleBlock = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 8px;
  white-space: nowrap;

  h1 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: ${theme.color.secondary};
  }

  span {
    font-size: 12px;
    font-weight: 500;
    color: ${theme.color.secondary};
  }
`;

export const ClientsSearchField = styled.label`
  position: relative;
  width: 100%;
  max-width: 520px;
  justify-self: center;

  ${mediaQueries("lg")`
    max-width: none;
    justify-self: stretch;
  `}

  .search-icon {
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    pointer-events: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    svg {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  input {
    width: 100%;
    appearance: none;
    border: 1px solid #d7e2ef;
    background: ${theme.color.white};
    border-radius: 100px;
    min-height: 46px;
    padding: 12px 20px 12px 46px;
    font-size: 14px;
    color: ${theme.color.secondary};
    outline: none;
    transition: border-color 0.15s ease;

    &::placeholder {
      font-size: 12px;
      font-weight: 400;
      color:${theme.color.secondary};
    }

    &:focus {
      border-color: ${theme.color.secondary};
    }
  }
`;

export const ClientsAddButton = styled.button`
  appearance: none;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 10px 22px;
  border-radius: 100px;
  background: ${theme.color.secondary};
  color: ${theme.color.white};
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.02em;
  cursor: pointer;
  white-space: nowrap;
  justify-self: end;

  ${mediaQueries("lg")`
    justify-self: stretch;
  `}

  &:hover {
    background: #1f3d66;
  }
`;

export const ClientsTableCard = styled.div`
  background: ${theme.color.white};
  border: 1px solid #e8eef6;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(41, 80, 134, 0.04);
  overflow: hidden;
`;

export const ClientsTableScroll = styled.div`
  overflow-x: auto;
  overflow-y: auto;
  max-height: calc(100vh - 260px);

  ${(props) =>
    props.$lockScroll &&
    `
    overflow: hidden !important;
  `}

  scrollbar-width: thin;
  scrollbar-color: #295086 #e9dede;

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #e9dede;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #295086;
    border-radius: 6px;
  }
`;

export const ClientsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 760px;

  th {
    text-align: left;
    font-size: 14px;
    font-weight: 600;
    color: ${theme.color.secondary};
    padding: 18px 24px;
    border-bottom: 1px solid #eef2f7;
    white-space: nowrap;
    background: ${theme.color.white};
  }

  td {
    padding: 18px 24px;
    border-bottom: 1px solid #f1f5f9;
    font-size: 14px;
    color: rgba(41, 80, 134, 0.85);
    vertical-align: middle;
  }

  tbody tr {
    cursor: pointer;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover td {
    background: #fafcff;
  }
`;

export const ClientsNameCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  color: ${theme.color.secondary};
`;

export const ClientsAvatar = styled.span`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  color: ${theme.color.white};
  background: ${(props) => props.$bg || theme.color.secondary};
  flex-shrink: 0;
  text-transform: uppercase;
`;

export const ClientsEmptyState = styled.div`
  padding: 48px 24px;
  text-align: center;
  font-size: 14px;
  color: #8391a1;
`;

export const ClientsLoadingRow = styled.tr`
  cursor: default;

  td {
    padding: 32px 24px;
    text-align: center;
    border-bottom: none;
  }
`;

export const ClientSidebarOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1040;
  background: rgba(15, 23, 42, 0.25);
  overscroll-behavior: contain;
`;

export const ClientSidebarPanel = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1050;
  width: min(1000px, calc(100vw - 320px));
  height: 100vh;
  background: ${theme.color.white};
  box-shadow: -12px 0 40px rgba(15, 23, 42, 0.18);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overscroll-behavior: contain;

  ${mediaQueries("xl")`
    width: min(760px, calc(100vw - 300px));
  `}

  ${mediaQueries("lg")`
    width: min(680px, calc(100vw - 280px));
  `}

  ${mediaQueries("md")`
    width: calc(100vw - 260px);
    min-width: 300px;
  `}

  ${mediaQueries("sm")`
    width: calc(100vw - 220px);
    min-width: 260px;
  `}
`;

export const ClientSidebarHeader = styled.div`
  background: ${theme.color.secondary};
  padding: 18px 24px;
  flex-shrink: 0;

  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: ${theme.color.white};
  }
`;

export const ClientSidebarBody = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 320px minmax(0, 1fr);
  min-height: 0;
  overflow: hidden;
  overscroll-behavior: contain;

  ${mediaQueries("xl")`
    grid-template-columns: 320px minmax(0, 1fr);
  `}

  ${mediaQueries("md")`
    grid-template-columns: 1fr;
    overflow: auto;
  `}
`;

export const ClientSidebarProfile = styled.div`
  border-right: 1px solid #e8eef6;
  background: #F5FBFF;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: auto;
  overscroll-behavior: contain;

  ${mediaQueries("md")`
    border-right: none;
    border-bottom: 1px solid #e8eef6;
  `}
`;

export const ClientSidebarProfileTop = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 0;
  padding: 30px 28px 22px;
  background: #f8fcff;

  .edit-btn {
    position: absolute;
    top: 18px;
    right: 18px;
    appearance: none;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 34px;
      height: 34px;
      display: block;
    }
  }
`;

export const ClientSidebarAvatar = styled.div`
  width: 128px;
  height: 128px;
  border-radius: 50%;
  background: ${(props) => props.$bg || theme.color.secondary};
  color: ${theme.color.white};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  overflow: hidden;
  box-shadow: 0 12px 28px rgba(41, 80, 134, 0.18);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ClientSidebarName = styled.h3`
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  color: ${theme.color.secondary};
  line-height: 1.2;
`;

export const ClientSidebarDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 10px 28px 24px;
  background: #f8fcff;
`;

export const ClientSidebarDetailItem = styled.div`
  padding: 14px 0;

  &:last-of-type {
    border-bottom: none;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 600;
    color: ${theme.color.secondary};
  }

  p {
    margin: 0;
    font-size: 14px;
    font-weight: 400;
    color: ${theme.color.secondary};
    line-height: 1.2;
    word-break: break-word;
  }
`;

export const ClientSidebarNotes = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 180px;

  label {
    display: block;
    margin-bottom: 8px;
    font-size: 13px;
    font-weight: 500;
    color: ${theme.color.secondary};
  }

  textarea {
    width: 100%;
    flex: 1;
    min-height: 120px;
    resize: vertical;
    border: 1px solid #d7e2ef;
    border-radius: 8px;
    padding: 12px 14px;
    font-size: 13px;
    color: ${theme.color.secondary};
    outline: none;

    &::placeholder {
      color: #8391a1;
    }

    &:focus {
      border-color: ${theme.color.secondary};
    }
  }
`;

export const ClientSidebarActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 20px;

  button {
    appearance: none;
    min-height: 42px;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
  }

  .cancel-btn {
    border: 1px solid ${theme.color.secondary};
    background: ${theme.color.white};
    color: ${theme.color.secondary};
  }

  .save-btn {
    border: none;
    background: ${theme.color.secondary};
    color: ${theme.color.white};

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`;

export const ClientSidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
  background: #f5f8fc;
  overflow: hidden;
  overscroll-behavior: contain;
`;

export const ClientSidebarTabs = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 0 28px;
  background: #F5FBFF;
  border-bottom: 1px solid #e8eef6;
  flex-shrink: 0;
  overflow-x: auto;

  button {
    appearance: none;
    border: none;
    background: transparent;
    padding: 18px 4px 14px;
    font-size: 14px;
    font-weight: 500;
    color: #8391a1;
    cursor: pointer;
    white-space: nowrap;
    position: relative;

    &.active {
      color: ${theme.color.secondary};
      font-weight: 600;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 3px;
        border-radius: 3px 3px 0 0;
        background: ${theme.color.secondary};
      }
    }
  }
`;

export const ClientSidebarTabPanel = styled.div`
  flex: 1;
  overflow: auto;
  padding: 20px;
  background: ${theme.color.white};
  overscroll-behavior: contain;
`;

export const ClientSidebarSection = styled.section`
  background: ${theme.color.white};
  border: 1px solid #e8eef6;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 14px;

    h4 {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
      color: ${theme.color.secondary};
    }

    span,
    button {
      font-size: 13px;
      font-weight: 500;
      color: ${theme.color.secondary};
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
    }
  }

  .empty-text {
    margin: 0;
    font-size: 13px;
    color: #8391a1;
  }
`;

export const ClientSidebarTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    text-align: left;
    padding: 12px 10px;
    border-bottom: 1px solid #eef2f7;
    font-size: 13px;
    color: rgba(41, 80, 134, 0.85);
    vertical-align: top;
  }

  th {
    font-weight: 600;
    color: ${theme.color.secondary};
    background: #fafcff;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

export const ClientSidebarCardItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid #eef2f7;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .card-meta {
    display: flex;
    flex-direction: column;
    gap: 4px;

    strong {
      font-size: 14px;
      color: ${theme.color.secondary};
    }

    span {
      font-size: 13px;
      color: #8391a1;
    }
  }

  .default-badge {
    display: inline-flex;
    align-items: center;
    min-height: 24px;
    padding: 2px 10px;
    border-radius: 999px;
    background: #dfecf9;
    color: ${theme.color.secondary};
    font-size: 11px;
    font-weight: 600;
  }
`;
