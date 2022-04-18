// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    id,
    avatarUrl,
    forksCount,
    issuesCount,
    starsCount,
    name,
  } = repositoryDetails
  return (
    <li key={id} className="item">
      <img src={avatarUrl} alt={name} className="img-avatar" />
      <h1 className="rep-name">{name}</h1>
      <div className="little-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="little-img"
        />
        <p className="stars-count">{starsCount} stars</p>
      </div>
      <div className="little-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="little-img"
        />
        <p className="fork-count">{forksCount} forks</p>
      </div>

      <div className="little-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="little-img"
        />
        <p className="issues-count">{issuesCount} issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
