const VideoSection1 = () => {
  return (
    <section className="ed-video">
      <div className="container ed-container">
        <div
          className="ed-video__bg background-image ed-hobble position-relative"
          style={{
            backgroundImage: 'url("assets/images/video/video-1/bg-img.png")',
          }}
        >
          <div className="ed-video__shapes">
            <img
              className="ed-video__shape-1 rotate-ani"
              src="/assets/images/video/video-1/shape-1.svg"
              alt="shape-1"
            />
            <img
              className="ed-video__shape-2 updown-ani"
              src="/assets/images/video/video-1/shape-2.svg"
              alt="shape-2"
            />
          </div>
          <a
            href="https://www.youtube.com/watch?v=gyGsPlt06bo"
            className="ed-video__btn popup-video ed-hover-layer-2"
          >
            <img
              src="/assets/images/icons/icon-play-yellow.svg"
              alt="play-icon"
            />
          </a>
        </div>
      </div>
    </section>
  );
};
export default VideoSection1;

export const VideoSection2 = () => {
  return (
    <section className="ed-video ed-video--style2">
      <div className="container ed-container">
        <div
          className="ed-video__bg background-image ed-hobble position-relative"
          style={{
            backgroundImage: 'url("assets/images/video/video-2/bg-img.png")',
          }}
        >
          <div className="ed-video__shapes">
            <img
              className="ed-video__shape-1 rotate-ani"
              src="assets/images/video/video-1/shape-1.svg"
              alt="shape-1"
            />
            <img
              className="ed-video__shape-2 updown-ani"
              src="assets/images/video/video-1/shape-2.svg"
              alt="shape-2"
            />
          </div>
          <a
            href="https://www.youtube.com/watch?v=gyGsPlt06bo"
            className="ed-video__btn popup-video ed-hover-layer-2"
          >
            <img
              src="assets/images/icons/icon-play-yellow.svg"
              alt="play-icon"
            />
          </a>
        </div>
      </div>
    </section>
  );
};
