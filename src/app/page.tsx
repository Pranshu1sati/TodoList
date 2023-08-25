import Image from 'next/image'
import Addtodo from '@/components/Addtodo'
import { Todos } from '@/components/Todos'
import Navbar from '@/components/Navbar'
export default function Home() {
  return (
    <>
    <div className='TodoList'>
    <Navbar/>
    <Addtodo/>
    <Todos/>
    </div>
    </>
  )
}
