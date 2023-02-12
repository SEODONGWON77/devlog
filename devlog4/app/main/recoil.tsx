import { atom, selector, RecoilValueReadOnly } from 'recoil';

export interface IItemList {
	id: number;
	text: string;
	isComplete?: boolean | undefined;
}

// export const textState = atom<string>({
// 	key: 'textState', // unique ID (with respect to other atoms/selectors)
// 	default: '', // default value (aka initial value)
// });

// export const charCountState: RecoilValueReadOnly<number> = selector({
// 	key: 'charCountState', // unique ID (with respect to other atoms/selectors)
// 	get: ({ get }) => {
// 		const text: string = get(textState);
// 		return text.length;
// 	},
// });

// export const todoListState = atom<ITodoList[]>({
// 	key: 'todoListState',
// 	default: [],
// });
