import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h2 className="text-3xl font-bold mb-4 [font-family:var(--font-manropeSemiBold)]">404 - Strona nie została znaleziona</h2>
      <p className="mb-8 [font-family:var(--font-manrope)]">Przepraszamy, ale strona, której szukasz, nie istnieje.</p>
      <Link href="/" style={{color: "#80FF00"}} className="text-white text-[18px] font-bold py-2 px-4 [font-family:var(--font-manrope)]">
        Powrót na stronę główną
      </Link>
    </main>
  )
}
