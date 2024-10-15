import s from './BotMessageText.module.css'

const BotMessageText = ({
  isMin,
  myKey,
  text,
}: {
  isMin: boolean
  myKey: string | number
  text: string
}) => (
  <div
    key={myKey}
    className={s['bot-message']}
    style={{
      maxWidth: `${isMin ? '90%' : '70%'}`,
    }}
  >
    <div
      className={s['html-text']}
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    />
  </div>
)

export default BotMessageText
