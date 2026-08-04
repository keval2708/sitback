import moment from "moment";
import { Modal, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { appointmentCheckSliceSelector } from "@/redux/appointment";
import { TableWrapperMain } from "@/styles/global/main.style";

const PaymentReminder = ({ show, handleClose = () => {} }) => {
  const { reminderDetails } = useSelector(appointmentCheckSliceSelector);
  // console.log("reminderDetails",reminderDetails);

  const calculateTime = (arg) => {
    let d = arg?.hour * 60 + arg?.minutes;
    let startServiceValue = moment(`${arg?.slot_time} ${arg?.time_type}`, "hh:mm:ss A").format(
      "hh:mm A"
    );
    let endServiceValue = moment(`${arg?.slot_time} ${arg?.time_type}`, "hh:mm:ss A")
      .add(d, "minutes")
      .format("hh:mm A");

    return `${startServiceValue} - ${endServiceValue}`;
  };

  return (
    <Modal
      show={show}
      aria-labelledby="example-modal-sizes-title-lg"
      centered
      className="sitback-modal-wrapper sitback-payment-reminder-modal sitback-payment-reminderV2-modal"
    >
      <Modal.Header
        closeButton
        className="red-close-icon"
        style={{ zIndex: "9" }}
        onClick={() => handleClose()}
      ></Modal.Header>
      <Modal.Body className="pt-0" style={{ marginTop: "-35px" }}>
        <div className="payment-reminder-section">
          <h2>Payment Reminder!</h2>
          <div className="Payment-detail-wrapper">
            <div className="header-text">
              <h3>
                {moment(reminderDetails?.data?.length > 0 && reminderDetails?.data[0]?.date).format(
                  "dddd, MMM D, YYYY"
                )}
              </h3>
            </div>
            <TableWrapperMain>
              <Table responsive bordered>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Service Type</th>
                    <th>Employee</th>
                    <th>Time</th>
                    <th>Duration</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reminderDetails?.data?.map((dt, key) => {
                    // Determine if the index is odd
                    const isOddIndex = key % 2 !== 0;

                    return (
                      <>
                        <tr
                          key={key}
                          style={{
                            backgroundColor: isOddIndex ? "#f9f9f9" : "#ffffff", // Light gray for odd index, white for even
                          }}
                        >
                          <td>{dt?.allData?.username}</td>
                          <td>{dt?.allData?.servicename}</td>
                          <td>{dt?.allData?.employeename}</td>
                          <td>{calculateTime(dt?.allData)}</td>
                          <td>{dt?.allData?.hour * 60 + dt?.allData?.minutes} min</td>
                          <td>
                            {dt?.allData?.cancel_by_type === "serviceProvider" ? (
                              <span style={{ color: "red" }}>-${dt?.allData?.charges}</span>
                            ) : dt?.allData?.cancel_by_type === "user" ? (
                              <>
                                {dt?.allData?.user_cancellation_charge == 0 ? (
                                  <span>-${Math.floor(dt?.allData?.user_cancellation_charge)}</span>
                                ) : (
                                  <span>${Math.floor(dt?.allData?.user_cancellation_charge)}</span>
                                )}
                              </>
                            ) : (
                              <span>${Math.floor(dt?.allData?.charges)}</span>
                            )}
                          </td>
                          <td>
                            {dt?.allData?.cancel_by_type ? (
                              <div className="cancelled-block">
                                {dt?.allData?.cancel_by_type === "serviceProvider" ? (
                                  <h4 style={{ color: "red" }} className="cancelled-text">
                                    Cancelled by Spa
                                  </h4>
                                ) : dt?.allData?.cancel_by_type === "user" ? (
                                  <h4 style={{ color: "red" }} className="cancelled-text">
                                    Cancelled by User
                                  </h4>
                                ) : (
                                  <></>
                                )}
                              </div>
                            ) : (
                              "-"
                            )}
                          </td>
                        </tr>
                        {dt?.allData?.guestList?.length > 0 &&
                          dt?.allData?.guestList?.map((guest, guestKey) => (
                            <tr
                              key={guestKey}
                              style={{
                                backgroundColor: isOddIndex ? "#f9f9f9" : "#ffffff", // Same color as the parent row
                              }}
                            >
                              <td>{`${guest?.username} (Guest ${guestKey + 1})`}</td>
                              <td>{guest?.servicename}</td>
                              <td>{guest?.employeename}</td>
                              <td>{calculateTime(guest)}</td>
                              <td>{guest?.hour * 60 + guest?.minutes} min</td>
                              <td>
                                {guest?.cancel_by_type === "serviceProvider" ? (
                                  <span style={{ color: "red" }}>-${guest?.charges}</span>
                                ) : guest?.cancel_by_type === "user" ? (
                                  <>
                                    {guest?.user_cancellation_charge == 0 ? (
                                      <span>-${Math.floor(guest?.user_cancellation_charge)}</span>
                                    ) : (
                                      <span>${Math.floor(guest?.user_cancellation_charge)}</span>
                                    )}
                                  </>
                                ) : (
                                  <span>${guest?.charges}</span>
                                )}
                              </td>
                              <td>
                                {guest?.cancel_by_type ? (
                                  <div className="cancelled-block">
                                    {guest?.cancel_by_type === "serviceProvider" ? (
                                      <h4 style={{ color: "red" }} className="cancelled-text">
                                        Cancelled by Spa
                                      </h4>
                                    ) : guest?.cancel_by_type === "user" ? (
                                      <h4 style={{ color: "red" }} className="cancelled-text">
                                        Cancelled by User
                                      </h4>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                ) : (
                                  "-"
                                )}
                              </td>
                            </tr>
                          ))}
                        {/* Add total row for each user and their guests */}
                        <tr
                          style={{
                            backgroundColor: isOddIndex ? "#f9f9f9" : "#ffffff", // Same color as the parent row
                          }}
                        >
                          <td colSpan="6" style={{ textAlign: "right" }}>
                            <div style={{
                            width:"100%",
                            textAlign: "end",display: "flex",justifyContent: "end",
                          }}>
                              <div className="text-start">
                                <strong>Total Amount</strong>
                                <p style={{ color: "red", fontSize: "10px" }}>
                                  Including all the additional charges, If applicable.
                                </p>
                              </div>
                            </div>
                          </td>
                          <td colSpan="2">
                            <strong>${Math.floor(dt?.totalCount)}</strong>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </Table>
            </TableWrapperMain>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PaymentReminder;
