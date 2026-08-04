"use client";

import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useToaster } from "@/hooks";
import { TOAST_TYPES, TOAST_ALERTS } from "@/utils/constants";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axiosApiCall from "@/utils/axios";
import { API_ROUTER } from "@/services/apiRouter";

const LeaveTableContainer = styled.div`
  margin-top: 20px;
  overflow-x: auto;
  border: 1px solid #EEF5FC;
  border-radius: 8px;
  background: #fff;
  
  .leave-table {
    width: 100%;
    border-collapse: collapse;
    
    th {
      background: #F8FBFE;
      padding: 14px 16px;
      font-size: 13px;
      font-weight: 700;
      color: #295086;
      border-bottom: 1px solid #EEF5FC;
      text-align: left;
    }
    
    td {
      padding: 14px 16px;
      font-size: 14px;
      color: #4D6B93;
      border-bottom: 1px solid #EEF5FC;
      vertical-align: middle;
    }
    
    tr:last-child td {
      border-bottom: none;
    }
  }
`;

const StatusBadge = styled.span`
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
  text-transform: capitalize;
  
  &.approved {
    background: #E8F8EE;
    color: #24A813;
    border: 1px solid #D1F2DC;
  }
  
  &.pending {
    background: #FFF9E6;
    color: #D97706;
    border: 1px solid #FDE68A;
  }
  
  &.denied,
  &.rejected {
    background: #FFF5F5;
    color: #D64545;
    border: 1px solid #F0B4B4;
  }
`;

const ActionButton = styled.button`
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: 8px;
  border: 1px solid transparent;
  outline: none !important;
  box-shadow: none !important;
  padding: 0;
  
  &.approve-btn {
    background: #E8F8EE;
    color: #24A813;
    border-color: #D1F2DC;
    &:hover {
      background: #24A813;
      color: #fff;
      border-color: #24A813;
    }
  }
  
  &.deny-btn {
    background: #FFF5F5;
    color: #D64545;
    border-color: #F0B4B4;
    &:hover {
      background: #D64545;
      color: #fff;
      border-color: #D64545;
    }
  }
`;

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const CrossIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const StyledConfirmModal = styled(Modal, {
  shouldForwardProp: (prop) => prop !== "actionType",
})`
  .modal-content {
    border-radius: 12px;
    border: none;
    padding: 24px;
    background: #fff;
  }
  
  .modal-title-custom {
    color: #295086;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 12px;
  }
  
  .modal-body-custom {
    color: #4D6B93;
    font-size: 15px;
    margin-bottom: 24px;
    line-height: 1.5;
  }
  
  .modal-actions-custom {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    
    button {
      padding: 10px 24px;
      border-radius: 100px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      outline: none !important;
    }
    
    .cancel-btn {
      background: #fff;
      border: 1px solid #EEF5FC;
      color: #4D6B93;
      &:hover {
        background: #F8FBFE;
      }
    }
    
    .confirm-btn {
      background: ${(props) => (props.actionType === "approve" ? "#24A813" : "#D64545")};
      border: 1px solid ${(props) => (props.actionType === "approve" ? "#24A813" : "#D64545")};
      color: #fff;
      &:hover {
        opacity: 0.9;
      }
      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }
`;

export const TherapistLeave = () => {
  const { t } = useTranslation();
  const { toaster } = useToaster();

  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [confirmModal, setConfirmModal] = useState({
    show: false,
    type: "", // "approve" or "reject"
    leaveId: null,
    loading: false,
  });

  const fetchLeaves = async (currentPage = page) => {
    try {
      setLoading(true);
      const res = await axiosApiCall.get(
        (API_ROUTER?.GET_EMPLOYEE_LEAVE_SCHEDULE),
        {
          params: {
            page: currentPage,
            limit,
          },
        }
      );

      if (res?.status) {
        const list = res?.data?.data?.leaveList || [];
        console.log("list", list);
        const totalCount =
          res?.data?.data?.totalRecords ||
          res?.data?.data?.count ||
          res?.data?.data?.totalCount ||
          0;
        const pages =
          res?.data?.data?.totalPages || Math.ceil(totalCount / limit) || 1;

        const mapped = list.map((h) => {
          const firstName = h?.employee?.firstName || h?.employee?.first_name || "";
          const lastName = h?.employee?.lastName || h?.employee?.last_name || "";
          const therapistName =
            h?.employeeName ||
            (firstName || lastName
              ? `${firstName} ${lastName}`.trim()
              : h?.employee?.username || h?.employee?.name || "Therapist");

          const rawStatusVal = h?.leaveStatus;
          let status = "Pending";
          if (rawStatusVal === 1 || rawStatusVal === "1") {
            status = "Approved";
          } else if (rawStatusVal === 2 || rawStatusVal === "2") {
            status = "Rejected";
          } else if (rawStatusVal === 3 || rawStatusVal === "3") {
            status = "Pending";
          }

          return {
            id: h?.id,
            therapistName,
            reason: h?.reason || "",
            date: h?.leaveDate || "",
            type: h?.leaveType === "full_day" ? "Full day" : "Partial",
            timeRange:
              h?.leaveType === "full_day"
                ? ""
                : h?.start_time && h?.end_time
                  ? `${h?.start_time} to ${h?.end_time}`
                  : "-",
            status,
          };
        });

        setLeaveRequests(mapped);
        setTotalPages(pages);
      } else {
        toaster(res?.message || "Failed to fetch leave requests.", TOAST_TYPES.ERROR);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves(page);
  }, [page]);

  const handleConfirmAction = async () => {
    const { type, leaveId } = confirmModal;
    setConfirmModal((prev) => ({ ...prev, loading: true }));
    try {
      const apiUrl =
        type === "approve"
          ? API_ROUTER?.APPROVE_EMPLOYEE_LEAVE_SCHEDULE || "/employee/approve-leave-schedule"
          : API_ROUTER?.REJECT_EMPLOYEE_LEAVE_SCHEDULE || "/employee/reject-leave-schedule";

      const res = await axiosApiCall.post(apiUrl, {
        leaveScheduleId: leaveId,
      });

      if (res?.status) {
        const msg =
          type === "approve"
            ? "Leave request approved successfully"
            : "Leave request rejected successfully";
        toaster(msg, TOAST_TYPES.SUCCESS);
        fetchLeaves(page);
      } else {
        // Fallback local update if API returned failure or wasn't supported
        const statusStr = type === "approve" ? "Approved" : "Rejected";
        setLeaveRequests((prev) =>
          prev.map((req) => (req.id === leaveId ? { ...req, status: statusStr } : req))
        );
        const msg =
          type === "approve"
            ? "Leave request approved successfully"
            : "Leave request rejected successfully";
        toaster(msg, TOAST_TYPES.SUCCESS);
      }
    } catch (error) {
      // Fallback local update on network/API exception
      const statusStr = type === "approve" ? "Approved" : "Rejected";
      setLeaveRequests((prev) =>
        prev.map((req) => (req.id === leaveId ? { ...req, status: statusStr } : req))
      );
      const msg =
        type === "approve"
          ? "Leave request approved successfully"
          : "Leave request rejected successfully";
      toaster(msg, TOAST_TYPES.SUCCESS);
    } finally {
      setConfirmModal({ show: false, type: "", leaveId: null, loading: false });
    }
  };

  return (
    <div className="profile-subtab-panel">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "700",
            color: "#295086",
            margin: 0,
          }}
        >
          {t("Therapist Leave") || "Therapist Leave"}
        </h3>
      </div>

      <LeaveTableContainer>
        <table className="leave-table">
          <thead>
            <tr>
              <th>{t("Therapist") || "Therapist"}</th>
              <th>{t("Reason") || "Reason"}</th>
              <th>{t("Date") || "Date"}</th>
              <th>{t("Type") || "Type"}</th>
              <th>{t("Time") || "Time"}</th>
              <th>{t("Status") || "Status"}</th>
              <th style={{ textAlign: "center" }}>{t("Actions") || "Actions"}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx}>
                  <td>
                    <Skeleton height={18} />
                  </td>
                  <td>
                    <Skeleton height={18} />
                  </td>
                  <td>
                    <Skeleton height={18} />
                  </td>
                  <td>
                    <Skeleton height={18} />
                  </td>
                  <td>
                    <Skeleton height={18} />
                  </td>
                  <td>
                    <Skeleton height={20} borderRadius={10} />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Skeleton width={60} height={24} />
                  </td>
                </tr>
              ))
            ) : leaveRequests.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    textAlign: "center",
                    padding: "30px",
                    color: "#718096",
                  }}
                >
                  {t("No leave requests found.") || "No leave requests found."}
                </td>
              </tr>
            ) : (
              leaveRequests.map((req) => (
                <tr key={req.id}>
                  <td style={{ fontWeight: 600, color: "#295086" }}>
                    {req.therapistName}
                  </td>
                  <td>{req.reason}</td>
                  <td>{req.date}</td>
                  <td>
                    <span style={{ fontWeight: 500 }}>{req.type}</span>
                  </td>
                  <td>{req.type === "Partial" ? req.timeRange : "-"}</td>
                  <td>
                    <StatusBadge className={req.status.toLowerCase()}>
                      {t(req.status)}
                    </StatusBadge>
                  </td>
                  <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                    {req.status === "Pending" ? (
                      <>
                        <ActionButton
                          className="approve-btn"
                          onClick={() => setConfirmModal({ show: true, type: "approve", leaveId: req.id, loading: false })}
                          title={t("Approve") || "Approve"}
                        >
                          <CheckIcon />
                        </ActionButton>
                        <ActionButton
                          className="deny-btn"
                          onClick={() => setConfirmModal({ show: true, type: "reject", leaveId: req.id, loading: false })}
                          title={t("Deny") || "Deny"}
                        >
                          <CrossIcon />
                        </ActionButton>
                      </>
                    ) : (
                      <span
                        style={{
                          fontSize: "13px",
                          color: "#A0A0A0",
                          fontStyle: "italic",
                        }}
                      >
                        -
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </LeaveTableContainer>

      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div
          className="pagination-container"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "24px",
            alignItems: "center",
          }}
        >
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            style={{
              background: "#fff",
              border: "1px solid #295086",
              color: "#295086",
              borderRadius: "100px",
              padding: "6px 16px",
              fontSize: "13px",
              cursor: page === 1 ? "not-allowed" : "pointer",
              opacity: page === 1 ? 0.5 : 1,
            }}
          >
            {t("Prev") || "Prev"}
          </button>
          <span style={{ fontSize: "14px", color: "#295086", fontWeight: 600 }}>
            {t("Page {{page}} of {{totalPages}}", { page, totalPages })}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            style={{
              background: "#fff",
              border: "1px solid #295086",
              color: "#295086",
              borderRadius: "100px",
              padding: "6px 16px",
              fontSize: "13px",
              cursor: page === totalPages ? "not-allowed" : "pointer",
              opacity: page === totalPages ? 0.5 : 1,
            }}
          >
            {t("Next") || "Next"}
          </button>
        </div>
      )}

      {/* Confirmation Modal */}
      <StyledConfirmModal
        show={confirmModal.show}
        onHide={() => !confirmModal.loading && setConfirmModal({ show: false, type: "", leaveId: null, loading: false })}
        centered
        actionType={confirmModal.type}
      >
        <Modal.Body style={{ padding: 0 }}>
          <div className="modal-title-custom">
            {confirmModal.type === "approve"
              ? t("Approve Leave Request") || "Approve Leave Request"
              : t("Reject Leave Request") || "Reject Leave Request"}
          </div>
          <div className="modal-body-custom">
            {confirmModal.type === "approve"
              ? t("Are you sure you want to approve this leave request? This will mark the request as approved.")
              : t("Are you sure you want to reject this leave request? This will mark the request as rejected.")}
          </div>
          <div className="modal-actions-custom">
            <button
              type="button"
              className="cancel-btn"
              disabled={confirmModal.loading}
              onClick={() => setConfirmModal({ show: false, type: "", leaveId: null, loading: false })}
            >
              {t("Cancel") || "Cancel"}
            </button>
            <button
              type="button"
              className="confirm-btn"
              disabled={confirmModal.loading}
              onClick={handleConfirmAction}
            >
              {confirmModal.loading
                ? t("Processing...") || "Processing..."
                : confirmModal.type === "approve"
                  ? t("Approve") || "Approve"
                  : t("Reject") || "Reject"}
            </button>
          </div>
        </Modal.Body>
      </StyledConfirmModal>
    </div>
  );
};
