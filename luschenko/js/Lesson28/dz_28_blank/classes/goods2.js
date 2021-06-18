class Goods2 extends Goods{
    constructor(name, amount, image, count){
        super(name, amount, image, count)
        this.sales = true;
    }
    draw(targetElem){
        super.draw(targetElem);
        if(this.sales)document.querySelector(`.${targetElem}`).innerHTML += `<br>CURRENTLY ON SALE!`;
    }
}