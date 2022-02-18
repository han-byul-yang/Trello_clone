import { atom } from "recoil";

export interface Todoform {
    [key : string] : Todo[]
}

export interface Todo {
    id : number,
    todo : string,
}

export const todosAtom = atom<Todoform>({
    key: 'todos',
    default: {
        todo : [],
        doing : [],
        done : [{id : 3, todo: 'hello'}],
    }
})