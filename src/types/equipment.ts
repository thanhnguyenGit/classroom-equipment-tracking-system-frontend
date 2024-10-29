export interface Ticket {
	ticker_id: string,
	borrrower_id: string,
	borrower_name: string,
	tag: BorrowerTag,
	borrow_time: string,
	return_time_expected: string,
	return_time: string,
	device: string,
	status: BorrowStatus,
}

export enum BorrowStatus {
	Borrowing = 'Dang muon',
	Returned = 'Da tra',
	Overdue = 'Qua han',
}

export enum BorrowerTag {
	Teacher = 'Giao vien',
	Student = 'Sinh vien',
}



