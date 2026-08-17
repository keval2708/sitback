"use client";

import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import InlineSVG from "svg-inline-react";
import NewAddClientModal from "@/components/appoiments/modal/NewAddClientModal";
import ClientDetailsSidebar from "@/components/apps/clients/ClientDetailsSidebar";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import {
  ClientsAddButton,
  ClientsAvatar,
  ClientsContent,
  ClientsEmptyState,
  ClientsHeader,
  ClientsNameCell,
  ClientsPage,
  ClientsSearchField,
  ClientsTable,
  ClientsTableCard,
  ClientsTableScroll,
  ClientsTitleBlock,
} from "@/styles/pages/apps-clients.style";
import { Search_icon_customer } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const AVATAR_COLORS = ["#295086", "#E8873A", "#4A9D77", "#7B5EA7", "#D4A017", "#3B82C4"];
const SKELETON_ROW_COUNT = 8;
const PAGE_LIMIT = 20;

const formatClientName = (username) => {
  if (!username) return "-";
  if (username.includes(",")) return username.trim();
  const parts = username.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  const firstName = parts[0];
  const lastName = parts.slice(1).join(" ");
  return `${lastName}, ${firstName}`;
};

const getInitials = (username) => {
  if (!username) return "?";
  if (username.includes(",")) {
    const [last, first] = username.split(",").map((part) => part.trim());
    return `${last?.[0] || ""}${first?.[0] || ""}`.toUpperCase();
  }
  const parts = username.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[parts.length - 1][0]}${parts[0][0]}`.toUpperCase();
};

const formatBirthday = (dob) => {
  if (!dob || dob === "Invalid date") return "-";
  const parsed = moment(dob);
  return parsed.isValid() ? parsed.format("MMM DD, YYYY") : "-";
};

const formatPhone = (phone) => {
  if (!phone || phone === "0") return "-";
  const digits = String(phone).replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits.startsWith("1")) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return phone;
};

const ClientsTableHeader = () => (
  <thead>
    <tr>
      <th>Name</th>
      <th>ID</th>
      <th>Birthday</th>
      <th>Phone#</th>
      <th>Email</th>
    </tr>
  </thead>
);

const ClientsSkeletonRows = ({ count = SKELETON_ROW_COUNT } = {}) =>
  Array.from({ length: count }).map((_, index) => (
    <tr key={`client-skeleton-${index}`}>
      <td>
        <ClientsNameCell>
          <Skeleton circle width={36} height={36} />
          <Skeleton width={140} height={14} />
        </ClientsNameCell>
      </td>
      <td>
        <Skeleton width={80} height={14} />
      </td>
      <td>
        <Skeleton width={100} height={14} />
      </td>
      <td>
        <Skeleton width={110} height={14} />
      </td>
      <td>
        <Skeleton width={180} height={14} />
      </td>
    </tr>
  ));

const resolveHasMore = ({ responseData, payload, page, loadedCount, pageCount }) => {
  const pagination = payload?.pagination ?? responseData?.pagination ?? {};

  const totalRecords = Number(
    pagination?.total ??
      payload?.totalRecords ??
      payload?.count ??
      payload?.total ??
      responseData?.totalRecords ??
      responseData?.count ??
      responseData?.total
  );

  if (Number.isFinite(totalRecords) && totalRecords > 0) {
    return loadedCount < totalRecords;
  }

  const totalPages = Number(
    pagination?.totalPages ??
      pagination?.total_pages ??
      payload?.totalPages ??
      payload?.lastPage ??
      responseData?.totalPages
  );

  if (Number.isFinite(totalPages) && totalPages > 0) {
    return page < totalPages;
  }

  return pageCount >= PAGE_LIMIT;
};

export default function AppsClients() {
  const { toaster } = useToaster();
  const isFirstRender = useRef(true);
  const isFetchingRef = useRef(false);
  const clientsRef = useRef([]);
  const tableScrollRef = useRef(null);
  const toasterRef = useRef(toaster);

  const [clients, setClients] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageResponse, setPageResponse] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedClientColor, setSelectedClientColor] = useState(AVATAR_COLORS[0]);

  useEffect(() => {
    clientsRef.current = clients;
  }, [clients]);

  useEffect(() => {
    toasterRef.current = toaster;
  }, [toaster]);

  const fetchClients = useCallback(
    async (page = 1, searchTerm = "", append = false) => {
      if (isFetchingRef.current) return;

      isFetchingRef.current = true;

      try {
        if (append) {
          setLoadingMore(true);
        } else {
          setInitialLoading(true);
          setPageResponse(null);
        }

        const res = await axiosApiCall.get(API_ROUTER?.GET_CLIENT_DATA, {
          params: {
            page,
            limit: PAGE_LIMIT,
            ...(searchTerm ? { params: searchTerm, filter_by: "all" } : {}),
          },
        });
        if (!res?.status) {
          toasterRef.current?.(res?.message, TOAST_TYPES.ERROR);
          return;
        }

        const records = res?.data?.data?.records || [];
        const nextClients = append ? [...clientsRef.current, ...records] : records;
        const responseData = res?.data ?? {};
        const payload = responseData?.data ?? {};

        setClients(nextClients);
        setPageResponse(payload);
        setHasMore(
          resolveHasMore({
            responseData,
            payload,
            page,
            loadedCount: nextClients.length,
            pageCount: records.length,
          })
        );
        setCurrentPage(page);
      } catch {
        toasterRef.current?.(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      } finally {
        setInitialLoading(false);
        setLoadingMore(false);
        isFetchingRef.current = false;
      }
    },
    []
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      fetchClients(1, "");
      return;
    }

    const timeout = setTimeout(() => {
      fetchClients(1, search.trim());
    }, 350);

    return () => clearTimeout(timeout);
  }, [search, fetchClients]);

  const handleLoadMore = useCallback(() => {
    if (initialLoading || loadingMore || isFetchingRef.current || !hasMore) {
      return;
    }

    fetchClients(currentPage + 1, search.trim(), true);
  }, [currentPage, fetchClients, hasMore, initialLoading, loadingMore, search]);

  const totalCount = pageResponse?.totalRecords ?? (initialLoading ? 0 : clients.length);

  const handleClientClick = (client, index) => {
    setSelectedClient(client);
    setSelectedClientColor(AVATAR_COLORS[index % AVATAR_COLORS.length]);
  };

  const handleCloseSidebar = () => {
    setSelectedClient(null);
  };

  const isSidebarOpen = Boolean(selectedClient);

  useEffect(() => {
    if (!isSidebarOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    const node = tableScrollRef.current;

    if (!node || isSidebarOpen) return undefined;

    const handleScroll = () => {
      const remainingScroll = node.scrollHeight - node.scrollTop - node.clientHeight;

      if (remainingScroll <= 120) {
        handleLoadMore();
      }
    };

    node.addEventListener("scroll", handleScroll);
    return () => node.removeEventListener("scroll", handleScroll);
  }, [handleLoadMore, isSidebarOpen]);

  const renderTableBody = () => {
    if (initialLoading) {
      return <tbody>{ClientsSkeletonRows()}</tbody>;
    }

    if (!clients.length) {
      return (
        <tbody>
          <tr>
            <td colSpan={5}>
              <ClientsEmptyState>No clients found</ClientsEmptyState>
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {clients.map((client, index) => (
          <tr
            key={client?.userId || client?.client_id || index}
            onClick={() => handleClientClick(client, index)}
          >
            <td>
              <ClientsNameCell>
                <ClientsAvatar $bg={AVATAR_COLORS[index % AVATAR_COLORS.length]}>
                  {getInitials(client?.username)}
                </ClientsAvatar>
                {formatClientName(client?.username)}
              </ClientsNameCell>
            </td>
            <td>{client?.client_id || "-"}</td>
            <td>{formatBirthday(client?.dob)}</td>
            <td>{formatPhone(client?.phone)}</td>
            <td>
              {client?.email || "-"}
            </td>
          </tr>
        ))}
        {loadingMore ? ClientsSkeletonRows({ count: 3 }) : null}
      </tbody>
    );
  };

  return (
    <ClientsPage>
      <ClientsContent>
        <ClientsHeader>
          <ClientsTitleBlock>
            <h1>Clients</h1>
            <span>
              {initialLoading ? (
                <Skeleton width={90} height={16} />
              ) : (
                `(${totalCount} Clients)`
              )}
            </span>
          </ClientsTitleBlock>

          <ClientsSearchField>
            <span className="search-icon">
              <InlineSVG src={Search_icon_customer} />
            </span>
            <input
              type="text"
              placeholder="Search by name, email, or phone"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              disabled={initialLoading && !clients.length}
            />
          </ClientsSearchField>

          <ClientsAddButton type="button" onClick={() => setShowAddClientModal(true)}>
            Add Client
          </ClientsAddButton>
        </ClientsHeader>

        <ClientsTableCard>
          <ClientsTableScroll
            id="clients-table-scroll"
            ref={tableScrollRef}
            $lockScroll={isSidebarOpen}
          >
            <ClientsTable>
              <ClientsTableHeader />
              {renderTableBody()}
            </ClientsTable>
          </ClientsTableScroll>
        </ClientsTableCard>
      </ClientsContent>

      <NewAddClientModal
        show={showAddClientModal}
        onHide={() => setShowAddClientModal(false)}
        onSuccess={() => {
          setShowAddClientModal(false);
          fetchClients(1, search.trim());
        }}
      />

      <ClientDetailsSidebar
        client={selectedClient}
        open={Boolean(selectedClient)}
        onClose={handleCloseSidebar}
        avatarColor={selectedClientColor}
      />
    </ClientsPage>
  );
}
