function setup()
{
    let el = document.querySelector('#div1');
    el.style.width = '250px';
    el.style.height = '250px';
    
   let c = createCanvas(550, 550);
    let container = document.querySelector('#div2');
   c.parent(container);

}

function preload(){
    data = loadTable('Test.csv', 'csv', 'header');
}

function draw()
{
    rect(100,100, 200,200);
    
    noLoop();
    
    let row = data.rows;
    console.log(row);
    
    let col = data.columns;
    console.log(col);
    
    let find = data.findRow('Bob', 'Fname');
    console.log(find);
    
    let val = find.getString('Sname');
    console.log(val);
    
    let numb = data.getColumn('FavNumber');
    console.log(numb);
}

