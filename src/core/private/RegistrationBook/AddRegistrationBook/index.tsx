import DocumentsUpload from '@/components/functional/Documents/DocumentsUpload'
import Form from '@/components/functional/Form/Form'
import SectionHeader from '@/components/functional/SectionHeader'
import { Box, Button, Grid, Layout } from '@/components/ui'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import { useTranslation } from 'react-i18next'

const AddRegistrationBook = () => {
  const { t } = useTranslation()
  return (
    <>
      <SectionHeader title={t('registrationBook.title')} />
      {/* <Layout.Absolute scrollable className="grow"> */}
      <ContainerLayout className="grow">
        <form>
          <Grid sm={'sm:grid-cols-12'} gap="gap-4">
            <Grid.Col sm={'sm:col-span-3'}>
              <Form.Input label="test" />
            </Grid.Col>
          </Grid>
        </form>

        <DocumentsUpload />
      </ContainerLayout>
      {/* </Layout.Absolute> */}

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
          <Button type="submit" className="ml-auto">
            Save
          </Button>
        </ContainerLayout>
      </Box>
    </>
  )
}

export default AddRegistrationBook
