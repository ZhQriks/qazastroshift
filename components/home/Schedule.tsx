import useTranslation from "next-translate/useTranslation";

const Schedule = () => {
  const { t } = useTranslation("common");

  const schudeleData: { date: string; description: string }[] = [
    {
      date: t("schedule_1_date"),
      description: t("schedule_1_description"),
    },
    {
      date: t("schedule_2_date"),
      description: t("schedule_2_description"),
    },
    {
      date: t("schedule_3_date"),
      description: t("schedule_3_description"),
    },
    {
      date: t("schedule_4_date"),
      description: t("schedule_4_description"),
    },
    {
      date: t("schedule_5_date"),
      description: t("schedule_5_description"),
    },
    {
      date: t("schedule_6_date"),
      description: t("schedule_6_description"),
    },
    {
      date: t("schedule_7_date"),
      description: t("schedule_7_description"),
    },
  ];

  return (
    <>
      <div className="h-48 md:h-52 bg-primary"></div>
      <div className="container mx-auto lg:px-4 -mt-80 mb-64">
        <h2 className="text-3xl font-semibold text-center mb-2">
          {t("schedule_title")}
        </h2>
        <div className="w-full ">
          <div className="p-8 mx-4 lg:mx-24 xl:mx-82 rounded-xl shadow-xl bg-white">
            {schudeleData.map(({ date, description }) => (
              <div className="flex flex-row divide-x" key={date}>
                <ul className="list-disc font-bold text-sm md:text=lg min-w-[120px] max-w-[120px] md:min-w-[200px] py-2">
                  <li className="w-full">{date}</li>
                </ul>
                <div className="text-md md:text-xl lg:text-2xl pl-4 md:pl-12 py-2">
                  {description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Schedule;
