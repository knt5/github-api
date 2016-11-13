'use strict';

exports.searchRepositoriesGET = function(args, res, next) {
  /**
   * parameters expected in the args:
  * q (String)
  * sort (String)
  * order (String)
  **/
    var examples = {};
  examples['application/json'] = {
  "total_count" : 1.3579000000000001069366817318950779736042022705078125,
  "incomplete_results" : true,
  "items" : [ {
    "owner" : {
      "received_events_url" : "aeiou",
      "avatar_url" : "aeiou",
      "id" : 1.3579000000000001069366817318950779736042022705078125,
      "login" : "aeiou",
      "type" : "aeiou",
      "gravatar_id" : "aeiou",
      "url" : "aeiou"
    },
    "private" : true,
    "stargazers_count" : 1.3579000000000001069366817318950779736042022705078125,
    "pushed_at" : "aeiou",
    "open_issues_count" : 1.3579000000000001069366817318950779736042022705078125,
    "description" : "aeiou",
    "created_at" : "aeiou",
    "language" : "aeiou",
    "url" : "aeiou",
    "score" : 1.3579000000000001069366817318950779736042022705078125,
    "fork" : true,
    "updated_at" : "aeiou",
    "size" : 1.3579000000000001069366817318950779736042022705078125,
    "html_url" : "aeiou",
    "name" : "aeiou",
    "default_branch" : "aeiou",
    "id" : 1.3579000000000001069366817318950779736042022705078125,
    "watchers_count" : 1.3579000000000001069366817318950779736042022705078125,
    "master_branch" : "aeiou",
    "homepage" : "aeiou",
    "forks_count" : 1.3579000000000001069366817318950779736042022705078125
  } ]
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

