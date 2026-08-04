import Layout from "@/layouts"

export const metadata = {
  title: 'Sitback and relax.',
  description: 'Sitback and relax.',
}

export default function PosLayout({ children }) {
  return (
    <>
      <Layout variant="pos" >{children}</Layout>
    </>
  )
}
