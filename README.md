# RTSP Livestream Overlay Application

This project is a web-based application that allows users to play a livestream video and add draggable and resizable overlays (text or image) on top of the video in real time.

The application is built as part of an internship assignment to demonstrate livestream handling, frontend–backend integration, and interactive UI features.

---

## 🚀 Features

- Livestream video playback
- Play, Pause, and Volume controls
- RTSP compatibility via FFmpeg conversion
- Text overlays on top of video
- Drag-and-drop positioning of overlays
- Resizable overlays
- Real-time overlay updates
- Frontend and backend fully connected

---

## 🛠️ Tech Stack

### Frontend
- React.js
- hls.js (for HLS video playback)

### Backend
- Flask (Python)
- MongoDB (for overlay storage)
- Flask-CORS

### Streaming
- FFmpeg (RTSP → HLS conversion)

---

## 📺 RTSP Handling Explanation

Web browsers do not natively support RTSP streams.  
To handle this, the application uses **FFmpeg** to convert RTSP streams into **HLS (HTTP Live Streaming)** format.

The generated `.m3u8` playlist and `.ts` segments are served through the Flask backend and played in the React frontend using `hls.js`.

This approach ensures RTSP compatibility while maintaining smooth browser playback.

---

## 📂 Project Structure

