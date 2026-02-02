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

  return (
    <div className="cyber-container">
      <div className="scanlines"></div>
      
      {/* Sidebar Navigation */}
      <aside className="cyber-sidebar left">
        <div className="sidebar-header">
          <div className="glitch-text" data-text="NAV_CORE">NAV_CORE</div>
        </div>
        <nav className="cyber-nav">
          <Link to="/" className="nav-item" activeClassName="active">
            <span className="nav-icon">▰</span> HOME
          </Link>
          <Link to="/" className="nav-item">
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
      <aside className="cyber-sidebar right">
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
