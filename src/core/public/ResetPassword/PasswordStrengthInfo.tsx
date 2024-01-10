import { Card } from '@/components/ui/core/Card'
import { Text } from '@/components/ui/core/Text'
import { useTranslation } from 'react-i18next'

interface IPasswordStrengthInfo {
  showInfo: boolean
}

const PasswordStrengthInfo = (props: IPasswordStrengthInfo) => {
  const { t } = useTranslation()
  const { showInfo } = props
  return (
    <div
      className={`transition-opacity duration-500 ${
        showInfo ? 'visible mb-4 h-full opacity-100' : 'invisible h-0 opacity-0'
      }`}
    >
      <Card className={`bg-red-88 text-[#e72222] `} borderRadius="md">
        <Text className="mb-3" variant="h5">
          {t('passwordStrength.notStrong')}
        </Text>

        <ul className="list-disc pl-10">
          <li>{t('passwordStrength.sixChar')}</li>
          <li>{t('passwordStrength.upper')}</li>
          <li>{t('passwordStrength.lower')}</li>
          <li>{t('passwordStrength.number')}</li>
          <li>{t('passwordStrength.special')}</li>
        </ul>
      </Card>
    </div>
  )
}

export default PasswordStrengthInfo
