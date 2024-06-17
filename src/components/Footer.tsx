import EmoziLogo from "../assets/sadcoolcowboy.svg"

export function Footer() {
  return (
    <section className="relative overflow-hidden py-10">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <FooterContent />
      </div>
    </section>
  );
}

function FooterContent() {
  return (
    <div className="-m-6 flex flex-wrap">
      <div className="w-full p-6 md:w-1/2 lg:w-5/12">
        <LogoSection />
        <TextSection />
      </div>
    </div>
  );
}

function LogoSection() {
  return (
    <div className="mb-4 inline-flex items-center">
      <LogoIcon />
      <span className="ml-4 text-lg font-bold">emozi</span>
    </div>
  );
}

export function LogoIcon() {
  return (
	<img
	  src={EmoziLogo}
	  alt="emozi logo"
	  className="h-8 w-8"
	/>
  );
}

function TextSection() {
  return (
    <div>
      <p className="mb-4 text-base font-medium">did🌈😜 you💪🛀 enjoy😆🤩 the meal🥝🍉?</p>
      <p className="text-sm text-gray-600">
        &copy; Copyright 2024. All Rights Reserved by <a href="https://shravanasati.me">Shravan Asati</a>.
      </p>
    </div>
  );
}