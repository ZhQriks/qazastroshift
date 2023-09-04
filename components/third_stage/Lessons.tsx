import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const Lessons = () => {
  const supabase = createClientComponentClient();
  const [lections, setLections] = useState<any>([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {},
  });
  const getLections = async () => {
    let { data: lections, error } = await supabase.from("lections").select("*");
    if (error) {
      return console.log(error);
    }
    setLections(lections);
  };
  useEffect(() => {
    getLections();
  }, []);
  return (
    <>
      <div className="container mx-auto mb-20">
        <div className="w-full ">
          {lections.map((lection: any) => (
            <div className="p-8 mx-4 lg:mx-24 xl:mx-82 rounded-xl border shadow-md flex flex-col md:flex-row justify-between relative mb-10">
              <div>
                <h2 className="text-2xl font-semibold mb-2">{lection.title}</h2>
                <p className="text-md  mt-4 mb-4">{lection.description}</p>
                <p className="text-md text-blue-400 mt-6 w-full md:w-auto block md:absolute bottom-0 mb-0 md:mb-3">
                  {lection.author}
                </p>
              </div>
              <div className="mt-8 md:mt-2">
                <iframe
                  className="w-72 rounded-md"
                  src={"https://www.youtube.com/embed/" + lection.link}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Lessons;
