"use client";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function StarModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="modal" style={{ display: "flex" }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          ×
        </span>
        <div className="star">⭐</div>
        <p>تقبّل الله منا  ومنك 🌿</p>
      </div>
    </div>
  );
}
