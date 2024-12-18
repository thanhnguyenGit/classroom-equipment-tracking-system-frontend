import axios from "axios";

export const AddEquipment = async (name: string, roomId: number, quantity: number) => {
	try {
		const response = await axios.post('/api/equipment/add', {
			name,
			roomId,
			quantity,
		});
		console.log('Save successful', {
			name,
			roomId,
			quantity
		});
	} catch (error) {
		console.error('Save failed', error);
	}
}

