import { OptionType } from "../components/StyledSelect/StyledSelect";

export const getOptionTypeLabelValueArray = (dataArray: any[]) => {
  const returnData: OptionType[] = dataArray?.map((item) => {
    return {
      ...item,
      value: item.id ?? item?.aimAndResultIndicatorDetailId,
      label: item.name ?? item?.fiscalYearNameNp ?? item?.subSectorNameNepali ?? item?.sectoralAimAndResultIndicatorName ?? item?.aimAndResultIndicatorName,
    };
  });
  return returnData;
};