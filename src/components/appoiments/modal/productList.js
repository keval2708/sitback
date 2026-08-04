import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import LoadingButton from "@/components/shared/button/LoadingButton";
import Loader from "@/components/shared/spinner/loader";
import { useToaster } from "@/hooks";
import { handleCalender } from "@/redux/messageTab";
import { API_ROUTER } from "@/services/apiRouter";
import { Button, SubTitleText18 } from "@/styles/global/main.style";
import { ProductListLayoutWrapper } from "@/styles/pages/pos.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
const ProductListModal = ({ show, handleClose, data }) => {
  const router = useRouter();
  const { t } = useTranslation();

  // State
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const [oldProductData, setOldProductData] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [finalProducts, setFinalProducts] = useState([]); // To store final array with selected products and count
  const [totalProduct, setTotalProduct] = useState(0);
  const [errorMsg, setErrorMsg] = useState([]);

  // Hooks
  const { toaster } = useToaster();
  const dispatch = useDispatch();
  const productCardRef = useRef(null);

  // Fetch product list
  // Fetch product list
  const GetProduct = async (load = true) => {
    if (data) {
      try {
        setLoading(load);
        let params =
          data?.type === "main_user"
            ? {
              booking_id: data?.id,
              booking_type: data?.type,
              user_id: data?.user_id,
            }
            : {
              booking_id: data?.book_id,
              booking_type: data?.type,
              user_id: data?.guest_user_id,
            };

        const res = await axiosApiCall.post(API_ROUTER?.PRODUCT_LIST_BOOKING, params);
        if (!res?.data?.status) {
          return toaster(res?.message, TOAST_TYPES.ERROR);
        } else {
          setTotalProduct(res?.data?.tempItemCount);
          setProducts(res?.data?.data);
          setOldProductData(res?.data?.data);
        }
      } catch (error) {
        toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      } finally {
        setLoading(false);
      }
    }
  };

  // Filter products based on search input
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchProduct.toLowerCase())
  );

  // Handle product count (increment or decrement)
  const handleCount = (product, event) => {
    const newCount = event === "add" ? product.cartData + 1 : product.cartData - 1;
    if (newCount >= 0) {
      // Add booking data to each product conditionally
      const updatedProducts = products.map((p) =>
        p.id === product.id
          ? {
            ...p,
            cartData: newCount, // Ensure count doesn’t go below 0
          }
          : p
      );

      setProducts(updatedProducts);

      // Filter to get only products with count > 0
      //const filteredFinalProducts = updatedProducts.filter((prod) => prod.cartData > 0);
      const totalProductCount = updatedProducts.reduce((acc, product) => acc + product.cartData, 0);
      setTotalProduct(totalProductCount);
      setFinalProducts(updatedProducts); // Update the final product array
    }
  };

  // Close modal and reset state
  const close = () => {
    handleClose();
    setSelectedProductId(null);
    setSearchProduct("");
    setProducts([]);
    setTotalProduct(0);
    setOldProductData([]);
    setErrorMsg([]);
    setFinalProducts([]); // Reset final product array
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
      let params =
        data?.type === "main_user"
          ? {
            booking_id: data?.id,
            booking_type: data?.type,
            user_id: data?.user_id,
            added_by: "booking",
          }
          : {
            booking_id: data?.book_id,
            booking_type: data?.type,
            user_id: data?.guest_user_id,
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
          // GetProduct();
          setErrorMsg(res?.data?.errorDataArray);
        } else {
          dispatch(handleCalender(true));
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
      GetProduct();
    }
  }, [show]);

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
          <Loader loading={loading} />
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
              <div className="cartBox">
                <i>
                  <img src="/images/cart-white-icon.svg" alt="buycarticon" />
                </i>
                {totalProduct > 0 && <span>{totalProduct}</span>}
              </div>
              <div className="addbtn">
                <LoadingButton
                  // type="submit"
                  disabled={loadingBtn}
                  label={t("addToCart")}
                  loadinglabel={t("addToCart")}
                  isLoading={loadingBtn}
                  className="loading-btn-wrapper"
                  onClick={() => handleAdd()}
                />
                {/* <Button onClick={() => handleAdd()}>{t("addToCart")}</Button> */}
              </div>
            </div>
            <div className="product_card">
              <Row>
                {loading ? (
                  <></> // Empty fragment while loading, so the message does not display
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <Col md={6} lg={4} xl={3} key={index}>
                      <div
                        ref={selectedProductId === product.id ? productCardRef : null}
                        className={`product_card_box ${product.cartData > 0 ? "active" : ""}`}
                      >
                        <div className="product_img">
                          <img src={product?.image} className="w-100" alt="product" />
                        </div>

                        {product?.remainstock == 0 ? (
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
                            <h5>${product.price || 0}</h5>
                          </div>

                          <div className="quantity">
                            <div>
                              <a
                                className="quantity__minus"
                                onClick={() => handleCount(product, "remove")}
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
                                className="quantity__plus"
                                onClick={() => handleCount(product, "add")}
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
                  ))
                ) : (
                  <Col className="no-products-body-wrapper">
                    <SubTitleText18 className="no-products-message">
                      No products available. Please add a product by clicking the below button in the POS to continue adding products to the cart.
                    </SubTitleText18>
                    <div className="text-center">
                      <Button onClick={() => router.push(`pos-inventory`)}>
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

export default ProductListModal;
