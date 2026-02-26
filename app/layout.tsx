export const metadata = {
  title: 'My Gemini Chat',
  description: 'Built with Gemini API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
}
