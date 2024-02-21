class Calculation {

 constructor() {

 }

 range(old, old_max, old_min, new_max, new_min) {
  let old_range = old_max - old_min
  let new_range = new_max - new_min
  let converted = (((old - old_min) * new_range) / old_range) + new_min
  return converted
 }

}