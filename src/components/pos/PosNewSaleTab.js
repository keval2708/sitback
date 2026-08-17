"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";
import PosCheckoutModal from "@/components/pos/PosCheckoutModal";
import { API_ROUTER } from "@/services/apiRouter";
import {
  AddCartButton,
  CategoryPill,
  CategoryScrollBtn,
  CategorySection,
  CategoryTabContainer,
  EmptyState,
  ListLayoutWrapper,
  ListMainArea,
  ListSidebarWrap,
  ProductCardBox,
  ProductGrid,
  SidebarContainer,
  SidebarFooter,
  SidebarHeader,
  SidebarTitle,
} from "@/styles/pages/pos-product-list.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS } from "@/utils/constants";

const PAGE_LIMIT = 12;

const normalizeProduct = (item = {}) => {
  const brand = item.brand;
  return {
    id: item.id ?? item.productId ?? item._id,
    name: item.name ?? item.productName ?? "",
    sku: item.sku ?? item.skuCode ?? "",
    price: Number(item.retailPrice ?? item.price ?? 0),
    image: item.image ?? item.imageUrl ?? item.thumb_image ?? "/images/productimg.svg",
    stock: Number(item.remainstock ?? item.stock ?? item.quantity ?? 0),
    brand: typeof brand === "object" ? brand?.name ?? "" : brand ?? "",
    categoryIds: Array.isArray(item.categoryIds) ? item.categoryIds : [],
  };
};

const extractRows = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.list)) return payload.list;
  if (Array.isArray(payload?.products)) return payload.products;
  if (Array.isArray(payload?.rows)) return payload.rows;
  return [];
};

export default function PosNewSaleTab({ searchProduct = "" }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const categoryScrollRef = useRef(null);

  const updateCategoryScrollState = useCallback(() => {
    const el = categoryScrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
  }, []);

  const scrollCategories = useCallback((direction) => {
    const el = categoryScrollRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.6, 180);
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  }, []);

  useEffect(() => {
    updateCategoryScrollState();
    const el = categoryScrollRef.current;
    if (!el) return undefined;

    const onScroll = () => updateCategoryScrollState();
    el.addEventListener("scroll", onScroll, { passive: true });

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => updateCategoryScrollState())
        : null;
    resizeObserver?.observe(el);

    window.addEventListener("resize", updateCategoryScrollState);
    return () => {
      el.removeEventListener("scroll", onScroll);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateCategoryScrollState);
    };
  }, [categories, updateCategoryScrollState]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosApiCall.get(API_ROUTER?.POS_CATEGORY_LIST);
        console.log("category", res);
        if (!res?.data?.status) return;

        const payload = res?.data?.data;
        const rows = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.list)
            ? payload.list
            : Array.isArray(payload?.categories)
              ? payload.categories
              : Array.isArray(payload?.data)
                ? payload.data
                : [];

        const mapped = rows
          .map((c) => ({
            id: c.id ?? c._id ?? c.categoryId,
            name: c.name ?? c.categoryName ?? "",
          }))
          .filter((c) => c.id != null && c.name);

        setCategories(mapped);
      } catch {
        // silent
      }
    };

    fetchCategories();
  }, []);

  const buildProductParams = useCallback(
    (pageNum, limit = PAGE_LIMIT) => {
      const params = new URLSearchParams();
      params.set("page", String(pageNum));
      params.set("limit", String(limit));
      if (searchProduct?.trim()) params.set("search", searchProduct.trim());
      if (selectedCategory && selectedCategory !== "all") {
        params.set("categoryId", String(selectedCategory));
      }
      return params.toString();
    },
    [searchProduct, selectedCategory]
  );

  const applyPagination = (resData, payload, pageNum, loadedCount, pageCount) => {
    const pagination =
      resData?.pagination ??
      (Array.isArray(payload) ? undefined : payload?.pagination) ??
      {};
    const total = Number(pagination?.total ?? resData?.total ?? 0);
    const totalPages = Number(pagination?.totalPages ?? 0);

    if (totalPages > 0) {
      setHasMore(pageNum < totalPages);
    } else if (total > 0) {
      setHasMore(loadedCount < total);
    } else {
      setHasMore(pageCount >= PAGE_LIMIT);
    }
  };

  const fetchProducts = useCallback(
    async (pageNum, isCancelled = () => false, { silent = false } = {}) => {
      try {
        if (!silent) setLoading(true);

        const res = await axiosApiCall.get(
          `${API_ROUTER?.POS_PRODUCT_LIST}?${buildProductParams(pageNum)}`
        );
        if (isCancelled()) return;

        if (!res?.data?.status) {
          if (pageNum === 1) {
            setProducts([]);
            setHasMore(false);
          }
          return;
        }

        const resData = res?.data;
        const payload = resData?.data;
        const rows = extractRows(payload);
        const normalized = rows
          .map(normalizeProduct)
          .filter((p) => p.id != null);

        setProducts((prev) => {
          if (pageNum === 1) return normalized;
          const ids = new Set(prev.map((p) => String(p.id)));
          return [...prev, ...normalized.filter((p) => !ids.has(String(p.id)))];
        });

        const loadedCount = (pageNum - 1) * PAGE_LIMIT + normalized.length;
        applyPagination(resData, payload, pageNum, loadedCount, normalized.length);
      } catch {
        if (!isCancelled() && !silent) {
          toast.error(TOAST_ALERTS.GENERAL_ERROR, { autoClose: 2000 });
          setHasMore(false);
        }
      } finally {
        if (!silent && !isCancelled()) setLoading(false);
      }
    },
    [buildProductParams]
  );

  /** Refresh stock after successful checkout — no loading skeleton. */
  const refreshStockSilent = useCallback(async () => {
    try {
      const loadedLimit = Math.max(page * PAGE_LIMIT, PAGE_LIMIT);
      const res = await axiosApiCall.get(
        `${API_ROUTER?.POS_PRODUCT_LIST}?${buildProductParams(1, loadedLimit)}`
      );
      if (!res?.data?.status) return;

      const resData = res?.data;
      const payload = resData?.data;
      const rows = extractRows(payload);
      const normalized = rows
        .map(normalizeProduct)
        .filter((p) => p.id != null);

      setProducts(normalized);
      applyPagination(resData, payload, page, normalized.length, normalized.length);
    } catch {
      // silent — don't toast or show skeleton
    }
  }, [buildProductParams, page]);

  useEffect(() => {
    setProducts([]);
    setHasMore(true);
    setPage(1);
  }, [searchProduct, selectedCategory]);

  useEffect(() => {
    let cancelled = false;
    fetchProducts(page, () => cancelled);
    return () => {
      cancelled = true;
    };
  }, [page, fetchProducts]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [loading, hasMore]);

  const cartItemCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
    [cartItems]
  );

  const cartSubtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
        0
      ),
    [cartItems]
  );

  const getStockForProduct = useCallback(
    (productId) => {
      const p = products.find((item) => item.id === productId);
      return p?.stock ?? 0;
    },
    [products]
  );

  const handleAddToCart = (product, e) => {
    if (e) e.stopPropagation();
    if (!product) return;

    const maxStock = product.stock ?? 0;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        if (Number(existing.quantity || 0) >= maxStock) {
          toast.error(`Only ${maxStock} in stock`, { autoClose: 2000 });
          return prev;
        }
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Number(item.quantity || 0) + 1 }
            : item
        );
      }
      if (maxStock <= 0) {
        toast.error("Product is out of stock", { autoClose: 2000 });
        return prev;
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: Number(product.price || 0),
          image: product.image,
          quantity: 1,
        },
      ];
    });
  };

  const handleIncreaseQty = (productId) => {
    const maxStock = getStockForProduct(productId);
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id !== productId) return item;
        if (Number(item.quantity || 0) >= maxStock) {
          toast.error(`Only ${maxStock} left in stock.`, { autoClose: 2000 });
          return item;
        }
        return { ...item, quantity: Number(item.quantity || 0) + 1 };
      })
    );
  };

  const handleDecreaseQty = (productId) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Number(item.quantity || 0) - 1 }
            : item
        )
        .filter((item) => Number(item.quantity || 0) > 0)
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleCheckout = () => {
    if (!cartItems.length) {
      toast.error("Please add products to start a sale", { autoClose: 2000 });
      return;
    }
    setShowCheckoutModal(true);
  };

  const handleCheckoutSuccess = () => {
    setCartItems([]);
    setShowCheckoutModal(false);
    refreshStockSilent();
  };
  const ArrowLeftIcon = () => {
    return (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="34" height="34" rx="17" transform="matrix(-1 0 0 1 34 0)" fill="#E9ECF3"/>
        <path d="M16.7277 17.8594L18.7981 14.3125H17.634L15.259 17.8125L17.634 21.4375H18.7981L16.7277 17.8594Z" fill="#1F2430"/>
      </svg>
    );
  };
  const ArrowRightIcon = () => {
    return (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="34" height="34" rx="17" fill="#E9ECF3"/>
        <path d="M17.2723 17.8594L15.2019 14.3125H16.366L18.741 17.8125L16.366 21.4375H15.2019L17.2723 17.8594Z" fill="#1F2430"/>
      </svg>
    );
  };

  return (
    <>
      <ListLayoutWrapper>
        <ListMainArea>
          <CategorySection>
            <CategoryScrollBtn
              type="button"
              aria-label="Scroll categories left"
              disabled={!canScrollLeft}
              onClick={() => scrollCategories("left")}
            >
              <ArrowLeftIcon />
            </CategoryScrollBtn>

            <CategoryTabContainer ref={categoryScrollRef}>
              <CategoryPill
                active={selectedCategory === "all"}
                onClick={() => setSelectedCategory("all")}
              >
                All
              </CategoryPill>

              {categories.map((cat) => (
                <CategoryPill
                  key={cat.id}
                  active={selectedCategory === String(cat.id)}
                  onClick={() => setSelectedCategory(String(cat.id))}
                >
                  {cat.name}
                </CategoryPill>
              ))}
            </CategoryTabContainer>

            <CategoryScrollBtn
              type="button"
              aria-label="Scroll categories right"
              disabled={!canScrollRight}
              onClick={() => scrollCategories("right")}
            >
             <ArrowRightIcon />
            </CategoryScrollBtn>
          </CategorySection>

          {loading && products.length === 0 ? (
            <ProductGrid>
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardBox key={`skeleton-${i}`} style={{ cursor: "default" }}>
                  <div className="product_img_wrap">
                    <Skeleton height={160} borderRadius={10} />
                  </div>
                  <div className="product_info">
                    <Skeleton width={80} height={12} style={{ marginBottom: 6 }} />
                    <Skeleton width="70%" height={16} style={{ marginBottom: 8 }} />
                    <Skeleton width={100} height={14} style={{ marginBottom: 10 }} />
                    <Skeleton height={36} borderRadius={20} />
                  </div>
                </ProductCardBox>
              ))}
            </ProductGrid>
          ) : products.length === 0 ? (
            <EmptyState>
              <p>No products found in this category.</p>
            </EmptyState>
          ) : (
            <InfiniteScroll
              dataLength={products.length}
              next={loadMore}
              hasMore={hasMore}
              // loader={
              //   <div style={{ textAlign: "center", padding: "16px 0" }}>
              //     Loading more products...
              //   </div>
              // }
            >
              <ProductGrid>
                {products.map((product, index) => {
                  const sku =
                    product?.sku ||
                    `SKN-${String(product?.id || index + 1).padStart(3, "0")}`;
                  const stockLeft = product?.stock ?? 0;

                  return (
                    <ProductCardBox key={product.id}>
                      <div className="product_img_wrap">
                        <img
                          src={product?.image || "/images/uploadicon.svg"}
                          alt={product?.name || "product"}
                        />
                      </div>

                      <div className="product_info">
                        <div className="product_sku">SKU: {sku}</div>
                        <div className="product_name" title={product?.name}>
                          {product?.name}
                        </div>
                        <div className="product_price_row">
                          <span className="product_price">
                            ${Number(product?.price || 0).toFixed(2)}
                          </span>
                          <span className="product_stock">{stockLeft} left</span>
                        </div>
                        <AddCartButton
                          type="button"
                          title="Add product"
                          onClick={(e) => handleAddToCart(product, e)}
                        >
                          + Add
                        </AddCartButton>
                      </div>
                    </ProductCardBox>
                  );
                })}
              </ProductGrid>
            </InfiniteScroll>
          )}
          {/* initial loading handled by skeleton above */}
        </ListMainArea>

        <ListSidebarWrap>
          <SidebarContainer className="current-order-sidebar">
            <SidebarHeader className="current-order-header">
              <SidebarTitle>Current Order</SidebarTitle>
              <span className="order-count-badge">
                {cartItemCount} {cartItemCount === 1 ? "item" : "items"}
              </span>
            </SidebarHeader>

            {cartItems.length === 0 ? (
              <div className="order-empty-state">
                <div className="order-empty-icon">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.5 40.5C17.3284 40.5 18 39.8284 18 39C18 38.1716 17.3284 37.5 16.5 37.5C15.6716 37.5 15 38.1716 15 39C15 39.8284 15.6716 40.5 16.5 40.5Z" stroke="#007BFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M37.5 40.5C38.3284 40.5 39 39.8284 39 39C39 38.1716 38.3284 37.5 37.5 37.5C36.6716 37.5 36 38.1716 36 39C36 39.8284 36.6716 40.5 37.5 40.5Z" stroke="#007BFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4.5 7.5H10.5L15 33H39" stroke="#007BFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 27H38.385C38.5585 27.0001 38.7266 26.9401 38.8608 26.8302C38.995 26.7203 39.0869 26.5673 39.1209 26.3972L41.8209 12.8972C41.8427 12.7883 41.8401 12.676 41.8132 12.5683C41.7863 12.4606 41.7358 12.3602 41.6654 12.2743C41.595 12.1185 41.5064 12.1194 41.406 12.0719C41.3057 12.0245 41.196 11.9999 41.085 12H12" stroke="#007BFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h4>Cart Is Empty</h4>
                <p>Select Products To Start A Sale</p>
              </div>
            ) : (
              <>
                <div className="order-items-list">
                  {cartItems.map((item) => (
                    <div className="order-item-row" key={item.id}>
                      <div className="order-item-info">
                        <div className="order-item-name">{item.name}</div>
                        <div className="order-item-unit">
                          ${Number(item.price || 0).toFixed(2)} each
                        </div>
                      </div>

                      <div className="order-item-qty">
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => handleDecreaseQty(item.id)}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => handleIncreaseQty(item.id)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="order-item-total">
                        ${(Number(item.price || 0) * Number(item.quantity || 0)).toFixed(2)}
                      </div>

                      <button
                        type="button"
                        className="order-item-remove"
                        onClick={() => handleRemoveFromCart(item.id)}
                        aria-label="Remove item"
                      >
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.5 15C2.04167 15 1.64945 14.8369 1.32334 14.5108C0.997225 14.1847 0.833892 13.7922 0.833336 13.3333V2.5C0.597225 2.5 0.399447 2.42 0.240003 2.26C0.0805585 2.1 0.000558429 1.90222 2.87356e-06 1.66667C-0.000552682 1.43111 0.0794474 1.23333 0.240003 1.07333C0.400559 0.913334 0.598336 0.833333 0.833336 0.833333H4.16667C4.16667 0.597222 4.24667 0.399445 4.40667 0.24C4.56667 0.0805556 4.76445 0.000555556 5 0H8.33334C8.56945 0 8.7675 0.0800001 8.9275 0.24C9.0875 0.4 9.16722 0.597778 9.16667 0.833333H12.5C12.7361 0.833333 12.9342 0.913334 13.0942 1.07333C13.2542 1.23333 13.3339 1.43111 13.3333 1.66667C13.3328 1.90222 13.2528 2.10028 13.0933 2.26083C12.9339 2.42139 12.7361 2.50111 12.5 2.5V13.3333C12.5 13.7917 12.3369 14.1842 12.0108 14.5108C11.6847 14.8375 11.2922 15.0006 10.8333 15H2.5ZM10.8333 2.5H2.5V13.3333H10.8333V2.5ZM5.59417 11.4275C5.75361 11.2675 5.83334 11.0694 5.83334 10.8333V5C5.83334 4.76389 5.75334 4.56611 5.59334 4.40667C5.43334 4.24722 5.23556 4.16722 5 4.16667C4.76445 4.16611 4.56667 4.24611 4.40667 4.40667C4.24667 4.56722 4.16667 4.765 4.16667 5V10.8333C4.16667 11.0694 4.24667 11.2675 4.40667 11.4275C4.56667 11.5875 4.76445 11.6672 5 11.6667C5.23556 11.6661 5.43361 11.5869 5.59417 11.4275ZM8.9275 11.4267C9.08695 11.2678 9.16667 11.07 9.16667 10.8333V5C9.16667 4.76389 9.08667 4.56611 8.92667 4.40667C8.76667 4.24722 8.56889 4.16722 8.33334 4.16667C8.09778 4.16611 7.9 4.24611 7.74 4.40667C7.58 4.56722 7.5 4.765 7.5 5V10.8333C7.5 11.0694 7.58 11.2675 7.74 11.4275C7.9 11.5875 8.09778 11.6672 8.33334 11.6667C8.56889 11.6661 8.76695 11.5861 8.9275 11.4267Z" fill="#E86D4D" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                <SidebarFooter className="current-order-footer">
                  <div className="order-subtotal-row">
                    <span>Subtotal</span>
                    <strong>${cartSubtotal.toFixed(2)}</strong>
                  </div>
                  <button
                    type="button"
                    className="order-checkout-btn"
                    onClick={handleCheckout}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.875 4.15625C0.875 3.63411 1.08242 3.13335 1.45163 2.76413C1.82085 2.39492 2.32161 2.1875 2.84375 2.1875H11.1562C11.6784 2.1875 12.1792 2.39492 12.5484 2.76413C12.9176 3.13335 13.125 3.63411 13.125 4.15625V9.84375C13.125 10.3659 12.9176 10.8667 12.5484 11.2359C12.1792 11.6051 11.6784 11.8125 11.1562 11.8125H2.84375C2.32161 11.8125 1.82085 11.6051 1.45163 11.2359C1.08242 10.8667 0.875 10.3659 0.875 9.84375V4.15625ZM2.84375 3.0625C2.55367 3.0625 2.27547 3.17773 2.07035 3.38285C1.86523 3.58797 1.75 3.86617 1.75 4.15625V4.8125H12.25V4.15625C12.25 3.86617 12.1348 3.58797 11.9296 3.38285C11.7245 3.17773 11.4463 3.0625 11.1562 3.0625H2.84375ZM1.75 9.84375C1.75 10.1338 1.86523 10.412 2.07035 10.6171C2.27547 10.8223 2.55367 10.9375 2.84375 10.9375H11.1562C11.4463 10.9375 11.7245 10.8223 11.9296 10.6171C12.1348 10.412 12.25 10.1338 12.25 9.84375V5.6875H1.75V9.84375ZM9.1875 8.3125H10.5C10.616 8.3125 10.7273 8.35859 10.8094 8.44064C10.8914 8.52269 10.9375 8.63397 10.9375 8.75C10.9375 8.86603 10.8914 8.97731 10.8094 9.05936C10.7273 9.14141 10.616 9.1875 10.5 9.1875H9.1875C9.07147 9.1875 8.96019 9.14141 8.87814 9.05936C8.79609 8.35859 9.07147 8.3125 9.1875 8.3125Z" fill="white" />
                    </svg>
                    Checkout
                  </button>
                </SidebarFooter>
              </>
            )}
          </SidebarContainer>
        </ListSidebarWrap>
      </ListLayoutWrapper>

      <PosCheckoutModal
        show={showCheckoutModal}
        onHide={() => setShowCheckoutModal(false)}
        cartItems={cartItems}
        cartSubtotal={cartSubtotal}
        onSuccess={handleCheckoutSuccess}
      />
    </>
  );
}
