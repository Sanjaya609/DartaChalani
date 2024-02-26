import React from 'react'
import Form from '@/components/functional/Form/Form'
import { Grid } from '@/components/ui'
import { TFunction } from 'i18next'
import { FormikProps } from 'formik'
import { IAddFieldInitialValue } from '../../schema/field.interface'
import { toast } from 'react-toastify'

interface FieldCaseProps {
  formikProps: FormikProps<IAddFieldInitialValue>
  t: TFunction<'translation', undefined, 'translation'>
}

function GeneralFields({ formikProps, t }: FieldCaseProps) {
  return (
    <>
      <Grid.Col sm={'sm:col-span-4'}>
        <Form.Input
          isRequired
          value={formikProps.values.labelNameEnglish}
          errors={formikProps.errors}
          touched={formikProps.touched}
          name="labelNameEnglish"
          label={t('recommendation.labelNameEnglish')}
          onChange={(e) => {
            const inputValue = e.target.value
            // Regular expression to match English alphabets (a-z, A-Z), digits (0-9), words, and sentences
            const englishAlphabetAndDigitRegex =
              /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _']*$/

            if (
              englishAlphabetAndDigitRegex.test(inputValue) ||
              inputValue === ''
            ) {
              // Call handleChange only when input contains only English alphabets, digits, words, and sentences
              formikProps.handleChange(e)
            }
          }}
          onBlur={formikProps.handleBlur}
        />
      </Grid.Col>

      <Grid.Col sm={'sm:col-span-4'}>
        <Form.Input
          isNepali
          isRequired
          value={formikProps.values.labelNameNepali}
          errors={formikProps.errors}
          touched={formikProps.touched}
          name="labelNameNepali"
          label={t('recommendation.labelNameNepali')}
          onChange={formikProps.handleChange}
          onBlur={formikProps.handleBlur}
        />
      </Grid.Col>

      <Grid.Col sm={'sm:col-span-4'}>
        <Form.Switch
          isRequired
          className="inline"
          checked={formikProps.values.isValidationRequired}
          errors={formikProps.errors}
          touched={formikProps.touched}
          name="isValidationRequired"
          label={t('recommendation.isValidationRequired')}
          onChange={() => {
            formikProps.setFieldValue(
              'isValidationRequired',
              !formikProps.values.isValidationRequired
            )
          }}
          onBlur={formikProps.handleBlur}
        />
      </Grid.Col>

      <Grid.Col sm={'sm:col-span-4'}>
        <Form.Select
          isRequired
          options={[
            { label: '1/4 Screen Length', value: 3 },
            { label: '1/3 Screen Length', value: 4 },
            { label: 'Half Screen Length', value: 6 },
            { label: 'Full Screen Length', value: 12 },
          ]}
          calculateValueOnChange
          value={formikProps.values.gridLength}
          errors={formikProps.errors}
          touched={formikProps.touched}
          name="gridLength"
          label={t('recommendation.gridLength')}
          onChange={(event) => {
            formikProps.setFieldValue(event.name, event?.main || '')
          }}
          onBlur={formikProps.handleBlur}
        />
      </Grid.Col>

      <Grid.Col sm={'sm:col-span-4'}>
        <Form.Switch
          isRequired
          className="inline"
          checked={formikProps.values.showInList}
          errors={formikProps.errors}
          touched={formikProps.touched}
          name="isValidationRequired"
          label={t('recommendation.showInList')}
          onChange={() => {
            formikProps.setFieldValue(
              'showInList',
              !formikProps.values.showInList
            )
          }}
          onBlur={formikProps.handleBlur}
        />
      </Grid.Col>
    </>
  )
}

export default GeneralFields
