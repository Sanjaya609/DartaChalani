import { Box } from '@/components/ui/core/Box'
import { Text } from '@/components/ui/core/Text'
// eslint-disable-next-line import/no-cycle
import { DatepickerDropdownProps } from '@/components/functional/Datepicker/datePickerProps'
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

function DatepickerDropdown(props: DatepickerDropdownProps) {
  const { options, label, onSelect } = props
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string | null>('')
  const input = useRef<HTMLInputElement>(null)
  const listElementRef = useRef<HTMLLIElement[]>([])

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        showDropdown &&
        input.current &&
        !input.current.contains(e.target as HTMLElement)
      ) {
        setShowDropdown(false)
      }
    },
    [showDropdown]
  )

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [handleClickOutside])

  useLayoutEffect(() => {
    if (listElementRef.current && listElementRef.current.length) {
      const elem = listElementRef.current.find((el) =>
        el.classList.contains('bg-primary')
      )
      if (elem && showDropdown) {
        elem.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        })
      }
    }
  }, [showDropdown])

  useEffect(() => {
    if (label) setInputValue(label)
  }, [label])

  return (
    <Box className="border-#eee relative w-20 border p-1" ref={input}>
      <Text
        onClick={() => setShowDropdown(!showDropdown)}
        className="text-cool-gray-800 cursor-pointer text-center"
      >
        {inputValue?.toString()}
      </Text>

      {showDropdown && (
        <Box
          className="text-cool-gray-800 absolute left-0 top-full h-auto max-h-48 w-full overflow-auto rounded-lg bg-white  shadow-[0_8px_16px_rgba(0,0,0,0.04),0_4px_8px_rgba(0,0,0,0.08)]"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation()
          }}
        >
          <ul>
            {options.map((option, index: number) => {
              return (
                <li
                  aria-hidden
                  key={option.value}
                  ref={(ref: HTMLLIElement) => {
                    if (ref) listElementRef.current[index] = ref
                    else return null
                  }}
                  className={`cursor-pointer px-2.5 py-1 text-sm ${
                    option.label === inputValue ? 'bg-primary text-white ' : ''
                  } ${option.label === inputValue ? '' : 'hover:bg-gray-200'}`}
                  onClick={() => option && onSelect(option)}
                >
                  {option.label}
                </li>
              )
            })}
          </ul>
        </Box>
      )}
    </Box>
  )
}

export default DatepickerDropdown
