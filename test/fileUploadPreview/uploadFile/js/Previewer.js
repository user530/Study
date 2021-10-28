/** Load images into designated area and get img preview before submit
 * 
 * @param {Number} _fileSizeMb The size limit for the img file
 * @param {Number} _imgWidthLimitPx Width limit for the img file in pixels
 * @param {Number} _imgHeightLimitPx Height limit for the img file in pixels
 * @param {String} _dropAreaElemId ID of the element that works as drop area
 * @param {String} _inpElemId ID of the input element that will store the file
 * @param {String} _imgWrapperId ID of the element that will store the preview
 * @param {String} _imgId ID if the preview img 
 * 
 */

class Previewer{

    // Make private properties
    #zoneId;
    #zone;
    #file;
    #imgId;
    #imgWrapper;
    #fileSizeMb;
    #wLimit;
    #hLimit;

    /** Constructor function */
    constructor(_fileSizeMb, _imgWidthLimitPx, _imgHeightLimitPx, 
        _dropAreaElemId = "upload-area", _inpElemId = "file", _imgWrapperId = "badge-photo", _imgId = "img")
    {
        this.#zoneId = _dropAreaElemId;
        this.#zone = document.querySelector(`#${_dropAreaElemId}`);
        this.#file = document.querySelector(`#${_inpElemId}`);
        this.#imgId = _imgId;
        this.#imgWrapper = document.querySelector(`#${_imgWrapperId}`);
        this.#fileSizeMb = _fileSizeMb;
        this.#wLimit = _imgWidthLimitPx;
        this.#hLimit = _imgHeightLimitPx;
    };

    /** Initialize the image preview functionality */
    init = function(){
        
        // Dropzone elemnt
        const dropzone = this.#zone;

        // Copy dragged files
        dropzone.addEventListener("dragover", (e) => {

            // Prevent default behaviour and propagation to the child elements 
            e.stopPropagation();
            e.preventDefault();

            // Set active state and copy files
            if(!dropzone.classList.contains("active")){
                dropzone.classList.add("active");
            }
            e.dataTransfer.dropEffect = "copy";

        });

        // Clear active state when leaving the dropzone
        dropzone.addEventListener("dragleave", (e) => {
        // Prevent default behaviour and propagation to the child elements 
            e.stopPropagation();
            e.preventDefault();

            // New element to which we leave from the target
            const hoverElem = e.fromElement;

            // If we stop event using click
            if(hoverElem === null){
                dropzone.classList.remove("active");
            } 
            // If new element is outside the area and dropzone is in the active state -> remove it
            else if(!hoverElem.closest(`#${this.#zoneId}`) &&
                     dropzone.classList.contains("active")){
                dropzone.classList.remove("active");
            };

        });

        // Load files 
        dropzone.addEventListener('drop', (e) => {

            // Prevent default behaviour and propagation to the child elements
            e.stopPropagation();
            e.preventDefault();

            // Transfer file to the input element
            const inp = this.#file;
            inp.files = e.dataTransfer.files;
            
            this.preview(inp);   

            // Remove active state
            dropzone.classList.remove("active");
        });

        // Add functionality
        this.#file.addEventListener('change', (e)=>{
            this.preview(e)});
    };
    
    /** Check the upload and show preview / error */
    preview = async function(e){

        // Class pointer
        const here = this;
        // Input element
        const inp = this.#file;
    
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
        if(file.size > this.#fileSizeMb * 1024 * 1024){
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
                    img.id = here.#imgId;
                    img.src = fileReader.result;
    
                    img.onload = function(){
                        const imgWidth = this.width;
                        const imgHeight = this.height;
    
                        // On load, check demensions and respond
                        if (imgWidth <= here.#wLimit && imgHeight <= here.#hLimit){
                            // Clear previous img
                            if(document.querySelector(`#${here.#imgId}`)){
                                document.querySelector(`#${here.#imgId}`).remove();
                            }
                            // Show preview img
                            here.#imgWrapper
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
            here.#zone
                .insertAdjacentElement("beforeend", errors);
        }
    };
    
};