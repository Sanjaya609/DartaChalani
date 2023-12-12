import SectionHeader from '@/components/functional/SectionHeader'
import { Box, Button, Grid } from '@/components/ui'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import { useNavigate, useParams } from '@/router'
import { useTranslation } from 'react-i18next'
import { IRoutePrivilege } from '@/router/routes/create-route'

const AddDispatchBook = (props: Partial<IRoutePrivilege>) => {
  const { currentModuleDetails } = props
  const { t } = useTranslation()

  const navigate = useNavigate()
  const params = useParams()

  return (
    <>
      <SectionHeader
        title="Recommendation Configure"
        // backAction={}
      />
      <ContainerLayout className="scrollbars grow ">
        <form>
          <Grid sm={'sm:grid-cols-12'} gap="gap-4"></Grid>
        </form>
      </ContainerLayout>

      <Box className="mb-6 w-full border-2 pb-6 text-right">
        <ContainerLayout>
          <Button
            type="button"
            btnType="outlined"
            variant="secondary"
            className="mr-3"
            // onClick
          >
            {t('btns.cancel')}
          </Button>
          <Button
            type="submit"
            // onClick={() => handleSubmit()}
            className="ml-auto"
          >
            Save
            {/* {recommendationId ? t('btns.update') : t('btns.save')} */}
          </Button>
        </ContainerLayout>
      </Box>
    </>
  )
}

export default AddDispatchBook
