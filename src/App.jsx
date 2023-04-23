import { useState } from 'react'

const App = () => {
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY

  const [isKnockKnockJokeGenerated, setIsKnockKnockJokeGenerated] = useState(false)
  const [isGeneratingKnockKnockJoke, setIsGeneratingKnockKnockJoke] = useState(false)
  const [knockKnockJoke, setKnockKnockJoke] = useState("")
  const [inputTopic, setInputTopic] = useState("")

  const generateKnockKnockJoke = async () => {
    try {
      console.log("Calling the OpenAI API")

      const APIBody = {
        "model": "text-davinci-003",
        "prompt": `Generate a funny knock knock joke about the following topic : 
        ${inputTopic}`,
        "max_tokens": 50,
        "temperature": 0.6,
      }    

      setIsGeneratingKnockKnockJoke(true)
      
      await fetch("https://api.openai.com/v1/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + API_KEY,
          },
          body: JSON.stringify(APIBody),
        }).then((data) => {
          return data.json();
        }).then((data) => {
          console.log(data)
          setKnockKnockJoke(data.choices[0].text)
          setIsKnockKnockJokeGenerated(true)
          setIsGeneratingKnockKnockJoke(false)
        })

    } catch (error) {
      alert(error)
    }
  }

  const handleInputChange = (event) => {
    setInputTopic(event.target.value);
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-4xl font-black mt-10'>OpenAI API Tutorial</h1>

      <h2 className='text-2xl'>Knock Knock Joke GPT</h2>

      <div className='mt-20'>
          <p className='font-bold'>
            What do you want your knock knock joke to be about?
          </p>

          <div className='flex flex-row mt-5'>
            <input 
              className='text-2xl bg-white border-2 border-gray-400 p-1'
              placeholder='tacos'
              name='inputTopic'
              value={inputTopic}
              onChange={handleInputChange}
            />

            <button onClick={generateKnockKnockJoke} 
              className='bg-emerald-400 hover:bg-gray-400 px-5'>
              Submit!
            </button>
          </div>
      </div>

      <div className='mt-10 max-w-[500px] text-center'>
        {isKnockKnockJokeGenerated ? (
          <h1>Your knock knock joke : {knockKnockJoke}</h1>
        ) : (
          <h1>Knock knock joke will appear here</h1>
        )}
      </div>
      {isGeneratingKnockKnockJoke ? (
        <div className='mt-5 animate-pulse'>
          <h1 className='text-2xl font-bold'>
            Your knock knock joke is being generated...
          </h1>
        </div>
      ) : (
        <div />
      )}
      
   
    </div>
  )
}

export default App
