import React, { useState } from "react";
import Layout from "../../../../components/layout";
import { HeaderTitle } from "../../../../components/Header/Header";
import Button from "../../../../components/derived/Buttons/Buttons";
import { FiscalYearData, fiscayearIntialValue } from "./schema";
import FiscalyearForm from "./FiscalyearForm";
import FiscalyearTable from "./FiscalyearTable";
import { useTranslation } from "react-i18next";

function Fiscalyear() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] =
    useState<FiscalYearData>(fiscayearIntialValue);
  const toggle = () => setIsOpen(!isOpen);
  const { t } = useTranslation();
  return (
    <>
      <Layout.Header>
        <HeaderTitle>{t("fiscalYearSetup")}</HeaderTitle>
        <Button
          className="btn btn-primary btn-icon lft"
          onClick={() => {
            setFormData(fiscayearIntialValue);
            toggle();
          }}
        >
          <i className="ic-add"></i>
          {t("create")}
        </Button>
      </Layout.Header>
      <div className="flex-grow-1 my-3">
        <Layout.Container stretch>
          <FiscalyearForm toggle={toggle} isOpen={isOpen} formData={formData} />
          <Layout.Flex>
            <FiscalyearTable toggle={toggle} setFormData={setFormData} />
          </Layout.Flex>
        </Layout.Container>
      </div>
    </>
  );
}

export default Fiscalyear;
