import Image from "next/image";
import Logo from "assets/qaz_logo.svg";
import RocketLogo from "assets/images/rocket.png";
import { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
const Banner = () => {
  const { t } = useTranslation("common");
  const [rocketPosition, setRocketPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Get the current scroll position
      const currentScroll = window.pageYOffset;

      // Calculate the new rocket position (faster than the scroll)
      const newRocketPosition = currentScroll * 2; // Adjust the multiplier to control the speed

      // Update the rocket position
      setRocketPosition(newRocketPosition);
    };

    // Add the event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="py-20 w-full"
      style={{
        background:
          "linear-gradient(180deg, #FFFFFF 0%, rgba(203, 236, 255, 0.795594) 97.83%, rgba(0, 163, 255, 0) 117.39%)",
      }}
    >
      <div className=" container px-4 mx-auto">
        <div className="mt-16 md:mt-32 mb-12 md:mb-28">
          <Image
            src={Logo}
            alt="qazastroshift"
            className="mx-auto h-16 md:h-auto"
          />
          {/*<div className="flex items-center justify-center">*/}
          {/*  <Image src={Logo} alt="qazastroshift" />*/}
          {/*  <h1 className="ml-6 text-7xl font-semibold text-color-black ">*/}
          {/*    QazAstroShift*/}
          {/*  </h1>*/}
          {/*</div>*/}
          <p className="text-color-black text-xl md:text-3xl font-light text-center md:mt-2">
            {t("banner_0_1")}
            <br /> {t("banner_0_2")}
          </p>
        </div>
      </div>
      <Image
        src={RocketLogo}
        alt="rokcet"
        style={{ bottom: `${rocketPosition}px` }}
        className="mx-auto absolute bottom-80 right-0 w-60 ml-20 md:w-[500px] md:bottom-0 pointer-events-none"
      />
    </div>
  );
};

export default Banner;
