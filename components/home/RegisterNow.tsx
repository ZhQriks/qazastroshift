import useTranslation from "next-translate/useTranslation";

const RegisterNow = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <div
        className="h-52 md:h-72"
        style={{
          background: "linear-gradient(180deg, #0082CB 0%, #49BEFF 100%)",
        }}
      ></div>
      <div className="pt-4 md:pt-16 container px-4 mx-auto -mt-52 md:-mt-72">
        <div className="">
          <p className="text-white text-lg md:text-3xl text-center font-semibold">
            {t("register_now_1")}
            <br className="hidden md:block" /> {t("register_now_2")}
          </p>
          <p className="text-white text-center mt-2">{t("register_now_3")}</p>
          <div className="flex justify-center mt-20">
            <a href="https://forms.gle/saVQfa5eBj1tZhgTA">
              <button
                type="button"
                className="bg-gray-300 text-gray-500 cursor-not-allowed rounded-md  px-8 py-4 text-xl font-medium shadow-lg hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300"
              >
                {t("register")}
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterNow;
