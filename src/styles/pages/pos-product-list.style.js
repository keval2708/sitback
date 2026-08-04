"use client";

import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";

export const PosCheckoutModalGlobalStyles = () => (
  <Global
    styles={css`
      .modal.sitback-pos-checkout-modal {
        background: rgba(41, 80, 134, 0.28);

        .modal-dialog {
          max-width: 420px;
          width: calc(100% - 24px);
          margin: 1.75rem auto;
        }

        .modal-content {
          background: #ffffff;
          border: none;
          border-radius: 20px;
          box-shadow: 0 16px 40px rgba(41, 80, 134, 0.18);
          overflow: hidden;
        }

        .modal-body {
          padding: 8px 24px 4px;
          background: #ffffff;
        }
      }

      .sitback-pos-client-dropdown {
        scrollbar-width: thin !important;
        scrollbar-color: #8a8a8f #e9dede !important;

        &::-webkit-scrollbar {
          width: 8px !important;
          height: 8px !important;
        }

        &::-webkit-scrollbar-track {
          background: #e9dede !important;
          border-radius: 8px;
        }

        &::-webkit-scrollbar-thumb {
          background: #8a8a8f !important;
          border-radius: 8px;
        }

        &::-webkit-scrollbar-button {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }

        &::-webkit-scrollbar-corner {
          background: transparent !important;
        }

        @media (prefers-color-scheme: dark) {
          scrollbar-color: #8a8a8f #e9dede !important;

          &::-webkit-scrollbar {
            width: 8px !important;
            height: 8px !important;
          }

          &::-webkit-scrollbar-track {
            background: #e9dede !important;
            border-radius: 8px;
          }

          &::-webkit-scrollbar-thumb {
            background: #8a8a8f !important;
            border-radius: 8px;
          }

          &::-webkit-scrollbar-button {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
          }
        }
      }
    `}
  />
);

export const PageWrapper = styled.div`
  background-color: #ffffff;
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
  background-color: #ffffff;
  box-sizing: border-box;
`;

export const HeaderSection = styled.div`
  background: #f5fbff;
  padding: 20px 24px;
  border-bottom: 1px solid #d2e3f0;
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
  gap: 24px;
  flex-wrap: wrap;
`;

export const PageTitle = styled.h1`
  font-size: 16px;
  font-weight: 600;
  color: #0a3a60;
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
  border: 1px solid #c8d7e6;
  font-size: 13px;
  outline: none;
  background-color: #ffffff;
  color: #0a3a60;
  transition: border-color 0.2s, box-shadow 0.2s;
  &::placeholder {
    color: #7a869a;
  }
  &:focus {
    border-color: #004b87;
    box-shadow: 0 0 0 2px rgba(0, 75, 135, 0.15);
  }
`;

export const SearchIconWrapper = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #7a869a;
  display: flex;
  align-items: center;
  pointer-events: none;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

export const TabGroupContainer = styled.div`
  display: inline-flex;
  align-items: center;
  background: #ffffff;
  border: 1px solid #c8d7e6;
  border-radius: 24px;
  gap: 2px;
`;

export const TabButton = styled.button`
  padding: 6px 18px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &.active {
    background-color: #004b87;
    color: #ffffff;
    font-size: 13px;
    box-shadow: 0 2px 4px rgba(0, 75, 135, 0.2);
  }

  &.inactive {
    background-color: transparent;
    color: #004b87;
    &:hover {
      background-color: #f0f6ff;
    }
  }
`;

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;

  &.secondary {
    background-color: #ffffff;
    color: #004b87;
    border: 1px solid #c8d7e6;
    &:hover {
      background-color: #edf5fc;
      border-color: #004b87;
    }
  }

  &.primary {
    background-color: #004b87;
    color: #ffffff;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 75, 135, 0.2);
    &:hover {
      background-color: #003662;
      transform: translateY(-1px);
    }
  }

  &.danger {
    background-color: #ffffff;
    color: #e5484d;
    border: 1px solid #ffcdd2;
    &:hover {
      background-color: #ffebee;
      border-color: #e5484d;
    }
  }
`;

export const ListLayoutWrapper = styled.div`
  display: flex;
  align-items: stretch;
  gap: 0;
  width: 100%;
`;

export const ListMainArea = styled.div`
  flex: 1;
  min-width: 0;
  padding: 0 16px 20px;
  transition: flex 0.2s ease;
`;

export const ListSidebarWrap = styled.div`
  flex-shrink: 0;
  align-self: stretch;
  position: sticky;
  top: 0;
  height: fit-content;
  padding: 0;
  border: 1px solid #e6eef7;
  border-top: none;
  background: #ffffff;
  max-width: 394px;
  width: 100%;
  &>aside {
    height: 715px;
  }
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  width: 100%;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const ProductCardBox = styled.div`
  background: #ffffff;
  border-radius: 14px;
  border: 1px solid #e2ecf5;
  padding: 14px;
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);

  &:hover {
    border-color: #004b87;
    box-shadow: 0 8px 24px rgba(0, 75, 135, 0.08);
    /* transform: translateY(-2px); */
  }

  &.active {
    border-color: #004b87;
    box-shadow: 0 0 0 2px rgba(0, 75, 135, 0.2), 0 8px 24px rgba(0, 75, 135, 0.08);
    background: #ffffff;
  }

  .product_img_wrap {
    width: 100%;
    aspect-ratio: 1 / 1;
    background: #f8fafc;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-bottom: 12px;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .product_info {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;

    .product_sku {
      font-size: 12px;
      font-weight: 400;
      color: #295086;
      line-height: 1.3;
    }

    .product_name {
      font-size: 14px;
      font-weight: 500;
      color: #004b87;
      line-height: 1.3;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      min-height: 42px;
    }

    .product_price_row {
      display: flex;
      align-items: baseline;
      gap: 8px;
      margin-top: 2px;
      margin-bottom: 8px;

      .product_price {
        font-size: 18px;
        font-weight: 700;
        color: #004b87;
      }

      .product_stock {
        font-size: 12px;
        font-weight: 500;
        color: #99A1AF;
      }
    }
  }
`;

export const SidebarContainer = styled.aside`
  width: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  height: 715px;
  max-height: 715px;
  background: #ffffff;
  border: none;
  border-radius: 0;
  overflow: hidden;
  box-shadow: none;

  &.current-order-sidebar {
    .order-count-badge {
      font-size: 12px;
      font-weight: 400;
      color: #004d87;
      background: #f3f7fb;
      border: 1px solid #e1ebf5;

      border-radius: 999px;
      padding: 4px 10px;
      line-height: 1;
      white-space: nowrap;
    }

    .order-empty-state {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 40px 24px;

      .order-empty-icon {
        width: 72px;
        height: 72px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 18px;
      }

      h4 {
        margin: 0 0 8px;
        font-size: 16px;
        font-weight: 700;
        color: #295086;
      }

      p {
        margin: 0;
        font-weight: 500;
        font-size: 12px;
        color: #295086;
      }
    }

    .order-items-list {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      padding: 8px 16px 16px;

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-track {
        background: #f3f7fb;
      }

      &::-webkit-scrollbar-thumb {
        background: #c5d5e6;
        border-radius: 8px;
      }
    }

    .order-item-row {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto auto auto;
      gap: 10px;
      align-items: center;
      padding: 14px 0;
      border-bottom: 1px solid #eef3f8;
    }

    .order-item-info {
      min-width: 0;
    }

    .order-item-name {
      font-size: 12px;
      font-weight: 600;
      color: #004b87;
      margin-bottom: 4px;
      line-height: 1.3;
    }

    .order-item-unit {
      font-size: 12px;
      font-weight: 300;
      color: #295086;
    }

    .order-item-qty {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .qty-btn {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      border: 1px solid #d7e3f0;
      background: #FFF;
      color: #004b87;
      font-size: 14px;
      font-weight: 400;
      line-height: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      cursor: pointer;
    }

    .qty-value {
      min-width: 14px;
      text-align: center;
      font-size: 12px;
      font-weight: 400;
      color: #295086;
    }

    .order-item-total {
      font-size: 12px;
      font-weight: 600;
      color: #295086;
      white-space: nowrap;
    }

    .order-item-remove {
      border: none;
      background: transparent;
      padding: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .order-subtotal-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 14px;

      span {
        font-size: 12px;
        font-weight: 600;
        color: #295086;
      }

      strong {
        font-size: 20px;
        font-weight: 600;
        color: #295086;
      }
    }

    .order-checkout-btn {
      width: 100%;
      height: 34px;
      border: none;
      border-radius: 999px;
      background: #1683ff;
      color: #ffffff;
      font-size: 12px;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 0.92;
      }
    }
  }
`;

export const SidebarHeader = styled.div`
  padding: 18px 16px;
  background: #f7fbff;
  border-bottom: 1px solid #e6eef7;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const SidebarTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #004d87;
`;

export const SidebarCloseBtn = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #295086;
  border-radius: 50%;
  transition: background 0.2s;

  &:hover {
    background: #e2eefc;
  }
`;

export const SidebarForm = styled.div`
  flex: 1 1 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  background: #ffffff;

  .sidebar_product_img_preview {
    width: 100%;
    height: 200px;
    background: #f8fafc;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border: 1px solid #e2e8f0;

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }

  .sidebar_product_title {
    font-size: 20px;
    font-weight: 700;
    color: #295086;
    margin: 0;
  }

  .sidebar_product_price {
    font-size: 22px;
    font-weight: 800;
    color: #004b87;
  }

  .sidebar_detail_row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #f1f5f9;
    font-size: 13.5px;

    .label {
      color: #64748b;
      font-weight: 500;
    }

    .value {
      color: #295086;
      font-weight: 600;
    }
  }

  .sidebar_description_box {
    margin-top: 8px;

    .desc_title {
      font-size: 13px;
      font-weight: 600;
      color: #64748b;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .desc_content {
      font-size: 14px;
      color: #334155;
      line-height: 1.5;
      background: #f8fafc;
      padding: 12px;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      white-space: pre-wrap;
    }
  }
`;

export const SidebarFooter = styled.div`
  padding: 16px;
  background: #FFF;
  border-top: 1px solid #e6eef7;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: auto;
`;

export const ActionButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

export const CategorySection = styled.div`
  padding: 16px 8px 12px 8px;
  background: #ffffff;
  display: flex;
  align-items: center;
`;

export const CategoryTabContainer = styled.div`
  display: inline-flex;
  align-items: center;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 30px;
  gap: 2px;
  max-width: 100%;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CategoryPill = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 24px;
  border-radius: 24px;
  font-size: 13.5px;
  font-weight: 600;
  border: none;
  background-color: ${props => (props.active ? "#004d87" : "#ffffff")};
  color: ${props => (props.active ? "#ffffff" : "#004d87")};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    color: ${props => (props.active ? "#ffffff" : "#003662")};
    background-color: ${props => (props.active ? "#004d87" : "rgba(0, 77, 135, 0.05)")};
  }
`;

export const AddCartButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  margin-top: auto;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  background-color: #004b87;
  color: #ffffff;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #003662;
    box-shadow: 0 4px 12px rgba(0, 75, 135, 0.25);
  }
`;

export const SidebarQuantityControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 10px 14px;
  margin-top: 8px;

  .qty_label {
    font-size: 13px;
    font-weight: 600;
    color: #295086;
  }

  .qty_actions {
    display: flex;
    align-items: center;
    gap: 10px;

    button {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 1px solid #cbd5e1;
      background: #ffffff;
      color: #004b87;
      font-size: 16px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.15s ease;

      &:hover {
        background: #004b87;
        color: #ffffff;
        border-color: #004b87;
      }
    }

    span {
      font-size: 15px;
      font-weight: 700;
      color: #0a3a60;
      min-width: 24px;
      text-align: center;
    }
  }
`;

export const CategoryTag = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #7a869a;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px dashed #dfe1e6;
  gap: 12px;
  font-size: 15px;
  margin-top: 16px;
`;

export const SoldHistoryContainer = styled.div`
  width: 100%;
  padding: 24px;
  background-color: #ffffff;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 16px 12px;
  }
`;

export const SoldHistoryTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  background: #ffffff;
`;

export const SoldHistoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  th {
    padding: 16px 20px;
    font-size: 14px;
    font-weight: 500;
    color: #295086;
    border-bottom: 1px solid #eef4f9;
    white-space: nowrap;

    &:last-child {
      text-align: right;
    }
  }

  td {
    padding: 18px 20px;
    font-size: 12px;
    color: #295086;
    border-bottom: 1px solid #eef4f9;
    vertical-align: top;
    font-weight: 700;

    &:last-child {
      text-align: right;
    }
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

export const CustomerName = styled.div`
  font-weight: 700;
  color: #004b87;
  font-size: 14px;
`;

export const CustomerPhone = styled.div`
  color: #295086CC;
  font-size: 12px;
  font-weight: 400;
`;

export const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ItemRow = styled.div`
  font-size: 12px;
  color: #295086;
  font-weight: 400;
`;

export const MoreItemsTag = styled.div`
  font-size: 12px;
  color: #7a869a;
  font-weight: 500;
  margin-top: 2px;
`;

export const PaymentBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #007BFF;
  font-size: 12px;
  font-weight: 400;

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const TransactionDate = styled.div`
  color: #295086CC;
  font-size: 12px;
  font-weight: 400;
  white-space: nowrap;
`;

export const TotalAmount = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #295086;
`;

export const CheckoutModalHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 48px 8px;
  border-bottom: none;
  background: #ffffff;

  h3 {
    margin: 0;
    font-size: 22px;
    font-weight: 700;
    color: #295086;
    text-align: center;
    line-height: 1.3;
  }

  .checkout-close-btn {
    position: absolute;
    top: 18px;
    right: 18px;
    border: none;
    background: transparent;
    padding: 4px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
  }
`;

export const CheckoutModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px 4px 4px;
  background: #ffffff;

  .checkout-error-text {
    color: #e86d4d;
    font-size: 12px;
    margin: 8px 0 0;
  }

  .checkout-empty-cards {
    margin: 0;
    color: #8fa0b8;
    font-size: 13px;
  }

  .checkout-client-search {
    input {
      height: 48px;
      border-radius: 999px;
      border: 1px solid #d9e2ef;
      background: #ffffff;
      color: #295086;
      font-size: 14px;
      padding: 0 52px 0 20px;
      box-shadow: none;

      &::placeholder {
        color: #8fa0b8;
      }

      &:focus {
        outline: none;
        border-color: #b7c9e0;
        box-shadow: none;
      }
    }

    button {
      right: 12px;
      width: 30px;
      height: 30px;
      background: #295086;
    }
  }

  .selected-client-chip {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 12px 16px;
    border-radius: 16px;
    background: #f5f9ff;
    border: 1px solid #d6e8ff;

    strong {
      color: #295086;
      font-size: 14px;
    }

    span {
      color: #8fa0b8;
      font-size: 12px;
    }
  }

  .payment-section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 10px;
  }

  .add-new-card-btn {
    border: none;
    background: none;
    color: #295086;
    font-weight: 600;
    text-decoration: underline;
    font-size: 13px;
    cursor: pointer;
    padding: 0;
    width: fit-content;
    white-space: nowrap;

    &:hover {
      color: #1e3a5f;
    }
  }
`;

export const CheckoutSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CheckoutSectionTitle = styled.h4`
  margin: 0 0 10px;
  font-size: 14px;
  font-weight: 600;
  color: #295086;
`;

export const CheckoutCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CheckoutCardOption = styled.div`
  border: 1px solid ${(props) => (props.$active ? "#295086" : "#d9e2ef")};
  border-radius: 16px;
  background: ${(props) => (props.$active ? "#f5f9ff" : "#ffffff")};
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s;

  label {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0;
    cursor: pointer;
    flex: 1;
  }

  input[type="radio"] {
    accent-color: #295086;
    width: 16px;
    height: 16px;
    margin: 0;
    cursor: pointer;
  }

  .card-meta {
    display: flex;
    flex-direction: column;
    gap: 2px;

    strong {
      color: #295086;
      font-size: 13px;
      text-transform: capitalize;
    }

    span {
      color: #8fa0b8;
      font-size: 12px;
    }
  }

  .default-badge {
    font-size: 10px;
    font-weight: 600;
    color: #295086;
    background: #e8f1ff;
    padding: 2px 8px;
    border-radius: 999px;
    white-space: nowrap;
  }
`;

export const OrderSummaryBox = styled.div`
  border: 1px solid #6CB5EC;
  border-radius: 14px;
  background: #F6FBFF;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const OrderSummaryTitle = styled.h4`
  margin: 0 0 2px;
  font-size: 15px;
  font-weight: 700;
  color: #295086;
`;

export const OrderSummaryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  span {
    color: #6b8ab8;
    font-size: 14px;
    font-weight: 400;
  }

  strong {
    color: #295086;
    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;
  }
`;

export const OrderSummarySubtotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 2px;
  padding-top: 14px;
  border-top: 1px solid #e8eef6;

  span {
    color: #295086;
    font-size: 15px;
    font-weight: 700;
  }

  strong {
    color: #295086;
    font-size: 18px;
    font-weight: 700;
  }
`;

export const CheckoutModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: stretch;
  padding: 8px 24px 28px;
  background: #ffffff;

  .checkout-pay-btn,
  .loading-btn-wrapper.checkout-pay-btn,
  button.checkout-pay-btn {
    width: 100%;
    border: none !important;
    background: #295086 !important;
    color: #fff !important;
    border-radius: 999px !important;
    min-height: 48px;
    padding: 0 18px;
    font-size: 15px;
    font-weight: 600;
    box-shadow: none !important;

    &:hover:not(:disabled),
    &:focus:not(:disabled) {
      background: #1e3a5f !important;
    }

    &:disabled {
      opacity: 0.7;
    }
  }
`;
