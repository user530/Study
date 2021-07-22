<?php

function t1() {
    /**
     * Поскольку мы еще не умеем работать с функциями
     * я объявил глобальные переменные $a, $b, $c
     * чтобы использовать их внутри функции, я использовал
     * gloabal - теперь $a, $b, $c  внутри и снаружи функции - это одни и те же переменные
     */
    global $a, $b, $c;
    if($a>$b){
        $c = $a;
    }
    else{
        $c = $b;
    }
    echo $c;
}

function t2() {
    global $d, $e, $f;

    // тут ваш код
    if($d > $e){
        $f = $d;
    }
    else{
        $f = $e;
    }
    //$f =  присваиваем результат
    echo $f;
}

function t3() {
    global $k, $l;
    // тут проводите операции
    if($l < $k){
        $tmp = $k;
        $k = $l;
        $l = $tmp;
    }
}

function t4() {
    global $s1, $s2, $maxString;
    // тут ваш код
    if(strlen($s2)>strlen($s1)){
        $maxString = $s2;
    }
    else{
        $maxString = $s1;
    }
    echo $maxString;
}

function t5()
{
    global $password, $successPass;
    if(strlen($password) >= 10){
        $successPass = true;
    }
    else{
        $successPass = false;
    }
    echo $successPass;
}

function t6()
{
    global $r1, $r2;
    if($r1 >= 0 AND $r1 <= 4){
        $r2 = 0;
    }elseif ($r1 >= 5 AND $r1 <= 7) {
        $r2 = 1;
    }else{
        $r2 = 3;
    }
    echo 'Результат: '. $r2;
}