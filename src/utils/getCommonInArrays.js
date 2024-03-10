export function getCommonInTwoArrays(array1, array2){
  const newSet1 = new Set(array1);
  const newSet2 = new Set(array2);
  let commonId = [];
  for(const item of newSet1){
      if(newSet2.has(item)){
          commonId.push(item)
      }
  }
return commonId
}

export function getCommonInThreeArrays(array1, array2, array3){
  const newSet1 = new Set(array1);
  const newSet2 = new Set(array2);
  let commonId = [];
  for(const item of array3){
      if(newSet1.has(item) && newSet2.has(item)){
          commonId.push(item)
      }
  }
return commonId
}