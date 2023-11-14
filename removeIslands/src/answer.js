const checkAdj = (row, column, matrix) => {
  if (isVisited[row][column] != 1) {
    edges.push([row, column]);
    isVisited[row][column] = 1;
  }

  if (row - 1 >= 0) {
    if (isVisited[row - 1][column] != 1) {
      if (matrix[row - 1][column] == 1) {
        checkAdj(row - 1, column, matrix);
      }
    }
  }

  if (row + 1 <= matrix.length - 1) {
    if (isVisited[row + 1][column] != 1) {
      if (matrix[row + 1][column] == 1) {
        checkAdj(row + 1, column, matrix);
      }
    }
  }

  if (column - 1 >= 0) {
    if (isVisited[row][column - 1] != 1) {
      if (matrix[row][column - 1] == 1) {
        checkAdj(row, column - 1, matrix);
      }
    }
  }

  if (column + 1 <= matrix[0].length - 1) {
    if (isVisited[row][column + 1] != 1) {
      if (matrix[row][column + 1] == 1) {
        checkAdj(row, column + 1, matrix);
      }
    }
  }

  return edges;
};

const removeIslands = (matrix) => {
  // find nodes with '1' and group connected nodes
  let groupNodes = [];
  for (let i = 1; i < matrix.length - 1; i++) {
    for (let j = 1; j < matrix[0].length - 1; j++) {
      // if node was visited, do not run checkAdj() function, save time
      if (matrix[i][j] == 1 && isVisited[i][j] != 1) {
        let temp = checkAdj(i, j, matrix);
        groupNodes.push(temp);
        edges = [];
        // console.log(++count); // check if running as wanted
      }
    }
  }

  let borderNodes = [];
  // finding borders within groups
  for (let k = 0; k < groupNodes.length; k++) {
    for (let l = 0; l < groupNodes[k].length; l++) {
      if (
        groupNodes[k][l][0] == 0 ||
        groupNodes[k][l][0] == matrix.length - 1 ||
        groupNodes[k][l][1] == 0 ||
        groupNodes[k][l][1] == matrix[0].length - 1
      ) {
        borderNodes.push(k);
        break;
      }
    }
  }

  // remove groups which contain border nodes
  for (let n = borderNodes.length - 1; n >= 0; n--) {
    groupNodes.splice(borderNodes[n], 1);
  }

  // finally changing '1's to '0's
  for (let a = 0; a < groupNodes.length; a++) {
    for (let b = 0; b < groupNodes[a].length; b++) {
      matrix[groupNodes[a][b][0]][groupNodes[a][b][1]] = 0;
    }
  }
  return matrix;
};

const input = [
  [1, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 1, 1],
  [0, 0, 1, 0, 1, 0],
  [1, 1, 0, 0, 1, 0],
  [1, 0, 1, 1, 0, 0],
  [1, 0, 0, 0, 0, 1],
];

// create array with same dimensions as input and fill with zeroes
let isVisited = Array(input.length)
  .fill()
  .map(() => Array(input[0].length).fill(0));

// let count = 0;

// perhaps there is a way to declare edges within the function, but I ran into circular references too many times and gave up
let edges = [];

console.log(removeIslands(input));
