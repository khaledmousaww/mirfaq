"use client";

type Props = {
  open: boolean;
  prayerName: string;
  onPrayed: () => void;
  onClose: () => void;
};

export default function AfterAdhanModal({
  open,
  prayerName,
  onPrayed,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="modal" style={{ display: "flex" }}>
      <div className="modal-content">
        <p style={{ fontSize: "1.1rem", marginBottom: "15px" }}>
          هل صليت <strong>{prayerName}</strong>؟
        </p>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <button className="prayed-btn" onClick={onPrayed}>
            صليت
          </button>
          <button className="qada-btn" onClick={onClose}>
            لاحقًا
          </button>
        </div>
      </div>
    </div>
  );
}
