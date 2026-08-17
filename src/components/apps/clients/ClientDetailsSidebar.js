"use client";

import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import {
  ClientSidebarAvatar,
  ClientSidebarBody,
  ClientSidebarCardItem,
  ClientSidebarContent,
  ClientSidebarDetailItem,
  ClientSidebarDetails,
  ClientSidebarHeader,
  ClientSidebarName,
  ClientSidebarOverlay,
  ClientSidebarPanel,
  ClientSidebarProfile,
  ClientSidebarProfileTop,
  ClientSidebarSection,
  ClientSidebarTabPanel,
  ClientSidebarTable,
  ClientSidebarTabs,
} from "@/styles/pages/apps-clients.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const TABS = [
  { id: "appointment", label: "Appointment" },
  { id: "purchase", label: "Purchase history" },
  { id: "cards", label: "Cards" },
];

const EDIT_ICON = `<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="17" cy="17" r="17" fill="#DEDFDF"/>
<path d="M23.0222 22.1718C23.4805 22.1719 23.8533 22.5494 23.8533 23.0136C23.8532 23.4786 23.4804 23.8553 23.0222 23.8554H18.325C17.8668 23.8553 17.494 23.4786 17.4939 23.0136C17.4939 22.5494 17.8668 22.1719 18.325 22.1718H23.0222ZM16.6482 9.83586C17.3989 8.87206 18.7083 8.78401 19.7644 9.62394L20.9783 10.5878C21.4757 10.9769 21.8072 11.4899 21.9207 12.0292C22.0515 12.6224 21.912 13.205 21.5193 13.7089L14.2918 23.0556C13.9601 23.48 13.4708 23.7186 12.947 23.7275L10.0672 23.7626C9.91011 23.7626 9.7789 23.657 9.74392 23.5068L9.08963 20.6679C8.97621 20.1463 9.0891 19.6069 9.42068 19.1913L14.5447 12.5595C14.632 12.4534 14.7896 12.4368 14.8943 12.5155L17.0506 14.2304C17.1902 14.3453 17.3821 14.4073 17.5828 14.3808C18.0103 14.3276 18.2983 13.9389 18.2547 13.5234C18.2285 13.3112 18.1237 13.1345 17.9842 13.0019C17.9406 12.9665 15.8946 11.3254 15.8894 11.3212C15.7586 11.2152 15.7322 11.0213 15.8367 10.8896L16.6482 9.83586Z" fill="#4D6B93"/>
</svg>
`;

const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return parts[0]?.slice(0, 2).toUpperCase() || "?";
};

const formatPhone = (phone, countrycode) => {
  if (!phone || phone === "0") return "-";
  const prefix = countrycode ? `(+${String(countrycode).replace(/\D/g, "")}) ` : "";
  const digits = String(phone).replace(/\D/g, "");
  if (digits.length === 10) {
    return `${prefix}(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return `${prefix}${phone}`;
};

const formatBirthday = (dob) => {
  if (!dob || dob === "Invalid date") return "-";
  const parsed = moment(dob);
  return parsed.isValid() ? parsed.format("MMMM D, YYYY") : "-";
};

const getCardMeta = (card) => {
  const brand =
    card?.brand ||
    card?.get_card_detail?.brand ||
    card?.get_card_detail?.name ||
    "Card";
  const last4 = card?.last4 || card?.get_card_detail?.last4 || "****";
  const isDefault =
    card?.isDefault == true ||
    card?.isDefault === "true" ||
    card?.status == 1 ||
    card?.get_card_detail?.status == 1;
  return { brand, last4, isDefault };
};

const getClientUserId = (client) =>
  client?.userId || client?.id || client?.user_id || null;

const getCustomerId = (client, detail) =>
  detail?.customerId ||
  client?.customerId ||
  detail?.id ||
  getClientUserId(client);

export default function ClientDetailsSidebar({ client, open, onClose, avatarColor }) {
  const { toaster } = useToaster();
  const toasterRef = useRef(toaster);
  const [activeTab, setActiveTab] = useState("appointment");
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [cards, setCards] = useState([]);
  const [tabLoading, setTabLoading] = useState(false);

  useEffect(() => {
    toasterRef.current = toaster;
  }, [toaster]);

  useEffect(() => {
    if (!open) {
      setActiveTab("appointment");
      setDetail(null);
      setAppointments([]);
      setPurchases([]);
      setCards([]);
    }
  }, [open]);

  const fetchClientDetail = useCallback(async () => {
    const userId = getClientUserId(client);
    if (!userId) return;

    setDetailLoading(true);
    try {
      const res = await axiosApiCall.get(`${API_ROUTER?.GET_CLIENT_DETAIL}/${userId}`);
      if (!res?.status) {
        toasterRef.current?.(res?.message, TOAST_TYPES.ERROR);
        return;
      }
      setDetail(res?.data?.data || null);
    } catch {
      toasterRef.current?.(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setDetailLoading(false);
    }
  }, [client]);

  const fetchAppointments = useCallback(async () => {
    const userId = getClientUserId(client);
    if (!userId) return;

    setTabLoading(true);
    try {
      const res = await axiosApiCall.get(`${API_ROUTER?.SERVICE_HISTORY_LIST}/${userId}`, {
        params: { page: 1, limit: 20 },
      });
      if (!res?.status) {
        setAppointments([]);
        return;
      }
      setAppointments(res?.data?.data?.records || []);
    } catch {
      setAppointments([]);
    } finally {
      setTabLoading(false);
    }
  }, [client]);

  const fetchPurchases = useCallback(async () => {
    const userId = getClientUserId(client);
    if (!userId) return;

    setTabLoading(true);
    try {
      const res = await axiosApiCall.get(`${API_ROUTER?.POS_HISTORY_LIST}/${userId}`, {
        params: { page: 1, limit: 20 },
      });
      if (!res?.status) {
        setPurchases([]);
        return;
      }
      setPurchases(res?.data?.data?.records || []);
    } catch {
      setPurchases([]);
    } finally {
      setTabLoading(false);
    }
  }, [client]);

  const fetchCards = useCallback(async () => {
    const customerId = getCustomerId(client, detail);
    if (!customerId) {
      setCards([]);
      return;
    }

    setTabLoading(true);
    try {
      const res = await axiosApiCall.get(
        `${API_ROUTER?.GET_CUSTOMER_CARD_DETAILS}?customerId=${customerId}`
      );
      if (!res?.status) {
        setCards([]);
        return;
      }
      const responseData = res?.data?.data;
      setCards(Array.isArray(responseData) ? responseData : responseData ? [responseData] : []);
    } catch {
      setCards([]);
    } finally {
      setTabLoading(false);
    }
  }, [client, detail]);

  useEffect(() => {
    if (!open || !client) return;
    fetchClientDetail();
  }, [open, client, fetchClientDetail]);

  useEffect(() => {
    if (!open || !client) return;

    if (activeTab === "appointment") {
      fetchAppointments();
    } else if (activeTab === "purchase") {
      fetchPurchases();
    } else if (activeTab === "cards") {
      fetchCards();
    }
  }, [activeTab, open, client, detail, fetchAppointments, fetchPurchases, fetchCards]);

  if (!open || !client) return null;

  const stopScrollPropagation = (event) => {
    event.stopPropagation();
  };

  const displayName = detail?.username || client?.username || "-";
  const avatarSrc = detail?.image || detail?.thumb_image || client?.image;

  const renderAppointmentTab = () => {
    if (tabLoading) {
      return <Skeleton count={4} height={42} style={{ marginBottom: 8 }} />;
    }

    if (!appointments.length) {
      return <p className="empty-text">No appointments found for this client.</p>;
    }

    return (
      <ClientSidebarTable>
        <thead>
          <tr>
            <th>Service</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((item, index) => (
            <tr key={item?.id || index}>
              <td>
                {item?.servicename || "-"}
                {item?.totalmin ? ` - ${item.totalmin} Min` : ""}
              </td>
              <td>{item?.charges != null ? `$${item.charges}` : "-"}</td>
              <td>{item?.date ? moment(item.date).format("MMM DD, YYYY") : "-"}</td>
            </tr>
          ))}
        </tbody>
      </ClientSidebarTable>
    );
  };

  const renderPurchaseTab = () => {
    if (tabLoading) {
      return <Skeleton count={4} height={42} style={{ marginBottom: 8 }} />;
    }

    if (!purchases.length) {
      return <p className="empty-text">No purchase history found for this client.</p>;
    }

    return (
      <ClientSidebarTable>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((item, index) => (
            <tr key={item?.id || index}>
              <td>{item?.productName || "-"}</td>
              <td>{item?.pcount ?? "-"}</td>
              <td>{item?.amount != null ? `$${item.amount}` : "-"}</td>
              <td>{item?.date ? moment(item.date).format("MMM DD, YYYY") : "-"}</td>
            </tr>
          ))}
        </tbody>
      </ClientSidebarTable>
    );
  };

  const renderCardsTab = () => {
    if (tabLoading) {
      return <Skeleton count={3} height={56} style={{ marginBottom: 8 }} />;
    }

    return (
      <ClientSidebarSection>
        <div className="section-header">
          <h4>Credit Cards</h4>
        </div>
        {cards.length ? (
          cards.map((card, index) => {
            const { brand, last4, isDefault } = getCardMeta(card);
            return (
              <ClientSidebarCardItem key={card?.id || card?.paymentId || index}>
                <div className="card-meta">
                  <strong>{brand}</strong>
                  <span>**** **** **** {last4}</span>
                </div>
                {isDefault ? <span className="default-badge">Default</span> : null}
              </ClientSidebarCardItem>
            );
          })
        ) : (
          <p className="empty-text">This client doesn&apos;t have any credit cards on file.</p>
        )}
      </ClientSidebarSection>
    );
  };

  return (
    <>
      <ClientSidebarOverlay onClick={onClose} onWheel={stopScrollPropagation} />
      <ClientSidebarPanel onMouseDown={(event) => event.stopPropagation()} onWheel={stopScrollPropagation}>
        <ClientSidebarHeader>
          <h2>Clients Detail</h2>
        </ClientSidebarHeader>

        <ClientSidebarBody>
          <ClientSidebarProfile>
            <ClientSidebarProfileTop>
              <button type="button" className="edit-btn" aria-label="Edit client">
                <span dangerouslySetInnerHTML={{ __html: EDIT_ICON }} />
              </button>
              <ClientSidebarAvatar $bg={avatarColor}>
                {avatarSrc ? (
                  <img src={avatarSrc} alt={displayName} />
                ) : (
                  getInitials(displayName)
                )}
              </ClientSidebarAvatar>
              <ClientSidebarName>
                {detailLoading ? <Skeleton width={160} height={24} /> : displayName}
              </ClientSidebarName>
            </ClientSidebarProfileTop>

            <ClientSidebarDetails>
              <ClientSidebarDetailItem>
                <label>Phone:</label>
                <p>
                  {detailLoading ? (
                    <Skeleton width={140} />
                  ) : (
                    formatPhone(detail?.phone || client?.phone, detail?.countrycode || client?.countrycode)
                  )}
                </p>
              </ClientSidebarDetailItem>
              <ClientSidebarDetailItem>
                <label>Email Address</label>
                <p>
                  {detailLoading ? <Skeleton width={180} /> : detail?.email || client?.email || "-"}
                </p>
              </ClientSidebarDetailItem>
              <ClientSidebarDetailItem>
                <label>Birthday</label>
                <p>
                  {detailLoading ? (
                    <Skeleton width={120} />
                  ) : (
                    formatBirthday(detail?.dob || client?.dob)
                  )}
                </p>
              </ClientSidebarDetailItem>
            </ClientSidebarDetails>
          </ClientSidebarProfile>

          <ClientSidebarContent>
            <ClientSidebarTabs>
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={activeTab === tab.id ? "active" : ""}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </ClientSidebarTabs>

            <ClientSidebarTabPanel>
              {activeTab === "appointment" ? renderAppointmentTab() : null}
              {activeTab === "purchase" ? renderPurchaseTab() : null}
              {activeTab === "cards" ? renderCardsTab() : null}
            </ClientSidebarTabPanel>
          </ClientSidebarContent>
        </ClientSidebarBody>
      </ClientSidebarPanel>
    </>
  );
}
