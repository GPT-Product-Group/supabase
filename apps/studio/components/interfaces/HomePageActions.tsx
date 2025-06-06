import { Filter, Search } from 'lucide-react'
import Link from 'next/link'

import { useParams } from 'common'
import { useIsFeatureEnabled } from 'hooks/misc/useIsFeatureEnabled'
import { PROJECT_STATUS } from 'lib/constants'
import {
  Button,
  Checkbox_Shadcn_,
  Input,
  Label_Shadcn_,
  PopoverContent_Shadcn_,
  PopoverTrigger_Shadcn_,
  Popover_Shadcn_,
} from 'ui'

interface HomePageActionsProps {
  search: string
  filterStatus: string[]
  setSearch: (value: string) => void
  setFilterStatus: (value: string[]) => void
}

const HomePageActions = ({
  search,
  filterStatus,
  setSearch,
  setFilterStatus,
}: HomePageActionsProps) => {
  const { slug } = useParams()
  const projectCreationEnabled = useIsFeatureEnabled('projects:create')

  return (
    <div className="flex flex-col gap-2 md:gap-3 md:flex-row">
      {projectCreationEnabled && (
        <Button asChild type="primary">
          <Link href={`/new/${slug}`}>New project</Link>
        </Button>
      )}

      <div className="flex items-center gap-2">
        <Input
          size="tiny"
          placeholder="Search for a project"
          icon={<Search size={16} />}
          className="w-full flex-1 md:w-64 [&>div>div>div>input]:!pl-7 [&>div>div>div>div]:!pl-2"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <Popover_Shadcn_>
          <PopoverTrigger_Shadcn_ asChild>
            <Button
              type={filterStatus.length !== 2 ? 'secondary' : 'dashed'}
              className="h-[26px] w-[26px]"
              icon={<Filter />}
            />
          </PopoverTrigger_Shadcn_>
          <PopoverContent_Shadcn_ className="p-0 w-56" side="bottom" align="center">
            <div className="px-3 pt-3 pb-2 flex flex-col gap-y-2">
              <p className="text-xs">Filter projects by status</p>
              <div className="flex flex-col">
                {[
                  { key: PROJECT_STATUS.ACTIVE_HEALTHY, label: 'Active' },
                  { key: PROJECT_STATUS.INACTIVE, label: 'Paused' },
                ].map(({ key, label }) => (
                  <div key={key} className="group flex items-center justify-between py-0.5">
                    <div className="flex items-center gap-x-2">
                      <Checkbox_Shadcn_
                        id={key}
                        name={key}
                        checked={filterStatus.includes(key)}
                        onCheckedChange={() => {
                          if (filterStatus.includes(key)) {
                            setFilterStatus(filterStatus.filter((y) => y !== key))
                          } else {
                            setFilterStatus(filterStatus.concat([key]))
                          }
                        }}
                      />
                      <Label_Shadcn_ htmlFor={key} className="capitalize text-xs">
                        {label}
                      </Label_Shadcn_>
                    </div>
                    <Button
                      size="tiny"
                      type="default"
                      onClick={() => setFilterStatus([key])}
                      className="transition opacity-0 group-hover:opacity-100 h-auto px-1 py-0.5"
                    >
                      Select only
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent_Shadcn_>
        </Popover_Shadcn_>
      </div>
    </div>
  )
}
export default HomePageActions
