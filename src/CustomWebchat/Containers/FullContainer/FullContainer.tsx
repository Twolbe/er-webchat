import { ContainerProps } from '../interface'
import s from './FullContainer.module.css'

const FullContainer = ({ header, workArea, input }: ContainerProps) => (
  <div className={s['wrapper']}>
    {header}
    <div className={s['work-area-and-input-wrapper']}>
      {workArea}
      <div className={s['input-wrapper']}>{input}</div>
    </div>
  </div>
)

export default FullContainer
