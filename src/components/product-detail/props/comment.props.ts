export type CommentProps = {
	id: number;
	name: string;
	description: string;
	numOfStars: number;
	date: Date;
	reviewImageUrls?: string[];
	onEdit?: () => void;
	onDelete?: () => void;
	onUpload?: () => void;
};
