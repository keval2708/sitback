import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import CustomModal from "@/components/shared/modal";
import { useToaster } from "@/hooks"; // Assuming you have a custom hook for toasts
import { API_ROUTER } from "@/services/apiRouter";
import { Button, SitBackModalBodyWrapper, } from "@/styles/global/main.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { getSocketId } from "@/utils/helper";

export const Amenities = () => {
  // Hooks
  const { toaster } = useToaster();
  const [loading, setLoading] = useState(false);
  // const [selectedAmenities, setSelectedAmenities] = useState([
  //   { id: 1, name: "Locker Room", isChecked: false },
  //   { id: 2, name: "Shower", isChecked: false },
  //   { id: 3, name: "Steam Room", isChecked: true },
  //   { id: 4, name: "Sauna", isChecked: false },
  //   { id: 5, name: "Jacuzzi/Hot tub", isChecked: false },
  //   { id: 6, name: "Cold Plunge", isChecked: false },
  //   { id: 7, name: "Pool Access", isChecked: false },
  // ]);
  const [selectedAmenities, setSelectedAmenities] = useState([])

  const [showModal, setShowModal] = useState(false);
  const [spaAmenities,setSpaAmenities]  = useState([]);
  const [deletingAmenityId, setDeletingAmenityId] = useState(null);

  const handleCheckboxChange = (id) => {
    setSelectedAmenities((prev) =>
      prev.map((amenity) =>
        amenity.id === id
          ? { ...amenity, isChecked: !amenity.isChecked }
          : amenity
      )
    );
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      const socketId = getSocketId();
      const param = {
        amenitiesarray: selectedAmenities,
        socketId: socketId,
      }
      const res = await axiosApiCall.post(API_ROUTER?.UPDATE_AMENITIES, param);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        listAmenities();
        setShowModal(false);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  }

  // const handleSaveChanges = () => {
  //   setShowModal(false);
  //   //toaster("success", "Amenities updated successfully!");
  // };
  const openAmenitiesModel = async () => {
     try {
      setLoading(true); // Set loading to true when API request starts
      const res = await axiosApiCall.get(API_ROUTER?.LIST_AMENITIES);
      if (!res?.status) {
        toaster(res?.message, TOAST_TYPES.ERROR);
         // Set loading to false if API call fails
      } else {
        setSelectedAmenities(res?.data?.data);
        setShowModal(true)
        setLoading(false); // Set loading to false once data is fetched
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      setLoading(false); // Set loading to false if there's an error
    }

  }
  const listAmenities = async () => {

    try {
      setLoading(true); // Set loading to true when API request starts
      const res = await axiosApiCall.get(API_ROUTER?.SPA_LIST_AMENITIES);
      if (!res?.status) {
        toaster(res?.message, TOAST_TYPES.ERROR);
        setLoading(false); // Set loading to false if API call fails
      } else {
        setSpaAmenities(res?.data?.data);
        setLoading(false); // Set loading to false once data is fetched
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      setLoading(false); // Set loading to false if there's an error
    }
  };

  const handleRemoveAmenity = async (id) => {
  setDeletingAmenityId(id);
  const socketId = getSocketId();

  try {
     const param = {
        id: id,
        socketId: socketId,
      }
      const res = await axiosApiCall.post(API_ROUTER?.DELETE_AMENITIES, param);
    if (!res?.status) {
      toaster(res?.message, TOAST_TYPES.ERROR);
    } else {
      toaster("Amenity removed successfully!", TOAST_TYPES.SUCCESS);
      setSpaAmenities(prev => prev.filter(a => a.id !== id));
      listAmenities()
    }
  } catch (err) {
    toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
  } finally {
    setDeletingAmenityId(null);
  }
};


  useEffect(() => {
    listAmenities()
  }, []);

   useEffect(() => {
      if (window.io) {
        window.io.socket.on("serviceprovider", async (msg) => {
          if(msg?.action == "spaAmenitiesListUpdate") {
            listAmenities();
          }
        });
      }
    }, [window.io]);

  return (
    <>
      <div>
        <div className="amenities-display-wrapper">
        {spaAmenities && spaAmenities.length > 0 ? (
          <div className="amenities-main-div">
            {spaAmenities.map((data, key) => (
              <span key={key}>
               {data?.name}
                <a className="close-btn-wrapper" href="javascript:void(0);" onClick={() => handleRemoveAmenity(data.id)}>
                    <i className="btn-img">
                      {deletingAmenityId === data.id ? (
                        <img alt="loading" className="loader-img-wrappper" src="/images/loader-icon.gif" />
                      ) : (
                        <img alt="close" src="/images/closeicon.svg" />
                      )}
                    </i>
                  </a>
              </span>
            ))}
          </div>
        ) : (
          <></>
        )}
          <button className="add-amenities-btn" onClick={() => openAmenitiesModel()}>
            <i className="plus-icon"><img alt="sitback" src="/images/plus-round-circle.svg" /></i>
            Add Amenities
          </button>
        </div>
        <CustomModal
      show={showModal}
      onHide={() => setShowModal(false)}
      aria-labelledby="example-modal-sizes-title-sm"
      centered
      className="sitback-modal-wrapper sitback-add-amenities-modal-wrapper modal-white-bg"
    >
      <Modal.Body>
        <SitBackModalBodyWrapper className="add-amenities-modal-wrapper">
          <div className="amenities-moadal-header">
            <h3 className="modal-title-text">Add Amenities</h3>
            <a className="close-btn" href="javascript:void(0);" onClick={() => setShowModal(false)}>
              <i><img alt="sitback" src="/images/closeicon.svg" /></i>
            </a>
          </div>
          <div className="amenities-detail-body-wrapper">
            <ul>
              {selectedAmenities.map((amenity) => (
              <li key={amenity?.id}>
                <p>{amenity?.name}</p>
                <div className="checkbox-wrapperv5 checkbox-border-div">
                  <input
                    type="checkbox"
                    id={amenity.id}
                    checked={amenity.isChecked}
                    name="listInfo"
                    // {...register("listInfo")}
                    className="form-check-input"
                    onChange={() => handleCheckboxChange(amenity.id)}
                  />
                </div>
              </li>
               ))}


            </ul>
          </div>
          <div className="amenities-btn-wrapper">
            <Button
              className="amenities-btn"
              variant="primary"
              type="reset"
              isBorderBtn={true}
              onClick={() => handleSaveChanges()}
              disabled={loading} // Disable the button when loading
            >
              {loading ? 'Saving...' : 'Save Changes'} {/* Show loading text while saving */}
            </Button>
            <Button className="cancel-btn-wrapper" variant="primary" type="reset" isBorderBtn={true} onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </div>
        </SitBackModalBodyWrapper>
      </Modal.Body>
        </CustomModal>
      </div>
    </>
  );
};
