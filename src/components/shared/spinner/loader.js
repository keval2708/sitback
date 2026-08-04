import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Loader = ({ loading = false, className = "" }) => {
  // hooks
  const { t } = useTranslation();

  return (
    <>
      {loading && (
        <div className={`loader-wrapper sitback-updated-loader-wrapper ${className}`}>
          <center>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">{t('loading')}</span>
            </Spinner>
          </center>
        </div>
      )}
    </>
  );
};

export default Loader;
