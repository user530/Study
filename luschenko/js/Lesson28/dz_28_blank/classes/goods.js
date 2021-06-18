class Goods{
    constructor(name, amount, image, count){
        this.name = name;
        this.amount = amount;
        this.image = image;
        this.count = count;
    }
    draw(target){
        let div = document.createElement(`div`);
        let img = document.createElement(`img`);
        div.classList.add('productInfo');
        for(let i in this){
            if(i != 'image' && i != 'sales'){
            div.innerHTML += `${i}: ${this[i]}<br>`;
            }
        }
        img.setAttribute(`src`, this.image);
        div.appendChild(img);
        if(document.querySelector(`.${target}`) == null){
            target.appendChild(div);
        }else document.querySelector(`.${target}`).appendChild(div);
    }
}