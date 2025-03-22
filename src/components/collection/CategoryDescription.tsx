import { CategoryDescriptionProps } from "@/components/collection/props/CategoryDescription.props.ts";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible.tsx";
import { Button } from "@/components/ui/button.tsx";

export default function CategoryDescription(props: CategoryDescriptionProps) {
  return (
    <>
      <Collapsible className={"group bg-gray-200 p-6 text-sm text-left"}>
        <h2 className={"font-bold my-6 text-lg"}>{props.title}</h2>
        <p className="">{props.description}</p>
        <CollapsibleContent>
          {props.illustrationUrl &&
            <img src={props.illustrationUrl} alt="" className="object-contain" />
          }
          {props.subDescription?.map((sub, index) => (
            <SubDescription {...sub} key={index}/>
          ))}
        </CollapsibleContent>
        <div className="mt-4 flex justify-center">
          <CollapsibleTrigger asChild>
            <Button className={"h-10 w-1/5 rounded-lg md:w-1/10 lg:rounded-2xl"} variant="default" size="sm">
              Xem thêm
            </Button>
          </CollapsibleTrigger>
        </div>
      </Collapsible>
    </>
  );
}

function SubDescription(props: CategoryDescriptionProps) {
  return (
    <ol>
      <li className={"font-bold my-6 text-lg"}><span className="mx-1"></span>{props.title}</li>
      <div className={"bg-gray-200 p-6 text-sm text-left"}>
        <p className="my-3">{props.description}</p>
        {props.illustrationUrl &&
          <img src={props.illustrationUrl} alt="" className="object-contain" />
        }
        {props.subDescription && props.subDescription.map((sub, index) => (<SubDescription key={index} {...sub} />))}
      </div>
    </ol>
  );
}