import Form from '@/components/functional/Form/Form'
import { Box, Button, Grid } from '@/components/ui'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { ModuleSetupFormSchema } from '../schema/moduleSetup.interface'
import { moduleSetupInitialValues, moduleSetupValidationSchema } from '../schema/moduleSetup.schema'
import { useCreateModule, useGetModuleListByStatus } from '../services/moduleSetup.query'

interface ModuleSetupFormProps {
    initialValues: ModuleSetupFormSchema
    setInitialValues: React.Dispatch<
        React.SetStateAction<ModuleSetupFormSchema>
    >
}
const ModuleSetupForm = ({ initialValues, setInitialValues }: ModuleSetupFormProps) => {
    const { t } = useTranslation();
    const { mutateAsync: createModule, isLoading } = useCreateModule();
    const { data: activeModuleListOption } = useGetModuleListByStatus<OptionType<string | number>[]>(true, { mapDatatoStyleSelect: true });
    const { values, handleSubmit, errors, touched, handleChange, handleBlur, setFieldValue, resetForm } = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema: moduleSetupValidationSchema,
        onSubmit: (values, { resetForm }) => {
            const payload = {
                ...values,
                parentModuleId: values?.parentModuleId?.id
            }
            createModule(payload, {
                onSuccess: () => {
                    resetForm();
                    setInitialValues(moduleSetupInitialValues)
                }
            })
        }
    })
    return (
        <form onSubmit={handleSubmit}>
            <Grid sm={'sm:grid-cols-12'} gap="gap-4">
                <Grid.Col sm={'sm:col-span-3'}>
                    <Form.Select
                        value={values.parentModuleId}
                        errors={errors}
                        touched={touched}
                        options={activeModuleListOption || []}
                        name="parentModuleId"
                        label={'Parent Module Name'}
                        onChange={(e) => {
                            setFieldValue('parentModuleId', e.value)
                        }}
                        onBlur={handleBlur}
                    />
                </Grid.Col>
                <Grid.Col sm={'sm:col-span-3'}>
                    <Form.Input
                        value={values.code}
                        errors={errors}
                        touched={touched}
                        name="code"
                        label={'Code'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Grid.Col>
                <Grid.Col sm={'sm:col-span-3'}>
                    <Form.Input
                        value={values.moduleNameEnglish}
                        errors={errors}
                        touched={touched}
                        name="moduleNameEnglish"
                        label={'Module Name (English)'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Grid.Col>
                <Grid.Col sm={'sm:col-span-3'}>
                    <Form.Input
                        value={values.moduleNameNepali}
                        errors={errors}
                        touched={touched}
                        name="moduleNameNepali"
                        label={'Module Name (Nepali)'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Grid.Col>
                <Grid.Col sm={'sm:col-span-2'}>
                    <Form.Input
                        value={values.iconClass}
                        errors={errors}
                        touched={touched}
                        name="iconClass"
                        label={'Icon Class'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Grid.Col>
                <Grid.Col sm={'sm:col-span-4'}>
                    <Form.Input
                        value={values.description}
                        errors={errors}
                        touched={touched}
                        name="description"
                        label={'Description'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Grid.Col>
                <Grid.Col sm={'sm:col-span-4'}>
                    <Form.Input
                        value={values.url}
                        errors={errors}
                        touched={touched}
                        name="url"
                        label={'URL'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Grid.Col>
                <Grid.Col sm={'sm:col-span-2'}>
                    <Form.Input
                        value={values.orderNumber}
                        errors={errors}
                        touched={touched}
                        name="orderNumber"
                        label={'Order Number'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type='number'
                    />
                </Grid.Col>
            </Grid>
            <Box className="mt-4 text-right">
                <Button
                    disabled={isLoading}
                    type="button"
                    onClick={() => {
                        setInitialValues(moduleSetupInitialValues)
                        resetForm();
                    }}
                    btnType="outlined"
                    variant="secondary"
                    className="mr-3"
                >
                    {t('btns.cancel')}
                </Button>
                <Button type='submit' className="ml-auto">Save</Button>
            </Box>
        </form>
    )
}

export default ModuleSetupForm