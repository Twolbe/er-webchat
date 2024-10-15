import './TypingImitation.css'

const TypingImitation = ({ loading }: { loading: boolean }) =>
  loading && (
    <div className='bot-message'>
      <div className='ticontainer'>
        <div className='tiblock'>
          <div className='tidot' />
          <div className='tidot' />
          <div className='tidot' />
        </div>
      </div>
    </div>
  )

export default TypingImitation
