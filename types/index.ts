
interface OrbitData {
	array: (Avatar)[] | [];
	contact_date: string;
}
interface Avatar {
	id: string | number;
	created_at: number;
	name: string;
	img: string;
	position: string;
	city: string;
	_orbits_last_message: OrbitsLastMessage;
}
export interface OrbitsLastMessage {
	message: string;
	message_head: string;
}

interface SingleOrbit {
	array: Array<{
		id: number;
		created_at: number;
		name: string;
		img: string;
		position: string;
		city: string;
		_orbits_last_message: {
			message: string;
			message_head: string;
		};
	}>;
	contact_date: string;
}

interface ComponentData {
	singleOrbit: SingleOrbit[];
	sortedOrbits: SingleOrbit[];
}

type TimeoutId = ReturnType<typeof setTimeout>
type IntervalId = ReturnType<typeof setInterval>

export type { OrbitData, SingleOrbit, Avatar, TimeoutId, IntervalId };