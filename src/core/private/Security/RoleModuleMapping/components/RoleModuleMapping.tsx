import CheckBoxInput from '@/components/functional/Form/CheckBox/CheckBoxInput'
import Form from '@/components/functional/Form/Form'
import Switch from '@/components/functional/Form/Switch/Switch'
import { Box, Flexbox, Grid, Layout } from '@/components/ui'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { Text } from '@/components/ui/core/Text'
import { Transition } from '@headlessui/react'
import { ChevronDown, ChevronUp, Search, Trash2 } from 'lucide-react'
import { useState } from 'react'


const dummyModules = [
    { name: 'Module1', key: 'Key1' },
    { name: 'Module2', key: 'Key2' },
    { name: 'Module3', key: 'Key3' },
    { name: 'Module4', key: 'Key4' },
    { name: 'Module5', key: 'Key5' },
    { name: 'Module1', key: 'Key1' },
    { name: 'Module2', key: 'Key2' },
    { name: 'Module3', key: 'Key3' },
    { name: 'Module4', key: 'Key4' },
    { name: 'Module5', key: 'Key5' },
    { name: 'Module1', key: 'Key1' },
    { name: 'Module2', key: 'Key2' },
    { name: 'Module3', key: 'Key3' },
    { name: 'Module4', key: 'Key4' },
    { name: 'Module5', key: 'Key5' },
];

const modules = [
    {
        screen: "screen1",
        privilege: [
            "read",
            "write",
            "delete"
        ]
    },
    {
        screen: "screen2",
        privilege: [
            "read",
            "write",
            "delete"
        ]
    },
];


const RoleModuleMapping = () => {
    const [searchValue, setSearchValue] = useState<string>("")
    const [showPrivileges, setShowPrivileges] = useState<boolean>(false)
    return (
        <Grid sm={'sm:grid-cols-12'} className='w-full h-full'>
            <Grid.Col sm={'sm:col-span-3'} className='bg-white'>
                <Flexbox className="p-4 h-full" direction='column'>
                    <Form.Input
                        value={searchValue}
                        name="searchedModule"
                        label="Screen"
                        labelClassName='text-lg leading-130 font-semibold'
                        onChange={(e) => setSearchValue(e.target.value)}
                        rightIcon={<Search />}
                    />
                    <Flexbox className='relative grow w-full'>
                        <Layout.Absolute scrollable>
                            {
                                dummyModules?.map((module) => {
                                    return (
                                        <Box className='flex justify-between  items-center my-1 p-3 hover:bg-gray-96' > {module?.name}
                                            <Trash2 color='red' className='hover:bg-red-40 hover:stroke-white hover:rounded' />
                                        </Box>
                                    )
                                })
                            }
                        </Layout.Absolute>
                    </Flexbox>
                </Flexbox>
            </Grid.Col>
            <Grid.Col sm={'sm:col-span-9'}>
                <Flexbox className='p-4' direction='column'>
                    <Box>
                        <Text variant='h5' typeface='semibold'>Module</Text>
                    </Box>
                    <FlexLayout className='mt-6' direction='column'>
                        {
                            modules?.map((module) => {
                                return (
                                    <Flexbox className='my-3 p-3 border-2 w-full' direction='column' >
                                        <Flexbox justify='space-between' className='w-full' onClick={() => setShowPrivileges(!showPrivileges)}>
                                            <Text>{module.screen}</Text>
                                            <Flexbox align='center'>
                                                <Switch />
                                                {showPrivileges ? <ChevronUp className='ml-4' /> : <ChevronDown className='ml-4' />}
                                            </Flexbox>
                                        </Flexbox>
                                        <Transition
                                            show={showPrivileges}
                                            enter="transition-opacity duration-400"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="transition-opacity duration-150"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Flexbox>
                                                {module?.privilege?.map((privilege, index) => {
                                                    return (
                                                        <Box className='mr-4'>
                                                            <CheckBoxInput
                                                                onChange={(e) => {
                                                                    debugger
                                                                }}
                                                                name={`${privilege}`}
                                                                key={`option-${index}`}
                                                                checkBoxInputOption={{ label: privilege, value: privilege }}
                                                            />
                                                        </Box>
                                                    )
                                                })}
                                            </Flexbox>
                                        </Transition>
                                    </Flexbox>
                                )
                            })
                        }
                    </FlexLayout>
                </Flexbox>
            </Grid.Col>
        </Grid >
    )
}

export default RoleModuleMapping 