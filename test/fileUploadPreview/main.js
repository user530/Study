const previewLoad = async function(e){
    // Initialize variables
    const file = e.target.files[0];
    let status = true;
    let errMsg = "";
    const errElem = document.querySelector("#errors");
    
    // Check type and size
    if(!file.type.includes("image")){
        status = false;
        errMsg += "Wrong file type!\n";
    }
    if(file.size > 2*1024*1024){
        status = false;
        errMsg += "File size is too big!\n";
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
                        document.querySelector("#left")
                            .insertAdjacentElement("beforeend", img);
    
                        // Clear error messages if exist
                        if(errElem){
                            errElem.remove();
                        }
                    }else{
                        status = false;
                        errMsg += "Wrong image resolution!\n";
                    }
                    // Successful loading
                    res(status);
                }
            };
    
            fileReader.onerror = function(){
                // Loading rejected
                rej("File upload error!")
            };

        });
        await imgLoad;
    }

    // If there are errors in the process
    if(!status){
        // Clear input field in case of err
        e.target.value = null;
        // Clear previous msg
        if(errElem){
            errElem.remove();
        }
        // Create the new msg
        const errors = document.createElement('p');
        errors.id = "errors";
        errors.innerText = errMsg;
        e.target.insertAdjacentElement("afterend", errors);
    }
}
