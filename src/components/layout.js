import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  
  const [messages, setMessages] = React.useState([
    { id: 1, user: "SYSTEM", text: "Connection established.", type: "system" },
    { id: 2, user: "Netrunner", text: "Anyone seeing the glitch in Sector 7?", type: "user" },
  ])
  const chatEndRef = React.useRef(null)

  // Mobile drawers
  const [navOpen, setNavOpen] = React.useState(false)
  const [chatOpen, setChatOpen] = React.useState(false)

  React.useEffect(() => {
    const interval = setInterval(() => {
      const users = ["Ghost", "Cipher", "V", "Decker", "Echo", "Rogue"]
      const texts = [
        "Data stream stable.",
        "Target acquired.",
        "The black ice is thick today.",
        "Need a fix on that signal.",
        "Encrypted packet received.",
        "Who's paying for this run?",
        "Scanning...",
        "Login detected: Unauthorized.",
      ]
      const newUser = users[Math.floor(Math.random() * users.length)]
      const newText = texts[Math.floor(Math.random() * texts.length)]
      
      setMessages(prev => [...prev.slice(-19), { 
        id: Date.now(), 
        user: newUser, 
        text: newText,
        type: "user"
      }])
    }, 3000 + Math.random() * 4000)
    return () => clearInterval(interval)
  }, [])

  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Prevent background scroll when a drawer is open (mostly for mobile)
  React.useEffect(() => {
    const open = navOpen || chatOpen
    if (open) document.body.classList.add("drawer-open")
    else document.body.classList.remove("drawer-open")

    return () => document.body.classList.remove("drawer-open")
  }, [navOpen, chatOpen])

  const closeAll = () => {
    setNavOpen(false)
    setChatOpen(false)
  }

  const openNav = () => {
    setNavOpen(true)
    setChatOpen(false)
  }

  const openChat = () => {
    setChatOpen(true)
    setNavOpen(false)
  }

  return (
    <div className={`cyber-container ${navOpen ? "nav-open" : ""} ${chatOpen ? "chat-open" : ""}`.trim()}>
      <div className="scanlines"></div>
      
      {/* Mobile top bar */}
      <div className="mobile-topbar" role="navigation" aria-label="Mobile navigation">
        <button
          className="mobile-btn"
          type="button"
          aria-label="Open navigation"
          aria-expanded={navOpen}
          onClick={() => (navOpen ? closeAll() : openNav())}
        >
          ☰ NAV
        </button>

        <button
          className="mobile-btn accent"
          type="button"
          aria-label="Open live chat"
          aria-expanded={chatOpen}
          onClick={() => (chatOpen ? closeAll() : openChat())}
        >
          ▣ CHAT
        </button>
      </div>

      {/* Overlay for drawers */}
      <div className="drawer-overlay" onClick={closeAll} aria-hidden="true" />

      {/* Sidebar Navigation */}
      <aside className="cyber-sidebar left" data-drawer>
        <div className="sidebar-header">
          <div className="glitch-text" data-text="NAV_CORE">NAV_CORE</div>
        </div>
        <nav className="cyber-nav">
          <Link to="/" className="nav-item" activeClassName="active" onClick={closeAll}>
            <span className="nav-icon">▰</span> HOME
          </Link>
          <Link to="/" className="nav-item" onClick={closeAll}>
            <span className="nav-icon">▱</span> LOGS
          </Link>
          <div className="nav-item disabled">
            <span className="nav-icon">▱</span> SIGNALS <small>(SOON)</small>
          </div>
          <div className="nav-item disabled">
            <span className="nav-icon">▱</span> ARCHIVES <small>(SOON)</small>
          </div>
          <div className="nav-item disabled">
            <span className="nav-icon">▱</span> OPS <small>(SOON)</small>
          </div>
          <div className="nav-item disabled">
            <span className="nav-icon">▱</span> SETTINGS <small>(SOON)</small>
          </div>
        </nav>
        <div className="sidebar-footer">
          <div className="status-bit">LVL: 0.1.0</div>
          <div className="status-bit">SYS: ONLINE</div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="cyber-main">
        <header className="cyber-header">
          <h1 className="cyber-title">
            <Link to="/">{title}</Link>
          </h1>
          <div className="header-decoration"></div>
        </header>
        
        <div className="content-scrollbox">
          {children}
        </div>

        <footer className="cyber-footer">
          <div className="footer-line"></div>
          <span>© {new Date().getFullYear()} // RP_BLOGGER // LOCALHOST</span>
        </footer>
      </main>

      {/* Message Board Sidebar */}
      <aside className="cyber-sidebar right" data-drawer>
        <div className="sidebar-header">
          <div className="glitch-text" data-text="LIVE_STREAM">LIVE_STREAM</div>
        </div>
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`chat-msg ${msg.type}`}>
                <span className="msg-user">[{msg.user}]</span>
                <span className="msg-text">{msg.text}</span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </div>
        <div className="sidebar-footer chat-input-sim">
          <div className="cursor">_</div>
          <div className="input-placeholder">AWAITING_INPUT...</div>
        </div>
      </aside>
    </div>
  )
}

export default Layout
