export interface Device {
	id: number;
	name: string;
	type: string;
	status: string;
}

export interface Ticket {
	id: number;
	borrower_id: string,
	name: string,
	tag: string,
	borrow_time: string,
	expected_return_in: string,
	return_time: string,
	device: string,
	status: string,
}

export const devices: Device[] = [
	{ id: 1, name: 'Server 1', type: 'Web Server', status: 'Active' },
	{ id: 2, name: 'Database Server', type: 'DB Server', status: 'Maintenance' },
	{ id: 3, name: 'Backup Server', type: 'Storage', status: 'Active' }
];

export const tickets: Ticket[] = [
	{ id: 1, borrower_id: '20207632', name: 'Nguyen Viet Thanh', tag: 'Student', borrow_time: '15:30', expected_return_in: '17h30', return_time: '00:00', device: 'Microphone', status: 'Borrowed' },
	{ id: 2, borrower_id: '20207632', name: 'Nguyen Viet Thanh', tag: 'Student', borrow_time: '15:30', expected_return_in: '17h30', return_time: '00:00', device: 'Microphone', status: 'Rerturned' },
	{ id: 3, borrower_id: '20207632', name: 'Nguyen Viet Thanh', tag: 'Student', borrow_time: '15:30', expected_return_in: '17h30', return_time: '00:00', device: 'Microphone', status: 'Borrowed' },
	{ id: 4, borrower_id: '20207632', name: 'Nguyen Viet Thanh', tag: 'Student', borrow_time: '15:30', expected_return_in: '17h30', return_time: '00:00', device: 'Microphone', status: 'Overdue' },

];
