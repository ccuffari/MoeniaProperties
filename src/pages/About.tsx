import * as React from "react";
import { Building2, Award, Users, Shield } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Moenia Properties",
    description: t("about.intro"),
    areaServed: ["Beverly Hills", "Manhattan", "Chicago"],
    knowsAbout: [
      "Luxury Real Estate",
      "Property Investment",
      "Real Estate Marketing",
    ],
    slogan: t("hero.title"),
  };

  return (
    <div className="pt-24 pb-16">
      <Helmet>
        <title>{t("about.meta.title")}</title>
        <meta name="description" content={t("about.meta.description")} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">{t("about.title")}</h1>

          <div className="prose max-w-none">
            <p className="text-xl text-gray-600 mb-8">{t("about.intro")}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <Award className="h-12 w-12 text-gray-900 mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  {t("about.story.title")}
                </h3>
                <p className="text-gray-600">{t("about.story.description")}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <Users className="h-12 w-12 text-gray-900 mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  {t("about.team.title")}
                </h3>
                <p className="text-gray-600">{t("about.team.description")}</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">
              {t("about.philosophy.title")}
            </h2>
            <p className="text-gray-600 mb-8">
              {t("about.philosophy.description")}
            </p>

            <h2 className="text-2xl font-bold mb-4">
              {t("about.marketAnalysis.title")}
            </h2>
            <p className="text-gray-600 mb-8">
              {t("about.marketAnalysis.description")}
            </p>

            <div className="bg-gray-50 p-8 rounded-xl mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {t("about.mission.title")}
              </h2>
              <p className="text-gray-600 mb-8">
                {t("about.mission.description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
