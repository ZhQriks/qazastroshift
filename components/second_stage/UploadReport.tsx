import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAuth } from "../../lib/Auth";
import { uuid } from "@supabase/supabase-js/dist/main/lib/helpers";
import useTranslation from "next-translate/useTranslation";
import Countdown, { zeroPad } from "react-countdown";

const UploadReport = () => {
  const { t } = useTranslation("second");

  const deadline = new Date("2023-06-14T23:59:00+06:00");

  const supabase = createClientComponentClient();
  const maxSize = 300 * 1024 * 1024;
  const { user } = useAuth();
  const [files, setFiles] = useState<any>([]);

  const [reports, setReports] = useState<any>([]);

  function getLastTwoSections(url: string) {
    const parts = url.split("/");
    return parts.slice(-2).join("/");
  }

  const getReports = async () => {
    let { data: reports, error } = await supabase
      .from("reports_new")
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
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (reports.length > 0) {
        const isSure = confirm(
          "Вы уверены, что хотите загрузить новые файлы? Вы уже загрузили файлы ранее."
        );
        if (!isSure) {
          return;
        }
      }
      setFiles(acceptedFiles);
    },
    maxSize,
  });
  const isFileTooLarge =
    fileRejections.length > 0 &&
    fileRejections[0].errors[0].code === "file-too-large";

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      alert("Файлы не выбраны");
      return;
    }

    if (isFileTooLarge) {
      alert("Файл слишком большой");
      return;
    }

    if (reports.length > 0) {
      const isSure = confirm(
        "Вы уверены, что хотите отправить новые файлы? Вы уже загрузили файлы ранее."
      );
      if (!isSure) {
        return;
      }
    }

    for (let file of files) {
      const { data: storageData, error: uploadError } = await supabase.storage
        .from("reports")
        .upload(`${user.id}/${uuid()}`, file);

      if (uploadError) {
        alert("Ошибка загрузки файла");
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("reports")
        .getPublicUrl(storageData?.path || "");

      if (!publicUrl) {
        alert("Ошибка получения URL файла");
        return;
      }

      const { data, error: insertError } = await supabase
        .from("reports_new")
        .insert([{ user_id: user.id, file: publicUrl, email: user.email }]);

      if (insertError) {
        alert("Ошибка добавления файла в базу данных");
        return;
      }
    }
    alert("Все файлы загружены");
    setFiles([]);

    const updatedReports: any = await getReports();
    if (updatedReports.length > 4) {
      for (let i = 4; i < updatedReports.length; i++) {
        let urlReport = getLastTwoSections(updatedReports[i].file);
        const { data, error } = await supabase.storage
          .from("reports")
          .remove([urlReport]);
        if (error) {
          alert("Ошибка удаления файла из хранилища");
          return;
        }

        const { data: deleteData, error: deleteError } = await supabase
          .from("reports_new")
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
          <div className="border-2">
            <div className="p-8 ">{zeroPad(hours)}</div>
            <p className="text-xl text-center">Hours</p>
          </div>
          <div className="border-2">
            <div className="p-8">{zeroPad(minutes)}</div>
            <p className="text-xl text-center">Minutes</p>
          </div>
          <div className="border-2">
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
                    "https://drive.google.com/drive/folders/14XC1s7OgRQYfsNcAxXzNsRMBxlZYyrbB?usp=sharing",
                    "_blank"
                  )
                }
              >
                {t("upload_3")}
              </button>
            </div>
            <div className="mt-8">
              <div className="">
                {files.length > 0 &&
                  files.map((file: any) => (
                    <p className="text-md text-white">{file?.path}</p>
                  ))}
              </div>
              <div className="w-full bg-white p-2 md:w-[276px] rounded-lg">
                <div
                  {...getRootProps()}
                  className="border-dashed border-2 w-full md:w-64 h-32 rounded flex justify-center items-center bg-white mx-auto cursor-pointer"
                >
                  <input {...getInputProps()} />
                  <svg
                    width="48"
                    height="41"
                    viewBox="0 0 48 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M38.1678 4.375H25.3419C25.0393 4.375 24.7328 4.3105 24.4636 4.18687L18.2687 1.36321C17.4534 0.990541 16.5417 0.793458 15.6281 0.793458H10.6612C5.24435 0.791666 0.837402 4.81037 0.837402 9.75V31.25C0.837402 36.1896 5.24435 40.2083 10.6612 40.2083H16.5555C17.64 40.2083 18.5202 39.4075 18.5202 38.4167C18.5202 37.4259 17.64 36.625 16.5555 36.625H10.6612C7.41148 36.625 4.76692 34.2134 4.76692 31.25V15.125H44.0621V31.25C44.0621 34.2134 41.4175 36.625 38.1678 36.625H32.2735C31.189 36.625 30.3088 37.4259 30.3088 38.4167C30.3088 39.4075 31.189 40.2083 32.2735 40.2083H38.1678C43.5846 40.2083 47.9916 36.1896 47.9916 31.25V13.3333C47.9916 8.39371 43.5846 4.375 38.1678 4.375ZM4.76692 9.75C4.76692 6.78658 7.41148 4.375 10.6612 4.375H15.6281C15.9307 4.375 16.2332 4.4395 16.5063 4.56492L22.7071 7.39037C23.5225 7.76125 24.4322 7.95654 25.3419 7.95654H38.1678C40.7259 7.95654 42.8871 9.45975 43.7005 11.5399H4.76692V9.75ZM28.9197 27.4803L26.3792 25.1637V38.4167C26.3792 39.4075 25.499 40.2083 24.4145 40.2083C23.3299 40.2083 22.4497 39.4075 22.4497 38.4167V25.1637L19.9093 27.4803C19.5262 27.8297 19.0232 28.0053 18.5202 28.0053C18.0172 28.0053 17.5143 27.8297 17.1311 27.4803C16.3629 26.7798 16.3629 25.6475 17.1311 24.9469L20.3003 22.057C22.4969 20.0521 26.3301 20.0521 28.5287 22.057L31.6978 24.9469C32.4661 25.6475 32.4661 26.7798 31.6978 27.4803C30.9296 28.1809 29.6879 28.1809 28.9197 27.4803Z"
                      fill="#CACACA"
                    />
                  </svg>
                </div>
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
