import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu.tsx";
import { CloudUpload, EllipsisVertical, Pencil, Send, Trash } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import Rate from "@/components/product-detail/Rate.tsx";
import { CommentProps } from "@/components/product-detail/props/comment.props.ts";

export default function Comment(props: CommentProps) {
	return (
		<>
			<Card key={props.id} className={"mt-2 block bg-white py-2"}>
				<CardHeader className={""}>
					<CardTitle className={"flex justify-between"}>
						<p className='mb-0'>
							<span>{props.name}</span>
							<span className='ml-2 text-sm text-gray-500'>{props.date.toDateString()}</span>
						</p>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<EllipsisVertical />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem className={"flex justify-between"}>
									Sửa <Pencil />
								</DropdownMenuItem>
								<DropdownMenuItem className={"flex justify-between"}>
									Xóa <Trash />
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</CardTitle>
					<CardDescription>
						{" "}
						<Rate defaultValue={props.numOfStars} disabled={true} allowHalf={true} className={"fill-black stroke-black md:size-4! xl:size-6"} />
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Input type={"text"} disabled defaultValue={props.description} className={"border-0 p-0 px-0 text-left text-black shadow-none"} />
					{props.reviewImageUrls && props.reviewImageUrls.map((url, index) => <img src={url} alt='' key={index} className='size-30' />)}
				</CardContent>
				{props.onUpload && (
					<CardFooter className={"flex gap-4"}>
						<CloudUpload />
						<Send />
					</CardFooter>
				)}
			</Card>
		</>
	);
}
