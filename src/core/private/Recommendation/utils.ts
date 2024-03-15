export const getValidationEnumForFieldType = (fieldType: string) => {
    switch (fieldType) {
        case "RADIO":
            return "RADIO_INPUT";
        case "ENGLISHDATEPICKER":
            return "DATE";
        case "NEPALIDATEPICKER":
            return "DATE";
        default:
            return fieldType;
    }
}