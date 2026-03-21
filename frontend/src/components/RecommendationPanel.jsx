export default function RecommendationPanel({
  recommendations,
  onSelect
}) {

  return (

    <div>

      <h2>
        Recommended Today
      </h2>

      {!recommendations.length ? (

        <p className="empty-state">
          No recommendations right now.
        </p>

      ) : (

        <div className="list-stack">

          {recommendations.map((contact) => (

            <div
              key={contact.id}
              className="recommendation-card"
              onClick={() => onSelect(contact)}
            >

              <h3>
                {contact.name}
              </h3>

              <p>
                {contact.reason}
              </p>

              <small>
                {contact.company}
              </small>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}