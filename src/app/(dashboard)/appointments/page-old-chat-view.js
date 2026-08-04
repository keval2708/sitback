"use client";

import { Col, Container, Row } from "react-bootstrap";
import InlineSVG from "svg-inline-react";
import {
  MainLayoutWrapper,
} from '@/styles/global/main.style';
import {
  AppointmentsLayoutWrapper,
  QuickChatBoxWrapper,
} from '@/styles/pages/appointments.style';
import {
  backarrow_icon,
  sendmsg_icon,
} from "@/styles/svgs";

export default function FAQS() {
  return (
    <>
      <MainLayoutWrapper>
        <AppointmentsLayoutWrapper>
          <Container>
            <Row>
              <Col md={7} lg={8}>
                <Row>
                  <Col md={6} lg={5}>
                    <div className="box-wrapper-div">
                      <h5>Appointments Booked: Nov</h5>
                      <div className="checkbox-list-wrapper">
                        <div className="checkbox-wrapper-div">
                          <input type="checkbox" id="toggle-btn1" name="toggle-btn1" checked />
                          <label htmlFor="toggle-btn1">
                            <span></span>
                            <p>10:00 AM</p>
                          </label>
                        </div>
                        <div className="checkbox-wrapper-div">
                          <input type="checkbox" id="toggle-btn2" name="toggle-btn2" />
                          <label htmlFor="toggle-btn2">
                            <span></span>
                            <p>11:00 AM</p>
                          </label>
                        </div>
                        <div className="checkbox-wrapper-div">
                          <input type="checkbox" id="toggle-btn3" name="toggle-btn3" />
                          <label htmlFor="toggle-btn3">
                            <span></span>
                            <p>70:00 PM</p>
                          </label>
                        </div>
                        <div className="checkbox-wrapper-div">
                          <input type="checkbox" id="toggle-btn4" name="toggle-btn4" />
                          <label htmlFor="toggle-btn4">
                            <span></span>
                            <p>8:00 PM</p>
                          </label>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} lg={7}>
                    <div className="box-wrapper-div">
                      <h5>Available Appointments: Nov. 9</h5>
                      <div className="checkbox-list-wrapper available-times">
                        <div className="checkbox-wrapper-div">
                          <input type="checkbox" id="toggle-btn5" name="toggle-btn5" checked />
                          <label htmlFor="toggle-btn5">
                            <p>12:00 PM</p>
                          </label>
                        </div>
                        <div className="checkbox-wrapper-div">
                          <input type="checkbox" id="toggle-btn6" name="toggle-btn6" />
                          <label htmlFor="toggle-btn6">
                            <p>01:00 PM</p>
                          </label>
                        </div>
                        <div className="checkbox-wrapper-div">
                          <input type="checkbox" id="toggle-btn7" name="toggle-btn7" />
                          <label htmlFor="toggle-btn7">
                            <p>02:00 PM</p>
                          </label>
                        </div>
                        <div className="checkbox-wrapper-div">
                          <input type="checkbox" id="toggle-btn8" name="toggle-btn8" />
                          <label htmlFor="toggle-btn8">
                            <p>03:00 PM</p>
                          </label>
                        </div>
                        <div className="checkbox-wrapper-div">
                          <input type="checkbox" id="toggle-btn9" name="toggle-btn9" />
                          <label htmlFor="toggle-btn9">
                            <p>05:00 PM</p>
                          </label>
                        </div>
                        <div className="checkbox-wrapper-div">
                          <input type="checkbox" id="toggle-btn10" name="toggle-btn10" />
                          <label htmlFor="toggle-btn10">
                            <p>06:00 PM</p>
                          </label>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="box-wrapper-div">
                  Add calendar
                </div>
              </Col>
              <Col md={5} lg={4}>
                <div className="box-wrapper-div">
                  <h5 className="mb-1">Upcoming Schedules</h5>
                  <p className="schedule-text">Daily Schedule for your sitback clients</p>
                </div>
                <div className="box-wrapper-div">
                  <QuickChatBoxWrapper>
                    <div className="quick-chat-list-wrapper">
                      <div>
                        <div className="user-img-wrapper">
                        </div>
                      </div>
                      <div className="user-detail-wrapper">
                        <h3>Sebastian F.</h3>
                        <p>Premium Member</p>
                      </div>
                    </div>
                    <div className="schedules-time-detail">
                      <div className="schedules-text">
                        <h6>Time</h6>
                        <ul><li>Friday, Nov 9, 2023</li><li>11am - 12:30pm</li></ul>
                      </div>
                      <div className="schedules-text">
                        <h6>Services</h6>
                        <ul><li>ABC Massage</li></ul>
                      </div>
                    </div>
                  </QuickChatBoxWrapper>
                  <QuickChatBoxWrapper>
                    <div className="quick-chat-list-wrapper">
                      <div>
                        <div className="user-img-wrapper">
                          {/* <Image alt="sitback" src="/images/" /> */}
                        </div>
                      </div>
                      <div className="user-detail-wrapper">
                        <h3>Sebastian F.</h3>
                        <p>Premium Member</p>
                      </div>
                    </div>
                    <div className="schedules-time-detail">
                      <div className="schedules-text">
                        <h6>Time</h6>
                        <ul><li>Friday, Nov 9, 2023</li><li>11am - 12:30pm</li></ul>
                      </div>
                      <div className="schedules-text">
                        <h6>Services</h6>
                        <ul><li>ABC Massage</li></ul>
                      </div>
                    </div>
                  </QuickChatBoxWrapper>
                </div>
                <div className="chatbox-wrapper-div">
                  <div className="chat-headerbar">
                    <h6>Quick Chat</h6>
                  </div>
                  <div className="box-wrapper-div ">
                    <QuickChatBoxWrapper className="userlist-wrapper">
                      <div className="quick-chat-list-wrapper">
                        <div>
                          <div className="user-img-wrapper">
                            {/* <Image alt="sitback" src="/images/" /> */}
                          </div>
                        </div>
                        <div className="user-detail-wrapper">
                          <h3>Sebastian F.</h3>
                          <p>Premium Member</p>
                        </div>
                      </div>
                      <span className="timetext">1m ago.</span>
                    </QuickChatBoxWrapper>
                    <QuickChatBoxWrapper className="userlist-wrapper">
                      <div className="quick-chat-list-wrapper">
                        <div>
                          <div className="user-img-wrapper">
                            {/* <Image alt="sitback" src="/images/" /> */}
                          </div>
                        </div>
                        <div className="user-detail-wrapper">
                          <h3>Suzzane D.</h3>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
                        </div>
                      </div>
                      <span className="timetext">6d ago.</span>
                    </QuickChatBoxWrapper>
                    <QuickChatBoxWrapper className="userlist-wrapper">
                      <div className="quick-chat-list-wrapper">
                        <div>
                          <div className="user-img-wrapper">
                            {/* <Image alt="sitback" src="/images/" /> */}
                          </div>
                        </div>
                        <div className="user-detail-wrapper">
                          <h3>Sara Dragomir</h3>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
                        </div>
                      </div>
                      <span className="timetext">1w ago.</span>
                    </QuickChatBoxWrapper>
                    <QuickChatBoxWrapper className="userlist-wrapper">
                      <div className="quick-chat-list-wrapper">
                        <div>
                          <div className="user-img-wrapper">
                            {/* <Image alt="sitback" src="/images/" /> */}
                          </div>
                        </div>
                        <div className="user-detail-wrapper">
                          <h3>Mark Henry</h3>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
                        </div>
                      </div>
                      <span className="timetext">10 mo ago.</span>
                    </QuickChatBoxWrapper>
                    <QuickChatBoxWrapper className="userlist-wrapper">
                      <div className="quick-chat-list-wrapper">
                        <div>
                          <div className="user-img-wrapper">
                            {/* <Image alt="sitback" src="/images/" /> */}
                          </div>
                        </div>
                        <div className="user-detail-wrapper">
                          <h3>Darrel Oliver</h3>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                        </div>
                      </div>
                      <span className="timetext">1y ago.</span>
                    </QuickChatBoxWrapper>
                    <QuickChatBoxWrapper className="userlist-wrapper">
                      <div className="quick-chat-list-wrapper">
                        <div>
                          <div className="user-img-wrapper">
                            {/* <Image alt="sitback" src="/images/" /> */}
                          </div>
                        </div>
                        <div className="user-detail-wrapper">
                          <h3>Andreas Praza</h3>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                        </div>
                      </div>
                      <span className="timetext">2y ago.</span>
                    </QuickChatBoxWrapper>
                    <QuickChatBoxWrapper className="userlist-wrapper">
                      <div className="quick-chat-list-wrapper">
                        <div>
                          <div className="user-img-wrapper">
                            {/* <Image alt="sitback" src="/images/" /> */}
                          </div>
                        </div>
                        <div className="user-detail-wrapper">
                          <h3>Sebastian F.</h3>
                          <p>Premium Member</p>
                        </div>
                      </div>
                      <span className="timetext">1m ago.</span>
                    </QuickChatBoxWrapper>
                    <QuickChatBoxWrapper className="userlist-wrapper">
                      <div className="quick-chat-list-wrapper">
                        <div>
                          <div className="user-img-wrapper">
                            {/* <Image alt="sitback" src="/images/" /> */}
                          </div>
                        </div>
                        <div className="user-detail-wrapper">
                          <h3>Suzzane D.</h3>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
                        </div>
                      </div>
                      <span className="timetext">6d ago.</span>
                    </QuickChatBoxWrapper>
                    <QuickChatBoxWrapper className="userlist-wrapper">
                      <div className="quick-chat-list-wrapper">
                        <div>
                          <div className="user-img-wrapper">
                            {/* <Image alt="sitback" src="/images/" /> */}
                          </div>
                        </div>
                        <div className="user-detail-wrapper">
                          <h3>Sara Dragomir</h3>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
                        </div>
                      </div>
                      <span className="timetext">1w ago.</span>
                    </QuickChatBoxWrapper>
                    <QuickChatBoxWrapper className="userlist-wrapper">
                      <div className="quick-chat-list-wrapper">
                        <div>
                          <div className="user-img-wrapper">
                            {/* <Image alt="sitback" src="/images/" /> */}
                          </div>
                        </div>
                        <div className="user-detail-wrapper">
                          <h3>Mark Henry</h3>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
                        </div>
                      </div>
                      <span className="timetext">10 mo ago.</span>
                    </QuickChatBoxWrapper>
                    <QuickChatBoxWrapper className="userlist-wrapper">
                      <div className="quick-chat-list-wrapper">
                        <div>
                          <div className="user-img-wrapper">
                            {/* <Image alt="sitback" src="/images/" /> */}
                          </div>
                        </div>
                        <div className="user-detail-wrapper">
                          <h3>Darrel Oliver</h3>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                        </div>
                      </div>
                      <span className="timetext">1y ago.</span>
                    </QuickChatBoxWrapper>
                    <QuickChatBoxWrapper className="userlist-wrapper">
                      <div className="quick-chat-list-wrapper">
                        <div>
                          <div className="user-img-wrapper">
                            {/* <Image alt="sitback" src="/images/" /> */}
                          </div>
                        </div>
                        <div className="user-detail-wrapper">
                          <h3>Andreas Praza</h3>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                        </div>
                      </div>
                      <span className="timetext">2y ago.</span>
                    </QuickChatBoxWrapper>
                  </div>
                </div>
                <div className="chatbox-wrapper-div">
                  <div className="chat-headerbar">
                    <h6>Quick Chat</h6>
                  </div>
                  <div className="chatinnerbox-wrapper">
                    <QuickChatBoxWrapper className="chat-inner-headerbar mb-0">
                      <div className="quick-chat-list-wrapper">
                        <InlineSVG
                          src={backarrow_icon}
                          className="global_laguage_icon"
                        />
                        <div>
                          <div className="user-img-wrapper">
                            {/* <Image alt="sitback" src="/images/" /> */}
                          </div>
                        </div>
                        <div className="user-detail-wrapper">
                          <h3>Sebastian F.</h3>
                          <p>Premium Member</p>
                        </div>
                      </div>
                      <div className="massage-detail-wrapper">
                        <p>Therapeutic Massage</p>
                        <ul><li>Nov. 9, 2023</li><li>10am - 11am</li></ul>
                      </div>
                    </QuickChatBoxWrapper>
                    <div className="user-chat-box-body-wrapper">
                      <div className="user-chat-box-list right-box">
                        <div className="chatbox">
                          <p>Hi Brian!</p>
                        </div>
                      </div>
                      <div className="user-chat-box-list right-box">
                        <div className="chatbox">
                          <p>This text confirms your 60-minute therapeutic massage today at 11 AM.</p>
                        </div>
                      </div>
                      <div className="user-chat-box-list left-box">
                        <div className="chatbox">
                          <p>Thank you so much! </p>
                        </div>
                      </div>
                      <div className="user-chat-box-list right-box">
                        <div className="chatbox">
                          <p>Please arrive on location 15 min prior to 11 AM.</p>
                        </div>
                      </div>
                      <div className="user-chat-box-list left-box">
                        <div className="chatbox">
                          <p>Okay great! One question, do you have any recommendations for parking?</p>
                        </div>
                      </div>
                      <div className="user-chat-box-list right-box">
                        <div className="chatbox">
                          <p>Hi Brian!</p>
                        </div>
                      </div>
                      <div className="user-chat-box-list right-box">
                        <div className="chatbox">
                          <p>This text confirms your 60-minute therapeutic massage today at 11 AM.</p>
                        </div>
                      </div>
                      <div className="user-chat-box-list left-box">
                        <div className="chatbox">
                          <p>Thank you so much! </p>
                        </div>
                      </div>
                      <div className="user-chat-box-list right-box">
                        <div className="chatbox">
                          <p>Please arrive on location 15 min prior to 11 AM.</p>
                        </div>
                      </div>
                      <div className="user-chat-box-list left-box">
                        <div className="chatbox">
                          <p>Okay great! One question, do you have any recommendations for parking?</p>
                        </div>
                      </div>
                    </div>
                    <div className="chat-footer-wrapper">
                      <div className="input-wrapper">
                        <input placeholder="Type messages..." />
                      </div>
                      <button type="submit">
                        <InlineSVG
                          src={sendmsg_icon}
                          className="global_laguage_icon"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </AppointmentsLayoutWrapper>
      </MainLayoutWrapper>
    </>
  )
}
