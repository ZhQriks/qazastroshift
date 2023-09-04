import getConfig from "next/config";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const { publicRuntimeConfig } = getConfig();

type LayoutProps = {
  title?: string;
  description?: string;
  date?: string;
  socialPreview?: string;
  children: React.ReactNode;
};

const Layout = ({ children, ...customMeta }: LayoutProps) => {
  const router = useRouter();
  const { asPath } = router;

  const { name, url, title, description, socialPreview } =
    publicRuntimeConfig.site;

  const meta = {
    name,
    url,
    title,
    description,
    socialPreview,
    ...customMeta,
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" key="favicon" />
        <link rel="canonical" href={`${url}${asPath}`} key="canonical" />

        {/* Instagram */}
        <meta
          name="instagram:card"
          content="summary_large_image"
          key="instagram_card"
        />
        <meta
          name="instagram:title"
          content={meta.title}
          key="instagram_title"
        />
        <meta
          name="instagram:description"
          content={meta.description}
          key="instagram_description"
        />
        <meta
          name="instagram:image"
          content={`${url}${socialPreview}`}
          key="instagram_image"
        />

        {/* Open Graph */}
        <meta property="og:url" content={`${url}${asPath}`} key="og_url" />
        <meta
          property="og:site_name"
          content="Республиканский конкурс рекетостроения QazAstroShift!"
          key="og_site_name"
        />
        <meta property="og:title" content={meta.title} key="og_title" />
        <meta
          property="og:description"
          content={meta.description}
          key="og_description"
        />
        <meta
          property="og:image"
          content={`${url}${socialPreview}`}
          key="og_image"
        />
        <meta property="og:image:width" content={`1200`} key="og_image_width" />
        <meta
          property="og:image:height"
          content={`630`}
          key="og_image_height"
        />
        <meta
          name="keywords"
          content="QazAstroShift, rocket engineering, tournament, Kazakhstan, rockets, skills, designing, building"
        />
        <meta
          name="ru:description"
          content="QazAstroShift — турнир по ракетостроению, проводимый в Казахстане, участники которого демонстрируют свои навыки в проектировании и строительстве ракет. Присоединяйтесь к нам для волнующего опыта"
        />
        <meta name="author" content="QazAstroShift Team" />
        <meta name="robots" content="index, follow" />

        <meta name="description" content={meta.description} key="description" />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
        <title key="title">{meta.title}</title>
      </Head>
      <main style={{ width: "100vw" }}>
        {children}
        <Footer />
      </main>
    </>
  );
};

export default Layout;
