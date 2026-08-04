import Link from "next/link";
import { memo } from "react";


import { Image, LoginTextTitle } from "@/styles/global/main.style";
import { SchedulerModalLayoutWrapper } from "@/styles/pages/scheduler.style";

const LinkScreen = () => {
  // const
  // const dispatch = useDispatch();

  // // function
  // const refresh = () => {
  //   dispatch(manageSchedulerResponse(null));
  //   dispatch(manageGuestResponse(null));
  //   dispatch(finalBookData(null));
  //   dispatch(schedulerSpaName(null));
  //   dispatch(handleStep(1));
  // };

  return (
    <>
      <SchedulerModalLayoutWrapper className="congrats-block-wrapper">
        <div className="app-store-wrapper">
          <LoginTextTitle>Your relaxation starts with one simple download...</LoginTextTitle>
          <div className="app-store-btns-wrapper">
            <Link href="javascript:void(0)" className="app-store-btn"  onClick={() => window.location = 'https://apps.apple.com/us/app/id6475679969'}>
              <Image isContainImg={true} alt="sitback" src="/images/app-store.svg" />
            </Link>
            <Link href="javascript:void(0)" className="app-store-btn" onClick={() => window.location = 'https://play.google.com/store/apps/details?id=com.truvyn.sitback'}>
              <Image isContainImg={true} alt="sitback" src="/images/google-play.svg" />
            </Link>
          </div>
        </div>
      </SchedulerModalLayoutWrapper>
    </>
  );
};

export default memo(LinkScreen);
