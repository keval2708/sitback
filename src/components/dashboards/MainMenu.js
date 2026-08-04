import Link from "next/link";
import { useTranslation } from "react-i18next";
import InlineSVG from "svg-inline-react";
import { PATH_DASHBOARD, PATH_POS } from "@/routes/paths";
import {
  ServiceProviderIconWrapper,
} from '@/styles/global/main.style';
import { Pos_icon, appointments_icon, insights_icon, profile_icon } from "@/styles/svgs";

export const MainMenu = ({
  close = () => { },
  posRedirect
}) => {
  const { t } = useTranslation();

  return (
    <ServiceProviderIconWrapper>
      <div className="box-wrapper sitback-updated-box-wrapper">
        <Link href={PATH_DASHBOARD?.appointments} className="service-nemu-list-box" onClick={() => close()}>
          <InlineSVG
            src={appointments_icon}
            className="global_laguage_icon"
          />
          <h5>{t('appointments')}</h5>
        </Link>
      </div>
      <div className="box-wrapper sitback-updated-box-wrapper">
        <Link href={PATH_DASHBOARD?.selectProfile} className="service-nemu-list-box" onClick={() => close()}>
          <InlineSVG
            src={profile_icon}
            className="global_laguage_icon"
          />
          <h5>{t('profile')}</h5>
        </Link>
      </div>
      <div className="box-wrapper sitback-updated-box-wrapper">
        <Link href={PATH_DASHBOARD?.insights} className="service-nemu-list-box" onClick={() => close()}>
          <InlineSVG
            src={insights_icon}
            className="global_laguage_icon"
          />
          <h5>{t('insight')}</h5>
        </Link>
      </div>
      <div className="box-wrapper sitback-updated-box-wrapper">
        <Link href={posRedirect > 0 ? PATH_POS?.list : PATH_POS?.pos} className="service-nemu-list-box" onClick={() => close()}>
          <InlineSVG
            src={Pos_icon}
            className="global_laguage_icon"
          />
          <h5>{t('pos')}</h5>
        </Link>
      </div>
    </ServiceProviderIconWrapper>
  );

};

export default MainMenu;
