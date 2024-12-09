const fs = require('fs');
const babylon = require('babylon');

function scrubEMComments(filePath) {
  const myFile = fs.readFileSync(filePath);

  const parsed = babylon.parse(myFile.toString(), {
    sourceType: 'module',
    plugins: [
      // enable jsx and flow syntax
      'jsx',
      'flow',
      'objectRestSpread',
      'classProperties'
    ]
  });
  const commentBlocks = parsed.comments.filter(cmt => cmt.type === 'CommentBlock');
  const emComments = commentBlocks.filter(cmb => cmb.value.slice(0, 11) === '* exportmap');
  const splitContents = myFile.toString().split('\n');

  /** exportmap (updated 11/21/2017, 6:41:29 PM)
   *
   * handleAddMeal
   *   Used by:
   *    /react/containers/MealPlanner/components/AddToMeals.js
   *
   * makeMealPublic
   *    Not imported by any file
   *
   * Default Export:
   *   Used by:
   *    /redux/reducers/index.js
   *
   */
  for (let i = 0; i < emComments.length; i++) {
    const emBlock = emComments[emComments.length - 1 - i];
    splitContents.splice(emBlock.loc.start.line - 1, (emBlock.loc.end.line - emBlock.loc.start.line) + 1);
  }
  const scrubbedContents = splitContents.join('\n');
  fs.writeFileSync(filePath, scrubbedContents);
}

scrubEMComments('./test.js');

/** exportmap (updated 11/21/2017, 6:41:29 PM)
 *
 * makeMealPublic
 *    Not imported by any file
 *
 * Default Export:
 *   Used by:
 *    /redux/reducers/index.js
 *
 */

/** exportmap (updated 11/21/2017, 6:41:29 PM)
 *
 * handleAddMeal
 *   Used by:
 *    /react/containers/MealPlanner/components/AddToMeals.js
 *
 * Default Export:
 *   Used by:
 *    /redux/reducers/index.js
 *
 */
