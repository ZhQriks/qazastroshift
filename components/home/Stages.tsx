import useTranslation from "next-translate/useTranslation";

export const LineBreak = () => {
  return <br className="hidden lg:block" />;
};

const Stages = ({ openModal }: { openModal: () => void }) => {
  const { t } = useTranslation("common");

  const stagesData: {
    stage: number;
    title: string;
    description: string;
    button: boolean;
    buttonText: string;
    onclick?: () => void;
  }[] = [
    {
      stage: 1,
      button: false,
      buttonText: t("stages_button_1"),
      title: t("stages_1_title"),
      description: t("stages_1_description"),
    },
    {
      stage: 2,
      button: true,
      onclick: openModal,
      buttonText: t("stages_button_2"),
      title: t("stages_2_title"),
      description: t("stages_2_description"),
    },
    {
      stage: 3,
      button: true,
      onclick: openModal,
      buttonText: t("stages_button_3"),
      title: t("stages_3_title"),
      description: t("stages_3_description"),
    },
    {
      stage: 4,
      button: false,
      buttonText: t("stages_button_4"),
      title: t("stages_4_title"),
      description: t("stages_4_description"),
    },
  ];
  return (
    <div className="pt-20 pb-64" id="stages">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center">
          {t("stages_title")}
        </h2>
        <div className="w-full">
          <div className="px-2 lg:px-12 xl:px-36 grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            {stagesData.map(
              ({ stage, description, title, button, buttonText, onclick }) => (
                <div
                  className="flex flex-col lg:flex-row relative rounded-md border shadow-md p-4"
                  key={stage}
                >
                  <div className="p-4 absolute top-0 right-0 text-primary text-2xl font-semibold flex items-center justify-center mx-auto lg:mx-0 mb-4 lg:md-0">
                    {stage}
                  </div>
                  <div>
                    {/*<p className="text-2xl font-bold min-h-[60px]">{title}</p>*/}
                    <div className="min-h-[60px]">
                      {title.split("\n").map((item, index) => (
                        <p
                          key={index}
                          className="hidden md:block text-2xl font-bold"
                        >
                          {item}
                        </p>
                      ))}
                      <p className="md:hidden text-2xl font-bold">
                        {title.replace(/\n/g, " ")}
                      </p>
                    </div>
                    <div className="text-md mt-2 min-h-[130px]">
                      <div className="hidden md:block">
                        {description.split("\n").map((item, index) => (
                          <p key={index} className="text-md">
                            {item}
                          </p>
                        ))}
                      </div>

                      <div className="md:hidden">
                        <p className="text-md">
                          {description.replace(/\n/g, " ")}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      disabled={!button}
                      onClick={onclick ? onclick : () => {}}
                      className={` rounded-md px-6 py-2 text-md font-medium shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300 ${
                        button
                          ? "bg-primary text-white hover:bg-sky-500"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {buttonText}
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
          <p className="text-center text-lg mb-2 mt-4">{t("details_state")}</p>
          <div className="flex justify-center">
            <a href="https://drive.google.com/drive/folders/1-rsklH4ua9cMiCv1qOLu7u1sI7b_K2wi?usp=sharing">
              <button
                type="button"
                className="rounded-md bg-sky-400 px-8 py-4 text-xl font-medium text-white shadow-lg hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-sky-500 mx-auto"
              >
                {t("details_button")}
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stages;
