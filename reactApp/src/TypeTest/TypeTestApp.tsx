import { useRef, useState, useEffect } from "react"
import Word from "./Word"
import getCloud from "./getCloud"

export default function TypeTestApp() {
  const [userInput, setUserInput] = useState("")
  const [activeWordIndex, setActiveWordIndex] = useState(0)
  const [correctWordArray, setCorrectWordArray] = useState<boolean[]>([])
  const [timer, setTimer] = useState(60)
  const wordCloud = useRef<string[]>(getCloud())

  const handleUserInput = function (value: string) {
    if (value.endsWith(" ")) {
      setActiveWordIndex((index) => index + 1)
      setUserInput("")
      setCorrectWordArray((data) => {
        const word = value.trim()
        data[activeWordIndex] = word === wordCloud.current[activeWordIndex]
        return data
      })
    } else {
      setUserInput(value)
    }
  }

  useEffect(() => {
    while (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [timer])

  return (
    <>
      <h1 className="text-4xl font-bold mb-4">Typeing test</h1>
      <div className=" ml-52 mr-52 mt-20">
        {/* <div className="border border-gray-300 rounded-md p-4  "> */}
          <div className="border border-gray-300 rounded-md p-4 max-w-md mx-auto">
            {wordCloud.current.map((word: string, index: number) => {
              const lineIndex = Math.floor(index / 3) // Calculate the line index for each word
              const isLineCompleted = lineIndex < activeWordIndex / 3 // Check if the line is completed

              return (
                <div
                  key={index}
                  className={`flex flex-wrap justify-center gap-2 ${
                    isLineCompleted ? "hidden" : ""
                  }`}
                >
                  <Word
                    text={word}
                    active={index === activeWordIndex}
                    correct={correctWordArray[index]}
                  />
                </div>
              )
            })}
          </div>
        {/* </div> */}
        <div className="flex justify-center bg-slate-50">
          <input
            type="text"
            value={userInput}
            className="bg-slate-400 px-4 py-2 rounded-md m-2 w-full"
            onChange={({ target: { value } }) => handleUserInput(value)}
          />
        </div>
      </div>
      <p className="mt-4">Time Remaining: {timer} seconds</p>
    </>
  )
}
