type MediaResponse = {
	id: string;
	lock: boolean;
	create_by: string;
	create_at: number[];
	update_by: string;
	update_at: number[];
	path: string;
	display_name: string;
	parent_path: string;
	extend: string;
	file_name: string;
};

export default MediaResponse;
