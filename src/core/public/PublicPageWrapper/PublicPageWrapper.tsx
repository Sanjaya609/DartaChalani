import Logo from '@/assets/img/logo.png'
import { Flexbox, Grid, Icon, Image } from '@/components/ui'
import { Card } from '@/components/ui/core/Card'
import { Text } from '@/components/ui/core/Text'
import { switchLanguage } from '@/lib/i18n/i18n'
import { Globe } from 'phosphor-react'
import { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'

const PublicPageWrapper = ({ children }: PropsWithChildren) => {
  const {
    t,
    i18n: { language },
  } = useTranslation()
  return (
    <section className="flex h-full w-full items-center justify-center bg-[#E5E5E5] ">
      <Grid
        gap={'gap-0'}
        sm="sm:grid-cols-12"
        justify={'justify-center'}
        alignItems="items-center"
      >
        <Grid.Col sm="sm:col-span-6" className="w-[400px]">
          <Card
            className="h-[500px] w-[400px] bg-gradient-to-br from-navy-40 to-navy-24 p-6"
            borderRadius="lg"
          >
            <Flexbox
              align="center"
              justify="center"
              className="ml-auto cursor-pointer rounded-full border border-gray-72 px-2"
              onClick={() => switchLanguage()}
            >
              <Icon
                icon={Globe}
                size={16}
                color="text-white"
                className="mr-2"
              />

              <Text
                title={language === 'en' ? 'English' : 'Nepali'}
                className="inline text-white"
              >
                {language === 'en' ? 'EN' : 'NP'}
              </Text>
            </Flexbox>
            <Flexbox direction="column" align="center" justify="center">
              <Image src={Logo} alt="Govt. Of Nepal" />
              <Text className="mt-3" typeface="bold" color="text-white">
                {t('public.login.nepalGovernment')}
              </Text>
            </Flexbox>

            <hr className="mb-12 mt-6 border border-white" />

            <Text
              className="text-center"
              color="text-white"
              variant="h5"
              typeface="extrabold"
            >
              {t('public.login.welcomeToSystem')}
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col sm="sm:col-span-6">{children}</Grid.Col>
      </Grid>
    </section>
  )
}

export default PublicPageWrapper
