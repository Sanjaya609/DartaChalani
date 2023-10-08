import { Grid } from '@/components/ui'
import { GridColProps } from '@/components/ui/core/Grid/GridCols'
import { Text } from '@/components/ui/core/Text'

interface ICompanyDetailsDisplayForm {
  value: string | number
  label: string
}

const GridColDetailByLabelAndValue = (
  props: ICompanyDetailsDisplayForm & GridColProps
) => {
  const { value, label, ...restProps } = props

  return (
    <Grid.Col
      sm={'sm:col-span-12'}
      md={'md:col-span-6'}
      lg={'lg:col-span-3'}
      {...restProps}
    >
      <Text
        variant="h6"
        color="text-gray-32"
        className="mb-2 leading-100"
        typeface="normal"
      >
        {label}
      </Text>
      <Text
        variant="subtitle2"
        typeface="semibold"
        className="mt-1 leading-100"
        color="text-gray-16"
      >
        {value}
      </Text>
    </Grid.Col>
  )
}

export default GridColDetailByLabelAndValue
