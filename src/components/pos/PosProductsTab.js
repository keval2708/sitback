"use client";

import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  ActionButtons,
  BrandCell,
  EmptyInventory,
  InventoryContentLayout,
  InventoryTabButton,
  InventoryTable,
  InventoryTablePanel,
  InventoryTableWrap,
  ProductCell,
  ProductDetailBody,
  ProductDetailField,
  ProductDetailHeader,
  ProductDetailSidebar,
  ProductTableRowSkeleton,
  StatusBadge,
  StockCell,
} from "@/styles/pages/pos-inventory.style";

const SKELETON_BASE = "#e8eef5";
const SKELETON_HIGHLIGHT = "#f7fafc";
const PRODUCT_SKELETON_ROWS = 8;

const STATUS_MAP = {
  in_stock: { key: "in_stock", label: "In Stock", alert: false },
  instock: { key: "in_stock", label: "In Stock", alert: false },
  "in stock": { key: "in_stock", label: "In Stock", alert: false },
  low_stock: { key: "low_stock", label: "Low Stock", alert: true },
  lowstock: { key: "low_stock", label: "Low Stock", alert: true },
  "low stock": { key: "low_stock", label: "Low Stock", alert: true },
  out_of_stock: { key: "out_of_stock", label: "Out of Stock", alert: true },
  outofstock: { key: "out_of_stock", label: "Out of Stock", alert: true },
  "out of stock": { key: "out_of_stock", label: "Out of Stock", alert: true },
};

const getRemainStock = (product = {}) =>
  Number(
    product.remainStock ??
      product.remainstock ??
      product.remainingStock ??
      product.stock ??
      product.quantity ??
      0
  );

const getStockStatus = (product = {}) => {
  const rawStatus = String(product.status ?? product.stockStatus ?? "")
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");

  const compactStatus = rawStatus.replace(/\s+/g, "");
  const mapped =
    STATUS_MAP[rawStatus] ||
    STATUS_MAP[compactStatus] ||
    STATUS_MAP[String(product.status || "").trim()];

  if (mapped) return mapped;

  const stock = getRemainStock(product);
  const lowAt = Number(product.lowStockAt ?? 5);
  if (stock <= 0) return STATUS_MAP.out_of_stock;
  if (stock <= lowAt) return STATUS_MAP.low_stock;
  return STATUS_MAP.in_stock;
};

const yesNo = (value) => (value ? "Yes" : "No");

const ProductTableSkeleton = () => (
  <InventoryTable>
    <thead>
      <tr>
        <th>Product Name</th>
        <th>Brand</th>
        <th>Price</th>
        <th>Stock</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {Array.from({ length: PRODUCT_SKELETON_ROWS }).map((_, index) => (
        <tr key={`product-skeleton-${index}`}>
          <td>
            <ProductTableRowSkeleton>
              <div className="skeleton-product">
                <Skeleton
                  circle
                  width={36}
                  height={36}
                  baseColor={SKELETON_BASE}
                  highlightColor={SKELETON_HIGHLIGHT}
                />
                <Skeleton
                  width={140}
                  height={14}
                  borderRadius={4}
                  baseColor={SKELETON_BASE}
                  highlightColor={SKELETON_HIGHLIGHT}
                />
              </div>
            </ProductTableRowSkeleton>
          </td>
          <td>
            <Skeleton
              width={90}
              height={14}
              borderRadius={4}
              baseColor={SKELETON_BASE}
              highlightColor={SKELETON_HIGHLIGHT}
            />
          </td>
          <td>
            <Skeleton
              width={60}
              height={14}
              borderRadius={4}
              baseColor={SKELETON_BASE}
              highlightColor={SKELETON_HIGHLIGHT}
            />
          </td>
          <td>
            <Skeleton
              width={40}
              height={14}
              borderRadius={4}
              baseColor={SKELETON_BASE}
              highlightColor={SKELETON_HIGHLIGHT}
            />
          </td>
          <td>
            <Skeleton
              width={92}
              height={28}
              borderRadius={999}
              baseColor={SKELETON_BASE}
              highlightColor={SKELETON_HIGHLIGHT}
            />
          </td>
          <td>
            <ProductTableRowSkeleton>
              <div className="skeleton-actions">
                <Skeleton
                  width={36}
                  height={36}
                  borderRadius={8}
                  baseColor={SKELETON_BASE}
                  highlightColor={SKELETON_HIGHLIGHT}
                />
                <Skeleton
                  width={36}
                  height={36}
                  borderRadius={8}
                  baseColor={SKELETON_BASE}
                  highlightColor={SKELETON_HIGHLIGHT}
                />
                <Skeleton
                  width={36}
                  height={36}
                  borderRadius={8}
                  baseColor={SKELETON_BASE}
                  highlightColor={SKELETON_HIGHLIGHT}
                />
              </div>
            </ProductTableRowSkeleton>
          </td>
        </tr>
      ))}
    </tbody>
  </InventoryTable>
);

export default function PosProductsTab({
  products = [],
  loading = false,
  hasMore = false,
  onLoadMore,
  activeViewProduct = null,
  onAddProduct,
  onViewProduct,
  onEditProduct,
  onDeleteProduct,
  onCloseSidebar,
}) {
  return (
    <InventoryContentLayout>
      <InventoryTablePanel>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "16px 20px 8px",
          }}
        >
          <InventoryTabButton
            type="button"
            style={{
              background: "#295086",
              color: "#ffffff",
              borderColor: "#295086",
            }}
            onClick={onAddProduct}
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Add Product
          </InventoryTabButton>
        </div>

        <InventoryTableWrap>
          {loading && products.length === 0 ? (
            <ProductTableSkeleton />
          ) : products.length === 0 ? (
            <EmptyInventory>Start building your inventory by adding products.</EmptyInventory>
          ) : (
            <InfiniteScroll
              className="pageScroll"
              dataLength={products.length}
              next={() => onLoadMore?.()}
              hasMore={hasMore}
              loader={<div style={{ visibility: "hidden" }}>done</div>}
            >
              <InventoryTable>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => {
                    const status = getStockStatus(product);
                    const remainStock = getRemainStock(product);
                    const isActive = activeViewProduct?.id === product.id;
                    return (
                      <tr
                        key={product.id}
                        style={isActive ? { background: "#f5fbff" } : undefined}
                      >
                        <td>
                          <ProductCell>
                            <img
                              src={product.image || "/images/productimg.svg"}
                              alt={product.name}
                            />
                            <span>{product.name}</span>
                          </ProductCell>
                        </td>
                        <td>
                          <BrandCell>
                            {typeof product.brand === "object"
                              ? product.brand?.name || "-"
                              : product.brand || "-"}
                          </BrandCell>
                        </td>
                        <td>${Number(product.price || 0).toFixed(2)}</td>
                        <td>
                          <StockCell $alert={status.alert}>{remainStock}</StockCell>
                        </td>
                        <td>
                          <StatusBadge $variant={status.key}>{status.label}</StatusBadge>
                        </td>
                        <td>
                          <ActionButtons>
                            <button
                              type="button"
                              className="action-icon-btn view-btn"
                              aria-label="View product"
                              title="View"
                              onClick={() => onViewProduct?.(product)}
                            >
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 4.16669C5.83333 4.16669 2.275 6.75835 0.833336 10C2.275 13.2417 5.83333 15.8334 10 15.8334C14.1667 15.8334 17.725 13.2417 19.1667 10C17.725 6.75835 14.1667 4.16669 10 4.16669Z" stroke="#295086" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#295086" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>

                            <button
                              type="button"
                              className="action-icon-btn edit-btn"
                              aria-label="Edit product"
                              title="Edit"
                              onClick={() => onEditProduct?.(product)}
                            >
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 2.5H4.16667C3.72464 2.5 3.30072 2.67559 2.98816 2.98816C2.67559 3.30072 2.5 3.72464 2.5 4.16667V15.8333C2.5 16.2754 2.67559 16.6993 2.98816 17.0118C3.30072 17.3244 3.72464 17.5 4.16667 17.5H15.8333C16.2754 17.5 16.6993 17.3244 17.0118 17.0118C17.3244 16.6993 17.5 16.2754 17.5 15.8333V10" stroke="#295086" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M15.3125 2.18769C15.644 1.85617 16.0937 1.66992 16.5625 1.66992C17.0313 1.66992 17.481 1.85617 17.8125 2.18769C18.144 2.51921 18.3303 2.96885 18.3303 3.43769C18.3303 3.90653 18.144 4.35617 17.8125 4.68769L10.3017 12.1994C10.1038 12.3971 9.85933 12.5418 9.59083 12.6202L7.19666 13.3202C7.12496 13.3411 7.04895 13.3424 6.97659 13.3238C6.90423 13.3053 6.83819 13.2676 6.78537 13.2148C6.73255 13.162 6.6949 13.096 6.67637 13.0236C6.65783 12.9512 6.65908 12.8752 6.68 12.8035L7.38 10.4094C7.45877 10.1411 7.60378 9.8969 7.80166 9.69936L15.3125 2.18769Z" stroke="#295086" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>

                            <button
                              type="button"
                              className="action-icon-btn delete-btn"
                              aria-label="Delete product"
                              title="Delete"
                              onClick={() => onDeleteProduct?.(product)}
                            >
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.83332 17.5C5.37498 17.5 4.98276 17.3369 4.65665 17.0108C4.33054 16.6847 4.1672 16.2922 4.16665 15.8333V5C3.93054 5 3.73276 4.92 3.57332 4.76C3.41387 4.6 3.33387 4.40222 3.33332 4.16667C3.33276 3.93111 3.41276 3.73333 3.57332 3.57333C3.73387 3.41333 3.93165 3.33333 4.16665 3.33333H7.49998C7.49998 3.09722 7.57998 2.89944 7.73998 2.74C7.89998 2.58056 8.09776 2.50056 8.33332 2.5H11.6666C11.9028 2.5 12.1008 2.58 12.2608 2.74C12.4208 2.9 12.5005 3.09778 12.5 3.33333H15.8333C16.0694 3.33333 16.2675 3.41333 16.4275 3.57333C16.5875 3.73333 16.6672 3.93111 16.6666 4.16667C16.6661 4.40222 16.5861 4.60028 16.4266 4.76083C16.2672 4.92139 16.0694 5.00111 15.8333 5V15.8333C15.8333 16.2917 15.6703 16.6842 15.3441 17.0108C15.018 17.3375 14.6255 17.5006 14.1666 17.5H5.83332ZM14.1666 5H5.83332V15.8333H14.1666V5ZM8.92748 13.9275C9.08693 13.7675 9.16665 13.5694 9.16665 13.3333V7.5C9.16665 7.26389 9.08665 7.06611 8.92665 6.90667C8.76665 6.74722 8.56887 6.66722 8.33332 6.66667C8.09776 6.66611 7.89998 6.74611 7.73998 6.90667C7.57998 7.06722 7.49998 7.265 7.49998 7.5V13.3333C7.49998 13.5694 7.57998 13.7675 7.73998 13.9275C7.89998 14.0875 8.09776 14.1672 8.33332 14.1667C8.56887 14.1661 8.76693 14.0869 8.92748 13.9275ZM12.2608 13.9267C12.4203 13.7678 12.5 13.57 12.5 13.3333V7.5C12.5 7.26389 12.42 7.06611 12.26 6.90667C12.1 6.74722 11.9022 6.66722 11.6666 6.66667C11.4311 6.66611 11.2333 6.74611 11.0733 6.90667C10.9133 7.06722 10.8333 7.265 10.8333 7.5V13.3333C10.8333 13.5694 10.9133 13.7675 11.0733 13.9275C11.2333 14.0875 11.4311 14.1672 11.6666 14.1667C11.9022 14.1661 12.1003 14.0861 12.2608 13.9267Z" fill="#295086"/>
                              </svg>
                            </button>
                          </ActionButtons>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </InventoryTable>
            </InfiniteScroll>
          )}
        </InventoryTableWrap>
      </InventoryTablePanel>

      {activeViewProduct && (
        <ProductDetailSidebar>
          <ProductDetailHeader>
            <h3>Product</h3>
            <div className="sidebar-actions">
              <button
                type="button"
                className="sidebar-action-btn"
                aria-label="Edit product"
                title="Edit"
                onClick={() => onEditProduct?.(activeViewProduct)}
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2.5H4.16667C3.72464 2.5 3.30072 2.67559 2.98816 2.98816C2.67559 3.30072 2.5 3.72464 2.5 4.16667V15.8333C2.5 16.2754 2.67559 16.6993 2.98816 17.0118C3.30072 17.3244 3.72464 17.5 4.16667 17.5H15.8333C16.2754 17.5 16.6993 17.3244 17.0118 17.0118C17.3244 16.6993 17.5 16.2754 17.5 15.8333V10" stroke="#295086" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15.3125 2.18769C15.644 1.85617 16.0937 1.66992 16.5625 1.66992C17.0313 1.66992 17.481 1.85617 17.8125 2.18769C18.144 2.51921 18.3303 2.96885 18.3303 3.43769C18.3303 3.90653 18.144 4.35617 17.8125 4.68769L10.3017 12.1994C10.1038 12.3971 9.85933 12.5418 9.59083 12.6202L7.19666 13.3202C7.12496 13.3411 7.04895 13.3424 6.97659 13.3238C6.90423 13.3053 6.83819 13.2676 6.78537 13.2148C6.73255 13.162 6.6949 13.096 6.67637 13.0236C6.65783 12.9512 6.65908 12.8752 6.68 12.8035L7.38 10.4094C7.45877 10.1411 7.60378 9.8969 7.80166 9.69936L15.3125 2.18769Z" stroke="#295086" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                type="button"
                className="sidebar-action-btn"
                aria-label="Delete product"
                title="Delete"
                onClick={() => onDeleteProduct?.(activeViewProduct)}
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.83332 17.5C5.37498 17.5 4.98276 17.3369 4.65665 17.0108C4.33054 16.6847 4.1672 16.2922 4.16665 15.8333V5C3.93054 5 3.73276 4.92 3.57332 4.76C3.41387 4.6 3.33387 4.40222 3.33332 4.16667C3.33276 3.93111 3.41276 3.73333 3.57332 3.57333C3.73387 3.41333 3.93165 3.33333 4.16665 3.33333H7.49998C7.49998 3.09722 7.57998 2.89944 7.73998 2.74C7.89998 2.58056 8.09776 2.50056 8.33332 2.5H11.6666C11.9028 2.5 12.1008 2.58 12.2608 2.74C12.4208 2.9 12.5005 3.09778 12.5 3.33333H15.8333C16.0694 3.33333 16.2675 3.41333 16.4275 3.57333C16.5875 3.73333 16.6672 3.93111 16.6666 4.16667C16.6661 4.40222 16.5861 4.60028 16.4266 4.76083C16.2672 4.92139 16.0694 5.00111 15.8333 5V15.8333C15.8333 16.2917 15.6703 16.6842 15.3441 17.0108C15.018 17.3375 14.6255 17.5006 14.1666 17.5H5.83332ZM14.1666 5H5.83332V15.8333H14.1666V5ZM8.92748 13.9275C9.08693 13.7675 9.16665 13.5694 9.16665 13.3333V7.5C9.16665 7.26389 9.08665 7.06611 8.92665 6.90667C8.76665 6.74722 8.56887 6.66722 8.33332 6.66667C8.09776 6.66611 7.89998 6.74611 7.73998 6.90667C7.57998 7.06722 7.49998 7.265 7.49998 7.5V13.3333C7.49998 13.5694 7.57998 13.7675 7.73998 13.9275C7.89998 14.0875 8.09776 14.1672 8.33332 14.1667C8.56887 14.1661 8.76693 14.0869 8.92748 13.9275ZM12.2608 13.9267C12.4203 13.7678 12.5 13.57 12.5 13.3333V7.5C12.5 7.26389 12.42 7.06611 12.26 6.90667C12.1 6.74722 11.9022 6.66722 11.6666 6.66667C11.4311 6.66611 11.2333 6.74611 11.0733 6.90667C10.9133 7.06722 10.8333 7.265 10.8333 7.5V13.3333C10.8333 13.5694 10.9133 13.7675 11.0733 13.9275C11.2333 14.0875 11.4311 14.1672 11.6666 14.1667C11.9022 14.1661 12.1003 14.0861 12.2608 13.9267Z" fill="#295086"/>
                </svg>
              </button>
              <button
                type="button"
                className="sidebar-action-btn sidebar-close-btn"
                aria-label="Close sidebar"
                title="Close"
                onClick={onCloseSidebar}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 1L1 13M1 1L13 13" stroke="#E86D4D" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </ProductDetailHeader>

          <ProductDetailBody>
            <ProductDetailField>
              <span className="field-label">Name</span>
              <span className="field-value">{activeViewProduct.name || "-"}</span>
            </ProductDetailField>

            <ProductDetailField>
              <span className="field-label">Description</span>
              <span className="field-value">
                {activeViewProduct.description || "No description available."}
              </span>
            </ProductDetailField>

            <ProductDetailField>
              <span className="field-label">Brand Name</span>
              <span className="field-value">
                {typeof activeViewProduct.brand === "object"
                  ? activeViewProduct.brand?.name || "-"
                  : activeViewProduct.brand || "-"}
              </span>
            </ProductDetailField>

            <ProductDetailField>
              <span className="field-label">Category</span>
              <span className="field-value">
                {typeof activeViewProduct.category === "object"
                  ? activeViewProduct.category?.name
                  : activeViewProduct.category ||
                    (typeof activeViewProduct.brand === "object"
                      ? activeViewProduct.brand?.name
                      : activeViewProduct.brand) ||
                    "-"}
              </span>
            </ProductDetailField>

            <ProductDetailField>
              <span className="field-label">Unit Price</span>
              <span className="field-value">
                ${Number(activeViewProduct.price || 0).toFixed(2)}
              </span>
            </ProductDetailField>

            {/* <ProductDetailField>
              <span className="field-label">Charge Tax</span>
              <span className="field-value">{yesNo(activeViewProduct.chargeTax)}</span>
            </ProductDetailField> */}

            <ProductDetailField>
              <span className="field-label">Purchase Cost</span>
              <span className="field-value">
                ${Number(activeViewProduct.costPrice || 0).toFixed(2)}
              </span>
            </ProductDetailField>

            <ProductDetailField>
              <span className="field-label">Assign staff to sale</span>
              <span className="field-value">{yesNo(activeViewProduct.assignStaffToSale)}</span>
            </ProductDetailField>

            <ProductDetailField>
              <span className="field-label">Automatically add to new sales</span>
              <span className="field-value">{yesNo(activeViewProduct.autoAddToNewSales)}</span>
            </ProductDetailField>

            <ProductDetailField>
              <span className="field-label">Stocks</span>
              <span className="field-value">
                {getRemainStock(activeViewProduct)}{" "}
                {activeViewProduct.unit || "units"}
              </span>
            </ProductDetailField>

            <ProductDetailField>
              <span className="field-label">Status</span>
              <span className="field-value">
                <StatusBadge $variant={getStockStatus(activeViewProduct).key}>
                  {getStockStatus(activeViewProduct).label}
                </StatusBadge>
              </span>
            </ProductDetailField>
          </ProductDetailBody>
        </ProductDetailSidebar>
      )}
    </InventoryContentLayout>
  );
}
