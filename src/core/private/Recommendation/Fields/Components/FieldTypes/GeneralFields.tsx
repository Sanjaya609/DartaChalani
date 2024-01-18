import React from 'react'
import Form from '@/components/functional/Form/Form'
import { Grid } from '@/components/ui'
import { TFunction } from 'i18next'

interface FieldCaseProps {
    formikProps: any,
    t: TFunction<"translation", undefined, "translation">
}

function GeneralFields({
        formikProps, t
    }: FieldCaseProps) {
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
                onChange={formikProps.handleChange}
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
                isLoading={formikProps.fieldTypeFetching}
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
        </>
    )
}

export default GeneralFields