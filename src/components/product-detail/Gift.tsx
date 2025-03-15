import { RadioGroup, RadioGroupItem } from "../../../@/components/ui/radio-group.tsx";
import { Label } from "../../../@/components/ui/label.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../@/components/ui/select.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils.ts";

export default function Gift(className: {className: string}) {
  return (
    <div className={cn('p-2', className)}>
      <ScrollArea className="rounded-lg border-1 sm:h-45 h-30 mb-5">
        <div className={''}>
          <div className="p-1 sm:p-2 bg-neutral-100 text-xs sm:text-base"><p>Khuyến mãi <span className="font-bold">Lorem ipsum</span></p></div>
          <div className="flex p-2 sm:p-4">
            <RadioGroup defaultValue="option-one">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" children={<Circle className='size-3 fill-blue-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />} />
                <Label htmlFor="option-one">
                  <div className="flex space-x-2">
                    <img src={'https://media3.coolmate.me/cdn-cgi/image/width=200,height=300,quality=80,format=auto/uploads/January2024/AT.220.TIM.1_11.jpg'} alt="" className="w-12 sm:w-20 object-cover rounded-lg" />
                    <div className="">
                      <p className="mb-2 text-xs sm:text-sm">Lorem ipsum dolor sit.</p>
                      <div className="flex space-x-2 mb-2">
                        <Select>
                          <SelectTrigger className="w-20 text-xs sm:w-25 sm:text-sm bg-neutral-100 font-bold rounded-sm sm:rounded-xl">
                            <SelectValue placeholder={'lorem1'} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={'lorem1'}>lorem1</SelectItem>
                            <SelectItem value={'lorem2'}>lorem1</SelectItem>
                            <SelectItem value={'lorem3'}>lorem1</SelectItem>
                          </SelectContent>
                        </Select>

                        <Select>
                          <SelectTrigger className="w-14 sm:w-20 text-xs sm:text-sm uppercase bg-neutral-100 font-bold rounded-sm sm:rounded-xl">
                            <SelectValue placeholder={'l'} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={'l'}>l</SelectItem>
                            <SelectItem value={'lorem2'}>lorem1</SelectItem>
                            <SelectItem value={'lorem3'}>lorem1</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex">
                        <span className={'font-bold mr-4'}>lorem</span><span className={'line-through text-gray-500'}>Lorem ipsum.</span>
                      </div>
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>


          </div>
        </div>
      </ScrollArea>
    </div>
  )
}