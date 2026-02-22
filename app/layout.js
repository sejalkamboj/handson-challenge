export const metadata = {
  title: "Legal Hero",
  description: "Floating Hero Section",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
