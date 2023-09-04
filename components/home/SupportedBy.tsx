import AtamekenLogo from "assets/images/atameken.png";
import DBusinessLogo from "assets/images/dbusiness.png";
import InBusinessLogo from "assets/images/inbusiness.png";
import channel31logo from "assets/images/channel31logo.png";
import KbtuLogo from "assets/images/kbtu.png";

import Image from "next/image";

const partnersData: { image: any; link: string }[] = [
  {
    image: AtamekenLogo,
    link: "https://inbusiness.kz/ru/last/v-kazahstane-obyavlen-respublikanskij-konkurs-raketostroeniya-qazastroshift",
  },
  {
    image: DBusinessLogo,
    link: "https://digitalbusiness.kz/2023-04-19/kazahstanskih-starsheklassnikov-priglashayut-na-konkurs-qazastroshift/",
  },
  {
    image: InBusinessLogo,
    link: "https://inbusiness.kz/ru/last/v-kazahstane-obyavlen-respublikanskij-konkurs-raketostroeniya-qazastroshift",
  },
  {
    image: channel31logo,
    link: "https://youtu.be/Kfzo2dUWbikhttps://youtu.be/Kfzo2dUWbik",
  },
];
const Partners = () => {
  return (
    <>
      <div className="container mx-auto px-4 mb-28 mt-32">
        <h2 className="text-3xl font-semibold text-center mb-2">
          Нас также поддержали:
        </h2>
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-2 md:grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:gap-x-10 lg:mx-0 lg:max-w-none">
            {partnersData.map(({ image, link }) => (
              <Image
                className="col-span-1 max-h-24 w-full object-contain mx-auto"
                src={image}
                alt={link}
                width={200}
                height={80}
                key={link}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Partners;
