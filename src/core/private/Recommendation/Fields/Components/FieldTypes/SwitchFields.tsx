import React from 'react'
import Form from '@/components/functional/Form/Form'
import { Grid } from '@/components/ui'
import { TFunction } from 'i18next'
import { useGetAllDropdownConfig } from '@/core/private/MasterSetup/DropdownConfig/services/dropdown-config.query'

interface FieldCaseProps {
    formikProps: any,
    t: TFunction<"translation", undefined, "translation">
}

function SwitchFields({
        formikProps, t
    }: FieldCaseProps) {
    const { isFetching: getAllDropdownFetching, data: dropdownData } =
        useGetAllDropdownConfig()

        console.log(dropdownData, "filter")

    return (
        <>
            <Grid.Col sm={'sm:col-span-4'}>
                <Form.Select
                isRequired
                isLoading={getAllDropdownFetching}
                options={dropdownData?.map(data => ({
                    value: data.id,
                    label: data.dropDownDescriptionEn,
                    labelNp: data.dropDownDescriptionNp
                })) || []}
                calculateValueOnChange
                value={formikProps.values.dropDownId}
                errors={formikProps.errors}
                touched={formikProps.touched}
                name="dropDownId"
                label={t('recommendation.dropdownOption')}
                onChange={(event) => {
                    formikProps.setFieldValue(event.name, event?.main || '')
                }}
                onBlur={formikProps.handleBlur}
                />
            </Grid.Col>
        </>
    )
}

export default SwitchFields