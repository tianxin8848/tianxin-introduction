import { NavLink } from 'react-router-dom'

const referenceSections = [
  {
    title: '聲',
    items: ['b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'ng', 'h', 'gw', 'kw', 'w', 'z', 'c', 's', 'j'],
  },
  {
    title: '韻',
    items: ['aa', 'a', 'e', 'i', 'o', 'u', 'oe', 'eo', 'yu', 'm', 'ng'],
  },
  {
    title: '尾',
    items: ['i', 'u', 'm', 'n', 'ng', 'p', 't', 'k'],
  },
]

function ReferenceSections() {
  return (
    <section className="reference-grid-card" aria-label="聲韻尾參考">
      {referenceSections.map((section) => (
        <div key={section.title} className="reference-row">
          <div className="reference-title">{section.title}</div>
          <div className="reference-items">
            {section.items.map((item) => (
              section.title === '韻' ? (
                <NavLink
                  key={`${section.title}-${item}`}
                  to={`/final/${item}`}
                  className={({ isActive }) => `reference-item ${isActive ? 'active' : ''}`}
                >
                  {item}
                </NavLink>
              ) : (
                <span key={`${section.title}-${item}`} className="reference-item">
                  {item}
                </span>
              )
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

export default ReferenceSections
