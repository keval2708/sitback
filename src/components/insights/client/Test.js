"use client";
import { Col, Dropdown, Form, Row, Table } from "react-bootstrap";
import ReactSelect from 'react-select';
import InlineSVG from "svg-inline-react";
import {
  Button,
  FormGroup,
  Input,
  Label,
  Select,
} from "@/styles/global/main.style";
import { ClientAddLayoutTableWrapper } from "@/styles/pages/client.style";
import { MoreCircle_icon, Search_icon, UploadcsvDownload_icon, Uploadcsv_icon } from "@/styles/svgs";


export const ClientTest = () => {
  const options = [
    { value: 'chocolate', label: 'Most Spenders Report' },
    { value: 'strawberry', label: 'Most Cancellations Report' },
    { value: 'vanilla', label: 'Most Spenders Report' }
  ]
  return (
    <div className="">
      <ClientAddLayoutTableWrapper>
        <div className="searchfilter">
          <h4>Search client by</h4>
          <div className="search-clientby-header-bar">
            <div className="header-wrapper">
              <Select aria-label="Default select example">
                <option value="company">All Fields</option>
                <option value="individual">All Fields1</option>
              </Select>
              <div className="search-input-icon-wrapper">
                <Input
                  type="text"
                  placeholder="Search"
                  className=""
                />
                <InlineSVG src={Search_icon} className="global_laguage_icon" />
              </div>
              <button className="addnew-client">Add New Client  +</button>
            </div>
            <div className="uploadcsv-btn-wrapper">
              <button className="uploadcsv-file-wrapper">Upload .csv <InlineSVG src={Uploadcsv_icon} className="global_laguage_icon" /></button>
              <button className="uploadcsv-file-wrapper download">Download .csv <InlineSVG src={UploadcsvDownload_icon} className="global_laguage_icon" /></button>
            </div>
          </div>
        </div>
        <div className="sitback-history-table-wrapper addnew-client-wrapper">
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
                <th>Birthday</th>
                <th>Phone #</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="">Addie, Hannah</td>
                <td className="">10010651</td>
                <td className="">Jun 19</td>
                <td className="">(503) 702-5798</td>
                <td className="">hannahabdie12@gmail.com</td>
                <td className="">
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      <InlineSVG src={MoreCircle_icon} className="global_laguage_icon" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Notes</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">History</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Edit</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
              <tr>
                <td className="">Addie, Hannah</td>
                <td className="">10010651</td>
                <td className="">Jun 19</td>
                <td className="">(503) 702-5798</td>
                {/* <td className="">4735 N Scottsdale Rd</td> */}
                <td className="">hannahabdie12@gmail.com</td>
                <td className="">
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      <InlineSVG src={MoreCircle_icon} className="global_laguage_icon" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Notes</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">History</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Edit</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
              <tr>
                <td className="">Addie, Hannah</td>
                <td className="">10010651</td>
                <td className="">Jun 19</td>
                <td className="">(503) 702-5798</td>
                {/* <td className="">4735 N Scottsdale Rd</td> */}
                <td className="">hannahabdie12@gmail.com</td>
                <td className="">
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      <InlineSVG src={MoreCircle_icon} className="global_laguage_icon" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Notes</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">History</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Edit</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </ClientAddLayoutTableWrapper>
      <ClientAddLayoutTableWrapper>
        <div className="table-header-bgfill">
          <h5>Reports-Clients</h5>
        </div>
        <div className="select-reports-box-wrapper">
          <FormGroup className="white-input-wrapper">
            <Label>Select Reports</Label>
            <ReactSelect
              options={options}
              className="sitback-select2-container"
              classNamePrefix="sitback-select-option"
              placeholder="Select reports"
            />
          </FormGroup>
        </div>
      </ClientAddLayoutTableWrapper>
      <ClientAddLayoutTableWrapper>
        <div className="table-header-bgfill">
          <h5>TOP Spenders report</h5>
        </div>
        <div className="select-reports-box-wrapper">
          <Row>
            <Col md={3}>
              <FormGroup className="white-input-wrapper">
                <Label>Date Range Start</Label>
                <Input
                  type="text"
                  placeholder="1/1/2023"
                  className=""
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup className="white-input-wrapper">
                <Label>Date Range End</Label>
                <Input
                  type="text"
                  placeholder="1/1/2023"
                  className=""
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup className="white-input-wrapper">
                <Label>Top</Label>
                <div className="clearfilter-btn-wrapper">
                  <ReactSelect options={options}
                    className="sitback-select2-container"
                    classNamePrefix="sitback-select-option"
                    placeholder="Select reports" />
                  <Button className="uploadcsv-file-wrapper">Clear filter</Button>
                </div>
              </FormGroup>
            </Col>
          </Row>
        </div>
        <div className="sitback-history-table-wrapper addnew-client-wrapper">
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Client</th>
                <th>Services Quantity</th>
                <th>Services Total</th>
                <th>Products Quantity</th>
                <th>Products Total</th>
                <th>Sales Total  %</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="">Addie, Hannah</td>
                <td className="">6</td>
                <td className="">$2,226.00</td>
                <td className="">0</td>
                <td className="">$0.00</td>
                <td className="">$2,226  1.27%</td>
              </tr>
              <tr>
                <td className="">Addie, Hannah</td>
                <td className="">6</td>
                <td className="">$2,226.00</td>
                <td className="">0</td>
                <td className="">$0.00</td>
                <td className="">$2,226  1.27%</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </ClientAddLayoutTableWrapper>
      <ClientAddLayoutTableWrapper>
        <div className="table-header-bgfill">
          <h5>Most Cancellations report</h5>
        </div>
        <div className="select-reports-box-wrapper">
          <Row>
            <Col>
              <FormGroup className="white-input-wrapper">
                <Label>Date Range Start</Label>
                <Input
                  type="text"
                  placeholder="1/1/2023"
                  className=""
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="white-input-wrapper">
                <Label>Date Range End</Label>
                <Input
                  type="text"
                  placeholder="1/1/2023"
                  className=""
                />
              </FormGroup>
            </Col>
          </Row>
        </div>
        <div className="sitback-history-table-wrapper addnew-client-wrapper">
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Cancel Date/Time</th>
                <th>Cancelled By</th>
                <th>Appt Date</th>
                <th>Time</th>
                <th>Type</th>
                <th>Client</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="">2/29/2024   1:59:43 PM</td>
                <td className="">User- App</td>
                <td className="">2/29/2024</td>
                <td className="">3:00 PM</td>
                <td className="">Facial & Peel</td>
                <td className="">Addie, Hannah</td>
              </tr>
              <tr>
                <td className="">2/29/2024   1:59:43 PM</td>
                <td className="">User- App</td>
                <td className="">2/29/2024</td>
                <td className="">3:00 PM</td>
                <td className="">Facial & Peel</td>
                <td className="">Addie, Hannah</td>
              </tr>
              <tr>
                <td className="">2/29/2024   1:59:43 PM</td>
                <td className="">User- App</td>
                <td className="">2/29/2024</td>
                <td className="">3:00 PM</td>
                <td className="">Facial & Peel</td>
                <td className="">Addie, Hannah</td>
              </tr>
              <tr>
                <td className="">2/29/2024   1:59:43 PM</td>
                <td className="">User- App</td>
                <td className="">2/29/2024</td>
                <td className="">3:00 PM</td>
                <td className="">Facial & Peel</td>
                <td className="">Addie, Hannah</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </ClientAddLayoutTableWrapper>
      <ClientAddLayoutTableWrapper>
        <div className="table-header-bgfill">
          <h5>History- <span>Hanna Addie </span></h5>
        </div>
        <div className="">
          <div className="searchfilter">
            <h4 className="mb-0">Member History</h4>
          </div>
          <div className="sitback-history-table-wrapper addnew-client-wrapper">
            <Table striped hover responsive>
              <thead>
                <tr>
                  <th>Visits</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="">First Visit</td>
                  <td className="">12/2/2024</td>
                </tr>
                <tr>
                  <td className="">Last Visit</td>
                  <td className="">12/2/2024</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
        <div className="">
          <div className="searchfilter">
            <h4 className="mb-0">Purchase History</h4>
          </div>
          <div className="sitback-history-table-wrapper addnew-client-wrapper">
            <Table striped hover responsive>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="">Massage Oil</td>
                  <td className="">$125.00</td>
                  <td className="">12/2/2024</td>
                </tr>
                <tr>
                  <td className="">Massage Oil</td>
                  <td className="">$125.00</td>
                  <td className="">12/2/2024</td>
                </tr>
                <tr>
                  <td className="">Massage Oil</td>
                  <td className="">$125.00</td>
                  <td className="">12/2/2024</td>
                </tr>
                <tr>
                  <td className="">Massage Oil</td>
                  <td className="">$125.00</td>
                  <td className="">12/2/2024</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </ClientAddLayoutTableWrapper>
      <ClientAddLayoutTableWrapper>
        <div className="table-header-bgfill">
          <h5>Notes- <span>Hanna Addie </span></h5>
          <button className="addnew-client">Add New Client  +</button>
        </div>
        <div className="">
          <div className="searchfilter">
            <h4 className="mb-0">Client Notes</h4>
          </div>
          <div className="sitback-history-table-wrapper addnew-client-wrapper">
            <Table striped hover responsive>
              <thead>
                <tr>
                  <th>Sr.</th>
                  <th>Title </th>
                  <th>Description </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="">1</td>
                  <td className="">First heading</td>
                  <td className="">Description comes here....</td>
                </tr>
                <tr>
                  <td className="">2</td>
                  <td className="">First heading</td>
                  <td className="">Description comes here....</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </ClientAddLayoutTableWrapper>
      <ClientAddLayoutTableWrapper>
        <div className="table-header-bgfill">
          <h5>Notes- <span>Hanna Addie </span></h5>
          <button className="addnew-client">Add New Client  +</button>
        </div>
        <div className="select-reports-box-wrapper">
          <FormGroup className="white-input-wrapper">
            <Label>Add title</Label>
            <Input
              type="text"
              placeholder="Add note title"
              className=""
            />
          </FormGroup>
          <FormGroup className="white-input-wrapper">
            <Label>Description</Label>
            <Input
              type="text"
              placeholder="Your text here..."
              className=""
              as="textarea"
              rows={5}
            />
          </FormGroup>
        </div>
      </ClientAddLayoutTableWrapper>
      <ClientAddLayoutTableWrapper>
        <div className="select-reports-box-wrapper sibback-insights-add-clients">
          <Form>
            <Row>
              <Col sm={6}>
                <FormGroup className="white-input-wrapper">
                  <Label>Full Name</Label>
                  <Input
                    type="text"
                    placeholder="Will smith"
                    className=""
                  />
                </FormGroup>
              </Col>
              <Col sm={6}>
                <FormGroup className="white-input-wrapper">
                  <Label>Email</Label>
                  <Input
                    type="text"
                    placeholder="willsmith112@gmail.com"
                    className=""
                  />
                </FormGroup>
              </Col>
              <Col sm={6}>
                <FormGroup className="white-input-wrapper">
                  <Label>Phone Number</Label>
                  <Input
                    type="text"
                    placeholder="(000) 000-000"
                    className=""
                  />
                </FormGroup>
              </Col>
              <Col sm={6}>
                <FormGroup className="white-input-wrapper">
                  <Label>Birthday</Label>
                  <Input
                    type="text"
                    placeholder="December, 20"
                    className=""
                  />
                </FormGroup>
              </Col>
              <Col sm={6}>
                <FormGroup className="white-input-wrapper">
                  <Label>Address</Label>
                  <Input
                    type="text"
                    placeholder="Address here"
                    className=""
                  />
                </FormGroup>
              </Col>
            </Row>
            <div className="save-btn-wrapper">
              <Button>Save</Button>
            </div>
          </Form>
        </div>
      </ClientAddLayoutTableWrapper>
    </div>
  );
};
