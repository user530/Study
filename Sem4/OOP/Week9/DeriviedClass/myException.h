// My Exception class
#pragma once

// If not defined -> define
#ifndef MYEXCEPTION_H
#define MYEXCEPTION_H

#include <string>
#include <iostream>

class MyException
{
private:
    std::string msg;

public:
    MyException(std::string str = "Smth bad happened...") : msg(str){};
    virtual ~MyException() = default; //Destructor
    virtual std::string what() const { return msg; };
};

class BigException : public MyException
{
public:
    BigException(std::string str = "Even worse...") : MyException(str){};
};

class EvenBiggerException : public BigException
{
public:
    EvenBiggerException(std::string str = "Well...shit...") : BigException(str){};
};

#endif