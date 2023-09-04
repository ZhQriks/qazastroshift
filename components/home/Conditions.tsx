import useTranslation from "next-translate/useTranslation";

const Conditions = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <div className="h-8  bg-primary"></div>
      <div className="container mx-auto px-4 -mt-24 mb-12" id="conditions">
        <h2 className="text-3xl font-semibold text-center mb-2">
          {t("conditions")}
        </h2>
        <div className="w-full flex flex-col lg:flex-row font-semibold justify-center gap-x-8 gap-y-4">
          <div className="shadow-xl rounded-2xl px-8 py-5 bg-white">
            {t("conditions_1")}
          </div>
          <div className="shadow-xl rounded-2xl px-8 py-5 bg-white">
            {t("conditions_2")}
          </div>
          <div className="shadow-xl rounded-2xl px-8 py-5 bg-white">
            {t("conditions_3")}
          </div>
        </div>
      </div>
    </>
  );
};

export default Conditions;
