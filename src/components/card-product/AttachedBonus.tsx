import { Badge } from "../../../@/components/ui/badge.tsx";

export default function AttachedBonus() {
  return (
    <div className={'h-10 flex p-2 rounded-b-lg justify-content-between align-items-center  bg-blue-600 uppercase font-bold'}>
      <Badge className={'rounded-2xl text-base max-md:text-sm max-sm:text-xs bg-yellow-300 text-blue-600'}> Tặng 01</Badge>
      <span className={'w-1/3 text-[8px] text-white line-clamp-2'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dolor est iste molestias nesciunt quod ullam voluptatum? Excepturi molestias nesciunt recusandae. Consectetur nisi obcaecati quaerat rerum tempora! Aliquam dolorem, sint.</span>
      <div className={'size-8 max-md:size-6 bg-[url(src/assets/images/product/t-shirt-1.webp)] bg-cover bg-center bg-no-repeat'} />
    </div>
  )
}