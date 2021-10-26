class Previewer{
    constructor(){};

    init = function(){
        // Dropzone elemnt
        const dropzone = document.querySelector("#upload-area");

        // Custom drag'N'drop field
        // 1)Copy dragged files
        dropzone.addEventListener("dragover", (e) => {

            // Prevent default behaviour and propagation to the child elements 
            e.stopPropagation();
            e.preventDefault();

            // Set active state and copy files
            dropzone.classList.add("active");
            e.dataTransfer.dropEffect = "copy";

        });

        // 2)Clear active state when leaving the dropzone
        dropzone.addEventListener("dragleave", (e) => {
            // Prevent default behaviour and propagation to the child elements 
            e.stopPropagation();
            e.preventDefault();

            // targets' class
            const elemCl = e.target.classList[0];

            // Remove the active state when mouse leaves dropzone  
            if(!dropzone.querySelector(`.${elemCl}`)){
                dropzone.classList.remove("active");
            }
        });

        // 3)Load files 
        dropzone.addEventListener('drop', (e) => {

            // Prevent default behaviour and propagation to the child elements
            e.stopPropagation();
            e.preventDefault();

            // Transfer file to the input element
            const inp = document.querySelector("#file");
            inp.files = e.dataTransfer.files;
            // previewLoad(inp);   
            this.preview(inp);   

            // Remove active state
            dropzone.classList.remove("active");
        });
    };
    
    preview = async function(e){

        const inp = document.querySelector("#file");
    
        // Initialize variables
        const file = inp.files[0];
        let status = true;
        let errMsg = "";
        const errElem = document.querySelector("#errors");
    
        // Check type and size
        if(!file.type.includes("image")){
            status = false;
            errMsg += "Только jpg, png, gif\n";
        }
        if(file.size > 2*1024*1024){
            status = false;
            errMsg += "Размеры файла превышен\n";
        }
    
        if(status){
            const imgLoad = new Promise((res, rej)=>{
                // Load file using FileReader to get url of the file
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
    
                // On load create and setup img
                fileReader.onloadend = function(){
                    const img = new Image();
                    img.id = "img";
                    img.src = fileReader.result;
    
                    img.onload = function(){
                        const imgWidth = this.width;
                        const imgHeight = this.height;
    
                        // On load, check demensions and respond
                        if (imgWidth <= 500 && imgHeight <= 500){
                            // Clear previous img
                            if(document.querySelector("#img")){
                                document.querySelector("#img").remove();
                            }
                            // Show preview img
                            document.querySelector("#badge-photo")
                                .insertAdjacentElement("beforeend", img);
    
                            // Clear error messages if exist
                            if(errElem){
                                errElem.remove();
                            }
                        }else{
                            status = false;
                            errMsg += "Разрешение не более 500х500\n";
                        }
                        // Successful loading
                        res(status);
                    }
                };
    
                fileReader.onerror = function(){
                    // Loading rejected
                    rej("Ошибка при загрузке файла!")
                };
    
            });
            await imgLoad;
        }
    
        // If there are errors in the process
        if(!status){
            // Clear input field in case of err
            inp.value = null;
            // Clear previous msg
            if(errElem){
                errElem.remove();
            }
            // Create the new msg
            const errors = document.createElement('p');
            errors.id = "errors";
            errors.innerText = errMsg;
            inp.insertAdjacentElement("afterend", errors);
        }
    };
}

const preview = new Previewer();
preview.init();

// // Dropzone elemnt
// const dropzone = document.querySelector("#upload-area");

// // Create the preview of the loaded file
// const previewLoad = async function(e){

//     const inp = document.querySelector("#file");

//     // Initialize variables
//     const file = inp.files[0];
//     let status = true;
//     let errMsg = "";
//     const errElem = document.querySelector("#errors");

//     // Check type and size
//     if(!file.type.includes("image")){
//         status = false;
//         errMsg += "Только jpg, png, gif\n";
//     }
//     if(file.size > 2*1024*1024){
//         status = false;
//         errMsg += "Размеры файла превышен\n";
//     }

//     if(status){
//         const imgLoad = new Promise((res, rej)=>{
//             // Load file using FileReader to get url of the file
//             const fileReader = new FileReader();
//             fileReader.readAsDataURL(file);

//             // On load create and setup img
//             fileReader.onloadend = function(){
//                 const img = new Image();
//                 img.id = "img";
//                 img.src = fileReader.result;

//                 img.onload = function(){
//                     const imgWidth = this.width;
//                     const imgHeight = this.height;

//                     // On load, check demensions and respond
//                     if (imgWidth <= 500 && imgHeight <= 500){
//                         // Clear previous img
//                         if(document.querySelector("#img")){
//                             document.querySelector("#img").remove();
//                         }
//                         // Show preview img
//                         document.querySelector("#badge-photo")
//                             .insertAdjacentElement("beforeend", img);

//                         // Clear error messages if exist
//                         if(errElem){
//                             errElem.remove();
//                         }
//                     }else{
//                         status = false;
//                         errMsg += "Разрешение не более 500х500\n";
//                     }
//                     // Successful loading
//                     res(status);
//                 }
//             };

//             fileReader.onerror = function(){
//                 // Loading rejected
//                 rej("Ошибка при загрузке файла!")
//             };

//         });
//         await imgLoad;
//     }

//     // If there are errors in the process
//     if(!status){
//         // Clear input field in case of err
//         inp.value = null;
//         // Clear previous msg
//         if(errElem){
//             errElem.remove();
//         }
//         // Create the new msg
//         const errors = document.createElement('p');
//         errors.id = "errors";
//         errors.innerText = errMsg;
//         inp.insertAdjacentElement("afterend", errors);
//     }
// }



// // Custom drag'N'drop field
//     // 1)Copy dragged files
//     dropzone.addEventListener("dragover", (e) => {

//         // Prevent default behaviour and propagation to the child elements 
//         e.stopPropagation();
//         e.preventDefault();

//         // Set active state and copy files
//         dropzone.classList.add("active");
//         e.dataTransfer.dropEffect = "copy";

//     });

//     // 2)Clear active state when leaving the dropzone
//     dropzone.addEventListener("dragleave", (e) => {
//         // Prevent default behaviour and propagation to the child elements 
//         e.stopPropagation();
//         e.preventDefault();

//         // targets' class
//         const elemCl = e.target.classList[0];

//         // Remove the active state when mouse leaves dropzone  
//         if(!dropzone.querySelector(`.${elemCl}`)){
//             dropzone.classList.remove("active");
//         }
// });

//     // 3)Load files 
//     dropzone.addEventListener('drop', (e) => {

//         // Prevent default behaviour and propagation to the child elements
//         e.stopPropagation();
//         e.preventDefault();

//         // Transfer file to the input element
//         const inp = document.querySelector("#file");
//         inp.files = e.dataTransfer.files;
//         previewLoad(inp);   

//         // Remove active state
//         dropzone.classList.remove("active");
//     });