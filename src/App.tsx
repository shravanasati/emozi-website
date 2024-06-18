import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { AlertBanner } from "./components/AlertBanner"
import { InstallationTechnique } from "./components/InstallationTechnique"
import { useEffect, useState } from "react"
import './App.css'

function ProgressBar() {

  return <button
    type="button"
    className="rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 my-2"
    disabled
  > <span className="emoji-rotate">😶</span>
    Cooking... <span className="emoji-rotate">🤠</span>
  </button>
}

function App() {
  const [cols, setCols] = useState(60);

  useEffect(() => {
    const calculateCols = () => {
      // Estimate the average width of a character in pixels. This value might need adjustment.
      const averageCharWidth = 8; // This is an estimated value; adjust based on your font and styling
      const screenWidth = window.innerWidth;
      const desiredWidth = screenWidth * 0.4; // 40% of the screen width
      const newCols = Math.floor(desiredWidth / averageCharWidth);

      setCols(newCols);
    };

    // Calculate cols on mount
    calculateCols();

    // Add event listener for window resize
    window.addEventListener('resize', calculateCols);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener('resize', calculateCols);
  }, []);

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const sliderEmojiArray = ["😊", "🤠", "😂", "😈", "💩"]
  const [sliderValue, setSliderValue] = useState(2)
  const [sliderEmoji, setSliderEmoji] = useState(sliderEmojiArray[1])
  useEffect(() => {
    // change slider emoji based on slider value
    const index = sliderValue - 1;
    setSliderEmoji(sliderEmojiArray[index])
  }, [sliderValue])


  const generateEmojipasta = async () => {
    let copypasta = (document.getElementById("copypasta") as HTMLTextAreaElement)!.value

    if (!copypasta) {
      setError("bro atleast yap something 🤐")
      setTimeout(() => setError(""), 4000)
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: copypasta,
          options: {
            emojiDensity: sliderValue
          }
        }),
      });
      const data = await response.json();
      if (data.error) {
        setError(`whoopsies🤭! the server🙅 is upset😡 \nerror: ${data.error}`);
        setTimeout(() => setError(""), 5000);
      } else {
        document.getElementById("emojipasta")!.textContent = data.emojipasta;
      }
    } catch (error) {
      setError(`something went wrong 😥 \nerror: ${error}`);
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  }


  return (
    <>
      <Navbar />
      {error && <AlertBanner alertText={error} closeFn={() => setError("")} />}
      <main className="w-full flex flex-col justify-center items-center mt-8 pt-4">
        <section className="px-2 pb-4 mb-6 mt-0">
          <h1>
            Mhmm 😋🗿, have👊🏋 some⛄📜 delicious👌🍰 emojipasta 🤩🚀
          </h1>
        </section>

        <section>

          <textarea name="copypasta" id="copypasta" cols={cols} rows={6} placeholder="bhwaahhaha 😈" className="resize-x p-2 m-2">
          </textarea>
        </section>

        <section className="p-4">
          <label htmlFor="slider" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Emoji Density:</label>

          <input type="range" id="slider" name="slider" min={1} max={5} value={sliderValue} className="h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            onChange={(ev) => {
              setSliderValue(parseInt(ev.target.value, 10));
            }} /> <span>{sliderEmoji}</span>
        </section>

        <section>
          {loading ? ProgressBar() : <button
            type="button"
            className="rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 my-2"
            onClick={async () => await generateEmojipasta()}
          >
            Cook Now
          </button>}
        </section>

        <section className="p-2 m-2">
          <textarea name="emojipasta" id="emojipasta" placeholder="emojipasta will be served here 🍽️" readOnly rows={7} cols={cols} className="resize-x p-2 m-2"></textarea>
        </section>
        <section>
          <button
            type="button"
            className="rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 my-2"
            onClick={async () => {
              await navigator.clipboard.writeText(document.getElementById("emojipasta")?.textContent || "")
            }}
          >
            Copy to Clipboard
          </button>
        </section>

        <section id="cli" className="flex flex-col justify-center items-center mt-16 pt-5">
          <h1 className="p-4 m-2">Forgot🙈😮 to mention, we📌😄 also💯👨 have😋🌹 a CLI 😎</h1>
          <p>it's also called emozi</p>
          <p>it's cross platform and simple to use</p>
          <p>check it out <a href="https://github.com/shravanasati/emozi">here</a></p>

          <h3 className="font-bold text-2xl m-8">Installation</h3>
          <ul>
            <InstallationTechnique technique="using eget (easiest)" command="eget shravanasati/emozi" />
            <InstallationTechnique technique="using scoop (windows) package manager" command="curl.exe https://github.com/shravanasati/emozi/releases/latest/download/emozi.json -L -o emozi.json;
scoop install ./emozi.json" />
            <InstallationTechnique technique="using go compiler" command="go install github.com/shravanasati/emozi@latest" />
          </ul>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App
