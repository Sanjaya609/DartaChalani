import { useCallback, useEffect, useState } from 'react'
import { privateRoutePath, useNavigate, useParams } from '@/router'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  MouseSensor,
} from '@dnd-kit/core'

import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable'
import SectionHeader from '@/components/functional/SectionHeader'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import { IRoutePrivilege } from '@/router/routes/create-route'
import { Button, Flexbox } from '@/components/ui'
import { decodeParams } from '@/utility/route-params'
import { useGetRecommendationDetailById } from '../AddRecommendation/services/add-recommendation.query'
import { useTranslation } from 'react-i18next'
import { Card } from '@/components/ui/core/Card'
import {
  useGetAllGroupByRecommendationId,
  useUpdateGroupOrder,
} from './services/groups.query'
import SortableGroup from './SortableGroup'
import { IAddGroupResponse } from './schema/group.interface'
import AddGroup from './AddGroup'
import { Spinner } from '@/components/ui/Spinner'

const FieldSetup = ({ currentModuleDetails }: Partial<IRoutePrivilege>) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const params = useParams()
  const recommendationId = decodeParams<string>(params?.id)

  const navigateToRecommendationList = () => {
    navigate(privateRoutePath.recommendation.base)
  }
  const [viewOnly, setViewOnly] = useState<boolean>(false)
  const [groupingList, setGroupingList] = useState<IAddGroupResponse[]>([])
  const [editGroupData, setEditGroupData] = useState<IAddGroupResponse>()
  const [openGroupForm, setOpenGroupForm] = useState<boolean>(false)
  const toggleGroupForm = (groupData?: IAddGroupResponse) => {
    groupData && setEditGroupData(groupData)
    setOpenGroupForm(groupData ? true : !openGroupForm)
  }

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  )

  const { data: recommendationDetails } = useGetRecommendationDetailById(
    recommendationId ?? ''
  )

  const { data: groupListData = [], isFetching: groupListDataFetching } =
    useGetAllGroupByRecommendationId(recommendationId)

  const { mutate: uodateGroupOrder, isLoading: createGroupLoading } =
    useUpdateGroupOrder()

  useEffect(() => {
    if (groupListData)
      setGroupingList(groupListData?.sort((a, b) => a?.orderNo! - b?.orderNo!))
  }, [groupListData])

  const handleDragGroupEnd = ({ active, over }: { active: any; over: any }) => {
    if (active.id === over.id) {
      return
    }

    if (active.id !== over.id) {
      // Update the items array when an item is dropped
      const oldIndex = groupingList.findIndex((item) => item.id === active.id)
      const newIndex = groupingList.findIndex((item) => item.id === over.id)
      let newOrder = arrayMove(groupingList, oldIndex, newIndex)
      let newOrderDto = newOrder?.map((order, index) => ({
        id: order.id,
        ordering: index + 1,
      }))
      uodateGroupOrder({
        orderDto: newOrderDto,
        targetId: parseInt(recommendationId!),
      })
      setGroupingList(newOrder)
    }
  }

  return (
    <>
      <SectionHeader
        title={recommendationDetails?.nameEnglish}
        backAction={navigateToRecommendationList}
      />
      <Flexbox align="center" justify="space-between" className="mt-3 w-full">
        <div></div>
        <Button
          size="md"
          type="button"
          icons="icons"
          className="ml-4 mr-16 whitespace-nowrap border border-gray-80"
          onClick={() => {
            toggleGroupForm()
          }}
          loading={createGroupLoading}
          disabled={createGroupLoading}
        >
          Add Group
        </Button>
      </Flexbox>
      <ContainerLayout className="scrollbars mt-[-15px] grow">
        <Card className="h-full">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragGroupEnd}
          >
            {groupListDataFetching || createGroupLoading ? (
              <Spinner />
            ) : (
              <SortableContext
                items={groupingList}
                strategy={rectSortingStrategy}
              >
                {groupingList.map((item) => (
                  <SortableGroup
                    key={item.id}
                    item={item}
                    toggleGroupForm={toggleGroupForm}
                    groupListDataFetching={groupListDataFetching}
                  />
                ))}
              </SortableContext>
            )}
          </DndContext>
        </Card>
      </ContainerLayout>

      <AddGroup
        toggleGroupForm={() => {
          toggleGroupForm()
          setEditGroupData(undefined)
        }}
        openGroupForm={openGroupForm}
        editGroupData={editGroupData}
        viewOnly={viewOnly}
        setViewOnly={setViewOnly}
      />
    </>
  )
}

export default FieldSetup
