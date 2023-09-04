import getConfig from "next/config";
import { useEffect, useState } from "react";

import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import Banner from "@/components/third_stage/Banner";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/Auth";
import UploadReport from "@/components/third_stage/UploadReport";
import Lessons from "@/components/third_stage/Lessons";

const Home = () => {
  const { profile, user } = useAuth();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const supabase = createClientComponentClient();
  const closeModal = () => {
    setModalOpen(false);
  };
  const openModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    if ((profile !== undefined && profile.status !== 200) || !user) {
      router.push("/");
    }
  }, [profile]);

  return (
    <Layout>
      <Navbar openModal={openModal} />
      <Banner />
      <UploadReport />
      <Lessons />
    </Layout>
  );
};

export default Home;
