export async function imageToBase64(file) {
  let str
  const reader = new FileReader();
  await reader.readAsDataURL(file);
  return  reader.onload =  () =>  {
    console.log(reader.result);
     return  reader.result
  }
 
}
