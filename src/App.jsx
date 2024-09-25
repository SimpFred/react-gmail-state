import { useState } from "react";
import Header from "./components/Header";
import initialEmails from "./data/emails";

import "./styles/App.css";

function App() {
  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);
  const [showStarred, setShowStarred] = useState(false);

  const numberOfUnread = emails.filter((email) => !email.read).length;
  const numberOfStarred = emails.filter((email) => email.starred).length;

  const toggleRead = (id) => {
    setEmails(
      emails.map((email) =>
        email.id === id ? { ...email, read: !email.read } : email
      )
    );
  };

  const toggleStarred = (id) => {
    setEmails(
      emails.map((email) =>
        email.id === id ? { ...email, starred: !email.starred } : email
      )
    );
  };

  const getReadEmails = (emails) => {
    let filteredEmails = hideRead
      ? emails.filter((email) => !email.read)
      : emails;
    filteredEmails = showStarred
      ? filteredEmails.filter((email) => email.starred)
      : filteredEmails;
    return filteredEmails;
  };

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${!showStarred ? "active" : ""}`}
            onClick={() => {
              setShowStarred(false);
            }}
          >
            <span className="label">Inbox</span>
            <span className="count">{numberOfUnread}</span>
          </li>
          <li
            className={`item ${showStarred ? "active" : ""}`}
            onClick={() => {
              setShowStarred(true);
            }}
          >
            <span className="label">Starred</span>
            <span className="count">{numberOfStarred}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              type="checkbox"
              checked={hideRead}
              onChange={() => {
                setHideRead(!hideRead);
              }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {getReadEmails(emails).map((email) => (
            <div key={email.id}>
              <li className={`email ${email.read ? "read" : "unread"}`}>
                <span className="select">
                  <input
                    type="checkbox"
                    checked={email.read}
                    onChange={() => toggleRead(email.id)}
                  />
                </span>

                <input
                  type="checkbox"
                  className="star-checkbox"
                  checked={email.starred}
                  onChange={() => toggleStarred(email.id)}
                />

                <span className="sender">{email.sender}</span>
                <span className="title">{email.title}</span>
              </li>
            </div>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
