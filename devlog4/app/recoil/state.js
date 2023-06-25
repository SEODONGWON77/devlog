import { atom, selector } from 'recoil';

export const userEmailState = atom({
    key: 'emailState',
    default: '',
});
export const userNameState = atom({
    key: 'nameState',
    default: '',
});

export const postState = atom({
    key: 'postState',
    default: '',
});