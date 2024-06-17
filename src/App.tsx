import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"

function App() {
  return (
    <>
      <Navbar />
      <main className="w-full flex flex-col justify-center h-screen items-center ">
        <section className="px-2 pb-4 mb-4 mt-0">
          <h1>
            Mhmm 😋🗿, have👊🏋 some⛄📜 delicious👌🍰 emojipasta 🤩🚀
          </h1>
        </section>

        <section>

          <textarea name="copypasta" id="copypasta" cols={80} rows={12} placeholder="bhwaahhaha" className="resize-x">
          </textarea>
        </section>
        <section>
          <button
            type="button"
            className="rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 my-2"
          >
            Cook Now
          </button>
        </section>

        <section id="cli">
          <h1>Forgot🙈😮 to mention, we📌😄 also💯👨 have😋🌹 a CLI 😎</h1>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App
