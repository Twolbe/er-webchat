import { ContainerProps } from './interface'
import s from './FullContainer/FullContainer.module.css'

const MinContainer = ({ header, workArea, input }: ContainerProps) => (
  <div className={s['wrapper']}>
    {header}
    {workArea}
    {input}
  </div>
)

export default MinContainer
