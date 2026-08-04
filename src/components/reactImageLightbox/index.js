
"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react';

const INITIAL_X = 0;
const INITIAL_Y = 0;
const INITIAL_SCALE = 1;
const MOBILE_ICON_SIZE = 35;
const DESKTOP_ICON_SIZE = 50;


const ReactImageVideoLightbox = ({
  startIndex,
  data,
  showResourceCount,
  onCloseCallback,
  onNavigationCallback,
}) => {
  const [state, setState] = useState({
    x: INITIAL_X,
    y: INITIAL_Y,
    scale: INITIAL_SCALE,
    index: startIndex,
    loading: true,
    iconSize: window.innerWidth <= 500 ? MOBILE_ICON_SIZE : DESKTOP_ICON_SIZE,
  });

  const videoRef = useRef(null);


  const swipeLeft = () => {
    if (state.index > 0) {
      setState((prevState) => ({
        ...prevState,
        index: prevState.index - 1,
        loading: true,
      }), () => onNavigationCallback(state.index - 1));
    }
  };

  const swipeRight = () => {
    if (state.index < data.length - 1) {
      setState((prevState) => ({
        ...prevState,
        index: prevState.index + 1,
        loading: true,
      }), () => onNavigationCallback(state.index + 1));
    }
  };


  const getResources = useCallback(() => {
    return data.map((resource, i) => {
      if (resource.type === 'photo') {
        return (
          <>
          <div className='light-box-common-padding'>
            <img
              key={i}
              alt={resource.altTag}
              src={resource.image}
              style={{
                pointerEvents: state.scale === 1 ? 'auto' : 'none',
                // maxWidth: imageWidth,
                // maxHeight: imageHeight,
                transform: `translate(${state.x}px, ${state.y}px) scale(${state.scale})`,
                transition: 'transform 0.5s ease-out'
              }}
              onLoad={() => setState((prevState) => ({ ...prevState, loading: false }))}
            />

          </div>
          </>
        );
      }
      // if (resource.type === 'video') {
      //   return (
      //     <>
      //     <div className='light-box-common-padding diff-height-video'>
      //       <video
      //         key={i}
      //         ref={state.index === i ? videoRef : null} // Assign ref to the current video
      //         width={videoWidth}
      //         height={videoHeight}
      //         src={resource.image}
      //         controls
      //         autoPlay={enableAutoPlay}
      //         style={{
      //           pointerEvents: state.scale === 1 ? 'auto' : 'none',
      //           transform: `translate(${state.x}px, ${state.y}px)`,
      //           transition: 'transform 0.5s ease-out',
      //           zIndex: 1
      //         }}
      //         onLoad={() => setState((prevState) => ({ ...prevState, loading: false }))}
      //       />
      //     </div>
      //     </>
      //   );
      // }
      return null;
    });
  }, [data, state.x, state.y, state.scale, state.index]);


  // Close lightbox with Escape key
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      if (videoRef.current) {
        videoRef.current.pause(); // Pause the video
      }
      onCloseCallback();
    }
  };

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause(); // Pause the video
    }
    onCloseCallback();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);


  const resources = getResources();

  return (
    <div
      // onTouchStart={handleTouchStart}
      // onTouchMove={handleTouchMove}
      // onTouchEnd={handleTouchEnd}
      className='gallery-slider-modal-wrapper'>

      {/* Close Button */}
      <div className='close-icon'
        // onClick={onCloseCallback}
        onClick={handleClose}>
        <svg xmlns='http://www.w3.org/2000/svg' height='36px' viewBox='0 0 24 24' width='36px' fill='#FFFFFF'>
          <path d='M0 0h24v24H0z' fill='none' />
          <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
        </svg>
      </div>

      <div className='sliderbox-modal'>
        {/* Main Content */}
        <div className='slider-wrapperbody'>
          {resources[state.index]}
          {/* Navigation Arrows */}
          <div className=''>
            {state.index > 0 && (
              <div className='arrow-wrapperbox left-arrow'
                onClick={swipeLeft}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 35">
                <path fill="#295086cc" d="m0 17.5 30 17.32V.18L0 17.5Z"/>
                </svg>
              </div>
            )}
            {state.index < data.length - 1 && (
              <div className='arrow-wrapperbox'
                onClick={swipeRight}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 35"><path fill="#295086cc" d="M30 17.5 0 34.82V.18L30 17.5Z"/></svg>
                </div>
            )}
          </div>
        </div>
        {showResourceCount && (
          <div className='pagition-wrapper-bar'>
            <span>{state.index + 1}</span> <p>/</p> <span>{data.length}</span>
          </div>
        )}
        {/* {showThumbnails && (
          <div className='thumbnails-slider-wrapper'>
            {data.map((resource, i) => (
              <div key={i}>
                <div className='thumbnails-box'
                  key={i}
                  style={{
                    border: state.index === i ? '2px solid #95CCD5' : '0.7px solid gray',
                  }}
                  onClick={() => handleThumbnailClick(i)}>
                  {resource.type === 'photo' ? (
                    <img
                      src={resource.image}
                      alt={resource.altTag}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <video
                      width='100%'
                      height='100%'
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      src={resource.image}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )} */}
      </div>
      {state.loading && (
        <div style={{ margin: 'auto', position: 'fixed' }}>
          <style>
            {`@keyframes react_image_video_spinner {
                0% {
                  transform: translate3d(-50 %, -50 %, 0) rotate(0deg);
                }
                100% {
                  transform: translate3d(-50%, -50%, 0) rotate(360deg);
                }
              }`}
          </style>
          <div
            style={{
              animation: '1.0s linear infinite react_image_video_spinner',
              border: 'solid 5px #ffffff',
              borderBottomColor: '#cfd0d1',
              borderRadius: '50%',
              height: 30,
              width: 30,
              position: 'fixed',
              transform: 'translate3d(-50%, -50%, 0)'
            }}></div>
        </div>
      )}
    </div>
  );
};

export default ReactImageVideoLightbox;
