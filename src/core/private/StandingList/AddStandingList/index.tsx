import Form from '@/components/functional/Form/Form'
import SectionHeader from '@/components/functional/SectionHeader'
import { Box, Button, Grid, Layout } from '@/components/ui'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { useTranslation } from 'react-i18next'

const AddStandingList = () => {
  const { t } = useTranslation()
  return (
    <FlexLayout direction="column">
      <SectionHeader title={t('standingList.title')} />

      <Layout.Absolute scrollable className="grow" removeAbsolute>
        <ContainerLayout>
          <form className="w-full">
            <Grid sm={'sm:grid-cols-12'} gap="gap-4">
              <Grid.Col sm={'sm:col-span-4'}>
                <Form.Input
                  name="nameEn"
                  label={t('masterSetup.serviceType.nameEn')}
                />
              </Grid.Col>
            </Grid>
          </form>
        </ContainerLayout>
      </Layout.Absolute>

      <Box className="mt-4 w-full text-right">
        <ContainerLayout>
          <Button
            type="button"
            btnType="outlined"
            variant="secondary"
            className="mr-3"
          >
            {t('btns.cancel')}
          </Button>
          <Button className="ml-auto">{t('btns.save')}</Button>
        </ContainerLayout>
      </Box>
    </FlexLayout>
  )
}

export default AddStandingList
