import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../lib/Auth";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ openModal }: { openModal: () => void }) {
  const router = useRouter();
  const activeLang = router.locale;

  const { user, signOut, profile } = useAuth();
  const { t } = useTranslation("common");

  let navigation = [
    { name: t("nav1"), href: "#stages", current: true },
    { name: t("nav2"), href: "#conditions", current: false },
    {
      name: t("nav3"),
      href: "https://drive.google.com/drive/u/1/folders/1-rsklH4ua9cMiCv1qOLu7u1sI7b_K2wi",
      current: false,
    },
    { name: t("nav4"), href: "#footer", current: false },
  ];

  let baseAuthNavigation = [
    { name: t("on_main"), href: "/", current: false },
    { name: t("second_stage"), href: "/second-stage", current: false },
  ];

  const [authNavigation, setAuthNavigation] = useState(baseAuthNavigation);

  useEffect(() => {
    if (profile && profile?.data?.stage === 3) {
      const hasThirdStage = authNavigation.find(
        (item) => item.href === "/third-stage"
      );
      if (!hasThirdStage) {
        setAuthNavigation((prevNav) => [
          ...prevNav,
          {
            name: t("third_stage"),
            href: "/third-stage",
            current: false,
          },
        ]);
      }
    }
  }, [profile]);

  return (
    <Disclosure as="nav" className="">
      {({ open, close }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 absolute left-0 right-0">
            <div className="relative flex h-24 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon
                      className="block h-6 w-6 z-20	"
                      aria-hidden="true"
                    />
                  ) : (
                    <Bars3Icon
                      className="block h-6 w-6 z-20	"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch">
                <div className="hidden sm:ml-6 sm:block w-full">
                  <div
                    className={classNames(
                      "flex space-x-16",
                      user ? "justify-around" : "justify-center"
                    )}
                  >
                    <div className="flex">
                      {(user ? authNavigation : navigation).map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            "text-secondary hover:text-black",
                            "rounded-md px-3 text-xl font-light flex items-center"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                    <div className="flex items-center">
                      {user && (
                        <div className="flex gap-x-2 items-center">
                          <p className="text-gray-500 text-lg">{user?.email}</p>
                          <button
                            className="px-8 py-2 rounded-lg bg-blue-500 text-lg font-medium text-white hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300"
                            onClick={() => signOut()}
                          >
                            {t("nav5")}
                          </button>
                        </div>
                      )}
                      <div className="flex gap-x-2 items-center md:ml-2">
                        {["ru", "en", "kk"].map((lang) => (
                          <a
                            key={lang}
                            onClick={() =>
                              router.push(router.pathname, router.asPath, {
                                locale: lang,
                              })
                            }
                            className={`cursor-pointer ${
                              lang === activeLang
                                ? "text-blue-400 underline"
                                : ""
                            }`}
                          >
                            {lang.toUpperCase()}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden absolute w-full h-full bg-gradient-to-bl from-slate-100 via-sky-200 to-slate-100 z-10">
            {({ close }) => (
              <div className="space-y-1 px-2 pb-3 pt-2">
                {(user ? authNavigation : navigation).map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      "text-secondary hover:text-black",
                      "block rounded-md px-3 py-2 text-base font-medium mt-16 w-full z-index-10"
                    )}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                <hr className="px-8 h-2" />
                <div>
                  <div className="flex gap-x-2 items-center mb-4">
                    {["ru", "en", "kk"].map((lang) => (
                      <Disclosure.Button>
                        <a
                          key={lang}
                          onClick={() =>
                            router.push(router.pathname, router.asPath, {
                              locale: lang,
                            })
                          }
                          className={`cursor-pointer text-xl ${
                            lang === activeLang ? "text-blue-400 underline" : ""
                          }`}
                        >
                          {lang.toUpperCase()}
                        </a>
                      </Disclosure.Button>
                    ))}
                  </div>
                  {user && (
                    <button
                      type="button"
                      className=" w-full rounded-lg bg-blue-500 py-2 text-lg font-medium text-white hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300"
                      onClick={() => signOut()}
                    >
                      Выйти
                    </button>
                  )}
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
