type cloudProps = {
  text: string
  active: boolean
  correct: boolean | null
}

export default function Word(props: cloudProps) {
  const { text, active, correct } = props
  if (correct === true) {
    return <span className="text-green-400">{text}  </span>
  }
  if (correct === false) {
    return <span className="bg-red-200">{text}  </span>
  }
  if (active === true) {
    return <span className="font-bold bg-slate-200">{text}  </span>
  }
  return <span>{text} </span>
}
