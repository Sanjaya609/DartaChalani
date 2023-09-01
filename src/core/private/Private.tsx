import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import Layout from "../../components/layout";
import { useAuth } from "../../providers/ApplicationProvider";
import { useInitData } from "./Private.query";
import Sidebar from "./Sidebar/Sidebar";
import AcessProvider from "../../providers/AccessProvider";

function Private() {
  const { setUserData, userData, setSubSectorData } = useAuth();
  const [active, setActive] = useState<any>();

  const { data: initData, isSuccess, isFetched } = useInitData();
  useEffect(() => {
    if (isSuccess && isFetched) {
      if (initData?.user) {
        setUserData({
          ...initData,
        });
      }
      if (initData?.subSector) {
        setSubSectorData(initData?.subSector)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initData?.user?.id]);
  return (
    <>
      <AcessProvider>
        <Sidebar />
        <Layout.Main>
          <Header active={active} setActive={setActive} userData={userData} />
          <Outlet />
        </Layout.Main>
      </AcessProvider>
    </>
  );
}

export default Private;
