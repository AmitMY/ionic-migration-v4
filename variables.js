const find = require('find-in-files').find;


function getVariables(folder) {
  return find(new RegExp("\\$[\\s\\S]*?( |:|,|\\)|;)"), folder, ".scss$")
    .then(results => {
      let allResults = [];
      Object.keys(results).forEach(f => {
        allResults = allResults.concat(results[f].matches)
      });
      allResults = new Set(allResults.map(res => res.substr(0, res.length - 1)));

      return allResults;
    });
}


module.exports = getVariables;

// Promise.all([getVariables("repo/v3"), getVariables("repo/v4")])
//   .then(([v3, v4]) => {
//     console.log(v3.size, v4.size)
//     const deprecatedArray = Array.from(v3).filter(a => !v4.has(a));
//
//     const fs = require('fs');
//     fs.writeFileSync("variables.json", JSON.stringify(deprecatedArray));
//     console.log(deprecatedArray);
//   });