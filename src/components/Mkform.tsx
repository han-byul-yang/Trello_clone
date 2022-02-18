import { useForm } from 'react-hook-form'
import { todosAtom } from '../atom';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

const Form = styled.form`
width: 100%;
margin: 0 auto;
text-align: center;`

const Input = styled.input`
width: 50%;
height: 2rem;
margin-top: 1rem;
text-align: center;`

const Btn = styled.button`
margin-left: 0.5rem;
width : 1.9rem;
height: 1.9rem;`

interface Form {
    mkform: string,
}

function Mkform() {
    const [toDoList, setToDoList] = useRecoilState(todosAtom)
    const { register, handleSubmit, setValue } = useForm<Form>()

    const onValid = ({ mkform }: Form) => {
        setToDoList((oldforms) => { return { ...oldforms, [mkform]: [] } })
        setValue('mkform', '')
    }

    return (<Form onSubmit={handleSubmit(onValid)}>
        <Input type="text" placeholder='폼 만들기' {...register('mkform')}></Input>
        <Btn>+</Btn>
    </Form>)
}

export default Mkform