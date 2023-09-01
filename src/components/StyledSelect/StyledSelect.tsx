import React, { CSSProperties, ReactNode, useRef } from "react";
import PropTypes from "prop-types";
import Select, {
  components,
  ValueType,
  InputActionMeta,
  IndicatorProps,
  OptionProps,
  ValueContainerProps,
} from "react-select";
import { useTranslation } from "react-i18next";

/**
 * custom select styles
 */
const selectStyles: Partial<any> = {
  control: (_provided: CSSProperties, state: any) => {
    return {
      background: state.selectProps.searchModule
        ? "#052354"
        : state["isDisabled"]
        ? "#e2e2e2"
        : "#fff",
      color: "#1a1a1a",
      display: "flex",
      width: "100%",
      // height: state.isMulti ? "auto" : "calc(1.3em + 0.5rem + 2px)",
      height: "auto",

      padding: "0.35rem 0.75rem",
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.4,
      zIndex: 1200,
      verticalAlign: "middle",
      border:
        state.isFocused ||
        (!state["isDisabled"] &&
          state["selectProps"] &&
          state["selectProps"].touched &&
          !state["hasValue"])
          ? "1px solid #97b7e7"
          : "1px solid #adb5bd",
      // boxShadow: state.isFocused ? "inset 0 0 4px #1071e5" : "none",
      // borderRadius: "4px",
      appearance: "none",
      minHeight: "auto",
      borderRadius: "2px",
      ...state.selectProps.customStyles,
    };
  },
  dropdownIndicator: (provided: CSSProperties) => ({
    ...provided,
    paddingTop: 0,
    paddingBottom: 0,
    minHeight: "auto",
    padding: "4px",
  }),
  indicatorsContainer: (provided: CSSProperties) => ({
    ...provided,
    // height: "14px",
    // position: "absolute",
    // right: 0,
    // top: 0,
    // display: "none",
  }),
  indicatorSeparator: (provided: CSSProperties) => ({
    ...provided,
    display: "none",
  }),
  clearIndicator: (provided: CSSProperties) => ({
    ...provided,
    paddingTop: 0,
    paddingBottom: 0,
    minHeight: "auto",
    // width: "14px",
    padding: "2px",
    // padding: "3px 0",
    svg: {
      fill: "#f44336 !important",
    },
  }),
  loadingIndicator: (provided: CSSProperties) => ({
    ...provided,
    color: "#000000",
    padding: ".5rem .25rem",
    marginRight: 0,
  }),
  loadingMessage: (provided: CSSProperties) => ({
    ...provided,
    paddingTop: ".25rem",
    paddingBottom: ".25rem",
    fontSize: "0.875em",
  }),
  menu: (provided: CSSProperties, state: any) => ({
    ...provided,
    marginTop: ".5rem",
    marginBottom: 0,
    borderRadius: 0,
    // marginTop: 0,
    // marginBottom: 0,
    zIndex: 9999,
    backgroundColor: state.selectProps.searchModule
      ? "#052354"
      : provided.backgroundColor,
  }),
  menuList: (provided: CSSProperties, state: any) => ({
    ...provided,
    paddingTop: 0,
    zIndex: 9999,
    paddingBottom: 0,
    backgroundColor: state.selectProps.searchModule
      ? "#052354"
      : provided.backgroundColor,
  }),
  noOptionsMessage: (provided: CSSProperties, state: any) => ({
    ...provided,
    paddingTop: ".5rem",
    paddingBottom: ".5rem",
    fontSize: "0.875em",
    color: state.selectProps.searchModule ? "#ACD4FF" : provided.color,
    backgroundColor: state.selectProps.searchModule && "#0da3b8",
  }),
  option: (provided: CSSProperties, { data, isSelected, selectProps }: any) => {
    return {
      ...provided,
      backgroundColor: isSelected ? "#98c1ff" : provided.backgroundColor,
      color: data.color ? data.color : provided.color,
      fontWeight: data.color ? "800" : provided.fontWeight,
      cursor: "pointer",
      paddingTop: ".25rem",
      paddingBottom: ".25rem",
      fontSize: "0.875rem",
      // backgroundColor: (selectProps.searchModule && isSelected) ? '#0da3b8' : (selectProps.searchModule && isFocused) ? '#0da3b8' : isSelected ? "#98c1ff" : provided.backgroundColor,
      // color: selectProps.searchModule ? "#ACD4FF" : data.color ? data.color : provided.color,
      "&:hover": { backgroundColor: selectProps.searchModule && "#0da3b8" },
    };
  },
  placeholder: (provided: CSSProperties) => ({
    ...provided,
    color: "#b3b3b3",
    fontSize: ".875rem",
  }),
  input: () => {
    return {};
  },
  singleValue: (provided: CSSProperties, { getValue, selectProps }: any) => ({
    ...provided,
    lineHeight: 1.4,
    color: selectProps.searchModule
      ? "#ACD4FF"
      : getValue().length && getValue()[0].color
      ? getValue()[0].color
      : "#1a1a1a",
    fontWeight:
      getValue().length && getValue()[0].color ? 800 : provided.fontWeight,
  }),
  multiValue: (provided: CSSProperties) => ({
    ...provided,
  }),
  valueContainer: (provided: CSSProperties) => ({
    ...provided,
    minHeight: "auto",
    // flexWrap: state.selectProps.showDefaultValueContainer ? "wrap" : "nowrap",
    overflowX: "auto",
    padding: "0",
    // paddingLeft: 0,
    // paddingRight: 0,
    // color: state.selectProps.searchModule ? '#ACD4FF' : "#666666",
  }),
  container: (provided: CSSProperties) => {
    return {
      ...provided,
      padding: 0,
      flexGrow: "1",
    };
  },
};

/**
 * Dropdown indicator element
 */
const DropdownIndicator = (props: IndicatorProps<any, IsMulti>) => {
  return (
    <components.DropdownIndicator {...props}>
      {props.selectProps.customDropdownIcon ? (
        props.selectProps.customDropdownIcon
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={8}
          height={8}
          viewBox="0 0 255 255"
          style={{ fontSize: "8px" }}
        >
          <path d="M0 63.75l127.5 127.5L255 63.75z" />
        </svg>
      )}
    </components.DropdownIndicator>
  );
};

/**
 * Clear indicator element
 */
const ClearIndicator = (props: IndicatorProps<any, IsMulti>) => {
  return (
    <components.ClearIndicator {...props}>
      <svg
        height={17}
        width={17}
        viewBox="0 0 20 20"
        aria-hidden={true}
        style={{ fill: "#cccccc", fontSize: "8px" }}
      >
        <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
      </svg>
    </components.ClearIndicator>
  );
};

/**
 * Checkbox Option Container
 */
const CheckboxOption = (props: OptionProps<any, IsMulti>) => {
  return (
    <div>
      <components.Option {...props}>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            checked={props.isSelected}
            onChange={() => null}
          />
          <label className="form-check-label" style={{ cursor: "pointer" }}>
            {props.label}
          </label>
        </div>
      </components.Option>
    </div>
  );
};

/**
 * Checkbox All Select Option
 */
const allOption = {
  label: "Select all",
  value: "*",
};

/**
 * Checkbox Option Container
 */
const ValueContainer = (props: ValueContainerProps<OptionType, IsMulti>) => {
  const { children, ...args } = props;

  const currentValues = args.getValue();
  let selectedCount = currentValues.length;
  // const {t} = useTranslation()

  if (currentValues.some((val: OptionType) => val.value === allOption.value)) {
    selectedCount = currentValues.length - 1;
  }
  return (
    <components.ValueContainer {...args}>
      <div style={selectedCount ? {} : { color: "#b3b3b3" }} className="mr-2">
        {selectedCount ? (
          <>
            `${selectedCount} selected`, `${selectedCount} selected`
          </>
        ) : (
        `${'chooseOption'}...`
        )}
      </div>
      {/* This element contains the event for opening and closing the select input */}
      {children instanceof Array ? children[1] : null}
    </components.ValueContainer>
  );
};

interface OnMultiCheckboxSelectProps {
  selected: ValueType<OptionType, IsMulti>;
  action: string;
  onMultiChange: (event: ValueType<OptionType, IsMulti>) => void;
  options: OptionType[];
  showDefaultValueContainer: boolean;
}
/**
 * On Multiple Checkbox Select
 */
const onMultiCheckboxSelect = ({
  selected,
  action,
  onMultiChange,
  options,
  showDefaultValueContainer,
}: OnMultiCheckboxSelectProps) => {
  if (selected !== null && selected instanceof Array && selected.length > 0) {
    if (selected[selected.length - 1].value === allOption.value) {
      return showDefaultValueContainer
        ? onMultiChange(options)
        : onMultiChange([allOption, ...options]);
    }

    let result: OptionType[] = [];
    if (selected.length === options.length) {
      if (selected.includes(allOption)) {
        result = selected.filter((option) => option.value !== allOption.value);
      } else if (action === "select-option") {
        result = showDefaultValueContainer ? options : [allOption, ...options];
      }
      return onMultiChange(result);
    }

    return onMultiChange(selected);
  } else {
    return onMultiChange([]);
  }
};

/**
 * Generic dropdown component
 */
export interface OptionType {
  label: string;
  value: string | number;
}
export type IsMulti = boolean;
interface OnChangeType {
  name: string;
  value: ValueType<OptionType, IsMulti>;
  main?: string | number;
}
interface OnInputType {
  newValue: string;
  actionMeta?: InputActionMeta;
}

export interface StyledSelectProps {
  touched?: boolean;
  onBlur?: (name: string, active: boolean) => any;
  placeholder?: string;
  id?: string;
  name?: string;
  isSearchable?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  options: OptionType[];
  onChange: ({ name, value, main }: OnChangeType) => void;
  onInputChange?: ({ newValue, actionMeta }: OnInputType) => void;
  value: ValueType<OptionType, IsMulti> | number | string;
  multi?: IsMulti;
  multiCheckbox?: IsMulti;
  autoFocus?: boolean | undefined;
  className?: string;
  searchModule?: boolean | any;
  filterModule?: boolean;
  customStyles?: CSSProperties;
  userCustomOption?: boolean;
  calculateValueOnChange?: boolean;
  customDropdownIcon?: ReactNode;
  /** Show values instead of 1,2 selected and removes checkbox*/
  showDefaultValueContainer?: boolean;
}
function StyledSelect(props: StyledSelectProps) {
  const {
    touched,
    onBlur,
    placeholder,
    id,
    name = "",
    isSearchable,
    isLoading,
    isDisabled,
    options,
    onChange,
    onInputChange,
    value,
    multi,
    multiCheckbox,
    autoFocus,
    className,
    searchModule,
    filterModule,
    customStyles,
    calculateValueOnChange,
    customDropdownIcon,
    showDefaultValueContainer = false,
  } = props;
  const imageDivRef = useRef([]);
  const {t}= useTranslation()
  const calculateValue = () => {
    if (calculateValueOnChange) {
      if (multi || multiCheckbox) {
        let updatedValue = value as OptionType[];

        if (
          updatedValue?.length &&
          options.length &&
          updatedValue?.length === options.length
        ) {
          updatedValue = showDefaultValueContainer
            ? updatedValue
            : [...updatedValue, allOption];
        }
        return (updatedValue as ValueType<OptionType, IsMulti>) || null;
      } else {
        if (value instanceof Array) {
          return options.length
            ? options.find(
                (option) =>
                  option.value === (value as unknown as OptionType)?.value
              ) || null
            : null;
        }
        return options?.length
          ? options.find(
              (option) =>
                option?.value && option?.value?.toString() === value?.toString()
            ) || null
          : null;
      }
    }

    return (value as ValueType<OptionType, IsMulti>) || null;
  };

  return (
    <Select
      isMulti={multi || multiCheckbox}
      closeMenuOnSelect={!multiCheckbox}
      // hideSelectedOptions={!multiCheckbox}

      placeholder={
        placeholder || onInputChange ? placeholder : `${t('chooseOption')}....`
      }
      id={id}
      name={name}
      onBlur={() => onBlur && onBlur(name, true)}
      onChange={(selected: any, actionMeta) => {
        // MultiSelect
        if (multiCheckbox) {
          onMultiCheckboxSelect({
            selected,
            action: actionMeta.action,
            onMultiChange: (selected) => onChange({ name, value: selected }),
            options,
            showDefaultValueContainer,
          });
        } else {
          onChange({ name, value: selected, main: selected?.value });
        }
      }}
      searchModule={searchModule}
      filterModule={filterModule}
      onInputChange={(value, actionMeta) => {
        onInputChange && onInputChange({ newValue: value, actionMeta });
      }}
      value={calculateValue()}
      touched={touched}
      options={
        multiCheckbox && options.length
          ? showDefaultValueContainer &&
            options.length === (value as OptionType[])?.length
            ? options
            : [allOption, ...options]
          : options
      }
      autoFocus={autoFocus}
      isSearchable={isSearchable}
      isLoading={isLoading}
      isDisabled={isDisabled}
      loadingMessage={() => "Fetching Data..."}
      components={
        !multiCheckbox
          ? { DropdownIndicator, ClearIndicator }
          : showDefaultValueContainer
          ? { DropdownIndicator, ClearIndicator }
          : {
              Option: CheckboxOption,
              ValueContainer,
              DropdownIndicator,
              ClearIndicator,
            }
      }
      styles={selectStyles}
      menuPlacement="auto"
      className={className}
      autoComplete="off"
      customStyles={customStyles || {}}
      imageDivRef={imageDivRef}
      isClearable={true}
      customDropdownIcon={customDropdownIcon}
    />
  );
}

StyledSelect.propTypes = {
  /** touched if select is dirty */
  touched: PropTypes.bool,
  /** on blur action */
  onBlur: PropTypes.func,
  /** select placeholder */
  placeholder: PropTypes.string,
  /** select id */
  id: PropTypes.string,
  /** select name for form */
  name: PropTypes.string,
  /** enable/disable search */
  isSearchable: PropTypes.bool,
  /** enable/disable data loading animation */
  isLoading: PropTypes.bool,
  /** enable/disable select */
  isDisabled: PropTypes.bool,
  /** options list */
  options: PropTypes.array.isRequired,
  /** on select change action */
  onChange: PropTypes.func,
  /** value for select */
  value: PropTypes.object || PropTypes.any,
  /** enable/disable multi select */
  multi: PropTypes.bool,
  /** enable/disable autofocus */
  autoFocus: PropTypes.bool,
  /** custom classname */
  className: PropTypes.string,
};

StyledSelect.defaultProps = {
  touched: false,
  isSearchable: true,
  isLoading: false,
  isDisabled: false,
  options: [],
  multi: false,
  autoFocus: false,
};

export default StyledSelect;
