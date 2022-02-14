import { atom } from "recoil";

export const todosAtom = atom({
    key: 'todos',
    default: ["a", "b", "c", "d", "e", "f"]
})