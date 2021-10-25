
// const previewLoad = function(e){
//     const img = document.querySelector("#img");
//     const file = e.target.files[0];
    
//     // Check file upload specification
//     if(file.size < 2097152 && file.type === "image/jpeg"){
//         // Create url
//         img.src = URL.createObjectURL(file);
//         img.onload = ()=>URL.revokeObjectURL(img.src);
//         const warnElem = document.querySelector("#uploadWarning");
//         if(warnElem){
//             warnElem.remove();
//         }
//     }else{
//         e.target.value = null;
//         const warning = document.createElement("span");
//         warning.id = "uploadWarning";
//         warning.innerHTML = "Error! Wrong file.";
//         img.src = "";
//         img.insertAdjacentElement("afterend", warning);
//     }
// }
 

const previewLoad = function(e){

    const fileReader = new FileReader();
    
}