import SectionHeader from '@/components/functional/SectionHeader'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import FiscalYearWrapper from './components/FiscalYearWrapper'

const FiscalYear = () => {
  return (
    <FlexLayout direction="column">
      <SectionHeader title="Fiscal Year" />
      <FiscalYearWrapper />
    </FlexLayout>
  )
}

export default FiscalYear
