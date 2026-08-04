import moment from "moment";
import { Modal } from "react-bootstrap";
import { Image } from "@/styles/global/main.style";
import { userDummyImage } from "@/utils/constants";

const UserInfo = ({
  show,
  onHide = () => { },
  details
}) => {

  return (
    <>
      <Modal
        show={show}
        onHide={() => onHide()}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        centered
        className="sitback-modal-wrapper sitback-payment-reminder-modal"
      >
        <Modal.Header closeButton className="red-close-icon" onClick={() => onHide()} style={{zIndex: "9"}}>
        </Modal.Header>
        <Modal.Body className="pt-0" style={{marginTop:'-35px'}}>
          <div className="payment-reminder-section">
            <h2>Failed Payment</h2>
            <div className="Payment-detail-wrapper">
              <div className="header-text">
                <h3>{moment(details?.date)?.format("dddd, MMM DD, YYYY")}</h3>
              </div>
              <div className="failed-payment-detail-wrapper">
                <div className="user-detail-wrapper">
                  <div>
                    <div className="user-img">
                      <Image
                        radius={50}
                        src={details?.userimage || userDummyImage}
                        alt="sitback"
                        onError={(e) => {
                          e.target.src = userDummyImage;
                        }}
                      />
                    </div>
                  </div>
                  <div className="user-info-detail-columns">

                    <div>
                      <h6>{details?.username}</h6>
                      <a>{details?.useremail}</a>
                    </div>
                    <div className="user-detail-wrapper number-block-wrapper">
                      <div>
                        <div className="phone-text">
                          <h6>Phone Number</h6>
                          <a>{details?.usercountrycode} {details?.userphone}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserInfo;
