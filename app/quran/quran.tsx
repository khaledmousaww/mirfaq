"use client";

import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc =
  `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function QuranViewer() {
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <div style={{ textAlign: "center" }}>
      <Document file="/quran.pdf" loading="جاري تحميل المصحف...">
        <Page pageNumber={pageNumber} width={380} />
      </Document>

      <div style={{ marginTop: 20 }}>
        <button onClick={() => setPageNumber(p => Math.max(1, p - 1))}>
          السابق
        </button>

        <span style={{ margin: "0 10px" }}>
          صفحة {pageNumber}
        </span>

        <button onClick={() => setPageNumber(p => p + 1)}>
          التالي
        </button>
      </div>
    </div>
  );
}
