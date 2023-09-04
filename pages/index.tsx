import getConfig from "next/config";
import { useState } from "react";

import Layout from "@/components/layout/Layout";
import Banner from "@/components/home/Banner";
import RegisterNow from "@/components/home/RegisterNow";
import Stages from "@/components/home/Stages";
import Schedule from "@/components/home/Schedule";
import Conditions from "@/components/home/Conditions";
import Partners from "@/components/home/Partners";
import SupportedBy from "@/components/home/SupportedBy";
import LoginModal from "@/components/home/LoginModal";
import Navbar from "@/components/layout/Navbar";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <Layout>
      <Navbar openModal={openModal} />
      <Banner />
      <RegisterNow />
      <Stages openModal={openModal} />
      <Schedule />
      <Conditions />
      <Partners />
      {/*<SupportedBy />*/}
      <LoginModal open={modalOpen} setOpen={setModalOpen} close={closeModal} />
    </Layout>
  );
};

export default Home;
