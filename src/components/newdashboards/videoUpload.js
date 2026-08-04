import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import ReactPlayer from 'react-player';
import Switch from 'react-switch';
import InlineSVG from 'svg-inline-react';
import ServiceSelectModal from './ServiceSelectModal';
import SitbackLoader from './SitbackLoader';
import SitbackVideoLoader from './SitbackVideoLoader';
import { useToaster } from '@/hooks';
import { API_ROUTER } from '@/services/apiRouter';
import { Image } from '@/styles/global/main.style';
import { VideoUpgradeWrapper } from '@/styles/pages/insights.style';
import {
  FeaturedStarIcon_icon,
  PremiumFeatureIcon_icon,
  VideoSpotlightIcon_icon,
} from '@/styles/svgs';
import axiosApiCall from '@/utils/axios';
import { TOAST_ALERTS, TOAST_TYPES } from '@/utils/constants';
import { getSocketId } from '@/utils/helper';



const VideoUpload = () => {
  // hooks
  const { toaster } = useToaster();
  const { t } = useTranslation();

  const [data, setData] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isBookingButtonChecked, setIsBookingButtonChecked] = useState(false); // State for Booking Button switch
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [services, setServices] = useState([]);
  const [isFeaturedSpaChecked, setIsFeaturedSpaChecked] = useState(false); // State for Featured Spa switch
  const [loading, setLoading] = useState(true); // Loader for initial data


  useEffect(() => {
    fetchInitialData(true);
  }, []);

  const fetchInitialData = async (showLoader = true) => {
    setLoading(showLoader);
    try {
      const response = await axiosApiCall.get(API_ROUTER?.FETCH_INITIAL_VIDEO_SETTINGS);
      if (response?.status) {
        setData(response?.data?.data || null);
        setVideoFile(response?.data?.data?.video_file || null);
        setIsBookingButtonChecked(response?.data?.data?.features_service); // Assuming 1 is enabled and 0 is disabled
        setIsFeaturedSpaChecked(response?.data?.data?.featured_spa); // Assuming 1 is enabled and 0 is disabled
      } else {
        toaster(response?.data?.message, TOAST_TYPES.SUCCESS);
      }
    } catch (err) {
      toaster('Error fetching initial settings.', TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      // Check if the file is a video. Some browsers/devices may not set mime type for .webm; accept by extension fallback.
      const isVideoMime = file.type && file.type?.startsWith('video/');
      const ext = file.name ? file.name.split('.').pop().toLowerCase() : '';
      const allowedExt = ['mp4', 'mov', 'mpeg', '3gp', 'quicktime'];
      const isAllowedExt = allowedExt.includes(ext);
      if (!isVideoMime || !isAllowedExt) {
        setError('Unsupported video format.');
        setVideoFile(null);
        return;
      }

      // Wait for the video duration to be resolved
      const videoDuration = await getVideoDuration(file);

      if (videoDuration > 60) {
        setError('Video must not exceed 1 minute.');
        setVideoFile(null);
      } else {
        setError(null);
        uploadVideo(file);
      }
    }
  };

  const uploadVideo = async (file) => {
    setUploading(true);
    const socketId = getSocketId();
    const formData = new FormData();
    formData.append('video_file', file);
    formData.append("socketId", socketId);

    try {
      const response = await axiosApiCall.post(API_ROUTER?.DASHBOARD_VIDEO_UPLOAD, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response?.status) {
        return toaster(response?.message, TOAST_TYPES.ERROR);
      } else {
        setVideoFile(response?.data?.data?.video_file);
        toaster(response?.data?.message, TOAST_TYPES.SUCCESS);
        await getServices()
        setShowServiceModal(true);
      }
    } catch (err) {
      setError('Error uploading video.');
      // console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'video/*',
    onDrop: handleDrop,
  });

  const getVideoDuration = (file) => {
    return new Promise((resolve) => {
      const videoElement = document.createElement('video');
      videoElement.src = URL.createObjectURL(file);
      videoElement.onloadedmetadata = () => {
        resolve(videoElement.duration);
      };
    });
  };

  const getServices = async () => {
    try {
      let options = [];
      const res = await axiosApiCall.get(API_ROUTER?.GET_MY_SERVICES_LIST);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        res?.data?.data &&
          res?.data?.data?.map((s) => {
            options.push({
              value: String(s?.id),
              label: s?.name + ` (${s?.hour * 60 + s?.minutes} min)`,
              image: s?.image,
              price: s?.price,
              time: { hour: s?.hour, minute: s?.minutes },
              calculatedTime: `(${s?.hour * 60 + s?.minutes} min)`,
            });
          });
        setServices(options);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  // Handle the change for Booking Button switch
  const handleBookingButtonChange = async (checked) => {
    const socketId = getSocketId();
    if (checked) {
      // Open modal to select service
      setShowServiceModal(true);
      await getServices()

    } else {
      setIsBookingButtonChecked(false);
      const params = {
        features_service: 0,
        socketId: socketId,
      };
      try {
        const response = await axiosApiCall.post(API_ROUTER?.UPDATE_FEATURE_STATUS, params);
        if (response?.status) {
          fetchInitialData()
          toaster(response?.data?.message, TOAST_TYPES.SUCCESS);
        } else {
          return toaster(response?.message, TOAST_TYPES.ERROR);
        }
      } catch (err) {
        toaster('Error updating Booking Button status.', TOAST_TYPES.ERROR);
      }
    }
  };

  const handleServiceSelect = async (serviceId) => {
    const socketId = getSocketId();
    setShowServiceModal(false);
    setIsBookingButtonChecked(true);
    const params = {
      features_service: 1,
      servicelist_id: Number(serviceId),
      socketId: socketId,
    };
    try {
      const response = await axiosApiCall.post(API_ROUTER?.UPDATE_FEATURE_STATUS, params);
      if (response?.status) {
        fetchInitialData()
        toaster(response?.data?.message, TOAST_TYPES.SUCCESS);
      } else {
        return toaster(response?.message, TOAST_TYPES.ERROR);
      }
    } catch (err) {
      toaster('Error updating Booking Button status.', TOAST_TYPES.ERROR);
    }
  };

  // Handle the change for Featured Spa switch
  const handleFeaturedSpaChange = async (checked) => {
    const socketId = getSocketId();
    setIsFeaturedSpaChecked(checked);

    const params = {
      featured_spa: checked ? 1 : 0,
      socketId: socketId,
    };

    try {
      const response = await axiosApiCall.post(API_ROUTER?.UPDATE_FEATURE_STATUS, params);
      if (response?.status) {
        toaster(response?.data?.message, TOAST_TYPES.SUCCESS);
      } else {
        return toaster(response?.message, TOAST_TYPES.ERROR);
      }
    } catch (err) {
      toaster('Error updating Featured Spa status.', TOAST_TYPES.ERROR);
    }
  };

  useEffect(() => {
    if (window.io) {
      window.io.socket.on("serviceprovider", async (msg) => {
        if (msg?.action == "updateFeaturedSpa" || msg?.action == "updateFeaturedSpaVideoFromMobile") {
          fetchInitialData(false);
        }
      });
    }
  }, [window.io]);

  const formatDuration = (hour, minutes) => {
    const totalMin = (hour || 0) * 60 + (minutes || 0);
    return `${totalMin} min`;
  };
  return (
    <div>
      <VideoUpgradeWrapper>
        {loading ? (
          <SitbackLoader />
        ) : (
          <>

            {data?.isVideoSpotlightSubscribe === 1 || data?.isVideoSpotlightActive === 1 ? (
              <div className="video-upload-inner-div">
                <div className="video-header-div">
                  <h4>
                    <InlineSVG
                      src={VideoSpotlightIcon_icon}
                      data-tooltip-id="my-tooltip-1"
                      className="global_laguage_icon"
                    />
                    {t('videoSpotlightText')}
                  </h4>
                  <p>
                    <InlineSVG
                      src={PremiumFeatureIcon_icon}
                      data-tooltip-id="my-tooltip-1"
                      className="global_laguage_icon"
                    />
                    {t('premiumFeatureText')}
                  </p>
                </div>
                <div className="video-display-div">
                  <div className="video-upload-input">
                    <div className="top-div-wrapper" />
                    <div {...getRootProps()} className="video-upload-wrapper">
                      <input accept="video/*" {...getInputProps()} />
                      <div>
                        {uploading ? <> <SitbackVideoLoader />  <p style={{ color: '#8A8A8F' }} className='mt-1'>{t('uploading')}</p></> :
                          <>
                            <div className="upload-icon cursor-pointer">
                              <Image
                                isContainImg={true}
                                alt="sitback"
                                src="images/video-upload-icon.svg"
                              />
                            </div>
                            <p className="drag-text">
                              {t('dragAndDrop')} {t('or')} <span className='cursor-pointer'>{t('Browse')}</span>
                            </p>
                            <p className="upload-text">{t('uploadMaxVideo')}</p>
                          </>
                        }
                      </div>

                    </div>
                    {error && <p style={{ color: 'red' }} className='mt-1'>{error}</p>}

                  </div>

                  <div className="video-uploaded-display-div">
                    {videoFile && (
                      <div>
                        <p className="preview-text">{t('Preview')}:</p>
                        <div className="video-main-div">
                          <ReactPlayer url={videoFile} controls />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {videoFile && (
                  <>
                    {data?.service ?
                      <div className="preview-container">
                        <label>{t('mappedService')}:</label>
                        <p className="preview-text-small">
                          {`${data?.service?.name} (${formatDuration(data?.service?.hour, data?.service?.minutes)})`}
                        </p>
                      </div>
                      : ''}
                    <div className="switch-div">
                      <label>{t('bookingButtonForFeatureService')}</label>
                      <Switch
                        checked={isBookingButtonChecked}
                        onChange={handleBookingButtonChange}
                        onColor="#008800"
                        offColor="#66666633"
                      />
                    </div>
                  </>
                )}
              </div>
            ) : ''}
            {data?.isFeaturedSpaSubscribe === 1 || data?.isFeaturedSpaActive === 1 ? (
              <div className="featured-section">
                <div className="featured-header">
                  <div className="featured-header-left-div">
                    <h4>
                      <InlineSVG
                        src={FeaturedStarIcon_icon}
                        data-tooltip-id="my-tooltip-1"
                        className="global_laguage_icon"
                      />
                      {t('featuredSpa')}
                    </h4>
                    <span>{t('active')}</span>
                  </div>
                  <div className="featured-header-right-div">
                    <p>
                      <InlineSVG
                        src={PremiumFeatureIcon_icon}
                        data-tooltip-id="my-tooltip-1"
                        className="global_laguage_icon"
                      />
                      {t('premiumFeatureText')}
                    </p>
                    <Switch
                      checked={isFeaturedSpaChecked}
                      onChange={handleFeaturedSpaChange}
                      onColor="#008800"
                      offColor="#66666633"
                    />
                  </div>
                </div>

                <p className="spa-visibility-text">
                  {t('boostYourSpaVisibilityByFeaturingText')}
                </p>
                <div className="featured-list-detail-div">

                  <div className="list-right-div">
                    <p>
                      <InlineSVG
                        src={PremiumFeatureIcon_icon}
                        data-tooltip-id="my-tooltip-1"
                        className="global_laguage_icon"
                      />
                      {t('premiumFeatureText')}
                    </p>
                  </div>
                </div>
              </div>
            ) : ''}
          </>
        )}
        <ServiceSelectModal
          show={showServiceModal}
          serviceData={services}
          onSelect={handleServiceSelect}
          onClose={() => setShowServiceModal(false)}
          UpgradeData={data}
          fetchInitialData={fetchInitialData}
        />
      </VideoUpgradeWrapper>
    </div>
  );
};

export default VideoUpload;
