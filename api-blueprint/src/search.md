# Search

#### About the Search API

The Search API is optimized to help you find the specific item you're looking for (e.g., a specific user, a specific file in a repository, etc.). Think of it the way you think of performing a search on Google. It's designed to help you find the one result you're looking for (or maybe the few results you're looking for). Just like searching on Google, you sometimes want to see a few pages of search results so that you can find the item that best meets your needs. To satisfy that need, the GitHub Search API provides **up to 1,000 results for each search**.

#### Ranking search results

Unless another sort option is provided as a query parameter, results are sorted by best match, as indicated by the ```score``` field for each item returned. This is a computed value representing the relevance of an item relative to the other items in the result set. Multiple factors are combined to boost the most relevant item to the top of the result list.

#### Rate limit

The Search API has a custom rate limit. For requests using Basic Authentication, OAuth, or client ID and secret, you can make up to 30 requests per minute. For unauthenticated requests, the rate limit allows you to make up to 10 requests per minute.

See the rate limit documentation for details on determining your current rate limit status.

#### Timeouts and incomplete results

To keep the Search API fast for everyone, we limit how long any individual query can run. For queries that exceed the time limit, the API returns the matches that were already found prior to the timeout, and the response has the ```incomplete_results``` property set to ```true```.

Reaching a timeout does not necessarily mean that search results are incomplete. More results might have been found, but also might not.

## Search repositories [/search/repositories{?q,sort,order}]

Find repositories via various criteria. This method returns up to 100 results per page.

### Search repositories [GET]

#### Parameters

The ```q``` search term can also contain any combination of the supported repository search qualifiers as described by the in-browser repository search documentation and search syntax documentation:

- in Qualifies which fields are searched. With this qualifier you can restrict the search to just the repository name, description, readme, or any combination of these.
- size Finds repositories that match a certain size (in kilobytes).
- forks Filters repositories based on the number of forks.
- fork Filters whether forked repositories should be included (true) or only forked repositories should be returned (only).
- created or pushed Filters repositories based on date of creation, or when they were last updated.
- user or repo Limits searches to a specific user or repository.
- language Searches repositories based on the language they're written in.
- stars Searches repositories based on the number of stars.

#### Example

Suppose you want to search for popular Tetris repositories written in Assembly. Your query might look like this.

```
https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc
```

In this request, we're searching for repositories with the word ```tetris``` in the name, the description, or the README. We're limiting the results to only find repositories where the primary language is Assembly. We're sorting by stars in descending order, so that the most popular repositories appear first in the search results.

```
Status: 200 OK
Link: <https://api.github.com/resource?page=2>; rel="next",
      <https://api.github.com/resource?page=5>; rel="last"
X-RateLimit-Limit: 20
X-RateLimit-Remaining: 19
```

```
{
  "total_count": 40,
  "incomplete_results": false,
  "items": [
    {
      "id": 3081286,
      "name": "Tetris",
      "full_name": "dtrupenn/Tetris",
      "owner": {
        "login": "dtrupenn",
        "id": 872147,
        "avatar_url": "https://secure.gravatar.com/avatar/e7956084e75f239de85d3a31bc172ace?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
        "gravatar_id": "",
        "url": "https://api.github.com/users/dtrupenn",
        "received_events_url": "https://api.github.com/users/dtrupenn/received_events",
        "type": "User"
      },
      "private": false,
      "html_url": "https://github.com/dtrupenn/Tetris",
      "description": "A C implementation of Tetris using Pennsim through LC4",
      "fork": false,
      "url": "https://api.github.com/repos/dtrupenn/Tetris",
      "created_at": "2012-01-01T00:31:50Z",
      "updated_at": "2013-01-05T17:58:47Z",
      "pushed_at": "2012-01-01T00:37:02Z",
      "homepage": "",
      "size": 524,
      "stargazers_count": 1,
      "watchers_count": 1,
      "language": "Assembly",
      "forks_count": 0,
      "open_issues_count": 0,
      "master_branch": "master",
      "default_branch": "master",
      "score": 10.309712
    }
  ]
}
```

#### Highlighting Repository Search Results

Some API consumers will want to highlight the matching search terms when displaying search results. The API offers additional metadata to support this use case. To get this metadata in your search results, specify the ```text-match``` media type in your Accept header. For example, via curl, the above query would look like this:

```
curl -H 'Accept: application/vnd.github.v3.text-match+json' \
  'https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc'
```

This produces the same JSON payload as above, with an extra key called text_matches, an array of objects. These objects provide information such as the position of your search terms within the text, as well as the property that included the search term.

When searching for repositories, you can get text match metadata for the name and description fields. (See the section on text match metadata for full details.)

Here's an example response:

```
{
  "text_matches": [
    {
      "object_url": "https://api.github.com/repositories/3081286",
      "object_type": "Repository",
      "property": "name",
      "fragment": "Tetris",
      "matches": [
        {
          "text": "Tetris",
          "indices": [
            0,
            6
          ]
        }
      ]
    },
    {
      "object_url": "https://api.github.com/repositories/3081286",
      "object_type": "Repository",
      "property": "description",
      "fragment": "A C implementation of Tetris using Pennsim through LC4",
      "matches": [
        {
          "text": "Tetris",
          "indices": [
            22,
            28
          ]
        }
      ]
    }
  ]
}
```

+ Parameters
	+ q: tetris+language:assembly (string, required) The search keywords, as well as any qualifiers.
	+ sort: stars (string, optional) The sort field. One of ```stars```, ```forks```, or ```updated```. Default: results are sorted by best match.
	+ order: desc (string, optional) The sort order if ```sort``` parameter is provided. One of ```asc``` or ```desc```. Default: ```desc```

+ Response 200 (application/json)
	+ Attributes
		+ total_count: 40 (number)
		+ incomplete_results: false (boolean)
		+ items (array)
			+ (object)
				+ id: 3081286 (number)
				+ name: Tetris (string)
				+ full_name: dtrupenn/Tetris (string)
				+ owner (object)
					+ login: dtrupenn (string)
					+ id: 872147 (number)
					+ avatar_url: https://secure.gravatar.com/avatar/e7956084e75f239de85d3a31bc172ace?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png (string)
					+ gravatar_id: HOW TO SET EMPTY STRING!? (string)
					+ url: https://api.github.com/users/dtrupenn (string)
					+ received_events_url: https://api.github.com/users/dtrupenn/received_events (string)
					+ type: User (string)
				+ private: false (boolean)
				+ html_url: https://github.com/dtrupenn/Tetris (string)
				+ description: A C implementation of Tetris using Pennsim through LC4 (string)
				+ fork: false (boolean)
				+ url: https://api.github.com/repos/dtrupenn/Tetris (string)
				+ created_at: 2012-01-01T00:31:50Z (string)
				+ updated_at: 2013-01-05T17:58:47Z (string)
				+ pushed_at: 2012-01-01T00:37:02Z (string)
				+ homepage: HOW_TO_SET_EMPTY_STRING!? (string)
				+ size: 524 (number)
				+ stargazers_count: 1 (number)
				+ watchers_count: 1 (number)
				+ language: Assembly (string)
				+ forks_count: 0 (number)
				+ open_issues_count: 0 (number)
				+ master_branch: master (string)
				+ default_branch: master (string)
				+ score: 10.309712 (number)
