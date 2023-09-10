import React, {
  CSSProperties,
  ReactNode,
  SyntheticEvent,
  useRef,
  useMemo,
} from 'react'
import Select, {
  components,
  createFilter,
  IndicatorProps,
  InputActionMeta,
  OptionProps,
  Styles,
  ValueContainerProps,
  ValueType,
  OptionsType,
} from 'react-select'
import { base, gray, red } from '@/theme/colors'
import { getErrorStatus } from '@/utility/inputUtils/input-error'
import { FormikTouched } from 'formik'
import { FormikErrors } from 'formik/dist/types'
import { useTranslation } from 'react-i18next'
import { Primitive } from 'type-fest'
import { Icon } from '@/components/ui'
import { X } from 'phosphor-react'
import './select.css'

/**
 * custom select styles
 */
const selectStyles: Partial<Styles<TAny, boolean>> = {
  control: (_provided: CSSProperties, state) => {
    return {
      background: state.selectProps.searchModule
        ? '#052354'
        : state['isDisabled']
        ? gray['24']
        : '#fff',
      color: gray[24],
      display: 'flex',
      width: '100%',
      height: 'auto',
      padding: '0.45rem 1rem',
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.4,
      zIndex: 9999999,
      verticalAlign: 'middle',
      border:
        state.isFocused ||
        (!state['isDisabled'] &&
          state['selectProps'] &&
          state['selectProps'].touched &&
          !state['hasValue'])
          ? `1px solid ${gray[56]}`
          : `1px solid ${gray[80]}`,
      // boxShadow: state.isFocused ? "inset 0 0 4px #1071e5" : "none",
      // borderRadius: "4px",
      appearance: 'none',
      minHeight: 'auto',
      ...state.selectProps.customStyles,
    }
  },
  dropdownIndicator: (provided: CSSProperties) => ({
    ...provided,
    paddingTop: 0,
    paddingBottom: 0,
    minHeight: 'auto',
    padding: '4px',
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
    display: 'none',
  }),
  clearIndicator: (provided: CSSProperties) => ({
    ...provided,
    paddingTop: 0,
    paddingBottom: 0,
    minHeight: 'auto',
    // padding: "3px 0",
  }),
  loadingIndicator: (provided: CSSProperties) => ({
    ...provided,
    color: '#000000',
    padding: '.5rem .25rem',
    marginRight: 0,
  }),
  loadingMessage: (provided: CSSProperties) => ({
    ...provided,
    paddingTop: '.25rem',
    paddingBottom: '.25rem',
    fontSize: '0.875em',
  }),
  menu: (provided: CSSProperties, state) => ({
    ...provided,
    marginTop: '.5rem',
    marginBottom: 0,
    borderRadius: 0,
    // marginTop: 0,
    // marginBottom: 0,
    zIndex: 9999,
    backgroundColor: state.selectProps.searchModule
      ? '#052354'
      : provided.backgroundColor,
  }),
  menuList: (provided: CSSProperties, state) => ({
    ...provided,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: state.selectProps.searchModule
      ? '#052354'
      : provided.backgroundColor,

    '::-webkit-scrollbar': {
      width: '6px',
      height: '6px',
    },
    '::-webkit-scrollbar-track': {
      background: '#d2d2d6',
      borderRadius: '4px',
    },
    '::-webkit-scrollbar-thumb': {
      background: `${gray[24]}`,
      borderRadius: '4px',
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: '#d2d2d6',
      cursor: 'pointer',
    },
  }),
  noOptionsMessage: (provided: CSSProperties, state) => ({
    ...provided,
    paddingTop: '.5rem',
    paddingBottom: '.5rem',
    fontSize: '0.875em',
    color: state.selectProps.searchModule ? '#ACD4FF' : provided.color,
    backgroundColor: state.selectProps.searchModule && '#0da3b8',
  }),
  option: (provided: CSSProperties, { data, isSelected, selectProps }) => {
    return {
      ...provided,
      backgroundColor: isSelected ? base.primary : provided.backgroundColor,
      color: data.color ? data.color : provided.color,
      fontWeight: data.color ? '800' : provided.fontWeight,
      cursor: 'pointer',
      paddingTop: '.25rem',
      paddingBottom: '.25rem',
      fontSize: '0.875rem',
      // backgroundColor: (selectProps.searchModule && isSelected) ? '#0da3b8' : (selectProps.searchModule && isFocused) ? '#0da3b8' : isSelected ? "#98c1ff" : provided.backgroundColor,
      // color: selectProps.searchModule ? "#ACD4FF" : data.color ? data.color : provided.color,
      '&:hover': { backgroundColor: selectProps.searchModule && '#0da3b8' },
    }
  },
  placeholder: (provided: CSSProperties) => ({
    ...provided,
    color: '#b3b3b3',
    fontSize: '.875rem',
  }),
  input: () => {
    return {}
  },
  singleValue: (provided: CSSProperties, { getValue, selectProps }) => ({
    ...provided,
    lineHeight: 1.4,
    color: selectProps.searchModule
      ? '#ACD4FF'
      : getValue().length && getValue()[0].color
      ? getValue()[0].color
      : '#1a1a1a',
    fontWeight:
      getValue().length && getValue()[0].color ? 800 : provided.fontWeight,
  }),
  multiValue: (provided: CSSProperties) => ({
    ...provided,
    display: 'flex',
    background: gray[92],
    cursor: 'pointer',
    marginRight: '0.5rem',
  }),
  valueContainer: (provided: CSSProperties) => ({
    ...provided,
    minHeight: 'auto',
    // flexWrap: state.selectProps.showDefaultValueContainer ? "wrap" : "nowrap",
    overflowX: 'auto',
    padding: '0',
    // paddingLeft: 0,
    // paddingRight: 0,
    // color: state.selectProps.searchModule ? '#ACD4FF' : "#666666",
  }),
  container: (provided: CSSProperties) => {
    return {
      ...provided,
      padding: 0,
      flexGrow: '1',
    }
  },
  multiValueLabel: (provided: CSSProperties) => ({
    ...provided,
    fontSize: '0.75rem',
    fontWeight: 400,
    padding: '0.25rem',
    color: gray[16],
  }),
}

/**
 * Dropdown indicator element
 */
const DropdownIndicator = (props: IndicatorProps<any, IsMulti>) => {
  const { selectProps } = props

  return !props.selectProps.iconLeft ? (
    <components.DropdownIndicator {...props}>
      {props.selectProps.iconRight ? (
        <>{selectProps.iconRight}</>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M4 8L12 16L20 8H4Z" fill="#CCCCCC" />
        </svg>

        // <svg
        //   xmlns="http://www.w3.org/2000/svg"
        //   width={8}
        //   height={8}
        //   viewBox="0 0 255 255"
        //   style={{ fontSize: '8px' }}>
        //   <path d="M0 63.75l127.5 127.5L255 63.75z" />
        // </svg>
        // <i className="ic-search"></i>
      )}
    </components.DropdownIndicator>
  ) : (
    <></>
  )
}

/**
 * Clear indicator element
 */
const ClearIndicator = (props: IndicatorProps<TAny, IsMulti>) => {
  return (
    <components.ClearIndicator {...props}>
      <Icon size={'sm'} icon={X} className="cursor-pointer  text-gray-48" />
    </components.ClearIndicator>
  )
}

/**
 * Checkbox Option Container
 */
const CheckboxOption = (props: OptionProps<TAny, IsMulti>) => {
  return (
    <div>
      <components.Option {...props}>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="form-check-input mr-2"
            checked={props.isSelected}
            onChange={() => null}
          />
          <label className="form-check-label" style={{ cursor: 'pointer' }}>
            {props.label}
          </label>
        </div>
      </components.Option>
    </div>
  )
}

/**
 * Checkbox All Select Option
 */
const allOption = {
  label: 'Select all',
  value: '*',
}
export const deSelectAllOptionsValue = {
  label: 'Deselect All',
  value: '*',
}

/**
 * Checkbox Option Container
 */
const ValueContainer = (props: ValueContainerProps<OptionType, IsMulti>) => {
  const { children, ...args } = props

  const currentValues = args.getValue()
  let selectedCount = currentValues.length

  if (currentValues.some((val: OptionType) => val.value === allOption.value)) {
    selectedCount = currentValues.length - 1
  }
  return (
    <components.ValueContainer {...args}>
      <div style={selectedCount ? {} : { color: '#b3b3b3' }} className="mr-2">
        {selectedCount ? (
          <>{`${selectedCount} selected`}</>
        ) : (
          'Choose Option...'
        )}
      </div>
      {/* This element contains the event for opening and closing the select input */}
      {children instanceof Array ? children[1] : null}
    </components.ValueContainer>
  )
}

const DefaultValueContainer = (
  props: ValueContainerProps<OptionType, IsMulti>
) => {
  const { children, selectProps, ...args } = props
  return (
    components.ValueContainer && (
      <components.ValueContainer selectProps={selectProps} {...args}>
        {!!children && selectProps?.iconLeft}

        <div className="flex items-center">{children}</div>
      </components.ValueContainer>
    )
  )
}

interface OnMultiCheckboxSelectProps {
  selected: ValueType<OptionType, IsMulti>
  action: string
  onMultiChange: (event: ValueType<OptionType, IsMulti>) => void
  options: OptionType[]
  showDefaultValueContainer: boolean
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
        : onMultiChange([allOption, ...options])
    }

    let result: OptionType[] = []
    if (selected.length === options.length) {
      if (selected.includes(allOption)) {
        result = selected.filter((option) => option.value !== allOption.value)
      } else if (action === 'select-option') {
        result = showDefaultValueContainer ? options : [allOption, ...options]
      }
      return onMultiChange(result)
    }

    return onMultiChange(selected)
  } else {
    return onMultiChange([])
  }
}

/**
 * Generic dropdown component
 */

export type IsMulti = boolean
export interface OnChangeType {
  name: string
  value: ValueType<OptionType, IsMulti>
  main?: string | number
}
interface OnInputType {
  newValue: string
  actionMeta?: InputActionMeta
}

export interface StyledSelectProps {
  touch?: boolean
  onBlur?: (event: SyntheticEvent<TAny>) => void
  placeholder?: string
  id?: string
  name?: string
  isSearchable?: boolean
  isLoading?: boolean
  isDisabled?: boolean
  options: OptionType[]
  onChange: ({ name, value, main }: OnChangeType) => void
  onInputChange?: ({ newValue, actionMeta }: OnInputType) => void
  value: ValueType<OptionType, IsMulti> | number | string
  multi?: IsMulti
  multiCheckbox?: IsMulti
  autoFocus?: boolean | undefined
  className?: string
  searchModule?: boolean
  filterModule?: boolean
  customStyles?: CSSProperties
  userCustomOption?: boolean
  calculateValueOnChange?: boolean
  customDropdownIcon?: ReactNode
  /** Show values instead of 1,2 selected and removes checkbox*/
  showDefaultValueContainer?: boolean
  controlShouldRenderValue?: boolean
  filterOption?: TAny
  iconRight?: React.ReactElement
  error?: boolean
  touched?: FormikTouched<TAny>
  errors?: FormikErrors<TAny>
  status?: { [key: string]: TAny | undefined }
  isFieldArray?: IFieldArrayProps
  iconLeft?: React.ReactElement
  isPortal?: boolean
  notClearable?: boolean
}
function StyledSelect(props: StyledSelectProps) {
  const {
    onBlur,
    placeholder,
    id,
    name = '',
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
    controlShouldRenderValue,
    filterOption,
    iconRight,
    error,
    touched,
    errors,
    status,
    isFieldArray,
    iconLeft,
    isPortal,
    notClearable,
    touch,
  } = props

  const {
    i18n: { language },
  } = useTranslation()
  const imageDivRef = useRef([])

  const calculateValue = useMemo(() => {
    if (!calculateValueOnChange)
      return value && typeof value === 'object' && 'labelNp' in value
        ? {
            ...value,
            label:
              value.labelNp && language === 'ne'
                ? value.labelNp
                : value.labelEn || value.label,
          }
        : value

    const returnLabelByLanguageOptions = options.map((option) => ({
      ...option,
      label:
        option?.labelNp && language === 'ne' ? option.labelNp : option.label,
      labelEn: option?.labelEn || option.label,
    }))

    if (multi || multiCheckbox) {
      return (returnLabelByLanguageOptions as []).filter(
        (option: OptionType<Primitive>) =>
          (value as unknown as Primitive[])?.includes(option.value)
      )
    }

    return (returnLabelByLanguageOptions as []).find(
      (option: OptionType<Primitive>) => value === option.value
    )
  }, [calculateValueOnChange, value, options, multi, multiCheckbox, language])

  const computedOptions = useMemo(() => {
    const returnLabelByLanguageOptions = options.map((option) => ({
      ...option,
      label:
        option?.labelNp && language === 'ne' ? option.labelNp : option.label,
      labelEn: option?.labelEn || option.label,
    }))

    if (!(multiCheckbox || multi) || !returnLabelByLanguageOptions.length)
      return returnLabelByLanguageOptions as OptionsType<OptionType>

    let selectAll = { ...allOption }
    if (returnLabelByLanguageOptions?.length === (calculateValue as [])?.length)
      selectAll = { ...deSelectAllOptionsValue }
    else selectAll.label = allOption.label

    return [selectAll, ...options] as OptionsType<OptionType>
  }, [options, multiCheckbox, multi, calculateValue, language])

  const errorStatus = getErrorStatus({
    name: name || id || '',
    error,
    errors,
    status,
    touched,
    isFieldArray,
  })

  return (
    <Select
      ariaLabel={id || name}
      isMulti={multi || multiCheckbox}
      closeMenuOnSelect={!multiCheckbox}
      // hideSelectedOptions={!multiCheckbox}
      menuPortalTarget={isPortal ? document.body : null}
      placeholder={
        placeholder || onInputChange ? placeholder : 'Choose Option....'
      }
      id={id || name}
      name={name || id}
      onBlur={(e) => {
        if (onBlur) {
          const event = {
            ...e,
            target: {
              ...e.target,
              name: name || id,
              id: name || id,
            },
          }
          onBlur(event)
        }
      }}
      onChange={(selected, actionMeta) => {
        // MultiSelect
        if (multiCheckbox) {
          onMultiCheckboxSelect({
            selected,
            action: actionMeta.action,
            onMultiChange: (selected) => onChange({ name, value: selected }),
            options,
            showDefaultValueContainer,
          })
        } else {
          onChange({
            name: name || id || '',
            value: selected,
            main: selected?.value,
          })
        }
      }}
      searchModule={searchModule}
      filterModule={filterModule}
      onInputChange={(value, actionMeta) => {
        onInputChange && onInputChange({ newValue: value, actionMeta })
      }}
      value={calculateValue}
      touched={touch}
      options={computedOptions}
      autoFocus={autoFocus}
      isSearchable={isSearchable}
      isLoading={isLoading}
      isDisabled={isDisabled}
      loadingMessage={() => 'Fetching Data...'}
      components={
        !multiCheckbox
          ? {
              DropdownIndicator,
              ClearIndicator,
              ValueContainer: DefaultValueContainer,
            }
          : showDefaultValueContainer
          ? {
              DropdownIndicator,
              ClearIndicator,
              ValueContainer: DefaultValueContainer,
            }
          : {
              Option: CheckboxOption,
              ValueContainer,
              DropdownIndicator,
              ClearIndicator,
            }
      }
      styles={{
        ...selectStyles,
        ...(isPortal && { menuPortal: (base) => ({ ...base, zIndex: 9999 }) }),
      }}
      menuPlacement="auto"
      className={className}
      autoComplete="off"
      customStyles={
        errorStatus && customStyles
          ? { customStyles, borderColor: red[24] }
          : errorStatus
          ? { borderColor: red[24] }
          : customStyles || {}
      }
      imageDivRef={imageDivRef}
      isClearable={notClearable ? false : true}
      customDropdownIcon={customDropdownIcon}
      iconRight={iconRight}
      iconLeft={iconLeft}
      controlShouldRenderValue={controlShouldRenderValue}
      filterOption={
        filterOption
          ? (value: { data: { filterValue: string } }, input) => {
              return value?.data?.filterValue
                ?.toLowerCase()
                .includes(input?.toLowerCase())
            }
          : createFilter({
              matchFrom: 'any',
              stringify: (option) => `${option.label} ${option.value}`,
            })
      }
    />
  )
}

export default StyledSelect
