import { useEffect, useState } from "react";
import { Button, Modal, Table, } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import AddUserModal from "./modals/addUserModal";
import EditUserModal from "./modals/editUserModal";
import CustomModal from "../shared/modal";
import { useToaster } from "@/hooks";
import { authCheckSliceSelector } from "@/redux/authCheck";
import { API_ROUTER } from "@/services/apiRouter";
import { SitBackModalBodyWrapper, } from "@/styles/global/main.style";
import {
  AvailabilityDetailDiv,
} from '@/styles/pages/insights.style';
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { getSocketId } from "@/utils/helper";


export const AddRemoveUser = () => {


  //hooks
  const { login } = useSelector(authCheckSliceSelector);
  const { t } = useTranslation();

  const { toaster } = useToaster();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [showEditModal, setShowEditModal] = useState(false);
  const [loadingButtons, setLoadingButtons] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [userData, setUserData] = useState([]);

  const [userEditData, setUserEditData] = useState({
    })


  // Function to handle edit click and open modal with the selected item's data
  const handleAddClick = () => {
    setShowModal(true); // Open the modal
  };

  const handleEditClick = (user) => {
    setUserEditData(user);
    setShowEditModal(true); // Open the modal
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseEditModal = () => {
    setUserEditData([]);
    setShowEditModal(false);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowDeleteConfirm(true); // Show confirmation modal
  };

  const handleDeleteConfirm = async (item) => {
    try {
      setLoadingButtons((prev) => ({ ...prev, [item.id]: true }));
      const socketId = getSocketId();
      const res = await axiosApiCall.post(API_ROUTER.DASHBOARD_DELETE_SPAEMPLOYE, {
        id: item?.id, // Use the item's ID
        socketId: socketId,
      });

      if (!res?.status) {
        toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster("Employee deleted successfully", TOAST_TYPES.SUCCESS);
        listAvailableEmployees(); // Reload the list after deletion
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoadingButtons((prev) => ({ ...prev, [item.id]: false }));
    }
  };


  useEffect(() => {
    listAvailableEmployees();
  }, [])

  useEffect(() => {

    if (window.io) {
      if(login?.employeeType == "spa") {

        window.io.socket.on("serviceprovider", async (msg) => {
        if (msg?.action == "spaEmployeeUpdate") {
          listAvailableEmployees();
        }

        });
      }

    }
  }, [window.io]);

  const listAvailableEmployees = async () => {

    try {

      setLoading(true)
      const res = await axiosApiCall.get(API_ROUTER?.DASHBOARD_LIST_SPAEMPLOYEE);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setUserData(res?.data?.data)
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AvailabilityDetailDiv>
        <div className="add-remove-user-main-div">
          <div className="add-remove-user-title-div">
            <h3>{t('availableEmployees')}</h3>
            <Button onClick={() => handleAddClick()}>{t('addNewUser')} +</Button>
          </div>
          <div className="add-remove-table-div">
            <Table responsive striped>
              <thead>
                <tr>
                  <th>{t('employeeName')}</th>
                  <th className="added-th-wrapper">{t('addedBy')}</th>
                  <th>{t('Actions')}</th>
                </tr>
              </thead>
               <tbody>

                 {loading ? (
                  <tr  className="text-center">

                  <td colSpan="3" className="text-center">
                    <div className="spinner-border text-info" role="status"></div>
                  </td>

                  </tr>
                ) : userData?.length === 0 ? (
                  <div className="not-found-available-text-div">
                    <p className="not-found-availability">{t('noEmployeesAvailable')}</p>
                  </div>
                ) : (
                  userData?.map((user, key) => (
                    <tr key={key}>
                      <td>
                        <p>{user?.username}</p>
                      </td>
                       <td>
                        <p className="added-name-text">{user?.addedbyname}</p>
                      </td>
                      <td>
                        <div className="action-td-wrapper">
                          {login.employeeType == "spaemployee" ?
                          <>
                          {user?.id !=  login?.id ? <>
                           <a href="javascript:void(0);" className="edit-icon">
                            <img alt="sitback" src="/images/pencil-edit-icon.svg" onClick={() => handleEditClick(user)}/>
                          </a>
                          <a href="javascript:void(0);" onClick={() => handleDeleteClick(user)}>
                            <img alt="sitback" src="/images/trash-icon.svg" />
                          </a>
                           </> : ''}
                          </> :
                          <>
                          <a href="javascript:void(0);" className="edit-icon">
                            <img alt="sitback" src="/images/pencil-edit-icon.svg" onClick={() => handleEditClick(user)}/>
                          </a>
                          <a href="javascript:void(0);" onClick={() => handleDeleteClick(user)}>
                            <img alt="sitback" src="/images/trash-icon.svg" />
                          </a>
                          </> }
                        </div>
                      </td>
                    </tr>
                      ))
                    )}

                {/* <tr>
                  <td>
                    <p>Max Tyson</p>
                  </td>
                  <td>
                    <div className="action-td-wrapper">
                      <a href="javascript:void(0);" className="edit-icon">
                        <img alt="sitback" src="/images/pencil-edit-icon.svg" onClick={() => handleEditClick()}/>
                      </a>
                      <a href="javascript:void(0);" onClick={() => handleDeleteClick()}>
                        <img alt="sitback" src="/images/trash-icon.svg" />
                      </a>
                    </div>
                  </td>
                </tr> */}
              </tbody>
            </Table>
          </div>
        </div>
      </AvailabilityDetailDiv>

      {/* Add user model */}
      <AddUserModal
        show={showModal}
        handleClose={() => handleCloseModal()}
        listAvailableEmployees ={() => listAvailableEmployees()}

      />
      <EditUserModal
        show={showEditModal}
        handleClose={() => handleCloseEditModal()}
        data = {userEditData}
        listAvailableEmployees ={() => listAvailableEmployees()}

      />

      {/* Delete User Model */}

       <CustomModal
          show={showDeleteConfirm}
          onHide={() => setShowDeleteConfirm(false)}
          aria-labelledby="delete-confirmation-modal"
          centered
          className="confirmation-modal-wrapper sitback-delete-modal-wrapper"
        >
        <Modal.Body>
          <SitBackModalBodyWrapper className="sitback-delete-modal-body-wrapper">
            <h5 className="delete-modal-title-wrapper">{t('deleteEmployee')}</h5>

            <p>{itemToDelete?.name?.split(',')
              .map((item, index) => (
                <li key={index} className="mb-2">
                  {item.trim()}
                  <br />
                </li>
              ))}
            </p>
            <div className="confirmation-buttons delete-confirmation-btn">
              <Button
                variant="secondary"
                onClick={() => setShowDeleteConfirm(false)}
                className="confirm-btn cancel-btn"
                type="cancel"
              >
                {t('cancel')}
              </Button>
              <Button
                variant="danger"
                onClick={async () => {
                  await handleDeleteConfirm(itemToDelete);
                  setShowDeleteConfirm(false); // Close the modal
                }}
                className="confirm-btn"
              >
                {t('confirmDelete')}
              </Button>
            </div>
          </SitBackModalBodyWrapper>
        </Modal.Body>
      </CustomModal>
    </>
  );
};
