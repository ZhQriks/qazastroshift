import AmericanCornerLogo from "assets/images/a_corner.png";
import AituLogo from "assets/images/aitu.png";
import KGSLogo from "assets/images/kgs.png";
import NPSMLogo from "assets/images/nspm.png";
import UneskoLogo from "assets/images/unesko.png";
import ForteLogo from "assets/images/forte.png";
import UstemLogo from "assets/images/ustem.png";

import Image from "next/image";
import KbtuLogo from "../../assets/images/kbtu.png";
import useTranslation from "next-translate/useTranslation";

const partnersData: { image: any; link: string }[] = [
  { image: AituLogo, link: "https://astanait.edu.kz/" },
  { image: KGSLogo, link: "https://www.gharysh.kz/" },
  { image: NPSMLogo, link: "https://fizmat.kz/kz/" },
  {
    image: KbtuLogo,
    link: "https://kbtu.edu.kz/ru/",
  },
  { image: UneskoLogo, link: "https://www.unesco.org/en/" },
  { image: ForteLogo, link: "https://www.forte.kz/" },
  { image: UstemLogo, link: "https://www.instagram.com/ustemrobotics/" },
];
const Partners = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <div className="container mx-auto px-4 mb-28 mt-32">
        <h2 className="text-3xl font-semibold text-center mb-2">
          {t("sponsors_title")}
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
