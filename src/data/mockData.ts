import { ReactNode } from "react"
import { IconType } from "react-icons/lib"

export interface Device {
	id: number,
	name: string,
	roomName: string,
	buildingName: string,
	status: 'AVAILABLE' | 'UNAVAILABLE' | 'BORROWED' | 'DAMAGED' | 'NORMAL' | 'LOST'
	quantity: number,
}

export interface Ticket {
	id: number,
	borrowerName: string,
	staffName: string,
	borrowTime: string,
	returnDeadline: string,
	status: 'BORROWED' | 'RETURNED' | 'OVERDUE' | 'CANCELED',
	items: Array<Items>,
	actions?: ReactNode
}
export interface Items {
	id: number,
	equipmentName: string,
	quantity: number,
	status: 'AVAILABLE' | 'UNAVAILABLE' | 'BORROWED' | 'DAMAGED' | 'NORMAL' | 'LOST',
	notes: string,
}
export interface NewTicket {
	borrowerId: number,
	staffId: number,
	borrowTime: string,
	returnDeadline: string,
	items: Array<NewTicketItems>,
}
export interface NewTicketItems {
	equipmentId: number,
	quantity: number,
	notes: string,
}
export interface NewDevice {
	name: string,
	roomId: number,
	quantity: number,
}
export function createDevice(
	id: number,
	name: string,
	location: string,
	status: string,
	quantity: number,
): Device {
	return {
		id,
		name,
		location,
		status,
		quantity,
	}
}
export function createTicket(
	id: number,
	borrower_id: string,
	name: string,
	tag: string,
	borrow_time: string,
	expected_return_in: string,
	return_time: string,
	device: string,
	status: string,
): Ticket {
	return {
		id,
		borrower_id,
		name,
		tag,
		borrow_time,
		expected_return_in,
		return_time,
		device,
		status,
	}
}

export interface User {
	id: number;
	username: string;
	password: string;
}

export const users: User[] = [
	{ id: 1, username: 'admin', password: 'admin' },
	{ id: 2, username: 'user', password: 'user' },
	{ id: 3, username: 'test', password: 'test' }
];

export const devicesRow: Device[] = [
	{ id: 1, name: 'Microphobe', location: 'D9-202', status: 'Active', quantity: 20 },
	{ id: 2, name: 'Eletric Outlet', location: 'D9-202', status: 'Maintenance', quantity: 10 },
	{ id: 3, name: 'Diddy', location: 'Thai Nguyen', status: 'Active', quantity: 5 }
];
export const devicesCol = [
	{ field: 'id', headerName: 'ID', width: 100 },
	{ field: 'name', headerName: 'Name', width: 230 },
	{ field: 'location', headerName: 'Location', width: 300 },
	{ field: 'status', headerName: 'Status', width: 300 },
	{ field: 'quantity', headerName: 'Quantity', width: 300 },
]

export const ticketsRow: Ticket[] = [
	{ id: 1, borrower_id: '20207632', name: 'Tran Pham Thanh Long', tag: 'Student', borrow_time: '15:30', expected_return_in: '17h30', return_time: '00:00', device: 'Microphone', status: 'Borrowed' },
	{ id: 2, borrower_id: '20207632', name: 'Nguyen Viet Thanh', tag: 'Student', borrow_time: '15:30', expected_return_in: '17h30', return_time: '00:00', device: 'Microphone', status: 'Rerturned' },
	{ id: 3, borrower_id: '20207632', name: 'Nguyen Viet Thanh', tag: 'Student', borrow_time: '15:30', expected_return_in: '17h30', return_time: '00:00', device: 'Microphone', status: 'Borrowed' },
	{ id: 4, borrower_id: '20207632', name: 'Nguyen Viet Thanh', tag: 'Student', borrow_time: '15:30', expected_return_in: '17h30', return_time: '00:00', device: 'Microphone', status: 'Overdue' },
];
export const ticketsCol = [
	{ field: 'id', headerName: 'ID' },
	{ field: 'borrower_id', headerName: 'borrower_id' },
	{ field: 'name', headrName: 'Name' },
	{ field: 'tag', headerName: 'Tag' },
	{ field: 'borrow_time', headerName: 'Borrow time' },
	{ field: 'expected_return_in', headerName: 'Exp' },
	{ field: 'return_time', headerName: 'Return time' },
	{ field: 'device', headerName: 'Device' },
	{ field: 'status', headerName: 'Status' },
]

export const tickets: Ticket[] = [
	{ id: 1, borrower_id: '20207632', name: 'Tran Pham Thanh Long', tag: 'Student', borrow_time: '15:30', expected_return_in: '17h30', return_time: '00:00', device: 'Microphone', status: 'Borrowed' },
	{ id: 2, borrower_id: '20207632', name: 'Nguyen Viet Thanh', tag: 'Student', borrow_time: '15:30', expected_return_in: '17h30', return_time: '00:00', device: 'Microphone', status: 'Rerturned' },
	{ id: 3, borrower_id: '20207632', name: 'Nguyen Viet Thanh', tag: 'Student', borrow_time: '15:30', expected_return_in: '17h30', return_time: '00:00', device: 'Microphone', status: 'Borrowed' },
	{ id: 4, borrower_id: '20207632', name: 'Nguyen Viet Thanh', tag: 'Student', borrow_time: '15:30', expected_return_in: '17h30', return_time: '00:00', device: 'Microphone', status: 'Overdue' },

];

