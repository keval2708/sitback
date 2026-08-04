import { memo } from "react";
import { SchedulerModalLayoutWrapper } from "@/styles/pages/scheduler.style";

const Block = () => {

  return (
    <>
      <SchedulerModalLayoutWrapper >
        <div className="block-content">
          <p>This spa is temporary shutdown. Please revisit after sometime.</p>
        </div>
      </SchedulerModalLayoutWrapper>

    </>
  );

};

export default memo(Block);
