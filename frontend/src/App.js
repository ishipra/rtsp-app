import { useEffect, useState, useRef } from "react";
import Hls from "hls.js";
import Overlay from "./components/Overlay";
import { getOverlays, createOverlay } from "./services/api";

function App() {
  const [overlays, setOverlays] = useState([]);
  const [rtspUrl, setRtspUrl] = useState("");
  const [streamStarted, setStreamStarted] = useState(false);

  const videoRef = useRef(null);

  // Load overlays from backend
  useEffect(() => {
    loadOverlays();
  }, []);

  const loadOverlays = () => {
    getOverlays().then((data) => {
      setOverlays(data);
    });
  };

  // Load HLS stream when stream is started
  useEffect(() => {
    if (streamStarted && videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource("http://127.0.0.1:5000/streams/stream.m3u8");
        hls.attachMedia(videoRef.current);

        return () => {
          hls.destroy();
        };
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        // Safari support
        videoRef.current.src =
          "http://127.0.0.1:5000/streams/stream.m3u8";
      }
    }
  }, [streamStarted]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
        boxSizing: "border-box"
      }}
    >
      <h2>RTSP Overlay Application</h2>

      {/* RTSP Input + Controls */}
      <div style={{ marginBottom: "12px" }}>
        <input
          type="text"
          placeholder="Enter RTSP URL"
          value={rtspUrl}
          onChange={(e) => setRtspUrl(e.target.value)}
          style={{
            width: "420px",
            padding: "8px",
            marginRight: "10px"
          }}
        />

        <button
          onClick={() => {
            if (!rtspUrl) {
              alert("Please enter RTSP URL");
              return;
            }
            setStreamStarted(true);
          }}
          style={{
            padding: "8px 14px",
            backgroundColor: "#2e7d32",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "10px"
          }}
        >
          Start Stream
        </button>

        <button
          onClick={async () => {
            await createOverlay();
            loadOverlays();
          }}
          style={{
            padding: "8px 14px",
            cursor: "pointer"
          }}
        >
          + Add Overlay
        </button>
      </div>

      {/* Video + Overlay Container */}
      <div
        style={{
          position: "relative",
          width: "800px",
          height: "450px",
          backgroundColor: "black",
          borderRadius: "6px",
          overflow: "hidden"
        }}
      >
        {streamStarted ? (
          <video
            ref={videoRef}
            controls
            autoPlay
            muted
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        ) : (
          <div
            style={{
              color: "white",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            Enter RTSP URL and click Start Stream
          </div>
        )}

        {/* Overlays */}
        {overlays.map((overlay) => (
          <Overlay
            key={overlay._id}
            overlay={overlay}
            onDelete={loadOverlays}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
