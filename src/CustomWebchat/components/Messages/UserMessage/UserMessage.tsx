import s from './UserMessage.module.css'

const UserMessage = ({
  isMin,
  myKey,
  text,
}: {
  isMin: boolean
  myKey: number | string
  text: string
}) => (
  <div
    className={s['user-message']}
    style={{
      maxWidth: `${isMin ? '90%' : '70%'}`,
    }}
    key={myKey}
  >
    {text}
  </div>
)

export default UserMessage
