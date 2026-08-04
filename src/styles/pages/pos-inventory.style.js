"use client";

import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";

export const PosInventoryModalGlobalStyles = () => (
  <Global
    styles={css`
      .modal.sitback-pos-add-product-modal {
        background: rgba(41, 80, 134, 0.28);

        .modal-dialog {
          max-width: 560px;
          width: calc(100% - 24px);
          margin: 1.5rem auto;
        }

        .modal-content {
          background: #ffffff;
          border: none;
          border-radius: 20px;
          box-shadow: 0 16px 40px rgba(41, 80, 134, 0.18);
          overflow: hidden;
        }

        .modal-body {
          padding: 8px 28px 24px;
          background: #ffffff;
        }
      }
    `}
  />
);

export const PosDeleteProductModalGlobalStyles = () => (
  <Global
    styles={css`
      .modal.sitback-pos-delete-product-modal {
        background: rgba(41, 80, 134, 0.28);

        .modal-dialog {
          max-width: 560px;
          width: calc(100% - 24px);
          margin: 1.5rem auto;
        }

        .modal-content {
          background: #ffffff;
          border: none;
          border-radius: 20px;
          box-shadow: 0 16px 40px rgba(41, 80, 134, 0.18);
          overflow: hidden;
        }

        .modal-body {
          padding: 8px 32px 28px;
          background: #ffffff;
        }
      }
    `}
  />
);

export const PosInventoryFiltersGlobalStyles = () => (
  <Global
    styles={css`
      .offcanvas.sitback-pos-inventory-filters-sidebar {
        width: 360px !important;
        max-width: 92vw;
        border: none;
        box-shadow: -8px 0 28px rgba(41, 80, 134, 0.16);
        display: flex;
        flex-direction: column;

        .offcanvas-body {
          padding: 0;
          flex: 1;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
      }
    `}
  />
);

export const FilterSidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 20px;
  border-bottom: 1px solid #e8eef5;
  background: #ffffff;

  h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    color: #295086;
  }
`;

export const FilterSidebarCancelBtn = styled.button`
  min-width: 88px;
  height: 36px;
  border-radius: 999px;
  border: 1px solid #9ec5f0;
  background: #ffffff;
  color: #295086;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

export const FilterSidebarBody = styled.div`
  flex: 1;
  padding: 18px 20px 24px;
  overflow-y: auto;

  .filter-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-bottom: 20px;
  }
`;

export const FilterSectionLabel = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #8fa0b8;
  margin-bottom: 2px;
`;

export const FilterField = styled.div`
  select {
    width: 100%;
    height: 44px;
    border: 1px solid #d2dde9;
    border-radius: 999px;
    background: #ffffff;
    color: #295086;
    font-size: 14px;
    outline: none;
    padding: 0 40px 0 16px;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%29295086' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 16px center;

    &:focus {
      border-color: #b7c9e0;
    }
  }

  input[type="number"] {
    width: 100%;
    height: 44px;
    border: 1px solid #d2dde9;
    border-radius: 999px;
    background: #ffffff;
    color: #295086;
    font-size: 14px;
    outline: none;
    padding: 0 16px;
    -moz-appearance: textfield;

    &::placeholder {
      color: #295086;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &:focus {
      border-color: #b7c9e0;
    }
  }
`;

export const FilterExportSection = styled.div`
  border-top: 1px solid #e8eef5;
  padding-top: 18px;

  h4 {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    color: #295086;
  }
`;

export const FilterClearAllBtn = styled.button`
  width: 100%;
  height: 52px;
  border: none;
  background: #295086;
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background: #1e3a5f;
  }
`;

export const PosCategoriesModalGlobalStyles = () => (
  <Global
    styles={css`
      .modal.sitback-pos-manage-categories-modal {
        background: rgba(41, 80, 134, 0.28);

        .modal-dialog {
          max-width: 520px;
          width: calc(100% - 24px);
          margin: 1.5rem auto;
        }

        .modal-content {
          background: #ffffff;
          border: none;
          border-radius: 20px;
          box-shadow: 0 16px 40px rgba(41, 80, 134, 0.18);
          overflow: hidden;
        }

        .modal-body {
          padding: 8px 24px 24px;
          background: #ffffff;
        }
      }

      .modal.sitback-pos-add-category-modal {
        background: rgba(41, 80, 134, 0.28);

        .modal-dialog {
          max-width: 480px;
          width: calc(100% - 24px);
          margin: 1.5rem auto;
        }

        .modal-content {
          background: #ffffff;
          border: none;
          border-radius: 20px;
          box-shadow: 0 16px 40px rgba(41, 80, 134, 0.18);
          overflow: hidden;
        }

        .modal-body {
          padding: 8px 28px 24px;
          background: #ffffff;
        }
      }
    `}
  />
);

export const CategoryModalHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 48px 12px;
  background: #ffffff;

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
    color: #295086;
    text-align: center;
  }

  .close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    border: none;
    background: transparent;
    padding: 4px;
    cursor: pointer;
    display: inline-flex;
    line-height: 0;
  }
`;

export const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  max-height: ${(props) => (props.$compact ? "220px" : "420px")};
  overflow-y: auto;
  margin-bottom: 16px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #e9dede;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c5d5e6;
    border-radius: 8px;
  }

  @media (prefers-color-scheme: dark) {
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #f3f7fb;
      border-radius: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background: #c5d5e6;
      border-radius: 8px;
    }
  }
`;

export const CategoryListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 4px;
  border-bottom: 1px solid #eef3f8;
  background: ${(props) => (props.$active ? "#f5fbff" : "transparent")};
  border-radius: ${(props) => (props.$active ? "8px" : "0")};

  &:last-child {
    border-bottom: none;
  }

  .color-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    flex-shrink: 0;
    background: ${(props) => props.$color || "#2F80ED"};
  }

  .category-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .category-name {
    font-size: 14px;
    font-weight: 700;
    color: #295086;
  }

  .category-desc {
    font-size: 12px;
    font-weight: 300;
    color: #295086;
  }

  .category-actions {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  .category-action-btn {
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 6px;
    padding: 0;

    &:hover {
      background: #f5f9ff;
    }
  }
`;

export const CategoryListItemSkeleton = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 4px;
  border-bottom: 1px solid #eef3f8;

  &:last-child {
    border-bottom: none;
  }

  .skeleton-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .skeleton-actions {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }
`;

export const ProductTableRowSkeleton = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  .skeleton-product {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  .skeleton-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const AddCategoryBtn = styled.button`
  width: 100%;
  height: 46px;
  border: none;
  border-radius: 999px;
  background: #295086;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #1e3a5f;
  }
`;

export const AddCategoryForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  &.inline-edit-form {
    margin-top: 4px;
    padding-top: 8px;
  }
`;

export const CategoryColorsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;

  .colors-label {
    font-size: 14px;
    font-weight: 600;
    color: #295086;
  }

  .colors-list {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
`;

export const ColorSwatch = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: ${(props) => (props.$active ? "2px solid #111827" : "2px solid transparent")};
  background: ${(props) => props.$color || "#2F80ED"};
  cursor: pointer;
  padding: 0;
  box-shadow: ${(props) => (props.$active ? "0 0 0 2px #ffffff inset" : "none")};
`;

export const NonRetailToggleRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .toggle-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .toggle-label {
    font-size: 14px;
    font-weight: 600;
    color: #295086;
  }

  .toggle-help {
    margin: 0;
    font-size: 12px;
    line-height: 1.45;
    color: #8fa0b8;
  }
`;

export const CategoryToggle = styled.button`
  width: 44px;
  height: 24px;
  border-radius: 999px;
  border: none;
  padding: 2px;
  cursor: pointer;
  background: ${(props) => (props.$on ? "#295086" : "#c9d5e5")};
  display: inline-flex;
  align-items: center;
  justify-content: ${(props) => (props.$on ? "flex-end" : "flex-start")};
  transition: all 0.15s ease;

  span {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ffffff;
    display: block;
  }
`;

export const AddCategoryFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;

  .cancel-btn {
    min-width: 110px;
    height: 42px;
    border-radius: 999px;
    border: 1px solid #295086;
    background: #ffffff;
    color: #295086;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }

  .create-btn {
    min-width: 110px;
    height: 42px;
    border-radius: 999px;
    border: none;
    background: #295086;
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;

    &:disabled {
      opacity: 0.7;
    }
  }
`;

export const DeleteProductModalHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 48px 12px;
  background: #ffffff;

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
    color: #295086;
    text-align: center;
  }

  .close-btn {
    position: absolute;
    top: 18px;
    right: 18px;
    border: none;
    background: transparent;
    padding: 4px;
    cursor: pointer;
    display: inline-flex;
    line-height: 0;
  }
`;

export const DeleteProductMessage = styled.p`
  margin: 0 auto 28px;
  max-width: 460px;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.55;
  color: #7a8da8;

  strong {
    color: #295086;
    font-weight: 700;
  }
`;

export const DeleteProductFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;

  .cancel-btn {
    min-width: 110px;
    height: 42px;
    border-radius: 999px;
    border: 1px solid #295086;
    background: #ffffff;
    color: #295086;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }

  .delete-btn {
    min-width: 140px;
    height: 42px;
    border-radius: 999px;
    border: none;
    background: #295086;
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      background: #1e3a5f;
    }
  }
`;

export const InventoryPageWrapper = styled.div`
  background-color: #ffffff;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

export const InventoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 24px 32px;
  box-sizing: border-box;
`;

export const InventoryContentLayout = styled.div`
  display: flex;
  align-items: stretch;
  gap: 0;
  width: 100%;
  min-height: 520px;
  border: 1px solid #e8eef5;
  border-radius: 12px;
  overflow: hidden;
  background: #ffffff;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

export const InventoryTablePanel = styled.div`
  flex: 1;
  min-width: 0;
  min-height: 520px;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
`;

export const ProductDetailSidebar = styled.aside`
  width: 340px;
  flex-shrink: 0;
  border-left: 1px solid #d6e4f2;
  background: #ffffff;
  display: flex;
  flex-direction: column;

  @media (max-width: 992px) {
    width: 100%;
    border-left: none;
    border-top: 1px solid #d6e4f2;
  }
`;

export const ProductDetailHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px;
  background: #f5fbff;
  border-bottom: 1px solid #e8eef5;

  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    color: #295086;
  }

  .sidebar-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .sidebar-action-btn {
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
    border-radius: 6px;

    &:hover {
      background: #eaf3fb;
    }
  }
`;

export const ProductDetailBody = styled.div`
  padding: 18px 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
`;

export const ProductDetailField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .field-label {
    font-size: 14px;
    font-weight: 500;
    color: #99A1AF;
    line-height: 1.3;
  }

  .field-value {
    font-size: 15px;
    font-weight: 300;
    color: #295086;
    line-height: 1.45;
    word-break: break-word;
  }
`;

export const InventoryHeader = styled.div`
  width: 100%;
  background: #f5fbff;
  border-bottom: 1px solid #b8e3e4;
  padding: 18px 24px;
  margin-bottom: 0;
  box-sizing: border-box;
`;

export const InventoryHeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

export const InventoryTitle = styled.h1`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #295086;
  letter-spacing: 0.3px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;

  .title-main {
    text-transform: uppercase;
    font-weight: 700;
    color: #295086;
  }

  .title-count {
    font-size: 14px;
    font-weight: 500;
    color: #7a8da8;
    text-transform: none;
  }
`;

export const InventorySearchWrap = styled.div`
  position: relative;
  flex: 1;
  min-width: 240px;
  max-width: 420px;

  svg {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
`;

export const InventorySearchInput = styled.input`
  width: 100%;
  height: 42px;
  border-radius: 999px;
  border: 1px solid #d2dde9;
  background: #ffffff;
  padding: 0 16px 0 42px;
  font-size: 13px;
  color: #295086;
  outline: none;

  &::placeholder {
    color: #8fa0b8;
  }

  &:focus {
    border-color: #b7c9e0;
  }
`;

export const InventoryActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const FiltersButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: none;
  background: transparent;
  color: #295086;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.4px;
  cursor: pointer;
  padding: 8px 4px;
`;

export const InventoryTabButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 14px;
  border-radius: 100px;
  border: 1px solid #004D8733;
  background: ${(props) => (props.$active ? "#295086" : "transparent")};
  color: ${(props) => (props.$active ? "#ffffff" : "#295086")};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;

  svg {
    flex-shrink: 0;
  }

  &:hover {
    border-color: #295086;
  }
`;

export const InventoryTableWrap = styled.div`
  width: 100%;
  flex: 1;
  min-height: 420px;
  overflow-x: auto;
  background: #ffffff;
  display: flex;
  flex-direction: column;
`;

export const InventoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;

  thead th {
    text-align: left;
    padding: 14px 16px;
    font-size: 14px;
    font-weight: 500;
    color: #295086;
    border-bottom: 1px solid #e8eef5;
    white-space: nowrap;
  }

  tbody td {
    padding: 14px 16px;
    font-size: 14px;
    font-weight: 400;
    color: #295086;
    border-bottom: 1px solid #eef3f8;
    vertical-align: middle;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;

export const ProductCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    background: #f3f7fb;
  }

  span {
    font-size: 12px;
    font-weight: 500;
    color: #295086;
  }
`;

export const BrandCell = styled.span`
  color: #7a8da8;
  font-weight: 400;
`;

export const StockCell = styled.span`
  font-weight: 400;
  color: ${(props) => (props.$alert ? "#E86D4D" : "#295086")};
`;

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 92px;
  height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 400;
  white-space: nowrap;

  ${(props) =>
    props.$variant === "in_stock" &&
    `

      background: #DFECF9;
      color: #295086CC;

    `}

  ${(props) =>
    props.$variant === "low_stock" &&
    `
      background: #FFE8E0;
      color: #E86D4D;
    `}

  ${(props) =>
    props.$variant === "out_of_stock" &&
    `
      background: #FFE4E4;
      color: #D64545;
    `}
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  .action-icon-btn {
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 8px;
    background: #ffffff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;

    &:hover {
      background: #f5f9ff;
    }
  }
`;

export const ActionIconBtn = styled.button`
  width: 36px;
  height: 36px;
  border: 1px solid #cfe0f2;
  border-radius: 8px;
  background: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;

  &:hover {
    background: #f5f9ff;
  }
`;

export const EmptyInventory = styled.div`
  flex: 1;
  width: 100%;
  min-height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 20px;
  text-align: center;
  color: #8fa0b8;
  font-size: 14px;
  font-weight: 500;
`;

export const CategoriesPlaceholder = styled.div`
  border: 1px dashed #d2dde9;
  border-radius: 12px;
  padding: 48px 24px;
  text-align: center;
  color: #8fa0b8;
  font-size: 14px;
`;

export const AddProductModalHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 48px 8px;
  background: #ffffff;

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
    color: #295086;
    text-align: center;
  }

  .close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    border: none;
    background: transparent;
    padding: 4px;
    cursor: pointer;
    display: inline-flex;
    line-height: 0;
  }
`;

export const AddProductForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 15px;
`;

export const ImageUploadBox = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 140px;
  border: 2px dashed #007BFFB2;
  border-radius: 12px;
  background: #f8fbff;
  cursor: pointer;
  color: #5b9de6;
  font-size: 14px;
  font-weight: 500;
  overflow: hidden;
  position: relative;

  input {
    display: none;
  }

  img.preview {
    width: 100%;
    height: 140px;
    object-fit: cover;
  }

  .upload-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    span {
      font-size: 12px;
      font-weight: 500;
      color: #007BFFB2;
    }
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$cols || "1fr 1fr"};
  gap: 12px;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  input,
  select,
  textarea {
    width: 100%;
    border: 1px solid #d2dde9;
    border-radius: 100px;
    background: #ffffff;
    color: #295086;
    font-size: 14px;
    outline: none;
    padding: 0 14px;
    height: 44px;

    &.textarea {
      border-radius: 10px;
    }

    &::placeholder {
      color: #295086;
    }

    &:focus {
      border-color: #b7c9e0;
    }
  }

  textarea {
    height: 96px;
    padding: 12px 14px;
    resize: vertical;
  }

  select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%29295086' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 36px;

    &:disabled {
      cursor: not-allowed;
      background-color: #f3f6fa;
      color: #8fa0b8;
      opacity: 1;
    }
  }

  input[type="number"] {
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  .error {
    color: #DC3545;
    font-size: 12px;
    margin: 0;
    padding-left: 15px;
  }
`;

export const AddProductFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 8px;

  .cancel-btn {
    min-width: 120px;
    height: 42px;
    border-radius: 999px;
    border: 1px solid #295086;
    background: #ffffff;
    color: #295086;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }

  .submit-btn {
    min-width: 140px;
    height: 42px;
    border-radius: 999px;
    border: none;
    background: #295086;
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;

    &:disabled {
      opacity: 0.7;
    }
  }
`;

export const LogInventoryTypeToggle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 4px;

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 48px;
    border-radius: 999px;
    border: 1px solid #295086;
    background: #ffffff;
    color: #295086;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;

    svg {
      flex-shrink: 0;
    }

    &.active {
      background: #295086;
      color: #ffffff;
      border-color: #295086;
    }

    &:hover:not(.active) {
      background: #f5fbff;
    }
  }
`;

export const HistoryFilterSelect = styled.select`
  height: 40px;
  min-width: 120px;
  padding: 0 36px 0 14px;
  border-radius: 999px;
  border: 1px solid #004d8733;
  background: #ffffff;
  color: #295086;
  font-size: 12px;
  font-weight: 500;
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%29295086' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;

  &:focus {
    border-color: #295086;
  }
`;

export const HistoryPrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 16px;
  border-radius: 100px;
  border: 1px solid #295086;
  background: #295086;
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;

  svg {
    flex-shrink: 0;
  }

  &:hover {
    background: #1f3f6a;
    border-color: #1f3f6a;
  }
`;

export const HistoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 980px;

  thead th {
    text-align: left;
    padding: 14px 20px;
    font-size: 14px;
    font-weight: 500;
    color: #295086;
    border-bottom: 1px solid #e8eef5;
    white-space: nowrap;
    background: #ffffff;
  }

  tbody td {
    padding: 18px 20px;
    font-size: 14px;
    font-weight: 400;
    color: #295086;
    border-bottom: 1px solid #eef3f8;
    vertical-align: middle;
    background: #ffffff;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;

export const HistoryDateCell = styled.span`
  color: #295086;
  font-size: 12px;
  font-weight: 400;
  white-space: nowrap;
`;

export const HistoryTypeBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 64px;
  height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;

  ${(props) =>
    props.$type === "out"
      ? `
    background: #fdecec;
    color: #d64545;
  `
      : `
    background: #e8f7ef;
    color: #2d9d78;
  `}

  svg {
    flex-shrink: 0;
  }
`;

export const HistoryQtyCell = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${(props) => (props.$positive ? "#2d9d78" : "#d64545")};
`;

export const HistoryNotesCell = styled.span`
  color: #295086;
  font-size: 12px;
  font-weight: 400;
`;

export const HistoryMutedCell = styled.span`
  color: #295086;
  font-size: 12px;
  font-weight: 400;
`;

export const HistoryProductName = styled.span`
  color: #295086;
  font-size: 12px;
  font-weight: 500;
`;

export const HistoryRow = styled.tr`
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover td {
    background: #f5fbff !important;
  }

  ${(props) =>
    props.$active &&
    `
    td {
      background: #f5fbff !important;
    }
  `}
`;

export const InventoryHistoryCard = styled.div`
  width: 100%;
  border: 1px solid #e8eef5;
  border-radius: 12px;
  background: #ffffff;
  overflow: hidden;
`;

export const InventoryHistoryHeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding: 16px 20px;
  background: #f5fbff;
  border-bottom: 1px solid #b8e3e4;

  h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 700;
    color: #295086;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    white-space: nowrap;
  }
`;

export const InventoryDetailPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const InventoryDetailTopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

export const InventoryDetailBackBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: transparent;
  color: #295086;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;

  svg {
    flex-shrink: 0;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const InventoryDetailActions = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;
  margin-left: auto;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    justify-content: flex-end;
  }
`;

export const ManageStockButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 16px;
  border-radius: 100px;
  border: 1px solid #295086;
  background: #295086;
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;

  svg {
    flex-shrink: 0;
  }

  &:hover {
    background: #1f3f6a;
  }
`;

export const InventoryDetailIconBtn = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  /* border-radius: 10px; */
  background: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;

  &:hover {
    background: #f5f9ff;
  }
`;

export const InventoryDetailCard = styled.div`
  border: 1px solid #e8eef5;
  border-radius: 12px;
  background: #ffffff;
  overflow: hidden;
`;

export const InventoryDetailInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 24px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const InventoryDetailImage = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 16px;
  overflow: hidden;
  background: #f3f7fb;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const InventoryDetailMeta = styled.div`
  flex: 1;
  min-width: 240px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  .detail-category {
    font-size: 12px;
    font-weight: 400;
    color: #295086;
  }

  .detail-name {
    margin: 0;
    font-size: 30px;
    font-weight: 500;
    color: #295086;
    line-height: 1.2;
  }

  .detail-brand {
    font-size: 16px;
    font-weight: 400;
    color: #295086;
  }

  .detail-sku {
    font-size: 12px;
    font-weight: 400;
    color: #295086;
  }

  .detail-description {
    margin: 8px 0 0;
    font-size: 16px;
    font-weight: 400;
    color: #295086;
    line-height: 1.4;
    max-width: 640px;
  }
`;

export const InventoryDetailMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(120px, 1fr));
  gap: 16px;
  padding: 0 24px 24px;
  border-bottom: 1px solid #e8eef5;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const InventoryDetailMetric = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .metric-label {
    font-size: 12px;
    font-weight: 400;
    color: #295086;
  }

  .metric-value {
    font-size: 22px;
    font-weight: 700;
    color: #295086;
  }
`;

export const InventoryDetailHistoryHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background: #f5fbff;
  border-top: 1px solid #e8eef5;
  border-bottom: 1px solid #b8e3e4;

  .history-header-left {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 700;
    color: #295086;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    white-space: nowrap;
  }
`;

export const InventoryDetailTotals = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;

  .total-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
  }

  .total-in {
    color: #2d9d78;
  }

  .total-out {
    color: #d64545;
  }
`;
