import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch } from "react-redux";
import LoadingButton from "@/components/shared/button/LoadingButton";
import { useToaster } from "@/hooks";
import { handleCalender } from "@/redux/messageTab";
import { API_ROUTER } from "@/services/apiRouter";
import { Button, SubTitleText18 } from "@/styles/global/main.style";
import { ProductListLayoutWrapper } from "@/styles/pages/pos.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
const productListPayment = ({
  show,
  handleClose,
  data,
  selectedData,
  onShow,
}) => {
  const { push } = useRouter();
  const { t } = useTranslation();

  // State
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const [oldProductData, setOldProductData] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [finalProducts, setFinalProducts] = useState([]); // To store final array with selected products and count
  const [totalProduct, setTotalProduct] = useState(0);
  const [errorMsg, setErrorMsg] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);

  // Hooks
  const { toaster } = useToaster();
  const dispatch = useDispatch();
  const productCardRef = useRef(null);

  // Fetch product list
  const GetProduct = async (load = true) => {
    if (!data) return;

    try {
      setLoading(load);
      const params = {
        booking_id: selectedData?.id,
        booking_type: data?.type,
        user_id: data?.user_id,
      };

      const res = await axiosApiCall.post(API_ROUTER?.PRODUCT_LIST_BOOKING, params);
      if (!res?.data?.status) {
        setProducts([]);
        setOldProductData([]);
        setTotalProduct(0);
        return;
      }

      const rows = Array.isArray(res?.data?.data) ? res.data.data : [];
      setTotalProduct(res?.data?.tempItemCount ?? 0);
      setProducts(rows);
      setOldProductData(rows);
    } catch (error) {
      setProducts([]);
      setOldProductData([]);
      setTotalProduct(0);
    } finally {
      setLoading(false);
      setHasFetched(true);
    }
  };

  // Filter products based on search input
  const filteredProducts = (Array.isArray(products) ? products : []).filter((product) =>
    (product?.name || "").toLowerCase().includes(searchProduct.toLowerCase())
  );

  // Handle product count (increment or decrement)
  const handleCount = (product, event) => {
    const remainStock = Number(product?.remainstock ?? 0);
    const newCount = event === "add" ? product.cartData + 1 : product.cartData - 1;

    if (remainStock <= 0) return;
    if (event === "add" && newCount > remainStock) return;
    if (newCount < 0) return;

    const updatedProducts = products.map((p) =>
      p.id === product.id
        ? {
          ...p,
          cartData: newCount,
        }
        : p
    );

    setProducts(updatedProducts);

    const totalProductCount = updatedProducts.reduce((acc, item) => acc + item.cartData, 0);
    setTotalProduct(totalProductCount);
    setFinalProducts(updatedProducts);
  };

  // Close modal and reset state
  const close = () => {
    onShow();
    handleClose();
    setSelectedProductId(null);
    setSearchProduct("");
    setProducts([]);
    setTotalProduct(0);
    setOldProductData([]);
    setErrorMsg([]);
    setFinalProducts([]); // Reset final product array
    setLoading(true);
    setHasFetched(false);
    dispatch(handleCalender(true));
  };

  const getCartDataDifference = (oldProductData, finalProducts) => {
    return finalProducts.map((finalProduct) => {
      // Find the corresponding oldProduct by matching id
      const oldProduct = oldProductData.find((product) => product.id === finalProduct.id);

      // Check if oldProduct exists and compare cartData
      if (oldProduct) {
        const cartDataDifference = finalProduct.cartData - oldProduct.cartData;

        return {
          id: finalProduct?.id,
          name: finalProduct?.name,
          oldCartData: oldProduct?.cartData,
          newCartData: finalProduct?.cartData,
          price: finalProduct?.price,
          difference: cartDataDifference,
        };
      } else {
        // Handle the case where the product doesn't exist in oldProductData
        return {
          id: finalProduct?.id,
          name: finalProduct?.name,
          oldCartData: null,
          newCartData: finalProduct?.cartData,
          price: finalProduct?.price,
          difference: finalProduct?.cartData, // Assume full addition if not in oldProductData
        };
      }
    });
  };

  const handleAdd = async () => {
    setLoadingBtn(true);
    try {
      let params = {
        booking_id: selectedData?.id,
        booking_type: data?.type,
        user_id: data?.user_id,
        added_by: "booking",
      };

      // Get cart data differences and filter out where difference is 0
      let cartDataDifferences = getCartDataDifference(oldProductData, finalProducts);
      cartDataDifferences = cartDataDifferences.filter((item) => item.difference !== 0); // Remove items with difference 0

      if (cartDataDifferences.length > 0) {
        // return false

        // Convert finalProducts to the required format
        const cartItemData = cartDataDifferences.map((item) => ({
          pid: item?.id, // Use the id from finalProducts
          pcount: item?.newCartData, // Assuming cartData represents the quantity of the product
          pamount: item?.price, // Convert price to a number
        }));

        // Combine params and cartItemData into the final object
        const transformedData = {
          ...params,
          cartItemData,
        };

        // Log the transformed data
        //return false

        const res = await axiosApiCall.post(API_ROUTER?.ADD_PRODUCT_BOOKING_DATA, transformedData);
        if (res?.data?.errorDataArray.length > 0) {
          //GetProduct();
          setErrorMsg(res?.data?.errorDataArray);
        } else {
          //bookingWiseCardList()
          toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
          close();
        }
        // if (!res?.data?.status) {
        //   return toaster(res?.message, TOAST_TYPES.ERROR);
        // } else {
        //   close();
        // }
      } else {
        close();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoadingBtn(false);
    }
    setLoadingBtn(false);
  };


  useEffect(() => {
    if (show) {
      setLoading(true);
      setHasFetched(false);
      setProducts([]);
      GetProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  // Show skeleton until the first fetch for this open completes — never flash empty state
  const showSkeleton = loading || !hasFetched;

  return (
    <Modal
      className="confirm-delete-modal confirm-service-modal-wrapper upgrades-products-wrapper sitback-updated-product-list-modal"
      show={show}
      onHide={close}
      centered
      backdrop="static" // Disable outside click
      keyboard={false} // Disable escape key to close modal
    >
      <Modal.Header closeButton className="red-close-icon"></Modal.Header>
      <Modal.Body>
        <ProductListLayoutWrapper>
          <div className="product_list">
            <div className="Product_header">
              <div className="search_box">
                <input
                  type="text"
                  name="Search"
                  placeholder="Search products..."
                  value={searchProduct}
                  onChange={(e) => setSearchProduct(e.target.value)}
                />
                <img src="/images/search-normal.svg" alt="searchimg" className="search-icon" />
              </div>

              <div className="addbtn">
                <LoadingButton
                  // type="submit"
                  disabled={loadingBtn || showSkeleton}
                  label={t("addToCart")}
                  loadinglabel={t("addToCart")}
                  isLoading={loadingBtn}
                  className="loading-btn-wrapper"
                  onClick={() => handleAdd()}
                />
                {/* <Button onClick={() => handleAdd()}>{t("addToCart")}</Button> */}
              </div>

              <div className="cartBox">
                <i>
                  <img src="/images/cart-white-icon.svg" alt="buycarticon" />
                </i>
                {totalProduct > 0 && <span>{totalProduct}</span>}
              </div>
            </div>
            <div className="product_card">
              <Row>
                {showSkeleton ? (
                  Array.from({ length: 8 }).map((_, index) => (
                    <Col md={6} lg={4} xl={3} key={`skeleton-${index}`}>
                      <div className="product_card_box" style={{ cursor: "default", pointerEvents: "none" }}>
                        <div className="product_img">
                          <Skeleton height={176} borderRadius={8} />
                        </div>
                        <div className="product-wrapper-div">
                          <div className="product_detail">
                            <Skeleton width="75%" height={18} style={{ marginBottom: 8 }} />
                            <div className="product_price_row">
                              <Skeleton width={60} height={16} />
                              <Skeleton width={50} height={14} />
                            </div>
                          </div>
                          <Skeleton width={110} height={32} borderRadius={20} />
                        </div>
                      </div>
                    </Col>
                  ))
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => {
                    const remainStock = Number(product?.remainstock ?? 0);
                    const isOutOfStock = remainStock <= 0;
                    const isMinusDisabled = isOutOfStock || product.cartData <= 0;
                    const isPlusDisabled = isOutOfStock || product.cartData >= remainStock;

                    return (
                      <Col md={6} lg={4} xl={3} key={index}>
                        <div
                          ref={selectedProductId === product.id ? productCardRef : null}
                          className={`product_card_box ${product.cartData > 0 ? "active" : ""}`}
                        >
                          <div className="product_img">
                            <img src={product?.image} className="w-100" alt="product" />
                          </div>

                          {isOutOfStock ? (
                            <div className="lowStock">
                              <span>Out Of Stock</span>
                            </div>
                          ) : product?.lowstockflag ? (
                            <div className="lowStock">
                              <span>{t("lowStock")}</span>
                            </div>
                          ) : (
                            ""
                          )}

                          <div className="product-wrapper-div">
                            <div className="product_detail">
                              <h4>{product.name.substring(0, 17)}...</h4>
                              <div className="product_price_row">
                                <h5>${Number(product.price || 0).toFixed(2)}</h5>
                                <span className="product_stock">{remainStock} left</span>
                              </div>
                            </div>

                            <div className="quantity">
                              <div>
                                <a
                                  className={`quantity__minus${isMinusDisabled ? " disabled" : ""}`}
                                  onClick={() => {
                                    if (!isMinusDisabled) handleCount(product, "remove");
                                  }}
                                  aria-disabled={isMinusDisabled}
                                >
                                  <span>-</span>
                                </a>
                              </div>
                              <input
                                name="quantity"
                                type="text"
                                className="quantity__input"
                                value={product.cartData}
                                readOnly
                              />
                              <div>
                                <a
                                  className={`quantity__plus${isPlusDisabled ? " disabled" : ""}`}
                                  onClick={() => {
                                    if (!isPlusDisabled) handleCount(product, "add");
                                  }}
                                  aria-disabled={isPlusDisabled}
                                >
                                  <span>+</span>
                                </a>
                              </div>
                            </div>
                          </div>

                          {errorMsg.filter((datas) => datas.pid == product?.id).length > 0 ? (
                            <p className="error">No more products available now.</p>
                          ) : (
                            ""
                          )}
                        </div>
                      </Col>
                    );
                  })
                ) : (
                  <Col className="no-products-body-wrapper">
                    <SubTitleText18 className="no-products-message">
                      No products available. Please add a product by clicking the below button in the POS to continue adding products to the cart.
                    </SubTitleText18>
                    <div className="text-center">
                       <Button onClick={() => push(`pos-inventory`)}>
                        <img src="/images/plushicon.svg" alt="plusicon" />{" "}
                        <span>Add Product</span>
                      </Button>
                    </div>
                  </Col>
                )}
              </Row>
            </div>

          </div>
        </ProductListLayoutWrapper>
      </Modal.Body>
    </Modal>
  );
};

export default productListPayment;
