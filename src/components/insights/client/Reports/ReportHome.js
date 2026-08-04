"use client";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactSelect from 'react-select';
import { MostCancel } from './MostCancel';
import { TopSpender } from './TopSpender';
import {
  FormGroup,
  Label,
} from "@/styles/global/main.style";
import { ClientAddLayoutTableWrapper } from "@/styles/pages/client.style";

export const ReportHome = () => {

  const { t } = useTranslation();
  const [selected, setSelected] = useState(null)
  const options = [
    { value: 1, label: 'Most Cancellations Report' },
    { value: 0, label: 'Most Spenders Report' }
  ]

  return (
    <div className="">
      <ClientAddLayoutTableWrapper className="sitback-updated-client-add-layout-div">
        <div className="table-header-bgfill">
          <h5>{t('reportClient1')}</h5>
        </div>
        <div className="select-reports-box-wrapper">
          <FormGroup className="white-input-wrapper">
            <Label>{t('selectReport')}</Label>
            <ReactSelect
              options={options}
              className="sitback-select2-container"
              classNamePrefix="sitback-select-option"
              placeholder="Select report type"
              // defaultValue={{ value: 0, label: 'Most Spenders Report' }}
              onChange={(e) => setSelected(e.value)}
            />
          </FormGroup>
        </div>
        {selected == 0 &&
          <TopSpender />
        }
        {selected == 1 &&
          <MostCancel />
        }
      </ClientAddLayoutTableWrapper>
    </div>
  );
};
