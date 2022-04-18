import './index.css'
// Write your code here
const languageFiltersData = props => {
  const {languageFiltersDataDetails, onClickActiveId, isActive} = props
  const {id, language} = languageFiltersDataDetails

  const activeClassName = isActive ? 'lan-btn active-btn' : 'lan-btn'

  const onClickFilter = () => {
    onClickActiveId(id)
  }

  return (
    <li>
      <button type="button" className={activeClassName} onClick={onClickFilter}>
        {language}
      </button>
    </li>
  )
}
export default languageFiltersData
