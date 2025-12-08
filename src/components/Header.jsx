import mouth from "/img/mouth.png"

export default function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <img className="w-12" src={mouth} alt="" />
          </div>
          <h1 className="text-xl font-bold text-foreground"><span className="text-blue-600">Real</span>OrFake</h1>
        </div>
        <p className="italic font-semibold">"Test your data and make a prove"</p>
      </div>
    </header>
  )
}
