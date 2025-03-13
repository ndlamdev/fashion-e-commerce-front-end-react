import { RadioGroup, RadioGroupItem } from "../../../@/components/ui/radio-group.tsx";
import { Label } from "../../../@/components/ui/label.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../@/components/ui/select.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";

export default function Gift() {
  return (
    <ScrollArea className="rounded-lg border-1 h-45 mb-5">
      <div className={''}>
        <div className="p-2 bg-neutral-100 "><p>Khuyến mãi <span className="font-bold">Lorem ipsum</span></p></div>
        <div className="flex p-4">
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">
                <div className="flex">
                  <img src={'https://media3.coolmate.me/cdn-cgi/image/width=200,height=300,quality=80,format=auto/uploads/January2024/AT.220.TIM.1_11.jpg'} alt="" className="w-20 object-cover rounded-lg mr-2" />
                  <div className="">
                    <p className="mb-2">Lorem ipsum dolor sit.</p>
                    <div className="flex mb-2">
                      <Select>
                        <SelectTrigger className="w-25 mr-2 bg-neutral-100 font-bold rounded-xl">
                          <SelectValue placeholder={'lorem1'} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={'lorem1'}>lorem1</SelectItem>
                          <SelectItem value={'lorem2'}>lorem1</SelectItem>
                          <SelectItem value={'lorem3'}>lorem1</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select>
                        <SelectTrigger className="w-20 bg-neutral-100 font-bold rounded-xl">
                          <SelectValue placeholder={'lorem1'} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={'lorem1'}>lorem1</SelectItem>
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


  )
}