const fs = require('fs');
const path = require('path');
const babylon = require('babylon');
const fpackage = require('../package.json');
const chalk = require('chalk');
// const scrubEMContents = require('./scrubEMComments');

const homeBase = path.resolve('./browser');

// console.dir(parsed.program.body[0].specifiers);

const files = {};
const namedDependencies = Object.assign({}, fpackage.dependencies, fpackage.devDependencies);

const aliases = {
  containers: path.resolve('./browser/react/'),
  components: path.resolve('./browser/react/'),
  utils: path.resolve('./browser/redux/'),
  app: path.resolve('./browser/'),
  browser: path.resolve('./'),
  theme: path.resolve('./browser/react/'),
  assets: path.resolve('./browser/'),
  reducers: path.resolve('./browser/redux/'),
  colorCSS: path.resolve('./browser/react/'),
};

function parseDir(startPath) {
  const items = fs.readdirSync(startPath);
  items.forEach((item) => {
    const stats = fs.statSync(`${startPath}/${item}`);
    if (stats.isDirectory(`${startPath}/${item}`)) {
      parseDir(`${startPath}/${item}`);
    } else {
      const extension = item.slice(item.length - 3);
      if ((extension === '.js' || extension === 'jsx') && item.indexOf('test') < 0) {
        files[path.resolve(`${startPath}/${item}`)] = parseFile(`${startPath}/${item}`, startPath);
      }
    }
  });
}

parseDir('./browser');
// console.log(postProcessJSON(files));
const newFiles = postProcessJSON(files);
fs.writeFileSync('./parsedJS.json', JSON.stringify(newFiles));

// console.log(makeAnnotationComment(newFiles['/home/richard/Documents/fullstack_academy/senior/knowyourmacros/browser/redux/reducers/foodrecord.js']));

// const storeFile = fs.readFileSync('./browser/react/App.js');

// const parsed = babylon.parse(storeFile.toString(), {
//   sourceType: 'module',
//   plugins: [
//     // enable jsx and flow syntax
//     'jsx',
//     'flow',
//     'objectRestSpread',
//     'importMeta',
//     'classProperties'
//   ]
// });
// fs.writeFileSync('./parsedApp.json', JSON.stringify(parsed));

function parseFile(filePath, directory) {
  const storeFile = fs.readFileSync(filePath);

  const parsed = babylon.parse(storeFile.toString(), {
    sourceType: 'module',
    plugins: [
      // enable jsx and flow syntax
      'jsx',
      'flow',
      'objectRestSpread',
      'classProperties'
    ]
  });
  return parsed
    .program
    .body
    .filter(node => node.type === 'ImportDeclaration' || node.type === 'ExportDefaultDeclaration' || node.type === 'ExportNamedDeclaration')
    .filter((node) => {
      if (node.type === 'ImportDeclaration' && namedDependencies[node.source.value]) {
        return false;
      }
      return true;
    })
    .map((node) => {
      switch (node.type) {
        case 'ImportDeclaration':
          return {
            type: node.type,
            specifiers: node
              .specifiers
              .map(spec => (spec.imported
                ? spec.imported.name
                : spec.local.name)),
            source: parsePath(node.source.value)
          };
        case 'ExportDefaultDeclaration':
          return parseDefaultExport(node);
        case 'ExportNamedDeclaration':
          return parseNamedExport(node);
        default:
          return {
            type: node.type,
            error: 'Node type not parsed'
          };
      }
    })
    .reduce((memo, node) => {
      switch (node.type) {
        case 'ImportDeclaration':
          memo.imports.push(node);
          break;
        case 'ExportNamedDeclaration':
          memo.namedExports.push(node);
          break;
        case 'ExportDefaultDeclaration':
          memo.defaultExport = node;
          break;
        default:
          break;
      }
      return memo;
    }, {
      imports: [],
      namedExports: [],
      defaultExport: null
    });

  function parseDefaultExport(node) {
    return {
      type: node.type,
      name: node.declaration.name,
      usedBy: []
    };
  }

  function parsePath(resPath) {
    let initPath = filePath;
    let output = `${path.resolve(resPath)}`;
    if (directory) {
      initPath = directory;
    }
    if (resPath[0] === '.') {
      output = `${path.resolve(initPath, resPath)}`;
    }

    if (aliases[resPath]) {
      output = `${aliases[resPath]}`;
    }

    if (aliases[resPath.split('/')[0]]) {
      output = `${path.resolve(aliases[resPath.split('/')[0]], resPath)}`;
    }

    try {
      const stats = fs.statSync(output);
      if (stats.isDirectory(output)) {
        output = `${output}/index.js`;
      }
    } catch (err) {
      output = `${output}.js`;
    }
    return output;
  }

  function parseNamedExport(node) {
    return {
      type: node.type,
      name: ((node.declaration && node.declaration.declarations)
        ? node
          .declaration
          .declarations[0].id.name
        : (node.declaration ? node.declaration.id.name : '')),
      usedBy: []
    };
  }
}

function postProcessJSON(obj) {
  let count = 0;
  const ffiles = Object.keys(obj);
  ffiles.forEach((file) => {
    obj[file].imports.forEach((imp) => {
      if (!obj[imp.source]) {
        console.log(`source ${chalk.cyan(imp.source.replace('/home/richard/Documents/fullstack_academy/senior/knowyourmacros', ''))} at ${chalk.magenta(file.replace('/home/richard/Documents/fullstack_academy/senior/knowyourmacros', ''))} [${chalk.white.bold(imp.specifiers[0])}] not found in JSON object`);
        count++;
      }
      if (obj[imp.source]) {
        const specs = imp.specifiers;
        specs.forEach((spec) => {
          let assigned = false;
          if (obj[imp.source].defaultExport && obj[imp.source].defaultExport.name === spec) {
            obj[imp.source].defaultExport.usedBy.push(file.replace(homeBase, ''));
            assigned = true;
          } else {
            obj[imp.source].namedExports.forEach((exp) => {
              if (exp.name === spec) {
                assigned = true;
                exp.usedBy.push(file.replace(homeBase, ''));
              }
            });
          }
          if (!assigned) {
            if (!obj[imp.source].defaultExport) {
              obj[imp.source].defaultExport = { usedBy: [] };
            }
            obj[imp.source].defaultExport.usedBy.push(file.replace(homeBase, ''));
          }
        });
      }
      if (obj[file]) {
        delete obj[file].imports;
      }
      if (file.indexOf('test') > -1) {
        delete obj[file];
      }
      // obj[file].namedExports = obj[file].namedExports.map((exp) => ({
      //   name: exp.name,
      //   usedBy: exp.usedBy
      // }));
    });
  });
  console.log('-------');
  console.log(count);
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    newObj[key.replace(homeBase, '')] = obj[key];
  });
  return newObj;
}

function makeAnnotationComment(obj) {
  let output = `/** exportmap (updated ${new Date().toLocaleString()})\n *\n`;
  if (obj.namedExports) {
    obj.namedExports.forEach((nExp) => {
      output += ` * ${nExp.name}\n`;
      if (nExp.usedBy.length) {
        output += ' *   Used by:\n';
        nExp.usedBy.forEach((file) => {
          output += ` *    ${file.replace(homeBase, '')}\n`;
        });
        output += ' *\n';
      } else {
        output += ' *    Not imported by any file\n *\n';
      }
    });
  }
  if (obj.defaultExport && obj.defaultExport.usedBy.length) {
    output += ' * Default Export:\n';
    output += ' *   Used by:\n';
    obj.defaultExport.usedBy.forEach((file) => {
      output += ` *    ${file.replace(homeBase, '')}\n`;
    });
  }
  output += ' *\n */\n';
  return output;
}
