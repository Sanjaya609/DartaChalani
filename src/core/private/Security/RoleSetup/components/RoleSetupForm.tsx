import Form from '@/components/functional/Form/Form'
import { Box, Button, Grid } from '@/components/ui'
import { useFormik } from 'formik'
import { roleSetupIntialValues, roleSetupValidationSchema } from '../schema/roleSetup.schema'
import { useCreateRole } from '../services/roleSetup.query'
import { Toast } from 'react-toastify/dist/components'
import { RoleSetupFormSchema } from '../schema/roleSetup.interface'
import { useTranslation } from 'react-i18next'

interface IRoleSetupFormProps {
    initialValues: RoleSetupFormSchema
    setInitialValues: React.Dispatch<
        React.SetStateAction<RoleSetupFormSchema>
    >
}
const RoleSetupForm = ({ initialValues, setInitialValues }: IRoleSetupFormProps) => {
    const { t } = useTranslation();
    const { mutateAsync: createRole, isLoading } = useCreateRole();
    const { values, handleSubmit, errors, touched, handleChange, handleBlur } = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema: roleSetupValidationSchema,
        onSubmit: (values, { resetForm }) => {
            createRole(values, {
                onSuccess: (res) => {
                    resetForm();
                    setInitialValues(roleSetupIntialValues)
                }
            })
        }
    })
    return (
        <form onSubmit={handleSubmit}>
            <Grid sm={'sm:grid-cols-12'} gap="gap-4">
                <Grid.Col sm={'sm:col-span-4'}>
                    <Form.Input
                        value={values.roleNameEnglish}
                        errors={errors}
                        touched={touched}
                        name="roleNameEnglish"
                        label={'Role Name (English)'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Grid.Col>
                <Grid.Col sm={'sm:col-span-4'}>
                    <Form.Input
                        value={values.roleNameNepali}
                        errors={errors}
                        touched={touched}
                        name="roleNameNepali"
                        label={'Role Name (Nepali)'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Grid.Col>
                <Grid.Col sm={'sm:col-span-4'}>
                    <Form.Input
                        value={values.roleType}
                        errors={errors}
                        touched={touched}
                        name="roleType"
                        label={'Role Type'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Grid.Col>
                <Grid.Col sm={'sm:col-span-3'}>
                    <Form.TextArea
                        value={values.description}
                        errors={errors}
                        touched={touched}
                        name="description"
                        label={'Description'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Grid.Col>
            </Grid>
            <Box className="mt-4 text-right">
                <Button
                    disabled={isLoading}
                    type="button"
                    onClick={() => {
                        setInitialValues(roleSetupIntialValues)
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

export default RoleSetupForm