import { useEffect, useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import SectionHeader from '@/components/functional/SectionHeader'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { IRoutePrivilege } from '@/router/routes/create-route'
import { addFieldInitialValues } from './schema/field.schema'
import { Button, Grid } from '@/components/ui'
import { decodeParams } from '@/utility/route-params'
import { useParams } from 'react-router-dom'
import { useGetAllFieldByRecommendationId } from '../ConfigureRecommendation/services/fields.query'
import SortableItem from './SortableItem'
import AddField from './AddField'
import { useGetRecommendationDetailById } from '../AddRecommendation/services/add-recommendation.query'

const FieldSetup = ({ currentModuleDetails }: Partial<IRoutePrivilege>) => {
  const [editId, setEditId] = useState<number>()
  const [items, setItems] = useState(addFieldInitialValues)

  const params = useParams()
  const recommendationId = decodeParams<string>(params?.id)
  const { data: recommendationDetails } = useGetRecommendationDetailById(
    recommendationId ?? ''
  )

  const {
    data: allFiledByRecommendationIdList = [],
    isFetching: allFiledByRecommendationFetching,
    isSuccess: allFiledByRecommendationSuccess
  } = useGetAllFieldByRecommendationId(recommendationId)

  useEffect(() => {
    if(allFiledByRecommendationSuccess) {
      setItems(allFiledByRecommendationIdList)
    }
  }, [allFiledByRecommendationSuccess])


  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  )

  const handleDragEnd = ({ active, over }: { active: any; over: any }) => {
    if (active.id === over.id) {
      return;
    }

    if (active.id !== over.id) {
      // Update the items array when an item is dropped
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }

    if(active.data.current.sortable.containerId !== over.data.current.sortable.containerId) {
      debugger
    }
  }

  return (
    <>
      <SectionHeader title={recommendationDetails?.nameEnglish} />

      <ContainerLayout stretch >
        <FlexLayout direction="row">
            <div className="w-1/4 overflow-y-auto bg-white p-6 mr-4 h-full overflow-x-hidden">
            <div className="bg-blue-500 p-4 text-white mb-6">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold flex items-center">
                  <i className="fas fa-wpforms mr-2"></i>
                    Field Details
                </h1>
                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded flex items-center">
                  <i className="fas fa-plus-circle mr-2"></i>
                  Add
                </button>
              </div>
            </div>

              <AddField 
                editId={editId} 
                formId={recommendationId!} 
              />
            </div>

            <form className="flex-1 overflow-y-auto bg-white p-6 h-screen">
              <Grid sm={'sm:grid-cols-12'} >
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                  onDragCancel={() => console.log('Drag cancelled')}
                >
                  <SortableContext items={items} strategy={rectSortingStrategy}>
                      {items.map((item, index) => (
                        <>
                          <SortableItem key={item.id} item={item} />
                        </>
                      ))}
                  </SortableContext>
                          
                </DndContext>
              </Grid>
            </form>
        </FlexLayout>
      </ContainerLayout>
    </>
  )
}

export default FieldSetup
