import getConfig from "next/config";
import { useEffect, useState } from "react";

import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import Banner from "@/components/second_stage/Banner";
import {
  createClientComponentClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/Auth";
import UploadReport from "@/components/second_stage/UploadReport";
import Lessons from "@/components/second_stage/Lessons";

const Home = () => {
  const { user } = useAuth();
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
    if (!user) {
      router.push("/");
    }
  }, [user]);

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
