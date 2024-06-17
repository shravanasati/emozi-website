import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"

function generateEmojipasta() {
  let copypasta = (document.getElementById("copypasta") as HTMLTextAreaElement)!.value

  if (!copypasta) {
    return
    // todo show error saying add text
  }

  // todo add validation and progress bar
  fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: copypasta,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        document.getElementById("emojipasta")!.textContent = `whoopsies🤭! the server🙅 is upset😡 \nerror: ${data.error}`
      } else {
        document.getElementById("emojipasta")!.textContent = data.emojipasta
      }
    })
    .catch((error) => {
      document.getElementById(
        "emojipasta"
      )!.textContent = `something went wrong 😔 \nerror: ${error}`
    }
    )
}

function App() {
  return (
    <>
      <Navbar />
      <main className="w-full flex flex-col justify-center items-center mt-10 pt-4">
        <section className="px-2 pb-4 mb-6 mt-0">
          <h1>
            Mhmm 😋🗿, have👊🏋 some⛄📜 delicious👌🍰 emojipasta 🤩🚀
          </h1>
        </section>

        <section>

          <textarea name="copypasta" id="copypasta" cols={60} rows={6} placeholder="bhwaahhaha 😈" className="resize-x p-2 m-2">
          </textarea>
        </section>
        <section>
          <button
            type="button"
            className="rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 my-2"
            onClick={generateEmojipasta}
          >
            Cook Now
          </button>
        </section>

        <section className="p-2 m-2">
          <textarea name="emojipasta" id="emojipasta" placeholder="emojipasta will be served here 🍽️" readOnly rows={7} cols={60} className="resize-x p-2 m-2"></textarea>
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

        <section id="cli" className="mt-16 pt-5">
          <h1>Forgot🙈😮 to mention, we📌😄 also💯👨 have😋🌹 a CLI 😎</h1>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App
