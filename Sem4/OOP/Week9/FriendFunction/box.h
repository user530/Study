#ifndef BOX_H
#define BOX_H
#include <string>

class Box
{
private:
    double length;
    double width;
    double height;

public:
    Box(double len = 1.0, double wdt = 1.0, double hgt = 1.0) : length(len), width(wdt), height(hgt){};

    const double volume();

    friend double surfaceArea(const Box &aBox); // Friend function for the Box
};

#endif