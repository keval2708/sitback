"use client";
import { useTranslation } from "react-i18next";
import { WhyPeopleChooseSection } from "@/styles/pages/comingsoon.style";

export default function WhyPeopleChooseSectionComponent({ cityName, isDynamic = false }) {
  const { t } = useTranslation();

  return (
    <>

    {(isDynamic && cityName) ? (
      <>
         <WhyPeopleChooseSection className="sitback-spa-page-display-click-div">
          <div className="why-people-choose-inner-div">
            <div className="why-people-choose-header-div">
              <h3>Book the Best Spa in {cityName} with Sitback</h3>
              <p>Booking your spa treatment in {cityName} is simple and stress free.</p>
            </div>

            <div className="few-clicks-display-div">
              <div className="left-detail-div">
                <div className="left-inner-div">
                  <div className="text-div">
                    <h5><span>1.</span> {t('whyPeopleChooseStep1Title')}</h5>
                    <p>Use location filters to find spas near you in {cityName}.</p>
                  </div>

                  <div className="text-div">
                    <h5><span>2.</span> {t('whyPeopleChooseStep2Title')}</h5>
                    <p>Explore ratings, services, and pricing before booking.</p>
                  </div>

                  <div className="text-div">
                    <h5><span>3.</span> {t('whyPeopleChooseStep3Title')}</h5>
                    <p>{t('whyPeopleChooseStep3Description')}</p>
                  </div>

                  <div className="text-div">
                    <h5><span>4.</span> {t('whyPeopleChooseStep4Title')}</h5>
                    <p>{t('whyPeopleChooseStep4Description')}</p>
                  </div>

                  <h6>No phone calls. No waiting. Just seamless booking in {cityName}.</h6>
                </div>
              </div>

              <div className="right-detail-div">
                <img
                  src="/images/book-spa-click-img.png"
                  alt={t('whyPeopleChooseImageAlt')}
                />
              </div>
            </div>
          </div>
        </WhyPeopleChooseSection>
      </>) : (
      <>
        <WhyPeopleChooseSection className="sitback-spa-page-display-click-div">
          <div className="why-people-choose-inner-div">
            <div className="why-people-choose-header-div">
              <h3>{t('whyPeopleChooseTitle')}</h3>
              <p>{t('whyPeopleChooseSubtitle')}</p>
            </div>

            <div className="few-clicks-display-div">
              <div className="left-detail-div">
                <div className="left-inner-div">
                  <div className="text-div">
                    <h5><span>1.</span> {t('whyPeopleChooseStep1Title')}</h5>
                    <p>{t('whyPeopleChooseStep1Description')}</p>
                  </div>

                  <div className="text-div">
                    <h5><span>2.</span> {t('whyPeopleChooseStep2Title')}</h5>
                    <p>{t('whyPeopleChooseStep2Description')}</p>
                  </div>

                  <div className="text-div">
                    <h5><span>3.</span> {t('whyPeopleChooseStep3Title')}</h5>
                    <p>{t('whyPeopleChooseStep3Description')}</p>
                  </div>

                  <div className="text-div">
                    <h5><span>4.</span> {t('whyPeopleChooseStep4Title')}</h5>
                    <p>{t('whyPeopleChooseStep4Description')}</p>
                  </div>

                  <h6>{t('whyPeopleChooseFooter')}</h6>
                </div>
              </div>

              <div className="right-detail-div">
                <img
                  src="/images/book-spa-click-img.png"
                  alt={t('whyPeopleChooseImageAlt')}
                />
              </div>
            </div>
          </div>
        </WhyPeopleChooseSection>
      </>)}
    </>
  );
}
