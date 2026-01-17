import { Rnd } from "react-rnd";
import { updateOverlay, deleteOverlay } from "../services/api";

function Overlay({ overlay, onDelete }) {
  return (
    <Rnd
      size={{ width: overlay.width, height: overlay.height }}
      position={{ x: overlay.x, y: overlay.y }}

      onDragStop={(e, d) => {
        updateOverlay(overlay._id, {
          x: d.x,
          y: d.y
        });
      }}

      onResizeStop={(e, direction, ref, delta, position) => {
        updateOverlay(overlay._id, {
          width: ref.offsetWidth,
          height: ref.offsetHeight,
          x: position.x,
          y: position.y
        });
      }}

      style={{
        border: "2px solid red",
        backgroundColor: "rgba(255,0,0,0.2)",
        position: "absolute"
      }}
    >
      {/* Delete Button */}
     <button
  onClick={async () => {
    await deleteOverlay(overlay._id);
    onDelete(); // refresh overlays from backend
  }}
  style={{
    position: "absolute",
    top: 0,
    right: 0,
    background: "red",
    color: "white",
    border: "none",
    cursor: "pointer",
    padding: "2px 6px"
  }}
>
  ✕
</button>


      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {overlay.type === "text" ? overlay.content : "IMAGE"}
      </div>
    </Rnd>
  );
}

export default Overlay;
