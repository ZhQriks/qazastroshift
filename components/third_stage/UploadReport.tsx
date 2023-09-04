import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAuth } from "../../lib/Auth";
import { uuid } from "@supabase/supabase-js/dist/main/lib/helpers";
import useTranslation from "next-translate/useTranslation";
import Countdown, { zeroPad } from "react-countdown";

const UploadReport = () => {
  const { t } = useTranslation("third");

  const deadline = new Date("2023-07-10T23:59:00+06:00");

  const supabase = createClientComponentClient();
  const maxSize = 300 * 1024 * 1024;
  const { user } = useAuth();
  const [fileUrl, setFileUrl] = useState<string>("");

  const [reports, setReports] = useState<any>([]);

  function getLastTwoSections(url: string) {
    const parts = url.split("/");
    return parts.slice(-2).join("/");
  }

  const getReports = async () => {
    let { data: reports, error } = await supabase
      .from("reports_third")
      .select("*")
      .order("id", { ascending: false });
    if (error) {
      return console.log(error);
    }
    setReports(reports);

    return reports;
  };
  useEffect(() => {
    getReports();
  }, []);

  const handleUpload = async () => {
    if (!fileUrl) {
      alert("Вставьте ссылку");
      return;
    }

    if (reports.length > 0) {
      const isSure = confirm(
        "Вы уверены, что хотите отправить новую ссылку? Вы уже загрузили ссылку ранее."
      );
      if (!isSure) {
        return;
      }
    }

    const { data, error: insertError } = await supabase
      .from("reports_third")
      .insert([{ user_id: user.id, file: fileUrl, email: user.email }]);

    if (insertError) {
      alert("Ошибка добавления файла в базу данных");
      return;
    }
    alert("Все файлы загружены");
    setFileUrl("");

    const updatedReports: any = await getReports();
    if (updatedReports.length > 4) {
      for (let i = 4; i < updatedReports.length; i++) {
        const { data: deleteData, error: deleteError } = await supabase
          .from("reports_third")
          .delete()
          .match({ id: updatedReports[i].id });
        if (deleteError) {
          alert("Ошибка удаления файла из базы данных");
          return;
        }
      }
    }
    getReports();
  };

  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: {
    days: any;
    hours: any;
    minutes: any;
    seconds: any;
    completed: any;
  }) => {
    if (completed) {
      // Render a completed state
      return <span className="text-5xl text-center">Deadline has passed!</span>;
    } else {
      // Render a countdown
      return (
        <div className="flex flex-col md:flex-row text-4xl gap-x-2">
          <div className="border-2 px-8 md:p-0">
            <div className="p-8 ">{zeroPad(days)}</div>
            <p className="text-xl text-center">Days</p>
          </div>
          <div className="border-2 px-8 md:p-0">
            <div className="p-8 ">{zeroPad(hours)}</div>
            <p className="text-xl text-center">Hours</p>
          </div>
          <div className="border-2 px-8 md:p-0">
            <div className="p-8">{zeroPad(minutes)}</div>
            <p className="text-xl text-center">Minutes</p>
          </div>
          <div className="border-2 px-8 md:p-0">
            <div className="p-8">{zeroPad(seconds)}</div>
            <p className="text-xl text-center">Seconds</p>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="container mx-auto flex justify-center gap-x-4 mb-14">
        <Countdown date={deadline} renderer={renderer} />
      </div>
      {reports.length > 0 && (
        <>
          <h2 className="text-3xl font-semibold mb-10  text-center">
            Uploaded files
          </h2>
          <div className="container mx-auto flex justify-center gap-x-4 mb-14">
            {reports.map((report: any, index: number) => (
              <div
                key={index}
                className="bg-white shadow-md rounded px-4 pt-3 pb-2 mb-4 my-2"
              >
                <div className="mb-4">
                  <label className="block text-grey-darker text-sm font-bold mb-2">
                    file{index + 1}:
                  </label>
                  <a
                    href={report.file}
                    className="block text-xs leading-tight font-semibold text-gray-900 hover:underline"
                  >
                    <svg
                      fill="#000000"
                      width="32px"
                      height="32px"
                      viewBox="0 0 32 32"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>file</title>
                      <path d="M4 30.016q0 0.832 0.576 1.408t1.44 0.576h20q0.8 0 1.408-0.576t0.576-1.408v-22.016l-8-8h-13.984q-0.832 0-1.44 0.608t-0.576 1.408v28zM8 28v-24h10.016v6.016h5.984v17.984h-16z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="container mx-auto mb-20">
        <div className="w-full ">
          <div
            className="p-8 mx-4 lg:mx-24 xl:mx-82 rounded-xl shadow-xl flex flex-col md:flex-row justify-between relative"
            style={{
              background:
                "linear-gradient(104.23deg, #38B0F3 4.18%, #0788D0 97.22%)",
            }}
          >
            <div>
              <h2 className="text-3xl font-semibold mb-2 text-white">
                {t("upload_1")}
              </h2>
              <p className="text-md text-white mt-6">{t("upload_2")}</p>
              <button
                type="button"
                className="w-full md:w-auto block md:absolute bottom-0 mb-0 md:mb-8 rounded-md bg-white px-6 py-3 text-xl font-medium text-black shadow-lg hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300"
                onClick={() =>
                  window.open(
                    "https://drive.google.com/drive/folders/1guIzvRryUr5fTxiKyCJROrpLWkCWBlAW?usp=sharing",
                    "_blank"
                  )
                }
              >
                {t("upload_3")}
              </button>
            </div>
            <div className="mt-8">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Link to Google Drive/Yandex Disk folder
              </label>
              <div className="mt-2">
                <input
                  type="link"
                  name="link"
                  id="link"
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="https://drive.google.com/drive/xxx"
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                />
              </div>
              <button
                type="button"
                disabled={new Date().getTime() > deadline.getTime()}
                className={
                  "w-full md:w-[276px] mt-4 rounded-md bg-white px-6 py-3 text-xl font-medium text-black shadow-lg hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300" +
                  (new Date().getTime() > deadline.getTime()
                    ? " opacity-50 cursor-not-allowed"
                    : "")
                }
                onClick={handleUpload}
              >
                {t("upload_button")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadReport;
