import { Models } from 'appwrite'
import Loader from './Loader'
import GridPostList from './GridPostList'

type SearchResults = {
    isSearchFetching: boolean,
    searchedPost: Models.Document[]
}

const SearchResult = ({ isSearchFetching, searchedPost }: SearchResults) => {

    if(isSearchFetching) return <Loader />

    if(searchedPost && searchedPost.documents.length > 0 ) {
  return (
    <GridPostList posts={searchedPost.documents} />
  )
}

  return (
    <p className="text-light-4 mt-10 text-center w-full">No results found</p>
  )
}

export default SearchResult