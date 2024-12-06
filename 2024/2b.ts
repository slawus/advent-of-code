import * as fs from "node:fs";

const input = fs.readFileSync("./inputs/2.txt", "utf8");

async function main() {
 const lines = input.split("\n");
 let safeNumber = 0;
 for(const line of lines) {
   const values = line.split(" ").filter(Boolean).map(Number);
   let safe = processValues([...values])
   if(!safe) {
     for (let index = 0; index < values.length; index++) {
       let newValues = [...[...values].slice(0, index), ...[...values].slice(index+1, values.length)];
       safe = processValues(newValues);
       if(safe) {
         break;
       }
     }
   }

   if(safe) {
     safeNumber += 1;
     console.log(line);
   }
 }

 return {
   safeNumber
 }
}


const processValues = (values: number[]) => {
  let safe = true;
  let direction = (values[1] - values[0]) > 0 ? 1 : -1;
  let prevValue = values[0] - direction;

  for (const value of values) {
    const dv = direction*(value - prevValue);
    if(dv > 3 || dv < 1) {
      safe = false;
      break;
    }
    prevValue = value;
  }

  return safe;
}

console.log(main());