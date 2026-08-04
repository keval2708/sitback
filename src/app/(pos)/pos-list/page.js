"use client";

import React, { useState } from "react";
import PosNewSaleTab from "@/components/pos/PosNewSaleTab";
import PosSoldHistoryTab from "@/components/pos/PosSoldHistoryTab";
import {
  DashboardContainer,
  HeaderActions,
  HeaderLeft,
  HeaderRow,
  HeaderSection,
  PageTitle,
  PageWrapper,
  SearchIconWrapper,
  SearchInput,
  SearchWrapper,
  TabButton,
  TabGroupContainer,
} from "@/styles/pages/pos-product-list.style";

export default function List() {
  const [activeTab, setActiveTab] = useState("new_sale");
  const [searchProduct, setSearchProduct] = useState("");

  return (
    <PageWrapper>
      <DashboardContainer>
        <HeaderSection>
          <HeaderRow>
            <HeaderLeft>
              <PageTitle>POINT OF SALE</PageTitle>
              <SearchWrapper>
                <SearchIconWrapper>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.86518 0C3.5219 0 0 3.5202 0 7.86348C0 12.2068 3.5219 15.727 7.86518 15.727C9.73064 15.7309 11.5361 15.0681 12.9559 13.858L15.9157 16.817C15.9741 16.8797 16.0445 16.9299 16.1227 16.9648C16.201 16.9996 16.2854 17.0184 16.371 17.0199C16.4567 17.0214 16.5417 17.0057 16.6211 16.9736C16.7005 16.9415 16.7727 16.8938 16.8332 16.8332C16.8938 16.7727 16.9415 16.7005 16.9736 16.6211C17.0057 16.5417 17.0214 16.4567 17.0199 16.371C17.0184 16.2854 16.9996 16.201 16.9648 16.1227C16.9299 16.0445 16.8797 15.9741 16.817 15.9157L13.858 12.9567C15.0699 11.5368 15.734 9.73024 15.7304 7.86348C15.7304 3.5202 12.2085 0 7.86518 0ZM1.27543 7.86348C1.27589 6.11606 1.97036 4.44037 3.20613 3.20492C4.4419 1.96948 6.11777 1.27543 7.86518 1.27543C8.73924 1.26139 9.60736 1.42142 10.419 1.74619C11.2306 2.07097 11.9694 2.554 12.5925 3.16715C13.2156 3.7803 13.7104 4.51131 14.0482 5.31759C14.386 6.12387 14.5599 6.98931 14.5599 7.86348C14.5599 8.73765 14.386 9.60309 14.0482 10.4094C13.7104 11.2156 13.2156 11.9467 12.5925 12.5598C11.9694 13.173 11.2306 13.656 10.419 13.9808C9.60736 14.3055 8.73924 14.4656 7.86518 14.4515C6.11777 14.4515 4.4419 13.7575 3.20613 12.522C1.97036 11.2866 1.27589 9.61089 1.27543 7.86348Z" fill="#295086" />
                  </svg>
                </SearchIconWrapper>
                <SearchInput
                  type="text"
                  placeholder="Search products..."
                  value={searchProduct}
                  onChange={(e) => setSearchProduct(e.target.value)}
                />
              </SearchWrapper>
            </HeaderLeft>

            <HeaderActions>
              <TabGroupContainer>
                <TabButton
                  type="button"
                  className={activeTab === "new_sale" ? "active" : "inactive"}
                  onClick={() => setActiveTab("new_sale")}
                >
                  New Sale
                </TabButton>
                <TabButton
                  type="button"
                  className={activeTab === "sold_history" ? "active" : "inactive"}
                  onClick={() => setActiveTab("sold_history")}
                >
                  Sold History
                </TabButton>
              </TabGroupContainer>
            </HeaderActions>
          </HeaderRow>
        </HeaderSection>

        {activeTab === "new_sale" ? (
          <PosNewSaleTab searchProduct={searchProduct} />
        ) : (
          <PosSoldHistoryTab searchProduct={searchProduct} />
        )}
      </DashboardContainer>
    </PageWrapper>
  );
}
