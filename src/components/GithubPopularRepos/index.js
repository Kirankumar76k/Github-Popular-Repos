import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const constantApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    languageData: [],

    activeId: languageFiltersData[0].id,
    apiStatus: constantApiStatus.initial,
  }

  componentDidMount() {
    this.filterDataWithActiveId()
  }

  filterDataWithActiveId = async () => {
    const {activeId} = this.state
    this.setState({apiStatus: constantApiStatus.inProgress})
    const url = `https://apis.ccbp.in/popular-repos?language=${activeId}`

    const response = await fetch(url)
    const data = await response.json()

    if (response.ok === true) {
      const fetchedData = data.popular_repos.map(eachItem => ({
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
      }))
      this.setState({
        languageData: fetchedData,
        apiStatus: constantApiStatus.success,
      })
    } else {
      this.setState({apiStatus: constantApiStatus.failure})
    }
  }

  onClickActiveId = id => {
    this.setState({activeId: id}, this.filterDataWithActiveId)
  }

  loadingPreview = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepoContainer = () => {
    const {languageData} = this.state
    return (
      <ul className="repository-container">
        {languageData.map(eachItem => (
          <RepositoryItem key={eachItem.id} repositoryDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="img-failure"
      />
      <h1 className="failure-head">Something Went Wrong</h1>
    </div>
  )

  renderWhatever = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case constantApiStatus.success:
        return this.renderRepoContainer()
      case constantApiStatus.failure:
        return this.renderFailureView()
      case constantApiStatus.inProgress:
        return this.loadingPreview()
      default:
        return null
    }
  }

  renderLanguageContainer = () => {
    const {activeId} = this.state
    return (
      <ul className="language-container">
        {languageFiltersData.map(eachItem => (
          <LanguageFilterItem
            key={eachItem.id}
            languageFiltersDataDetails={eachItem}
            onClickActiveId={this.onClickActiveId}
            isActive={eachItem.id === activeId}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="bg-container">
        <div className="responsive-container">
          <h1 className="heading">Popular</h1>
          {this.renderLanguageContainer()}
          {this.renderWhatever()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
