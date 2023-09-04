import { useEffect, useState } from "react";
import {
  createClientComponentClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import useTranslation from "next-translate/useTranslation";
import { useAuth } from "../../lib/Auth";
const Banner = () => {
  const { t } = useTranslation("second");

  return (
    <div
      className="py-20 w-full"
      style={{
        background:
          "linear-gradient(0deg, #FFFFFF 0%, rgba(203, 236, 255, 0.795594) 97.83%, rgba(0, 163, 255, 0) 117.39%)",
      }}
    >
      <div className=" container px-4 mx-auto">
        <div className="mt-16 md:mt-32 mb-8 md:mb-16">
          <h1 className="text-center text-2xl md:text-5xl font-medium">
            {t("banner_w_1")} <br />
            {t("banner_w_2")}
          </h1>
          <p className="text-color-black text-md md:text-lg font-light text-center mt-2 md:mt-6">
            {t("banner_2_w1")}
            <br />
            {t("banner_2_w2")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
