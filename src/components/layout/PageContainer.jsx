import Navbar from './Navbar.jsx'

export default function PageContainer({ children,
  showNavbar = true, }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f0f6ff',
      }}
    >
   {showNavbar && <Navbar />}
      <div
        style={{
          maxWidth: '900px',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '32px 20px',
        }}
      >
        {children}
      </div>
    </div>
  )
}
