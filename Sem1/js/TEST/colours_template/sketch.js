var n = 4;
var f = 1;

function factorial(x)
{
   if(x == 1){
       return 1;
   }
   else{
       f = factorial(x-1);
       f = f * (f + 1);
       return f;
   }
}

function setup()
{
   createCanvas(1000, 500);
   factorial(n);

}

function draw()
{

}

