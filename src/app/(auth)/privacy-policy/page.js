"use client";

import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import BlogHeader from "@/components/blogheader/page";
import HomeFooter from "@/components/homefooter/page";
import {PrivacyPolicyWrapper } from "@/styles/global/main.style";
import { ComingSoonLayoutWrapper, } from "@/styles/pages/comingsoon.style";

export default function PrivacyPolicy() {

  //hooks
  const { t } = useTranslation();

   useEffect(() => {
    document.body.classList.remove("background-white-layout");
  }, []);

  return (
    <>
      <BlogHeader />
      <ComingSoonLayoutWrapper className="sitback-revamp-banner-section sitback-small-size-banner-div sitback-other-page-banner-div">
        <section className="sitback-banner-updated-div">
          <div className="sitback-banner-image-div">
            <img
              src="/images/landing-banner-image.webp"
              alt="Loading Video..."
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
                zIndex: 2,
              }}
            />
            <div className="banner-content-wrapper">
              <div className="banner-top-title-div banner-top-other-page-title-div">
                <Container>
                  <h1>Sitback Privacy Policy</h1>
                  {/* <p>Unmatched Relaxation at Top Spas wherever you go.</p> */}
                </Container>
              </div>
            </div>
          </div>
        </section>
      </ComingSoonLayoutWrapper>
        <PrivacyPolicyWrapper className="privacy-policy-updated-div">
          {/* <div className="cloud-image-wrapper">
            <Image isContainImg={true} alt="sitback" src="/images/Union.svg" />
          </div>
          <div className="cloud-image-wrapper right-side-cloud-img">
            <Image isContainImg={true} alt="sitback" src="/images/Union.svg" />
          </div>
          <div className="cloud-image-wrapper right-bottom-side-cloud-img">
            <Image isContainImg={true} alt="sitback" src="/images/Union.svg" />
          </div>
          <div className="cloud-image-wrapper right-bottom4-side-cloud-img">
            <Image isContainImg={true} alt="sitback" src="/images/Union.svg" />
          </div> */}
          <Container>
            {/* <LoginTextTitle>{t("privacyTitle")}</LoginTextTitle> */}
            <div>
              <h5 className="privacy-introduction-text">{t("privacyIntroduction")}</h5>
              <h6 className="privacy-introduction-para-text">{t("privacyIntroductionText")}</h6>
              <p>
                This policy describes the types of information we might collect from you or that you
                might provide when you visit the website{" "}
                <a href="https://www.sitback.io/" target="_blank" rel="noreferrer">
                  https://www.sitback.io/
                </a>{" "}
                or install, access, or use the sitback App (collectively, “Platform”) and our
                practices for collecting, using, maintaining, protecting, and disclosing that
                information.
              </p>
            </div>
            <div>
              <h5>{t("title1")}:</h5>
              <h6 className="medium-title-text">{t("header1")}</h6>
              <p>{t("detailText1")}</p>
            </div>
            <div>
              <h5>{t("title2")}</h5>
              <p>{t("detailText2")}</p>
              <p>{t("detailText3")}</p>
              <h6>{t("subHeader1")}</h6>
              <p>
                {t("detailText4")}
                <a href="mailto:support@sitback.io">support@sitback.io</a>.
              </p>
              <h6>{t("subHeader2")}</h6>
              <p>{t("detailText5")}</p>
            </div>
            <div>
              <h5 className="privacy-policy-detail-header-text">{t("header2")}</h5>
              <h6 className="medium-title-text">{t("subHeader3")}</h6>
              <h6 className="medium-title-text">{t("subHeader4")}</h6>
              <p>{t("detailText6")}</p>
              <p>{t("detailText7")}</p>
              {/* <p>{t("detailText8")} </p>
              <p>{t("detailText10")} </p>
              <p>{t("detailText11")}</p>
              <p>{t("detailText12")}</p>
              <p>{t("detailText13")}</p>
              <p>{t("detailText14")}</p> */}
            </div>
            {/* <div>
              <h5>{t("header3")}</h5>
              <h6>{t("subHeader5")}</h6>
              <p>{t("detailText15")} </p>
              <p>{t("detailText16")}</p>
              <p>{t("detailText17")}</p>
              <p>{t("detailText18")}</p>
            </div>
            <div>
              <h5>{t("header4")}</h5>
              <p>{t("detailText19")}</p>
              <p>{t("detailText20")}</p>
              <p>{t("detailText21")}</p>
              <p>{t("detailText22")}</p>
              <p>{t("detailText23")}</p>
              <p>Information We Collect Through Automatic Data Collection Technologies</p>
              <p>
                As you navigate through and interact with our Platform, we may use automatic data
                collection technologies to collect certain information about your equipment, browsing
                actions, and patterns, including Technical, Device, Usage, and Content Data.
              </p>
              <p>
                Please note that we do not recognize or respond to any do not track signals (DNT). For
                more information about DNT, visit{" "}
                <a href="https://www.allaboutdnt.com" target="_blank" rel="noreferrer">
                  www.allaboutdnt.com
                </a>
                .
              </p>
            </div>
            <div>
              <h5>
                The information we collect automatically is only statistical data and does not include
                personal information. It helps us to improve our Platform and to deliver a better and
                more personalized service, including by enabling us to:
              </h5>
              <p>Estimate our audience size and usage patterns.</p>
              <p>
                Store information about your preferences, allowing us to customize our Platform
                according to your individual interests.
              </p>
              <p>Speed up your searches.</p>
              <p>Recognize you when you return to our Platform.</p>
            </div>
            <div>
              <h5>The technologies we use for this automatic data collection might include:</h5>
              <p>
                Cookies (or browser/mobile cookies). A cookie is a small file placed on your
                smartphone or the hard drive of your computer. You may refuse to accept browser/mobile
                cookies by activating the appropriate setting on your browser or smartphone. However,
                if you select this setting you might be unable to access certain parts of our
                Platform. Unless you have adjusted your browser setting so that it will refuse
                cookies, our system will issue cookies when you direct your browser to our Platform.
              </p>
              <p>Web Beacons. </p>
              <p>
                Pages of our Platform and our emails might contain small electronic files known as web
                beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that
                permit sitback, for example, to count users who have visited those pages or opened an
                email and for other related website statistics (for example, recording the popularity
                of certain platform content and verifying system and server integrity).
              </p>
              <p>How We Use Your Information</p>
            </div>
            <div>
              <h5>
                We use information that we collect about you or that you provide to us, including any
                personal information:
              </h5>
              <p>
                To provide you with the Platform and its contents, and any other information,
                products, or services that you request from us.
              </p>
              <p>To fulfill any other purpose for which you provide it.</p>
              <p>
                To carry out our obligations and enforce our rights arising from any contracts entered
                into between you and us, including for billing and collection.
              </p>
              <p>
                To notify you about changes to our Platform or any products or services we offer or
                provide through it.
              </p>
              <p>To allow you to participate in interactive features on our Platform.</p>
              <p>To undertake internal research for technological development and demonstration.</p>
              <p>
                To administer and protect our business and this Platform (including troubleshooting,
                data analysis, testing, system maintenance, support, reporting, and hosting of data).
              </p>
              <p>
                To use data analytics to improve our Platform, products/services, marketing, customer
                relationships, and experiences.
              </p>
              <p>
                To detect security incidents, protect against malicious, deceptive, fraudulent, or
                illegal activity, and prosecute those responsible for that activity.
              </p>
              <p>
                To protect the rights, property, and safety of our users, us, and other nonparties.
              </p>
              <p>In any other way we may describe when you provide the information.</p>
              <p>For any other purpose with your consent.</p>
              <p>Disclosure of Your Information</p>
              <p>
                We may disclose Aggregated Data about our users, and information that does not
                identify any individual, without restriction.
              </p>
            </div>
            <div>
              <h5>
                We may disclose personal information that we collect or you provide as described in
                this privacy policy:
              </h5>
              <p>To our subsidiaries and affiliates.</p>
              <p>
                To contractors, service providers, and other nonparties we use to support our business
                and who are bound by contractual obligations to keep personal information confidential
                and use it only for the purposes for which we disclose it to them. We may allow
                selected nonparties to use tracking technology on our Platform, which will allow them
                to collect information about how you interact with our Platform over time. This
                information can be used to, among other things, analyze and track data, determine the
                popularity of certain content and better understand online activity. For example, we
                use Google Analytics to help us understand how our users use our Platform (you can
                read more about how Google uses your personal information here:{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
                  https://policies.google.com/privacy)
                </a>
                .
              </p>
              <p>
                To a buyer or other successor in the event of a merger, divestiture, restructuring,
                reorganization, dissolution, or other sale or transfer of some or all of sitback’s
                assets, whether as a going concern or as part of bankruptcy, liquidation, or similar
                proceeding, in which personal information held by sitback about our users is among the
                assets transferred.
              </p>
              <p>
                To fulfill the purpose for which you provide it. For example, if you give us an email
                address to use the “email a friend” feature of our Platform, we will transmit the
                contents of that email and your email address to the recipients.
              </p>
              <p>
                For any other purpose disclosed by us when you provide the information with your
                consent.
              </p>
            </div>
            <div>
              <h5>We may also disclose your personal information:</h5>
              <p>
                To comply with any court order, law, or legal process, including to respond to any
                government or regulatory request.
              </p>
              <p>
                To enforce our rights arising from any contracts entered into between you and us,
                including the sitback App EULA and the Platform’s Terms of Use.
              </p>
              <p>
                If we believe disclosure is necessary or appropriate to protect the rights, property,
                or safety of sitback, our customers, or others.
              </p>
            </div>
            <div>
              <h5>We may also disclose your personal information:</h5>
              <p>
                To comply with any court order, law, or legal process, including to respond to any
                government or regulatory request.
              </p>
              <p>
                To enforce our rights arising from any contracts entered into between you and us,
                including the sitback App EULA and the Platform’s Terms of Use.
              </p>
              <p>
                If we believe disclosure is necessary or appropriate to protect the rights, property,
                or safety of sitback, our customers, or others.
              </p>
              <p>The categories of personal information we may disclose include:</p>
              <ul>
                <li>Identity Data;</li>
                <li>Contact Data;</li>
                <li>Technical Data;</li>
                <li>Device Data;</li>
                <li>Content Data; and</li>
                <li>Profile Data.</li>
              </ul>
              <p>Consent to Personal Information Transfer</p>
              <p>
                We are based in the United States of America. We may process, store, and transfer the
                personal information we collect, in and to a country outside your own, with different
                privacy laws that might or might not be as comprehensive as your own. If you are
                located outside the United States, your personal information might at times be
                accessible by persons who are located worldwide including in countries that the
                European Commission or other geopolitical regions have not determined to provide the
                same adequate level of data protection in your country, province, territory, or
                geopolitical region.
              </p>
              <p>
                By submitting your personal information or engaging with our Platform, you hereby
                consent to this transfer, storing, or processing, including the transfer of your
                information across international boundaries to jurisdictions anywhere in the world as
                permitted by law.
              </p>
              <p>
                If you are a Canadian resident or otherwise located in Canada, please note that
                personal information transfers outside of Canada might result in your information
                becoming accessible to foreign jurisdiction’s law enforcement or other authorities.
              </p>
              <p>
                If you are located in the European Economic Area (EEA), Switzerland, or the United
                Kingdom (UK), please note that your information will be transferred outside of those
                areas, including to the United States. Nevertheless, whenever we transfer your
                personal information out of the EEA, Switzerland, or UK, we will use reasonable
                efforts to ensure a similar degree of protection is afforded to it by ensuring that
                the recipient nonparty agrees to contractual clauses or other appropriate safeguards.
              </p>
              <p>Choices About How We Use and Disclose Your Information</p>
            </div>
            <div>
              <h5>
                We strive to provide you with choices regarding the personal information you provide
                to us. We have created mechanisms to provide you with the following control over your
                information:
              </h5>
            </div>
            <div>
              <h5>
                Tracking Technologies and Advertising. You can set your browser to refuse all or some
                browser cookies or to alert you when cookies are being sent. If you disable or refuse
                cookies, please note that some parts of our Platform might become inaccessible or not
                function properly. You can opt-out of Google Analytics here:
              </h5>
              <p>
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer">
                  https://tools.google.com/dlpage/gaoptout
                </a>
                .
              </p>
              <p>
                Location Information. You can choose whether or not to allow the Platform to collect
                and use real-time information about your Device’s location through the Device’s
                privacy settings. If you block the use of location information, some parts of the
                Platform might become inaccessible or not function properly.
              </p>
              <p>
                Promotional Offers from sitback. If you do not wish to have your email address used by
                sitback to promote our own or nonparties’ products or services, you can opt-out by
                checking the relevant box located on the form on which we collect your data (the
                registration form) or at any other time by logging into the Platform and adjusting
                your user preferences in your account profile by checking or unchecking the relevant
                boxes or by sending us an email stating your request to support@sitbackapp.io. If we
                have sent you a promotional email, you may send us a return email asking to be omitted
                from future email distributions. This opt out does not apply to information provided
                to sitback as a result of a product purchase, warranty registration, product service
                experience or other transactions.
              </p>
              <p>
                Residents of certain jurisdictions, including California, Nevada, Colorado,
                Connecticut, Virginia, Utah, European Economic Area, and United Kingdom might have
                additional personal information rights and choices. Please see Your State Privacy
                Rights and Your EEA/UK Privacy Rights for more information.
              </p>
              <p>Accessing and Correcting Your Information</p>
              <p>
                It is important that the personal information we hold about you is accurate and
                current. Please keep us informed if your personal information changes. You have the
                right to request access to and to correct the personal information that we hold about
                you.
              </p>
              <p>
                You can review and change your personal information by logging into the Platform and
                visiting your account profile page.
              </p>
              <p>
                You may also send us an email at support@sitback.io to request access to, correct or
                delete any personal information that you have provided to us. We cannot delete your
                personal information except by also deleting your user account. We might not
                accommodate a request to change information if we believe the change would violate any
                law or legal requirement or cause the information to be incorrect.
              </p>
              <p>
                We may request specific information from you to help us confirm your identity and your
                right to access and to provide you with the personal information that we hold about
                you or make your requested changes. Law might allow or require us to refuse to provide
                you with access to some or all the personal information that we hold about you, or we
                might have destroyed, erased, or made your personal information anonymous under our
                record retention obligations and practices. If we cannot provide you with access to
                your personal information, we will inform you of the reasons why, subject to any legal
                or regulatory restrictions.
              </p>
              <p>
                If you delete your Content Data from the Platform, copies of your Content Data might
                remain viewable in cached and archived pages or might have been copied or stored by
                other users. Proper access and use of information provided on the Platform, including
                Content Data, is governed by our Terms of Use.
              </p>
              <p>
                Residents of certain jurisdictions, including California, Nevada, Colorado,
                Connecticut, Virginia, Utah, European Economic Area, and United Kingdom might have
                additional personal information rights and choices. Please see Your State Privacy
                Rights and Your EEA/UK Privacy Rights for more information.
              </p>
              <p>Your State Privacy Rights</p>
              <p>
                State consumer privacy laws might provide their residents with additional rights
                regarding our use of their personal information. To learn more about California
                residents’ privacy rights, visit{" "}
                <a href="https://oag.ca.gov/privacy/ccpa" target="_blank" rel="noreferrer">
                  https://oag.ca.gov/privacy/ccpa
                </a>
                . California’s “Shine the Light” law (California Civil Code § 1798.83) permits users
                of our Platform that are California residents to request certain information regarding
                our disclosure of personal information to nonparties for their direct marketing
                purposes. To make that request, please send an email to{" "}
                <a href="mailto:support@sitback.io">support@sitback.io</a>.
              </p>
            </div>
            <div>
              <h5>
                Colorado, Connecticut, Virginia, and Utah each provide their state residents with
                rights to:
              </h5>
              <p>Confirm whether we process their personal information.</p>
              <p>Access and delete certain personal information.</p>
              <p>Data portability.</p>
              <p>Opt-out of personal data processing for targeted advertising and sales.</p>
            </div>
            <div>
              <h5>
                Colorado, Connecticut, and Virginia also provide their state residents with rights to:
              </h5>
              <p>
                Correct inaccuracies in their personal information, taking into account the
                information’s nature and processing purpose.
              </p>
              <p>
                Opt-out of profiling in furtherance of decisions that produce legal or similarly
                significant effects.
              </p>
              <p>
                To exercise any of these rights, please send an email to{" "}
                <a href="mailto:support@sitback.io">support@sitback.io</a>. To appeal a decision
                regarding a consumer rights request, please contact us at {" "}
                <a href="mailto:support@sitback.io">support@sitback.io</a>.
              </p>
              <p>
                Nevada provides its residents with a limited right to opt-out of certain personal
                information sales. Residents who wish to exercise this sale opt-out rights may submit
                a request to this designated address:{" "}
                <a href="mailto:support@sitback.io">support@sitback.io</a>. However, please know we do
                not currently sell data triggering that statute’s opt-out requirements.
              </p>
              <p>Your EEA/UK Privacy Rights</p>
              <p>If you live in the EEA or the UK, the following terms apply to you.</p>
              <p>Legal Basis for Processing</p>
              <p>
                We may process your personal data because you have given us permission to do so (for
                example, by sending data through our Platform’s contact or signup forms), because the
                processing is in our legitimate interests and it is not overridden by your rights, or
                because we need to process your personal data to perform a contract with you or comply
                with the law.
              </p>
              <p>Your Legal Rights</p>
            </div>
            <div>
              <h5>
                Under certain circumstances, you have rights under data protection laws concerning
                your personal data. Your rights may include the following:
              </h5>
              <p>
                Request access to your personal data (commonly known as a “data subject access
                request”). This enables you to receive a copy of the personal data we hold about you
                and to check that we are lawfully processing it.
              </p>
              <p>
                Request correction of the personal data that we hold about you. This enables you to
                have any incomplete or inaccurate data we hold about you corrected, though we may need
                to verify the accuracy of the new data you provide to us.
              </p>
              <p>
                Request erasure of your personal data. This enables you to ask us to delete or remove
                personal data where there is no good reason for us to continue to process it. You also
                have the right to ask us to delete or remove your personal data where you have
                successfully exercised your right to object to processing (see below), where we may
                have processed your information unlawfully, or where we are required to erase your
                personal data to comply with local law. Note, however, that we might not always be
                able to comply with your request of erasure for specific legal reasons that will be
                notified to you, if applicable, at the time of your request.
              </p>
              <p>
                Object to processing of your personal data where we are relying on a legitimate
                interest (or those of a third party) and there is something about your particular
                situation that makes you want to object to processing on this ground as you feel it
                impacts on your fundamental rights and freedoms. You also have the right to object
                where we are processing your personal data for direct marketing purposes. In some
                cases, we may demonstrate that we have compelling legitimate grounds to process your
                information that override your rights and freedoms.
              </p>
              <p>
                Request restriction of processing your personal data. This enables you to ask us to
                suspend the processing of your personal data in the following scenarios: (1) if you
                want us to establish the data’s accuracy; (2) where our use of the data is unlawful,
                but you do not want us to erase it; (3) where you need us to hold the data even if we
                no longer require it as you need it to establish, exercise, or defend legal claims; or
                (4) you have objected to our use of your data, but we need to verify whether we have
                overriding legitimate grounds to use it.
              </p>
              <p>
                Request the transfer of your personal data to you or a third party. We will provide to
                you, or a third party you have chosen, your personal data in a structured, commonly
                used, machine-readable format. Note that this right only applies to automated
                information that you initially provided consent for us to use or where we used the
                information to perform a contract with you.
              </p>
              <p>
                Withdraw consent at any time where we are relying on consent to process your personal
                data. However, this will not affect the lawfulness of any processing carried out
                before you withdraw your consent. If you withdraw your consent, we might not be able
                to provide certain products or services to you. We will advise you if this is the case
                at the time you withdraw your consent.
              </p>
              <p>
                If you wish to exercise any of the rights set out above, please contact us at {" "}
                <a href="mailto:support@sitback.io">support@sitback.io</a>.
              </p>
              <p>
                You will not have to pay a fee to access your personal data (or to exercise any of the
                other rights). However, we may charge a reasonable fee if your request is clearly
                unfounded, repetitive, or excessive. Alternatively, we may refuse to honor your
                request in these circumstances.
              </p>
              <p>
                We may need to request specific information from you to help us confirm your identity
                and ensure your right to access your personal data (or to exercise any of your other
                rights). This is a security measure to ensure that personal data is not disclosed to
                any person who has no right to receive it. We may also contact you to ask you for
                further information in relation to your request to speed up our response.
              </p>
              <p>
                We try to respond to all legitimate requests within one month. Occasionally it may
                take us longer than a month if your request is particularly complex or you have made
                several requests. In this case, we will let you know and keep you updated.
              </p>
              <p>Data Security</p>
              <p>
                We have implemented measures designed to secure your personal information from
                accidental loss and from unauthorized access, use, alteration, and disclosure. All
                information you provide to us is stored on our secure servers behind firewalls.
              </p>
              <p>
                The safety and security of your information also depends on you. Where we have given
                you (or where you have chosen) a password for access to certain parts of our Platform,
                you are responsible for keeping this password confidential. We ask you not to share
                your password with anyone. We urge you to be careful about giving out information in
                public areas of the Platform. The information you share in public areas can be viewed
                by any user of the Platform.
              </p>
              <p>
                Unfortunately, the transmission of information through the internet is not completely
                secure. Although we do our best to protect your personal information, we cannot
                guarantee the security of your personal information transmitted to our Platform. Any
                transmission of personal information is at your own risk. We are not responsible for
                circumvention of any privacy settings or security measures contained on the Platform.
              </p>
              <p>Changes to Our Privacy Policy</p>
              <p>
                We may update our privacy policy on one or more occasions. It is our policy to post
                any changes we make to our privacy policy on this page. If we make material changes to
                how we treat our users’ personal information, we will notify you by email to the email
                address specified in your account or through a notice on the Platform. The date the
                privacy policy was last revised is identified at the top of the page. You are
                responsible for ensuring we have an up-to-date active and deliverable email address
                for you, and for periodically visiting our Platform and this privacy policy to check
                for any changes.
              </p>
              <p>Contact Information</p>
              <p>
                To ask questions or comment about this privacy policy and our privacy practices,
                contact us at <a href="mailto:support@sitback.io">support@sitback.io</a>.
              </p>
            </div> */}
          </Container>
        </PrivacyPolicyWrapper>
     <HomeFooter/>
    </>
  );
}
