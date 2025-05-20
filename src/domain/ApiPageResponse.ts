export type ApiPageResponse<T> = {
	content: T,
	pageable: PageableType,
	last: boolean,
	totalPages: number,
	totalElements: number,
	first: boolean,
	size: number,
	number: number,
	sort: SortType,
	numberOfElements: number,
	empty: boolean,
}
type PageableType = {
	pageNumber: number,
	pageSize: number,
	sort: SortType,
	offset: number,
	paged: boolean,
	unpaged: boolean,
}

type SortType = {
	empty: boolean,
	sorted: boolean,
	unsorted: boolean,
}