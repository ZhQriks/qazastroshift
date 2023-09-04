import Image from "next/image";
import QazWhiteLogo from "assets/qaz_logo_white.svg";
import useTranslation from "next-translate/useTranslation";
const Footer = () => {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-24">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex items-center justify-center">
            <Image src={QazWhiteLogo} alt="qazastroshift white" />
          </div>
          <ul role="list" className="mt-6 space-y-2">
            <li className="text-white">
              Email:{" "}
              <a
                href="mailto: askar.u@qazastroshift.kz"
                target="_blank"
                className="text-sm leading-6 text-gray-300 hover:text-white"
              >
                askar.u@qazastroshift.kz
              </a>
            </li>
            <li className="text-white">
              Instagram:{" "}
              <a
                href="https://www.instagram.com/qazastroshift/"
                target="_blank"
                className="text-sm leading-6 text-gray-300 hover:text-white"
              >
                @qazastroshift
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
