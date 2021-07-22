<?php

function t1()
{
    global $a, $b, $out1;
    // тут ваш код
    $out1 = '';
    for($i = $a; $i <= $b; $i++){
        $out1 = $out1.$i.' ';
    }
    echo $out1;
}

function t2()
{
    global $d, $e, $out2;
    $out2 = '';
    // тут ваш код
    for($i = $d; $i <= $e; $i = $i + 2){
        $out2 = $out2.$i.' ';
    }
    echo $out2;
}

function t3()
{
    global $f, $g, $out3;
    // тут проводите операции
    $out3 = '';
    for($i = $f; $i >= $g; $i = $i - 2){
        $out3 = $out3.$i.' ';
    }
    echo($out3);
}

function t4()
{
    global $num1, $num2, $out4;
    // тут ваш код
    $out4 = '';
    $min = min($num1,$num2);
    $max = $num1 + $num2 - $min;
    for($i = $min; $i <= $max; $i++){
        $out4 = $out4.$i.' ';
    }
    echo $out4;
}

function t5()
{
    global $out5;
    $out5 = '';
    for($i = 0; $i <= 5; $i++){
        $out5 = $out5.(5-$i).' '.$i.' ';
    }
    echo $out5;
}

function t6()
{
    global $out6, $k;
    $out6 = '';
    for($i = 1; $i <= $k; $i++){
        $out6 = $out6.$i.' * ';
    }
    echo $out6;
}

function t7()
{
    global $out7, $m;
    $out7 = '';
    for($i = 1; $i <= $m ; $i++){
        $star = ' * ';
        if($i%2 === 0) $star = ' ** ';
        $out7 = $out7.$i.$star;
    }
    echo $out7;
}

function t8()
{
    global $out8, $n;
    $out8 = '';
    for($i = 1; $i <= $n; $i++){
        $out8 = $out8.($i * ($i%2)).' ';
    }
    echo $out8;
}

function t9()
{
    global $out9;
    $out9 = '';
    for($i = 0; $i < 3; $i++){
        $out9 = $out9.'***<br>';
    }
    echo $out9;
}

function t10()
{
    global $out10, $t;
    $out10 = '';
    for($i = $t; $i <= 2020; $i++){
        if($i%2 !== 0) continue;
        $out10 = $out10.$i.' ';
    }
    echo $out10;
}