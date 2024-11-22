import React from "react";
import { useTranslation } from "react-i18next";

export default function Maintenance() {
  const { t } = useTranslation(); // Hook per localizzazione

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-center font-sans">
      {/* Testo con localizzazione */}
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-old-money-800">
        {t("maintenance.title")} {/* Titolo localizzato */}
      </h1>
      <p className="text-lg md:text-xl text-old-money-800">
        {t("maintenance.message")} {/* Messaggio localizzato */}
      </p>
    </div>
  );
}
