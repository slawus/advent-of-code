import * as fs from "node:fs";

const input = fs.readFileSync("./inputs/2.txt", "utf8");

async function main() {
 const lines = input.split("\n");
 let safeNumber = 0;
 for(const line of lines) {
   const values = line.split(" ").filter(Boolean).map(Number);
   let safe = true;
   let direction = (values[1] - values[0]) > 0 ? 1 : -1;
   let prevValue = values[0] - direction;

   console.log(values, direction);
   for (const value of values) {
     const dv = direction*(value - prevValue);
     if(dv > 3 || dv < 1) {
       safe = false;
       break;
     }
     prevValue = value;
   }

   if(safe) {
     safeNumber += 1;
   }
   console.log(safe);
 }

 return {
   safeNumber
 }
}

console.log(main());