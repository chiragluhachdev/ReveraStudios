"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { UPI } from "@/lib/agency";

/**
 * Generates a dynamic UPI "Scan & Pay" QR encoding the payee and the
 * exact invoice amount, so any UPI app opens pre-filled.
 */
export default function UpiQr({
  amount,
  note,
  size = 132,
}: {
  amount: number;
  note?: string;
  size?: number;
}) {
  const [src, setSrc] = useState("");

  useEffect(() => {
    const params = new URLSearchParams({
      pa: UPI.id,
      pn: UPI.accountHolder,
      am: amount.toFixed(2),
      cu: "INR",
      ...(note ? { tn: note } : {}),
    });
    const uri = `upi://pay?${params.toString()}`;
    QRCode.toDataURL(uri, {
      margin: 1,
      width: size * 2,
      color: { dark: "#0A0A0A", light: "#FFFFFF" },
    })
      .then(setSrc)
      .catch(() => setSrc(""));
  }, [amount, note, size]);

  return (
    <div
      className="flex items-center justify-center rounded-lg border border-ink/10 bg-white p-2"
      style={{ width: size, height: size }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="Scan & Pay UPI QR code" width={size - 16} height={size - 16} />
      ) : (
        <span className="text-[10px] text-stone">QR…</span>
      )}
    </div>
  );
}
